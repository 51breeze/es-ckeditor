var __defProp = Object.defineProperty;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};

// node_modules/ckeditor5/src/ui.js
import * as ckeditor5_ui_star from "es-ckeditor/lib/ui";
var require_ui = __commonJS((exports) => {
  __markAsModule(exports);
  __exportStar(exports, ckeditor5_ui_star);
  /**
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
   */
});

// node_modules/ckeditor5/src/engine.js
import * as ckeditor5_engine_star from "es-ckeditor/lib/engine";
var require_engine = __commonJS((exports) => {
  __markAsModule(exports);
  __exportStar(exports, ckeditor5_engine_star);
  /**
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
   */
});

// node_modules/ckeditor5/src/utils.js
import * as ckeditor5_utils_star from "es-ckeditor/lib/utils";
var require_utils = __commonJS((exports) => {
  __markAsModule(exports);
  __exportStar(exports, ckeditor5_utils_star);
  /**
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
   */
});

// node_modules/ckeditor5/src/core.js
import * as ckeditor5_core_star from "es-ckeditor/lib/core";
var require_core = __commonJS((exports) => {
  __markAsModule(exports);
  __exportStar(exports, ckeditor5_core_star);
  /**
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
   */
});

// node_modules/ckeditor5/src/watchdog.js
import * as ckeditor5_watchdog_star from "es-ckeditor/lib/watchdog";
var require_watchdog = __commonJS((exports) => {
  __markAsModule(exports);
  __exportStar(exports, ckeditor5_watchdog_star);
  /**
   * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
   * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
   */
});

// node_modules/@ckeditor/ckeditor5-editor-classic/src/classiceditorui.js
var import_ui = require_ui();
var import_engine = require_engine();
var import_utils = require_utils();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ClassicEditorUI = class extends import_ui.EditorUI {
  constructor(editor, view) {
    super(editor);
    this.view = view;
    this._toolbarConfig = (0, import_ui.normalizeToolbarConfig)(editor.config.get("toolbar"));
    this._elementReplacer = new import_utils.ElementReplacer();
    this.listenTo(editor.editing.view, "scrollToTheSelection", this._handleScrollToTheSelectionWithStickyPanel.bind(this));
  }
  get element() {
    return this.view.element;
  }
  init(replacementElement) {
    const editor = this.editor;
    const view = this.view;
    const editingView = editor.editing.view;
    const editable = view.editable;
    const editingRoot = editingView.document.getRoot();
    editable.name = editingRoot.rootName;
    view.render();
    const editableElement = editable.element;
    this.setEditableElement(editable.name, editableElement);
    view.editable.bind("isFocused").to(this.focusTracker);
    editingView.attachDomRoot(editableElement);
    if (replacementElement) {
      this._elementReplacer.replace(replacementElement, this.element);
    }
    this._initPlaceholder();
    this._initToolbar();
    this.fire("ready");
  }
  destroy() {
    super.destroy();
    const view = this.view;
    const editingView = this.editor.editing.view;
    this._elementReplacer.restore();
    editingView.detachDomRoot(view.editable.name);
    view.destroy();
  }
  _initToolbar() {
    const view = this.view;
    view.stickyPanel.bind("isActive").to(this.focusTracker, "isFocused");
    view.stickyPanel.limiterElement = view.element;
    view.stickyPanel.bind("viewportTopOffset").to(this, "viewportOffset", ({top}) => top || 0);
    view.toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory);
    this.addToolbar(view.toolbar);
  }
  _initPlaceholder() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    const editingRoot = editingView.document.getRoot();
    const sourceElement = editor.sourceElement;
    let placeholderText;
    const placeholder = editor.config.get("placeholder");
    if (placeholder) {
      placeholderText = typeof placeholder === "string" ? placeholder : placeholder[this.view.editable.name];
    }
    if (!placeholderText && sourceElement && sourceElement.tagName.toLowerCase() === "textarea") {
      placeholderText = sourceElement.getAttribute("placeholder");
    }
    if (placeholderText) {
      editingRoot.placeholder = placeholderText;
    }
    (0, import_engine.enablePlaceholder)({
      view: editingView,
      element: editingRoot,
      isDirectHost: false,
      keepOnFocus: true
    });
  }
  _handleScrollToTheSelectionWithStickyPanel(evt, data, originalArgs) {
    const stickyPanel = this.view.stickyPanel;
    if (stickyPanel.isSticky) {
      const stickyPanelHeight = new import_utils.Rect(stickyPanel.element).height;
      data.viewportOffset.top += stickyPanelHeight;
    } else {
      const scrollViewportOnPanelGettingSticky = () => {
        this.editor.editing.view.scrollToTheSelection(originalArgs);
      };
      this.listenTo(stickyPanel, "change:isSticky", scrollViewportOnPanelGettingSticky);
      setTimeout(() => {
        this.stopListening(stickyPanel, "change:isSticky", scrollViewportOnPanelGettingSticky);
      }, 20);
    }
  }
};
var classiceditorui_default = ClassicEditorUI;

// node_modules/@ckeditor/ckeditor5-editor-classic/src/classiceditoruiview.js
var import_ui2 = require_ui();
import "@ckeditor/ckeditor5-editor-classic/theme/classiceditor.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ClassicEditorUIView = class extends import_ui2.BoxedEditorUIView {
  constructor(locale, editingView, options = {}) {
    super(locale);
    this.stickyPanel = new import_ui2.StickyPanelView(locale);
    this.toolbar = new import_ui2.ToolbarView(locale, {
      shouldGroupWhenFull: options.shouldToolbarGroupWhenFull
    });
    this.editable = new import_ui2.InlineEditableUIView(locale, editingView);
  }
  render() {
    super.render();
    this.stickyPanel.content.add(this.toolbar);
    this.top.add(this.stickyPanel);
    this.main.add(this.editable);
  }
};
var classiceditoruiview_default = ClassicEditorUIView;

// node_modules/@ckeditor/ckeditor5-editor-classic/src/classiceditor.js
var import_core = require_core();
var import_utils2 = require_utils();
var import_watchdog = require_watchdog();
import {isElement as _isElement} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ClassicEditor = class extends (0, import_core.DataApiMixin)((0, import_core.ElementApiMixin)(import_core.Editor)) {
  constructor(sourceElementOrData, config = {}) {
    if (!isElement(sourceElementOrData) && config.initialData !== void 0) {
      throw new import_utils2.CKEditorError("editor-create-initial-data", null);
    }
    super(config);
    if (this.config.get("initialData") === void 0) {
      this.config.set("initialData", getInitialData(sourceElementOrData));
    }
    if (isElement(sourceElementOrData)) {
      this.sourceElement = sourceElementOrData;
    }
    this.model.document.createRoot();
    const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
    const view = new classiceditoruiview_default(this.locale, this.editing.view, {
      shouldToolbarGroupWhenFull
    });
    this.ui = new classiceditorui_default(this, view);
    (0, import_core.attachToForm)(this);
  }
  destroy() {
    if (this.sourceElement) {
      this.updateSourceElement();
    }
    this.ui.destroy();
    return super.destroy();
  }
  static create(sourceElementOrData, config = {}) {
    return new Promise((resolve) => {
      const editor = new this(sourceElementOrData, config);
      resolve(editor.initPlugins().then(() => editor.ui.init(isElement(sourceElementOrData) ? sourceElementOrData : null)).then(() => editor.data.init(editor.config.get("initialData"))).then(() => editor.fire("ready")).then(() => editor));
    });
  }
};
var classiceditor_default = ClassicEditor;
ClassicEditor.Context = import_core.Context;
ClassicEditor.EditorWatchdog = import_watchdog.EditorWatchdog;
ClassicEditor.ContextWatchdog = import_watchdog.ContextWatchdog;
function getInitialData(sourceElementOrData) {
  return isElement(sourceElementOrData) ? (0, import_utils2.getDataFromElement)(sourceElementOrData) : sourceElementOrData;
}
function isElement(value) {
  return _isElement(value);
}

// node_modules/@ckeditor/ckeditor5-editor-classic/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js
var import_core2 = require_core();
var import_utils4 = require_utils();
var import_watchdog2 = require_watchdog();

// node_modules/@ckeditor/ckeditor5-editor-inline/src/inlineeditorui.js
var import_ui3 = require_ui();
var import_engine2 = require_engine();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InlineEditorUI = class extends import_ui3.EditorUI {
  constructor(editor, view) {
    super(editor);
    this.view = view;
    this._toolbarConfig = (0, import_ui3.normalizeToolbarConfig)(editor.config.get("toolbar"));
  }
  get element() {
    return this.view.editable.element;
  }
  init() {
    const editor = this.editor;
    const view = this.view;
    const editingView = editor.editing.view;
    const editable = view.editable;
    const editingRoot = editingView.document.getRoot();
    editable.name = editingRoot.rootName;
    view.render();
    const editableElement = editable.element;
    this.setEditableElement(editable.name, editableElement);
    editable.bind("isFocused").to(this.focusTracker);
    editingView.attachDomRoot(editableElement);
    this._initPlaceholder();
    this._initToolbar();
    this.fire("ready");
  }
  destroy() {
    super.destroy();
    const view = this.view;
    const editingView = this.editor.editing.view;
    editingView.detachDomRoot(view.editable.name);
    view.destroy();
  }
  _initToolbar() {
    const editor = this.editor;
    const view = this.view;
    const editableElement = view.editable.element;
    const toolbar = view.toolbar;
    view.panel.bind("isVisible").to(this.focusTracker, "isFocused");
    view.bind("viewportTopOffset").to(this, "viewportOffset", ({top}) => top || 0);
    view.listenTo(editor.ui, "update", () => {
      if (view.panel.isVisible) {
        view.panel.pin({
          target: editableElement,
          positions: view.panelPositions
        });
      }
    });
    toolbar.fillFromConfig(this._toolbarConfig, this.componentFactory);
    this.addToolbar(toolbar);
  }
  _initPlaceholder() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    const editingRoot = editingView.document.getRoot();
    const placeholder = editor.config.get("placeholder");
    if (placeholder) {
      const placeholderText = typeof placeholder === "string" ? placeholder : placeholder[editingRoot.rootName];
      if (placeholderText) {
        editingRoot.placeholder = placeholderText;
      }
    }
    (0, import_engine2.enablePlaceholder)({
      view: editingView,
      element: editingRoot,
      isDirectHost: false,
      keepOnFocus: true
    });
  }
};
var inlineeditorui_default = InlineEditorUI;

// node_modules/@ckeditor/ckeditor5-editor-inline/src/inlineeditoruiview.js
var import_ui4 = require_ui();
var import_utils3 = require_utils();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var toPx = (0, import_utils3.toUnit)("px");
var InlineEditorUIView = class extends import_ui4.EditorUIView {
  constructor(locale, editingView, editableElement, options = {}) {
    super(locale);
    const t = locale.t;
    this.toolbar = new import_ui4.ToolbarView(locale, {
      shouldGroupWhenFull: options.shouldToolbarGroupWhenFull,
      isFloating: true
    });
    this.set("viewportTopOffset", 0);
    this.panel = new import_ui4.BalloonPanelView(locale);
    this.panelPositions = this._getPanelPositions();
    this.panel.extendTemplate({
      attributes: {
        class: "ck-toolbar-container"
      }
    });
    this.editable = new import_ui4.InlineEditableUIView(locale, editingView, editableElement, {
      label: (editableView) => {
        return t("Rich Text Editor. Editing area: %0", editableView.name);
      }
    });
    this._resizeObserver = null;
  }
  render() {
    super.render();
    this.body.add(this.panel);
    this.registerChild(this.editable);
    this.panel.content.add(this.toolbar);
    const options = this.toolbar.options;
    if (options.shouldGroupWhenFull) {
      const editableElement = this.editable.element;
      this._resizeObserver = new import_utils3.ResizeObserver(editableElement, () => {
        this.toolbar.maxWidth = toPx(new import_utils3.Rect(editableElement).width);
      });
    }
  }
  destroy() {
    super.destroy();
    if (this._resizeObserver) {
      this._resizeObserver.destroy();
    }
  }
  _getPanelPositionTop(editableRect, panelRect) {
    let top;
    if (editableRect.top > panelRect.height + this.viewportTopOffset) {
      top = editableRect.top - panelRect.height;
    } else if (editableRect.bottom > panelRect.height + this.viewportTopOffset + 50) {
      top = this.viewportTopOffset;
    } else {
      top = editableRect.bottom;
    }
    return top;
  }
  _getPanelPositions() {
    const positions = [
      (editableRect, panelRect) => {
        return {
          top: this._getPanelPositionTop(editableRect, panelRect),
          left: editableRect.left,
          name: "toolbar_west",
          config: {
            withArrow: false
          }
        };
      },
      (editableRect, panelRect) => {
        return {
          top: this._getPanelPositionTop(editableRect, panelRect),
          left: editableRect.left + editableRect.width - panelRect.width,
          name: "toolbar_east",
          config: {
            withArrow: false
          }
        };
      }
    ];
    if (this.locale.uiLanguageDirection === "ltr") {
      return positions;
    } else {
      return positions.reverse();
    }
  }
};
var inlineeditoruiview_default = InlineEditorUIView;

// node_modules/@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js
import {isElement as _isElement2} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InlineEditor = class extends (0, import_core2.DataApiMixin)((0, import_core2.ElementApiMixin)(import_core2.Editor)) {
  constructor(sourceElementOrData, config = {}) {
    if (!isElement2(sourceElementOrData) && config.initialData !== void 0) {
      throw new import_utils4.CKEditorError("editor-create-initial-data", null);
    }
    super(config);
    if (this.config.get("initialData") === void 0) {
      this.config.set("initialData", getInitialData2(sourceElementOrData));
    }
    this.model.document.createRoot();
    if (isElement2(sourceElementOrData)) {
      this.sourceElement = sourceElementOrData;
      (0, import_core2.secureSourceElement)(this, sourceElementOrData);
    }
    const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
    const view = new inlineeditoruiview_default(this.locale, this.editing.view, this.sourceElement, {
      shouldToolbarGroupWhenFull
    });
    this.ui = new inlineeditorui_default(this, view);
    (0, import_core2.attachToForm)(this);
  }
  destroy() {
    const data = this.getData();
    this.ui.destroy();
    return super.destroy().then(() => {
      if (this.sourceElement) {
        this.updateSourceElement(data);
      }
    });
  }
  static create(sourceElementOrData, config = {}) {
    return new Promise((resolve) => {
      if (isElement2(sourceElementOrData) && sourceElementOrData.tagName === "TEXTAREA") {
        throw new import_utils4.CKEditorError("editor-wrong-element", null);
      }
      const editor = new this(sourceElementOrData, config);
      resolve(editor.initPlugins().then(() => editor.ui.init()).then(() => editor.data.init(editor.config.get("initialData"))).then(() => editor.fire("ready")).then(() => editor));
    });
  }
};
var inlineeditor_default = InlineEditor;
InlineEditor.Context = import_core2.Context;
InlineEditor.EditorWatchdog = import_watchdog2.EditorWatchdog;
InlineEditor.ContextWatchdog = import_watchdog2.ContextWatchdog;
function getInitialData2(sourceElementOrData) {
  return isElement2(sourceElementOrData) ? (0, import_utils4.getDataFromElement)(sourceElementOrData) : sourceElementOrData;
}
function isElement2(value) {
  return _isElement2(value);
}

// node_modules/@ckeditor/ckeditor5-editor-inline/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-editor-balloon/src/ballooneditor.js
var import_core3 = require_core();
var import_ui7 = require_ui();
var import_utils5 = require_utils();
var import_watchdog3 = require_watchdog();

// node_modules/@ckeditor/ckeditor5-editor-balloon/src/ballooneditorui.js
var import_ui5 = require_ui();
var import_engine3 = require_engine();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BalloonEditorUI = class extends import_ui5.EditorUI {
  constructor(editor, view) {
    super(editor);
    this.view = view;
  }
  get element() {
    return this.view.editable.element;
  }
  init() {
    const editor = this.editor;
    const view = this.view;
    const editingView = editor.editing.view;
    const editable = view.editable;
    const editingRoot = editingView.document.getRoot();
    editable.name = editingRoot.rootName;
    view.render();
    const editableElement = editable.element;
    this.setEditableElement(editable.name, editableElement);
    editable.bind("isFocused").to(this.focusTracker);
    editingView.attachDomRoot(editableElement);
    this._initPlaceholder();
    this.fire("ready");
  }
  destroy() {
    super.destroy();
    const view = this.view;
    const editingView = this.editor.editing.view;
    editingView.detachDomRoot(view.editable.name);
    view.destroy();
  }
  _initPlaceholder() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    const editingRoot = editingView.document.getRoot();
    const placeholder = editor.config.get("placeholder");
    if (placeholder) {
      const placeholderText = typeof placeholder === "string" ? placeholder : placeholder[editingRoot.rootName];
      if (placeholderText) {
        editingRoot.placeholder = placeholderText;
      }
    }
    (0, import_engine3.enablePlaceholder)({
      view: editingView,
      element: editingRoot,
      isDirectHost: false,
      keepOnFocus: true
    });
  }
};
var ballooneditorui_default = BalloonEditorUI;

// node_modules/@ckeditor/ckeditor5-editor-balloon/src/ballooneditoruiview.js
var import_ui6 = require_ui();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BalloonEditorUIView = class extends import_ui6.EditorUIView {
  constructor(locale, editingView, editableElement) {
    super(locale);
    const t = locale.t;
    this.editable = new import_ui6.InlineEditableUIView(locale, editingView, editableElement, {
      label: (editableView) => {
        return t("Rich Text Editor. Editing area: %0", editableView.name);
      }
    });
  }
  render() {
    super.render();
    this.registerChild(this.editable);
  }
};
var ballooneditoruiview_default = BalloonEditorUIView;

// node_modules/@ckeditor/ckeditor5-editor-balloon/src/ballooneditor.js
import {isElement as _isElement3} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BalloonEditor = class extends (0, import_core3.DataApiMixin)((0, import_core3.ElementApiMixin)(import_core3.Editor)) {
  constructor(sourceElementOrData, config = {}) {
    if (!isElement3(sourceElementOrData) && config.initialData !== void 0) {
      throw new import_utils5.CKEditorError("editor-create-initial-data", null);
    }
    super(config);
    if (this.config.get("initialData") === void 0) {
      this.config.set("initialData", getInitialData3(sourceElementOrData));
    }
    if (isElement3(sourceElementOrData)) {
      this.sourceElement = sourceElementOrData;
      (0, import_core3.secureSourceElement)(this, sourceElementOrData);
    }
    const plugins = this.config.get("plugins");
    plugins.push(import_ui7.BalloonToolbar);
    this.config.set("plugins", plugins);
    this.config.define("balloonToolbar", this.config.get("toolbar"));
    this.model.document.createRoot();
    const view = new ballooneditoruiview_default(this.locale, this.editing.view, this.sourceElement);
    this.ui = new ballooneditorui_default(this, view);
    (0, import_core3.attachToForm)(this);
  }
  destroy() {
    const data = this.getData();
    this.ui.destroy();
    return super.destroy().then(() => {
      if (this.sourceElement) {
        this.updateSourceElement(data);
      }
    });
  }
  static create(sourceElementOrData, config = {}) {
    return new Promise((resolve) => {
      if (isElement3(sourceElementOrData) && sourceElementOrData.tagName === "TEXTAREA") {
        throw new import_utils5.CKEditorError("editor-wrong-element", null);
      }
      const editor = new this(sourceElementOrData, config);
      resolve(editor.initPlugins().then(() => editor.ui.init()).then(() => editor.data.init(editor.config.get("initialData"))).then(() => editor.fire("ready")).then(() => editor));
    });
  }
};
var ballooneditor_default = BalloonEditor;
BalloonEditor.Context = import_core3.Context;
BalloonEditor.EditorWatchdog = import_watchdog3.EditorWatchdog;
BalloonEditor.ContextWatchdog = import_watchdog3.ContextWatchdog;
function getInitialData3(sourceElementOrData) {
  return isElement3(sourceElementOrData) ? (0, import_utils5.getDataFromElement)(sourceElementOrData) : sourceElementOrData;
}
function isElement3(value) {
  return _isElement3(value);
}

// node_modules/@ckeditor/ckeditor5-editor-balloon/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor.js
var import_core4 = require_core();
var import_utils6 = require_utils();
var import_watchdog4 = require_watchdog();

// node_modules/@ckeditor/ckeditor5-editor-decoupled/src/decouplededitorui.js
var import_ui8 = require_ui();
var import_engine4 = require_engine();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DecoupledEditorUI = class extends import_ui8.EditorUI {
  constructor(editor, view) {
    super(editor);
    this.view = view;
  }
  init() {
    const editor = this.editor;
    const view = this.view;
    const editingView = editor.editing.view;
    const editable = view.editable;
    const editingRoot = editingView.document.getRoot();
    editable.name = editingRoot.rootName;
    view.render();
    const editableElement = editable.element;
    this.setEditableElement(editable.name, editableElement);
    view.editable.bind("isFocused").to(this.focusTracker);
    editingView.attachDomRoot(editableElement);
    this._initPlaceholder();
    this._initToolbar();
    this.fire("ready");
  }
  destroy() {
    super.destroy();
    const view = this.view;
    const editingView = this.editor.editing.view;
    editingView.detachDomRoot(view.editable.name);
    view.destroy();
  }
  _initToolbar() {
    const editor = this.editor;
    const view = this.view;
    const toolbar = view.toolbar;
    toolbar.fillFromConfig(editor.config.get("toolbar"), this.componentFactory);
    this.addToolbar(view.toolbar);
  }
  _initPlaceholder() {
    const editor = this.editor;
    const editingView = editor.editing.view;
    const editingRoot = editingView.document.getRoot();
    const placeholder = editor.config.get("placeholder");
    if (placeholder) {
      const placeholderText = typeof placeholder === "string" ? placeholder : placeholder[editingRoot.rootName];
      if (placeholderText) {
        editingRoot.placeholder = placeholderText;
      }
    }
    (0, import_engine4.enablePlaceholder)({
      view: editingView,
      element: editingRoot,
      isDirectHost: false,
      keepOnFocus: true
    });
  }
};
var decouplededitorui_default = DecoupledEditorUI;

// node_modules/@ckeditor/ckeditor5-editor-decoupled/src/decouplededitoruiview.js
var import_ui9 = require_ui();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DecoupledEditorUIView = class extends import_ui9.EditorUIView {
  constructor(locale, editingView, options = {}) {
    super(locale);
    const t = locale.t;
    this.toolbar = new import_ui9.ToolbarView(locale, {
      shouldGroupWhenFull: options.shouldToolbarGroupWhenFull
    });
    this.editable = new import_ui9.InlineEditableUIView(locale, editingView, options.editableElement, {
      label: (editableView) => {
        return t("Rich Text Editor. Editing area: %0", editableView.name);
      }
    });
    this.toolbar.extendTemplate({
      attributes: {
        class: [
          "ck-reset_all",
          "ck-rounded-corners"
        ],
        dir: locale.uiLanguageDirection
      }
    });
  }
  render() {
    super.render();
    this.registerChild([this.toolbar, this.editable]);
  }
};
var decouplededitoruiview_default = DecoupledEditorUIView;

// node_modules/@ckeditor/ckeditor5-editor-decoupled/src/decouplededitor.js
import {isElement as _isElement4} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DecoupledEditor = class extends (0, import_core4.DataApiMixin)((0, import_core4.ElementApiMixin)(import_core4.Editor)) {
  constructor(sourceElementOrData, config = {}) {
    if (!isElement4(sourceElementOrData) && config.initialData !== void 0) {
      throw new import_utils6.CKEditorError("editor-create-initial-data", null);
    }
    super(config);
    if (this.config.get("initialData") === void 0) {
      this.config.set("initialData", getInitialData4(sourceElementOrData));
    }
    if (isElement4(sourceElementOrData)) {
      this.sourceElement = sourceElementOrData;
      (0, import_core4.secureSourceElement)(this, sourceElementOrData);
    }
    this.model.document.createRoot();
    const shouldToolbarGroupWhenFull = !this.config.get("toolbar.shouldNotGroupWhenFull");
    const view = new decouplededitoruiview_default(this.locale, this.editing.view, {
      editableElement: this.sourceElement,
      shouldToolbarGroupWhenFull
    });
    this.ui = new decouplededitorui_default(this, view);
  }
  destroy() {
    const data = this.getData();
    this.ui.destroy();
    return super.destroy().then(() => {
      if (this.sourceElement) {
        this.updateSourceElement(data);
      }
    });
  }
  static create(sourceElementOrData, config = {}) {
    return new Promise((resolve) => {
      if (isElement4(sourceElementOrData) && sourceElementOrData.tagName === "TEXTAREA") {
        throw new import_utils6.CKEditorError("editor-wrong-element", null);
      }
      const editor = new this(sourceElementOrData, config);
      resolve(editor.initPlugins().then(() => editor.ui.init()).then(() => editor.data.init(editor.config.get("initialData"))).then(() => editor.fire("ready")).then(() => editor));
    });
  }
};
var decouplededitor_default = DecoupledEditor;
DecoupledEditor.Context = import_core4.Context;
DecoupledEditor.EditorWatchdog = import_watchdog4.EditorWatchdog;
DecoupledEditor.ContextWatchdog = import_watchdog4.ContextWatchdog;
function getInitialData4(sourceElementOrData) {
  return isElement4(sourceElementOrData) ? (0, import_utils6.getDataFromElement)(sourceElementOrData) : sourceElementOrData;
}
function isElement4(value) {
  return _isElement4(value);
}

// node_modules/@ckeditor/ckeditor5-editor-decoupled/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/multirooteditor.js
var import_core5 = require_core();
var import_utils7 = require_utils();
var import_watchdog5 = require_watchdog();

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/multirooteditorui.js
var import_ui10 = require_ui();
var import_engine5 = require_engine();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MultiRootEditorUI = class extends import_ui10.EditorUI {
  constructor(editor, view) {
    super(editor);
    this.view = view;
    this._lastFocusedEditableElement = null;
  }
  init() {
    const view = this.view;
    view.render();
    this.focusTracker.on("change:focusedElement", (evt, name, focusedElement) => {
      for (const editable of Object.values(this.view.editables)) {
        if (focusedElement === editable.element) {
          this._lastFocusedEditableElement = editable.element;
        }
      }
    });
    this.focusTracker.on("change:isFocused", (evt, name, isFocused) => {
      if (!isFocused) {
        this._lastFocusedEditableElement = null;
      }
    });
    for (const editable of Object.values(this.view.editables)) {
      this.addEditable(editable);
    }
    this._initToolbar();
    this.fire("ready");
  }
  addEditable(editable, placeholder) {
    const editableElement = editable.element;
    this.editor.editing.view.attachDomRoot(editableElement, editable.name);
    this.setEditableElement(editable.name, editableElement);
    editable.bind("isFocused").to(this.focusTracker, "isFocused", this.focusTracker, "focusedElement", (isFocused, focusedElement) => {
      if (!isFocused) {
        return false;
      }
      if (focusedElement === editableElement) {
        return true;
      } else {
        return this._lastFocusedEditableElement === editableElement;
      }
    });
    this._initPlaceholder(editable, placeholder);
  }
  removeEditable(editable) {
    this.editor.editing.view.detachDomRoot(editable.name);
    editable.unbind("isFocused");
    this.removeEditableElement(editable.name);
  }
  destroy() {
    super.destroy();
    for (const editable of Object.values(this.view.editables)) {
      this.removeEditable(editable);
    }
    this.view.destroy();
  }
  _initToolbar() {
    const editor = this.editor;
    const view = this.view;
    const toolbar = view.toolbar;
    toolbar.fillFromConfig(editor.config.get("toolbar"), this.componentFactory);
    this.addToolbar(view.toolbar);
  }
  _initPlaceholder(editable, placeholder) {
    if (!placeholder) {
      const configPlaceholder = this.editor.config.get("placeholder");
      if (configPlaceholder) {
        placeholder = typeof configPlaceholder === "string" ? configPlaceholder : configPlaceholder[editable.name];
      }
    }
    const editingView = this.editor.editing.view;
    const editingRoot = editingView.document.getRoot(editable.name);
    if (placeholder) {
      editingRoot.placeholder = placeholder;
    }
    (0, import_engine5.enablePlaceholder)({
      view: editingView,
      element: editingRoot,
      isDirectHost: false,
      keepOnFocus: true
    });
  }
};
var multirooteditorui_default = MultiRootEditorUI;

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/multirooteditoruiview.js
var import_ui11 = require_ui();
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MultiRootEditorUIView = class extends import_ui11.EditorUIView {
  constructor(locale, editingView, editableNames, options = {}) {
    super(locale);
    this._editingView = editingView;
    this.toolbar = new import_ui11.ToolbarView(locale, {
      shouldGroupWhenFull: options.shouldToolbarGroupWhenFull
    });
    this.editables = {};
    for (const editableName of editableNames) {
      const editableElement = options.editableElements ? options.editableElements[editableName] : void 0;
      this.createEditable(editableName, editableElement);
    }
    this.editable = Object.values(this.editables)[0];
    this.toolbar.extendTemplate({
      attributes: {
        class: [
          "ck-reset_all",
          "ck-rounded-corners"
        ],
        dir: locale.uiLanguageDirection
      }
    });
  }
  createEditable(editableName, editableElement) {
    const t = this.locale.t;
    const editable = new import_ui11.InlineEditableUIView(this.locale, this._editingView, editableElement, {
      label: (editable2) => {
        return t("Rich Text Editor. Editing area: %0", editable2.name);
      }
    });
    this.editables[editableName] = editable;
    editable.name = editableName;
    if (this.isRendered) {
      this.registerChild(editable);
    }
    return editable;
  }
  removeEditable(editableName) {
    const editable = this.editables[editableName];
    if (this.isRendered) {
      this.deregisterChild(editable);
    }
    delete this.editables[editableName];
    editable.destroy();
  }
  render() {
    super.render();
    this.registerChild(Object.values(this.editables));
    this.registerChild(this.toolbar);
  }
};
var multirooteditoruiview_default = MultiRootEditorUIView;

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/multirooteditor.js
import {isElement as _isElement5} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MultiRootEditor = class extends (0, import_core5.DataApiMixin)(import_core5.Editor) {
  constructor(sourceElementsOrData, config = {}) {
    const rootNames = Object.keys(sourceElementsOrData);
    const sourceIsData = rootNames.length === 0 || typeof sourceElementsOrData[rootNames[0]] === "string";
    if (sourceIsData && config.initialData !== void 0 && Object.keys(config.initialData).length > 0) {
      throw new import_utils7.CKEditorError("editor-create-initial-data", null);
    }
    super(config);
    this._registeredRootsAttributesKeys = new Set();
    this._readOnlyRootLocks = new Map();
    if (!sourceIsData) {
      this.sourceElements = sourceElementsOrData;
    } else {
      this.sourceElements = {};
    }
    if (this.config.get("initialData") === void 0) {
      const initialData = {};
      for (const rootName of rootNames) {
        initialData[rootName] = getInitialData5(sourceElementsOrData[rootName]);
      }
      this.config.set("initialData", initialData);
    }
    if (!sourceIsData) {
      for (const rootName of rootNames) {
        (0, import_core5.secureSourceElement)(this, sourceElementsOrData[rootName]);
      }
    }
    this.editing.view.document.roots.on("add", (evt, viewRoot) => {
      viewRoot.unbind("isReadOnly");
      viewRoot.bind("isReadOnly").to(this.editing.view.document, "isReadOnly", (isReadOnly) => {
        return isReadOnly || this._readOnlyRootLocks.has(viewRoot.rootName);
      });
      viewRoot.on("change:isReadOnly", (evt2, prop, value) => {
        const viewRange = this.editing.view.createRangeIn(viewRoot);
        for (const viewItem of viewRange.getItems()) {
          if (viewItem.is("editableElement")) {
            viewItem.unbind("isReadOnly");
            viewItem.isReadOnly = value;
          }
        }
      });
    });
    for (const rootName of rootNames) {
      this.model.document.createRoot("$root", rootName);
    }
    if (this.config.get("lazyRoots")) {
      for (const rootName of this.config.get("lazyRoots")) {
        const root = this.model.document.createRoot("$root", rootName);
        root._isLoaded = false;
      }
    }
    if (this.config.get("rootsAttributes")) {
      const rootsAttributes = this.config.get("rootsAttributes");
      for (const [rootName, attributes] of Object.entries(rootsAttributes)) {
        if (!this.model.document.getRoot(rootName)) {
          throw new import_utils7.CKEditorError("multi-root-editor-root-attributes-no-root", null);
        }
        for (const key of Object.keys(attributes)) {
          this._registeredRootsAttributesKeys.add(key);
        }
      }
      this.data.on("init", () => {
        this.model.enqueueChange({isUndoable: false}, (writer) => {
          for (const [name, attributes] of Object.entries(rootsAttributes)) {
            const root = this.model.document.getRoot(name);
            for (const [key, value] of Object.entries(attributes)) {
              if (value !== null) {
                writer.setAttribute(key, value, root);
              }
            }
          }
        });
      });
    }
    const options = {
      shouldToolbarGroupWhenFull: !this.config.get("toolbar.shouldNotGroupWhenFull"),
      editableElements: sourceIsData ? void 0 : sourceElementsOrData
    };
    const view = new multirooteditoruiview_default(this.locale, this.editing.view, rootNames, options);
    this.ui = new multirooteditorui_default(this, view);
    this.model.document.on("change:data", () => {
      const changedRoots = this.model.document.differ.getChangedRoots();
      for (const changes of changedRoots) {
        const root = this.model.document.getRoot(changes.name);
        if (changes.state == "detached") {
          this.fire("detachRoot", root);
        }
      }
      for (const changes of changedRoots) {
        const root = this.model.document.getRoot(changes.name);
        if (changes.state == "attached") {
          this.fire("addRoot", root);
        }
      }
    });
    this.listenTo(this.model, "canEditAt", (evt, [selection]) => {
      if (!selection) {
        return;
      }
      let selectionInReadOnlyRoot = false;
      for (const range of selection.getRanges()) {
        const root = range.root;
        if (this._readOnlyRootLocks.has(root.rootName)) {
          selectionInReadOnlyRoot = true;
          break;
        }
      }
      if (selectionInReadOnlyRoot) {
        evt.return = false;
        evt.stop();
      }
    }, {priority: "high"});
    this.decorate("loadRoot");
    this.on("loadRoot", (evt, [rootName]) => {
      const root = this.model.document.getRoot(rootName);
      if (!root) {
        throw new import_utils7.CKEditorError("multi-root-editor-load-root-no-root", this, {rootName});
      }
      if (root._isLoaded) {
        (0, import_utils7.logWarning)("multi-root-editor-load-root-already-loaded");
        evt.stop();
      }
    }, {priority: "highest"});
  }
  destroy() {
    const shouldUpdateSourceElement = this.config.get("updateSourceElementOnDestroy");
    const data = {};
    for (const rootName of Object.keys(this.sourceElements)) {
      data[rootName] = shouldUpdateSourceElement ? this.getData({rootName}) : "";
    }
    this.ui.destroy();
    return super.destroy().then(() => {
      for (const rootName of Object.keys(this.sourceElements)) {
        (0, import_utils7.setDataInElement)(this.sourceElements[rootName], data[rootName]);
      }
    });
  }
  addRoot(rootName, {data = "", attributes = {}, elementName = "$root", isUndoable = false} = {}) {
    const dataController = this.data;
    const registeredKeys = this._registeredRootsAttributesKeys;
    if (isUndoable) {
      this.model.change(_addRoot);
    } else {
      this.model.enqueueChange({isUndoable: false}, _addRoot);
    }
    function _addRoot(writer) {
      const root = writer.addRoot(rootName, elementName);
      if (data) {
        writer.insert(dataController.parse(data, root), root, 0);
      }
      for (const key of Object.keys(attributes)) {
        registeredKeys.add(key);
        writer.setAttribute(key, attributes[key], root);
      }
    }
  }
  detachRoot(rootName, isUndoable = false) {
    if (isUndoable) {
      this.model.change((writer) => writer.detachRoot(rootName));
    } else {
      this.model.enqueueChange({isUndoable: false}, (writer) => writer.detachRoot(rootName));
    }
  }
  createEditable(root, placeholder) {
    const editable = this.ui.view.createEditable(root.rootName);
    this.ui.addEditable(editable, placeholder);
    this.editing.view.forceRender();
    return editable.element;
  }
  detachEditable(root) {
    const rootName = root.rootName;
    const editable = this.ui.view.editables[rootName];
    this.ui.removeEditable(editable);
    this.ui.view.removeEditable(rootName);
    return editable.element;
  }
  loadRoot(rootName, {data = "", attributes = {}} = {}) {
    const root = this.model.document.getRoot(rootName);
    this.model.enqueueChange({isUndoable: false}, (writer) => {
      if (data) {
        writer.insert(this.data.parse(data, root), root, 0);
      }
      for (const key of Object.keys(attributes)) {
        this._registeredRootsAttributesKeys.add(key);
        writer.setAttribute(key, attributes[key], root);
      }
      root._isLoaded = true;
      this.model.document.differ._bufferRootLoad(root);
    });
  }
  getFullData(options) {
    const data = {};
    for (const rootName of this.model.document.getRootNames()) {
      data[rootName] = this.data.get({...options, rootName});
    }
    return data;
  }
  getRootsAttributes() {
    const rootsAttributes = {};
    for (const rootName of this.model.document.getRootNames()) {
      rootsAttributes[rootName] = this.getRootAttributes(rootName);
    }
    return rootsAttributes;
  }
  getRootAttributes(rootName) {
    const rootAttributes = {};
    const root = this.model.document.getRoot(rootName);
    for (const key of this._registeredRootsAttributesKeys) {
      rootAttributes[key] = root.hasAttribute(key) ? root.getAttribute(key) : null;
    }
    return rootAttributes;
  }
  disableRoot(rootName, lockId) {
    if (rootName == "$graveyard") {
      throw new import_utils7.CKEditorError("multi-root-editor-cannot-disable-graveyard-root", this);
    }
    const locksForGivenRoot = this._readOnlyRootLocks.get(rootName);
    if (locksForGivenRoot) {
      locksForGivenRoot.add(lockId);
    } else {
      this._readOnlyRootLocks.set(rootName, new Set([lockId]));
      const editableRootElement = this.editing.view.document.getRoot(rootName);
      editableRootElement.isReadOnly = true;
      Array.from(this.commands.commands()).forEach((command) => command.affectsData && command.refresh());
    }
  }
  enableRoot(rootName, lockId) {
    const locksForGivenRoot = this._readOnlyRootLocks.get(rootName);
    if (!locksForGivenRoot || !locksForGivenRoot.has(lockId)) {
      return;
    }
    if (locksForGivenRoot.size === 1) {
      this._readOnlyRootLocks.delete(rootName);
      const editableRootElement = this.editing.view.document.getRoot(rootName);
      editableRootElement.isReadOnly = this.isReadOnly;
      Array.from(this.commands.commands()).forEach((command) => command.affectsData && command.refresh());
    } else {
      locksForGivenRoot.delete(lockId);
    }
  }
  static create(sourceElementsOrData, config = {}) {
    return new Promise((resolve) => {
      for (const sourceItem of Object.values(sourceElementsOrData)) {
        if (isElement5(sourceItem) && sourceItem.tagName === "TEXTAREA") {
          throw new import_utils7.CKEditorError("editor-wrong-element", null);
        }
      }
      const editor = new this(sourceElementsOrData, config);
      resolve(editor.initPlugins().then(() => editor.ui.init()).then(() => {
        editor._verifyRootsWithInitialData();
        return editor.data.init(editor.config.get("initialData"));
      }).then(() => editor.fire("ready")).then(() => editor));
    });
  }
  _verifyRootsWithInitialData() {
    const initialData = this.config.get("initialData");
    for (const rootName of this.model.document.getRootNames()) {
      if (!(rootName in initialData)) {
        throw new import_utils7.CKEditorError("multi-root-editor-root-initial-data-mismatch", null);
      }
    }
    for (const rootName of Object.keys(initialData)) {
      const root = this.model.document.getRoot(rootName);
      if (!root || !root.isAttached()) {
        throw new import_utils7.CKEditorError("multi-root-editor-root-initial-data-mismatch", null);
      }
    }
  }
};
var multirooteditor_default = MultiRootEditor;
MultiRootEditor.Context = import_core5.Context;
MultiRootEditor.EditorWatchdog = import_watchdog5.EditorWatchdog;
MultiRootEditor.ContextWatchdog = import_watchdog5.ContextWatchdog;
function getInitialData5(sourceElementOrData) {
  return isElement5(sourceElementOrData) ? (0, import_utils7.getDataFromElement)(sourceElementOrData) : sourceElementOrData;
}
function isElement5(value) {
  return _isElement5(value);
}

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/augmentation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-editor-multi-root/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
export {
  ballooneditor_default as BalloonEditor,
  classiceditor_default as ClassicEditor,
  decouplededitor_default as DecoupledEditor,
  inlineeditor_default as InlineEditor,
  multirooteditor_default as MultiRootEditor
};
