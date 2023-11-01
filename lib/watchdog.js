// node_modules/@ckeditor/ckeditor5-watchdog/src/watchdog.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Watchdog = class {
  constructor(config) {
    this.crashes = [];
    this.state = "initializing";
    this._now = Date.now;
    this.crashes = [];
    this._crashNumberLimit = typeof config.crashNumberLimit === "number" ? config.crashNumberLimit : 3;
    this._minimumNonErrorTimePeriod = typeof config.minimumNonErrorTimePeriod === "number" ? config.minimumNonErrorTimePeriod : 5e3;
    this._boundErrorHandler = (evt) => {
      const error = "error" in evt ? evt.error : evt.reason;
      if (error instanceof Error) {
        this._handleError(error, evt);
      }
    };
    this._listeners = {};
    if (!this._restart) {
      throw new Error("The Watchdog class was split into the abstract `Watchdog` class and the `EditorWatchdog` class. Please, use `EditorWatchdog` if you have used the `Watchdog` class previously.");
    }
  }
  destroy() {
    this._stopErrorHandling();
    this._listeners = {};
  }
  on(eventName, callback) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }
    this._listeners[eventName].push(callback);
  }
  off(eventName, callback) {
    this._listeners[eventName] = this._listeners[eventName].filter((cb) => cb !== callback);
  }
  _fire(eventName, ...args) {
    const callbacks = this._listeners[eventName] || [];
    for (const callback of callbacks) {
      callback.apply(this, [null, ...args]);
    }
  }
  _startErrorHandling() {
    window.addEventListener("error", this._boundErrorHandler);
    window.addEventListener("unhandledrejection", this._boundErrorHandler);
  }
  _stopErrorHandling() {
    window.removeEventListener("error", this._boundErrorHandler);
    window.removeEventListener("unhandledrejection", this._boundErrorHandler);
  }
  _handleError(error, evt) {
    if (this._shouldReactToError(error)) {
      this.crashes.push({
        message: error.message,
        stack: error.stack,
        filename: evt instanceof ErrorEvent ? evt.filename : void 0,
        lineno: evt instanceof ErrorEvent ? evt.lineno : void 0,
        colno: evt instanceof ErrorEvent ? evt.colno : void 0,
        date: this._now()
      });
      const causesRestart = this._shouldRestart();
      this.state = "crashed";
      this._fire("stateChange");
      this._fire("error", {error, causesRestart});
      if (causesRestart) {
        this._restart();
      } else {
        this.state = "crashedPermanently";
        this._fire("stateChange");
      }
    }
  }
  _shouldReactToError(error) {
    return error.is && error.is("CKEditorError") && error.context !== void 0 && error.context !== null && this.state === "ready" && this._isErrorComingFromThisItem(error);
  }
  _shouldRestart() {
    if (this.crashes.length <= this._crashNumberLimit) {
      return true;
    }
    const lastErrorTime = this.crashes[this.crashes.length - 1].date;
    const firstMeaningfulErrorTime = this.crashes[this.crashes.length - 1 - this._crashNumberLimit].date;
    const averageNonErrorTimePeriod = (lastErrorTime - firstMeaningfulErrorTime) / this._crashNumberLimit;
    return averageNonErrorTimePeriod > this._minimumNonErrorTimePeriod;
  }
};
var watchdog_default = Watchdog;

// node_modules/@ckeditor/ckeditor5-watchdog/src/utils/getsubnodes.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getSubNodes(head, excludedProperties = new Set()) {
  const nodes = [head];
  const subNodes = new Set();
  let nodeIndex = 0;
  while (nodes.length > nodeIndex) {
    const node = nodes[nodeIndex++];
    if (subNodes.has(node) || !shouldNodeBeIncluded(node) || excludedProperties.has(node)) {
      continue;
    }
    subNodes.add(node);
    if (Symbol.iterator in node) {
      try {
        for (const n of node) {
          nodes.push(n);
        }
      } catch (err) {
      }
    } else {
      for (const key in node) {
        if (key === "defaultValue") {
          continue;
        }
        nodes.push(node[key]);
      }
    }
  }
  return subNodes;
}
function shouldNodeBeIncluded(node) {
  const type = Object.prototype.toString.call(node);
  const typeOfNode = typeof node;
  return !(typeOfNode === "number" || typeOfNode === "boolean" || typeOfNode === "string" || typeOfNode === "symbol" || typeOfNode === "function" || type === "[object Date]" || type === "[object RegExp]" || type === "[object Module]" || node === void 0 || node === null || node._watchdogExcluded || node instanceof EventTarget || node instanceof Event);
}

// node_modules/@ckeditor/ckeditor5-watchdog/src/utils/areconnectedthroughproperties.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function areConnectedThroughProperties(target1, target2, excludedNodes = new Set()) {
  if (target1 === target2 && isObject(target1)) {
    return true;
  }
  const subNodes1 = getSubNodes(target1, excludedNodes);
  const subNodes2 = getSubNodes(target2, excludedNodes);
  for (const node of subNodes1) {
    if (subNodes2.has(node)) {
      return true;
    }
  }
  return false;
}
/* istanbul ignore next -- @preserve */
function isObject(structure) {
  return typeof structure === "object" && structure !== null;
}

// node_modules/@ckeditor/ckeditor5-watchdog/src/editorwatchdog.js
import {throttle, cloneDeepWith, isElement} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditorWatchdog = class extends watchdog_default {
  constructor(Editor, watchdogConfig = {}) {
    super(watchdogConfig);
    this._editor = null;
    this._initUsingData = true;
    this._editables = {};
    this._throttledSave = throttle(this._save.bind(this), typeof watchdogConfig.saveInterval === "number" ? watchdogConfig.saveInterval : 5e3);
    if (Editor) {
      this._creator = (elementOrData, config) => Editor.create(elementOrData, config);
    }
    this._destructor = (editor) => editor.destroy();
  }
  get editor() {
    return this._editor;
  }
  get _item() {
    return this._editor;
  }
  setCreator(creator) {
    this._creator = creator;
  }
  setDestructor(destructor) {
    this._destructor = destructor;
  }
  _restart() {
    return Promise.resolve().then(() => {
      this.state = "initializing";
      this._fire("stateChange");
      return this._destroy();
    }).catch((err) => {
      console.error("An error happened during the editor destroying.", err);
    }).then(() => {
      const existingRoots = {};
      const lazyRoots = [];
      const oldRootsAttributes = this._config.rootsAttributes || {};
      const rootsAttributes = {};
      for (const [rootName, rootData] of Object.entries(this._data.roots)) {
        if (rootData.isLoaded) {
          existingRoots[rootName] = "";
          rootsAttributes[rootName] = oldRootsAttributes[rootName] || {};
        } else {
          lazyRoots.push(rootName);
        }
      }
      const updatedConfig = {
        ...this._config,
        extraPlugins: this._config.extraPlugins || [],
        lazyRoots,
        rootsAttributes,
        _watchdogInitialData: this._data
      };
      delete updatedConfig.initialData;
      updatedConfig.extraPlugins.push(EditorWatchdogInitPlugin);
      if (this._initUsingData) {
        return this.create(existingRoots, updatedConfig, updatedConfig.context);
      } else {
        if (isElement(this._elementOrData)) {
          return this.create(this._elementOrData, updatedConfig, updatedConfig.context);
        } else {
          return this.create(this._editables, updatedConfig, updatedConfig.context);
        }
      }
    }).then(() => {
      this._fire("restart");
    });
  }
  create(elementOrData = this._elementOrData, config = this._config, context) {
    return Promise.resolve().then(() => {
      super._startErrorHandling();
      this._elementOrData = elementOrData;
      this._initUsingData = typeof elementOrData == "string" || Object.keys(elementOrData).length > 0 && typeof Object.values(elementOrData)[0] == "string";
      this._config = this._cloneEditorConfiguration(config) || {};
      this._config.context = context;
      return this._creator(elementOrData, this._config);
    }).then((editor) => {
      this._editor = editor;
      editor.model.document.on("change:data", this._throttledSave);
      this._lastDocumentVersion = editor.model.document.version;
      this._data = this._getData();
      if (!this._initUsingData) {
        this._editables = this._getEditables();
      }
      this.state = "ready";
      this._fire("stateChange");
    });
  }
  destroy() {
    return Promise.resolve().then(() => {
      this.state = "destroyed";
      this._fire("stateChange");
      super.destroy();
      return this._destroy();
    });
  }
  _destroy() {
    return Promise.resolve().then(() => {
      this._stopErrorHandling();
      this._throttledSave.cancel();
      const editor = this._editor;
      this._editor = null;
      editor.model.document.off("change:data", this._throttledSave);
      return this._destructor(editor);
    });
  }
  _save() {
    const version = this._editor.model.document.version;
    try {
      this._data = this._getData();
      if (!this._initUsingData) {
        this._editables = this._getEditables();
      }
      this._lastDocumentVersion = version;
    } catch (err) {
      console.error(err, "An error happened during restoring editor data. Editor will be restored from the previously saved data.");
    }
  }
  _setExcludedProperties(props) {
    this._excludedProps = props;
  }
  _getData() {
    const editor = this._editor;
    const roots = editor.model.document.roots.filter((root) => root.isAttached() && root.rootName != "$graveyard");
    const {plugins} = editor;
    const commentsRepository = plugins.has("CommentsRepository") && plugins.get("CommentsRepository");
    const trackChanges = plugins.has("TrackChanges") && plugins.get("TrackChanges");
    const data = {
      roots: {},
      markers: {},
      commentThreads: JSON.stringify([]),
      suggestions: JSON.stringify([])
    };
    roots.forEach((root) => {
      data.roots[root.rootName] = {
        content: JSON.stringify(Array.from(root.getChildren())),
        attributes: JSON.stringify(Array.from(root.getAttributes())),
        isLoaded: root._isLoaded
      };
    });
    for (const marker of editor.model.markers) {
      if (!marker._affectsData) {
        continue;
      }
      data.markers[marker.name] = {
        rangeJSON: marker.getRange().toJSON(),
        usingOperation: marker._managedUsingOperations,
        affectsData: marker._affectsData
      };
    }
    if (commentsRepository) {
      data.commentThreads = JSON.stringify(commentsRepository.getCommentThreads({toJSON: true, skipNotAttached: true}));
    }
    if (trackChanges) {
      data.suggestions = JSON.stringify(trackChanges.getSuggestions({toJSON: true, skipNotAttached: true}));
    }
    return data;
  }
  _getEditables() {
    const editables = {};
    for (const rootName of this.editor.model.document.getRootNames()) {
      const editable = this.editor.ui.getEditableElement(rootName);
      if (editable) {
        editables[rootName] = editable;
      }
    }
    return editables;
  }
  _isErrorComingFromThisItem(error) {
    return areConnectedThroughProperties(this._editor, error.context, this._excludedProps);
  }
  _cloneEditorConfiguration(config) {
    return cloneDeepWith(config, (value, key) => {
      if (isElement(value)) {
        return value;
      }
      if (key === "context") {
        return value;
      }
    });
  }
};
var editorwatchdog_default = EditorWatchdog;
var EditorWatchdogInitPlugin = class {
  constructor(editor) {
    this.editor = editor;
    this._data = editor.config.get("_watchdogInitialData");
  }
  init() {
    this.editor.data.on("init", (evt) => {
      evt.stop();
      this.editor.model.enqueueChange({isUndoable: false}, (writer) => {
        this._restoreCollaborationData();
        this._restoreEditorData(writer);
      });
      this.editor.data.fire("ready");
    }, {priority: 1e3 - 1});
  }
  _createNode(writer, jsonNode) {
    if ("name" in jsonNode) {
      const element = writer.createElement(jsonNode.name, jsonNode.attributes);
      if (jsonNode.children) {
        for (const child of jsonNode.children) {
          element._appendChild(this._createNode(writer, child));
        }
      }
      return element;
    } else {
      return writer.createText(jsonNode.data, jsonNode.attributes);
    }
  }
  _restoreEditorData(writer) {
    const editor = this.editor;
    Object.entries(this._data.roots).forEach(([rootName, {content, attributes}]) => {
      const parsedNodes = JSON.parse(content);
      const parsedAttributes = JSON.parse(attributes);
      const rootElement = editor.model.document.getRoot(rootName);
      for (const [key, value] of parsedAttributes) {
        writer.setAttribute(key, value, rootElement);
      }
      for (const child of parsedNodes) {
        const node = this._createNode(writer, child);
        writer.insert(node, rootElement, "end");
      }
    });
    Object.entries(this._data.markers).forEach(([markerName, markerOptions]) => {
      const {document} = editor.model;
      const {rangeJSON: {start, end}, ...options} = markerOptions;
      const root = document.getRoot(start.root);
      const startPosition = writer.createPositionFromPath(root, start.path, start.stickiness);
      const endPosition = writer.createPositionFromPath(root, end.path, end.stickiness);
      const range = writer.createRange(startPosition, endPosition);
      writer.addMarker(markerName, {
        range,
        ...options
      });
    });
  }
  _restoreCollaborationData() {
    const parsedCommentThreads = JSON.parse(this._data.commentThreads);
    const parsedSuggestions = JSON.parse(this._data.suggestions);
    parsedCommentThreads.forEach((commentThreadData) => {
      const channelId = this.editor.config.get("collaboration.channelId");
      const commentsRepository = this.editor.plugins.get("CommentsRepository");
      if (commentsRepository.hasCommentThread(commentThreadData.threadId)) {
        const commentThread = commentsRepository.getCommentThread(commentThreadData.threadId);
        commentThread.remove();
      }
      commentsRepository.addCommentThread({channelId, ...commentThreadData});
    });
    parsedSuggestions.forEach((suggestionData) => {
      const trackChangesEditing = this.editor.plugins.get("TrackChangesEditing");
      if (trackChangesEditing.hasSuggestion(suggestionData.id)) {
        const suggestion = trackChangesEditing.getSuggestion(suggestionData.id);
        suggestion.attributes = suggestionData.attributes;
      } else {
        trackChangesEditing.addSuggestionData(suggestionData);
      }
    });
  }
};

// node_modules/@ckeditor/ckeditor5-watchdog/src/contextwatchdog.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var mainQueueId = Symbol("MainQueueId");
var ContextWatchdog = class extends watchdog_default {
  constructor(Context, watchdogConfig = {}) {
    super(watchdogConfig);
    this._watchdogs = new Map();
    this._context = null;
    this._contextProps = new Set();
    this._actionQueues = new ActionQueues();
    this._watchdogConfig = watchdogConfig;
    this._creator = (contextConfig) => Context.create(contextConfig);
    this._destructor = (context) => context.destroy();
    this._actionQueues.onEmpty(() => {
      if (this.state === "initializing") {
        this.state = "ready";
        this._fire("stateChange");
      }
    });
  }
  setCreator(creator) {
    this._creator = creator;
  }
  setDestructor(destructor) {
    this._destructor = destructor;
  }
  get context() {
    return this._context;
  }
  create(contextConfig = {}) {
    return this._actionQueues.enqueue(mainQueueId, () => {
      this._contextConfig = contextConfig;
      return this._create();
    });
  }
  getItem(itemId) {
    const watchdog = this._getWatchdog(itemId);
    return watchdog._item;
  }
  getItemState(itemId) {
    const watchdog = this._getWatchdog(itemId);
    return watchdog.state;
  }
  add(itemConfigurationOrItemConfigurations) {
    const itemConfigurations = toArray(itemConfigurationOrItemConfigurations);
    return Promise.all(itemConfigurations.map((item) => {
      return this._actionQueues.enqueue(item.id, () => {
        if (this.state === "destroyed") {
          throw new Error("Cannot add items to destroyed watchdog.");
        }
        if (!this._context) {
          throw new Error("Context was not created yet. You should call the `ContextWatchdog#create()` method first.");
        }
        let watchdog;
        if (this._watchdogs.has(item.id)) {
          throw new Error(`Item with the given id is already added: '${item.id}'.`);
        }
        if (item.type === "editor") {
          watchdog = new editorwatchdog_default(null, this._watchdogConfig);
          watchdog.setCreator(item.creator);
          watchdog._setExcludedProperties(this._contextProps);
          if (item.destructor) {
            watchdog.setDestructor(item.destructor);
          }
          this._watchdogs.set(item.id, watchdog);
          watchdog.on("error", (evt, {error, causesRestart}) => {
            this._fire("itemError", {itemId: item.id, error});
            if (!causesRestart) {
              return;
            }
            this._actionQueues.enqueue(item.id, () => new Promise((res) => {
              const rethrowRestartEventOnce = () => {
                watchdog.off("restart", rethrowRestartEventOnce);
                this._fire("itemRestart", {itemId: item.id});
                res();
              };
              watchdog.on("restart", rethrowRestartEventOnce);
            }));
          });
          return watchdog.create(item.sourceElementOrData, item.config, this._context);
        } else {
          throw new Error(`Not supported item type: '${item.type}'.`);
        }
      });
    }));
  }
  remove(itemIdOrItemIds) {
    const itemIds = toArray(itemIdOrItemIds);
    return Promise.all(itemIds.map((itemId) => {
      return this._actionQueues.enqueue(itemId, () => {
        const watchdog = this._getWatchdog(itemId);
        this._watchdogs.delete(itemId);
        return watchdog.destroy();
      });
    }));
  }
  destroy() {
    return this._actionQueues.enqueue(mainQueueId, () => {
      this.state = "destroyed";
      this._fire("stateChange");
      super.destroy();
      return this._destroy();
    });
  }
  _restart() {
    return this._actionQueues.enqueue(mainQueueId, () => {
      this.state = "initializing";
      this._fire("stateChange");
      return this._destroy().catch((err) => {
        console.error("An error happened during destroying the context or items.", err);
      }).then(() => this._create()).then(() => this._fire("restart"));
    });
  }
  _create() {
    return Promise.resolve().then(() => {
      this._startErrorHandling();
      return this._creator(this._contextConfig);
    }).then((context) => {
      this._context = context;
      this._contextProps = getSubNodes(this._context);
      return Promise.all(Array.from(this._watchdogs.values()).map((watchdog) => {
        watchdog._setExcludedProperties(this._contextProps);
        return watchdog.create(void 0, void 0, this._context);
      }));
    });
  }
  _destroy() {
    return Promise.resolve().then(() => {
      this._stopErrorHandling();
      const context = this._context;
      this._context = null;
      this._contextProps = new Set();
      return Promise.all(Array.from(this._watchdogs.values()).map((watchdog) => watchdog.destroy())).then(() => this._destructor(context));
    });
  }
  _getWatchdog(itemId) {
    const watchdog = this._watchdogs.get(itemId);
    if (!watchdog) {
      throw new Error(`Item with the given id was not registered: ${itemId}.`);
    }
    return watchdog;
  }
  _isErrorComingFromThisItem(error) {
    for (const watchdog of this._watchdogs.values()) {
      if (watchdog._isErrorComingFromThisItem(error)) {
        return false;
      }
    }
    return areConnectedThroughProperties(this._context, error.context);
  }
};
var contextwatchdog_default = ContextWatchdog;
var ActionQueues = class {
  constructor() {
    this._onEmptyCallbacks = [];
    this._queues = new Map();
    this._activeActions = 0;
  }
  onEmpty(onEmptyCallback) {
    this._onEmptyCallbacks.push(onEmptyCallback);
  }
  enqueue(queueId, action) {
    const isMainAction = queueId === mainQueueId;
    this._activeActions++;
    if (!this._queues.get(queueId)) {
      this._queues.set(queueId, Promise.resolve());
    }
    const awaitedActions = isMainAction ? Promise.all(this._queues.values()) : Promise.all([this._queues.get(mainQueueId), this._queues.get(queueId)]);
    const queueWithAction = awaitedActions.then(action);
    const nonErrorQueue = queueWithAction.catch(() => {
    });
    this._queues.set(queueId, nonErrorQueue);
    return queueWithAction.finally(() => {
      this._activeActions--;
      if (this._queues.get(queueId) === nonErrorQueue && this._activeActions === 0) {
        this._onEmptyCallbacks.forEach((cb) => cb());
      }
    });
  }
};
function toArray(elementOrArray) {
  return Array.isArray(elementOrArray) ? elementOrArray : [elementOrArray];
}

// node_modules/@ckeditor/ckeditor5-watchdog/src/augmentation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-watchdog/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
export {
  contextwatchdog_default as ContextWatchdog,
  editorwatchdog_default as EditorWatchdog,
  watchdog_default as Watchdog
};
