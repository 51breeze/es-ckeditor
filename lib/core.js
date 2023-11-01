// node_modules/@ckeditor/ckeditor5-core/src/plugin.js
import {ObservableMixin} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Plugin = class extends ObservableMixin() {
  constructor(editor) {
    super();
    this._disableStack = new Set();
    this.editor = editor;
    this.set("isEnabled", true);
  }
  forceDisabled(id) {
    this._disableStack.add(id);
    if (this._disableStack.size == 1) {
      this.on("set:isEnabled", forceDisable, {priority: "highest"});
      this.isEnabled = false;
    }
  }
  clearForceDisabled(id) {
    this._disableStack.delete(id);
    if (this._disableStack.size == 0) {
      this.off("set:isEnabled", forceDisable);
      this.isEnabled = true;
    }
  }
  destroy() {
    this.stopListening();
  }
  static get isContextPlugin() {
    return false;
  }
};
var plugin_default = Plugin;
function forceDisable(evt) {
  evt.return = false;
  evt.stop();
}

// node_modules/@ckeditor/ckeditor5-core/src/command.js
import {ObservableMixin as ObservableMixin2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Command = class extends ObservableMixin2() {
  constructor(editor) {
    super();
    this.editor = editor;
    this.set("value", void 0);
    this.set("isEnabled", false);
    this._affectsData = true;
    this._isEnabledBasedOnSelection = true;
    this._disableStack = new Set();
    this.decorate("execute");
    this.listenTo(this.editor.model.document, "change", () => {
      this.refresh();
    });
    this.listenTo(editor, "change:isReadOnly", () => {
      this.refresh();
    });
    this.on("set:isEnabled", (evt) => {
      if (!this.affectsData) {
        return;
      }
      const selection = editor.model.document.selection;
      const selectionInGraveyard = selection.getFirstPosition().root.rootName == "$graveyard";
      const canEditAtSelection = !selectionInGraveyard && editor.model.canEditAt(selection);
      if (editor.isReadOnly || this._isEnabledBasedOnSelection && !canEditAtSelection) {
        evt.return = false;
        evt.stop();
      }
    }, {priority: "highest"});
    this.on("execute", (evt) => {
      if (!this.isEnabled) {
        evt.stop();
      }
    }, {priority: "high"});
  }
  get affectsData() {
    return this._affectsData;
  }
  set affectsData(affectsData) {
    this._affectsData = affectsData;
  }
  refresh() {
    this.isEnabled = true;
  }
  forceDisabled(id) {
    this._disableStack.add(id);
    if (this._disableStack.size == 1) {
      this.on("set:isEnabled", forceDisable2, {priority: "highest"});
      this.isEnabled = false;
    }
  }
  clearForceDisabled(id) {
    this._disableStack.delete(id);
    if (this._disableStack.size == 0) {
      this.off("set:isEnabled", forceDisable2);
      this.refresh();
    }
  }
  execute(...args) {
    return void 0;
  }
  destroy() {
    this.stopListening();
  }
};
var command_default = Command;
function forceDisable2(evt) {
  evt.return = false;
  evt.stop();
}

// node_modules/@ckeditor/ckeditor5-core/src/multicommand.js
import {insertToPriorityArray} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MultiCommand = class extends command_default {
  constructor() {
    super(...arguments);
    this._childCommandsDefinitions = [];
  }
  refresh() {
  }
  execute(...args) {
    const command = this._getFirstEnabledCommand();
    return !!command && command.execute(args);
  }
  registerChildCommand(command, options = {}) {
    insertToPriorityArray(this._childCommandsDefinitions, {command, priority: options.priority || "normal"});
    command.on("change:isEnabled", () => this._checkEnabled());
    this._checkEnabled();
  }
  _checkEnabled() {
    this.isEnabled = !!this._getFirstEnabledCommand();
  }
  _getFirstEnabledCommand() {
    const commandDefinition = this._childCommandsDefinitions.find(({command}) => command.isEnabled);
    return commandDefinition && commandDefinition.command;
  }
};
var multicommand_default = MultiCommand;

// node_modules/@ckeditor/ckeditor5-core/src/context.js
import {Config, Collection, CKEditorError as CKEditorError2, Locale} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-core/src/plugincollection.js
import {CKEditorError, EmitterMixin} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var PluginCollection = class extends EmitterMixin() {
  constructor(context, availablePlugins = [], contextPlugins = []) {
    super();
    this._plugins = new Map();
    this._context = context;
    this._availablePlugins = new Map();
    for (const PluginConstructor of availablePlugins) {
      if (PluginConstructor.pluginName) {
        this._availablePlugins.set(PluginConstructor.pluginName, PluginConstructor);
      }
    }
    this._contextPlugins = new Map();
    for (const [PluginConstructor, pluginInstance] of contextPlugins) {
      this._contextPlugins.set(PluginConstructor, pluginInstance);
      this._contextPlugins.set(pluginInstance, PluginConstructor);
      if (PluginConstructor.pluginName) {
        this._availablePlugins.set(PluginConstructor.pluginName, PluginConstructor);
      }
    }
  }
  *[Symbol.iterator]() {
    for (const entry of this._plugins) {
      if (typeof entry[0] == "function") {
        yield entry;
      }
    }
  }
  get(key) {
    const plugin = this._plugins.get(key);
    if (!plugin) {
      let pluginName = key;
      if (typeof key == "function") {
        pluginName = key.pluginName || key.name;
      }
      throw new CKEditorError("plugincollection-plugin-not-loaded", this._context, {plugin: pluginName});
    }
    return plugin;
  }
  has(key) {
    return this._plugins.has(key);
  }
  init(plugins, pluginsToRemove = [], pluginsSubstitutions = []) {
    const that = this;
    const context = this._context;
    findAvailablePluginConstructors(plugins);
    validatePlugins(plugins);
    const pluginsToLoad = plugins.filter((plugin) => !isPluginRemoved(plugin, pluginsToRemove));
    const pluginConstructors = [...getPluginConstructors(pluginsToLoad)];
    substitutePlugins(pluginConstructors, pluginsSubstitutions);
    const pluginInstances = loadPlugins(pluginConstructors);
    return initPlugins(pluginInstances, "init").then(() => initPlugins(pluginInstances, "afterInit")).then(() => pluginInstances);
    function isPluginConstructor(plugin) {
      return typeof plugin === "function";
    }
    function isContextPlugin(plugin) {
      return isPluginConstructor(plugin) && !!plugin.isContextPlugin;
    }
    function isPluginRemoved(plugin, pluginsToRemove2) {
      return pluginsToRemove2.some((removedPlugin) => {
        if (removedPlugin === plugin) {
          return true;
        }
        if (getPluginName(plugin) === removedPlugin) {
          return true;
        }
        if (getPluginName(removedPlugin) === plugin) {
          return true;
        }
        return false;
      });
    }
    function getPluginName(plugin) {
      return isPluginConstructor(plugin) ? plugin.pluginName || plugin.name : plugin;
    }
    function findAvailablePluginConstructors(plugins2, processed = new Set()) {
      plugins2.forEach((plugin) => {
        if (!isPluginConstructor(plugin)) {
          return;
        }
        if (processed.has(plugin)) {
          return;
        }
        processed.add(plugin);
        if (plugin.pluginName && !that._availablePlugins.has(plugin.pluginName)) {
          that._availablePlugins.set(plugin.pluginName, plugin);
        }
        if (plugin.requires) {
          findAvailablePluginConstructors(plugin.requires, processed);
        }
      });
    }
    function getPluginConstructors(plugins2, processed = new Set()) {
      return plugins2.map((plugin) => {
        return isPluginConstructor(plugin) ? plugin : that._availablePlugins.get(plugin);
      }).reduce((result, plugin) => {
        if (processed.has(plugin)) {
          return result;
        }
        processed.add(plugin);
        if (plugin.requires) {
          validatePlugins(plugin.requires, plugin);
          getPluginConstructors(plugin.requires, processed).forEach((plugin2) => result.add(plugin2));
        }
        return result.add(plugin);
      }, new Set());
    }
    function validatePlugins(plugins2, parentPluginConstructor = null) {
      plugins2.map((plugin) => {
        return isPluginConstructor(plugin) ? plugin : that._availablePlugins.get(plugin) || plugin;
      }).forEach((plugin) => {
        checkMissingPlugin(plugin, parentPluginConstructor);
        checkContextPlugin(plugin, parentPluginConstructor);
        checkRemovedPlugin(plugin, parentPluginConstructor);
      });
    }
    function checkMissingPlugin(plugin, parentPluginConstructor) {
      if (isPluginConstructor(plugin)) {
        return;
      }
      if (parentPluginConstructor) {
        throw new CKEditorError("plugincollection-soft-required", context, {missingPlugin: plugin, requiredBy: getPluginName(parentPluginConstructor)});
      }
      throw new CKEditorError("plugincollection-plugin-not-found", context, {plugin});
    }
    function checkContextPlugin(plugin, parentPluginConstructor) {
      if (!isContextPlugin(parentPluginConstructor)) {
        return;
      }
      if (isContextPlugin(plugin)) {
        return;
      }
      throw new CKEditorError("plugincollection-context-required", context, {plugin: getPluginName(plugin), requiredBy: getPluginName(parentPluginConstructor)});
    }
    function checkRemovedPlugin(plugin, parentPluginConstructor) {
      if (!parentPluginConstructor) {
        return;
      }
      if (!isPluginRemoved(plugin, pluginsToRemove)) {
        return;
      }
      throw new CKEditorError("plugincollection-required", context, {plugin: getPluginName(plugin), requiredBy: getPluginName(parentPluginConstructor)});
    }
    function loadPlugins(pluginConstructors2) {
      return pluginConstructors2.map((PluginConstructor) => {
        let pluginInstance = that._contextPlugins.get(PluginConstructor);
        pluginInstance = pluginInstance || new PluginConstructor(context);
        that._add(PluginConstructor, pluginInstance);
        return pluginInstance;
      });
    }
    function initPlugins(pluginInstances2, method) {
      return pluginInstances2.reduce((promise, plugin) => {
        if (!plugin[method]) {
          return promise;
        }
        if (that._contextPlugins.has(plugin)) {
          return promise;
        }
        return promise.then(plugin[method].bind(plugin));
      }, Promise.resolve());
    }
    function substitutePlugins(pluginConstructors2, pluginsSubstitutions2) {
      for (const pluginItem of pluginsSubstitutions2) {
        if (typeof pluginItem != "function") {
          throw new CKEditorError("plugincollection-replace-plugin-invalid-type", null, {pluginItem});
        }
        const pluginName = pluginItem.pluginName;
        if (!pluginName) {
          throw new CKEditorError("plugincollection-replace-plugin-missing-name", null, {pluginItem});
        }
        if (pluginItem.requires && pluginItem.requires.length) {
          throw new CKEditorError("plugincollection-plugin-for-replacing-cannot-have-dependencies", null, {pluginName});
        }
        const pluginToReplace = that._availablePlugins.get(pluginName);
        if (!pluginToReplace) {
          throw new CKEditorError("plugincollection-plugin-for-replacing-not-exist", null, {pluginName});
        }
        const indexInPluginConstructors = pluginConstructors2.indexOf(pluginToReplace);
        if (indexInPluginConstructors === -1) {
          if (that._contextPlugins.has(pluginToReplace)) {
            return;
          }
          throw new CKEditorError("plugincollection-plugin-for-replacing-not-loaded", null, {pluginName});
        }
        if (pluginToReplace.requires && pluginToReplace.requires.length) {
          throw new CKEditorError("plugincollection-replaced-plugin-cannot-have-dependencies", null, {pluginName});
        }
        pluginConstructors2.splice(indexInPluginConstructors, 1, pluginItem);
        that._availablePlugins.set(pluginName, pluginItem);
      }
    }
  }
  destroy() {
    const promises = [];
    for (const [, pluginInstance] of this) {
      if (typeof pluginInstance.destroy == "function" && !this._contextPlugins.has(pluginInstance)) {
        promises.push(pluginInstance.destroy());
      }
    }
    return Promise.all(promises);
  }
  _add(PluginConstructor, plugin) {
    this._plugins.set(PluginConstructor, plugin);
    const pluginName = PluginConstructor.pluginName;
    if (!pluginName) {
      return;
    }
    if (this._plugins.has(pluginName)) {
      throw new CKEditorError("plugincollection-plugin-name-conflict", null, {pluginName, plugin1: this._plugins.get(pluginName).constructor, plugin2: PluginConstructor});
    }
    this._plugins.set(pluginName, plugin);
  }
};
var plugincollection_default = PluginCollection;

// node_modules/@ckeditor/ckeditor5-core/src/context.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Context = class {
  constructor(config) {
    this._contextOwner = null;
    this.config = new Config(config, this.constructor.defaultConfig);
    const availablePlugins = this.constructor.builtinPlugins;
    this.config.define("plugins", availablePlugins);
    this.plugins = new plugincollection_default(this, availablePlugins);
    const languageConfig = this.config.get("language") || {};
    this.locale = new Locale({
      uiLanguage: typeof languageConfig === "string" ? languageConfig : languageConfig.ui,
      contentLanguage: this.config.get("language.content")
    });
    this.t = this.locale.t;
    this.editors = new Collection();
  }
  initPlugins() {
    const plugins = this.config.get("plugins") || [];
    const substitutePlugins = this.config.get("substitutePlugins") || [];
    for (const Plugin2 of plugins.concat(substitutePlugins)) {
      if (typeof Plugin2 != "function") {
        throw new CKEditorError2("context-initplugins-constructor-only", null, {Plugin: Plugin2});
      }
      if (Plugin2.isContextPlugin !== true) {
        throw new CKEditorError2("context-initplugins-invalid-plugin", null, {Plugin: Plugin2});
      }
    }
    return this.plugins.init(plugins, [], substitutePlugins);
  }
  destroy() {
    return Promise.all(Array.from(this.editors, (editor) => editor.destroy())).then(() => this.plugins.destroy());
  }
  _addEditor(editor, isContextOwner) {
    if (this._contextOwner) {
      throw new CKEditorError2("context-addeditor-private-context");
    }
    this.editors.add(editor);
    if (isContextOwner) {
      this._contextOwner = editor;
    }
  }
  _removeEditor(editor) {
    if (this.editors.has(editor)) {
      this.editors.remove(editor);
    }
    if (this._contextOwner === editor) {
      return this.destroy();
    }
    return Promise.resolve();
  }
  _getEditorConfig() {
    const result = {};
    for (const name of this.config.names()) {
      if (!["plugins", "removePlugins", "extraPlugins"].includes(name)) {
        result[name] = this.config.get(name);
      }
    }
    return result;
  }
  static create(config) {
    return new Promise((resolve) => {
      const context = new this(config);
      resolve(context.initPlugins().then(() => context));
    });
  }
};
var context_default = Context;

// node_modules/@ckeditor/ckeditor5-core/src/contextplugin.js
import {ObservableMixin as ObservableMixin3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ContextPlugin = class extends ObservableMixin3() {
  constructor(context) {
    super();
    this.context = context;
  }
  destroy() {
    this.stopListening();
  }
  static get isContextPlugin() {
    return true;
  }
};
var contextplugin_default = ContextPlugin;

// node_modules/@ckeditor/ckeditor5-core/src/editor/editor.js
import {Config as Config2, CKEditorError as CKEditorError4, ObservableMixin as ObservableMixin4} from "es-ckeditor-lib/lib/utils";
import {Conversion, DataController, EditingController, Model, StylesProcessor} from "es-ckeditor-lib/lib/engine";

// node_modules/@ckeditor/ckeditor5-core/src/commandcollection.js
import {CKEditorError as CKEditorError3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var CommandCollection = class {
  constructor() {
    this._commands = new Map();
  }
  add(commandName, command) {
    this._commands.set(commandName, command);
  }
  get(commandName) {
    return this._commands.get(commandName);
  }
  execute(commandName, ...commandParams) {
    const command = this.get(commandName);
    if (!command) {
      throw new CKEditorError3("commandcollection-command-not-found", this, {commandName});
    }
    return command.execute(...commandParams);
  }
  *names() {
    yield* this._commands.keys();
  }
  *commands() {
    yield* this._commands.values();
  }
  [Symbol.iterator]() {
    return this._commands[Symbol.iterator]();
  }
  destroy() {
    for (const command of this.commands()) {
      command.destroy();
    }
  }
};
var commandcollection_default = CommandCollection;

// node_modules/@ckeditor/ckeditor5-core/src/editingkeystrokehandler.js
import {KeystrokeHandler} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditingKeystrokeHandler = class extends KeystrokeHandler {
  constructor(editor) {
    super();
    this.editor = editor;
  }
  set(keystroke, callback, options = {}) {
    if (typeof callback == "string") {
      const commandName = callback;
      callback = (evtData, cancel) => {
        this.editor.execute(commandName);
        cancel();
      };
    }
    super.set(keystroke, callback, options);
  }
};
var editingkeystrokehandler_default = EditingKeystrokeHandler;

// node_modules/@ckeditor/ckeditor5-core/src/editor/editor.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Editor = class extends ObservableMixin4() {
  constructor(config = {}) {
    super();
    const constructor = this.constructor;
    const language = config.language || constructor.defaultConfig && constructor.defaultConfig.language;
    this._context = config.context || new context_default({language});
    this._context._addEditor(this, !config.context);
    const availablePlugins = Array.from(constructor.builtinPlugins || []);
    this.config = new Config2(config, constructor.defaultConfig);
    this.config.define("plugins", availablePlugins);
    this.config.define(this._context._getEditorConfig());
    this.plugins = new plugincollection_default(this, availablePlugins, this._context.plugins);
    this.locale = this._context.locale;
    this.t = this.locale.t;
    this._readOnlyLocks = new Set();
    this.commands = new commandcollection_default();
    this.set("state", "initializing");
    this.once("ready", () => this.state = "ready", {priority: "high"});
    this.once("destroy", () => this.state = "destroyed", {priority: "high"});
    this.model = new Model();
    this.on("change:isReadOnly", () => {
      this.model.document.isReadOnly = this.isReadOnly;
    });
    const stylesProcessor = new StylesProcessor();
    this.data = new DataController(this.model, stylesProcessor);
    this.editing = new EditingController(this.model, stylesProcessor);
    this.editing.view.document.bind("isReadOnly").to(this);
    this.conversion = new Conversion([this.editing.downcastDispatcher, this.data.downcastDispatcher], this.data.upcastDispatcher);
    this.conversion.addAlias("dataDowncast", this.data.downcastDispatcher);
    this.conversion.addAlias("editingDowncast", this.editing.downcastDispatcher);
    this.keystrokes = new editingkeystrokehandler_default(this);
    this.keystrokes.listenTo(this.editing.view.document);
  }
  get isReadOnly() {
    return this._readOnlyLocks.size > 0;
  }
  set isReadOnly(value) {
    throw new CKEditorError4("editor-isreadonly-has-no-setter");
  }
  enableReadOnlyMode(lockId) {
    if (typeof lockId !== "string" && typeof lockId !== "symbol") {
      throw new CKEditorError4("editor-read-only-lock-id-invalid", null, {lockId});
    }
    if (this._readOnlyLocks.has(lockId)) {
      return;
    }
    this._readOnlyLocks.add(lockId);
    if (this._readOnlyLocks.size === 1) {
      this.fire("change:isReadOnly", "isReadOnly", true, false);
    }
  }
  disableReadOnlyMode(lockId) {
    if (typeof lockId !== "string" && typeof lockId !== "symbol") {
      throw new CKEditorError4("editor-read-only-lock-id-invalid", null, {lockId});
    }
    if (!this._readOnlyLocks.has(lockId)) {
      return;
    }
    this._readOnlyLocks.delete(lockId);
    if (this._readOnlyLocks.size === 0) {
      this.fire("change:isReadOnly", "isReadOnly", false, true);
    }
  }
  initPlugins() {
    const config = this.config;
    const plugins = config.get("plugins");
    const removePlugins = config.get("removePlugins") || [];
    const extraPlugins = config.get("extraPlugins") || [];
    const substitutePlugins = config.get("substitutePlugins") || [];
    return this.plugins.init(plugins.concat(extraPlugins), removePlugins, substitutePlugins);
  }
  destroy() {
    let readyPromise = Promise.resolve();
    if (this.state == "initializing") {
      readyPromise = new Promise((resolve) => this.once("ready", resolve));
    }
    return readyPromise.then(() => {
      this.fire("destroy");
      this.stopListening();
      this.commands.destroy();
    }).then(() => this.plugins.destroy()).then(() => {
      this.model.destroy();
      this.data.destroy();
      this.editing.destroy();
      this.keystrokes.destroy();
    }).then(() => this._context._removeEditor(this));
  }
  execute(commandName, ...commandParams) {
    try {
      return this.commands.execute(commandName, ...commandParams);
    } catch (err) {
      /* istanbul ignore next -- @preserve */
      CKEditorError4.rethrowUnexpectedError(err, this);
    }
  }
  focus() {
    this.editing.view.focus();
  }
  static create(...args) {
    throw new Error("This is an abstract method.");
  }
};
var editor_default = Editor;

// node_modules/@ckeditor/ckeditor5-core/src/editor/utils/attachtoform.js
import {isFunction} from "lodash-es";
import {CKEditorError as CKEditorError5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function attachToForm(editor) {
  if (!isFunction(editor.updateSourceElement)) {
    throw new CKEditorError5("attachtoform-missing-elementapi-interface", editor);
  }
  const sourceElement = editor.sourceElement;
  if (isTextArea(sourceElement) && sourceElement.form) {
    let originalSubmit;
    const form = sourceElement.form;
    const onSubmit = () => editor.updateSourceElement();
    if (isFunction(form.submit)) {
      originalSubmit = form.submit;
      form.submit = () => {
        onSubmit();
        originalSubmit.apply(form);
      };
    }
    form.addEventListener("submit", onSubmit);
    editor.on("destroy", () => {
      form.removeEventListener("submit", onSubmit);
      if (originalSubmit) {
        form.submit = originalSubmit;
      }
    });
  }
}
function isTextArea(sourceElement) {
  return !!sourceElement && sourceElement.tagName.toLowerCase() === "textarea";
}

// node_modules/@ckeditor/ckeditor5-core/src/editor/utils/dataapimixin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function DataApiMixin(base) {
  class Mixin extends base {
    setData(data) {
      this.data.set(data);
    }
    getData(options) {
      return this.data.get(options);
    }
  }
  return Mixin;
}
{
  const mixin = DataApiMixin(Object);
  DataApiMixin.setData = mixin.prototype.setData;
  DataApiMixin.getData = mixin.prototype.getData;
}

// node_modules/@ckeditor/ckeditor5-core/src/editor/utils/elementapimixin.js
import {CKEditorError as CKEditorError6, setDataInElement} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function ElementApiMixin(base) {
  class Mixin extends base {
    updateSourceElement(data = this.data.get()) {
      if (!this.sourceElement) {
        throw new CKEditorError6("editor-missing-sourceelement", this);
      }
      const shouldUpdateSourceElement = this.config.get("updateSourceElementOnDestroy");
      const isSourceElementTextArea = this.sourceElement instanceof HTMLTextAreaElement;
      if (!shouldUpdateSourceElement && !isSourceElementTextArea) {
        setDataInElement(this.sourceElement, "");
        return;
      }
      setDataInElement(this.sourceElement, data);
    }
  }
  return Mixin;
}
ElementApiMixin.updateSourceElement = ElementApiMixin(Object).prototype.updateSourceElement;

// node_modules/@ckeditor/ckeditor5-core/src/editor/utils/securesourceelement.js
import {CKEditorError as CKEditorError7} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function secureSourceElement(editor, sourceElement) {
  if (sourceElement.ckeditorInstance) {
    throw new CKEditorError7("editor-source-element-already-used", editor);
  }
  sourceElement.ckeditorInstance = editor;
  editor.once("destroy", () => {
    delete sourceElement.ckeditorInstance;
  });
}

// node_modules/@ckeditor/ckeditor5-core/src/pendingactions.js
import {CKEditorError as CKEditorError8, Collection as Collection2, ObservableMixin as ObservableMixin5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var PendingActions = class extends contextplugin_default {
  static get pluginName() {
    return "PendingActions";
  }
  init() {
    this.set("hasAny", false);
    this._actions = new Collection2({idProperty: "_id"});
    this._actions.delegate("add", "remove").to(this);
  }
  add(message) {
    if (typeof message !== "string") {
      throw new CKEditorError8("pendingactions-add-invalid-message", this);
    }
    const action = new (ObservableMixin5())();
    action.set("message", message);
    this._actions.add(action);
    this.hasAny = true;
    return action;
  }
  remove(action) {
    this._actions.remove(action);
    this.hasAny = !!this._actions.length;
  }
  get first() {
    return this._actions.get(0);
  }
  [Symbol.iterator]() {
    return this._actions[Symbol.iterator]();
  }
};
var pendingactions_default = PendingActions;

// node_modules/@ckeditor/ckeditor5-core/theme/icons/cancel.svg
var cancel_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.591 10.177 4.243 4.242a1 1 0 0 1-1.415 1.415l-4.242-4.243-4.243 4.243a1 1 0 0 1-1.414-1.415l4.243-4.242L4.52 5.934A1 1 0 0 1 5.934 4.52l4.243 4.243 4.242-4.243a1 1 0 1 1 1.415 1.414l-4.243 4.243z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/caption.svg
var caption_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 16h9a1 1 0 0 1 0 2H2a1 1 0 0 1 0-2z"/><path d="M17 1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H3a.5.5 0 0 0-.492.41L2.5 3v9a.5.5 0 0 0 .41.492L3 12.5h14a.5.5 0 0 0 .492-.41L17.5 12V3a.5.5 0 0 0-.41-.492L17 2.5z" fill-opacity=".6"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/check.svg
var check_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.972 16.615a.997.997 0 0 1-.744-.292l-4.596-4.596a1 1 0 1 1 1.414-1.414l3.926 3.926 9.937-9.937a1 1 0 0 1 1.414 1.415L7.717 16.323a.997.997 0 0 1-.745.292z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/cog.svg
var cog_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m11.333 2 .19 2.263a5.899 5.899 0 0 1 1.458.604L14.714 3.4 16.6 5.286l-1.467 1.733c.263.452.468.942.605 1.46L18 8.666v2.666l-2.263.19a5.899 5.899 0 0 1-.604 1.458l1.467 1.733-1.886 1.886-1.733-1.467a5.899 5.899 0 0 1-1.46.605L11.334 18H8.667l-.19-2.263a5.899 5.899 0 0 1-1.458-.604L5.286 16.6 3.4 14.714l1.467-1.733a5.899 5.899 0 0 1-.604-1.458L2 11.333V8.667l2.262-.189a5.899 5.899 0 0 1 .605-1.459L3.4 5.286 5.286 3.4l1.733 1.467a5.899 5.899 0 0 1 1.46-.605L8.666 2h2.666zM10 6.267a3.733 3.733 0 1 0 0 7.466 3.733 3.733 0 0 0 0-7.466z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/eraser.svg
var eraser_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m8.636 9.531-2.758 3.94a.5.5 0 0 0 .122.696l3.224 2.284h1.314l2.636-3.736L8.636 9.53zm.288 8.451L5.14 15.396a2 2 0 0 1-.491-2.786l6.673-9.53a2 2 0 0 1 2.785-.49l3.742 2.62a2 2 0 0 1 .491 2.785l-7.269 10.053-2.147-.066z"/><path d="M4 18h5.523v-1H4zm-2 0h1v-1H2z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/history.svg
var history_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 1a9 9 0 1 1-8.027 13.075l1.128-1.129A7.502 7.502 0 0 0 18.5 10a7.5 7.5 0 1 0-14.962.759l-.745-.746-.76.76A9 9 0 0 1 11 1z"/><path d="M.475 8.17a.75.75 0 0 1 .978.047l.075.082 1.284 1.643 1.681-1.284a.75.75 0 0 1 .978.057l.073.083a.75.75 0 0 1-.057.978l-.083.073-2.27 1.737a.75.75 0 0 1-.973-.052l-.074-.082-1.741-2.23a.75.75 0 0 1 .13-1.052z"/><path d="M11.5 5v4.999l3.196 3.196-1.06 1.06L10.1 10.72l-.1-.113V5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/low-vision.svg
var low_vision_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.085 6.22 2.943 4.078a.75.75 0 1 1 1.06-1.06l2.592 2.59A11.094 11.094 0 0 1 10 5.068c4.738 0 8.578 3.101 8.578 5.083 0 1.197-1.401 2.803-3.555 3.887l1.714 1.713a.75.75 0 0 1-.09 1.138.488.488 0 0 1-.15.084.75.75 0 0 1-.821-.16L6.17 7.304c-.258.11-.51.233-.757.365l6.239 6.24-.006.005.78.78c-.388.094-.78.166-1.174.215l-1.11-1.11h.011L4.55 8.197a7.2 7.2 0 0 0-.665.514l-.112.098 4.897 4.897-.005.006 1.276 1.276a10.164 10.164 0 0 1-1.477-.117l-.479-.479-.009.009-4.863-4.863-.022.031a2.563 2.563 0 0 0-.124.2c-.043.077-.08.158-.108.241a.534.534 0 0 0-.028.133.29.29 0 0 0 .008.072.927.927 0 0 0 .082.226c.067.133.145.26.234.379l3.242 3.365.025.01.59.623c-3.265-.918-5.59-3.155-5.59-4.668 0-1.194 1.448-2.838 3.663-3.93zm7.07.531a4.632 4.632 0 0 1 1.108 5.992l.345.344.046-.018a9.313 9.313 0 0 0 2-1.112c.256-.187.5-.392.727-.613.137-.134.27-.277.392-.431.072-.091.141-.185.203-.286.057-.093.107-.19.148-.292a.72.72 0 0 0 .036-.12.29.29 0 0 0 .008-.072.492.492 0 0 0-.028-.133.999.999 0 0 0-.036-.096 2.165 2.165 0 0 0-.071-.145 2.917 2.917 0 0 0-.125-.2 3.592 3.592 0 0 0-.263-.335 5.444 5.444 0 0 0-.53-.523 7.955 7.955 0 0 0-1.054-.768 9.766 9.766 0 0 0-1.879-.891c-.337-.118-.68-.219-1.027-.301zm-2.85.21-.069.002a.508.508 0 0 0-.254.097.496.496 0 0 0-.104.679.498.498 0 0 0 .326.199l.045.005c.091.003.181.003.272.012a2.45 2.45 0 0 1 2.017 1.513c.024.061.043.125.069.185a.494.494 0 0 0 .45.287h.008a.496.496 0 0 0 .35-.158.482.482 0 0 0 .13-.335.638.638 0 0 0-.048-.219 3.379 3.379 0 0 0-.36-.723 3.438 3.438 0 0 0-2.791-1.543l-.028-.001h-.013z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/loupe.svg
var loupe_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M12.68 13.74h-.001l4.209 4.208a1 1 0 1 0 1.414-1.414l-4.267-4.268a6 6 0 1 0-1.355 1.474ZM13 9a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/image.svg
var image_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.91 10.54c.26-.23.64-.21.88.03l3.36 3.14 2.23-2.06a.64.64 0 0 1 .87 0l2.52 2.97V4.5H3.2v10.12l3.71-4.08zm10.27-7.51c.6 0 1.09.47 1.09 1.05v11.84c0 .59-.49 1.06-1.09 1.06H2.79c-.6 0-1.09-.47-1.09-1.06V4.08c0-.58.49-1.05 1.1-1.05h14.38zm-5.22 5.56a1.96 1.96 0 1 1 3.4-1.96 1.96 1.96 0 0 1-3.4 1.96z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-bottom.svg
var align_bottom_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m9.239 13.938-2.88-1.663a.75.75 0 0 1 .75-1.3L9 12.067V4.75a.75.75 0 1 1 1.5 0v7.318l1.89-1.093a.75.75 0 0 1 .75 1.3l-2.879 1.663a.752.752 0 0 1-.511.187.752.752 0 0 1-.511-.187zM4.25 17a.75.75 0 1 1 0-1.5h10.5a.75.75 0 0 1 0 1.5H4.25z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-middle.svg
var align_middle_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.75 11.875a.752.752 0 0 1 .508.184l2.883 1.666a.75.75 0 0 1-.659 1.344l-.091-.044-1.892-1.093.001 4.318a.75.75 0 1 1-1.5 0v-4.317l-1.89 1.092a.75.75 0 0 1-.75-1.3l2.879-1.663a.752.752 0 0 1 .51-.187zM15.25 9a.75.75 0 1 1 0 1.5H4.75a.75.75 0 1 1 0-1.5h10.5zM9.75.375a.75.75 0 0 1 .75.75v4.318l1.89-1.093.092-.045a.75.75 0 0 1 .659 1.344l-2.883 1.667a.752.752 0 0 1-.508.184.752.752 0 0 1-.511-.187L6.359 5.65a.75.75 0 0 1 .75-1.299L9 5.442V1.125a.75.75 0 0 1 .75-.75z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-top.svg
var align_top_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m10.261 7.062 2.88 1.663a.75.75 0 0 1-.75 1.3L10.5 8.933v7.317a.75.75 0 1 1-1.5 0V8.932l-1.89 1.093a.75.75 0 0 1-.75-1.3l2.879-1.663a.752.752 0 0 1 .511-.187.752.752 0 0 1 .511.187zM15.25 4a.75.75 0 1 1 0 1.5H4.75a.75.75 0 0 1 0-1.5h10.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-left.svg
var align_left_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 4c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-center.svg
var align_center_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm2.286 4c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h9.928a.75.75 0 1 0 0-1.5H5.036a.75.75 0 0 0-.75.75z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-right.svg
var align_right_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 3.75a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 8a.75.75 0 0 1-.75.75H2.75a.75.75 0 1 1 0-1.5h14.5a.75.75 0 0 1 .75.75zm0 4a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75zm0-8a.75.75 0 0 1-.75.75H7.321a.75.75 0 1 1 0-1.5h9.929a.75.75 0 0 1 .75.75z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/align-justify.svg
var align_justify_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3.75c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0 4c0 .414.336.75.75.75h9.929a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75zm0-8c0 .414.336.75.75.75h14.5a.75.75 0 1 0 0-1.5H2.75a.75.75 0 0 0-.75.75z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-left.svg
var object_left_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-center.svg
var object_center_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M15.003 7v5.5a1 1 0 0 1-1 1H5.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H6.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-right.svg
var object_right_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-full-width.svg
var object_full_width_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2z"/><path d="M18 7v5.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1zm-1.505.5H3.504V12h12.991V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-inline.svg
var object_inline_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-inline-left.svg
var object_inline_left_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm11.5 9H18v1.5h-4.5zm0-3H18v1.5h-4.5zm0-3H18v1.5h-4.5zM2 15h16v1.5H2z"/><path d="M12.003 7v5.5a1 1 0 0 1-1 1H2.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H3.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-inline-right.svg
var object_inline_right_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path opacity=".5" d="M2 3h16v1.5H2zm0 12h16v1.5H2zm0-9h5v1.5H2zm0 3h5v1.5H2zm0 3h5v1.5H2z"/><path d="M18.003 7v5.5a1 1 0 0 1-1 1H8.996a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h8.007a1 1 0 0 1 1 1zm-1.506.5H9.5V12h6.997V7.5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-size-full.svg
var object_size_full_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.5 17v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM1 15.5v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm0-2v1h-1v-1h1zm-19 0v1H0v-1h1zM14.5 2v1h-1V2h1zm2 0v1h-1V2h1zm2 0v1h-1V2h1zm-8 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm8 0v1h-1V2h1zm-10 0v1h-1V2h1z"/><path d="M18.095 2H1.905C.853 2 0 2.895 0 4v12c0 1.105.853 2 1.905 2h16.19C19.147 18 20 17.105 20 16V4c0-1.105-.853-2-1.905-2zm0 1.5c.263 0 .476.224.476.5v12c0 .276-.213.5-.476.5H1.905a.489.489 0 0 1-.476-.5V4c0-.276.213-.5.476-.5h16.19z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-size-large.svg
var object_size_large_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.5 17v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM1 15.5v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm0-2v1h-1v-1h1zm-19 0v1H0v-1h1zM14.5 2v1h-1V2h1zm2 0v1h-1V2h1zm2 0v1h-1V2h1zm-8 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm8 0v1h-1V2h1zm-10 0v1h-1V2h1z"/><path d="M13 6H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm0 1.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5h11z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-size-small.svg
var object_size_small_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.5 17v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM1 15.5v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm0-2v1h-1v-1h1zm-19 0v1H0v-1h1zM14.5 2v1h-1V2h1zm2 0v1h-1V2h1zm2 0v1h-1V2h1zm-8 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm8 0v1h-1V2h1zm-10 0v1h-1V2h1z"/><path d="M7 10H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm0 1.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h5z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/object-size-medium.svg
var object_size_medium_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.5 17v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zm2 0v1h-1v-1h1zM1 15.5v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm-19-2v1H0v-1h1zm19 0v1h-1v-1h1zm0-2v1h-1v-1h1zm-19 0v1H0v-1h1zM14.5 2v1h-1V2h1zm2 0v1h-1V2h1zm2 0v1h-1V2h1zm-8 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm-2 0v1h-1V2h1zm8 0v1h-1V2h1zm-10 0v1h-1V2h1z"/><path d="M10 8H2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm0 1.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5h8z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/pencil.svg
var pencil_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m7.3 17.37-.061.088a1.518 1.518 0 0 1-.934.535l-4.178.663-.806-4.153a1.495 1.495 0 0 1 .187-1.058l.056-.086L8.77 2.639c.958-1.351 2.803-1.076 4.296-.03 1.497 1.047 2.387 2.693 1.433 4.055L7.3 17.37zM9.14 4.728l-5.545 8.346 3.277 2.294 5.544-8.346L9.14 4.728zM6.07 16.512l-3.276-2.295.53 2.73 2.746-.435zM9.994 3.506 13.271 5.8c.316-.452-.16-1.333-1.065-1.966-.905-.634-1.895-.78-2.212-.328zM8 18.5 9.375 17H19v1.5H8z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/pilcrow.svg
var pilcrow_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.999 2H15a1 1 0 0 1 0 2h-1.004v13a1 1 0 1 1-2 0V4H8.999v13a1 1 0 1 1-2 0v-7A4 4 0 0 1 3 6a4 4 0 0 1 3.999-4z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/quote.svg
var quote_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.423a6.5 6.5 0 0 1 6.056-6.408l.038.67C6.448 5.423 5.354 7.663 5.22 10H9c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574zm8 0a6.5 6.5 0 0 1 6.056-6.408l.038.67c-2.646.739-3.74 2.979-3.873 5.315H17c.552 0 .5.432.5.986v4.511c0 .554-.448.503-1 .503h-5c-.552 0-.5-.449-.5-1.003v-4.574z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/three-vertical-dots.svg
var three_vertical_dots_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="9.5" cy="4.5" r="1.5"/><circle cx="9.5" cy="10.5" r="1.5"/><circle cx="9.5" cy="16.5" r="1.5"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/drag-indicator.svg
var drag_indicator_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 3.25a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M5 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M5 16.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/><path d="M12 16.75a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/bold.svg
var bold_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.187 17H5.773c-.637 0-1.092-.138-1.364-.415-.273-.277-.409-.718-.409-1.323V4.738c0-.617.14-1.062.419-1.332.279-.27.73-.406 1.354-.406h4.68c.69 0 1.288.041 1.793.124.506.083.96.242 1.36.478.341.197.644.447.906.75a3.262 3.262 0 0 1 .808 2.162c0 1.401-.722 2.426-2.167 3.075C15.05 10.175 16 11.315 16 13.01a3.756 3.756 0 0 1-2.296 3.504 6.1 6.1 0 0 1-1.517.377c-.571.073-1.238.11-2 .11zm-.217-6.217H7v4.087h3.069c1.977 0 2.965-.69 2.965-2.072 0-.707-.256-1.22-.768-1.537-.512-.319-1.277-.478-2.296-.478zM7 5.13v3.619h2.606c.729 0 1.292-.067 1.69-.2a1.6 1.6 0 0 0 .91-.765c.165-.267.247-.566.247-.897 0-.707-.26-1.176-.778-1.409-.519-.232-1.31-.348-2.375-.348H7z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/paragraph.svg
var paragraph_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 5.5H7v5h3.5a2.5 2.5 0 1 0 0-5zM5 3h6.5v.025a5 5 0 0 1 0 9.95V13H7v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/plus.svg
var plus_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 0 0-1 1v6H3a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 0 0-1-1Z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/text.svg
var text_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.816 11.5 7.038 4.785 4.261 11.5h5.555Zm.62 1.5H3.641l-1.666 4.028H.312l5.789-14h1.875l5.789 14h-1.663L10.436 13Z"/><path d="m12.09 17-.534-1.292.848-1.971.545 1.319L12.113 17h-.023Zm1.142-5.187.545 1.319L15.5 9.13l1.858 4.316h-3.45l.398.965h3.467L18.887 17H20l-3.873-9h-1.254l-1.641 3.813Z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/theme/icons/importexport.svg
var importexport_default = '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M19 4.5 14 0H3v12.673l.868-1.041c.185-.222.4-.402.632-.54V1.5h8v5h5v7.626a2.24 2.24 0 0 1 1.5.822V4.5ZM14 5V2l3.3 3H14Zm-3.692 12.5c.062.105.133.206.213.303L11.52 19H8v-.876a2.243 2.243 0 0 0 1.82-.624h.488Zm7.518-.657a.75.75 0 0 0-1.152-.96L15.5 17.29V12H14v5.29l-1.174-1.408a.75.75 0 0 0-1.152.96l2.346 2.816a.95.95 0 0 0 1.46 0l2.346-2.815Zm-15.056-.38a.75.75 0 0 1-.096-1.056l2.346-2.815a.95.95 0 0 1 1.46 0l2.346 2.815a.75.75 0 1 1-1.152.96L6.5 14.96V20H5v-5.04l-1.174 1.408a.75.75 0 0 1-1.056.096Z"/></svg>';

// node_modules/@ckeditor/ckeditor5-core/src/augmentation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

// node_modules/@ckeditor/ckeditor5-core/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var icons = {
  bold: bold_default,
  cancel: cancel_default,
  caption: caption_default,
  check: check_default,
  cog: cog_default,
  eraser: eraser_default,
  history: history_default,
  image: image_default,
  lowVision: low_vision_default,
  loupe: loupe_default,
  importExport: importexport_default,
  paragraph: paragraph_default,
  plus: plus_default,
  text: text_default,
  alignBottom: align_bottom_default,
  alignMiddle: align_middle_default,
  alignTop: align_top_default,
  alignLeft: align_left_default,
  alignCenter: align_center_default,
  alignRight: align_right_default,
  alignJustify: align_justify_default,
  objectLeft: object_inline_left_default,
  objectCenter: object_center_default,
  objectRight: object_inline_right_default,
  objectFullWidth: object_full_width_default,
  objectInline: object_inline_default,
  objectBlockLeft: object_left_default,
  objectBlockRight: object_right_default,
  objectSizeFull: object_size_full_default,
  objectSizeLarge: object_size_large_default,
  objectSizeSmall: object_size_small_default,
  objectSizeMedium: object_size_medium_default,
  pencil: pencil_default,
  pilcrow: pilcrow_default,
  quote: quote_default,
  threeVerticalDots: three_vertical_dots_default,
  dragIndicator: drag_indicator_default
};
export {
  command_default as Command,
  context_default as Context,
  contextplugin_default as ContextPlugin,
  DataApiMixin,
  editor_default as Editor,
  ElementApiMixin,
  multicommand_default as MultiCommand,
  pendingactions_default as PendingActions,
  plugin_default as Plugin,
  attachToForm,
  icons,
  secureSourceElement
};
