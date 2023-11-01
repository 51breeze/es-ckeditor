// node_modules/@ckeditor/ckeditor5-engine/src/view/placeholder.js
import "@ckeditor/ckeditor5-engine/theme/placeholder.css";
import {logWarning} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var documentPlaceholders = new WeakMap();
var hasDisplayedPlaceholderDeprecationWarning = false;
function enablePlaceholder({view, element, text, isDirectHost = true, keepOnFocus = false}) {
  const doc = view.document;
  if (!documentPlaceholders.has(doc)) {
    documentPlaceholders.set(doc, new Map());
    doc.registerPostFixer((writer) => updateDocumentPlaceholders(doc, writer));
    doc.on("change:isComposing", () => {
      view.change((writer) => updateDocumentPlaceholders(doc, writer));
    }, {priority: "high"});
  }
  if (element.is("editableElement")) {
    element.on("change:placeholder", (evtInfo, evt, text2) => {
      setPlaceholder(text2);
    });
  }
  if (element.placeholder) {
    setPlaceholder(element.placeholder);
  } else if (text) {
    setPlaceholder(text);
  }
  if (text) {
    showPlaceholderTextDeprecationWarning();
  }
  function setPlaceholder(text2) {
    documentPlaceholders.get(doc).set(element, {
      text: text2,
      isDirectHost,
      keepOnFocus,
      hostElement: isDirectHost ? element : null
    });
    view.change((writer) => updateDocumentPlaceholders(doc, writer));
  }
}
function disablePlaceholder(view, element) {
  const doc = element.document;
  if (!documentPlaceholders.has(doc)) {
    return;
  }
  view.change((writer) => {
    const placeholders = documentPlaceholders.get(doc);
    const config = placeholders.get(element);
    writer.removeAttribute("data-placeholder", config.hostElement);
    hidePlaceholder(writer, config.hostElement);
    placeholders.delete(element);
  });
}
function showPlaceholder(writer, element) {
  if (!element.hasClass("ck-placeholder")) {
    writer.addClass("ck-placeholder", element);
    return true;
  }
  return false;
}
function hidePlaceholder(writer, element) {
  if (element.hasClass("ck-placeholder")) {
    writer.removeClass("ck-placeholder", element);
    return true;
  }
  return false;
}
function needsPlaceholder(element, keepOnFocus) {
  if (!element.isAttached()) {
    return false;
  }
  const hasContent = Array.from(element.getChildren()).some((element2) => !element2.is("uiElement"));
  if (hasContent) {
    return false;
  }
  const doc = element.document;
  const viewSelection = doc.selection;
  const selectionAnchor = viewSelection.anchor;
  if (doc.isComposing && selectionAnchor && selectionAnchor.parent === element) {
    return false;
  }
  if (keepOnFocus) {
    return true;
  }
  if (!doc.isFocused) {
    return true;
  }
  return !!selectionAnchor && selectionAnchor.parent !== element;
}
function updateDocumentPlaceholders(doc, writer) {
  const placeholders = documentPlaceholders.get(doc);
  const directHostElements = [];
  let wasViewModified = false;
  for (const [element, config] of placeholders) {
    if (config.isDirectHost) {
      directHostElements.push(element);
      if (updatePlaceholder(writer, element, config)) {
        wasViewModified = true;
      }
    }
  }
  for (const [element, config] of placeholders) {
    if (config.isDirectHost) {
      continue;
    }
    const hostElement = getChildPlaceholderHostSubstitute(element);
    if (!hostElement) {
      continue;
    }
    if (directHostElements.includes(hostElement)) {
      continue;
    }
    config.hostElement = hostElement;
    if (updatePlaceholder(writer, element, config)) {
      wasViewModified = true;
    }
  }
  return wasViewModified;
}
function updatePlaceholder(writer, element, config) {
  const {text, isDirectHost, hostElement} = config;
  let wasViewModified = false;
  if (hostElement.getAttribute("data-placeholder") !== text) {
    writer.setAttribute("data-placeholder", text, hostElement);
    wasViewModified = true;
  }
  const isOnlyChild = isDirectHost || element.childCount == 1;
  if (isOnlyChild && needsPlaceholder(hostElement, config.keepOnFocus)) {
    if (showPlaceholder(writer, hostElement)) {
      wasViewModified = true;
    }
  } else if (hidePlaceholder(writer, hostElement)) {
    wasViewModified = true;
  }
  return wasViewModified;
}
function getChildPlaceholderHostSubstitute(parent) {
  if (parent.childCount) {
    const firstChild = parent.getChild(0);
    if (firstChild.is("element") && !firstChild.is("uiElement") && !firstChild.is("attributeElement")) {
      return firstChild;
    }
  }
  return null;
}
function showPlaceholderTextDeprecationWarning() {
  if (!hasDisplayedPlaceholderDeprecationWarning) {
    logWarning("enableplaceholder-deprecated-text-option");
  }
  hasDisplayedPlaceholderDeprecationWarning = true;
}

// node_modules/@ckeditor/ckeditor5-engine/src/controller/editingcontroller.js
import {CKEditorError as CKEditorError25, ObservableMixin as ObservableMixin5, env as env6} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/view/typecheckable.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TypeCheckable = class {
  is() {
    throw new Error("is() method is abstract");
  }
};
var typecheckable_default = TypeCheckable;

// node_modules/@ckeditor/ckeditor5-engine/src/view/node.js
import {CKEditorError, EmitterMixin, compareArrays} from "es-ckeditor-lib/lib/utils";
import {clone} from "lodash-es";
import "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Node2 = class extends EmitterMixin(typecheckable_default) {
  constructor(document2) {
    super();
    this.document = document2;
    this.parent = null;
  }
  get index() {
    let pos;
    if (!this.parent) {
      return null;
    }
    if ((pos = this.parent.getChildIndex(this)) == -1) {
      throw new CKEditorError("view-node-not-found-in-parent", this);
    }
    return pos;
  }
  get nextSibling() {
    const index = this.index;
    return index !== null && this.parent.getChild(index + 1) || null;
  }
  get previousSibling() {
    const index = this.index;
    return index !== null && this.parent.getChild(index - 1) || null;
  }
  get root() {
    let root = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }
  isAttached() {
    return this.root.is("rootElement");
  }
  getPath() {
    const path = [];
    let node = this;
    while (node.parent) {
      path.unshift(node.index);
      node = node.parent;
    }
    return path;
  }
  getAncestors(options = {}) {
    const ancestors = [];
    let parent = options.includeSelf ? this : this.parent;
    while (parent) {
      ancestors[options.parentFirst ? "push" : "unshift"](parent);
      parent = parent.parent;
    }
    return ancestors;
  }
  getCommonAncestor(node, options = {}) {
    const ancestorsA = this.getAncestors(options);
    const ancestorsB = node.getAncestors(options);
    let i = 0;
    while (ancestorsA[i] == ancestorsB[i] && ancestorsA[i]) {
      i++;
    }
    return i === 0 ? null : ancestorsA[i - 1];
  }
  isBefore(node) {
    if (this == node) {
      return false;
    }
    if (this.root !== node.root) {
      return false;
    }
    const thisPath = this.getPath();
    const nodePath = node.getPath();
    const result = compareArrays(thisPath, nodePath);
    switch (result) {
      case "prefix":
        return true;
      case "extension":
        return false;
      default:
        return thisPath[result] < nodePath[result];
    }
  }
  isAfter(node) {
    if (this == node) {
      return false;
    }
    if (this.root !== node.root) {
      return false;
    }
    return !this.isBefore(node);
  }
  _remove() {
    this.parent._removeChildren(this.index);
  }
  _fireChange(type, node) {
    this.fire(`change:${type}`, node);
    if (this.parent) {
      this.parent._fireChange(type, node);
    }
  }
  toJSON() {
    const json = clone(this);
    delete json.parent;
    return json;
  }
};
var node_default = Node2;
Node2.prototype.is = function(type) {
  return type === "node" || type === "view:node";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/text.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Text = class extends node_default {
  constructor(document2, data) {
    super(document2);
    this._textData = data;
  }
  get data() {
    return this._textData;
  }
  get _data() {
    return this.data;
  }
  set _data(data) {
    this._fireChange("text", this);
    this._textData = data;
  }
  isSimilar(otherNode) {
    if (!(otherNode instanceof Text)) {
      return false;
    }
    return this === otherNode || this.data === otherNode.data;
  }
  _clone() {
    return new Text(this.document, this.data);
  }
};
var text_default = Text;
Text.prototype.is = function(type) {
  return type === "$text" || type === "view:$text" || type === "text" || type === "view:text" || type === "node" || type === "view:node";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/textproxy.js
import {CKEditorError as CKEditorError2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TextProxy = class extends typecheckable_default {
  constructor(textNode, offsetInText, length) {
    super();
    this.textNode = textNode;
    if (offsetInText < 0 || offsetInText > textNode.data.length) {
      throw new CKEditorError2("view-textproxy-wrong-offsetintext", this);
    }
    if (length < 0 || offsetInText + length > textNode.data.length) {
      throw new CKEditorError2("view-textproxy-wrong-length", this);
    }
    this.data = textNode.data.substring(offsetInText, offsetInText + length);
    this.offsetInText = offsetInText;
  }
  get offsetSize() {
    return this.data.length;
  }
  get isPartial() {
    return this.data.length !== this.textNode.data.length;
  }
  get parent() {
    return this.textNode.parent;
  }
  get root() {
    return this.textNode.root;
  }
  get document() {
    return this.textNode.document;
  }
  getAncestors(options = {}) {
    const ancestors = [];
    let parent = options.includeSelf ? this.textNode : this.parent;
    while (parent !== null) {
      ancestors[options.parentFirst ? "push" : "unshift"](parent);
      parent = parent.parent;
    }
    return ancestors;
  }
};
var textproxy_default = TextProxy;
TextProxy.prototype.is = function(type) {
  return type === "$textProxy" || type === "view:$textProxy" || type === "textProxy" || type === "view:textProxy";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/element.js
import {isIterable, toArray, toMap} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/view/matcher.js
import {isPlainObject} from "lodash-es";
import {logWarning as logWarning2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Matcher = class {
  constructor(...pattern) {
    this._patterns = [];
    this.add(...pattern);
  }
  add(...pattern) {
    for (let item of pattern) {
      if (typeof item == "string" || item instanceof RegExp) {
        item = {name: item};
      }
      this._patterns.push(item);
    }
  }
  match(...element) {
    for (const singleElement of element) {
      for (const pattern of this._patterns) {
        const match = isElementMatching(singleElement, pattern);
        if (match) {
          return {
            element: singleElement,
            pattern,
            match
          };
        }
      }
    }
    return null;
  }
  matchAll(...element) {
    const results = [];
    for (const singleElement of element) {
      for (const pattern of this._patterns) {
        const match = isElementMatching(singleElement, pattern);
        if (match) {
          results.push({
            element: singleElement,
            pattern,
            match
          });
        }
      }
    }
    return results.length > 0 ? results : null;
  }
  getElementName() {
    if (this._patterns.length !== 1) {
      return null;
    }
    const pattern = this._patterns[0];
    const name = pattern.name;
    return typeof pattern != "function" && name && !(name instanceof RegExp) ? name : null;
  }
};
var matcher_default = Matcher;
function isElementMatching(element, pattern) {
  if (typeof pattern == "function") {
    return pattern(element);
  }
  const match = {};
  if (pattern.name) {
    match.name = matchName(pattern.name, element.name);
    if (!match.name) {
      return null;
    }
  }
  if (pattern.attributes) {
    match.attributes = matchAttributes(pattern.attributes, element);
    if (!match.attributes) {
      return null;
    }
  }
  if (pattern.classes) {
    match.classes = matchClasses(pattern.classes, element);
    if (!match.classes) {
      return null;
    }
  }
  if (pattern.styles) {
    match.styles = matchStyles(pattern.styles, element);
    if (!match.styles) {
      return null;
    }
  }
  return match;
}
function matchName(pattern, name) {
  if (pattern instanceof RegExp) {
    return !!name.match(pattern);
  }
  return pattern === name;
}
function matchPatterns(patterns, keys, valueGetter) {
  const normalizedPatterns = normalizePatterns(patterns);
  const normalizedItems = Array.from(keys);
  const match = [];
  normalizedPatterns.forEach(([patternKey, patternValue]) => {
    normalizedItems.forEach((itemKey) => {
      if (isKeyMatched(patternKey, itemKey) && isValueMatched(patternValue, itemKey, valueGetter)) {
        match.push(itemKey);
      }
    });
  });
  if (!normalizedPatterns.length || match.length < normalizedPatterns.length) {
    return void 0;
  }
  return match;
}
function normalizePatterns(patterns) {
  if (Array.isArray(patterns)) {
    return patterns.map((pattern) => {
      if (isPlainObject(pattern)) {
        if (pattern.key === void 0 || pattern.value === void 0) {
          logWarning2("matcher-pattern-missing-key-or-value", pattern);
        }
        return [pattern.key, pattern.value];
      }
      return [pattern, true];
    });
  }
  if (isPlainObject(patterns)) {
    return Object.entries(patterns);
  }
  return [[patterns, true]];
}
function isKeyMatched(patternKey, itemKey) {
  return patternKey === true || patternKey === itemKey || patternKey instanceof RegExp && itemKey.match(patternKey);
}
function isValueMatched(patternValue, itemKey, valueGetter) {
  if (patternValue === true) {
    return true;
  }
  const itemValue = valueGetter(itemKey);
  return patternValue === itemValue || patternValue instanceof RegExp && !!String(itemValue).match(patternValue);
}
function matchAttributes(patterns, element) {
  const attributeKeys = new Set(element.getAttributeKeys());
  if (isPlainObject(patterns)) {
    if (patterns.style !== void 0) {
      logWarning2("matcher-pattern-deprecated-attributes-style-key", patterns);
    }
    if (patterns.class !== void 0) {
      logWarning2("matcher-pattern-deprecated-attributes-class-key", patterns);
    }
  } else {
    attributeKeys.delete("style");
    attributeKeys.delete("class");
  }
  return matchPatterns(patterns, attributeKeys, (key) => element.getAttribute(key));
}
function matchClasses(patterns, element) {
  return matchPatterns(patterns, element.getClassNames(), () => {
  });
}
function matchStyles(patterns, element) {
  return matchPatterns(patterns, element.getStyleNames(true), (key) => element.getStyle(key));
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/stylesmap.js
import {get, isObject, merge, set, unset} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var StylesMap = class {
  constructor(styleProcessor) {
    this._styles = {};
    this._styleProcessor = styleProcessor;
  }
  get isEmpty() {
    const entries = Object.entries(this._styles);
    const from = Array.from(entries);
    return !from.length;
  }
  get size() {
    if (this.isEmpty) {
      return 0;
    }
    return this.getStyleNames().length;
  }
  setTo(inlineStyle) {
    this.clear();
    const parsedStyles = Array.from(parseInlineStyles(inlineStyle).entries());
    for (const [key, value] of parsedStyles) {
      this._styleProcessor.toNormalizedForm(key, value, this._styles);
    }
  }
  has(name) {
    if (this.isEmpty) {
      return false;
    }
    const styles = this._styleProcessor.getReducedForm(name, this._styles);
    const propertyDescriptor = styles.find(([property]) => property === name);
    return Array.isArray(propertyDescriptor);
  }
  set(nameOrObject, valueOrObject) {
    if (isObject(nameOrObject)) {
      for (const [key, value] of Object.entries(nameOrObject)) {
        this._styleProcessor.toNormalizedForm(key, value, this._styles);
      }
    } else {
      this._styleProcessor.toNormalizedForm(nameOrObject, valueOrObject, this._styles);
    }
  }
  remove(name) {
    const path = toPath(name);
    unset(this._styles, path);
    delete this._styles[name];
    this._cleanEmptyObjectsOnPath(path);
  }
  getNormalized(name) {
    return this._styleProcessor.getNormalized(name, this._styles);
  }
  toString() {
    if (this.isEmpty) {
      return "";
    }
    return this._getStylesEntries().map((arr) => arr.join(":")).sort().join(";") + ";";
  }
  getAsString(propertyName) {
    if (this.isEmpty) {
      return;
    }
    if (this._styles[propertyName] && !isObject(this._styles[propertyName])) {
      return this._styles[propertyName];
    }
    const styles = this._styleProcessor.getReducedForm(propertyName, this._styles);
    const propertyDescriptor = styles.find(([property]) => property === propertyName);
    if (Array.isArray(propertyDescriptor)) {
      return propertyDescriptor[1];
    }
  }
  getStyleNames(expand = false) {
    if (this.isEmpty) {
      return [];
    }
    if (expand) {
      return this._styleProcessor.getStyleNames(this._styles);
    }
    const entries = this._getStylesEntries();
    return entries.map(([key]) => key);
  }
  clear() {
    this._styles = {};
  }
  _getStylesEntries() {
    const parsed = [];
    const keys = Object.keys(this._styles);
    for (const key of keys) {
      parsed.push(...this._styleProcessor.getReducedForm(key, this._styles));
    }
    return parsed;
  }
  _cleanEmptyObjectsOnPath(path) {
    const pathParts = path.split(".");
    const isChildPath = pathParts.length > 1;
    if (!isChildPath) {
      return;
    }
    const parentPath = pathParts.splice(0, pathParts.length - 1).join(".");
    const parentObject = get(this._styles, parentPath);
    if (!parentObject) {
      return;
    }
    const isParentEmpty = !Array.from(Object.keys(parentObject)).length;
    if (isParentEmpty) {
      this.remove(parentPath);
    }
  }
};
var stylesmap_default = StylesMap;
var StylesProcessor = class {
  constructor() {
    this._normalizers = new Map();
    this._extractors = new Map();
    this._reducers = new Map();
    this._consumables = new Map();
  }
  toNormalizedForm(name, propertyValue, styles) {
    if (isObject(propertyValue)) {
      appendStyleValue(styles, toPath(name), propertyValue);
      return;
    }
    if (this._normalizers.has(name)) {
      const normalizer = this._normalizers.get(name);
      const {path, value} = normalizer(propertyValue);
      appendStyleValue(styles, path, value);
    } else {
      appendStyleValue(styles, name, propertyValue);
    }
  }
  getNormalized(name, styles) {
    if (!name) {
      return merge({}, styles);
    }
    if (styles[name] !== void 0) {
      return styles[name];
    }
    if (this._extractors.has(name)) {
      const extractor = this._extractors.get(name);
      if (typeof extractor === "string") {
        return get(styles, extractor);
      }
      const value = extractor(name, styles);
      if (value) {
        return value;
      }
    }
    return get(styles, toPath(name));
  }
  getReducedForm(name, styles) {
    const normalizedValue = this.getNormalized(name, styles);
    if (normalizedValue === void 0) {
      return [];
    }
    if (this._reducers.has(name)) {
      const reducer = this._reducers.get(name);
      return reducer(normalizedValue);
    }
    return [[name, normalizedValue]];
  }
  getStyleNames(styles) {
    const expandedStyleNames = Array.from(this._consumables.keys()).filter((name) => {
      const style = this.getNormalized(name, styles);
      if (style && typeof style == "object") {
        return Object.keys(style).length;
      }
      return style;
    });
    const styleNamesKeysSet = new Set([
      ...expandedStyleNames,
      ...Object.keys(styles)
    ]);
    return Array.from(styleNamesKeysSet.values());
  }
  getRelatedStyles(name) {
    return this._consumables.get(name) || [];
  }
  setNormalizer(name, callback) {
    this._normalizers.set(name, callback);
  }
  setExtractor(name, callbackOrPath) {
    this._extractors.set(name, callbackOrPath);
  }
  setReducer(name, callback) {
    this._reducers.set(name, callback);
  }
  setStyleRelation(shorthandName, styleNames) {
    this._mapStyleNames(shorthandName, styleNames);
    for (const alsoName of styleNames) {
      this._mapStyleNames(alsoName, [shorthandName]);
    }
  }
  _mapStyleNames(name, styleNames) {
    if (!this._consumables.has(name)) {
      this._consumables.set(name, []);
    }
    this._consumables.get(name).push(...styleNames);
  }
};
function parseInlineStyles(stylesString) {
  let quoteType = null;
  let propertyNameStart = 0;
  let propertyValueStart = 0;
  let propertyName = null;
  const stylesMap = new Map();
  if (stylesString === "") {
    return stylesMap;
  }
  if (stylesString.charAt(stylesString.length - 1) != ";") {
    stylesString = stylesString + ";";
  }
  for (let i = 0; i < stylesString.length; i++) {
    const char = stylesString.charAt(i);
    if (quoteType === null) {
      switch (char) {
        case ":":
          if (!propertyName) {
            propertyName = stylesString.substr(propertyNameStart, i - propertyNameStart);
            propertyValueStart = i + 1;
          }
          break;
        case '"':
        case "'":
          quoteType = char;
          break;
        case ";": {
          const propertyValue = stylesString.substr(propertyValueStart, i - propertyValueStart);
          if (propertyName) {
            stylesMap.set(propertyName.trim(), propertyValue.trim());
          }
          propertyName = null;
          propertyNameStart = i + 1;
          break;
        }
      }
    } else if (char === quoteType) {
      quoteType = null;
    }
  }
  return stylesMap;
}
function toPath(name) {
  return name.replace("-", ".");
}
function appendStyleValue(stylesObject, nameOrPath, valueOrObject) {
  let valueToSet = valueOrObject;
  if (isObject(valueOrObject)) {
    valueToSet = merge({}, get(stylesObject, nameOrPath), valueOrObject);
  }
  set(stylesObject, nameOrPath, valueToSet);
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/element.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Element = class extends node_default {
  constructor(document2, name, attrs, children) {
    super(document2);
    this._unsafeAttributesToRender = [];
    this._customProperties = new Map();
    this.name = name;
    this._attrs = parseAttributes(attrs);
    this._children = [];
    if (children) {
      this._insertChild(0, children);
    }
    this._classes = new Set();
    if (this._attrs.has("class")) {
      const classString = this._attrs.get("class");
      parseClasses(this._classes, classString);
      this._attrs.delete("class");
    }
    this._styles = new stylesmap_default(this.document.stylesProcessor);
    if (this._attrs.has("style")) {
      this._styles.setTo(this._attrs.get("style"));
      this._attrs.delete("style");
    }
  }
  get childCount() {
    return this._children.length;
  }
  get isEmpty() {
    return this._children.length === 0;
  }
  getChild(index) {
    return this._children[index];
  }
  getChildIndex(node) {
    return this._children.indexOf(node);
  }
  getChildren() {
    return this._children[Symbol.iterator]();
  }
  *getAttributeKeys() {
    if (this._classes.size > 0) {
      yield "class";
    }
    if (!this._styles.isEmpty) {
      yield "style";
    }
    yield* this._attrs.keys();
  }
  *getAttributes() {
    yield* this._attrs.entries();
    if (this._classes.size > 0) {
      yield ["class", this.getAttribute("class")];
    }
    if (!this._styles.isEmpty) {
      yield ["style", this.getAttribute("style")];
    }
  }
  getAttribute(key) {
    if (key == "class") {
      if (this._classes.size > 0) {
        return [...this._classes].join(" ");
      }
      return void 0;
    }
    if (key == "style") {
      const inlineStyle = this._styles.toString();
      return inlineStyle == "" ? void 0 : inlineStyle;
    }
    return this._attrs.get(key);
  }
  hasAttribute(key) {
    if (key == "class") {
      return this._classes.size > 0;
    }
    if (key == "style") {
      return !this._styles.isEmpty;
    }
    return this._attrs.has(key);
  }
  isSimilar(otherElement) {
    if (!(otherElement instanceof Element)) {
      return false;
    }
    if (this === otherElement) {
      return true;
    }
    if (this.name != otherElement.name) {
      return false;
    }
    if (this._attrs.size !== otherElement._attrs.size || this._classes.size !== otherElement._classes.size || this._styles.size !== otherElement._styles.size) {
      return false;
    }
    for (const [key, value] of this._attrs) {
      if (!otherElement._attrs.has(key) || otherElement._attrs.get(key) !== value) {
        return false;
      }
    }
    for (const className of this._classes) {
      if (!otherElement._classes.has(className)) {
        return false;
      }
    }
    for (const property of this._styles.getStyleNames()) {
      if (!otherElement._styles.has(property) || otherElement._styles.getAsString(property) !== this._styles.getAsString(property)) {
        return false;
      }
    }
    return true;
  }
  hasClass(...className) {
    for (const name of className) {
      if (!this._classes.has(name)) {
        return false;
      }
    }
    return true;
  }
  getClassNames() {
    return this._classes.keys();
  }
  getStyle(property) {
    return this._styles.getAsString(property);
  }
  getNormalizedStyle(property) {
    return this._styles.getNormalized(property);
  }
  getStyleNames(expand) {
    return this._styles.getStyleNames(expand);
  }
  hasStyle(...property) {
    for (const name of property) {
      if (!this._styles.has(name)) {
        return false;
      }
    }
    return true;
  }
  findAncestor(...patterns) {
    const matcher = new matcher_default(...patterns);
    let parent = this.parent;
    while (parent && !parent.is("documentFragment")) {
      if (matcher.match(parent)) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
  getCustomProperty(key) {
    return this._customProperties.get(key);
  }
  *getCustomProperties() {
    yield* this._customProperties.entries();
  }
  getIdentity() {
    const classes = Array.from(this._classes).sort().join(",");
    const styles = this._styles.toString();
    const attributes = Array.from(this._attrs).map((i) => `${i[0]}="${i[1]}"`).sort().join(" ");
    return this.name + (classes == "" ? "" : ` class="${classes}"`) + (!styles ? "" : ` style="${styles}"`) + (attributes == "" ? "" : ` ${attributes}`);
  }
  shouldRenderUnsafeAttribute(attributeName) {
    return this._unsafeAttributesToRender.includes(attributeName);
  }
  _clone(deep = false) {
    const childrenClone = [];
    if (deep) {
      for (const child of this.getChildren()) {
        childrenClone.push(child._clone(deep));
      }
    }
    const cloned = new this.constructor(this.document, this.name, this._attrs, childrenClone);
    cloned._classes = new Set(this._classes);
    cloned._styles.set(this._styles.getNormalized());
    cloned._customProperties = new Map(this._customProperties);
    cloned.getFillerOffset = this.getFillerOffset;
    cloned._unsafeAttributesToRender = this._unsafeAttributesToRender;
    return cloned;
  }
  _appendChild(items) {
    return this._insertChild(this.childCount, items);
  }
  _insertChild(index, items) {
    this._fireChange("children", this);
    let count2 = 0;
    const nodes = normalize(this.document, items);
    for (const node of nodes) {
      if (node.parent !== null) {
        node._remove();
      }
      node.parent = this;
      node.document = this.document;
      this._children.splice(index, 0, node);
      index++;
      count2++;
    }
    return count2;
  }
  _removeChildren(index, howMany = 1) {
    this._fireChange("children", this);
    for (let i = index; i < index + howMany; i++) {
      this._children[i].parent = null;
    }
    return this._children.splice(index, howMany);
  }
  _setAttribute(key, value) {
    const stringValue = String(value);
    this._fireChange("attributes", this);
    if (key == "class") {
      parseClasses(this._classes, stringValue);
    } else if (key == "style") {
      this._styles.setTo(stringValue);
    } else {
      this._attrs.set(key, stringValue);
    }
  }
  _removeAttribute(key) {
    this._fireChange("attributes", this);
    if (key == "class") {
      if (this._classes.size > 0) {
        this._classes.clear();
        return true;
      }
      return false;
    }
    if (key == "style") {
      if (!this._styles.isEmpty) {
        this._styles.clear();
        return true;
      }
      return false;
    }
    return this._attrs.delete(key);
  }
  _addClass(className) {
    this._fireChange("attributes", this);
    for (const name of toArray(className)) {
      this._classes.add(name);
    }
  }
  _removeClass(className) {
    this._fireChange("attributes", this);
    for (const name of toArray(className)) {
      this._classes.delete(name);
    }
  }
  _setStyle(property, value) {
    this._fireChange("attributes", this);
    if (typeof property != "string") {
      this._styles.set(property);
    } else {
      this._styles.set(property, value);
    }
  }
  _removeStyle(property) {
    this._fireChange("attributes", this);
    for (const name of toArray(property)) {
      this._styles.remove(name);
    }
  }
  _setCustomProperty(key, value) {
    this._customProperties.set(key, value);
  }
  _removeCustomProperty(key) {
    return this._customProperties.delete(key);
  }
};
var element_default = Element;
Element.prototype.is = function(type, name) {
  if (!name) {
    return type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "element" || type === "view:element");
  }
};
function parseAttributes(attrs) {
  const attrsMap = toMap(attrs);
  for (const [key, value] of attrsMap) {
    if (value === null) {
      attrsMap.delete(key);
    } else if (typeof value != "string") {
      attrsMap.set(key, String(value));
    }
  }
  return attrsMap;
}
function parseClasses(classesSet, classesString) {
  const classArray = classesString.split(/\s+/);
  classesSet.clear();
  classArray.forEach((name) => classesSet.add(name));
}
function normalize(document2, nodes) {
  if (typeof nodes == "string") {
    return [new text_default(document2, nodes)];
  }
  if (!isIterable(nodes)) {
    nodes = [nodes];
  }
  return Array.from(nodes).map((node) => {
    if (typeof node == "string") {
      return new text_default(document2, node);
    }
    if (node instanceof textproxy_default) {
      return new text_default(document2, node.data);
    }
    return node;
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/containerelement.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ContainerElement = class extends element_default {
  constructor(document2, name, attrs, children) {
    super(document2, name, attrs, children);
    this.getFillerOffset = getFillerOffset;
  }
};
var containerelement_default = ContainerElement;
ContainerElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element");
  }
};
function getFillerOffset() {
  const children = [...this.getChildren()];
  const lastChild = children[this.childCount - 1];
  if (lastChild && lastChild.is("element", "br")) {
    return this.childCount;
  }
  for (const child of children) {
    if (!child.is("uiElement")) {
      return null;
    }
  }
  return this.childCount;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/editableelement.js
import {ObservableMixin} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditableElement = class extends ObservableMixin(containerelement_default) {
  constructor(document2, name, attributes, children) {
    super(document2, name, attributes, children);
    this.set("isReadOnly", false);
    this.set("isFocused", false);
    this.set("placeholder", void 0);
    this.bind("isReadOnly").to(document2);
    this.bind("isFocused").to(document2, "isFocused", (isFocused) => isFocused && document2.selection.editableElement == this);
    this.listenTo(document2.selection, "change", () => {
      this.isFocused = document2.isFocused && document2.selection.editableElement == this;
    });
  }
  destroy() {
    this.stopListening();
  }
};
var editableelement_default = EditableElement;
EditableElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "editableElement" || type === "view:editableElement" || type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "editableElement" || type === "view:editableElement" || type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element");
  }
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/rooteditableelement.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var rootNameSymbol = Symbol("rootName");
var RootEditableElement = class extends editableelement_default {
  constructor(document2, name) {
    super(document2, name);
    this.rootName = "main";
  }
  get rootName() {
    return this.getCustomProperty(rootNameSymbol);
  }
  set rootName(rootName) {
    this._setCustomProperty(rootNameSymbol, rootName);
  }
  set _name(name) {
    this.name = name;
  }
};
var rooteditableelement_default = RootEditableElement;
RootEditableElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "rootElement" || type === "view:rootElement" || type === "editableElement" || type === "view:editableElement" || type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "rootElement" || type === "view:rootElement" || type === "editableElement" || type === "view:editableElement" || type === "containerElement" || type === "view:containerElement" || type === "element" || type === "view:element");
  }
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/position.js
import {CKEditorError as CKEditorError4, compareArrays as compareArrays2} from "es-ckeditor-lib/lib/utils";
import "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/view/treewalker.js
import {CKEditorError as CKEditorError3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TreeWalker = class {
  constructor(options = {}) {
    if (!options.boundaries && !options.startPosition) {
      throw new CKEditorError3("view-tree-walker-no-start-position", null);
    }
    if (options.direction && options.direction != "forward" && options.direction != "backward") {
      throw new CKEditorError3("view-tree-walker-unknown-direction", options.startPosition, {direction: options.direction});
    }
    this.boundaries = options.boundaries || null;
    if (options.startPosition) {
      this._position = position_default._createAt(options.startPosition);
    } else {
      this._position = position_default._createAt(options.boundaries[options.direction == "backward" ? "end" : "start"]);
    }
    this.direction = options.direction || "forward";
    this.singleCharacters = !!options.singleCharacters;
    this.shallow = !!options.shallow;
    this.ignoreElementEnd = !!options.ignoreElementEnd;
    this._boundaryStartParent = this.boundaries ? this.boundaries.start.parent : null;
    this._boundaryEndParent = this.boundaries ? this.boundaries.end.parent : null;
  }
  [Symbol.iterator]() {
    return this;
  }
  get position() {
    return this._position;
  }
  skip(skip) {
    let nextResult;
    let prevPosition;
    do {
      prevPosition = this.position;
      nextResult = this.next();
    } while (!nextResult.done && skip(nextResult.value));
    if (!nextResult.done) {
      this._position = prevPosition;
    }
  }
  next() {
    if (this.direction == "forward") {
      return this._next();
    } else {
      return this._previous();
    }
  }
  _next() {
    let position = this.position.clone();
    const previousPosition = this.position;
    const parent = position.parent;
    if (parent.parent === null && position.offset === parent.childCount) {
      return {done: true, value: void 0};
    }
    if (parent === this._boundaryEndParent && position.offset == this.boundaries.end.offset) {
      return {done: true, value: void 0};
    }
    let node;
    if (parent instanceof text_default) {
      if (position.isAtEnd) {
        this._position = position_default._createAfter(parent);
        return this._next();
      }
      node = parent.data[position.offset];
    } else {
      node = parent.getChild(position.offset);
    }
    if (node instanceof element_default) {
      if (!this.shallow) {
        position = new position_default(node, 0);
      } else {
        if (this.boundaries && this.boundaries.end.isBefore(position)) {
          return {done: true, value: void 0};
        }
        position.offset++;
      }
      this._position = position;
      return this._formatReturnValue("elementStart", node, previousPosition, position, 1);
    }
    if (node instanceof text_default) {
      if (this.singleCharacters) {
        position = new position_default(node, 0);
        this._position = position;
        return this._next();
      }
      let charactersCount = node.data.length;
      let item;
      if (node == this._boundaryEndParent) {
        charactersCount = this.boundaries.end.offset;
        item = new textproxy_default(node, 0, charactersCount);
        position = position_default._createAfter(item);
      } else {
        item = new textproxy_default(node, 0, node.data.length);
        position.offset++;
      }
      this._position = position;
      return this._formatReturnValue("text", item, previousPosition, position, charactersCount);
    }
    if (typeof node == "string") {
      let textLength;
      if (this.singleCharacters) {
        textLength = 1;
      } else {
        const endOffset = parent === this._boundaryEndParent ? this.boundaries.end.offset : parent.data.length;
        textLength = endOffset - position.offset;
      }
      const textProxy = new textproxy_default(parent, position.offset, textLength);
      position.offset += textLength;
      this._position = position;
      return this._formatReturnValue("text", textProxy, previousPosition, position, textLength);
    }
    position = position_default._createAfter(parent);
    this._position = position;
    if (this.ignoreElementEnd) {
      return this._next();
    }
    return this._formatReturnValue("elementEnd", parent, previousPosition, position);
  }
  _previous() {
    let position = this.position.clone();
    const previousPosition = this.position;
    const parent = position.parent;
    if (parent.parent === null && position.offset === 0) {
      return {done: true, value: void 0};
    }
    if (parent == this._boundaryStartParent && position.offset == this.boundaries.start.offset) {
      return {done: true, value: void 0};
    }
    let node;
    if (parent instanceof text_default) {
      if (position.isAtStart) {
        this._position = position_default._createBefore(parent);
        return this._previous();
      }
      node = parent.data[position.offset - 1];
    } else {
      node = parent.getChild(position.offset - 1);
    }
    if (node instanceof element_default) {
      if (this.shallow) {
        position.offset--;
        this._position = position;
        return this._formatReturnValue("elementStart", node, previousPosition, position, 1);
      }
      position = new position_default(node, node.childCount);
      this._position = position;
      if (this.ignoreElementEnd) {
        return this._previous();
      }
      return this._formatReturnValue("elementEnd", node, previousPosition, position);
    }
    if (node instanceof text_default) {
      if (this.singleCharacters) {
        position = new position_default(node, node.data.length);
        this._position = position;
        return this._previous();
      }
      let charactersCount = node.data.length;
      let item;
      if (node == this._boundaryStartParent) {
        const offset = this.boundaries.start.offset;
        item = new textproxy_default(node, offset, node.data.length - offset);
        charactersCount = item.data.length;
        position = position_default._createBefore(item);
      } else {
        item = new textproxy_default(node, 0, node.data.length);
        position.offset--;
      }
      this._position = position;
      return this._formatReturnValue("text", item, previousPosition, position, charactersCount);
    }
    if (typeof node == "string") {
      let textLength;
      if (!this.singleCharacters) {
        const startOffset = parent === this._boundaryStartParent ? this.boundaries.start.offset : 0;
        textLength = position.offset - startOffset;
      } else {
        textLength = 1;
      }
      position.offset -= textLength;
      const textProxy = new textproxy_default(parent, position.offset, textLength);
      this._position = position;
      return this._formatReturnValue("text", textProxy, previousPosition, position, textLength);
    }
    position = position_default._createBefore(parent);
    this._position = position;
    return this._formatReturnValue("elementStart", parent, previousPosition, position, 1);
  }
  _formatReturnValue(type, item, previousPosition, nextPosition, length) {
    if (item instanceof textproxy_default) {
      if (item.offsetInText + item.data.length == item.textNode.data.length) {
        if (this.direction == "forward" && !(this.boundaries && this.boundaries.end.isEqual(this.position))) {
          nextPosition = position_default._createAfter(item.textNode);
          this._position = nextPosition;
        } else {
          previousPosition = position_default._createAfter(item.textNode);
        }
      }
      if (item.offsetInText === 0) {
        if (this.direction == "backward" && !(this.boundaries && this.boundaries.start.isEqual(this.position))) {
          nextPosition = position_default._createBefore(item.textNode);
          this._position = nextPosition;
        } else {
          previousPosition = position_default._createBefore(item.textNode);
        }
      }
    }
    return {
      done: false,
      value: {
        type,
        item,
        previousPosition,
        nextPosition,
        length
      }
    };
  }
};
var treewalker_default = TreeWalker;

// node_modules/@ckeditor/ckeditor5-engine/src/view/position.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Position = class extends typecheckable_default {
  constructor(parent, offset) {
    super();
    this.parent = parent;
    this.offset = offset;
  }
  get nodeAfter() {
    if (this.parent.is("$text")) {
      return null;
    }
    return this.parent.getChild(this.offset) || null;
  }
  get nodeBefore() {
    if (this.parent.is("$text")) {
      return null;
    }
    return this.parent.getChild(this.offset - 1) || null;
  }
  get isAtStart() {
    return this.offset === 0;
  }
  get isAtEnd() {
    const endOffset = this.parent.is("$text") ? this.parent.data.length : this.parent.childCount;
    return this.offset === endOffset;
  }
  get root() {
    return this.parent.root;
  }
  get editableElement() {
    let editable = this.parent;
    while (!(editable instanceof editableelement_default)) {
      if (editable.parent) {
        editable = editable.parent;
      } else {
        return null;
      }
    }
    return editable;
  }
  getShiftedBy(shift) {
    const shifted = Position._createAt(this);
    const offset = shifted.offset + shift;
    shifted.offset = offset < 0 ? 0 : offset;
    return shifted;
  }
  getLastMatchingPosition(skip, options = {}) {
    options.startPosition = this;
    const treeWalker = new treewalker_default(options);
    treeWalker.skip(skip);
    return treeWalker.position;
  }
  getAncestors() {
    if (this.parent.is("documentFragment")) {
      return [this.parent];
    } else {
      return this.parent.getAncestors({includeSelf: true});
    }
  }
  getCommonAncestor(position) {
    const ancestorsA = this.getAncestors();
    const ancestorsB = position.getAncestors();
    let i = 0;
    while (ancestorsA[i] == ancestorsB[i] && ancestorsA[i]) {
      i++;
    }
    return i === 0 ? null : ancestorsA[i - 1];
  }
  isEqual(otherPosition) {
    return this.parent == otherPosition.parent && this.offset == otherPosition.offset;
  }
  isBefore(otherPosition) {
    return this.compareWith(otherPosition) == "before";
  }
  isAfter(otherPosition) {
    return this.compareWith(otherPosition) == "after";
  }
  compareWith(otherPosition) {
    if (this.root !== otherPosition.root) {
      return "different";
    }
    if (this.isEqual(otherPosition)) {
      return "same";
    }
    const thisPath = this.parent.is("node") ? this.parent.getPath() : [];
    const otherPath = otherPosition.parent.is("node") ? otherPosition.parent.getPath() : [];
    thisPath.push(this.offset);
    otherPath.push(otherPosition.offset);
    const result = compareArrays2(thisPath, otherPath);
    switch (result) {
      case "prefix":
        return "before";
      case "extension":
        return "after";
      default:
        return thisPath[result] < otherPath[result] ? "before" : "after";
    }
  }
  getWalker(options = {}) {
    options.startPosition = this;
    return new treewalker_default(options);
  }
  clone() {
    return new Position(this.parent, this.offset);
  }
  static _createAt(itemOrPosition, offset) {
    if (itemOrPosition instanceof Position) {
      return new this(itemOrPosition.parent, itemOrPosition.offset);
    } else {
      const node = itemOrPosition;
      if (offset == "end") {
        offset = node.is("$text") ? node.data.length : node.childCount;
      } else if (offset == "before") {
        return this._createBefore(node);
      } else if (offset == "after") {
        return this._createAfter(node);
      } else if (offset !== 0 && !offset) {
        throw new CKEditorError4("view-createpositionat-offset-required", node);
      }
      return new Position(node, offset);
    }
  }
  static _createAfter(item) {
    if (item.is("$textProxy")) {
      return new Position(item.textNode, item.offsetInText + item.data.length);
    }
    if (!item.parent) {
      throw new CKEditorError4("view-position-after-root", item, {root: item});
    }
    return new Position(item.parent, item.index + 1);
  }
  static _createBefore(item) {
    if (item.is("$textProxy")) {
      return new Position(item.textNode, item.offsetInText);
    }
    if (!item.parent) {
      throw new CKEditorError4("view-position-before-root", item, {root: item});
    }
    return new Position(item.parent, item.index);
  }
};
var position_default = Position;
Position.prototype.is = function(type) {
  return type === "position" || type === "view:position";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/range.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Range = class extends typecheckable_default {
  constructor(start, end = null) {
    super();
    this.start = start.clone();
    this.end = end ? end.clone() : start.clone();
  }
  *[Symbol.iterator]() {
    yield* new treewalker_default({boundaries: this, ignoreElementEnd: true});
  }
  get isCollapsed() {
    return this.start.isEqual(this.end);
  }
  get isFlat() {
    return this.start.parent === this.end.parent;
  }
  get root() {
    return this.start.root;
  }
  getEnlarged() {
    let start = this.start.getLastMatchingPosition(enlargeTrimSkip, {direction: "backward"});
    let end = this.end.getLastMatchingPosition(enlargeTrimSkip);
    if (start.parent.is("$text") && start.isAtStart) {
      start = position_default._createBefore(start.parent);
    }
    if (end.parent.is("$text") && end.isAtEnd) {
      end = position_default._createAfter(end.parent);
    }
    return new Range(start, end);
  }
  getTrimmed() {
    let start = this.start.getLastMatchingPosition(enlargeTrimSkip);
    if (start.isAfter(this.end) || start.isEqual(this.end)) {
      return new Range(start, start);
    }
    let end = this.end.getLastMatchingPosition(enlargeTrimSkip, {direction: "backward"});
    const nodeAfterStart = start.nodeAfter;
    const nodeBeforeEnd = end.nodeBefore;
    if (nodeAfterStart && nodeAfterStart.is("$text")) {
      start = new position_default(nodeAfterStart, 0);
    }
    if (nodeBeforeEnd && nodeBeforeEnd.is("$text")) {
      end = new position_default(nodeBeforeEnd, nodeBeforeEnd.data.length);
    }
    return new Range(start, end);
  }
  isEqual(otherRange) {
    return this == otherRange || this.start.isEqual(otherRange.start) && this.end.isEqual(otherRange.end);
  }
  containsPosition(position) {
    return position.isAfter(this.start) && position.isBefore(this.end);
  }
  containsRange(otherRange, loose = false) {
    if (otherRange.isCollapsed) {
      loose = false;
    }
    const containsStart = this.containsPosition(otherRange.start) || loose && this.start.isEqual(otherRange.start);
    const containsEnd = this.containsPosition(otherRange.end) || loose && this.end.isEqual(otherRange.end);
    return containsStart && containsEnd;
  }
  getDifference(otherRange) {
    const ranges = [];
    if (this.isIntersecting(otherRange)) {
      if (this.containsPosition(otherRange.start)) {
        ranges.push(new Range(this.start, otherRange.start));
      }
      if (this.containsPosition(otherRange.end)) {
        ranges.push(new Range(otherRange.end, this.end));
      }
    } else {
      ranges.push(this.clone());
    }
    return ranges;
  }
  getIntersection(otherRange) {
    if (this.isIntersecting(otherRange)) {
      let commonRangeStart = this.start;
      let commonRangeEnd = this.end;
      if (this.containsPosition(otherRange.start)) {
        commonRangeStart = otherRange.start;
      }
      if (this.containsPosition(otherRange.end)) {
        commonRangeEnd = otherRange.end;
      }
      return new Range(commonRangeStart, commonRangeEnd);
    }
    return null;
  }
  getWalker(options = {}) {
    options.boundaries = this;
    return new treewalker_default(options);
  }
  getCommonAncestor() {
    return this.start.getCommonAncestor(this.end);
  }
  getContainedElement() {
    if (this.isCollapsed) {
      return null;
    }
    let nodeAfterStart = this.start.nodeAfter;
    let nodeBeforeEnd = this.end.nodeBefore;
    if (this.start.parent.is("$text") && this.start.isAtEnd && this.start.parent.nextSibling) {
      nodeAfterStart = this.start.parent.nextSibling;
    }
    if (this.end.parent.is("$text") && this.end.isAtStart && this.end.parent.previousSibling) {
      nodeBeforeEnd = this.end.parent.previousSibling;
    }
    if (nodeAfterStart && nodeAfterStart.is("element") && nodeAfterStart === nodeBeforeEnd) {
      return nodeAfterStart;
    }
    return null;
  }
  clone() {
    return new Range(this.start, this.end);
  }
  *getItems(options = {}) {
    options.boundaries = this;
    options.ignoreElementEnd = true;
    const treeWalker = new treewalker_default(options);
    for (const value of treeWalker) {
      yield value.item;
    }
  }
  *getPositions(options = {}) {
    options.boundaries = this;
    const treeWalker = new treewalker_default(options);
    yield treeWalker.position;
    for (const value of treeWalker) {
      yield value.nextPosition;
    }
  }
  isIntersecting(otherRange) {
    return this.start.isBefore(otherRange.end) && this.end.isAfter(otherRange.start);
  }
  static _createFromParentsAndOffsets(startElement, startOffset, endElement, endOffset) {
    return new this(new position_default(startElement, startOffset), new position_default(endElement, endOffset));
  }
  static _createFromPositionAndShift(position, shift) {
    const start = position;
    const end = position.getShiftedBy(shift);
    return shift > 0 ? new this(start, end) : new this(end, start);
  }
  static _createIn(element) {
    return this._createFromParentsAndOffsets(element, 0, element, element.childCount);
  }
  static _createOn(item) {
    const size = item.is("$textProxy") ? item.offsetSize : 1;
    return this._createFromPositionAndShift(position_default._createBefore(item), size);
  }
};
var range_default = Range;
Range.prototype.is = function(type) {
  return type === "range" || type === "view:range";
};
function enlargeTrimSkip(value) {
  if (value.item.is("attributeElement") || value.item.is("uiElement")) {
    return true;
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/selection.js
import {CKEditorError as CKEditorError5, EmitterMixin as EmitterMixin2, count, isIterable as isIterable2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Selection = class extends EmitterMixin2(typecheckable_default) {
  constructor(...args) {
    super();
    this._ranges = [];
    this._lastRangeBackward = false;
    this._isFake = false;
    this._fakeSelectionLabel = "";
    if (args.length) {
      this.setTo(...args);
    }
  }
  get isFake() {
    return this._isFake;
  }
  get fakeSelectionLabel() {
    return this._fakeSelectionLabel;
  }
  get anchor() {
    if (!this._ranges.length) {
      return null;
    }
    const range = this._ranges[this._ranges.length - 1];
    const anchor = this._lastRangeBackward ? range.end : range.start;
    return anchor.clone();
  }
  get focus() {
    if (!this._ranges.length) {
      return null;
    }
    const range = this._ranges[this._ranges.length - 1];
    const focus = this._lastRangeBackward ? range.start : range.end;
    return focus.clone();
  }
  get isCollapsed() {
    return this.rangeCount === 1 && this._ranges[0].isCollapsed;
  }
  get rangeCount() {
    return this._ranges.length;
  }
  get isBackward() {
    return !this.isCollapsed && this._lastRangeBackward;
  }
  get editableElement() {
    if (this.anchor) {
      return this.anchor.editableElement;
    }
    return null;
  }
  *getRanges() {
    for (const range of this._ranges) {
      yield range.clone();
    }
  }
  getFirstRange() {
    let first4 = null;
    for (const range of this._ranges) {
      if (!first4 || range.start.isBefore(first4.start)) {
        first4 = range;
      }
    }
    return first4 ? first4.clone() : null;
  }
  getLastRange() {
    let last = null;
    for (const range of this._ranges) {
      if (!last || range.end.isAfter(last.end)) {
        last = range;
      }
    }
    return last ? last.clone() : null;
  }
  getFirstPosition() {
    const firstRange = this.getFirstRange();
    return firstRange ? firstRange.start.clone() : null;
  }
  getLastPosition() {
    const lastRange = this.getLastRange();
    return lastRange ? lastRange.end.clone() : null;
  }
  isEqual(otherSelection) {
    if (this.isFake != otherSelection.isFake) {
      return false;
    }
    if (this.isFake && this.fakeSelectionLabel != otherSelection.fakeSelectionLabel) {
      return false;
    }
    if (this.rangeCount != otherSelection.rangeCount) {
      return false;
    } else if (this.rangeCount === 0) {
      return true;
    }
    if (!this.anchor.isEqual(otherSelection.anchor) || !this.focus.isEqual(otherSelection.focus)) {
      return false;
    }
    for (const thisRange of this._ranges) {
      let found = false;
      for (const otherRange of otherSelection._ranges) {
        if (thisRange.isEqual(otherRange)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
  isSimilar(otherSelection) {
    if (this.isBackward != otherSelection.isBackward) {
      return false;
    }
    const numOfRangesA = count(this.getRanges());
    const numOfRangesB = count(otherSelection.getRanges());
    if (numOfRangesA != numOfRangesB) {
      return false;
    }
    if (numOfRangesA == 0) {
      return true;
    }
    for (let rangeA of this.getRanges()) {
      rangeA = rangeA.getTrimmed();
      let found = false;
      for (let rangeB of otherSelection.getRanges()) {
        rangeB = rangeB.getTrimmed();
        if (rangeA.start.isEqual(rangeB.start) && rangeA.end.isEqual(rangeB.end)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
  getSelectedElement() {
    if (this.rangeCount !== 1) {
      return null;
    }
    return this.getFirstRange().getContainedElement();
  }
  setTo(...args) {
    let [selectable, placeOrOffset, options] = args;
    if (typeof placeOrOffset == "object") {
      options = placeOrOffset;
      placeOrOffset = void 0;
    }
    if (selectable === null) {
      this._setRanges([]);
      this._setFakeOptions(options);
    } else if (selectable instanceof Selection || selectable instanceof documentselection_default) {
      this._setRanges(selectable.getRanges(), selectable.isBackward);
      this._setFakeOptions({fake: selectable.isFake, label: selectable.fakeSelectionLabel});
    } else if (selectable instanceof range_default) {
      this._setRanges([selectable], options && options.backward);
      this._setFakeOptions(options);
    } else if (selectable instanceof position_default) {
      this._setRanges([new range_default(selectable)]);
      this._setFakeOptions(options);
    } else if (selectable instanceof node_default) {
      const backward = !!options && !!options.backward;
      let range;
      if (placeOrOffset === void 0) {
        throw new CKEditorError5("view-selection-setto-required-second-parameter", this);
      } else if (placeOrOffset == "in") {
        range = range_default._createIn(selectable);
      } else if (placeOrOffset == "on") {
        range = range_default._createOn(selectable);
      } else {
        range = new range_default(position_default._createAt(selectable, placeOrOffset));
      }
      this._setRanges([range], backward);
      this._setFakeOptions(options);
    } else if (isIterable2(selectable)) {
      this._setRanges(selectable, options && options.backward);
      this._setFakeOptions(options);
    } else {
      throw new CKEditorError5("view-selection-setto-not-selectable", this);
    }
    this.fire("change");
  }
  setFocus(itemOrPosition, offset) {
    if (this.anchor === null) {
      throw new CKEditorError5("view-selection-setfocus-no-ranges", this);
    }
    const newFocus = position_default._createAt(itemOrPosition, offset);
    if (newFocus.compareWith(this.focus) == "same") {
      return;
    }
    const anchor = this.anchor;
    this._ranges.pop();
    if (newFocus.compareWith(anchor) == "before") {
      this._addRange(new range_default(newFocus, anchor), true);
    } else {
      this._addRange(new range_default(anchor, newFocus));
    }
    this.fire("change");
  }
  _setRanges(newRanges, isLastBackward = false) {
    newRanges = Array.from(newRanges);
    this._ranges = [];
    for (const range of newRanges) {
      this._addRange(range);
    }
    this._lastRangeBackward = !!isLastBackward;
  }
  _setFakeOptions(options = {}) {
    this._isFake = !!options.fake;
    this._fakeSelectionLabel = options.fake ? options.label || "" : "";
  }
  _addRange(range, isBackward = false) {
    if (!(range instanceof range_default)) {
      throw new CKEditorError5("view-selection-add-range-not-range", this);
    }
    this._pushRange(range);
    this._lastRangeBackward = !!isBackward;
  }
  _pushRange(range) {
    for (const storedRange of this._ranges) {
      if (range.isIntersecting(storedRange)) {
        throw new CKEditorError5("view-selection-range-intersects", this, {addedRange: range, intersectingRange: storedRange});
      }
    }
    this._ranges.push(new range_default(range.start, range.end));
  }
};
var selection_default = Selection;
Selection.prototype.is = function(type) {
  return type === "selection" || type === "view:selection";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/documentselection.js
import {EmitterMixin as EmitterMixin3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DocumentSelection = class extends EmitterMixin3(typecheckable_default) {
  constructor(...args) {
    super();
    this._selection = new selection_default();
    this._selection.delegate("change").to(this);
    if (args.length) {
      this._selection.setTo(...args);
    }
  }
  get isFake() {
    return this._selection.isFake;
  }
  get fakeSelectionLabel() {
    return this._selection.fakeSelectionLabel;
  }
  get anchor() {
    return this._selection.anchor;
  }
  get focus() {
    return this._selection.focus;
  }
  get isCollapsed() {
    return this._selection.isCollapsed;
  }
  get rangeCount() {
    return this._selection.rangeCount;
  }
  get isBackward() {
    return this._selection.isBackward;
  }
  get editableElement() {
    return this._selection.editableElement;
  }
  get _ranges() {
    return this._selection._ranges;
  }
  *getRanges() {
    yield* this._selection.getRanges();
  }
  getFirstRange() {
    return this._selection.getFirstRange();
  }
  getLastRange() {
    return this._selection.getLastRange();
  }
  getFirstPosition() {
    return this._selection.getFirstPosition();
  }
  getLastPosition() {
    return this._selection.getLastPosition();
  }
  getSelectedElement() {
    return this._selection.getSelectedElement();
  }
  isEqual(otherSelection) {
    return this._selection.isEqual(otherSelection);
  }
  isSimilar(otherSelection) {
    return this._selection.isSimilar(otherSelection);
  }
  _setTo(...args) {
    this._selection.setTo(...args);
  }
  _setFocus(itemOrPosition, offset) {
    this._selection.setFocus(itemOrPosition, offset);
  }
};
var documentselection_default = DocumentSelection;
DocumentSelection.prototype.is = function(type) {
  return type === "selection" || type == "documentSelection" || type == "view:selection" || type == "view:documentSelection";
};

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/bubblingemittermixin.js
import {CKEditorError as CKEditorError6, EmitterMixin as EmitterMixin4, EventInfo as EventInfo2, toArray as toArray2} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/bubblingeventinfo.js
import {EventInfo} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BubblingEventInfo = class extends EventInfo {
  constructor(source, name, startRange) {
    super(source, name);
    this.startRange = startRange;
    this._eventPhase = "none";
    this._currentTarget = null;
  }
  get eventPhase() {
    return this._eventPhase;
  }
  get currentTarget() {
    return this._currentTarget;
  }
};
var bubblingeventinfo_default = BubblingEventInfo;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/bubblingemittermixin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var contextsSymbol = Symbol("bubbling contexts");
function BubblingEmitterMixin(base) {
  class Mixin extends base {
    fire(eventOrInfo, ...eventArgs) {
      try {
        const eventInfo = eventOrInfo instanceof EventInfo2 ? eventOrInfo : new EventInfo2(this, eventOrInfo);
        const eventContexts = getBubblingContexts(this);
        if (!eventContexts.size) {
          return;
        }
        updateEventInfo(eventInfo, "capturing", this);
        if (fireListenerFor(eventContexts, "$capture", eventInfo, ...eventArgs)) {
          return eventInfo.return;
        }
        const startRange = eventInfo.startRange || this.selection.getFirstRange();
        const selectedElement = startRange ? startRange.getContainedElement() : null;
        const isCustomContext = selectedElement ? Boolean(getCustomContext(eventContexts, selectedElement)) : false;
        let node = selectedElement || getDeeperRangeParent(startRange);
        updateEventInfo(eventInfo, "atTarget", node);
        if (!isCustomContext) {
          if (fireListenerFor(eventContexts, "$text", eventInfo, ...eventArgs)) {
            return eventInfo.return;
          }
          updateEventInfo(eventInfo, "bubbling", node);
        }
        while (node) {
          if (node.is("rootElement")) {
            if (fireListenerFor(eventContexts, "$root", eventInfo, ...eventArgs)) {
              return eventInfo.return;
            }
          } else if (node.is("element")) {
            if (fireListenerFor(eventContexts, node.name, eventInfo, ...eventArgs)) {
              return eventInfo.return;
            }
          }
          if (fireListenerFor(eventContexts, node, eventInfo, ...eventArgs)) {
            return eventInfo.return;
          }
          node = node.parent;
          updateEventInfo(eventInfo, "bubbling", node);
        }
        updateEventInfo(eventInfo, "bubbling", this);
        fireListenerFor(eventContexts, "$document", eventInfo, ...eventArgs);
        return eventInfo.return;
      } catch (err) {
        /* istanbul ignore next -- @preserve */
        CKEditorError6.rethrowUnexpectedError(err, this);
      }
    }
    _addEventListener(event, callback, options) {
      const contexts = toArray2(options.context || "$document");
      const eventContexts = getBubblingContexts(this);
      for (const context of contexts) {
        let emitter = eventContexts.get(context);
        if (!emitter) {
          emitter = new (EmitterMixin4())();
          eventContexts.set(context, emitter);
        }
        this.listenTo(emitter, event, callback, options);
      }
    }
    _removeEventListener(event, callback) {
      const eventContexts = getBubblingContexts(this);
      for (const emitter of eventContexts.values()) {
        this.stopListening(emitter, event, callback);
      }
    }
  }
  return Mixin;
}
{
  const mixin = BubblingEmitterMixin(Object);
  ["fire", "_addEventListener", "_removeEventListener"].forEach((key) => {
    BubblingEmitterMixin[key] = mixin.prototype[key];
  });
}
function updateEventInfo(eventInfo, eventPhase, currentTarget) {
  if (eventInfo instanceof bubblingeventinfo_default) {
    eventInfo._eventPhase = eventPhase;
    eventInfo._currentTarget = currentTarget;
  }
}
function fireListenerFor(eventContexts, context, eventInfo, ...eventArgs) {
  const emitter = typeof context == "string" ? eventContexts.get(context) : getCustomContext(eventContexts, context);
  if (!emitter) {
    return false;
  }
  emitter.fire(eventInfo, ...eventArgs);
  return eventInfo.stop.called;
}
function getCustomContext(eventContexts, node) {
  for (const [context, emitter] of eventContexts) {
    if (typeof context == "function" && context(node)) {
      return emitter;
    }
  }
  return null;
}
function getBubblingContexts(source) {
  if (!source[contextsSymbol]) {
    source[contextsSymbol] = new Map();
  }
  return source[contextsSymbol];
}
function getDeeperRangeParent(range) {
  if (!range) {
    return null;
  }
  const startParent = range.start.parent;
  const endParent = range.end.parent;
  const startPath = startParent.getPath();
  const endPath = endParent.getPath();
  return startPath.length > endPath.length ? startParent : endParent;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/document.js
import {Collection, ObservableMixin as ObservableMixin2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Document = class extends BubblingEmitterMixin(ObservableMixin2()) {
  constructor(stylesProcessor) {
    super();
    this._postFixers = new Set();
    this.selection = new documentselection_default();
    this.roots = new Collection({idProperty: "rootName"});
    this.stylesProcessor = stylesProcessor;
    this.set("isReadOnly", false);
    this.set("isFocused", false);
    this.set("isSelecting", false);
    this.set("isComposing", false);
  }
  getRoot(name = "main") {
    return this.roots.get(name);
  }
  registerPostFixer(postFixer) {
    this._postFixers.add(postFixer);
  }
  destroy() {
    this.roots.map((root) => root.destroy());
    this.stopListening();
  }
  _callPostFixers(writer) {
    let wasFixed = false;
    do {
      for (const callback of this._postFixers) {
        wasFixed = callback(writer);
        if (wasFixed) {
          break;
        }
      }
    } while (wasFixed);
  }
};
var document_default = Document;

// node_modules/@ckeditor/ckeditor5-engine/src/view/attributeelement.js
import {CKEditorError as CKEditorError7} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DEFAULT_PRIORITY = 10;
var AttributeElement = class extends element_default {
  constructor(document2, name, attrs, children) {
    super(document2, name, attrs, children);
    this._priority = DEFAULT_PRIORITY;
    this._id = null;
    this._clonesGroup = null;
    this.getFillerOffset = getFillerOffset2;
  }
  get priority() {
    return this._priority;
  }
  get id() {
    return this._id;
  }
  getElementsWithSameId() {
    if (this.id === null) {
      throw new CKEditorError7("attribute-element-get-elements-with-same-id-no-id", this);
    }
    return new Set(this._clonesGroup);
  }
  isSimilar(otherElement) {
    if (this.id !== null || otherElement.id !== null) {
      return this.id === otherElement.id;
    }
    return super.isSimilar(otherElement) && this.priority == otherElement.priority;
  }
  _clone(deep = false) {
    const cloned = super._clone(deep);
    cloned._priority = this._priority;
    cloned._id = this._id;
    return cloned;
  }
};
var attributeelement_default = AttributeElement;
AttributeElement.DEFAULT_PRIORITY = DEFAULT_PRIORITY;
AttributeElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "attributeElement" || type === "view:attributeElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "attributeElement" || type === "view:attributeElement" || type === "element" || type === "view:element");
  }
};
function getFillerOffset2() {
  if (nonUiChildrenCount(this)) {
    return null;
  }
  let element = this.parent;
  while (element && element.is("attributeElement")) {
    if (nonUiChildrenCount(element) > 1) {
      return null;
    }
    element = element.parent;
  }
  if (!element || nonUiChildrenCount(element) > 1) {
    return null;
  }
  return this.childCount;
}
function nonUiChildrenCount(element) {
  return Array.from(element.getChildren()).filter((element2) => !element2.is("uiElement")).length;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/emptyelement.js
import {CKEditorError as CKEditorError8} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EmptyElement = class extends element_default {
  constructor(document2, name, attributes, children) {
    super(document2, name, attributes, children);
    this.getFillerOffset = getFillerOffset3;
  }
  _insertChild(index, items) {
    if (items && (items instanceof node_default || Array.from(items).length > 0)) {
      throw new CKEditorError8("view-emptyelement-cannot-add", [this, items]);
    }
    return 0;
  }
};
var emptyelement_default = EmptyElement;
EmptyElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "emptyElement" || type === "view:emptyElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "emptyElement" || type === "view:emptyElement" || type === "element" || type === "view:element");
  }
};
function getFillerOffset3() {
  return null;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/uielement.js
import {CKEditorError as CKEditorError9, keyCodes} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var UIElement = class extends element_default {
  constructor(document2, name, attrs, children) {
    super(document2, name, attrs, children);
    this.getFillerOffset = getFillerOffset4;
  }
  _insertChild(index, items) {
    if (items && (items instanceof node_default || Array.from(items).length > 0)) {
      throw new CKEditorError9("view-uielement-cannot-add", [this, items]);
    }
    return 0;
  }
  render(domDocument, domConverter) {
    return this.toDomElement(domDocument);
  }
  toDomElement(domDocument) {
    const domElement = domDocument.createElement(this.name);
    for (const key of this.getAttributeKeys()) {
      domElement.setAttribute(key, this.getAttribute(key));
    }
    return domElement;
  }
};
var uielement_default = UIElement;
UIElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "uiElement" || type === "view:uiElement" || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "uiElement" || type === "view:uiElement" || type === "element" || type === "view:element");
  }
};
function injectUiElementHandling(view) {
  view.document.on("arrowKey", (evt, data) => jumpOverUiElement(evt, data, view.domConverter), {priority: "low"});
}
function getFillerOffset4() {
  return null;
}
function jumpOverUiElement(evt, data, domConverter) {
  if (data.keyCode == keyCodes.arrowright) {
    const domSelection = data.domTarget.ownerDocument.defaultView.getSelection();
    const domSelectionCollapsed = domSelection.rangeCount == 1 && domSelection.getRangeAt(0).collapsed;
    if (domSelectionCollapsed || data.shiftKey) {
      const domParent = domSelection.focusNode;
      const domOffset = domSelection.focusOffset;
      const viewPosition = domConverter.domPositionToView(domParent, domOffset);
      if (viewPosition === null) {
        return;
      }
      let jumpedOverAnyUiElement = false;
      const nextViewPosition = viewPosition.getLastMatchingPosition((value) => {
        if (value.item.is("uiElement")) {
          jumpedOverAnyUiElement = true;
        }
        if (value.item.is("uiElement") || value.item.is("attributeElement")) {
          return true;
        }
        return false;
      });
      if (jumpedOverAnyUiElement) {
        const newDomPosition = domConverter.viewPositionToDom(nextViewPosition);
        if (domSelectionCollapsed) {
          domSelection.collapse(newDomPosition.parent, newDomPosition.offset);
        } else {
          domSelection.extend(newDomPosition.parent, newDomPosition.offset);
        }
      }
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/rawelement.js
import {CKEditorError as CKEditorError10} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RawElement = class extends element_default {
  constructor(document2, name, attrs, children) {
    super(document2, name, attrs, children);
    this.getFillerOffset = getFillerOffset5;
  }
  _insertChild(index, items) {
    if (items && (items instanceof node_default || Array.from(items).length > 0)) {
      throw new CKEditorError10("view-rawelement-cannot-add", [this, items]);
    }
    return 0;
  }
  render(domElement, domConverter) {
  }
};
var rawelement_default = RawElement;
RawElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "rawElement" || type === "view:rawElement" || type === this.name || type === "view:" + this.name || type === "element" || type === "view:element" || type === "node" || type === "view:node";
  } else {
    return name === this.name && (type === "rawElement" || type === "view:rawElement" || type === "element" || type === "view:element");
  }
};
function getFillerOffset5() {
  return null;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/downcastwriter.js
import {CKEditorError as CKEditorError11, isIterable as isIterable4} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/view/documentfragment.js
import {EmitterMixin as EmitterMixin5, isIterable as isIterable3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DocumentFragment = class extends EmitterMixin5(typecheckable_default) {
  constructor(document2, children) {
    super();
    this._children = [];
    this._customProperties = new Map();
    this.document = document2;
    if (children) {
      this._insertChild(0, children);
    }
  }
  [Symbol.iterator]() {
    return this._children[Symbol.iterator]();
  }
  get childCount() {
    return this._children.length;
  }
  get isEmpty() {
    return this.childCount === 0;
  }
  get root() {
    return this;
  }
  get parent() {
    return null;
  }
  get name() {
    return void 0;
  }
  getCustomProperty(key) {
    return this._customProperties.get(key);
  }
  *getCustomProperties() {
    yield* this._customProperties.entries();
  }
  _appendChild(items) {
    return this._insertChild(this.childCount, items);
  }
  getChild(index) {
    return this._children[index];
  }
  getChildIndex(node) {
    return this._children.indexOf(node);
  }
  getChildren() {
    return this._children[Symbol.iterator]();
  }
  _insertChild(index, items) {
    this._fireChange("children", this);
    let count2 = 0;
    const nodes = normalize2(this.document, items);
    for (const node of nodes) {
      if (node.parent !== null) {
        node._remove();
      }
      node.parent = this;
      this._children.splice(index, 0, node);
      index++;
      count2++;
    }
    return count2;
  }
  _removeChildren(index, howMany = 1) {
    this._fireChange("children", this);
    for (let i = index; i < index + howMany; i++) {
      this._children[i].parent = null;
    }
    return this._children.splice(index, howMany);
  }
  _fireChange(type, node) {
    this.fire("change:" + type, node);
  }
  _setCustomProperty(key, value) {
    this._customProperties.set(key, value);
  }
  _removeCustomProperty(key) {
    return this._customProperties.delete(key);
  }
};
var documentfragment_default = DocumentFragment;
DocumentFragment.prototype.is = function(type) {
  return type === "documentFragment" || type === "view:documentFragment";
};
function normalize2(document2, nodes) {
  if (typeof nodes == "string") {
    return [new text_default(document2, nodes)];
  }
  if (!isIterable3(nodes)) {
    nodes = [nodes];
  }
  return Array.from(nodes).map((node) => {
    if (typeof node == "string") {
      return new text_default(document2, node);
    }
    if (node instanceof textproxy_default) {
      return new text_default(document2, node.data);
    }
    return node;
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/downcastwriter.js
import {isPlainObject as isPlainObject2} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DowncastWriter = class {
  constructor(document2) {
    this._cloneGroups = new Map();
    this._slotFactory = null;
    this.document = document2;
  }
  setSelection(...args) {
    this.document.selection._setTo(...args);
  }
  setSelectionFocus(itemOrPosition, offset) {
    this.document.selection._setFocus(itemOrPosition, offset);
  }
  createDocumentFragment(children) {
    return new documentfragment_default(this.document, children);
  }
  createText(data) {
    return new text_default(this.document, data);
  }
  createAttributeElement(name, attributes, options = {}) {
    const attributeElement = new attributeelement_default(this.document, name, attributes);
    if (typeof options.priority === "number") {
      attributeElement._priority = options.priority;
    }
    if (options.id) {
      attributeElement._id = options.id;
    }
    if (options.renderUnsafeAttributes) {
      attributeElement._unsafeAttributesToRender.push(...options.renderUnsafeAttributes);
    }
    return attributeElement;
  }
  createContainerElement(name, attributes, childrenOrOptions = {}, options = {}) {
    let children = null;
    if (isPlainObject2(childrenOrOptions)) {
      options = childrenOrOptions;
    } else {
      children = childrenOrOptions;
    }
    const containerElement = new containerelement_default(this.document, name, attributes, children);
    if (options.renderUnsafeAttributes) {
      containerElement._unsafeAttributesToRender.push(...options.renderUnsafeAttributes);
    }
    return containerElement;
  }
  createEditableElement(name, attributes, options = {}) {
    const editableElement = new editableelement_default(this.document, name, attributes);
    if (options.renderUnsafeAttributes) {
      editableElement._unsafeAttributesToRender.push(...options.renderUnsafeAttributes);
    }
    return editableElement;
  }
  createEmptyElement(name, attributes, options = {}) {
    const emptyElement = new emptyelement_default(this.document, name, attributes);
    if (options.renderUnsafeAttributes) {
      emptyElement._unsafeAttributesToRender.push(...options.renderUnsafeAttributes);
    }
    return emptyElement;
  }
  createUIElement(name, attributes, renderFunction) {
    const uiElement = new uielement_default(this.document, name, attributes);
    if (renderFunction) {
      uiElement.render = renderFunction;
    }
    return uiElement;
  }
  createRawElement(name, attributes, renderFunction, options = {}) {
    const rawElement = new rawelement_default(this.document, name, attributes);
    if (renderFunction) {
      rawElement.render = renderFunction;
    }
    if (options.renderUnsafeAttributes) {
      rawElement._unsafeAttributesToRender.push(...options.renderUnsafeAttributes);
    }
    return rawElement;
  }
  setAttribute(key, value, element) {
    element._setAttribute(key, value);
  }
  removeAttribute(key, element) {
    element._removeAttribute(key);
  }
  addClass(className, element) {
    element._addClass(className);
  }
  removeClass(className, element) {
    element._removeClass(className);
  }
  setStyle(property, value, element) {
    if (isPlainObject2(property) && element === void 0) {
      value._setStyle(property);
    } else {
      element._setStyle(property, value);
    }
  }
  removeStyle(property, element) {
    element._removeStyle(property);
  }
  setCustomProperty(key, value, element) {
    element._setCustomProperty(key, value);
  }
  removeCustomProperty(key, element) {
    return element._removeCustomProperty(key);
  }
  breakAttributes(positionOrRange) {
    if (positionOrRange instanceof position_default) {
      return this._breakAttributes(positionOrRange);
    } else {
      return this._breakAttributesRange(positionOrRange);
    }
  }
  breakContainer(position) {
    const element = position.parent;
    if (!element.is("containerElement")) {
      throw new CKEditorError11("view-writer-break-non-container-element", this.document);
    }
    if (!element.parent) {
      throw new CKEditorError11("view-writer-break-root", this.document);
    }
    if (position.isAtStart) {
      return position_default._createBefore(element);
    } else if (!position.isAtEnd) {
      const newElement = element._clone(false);
      this.insert(position_default._createAfter(element), newElement);
      const sourceRange = new range_default(position, position_default._createAt(element, "end"));
      const targetPosition = new position_default(newElement, 0);
      this.move(sourceRange, targetPosition);
    }
    return position_default._createAfter(element);
  }
  mergeAttributes(position) {
    const positionOffset = position.offset;
    const positionParent = position.parent;
    if (positionParent.is("$text")) {
      return position;
    }
    if (positionParent.is("attributeElement") && positionParent.childCount === 0) {
      const parent = positionParent.parent;
      const offset = positionParent.index;
      positionParent._remove();
      this._removeFromClonedElementsGroup(positionParent);
      return this.mergeAttributes(new position_default(parent, offset));
    }
    const nodeBefore = positionParent.getChild(positionOffset - 1);
    const nodeAfter = positionParent.getChild(positionOffset);
    if (!nodeBefore || !nodeAfter) {
      return position;
    }
    if (nodeBefore.is("$text") && nodeAfter.is("$text")) {
      return mergeTextNodes(nodeBefore, nodeAfter);
    } else if (nodeBefore.is("attributeElement") && nodeAfter.is("attributeElement") && nodeBefore.isSimilar(nodeAfter)) {
      const count2 = nodeBefore.childCount;
      nodeBefore._appendChild(nodeAfter.getChildren());
      nodeAfter._remove();
      this._removeFromClonedElementsGroup(nodeAfter);
      return this.mergeAttributes(new position_default(nodeBefore, count2));
    }
    return position;
  }
  mergeContainers(position) {
    const prev = position.nodeBefore;
    const next = position.nodeAfter;
    if (!prev || !next || !prev.is("containerElement") || !next.is("containerElement")) {
      throw new CKEditorError11("view-writer-merge-containers-invalid-position", this.document);
    }
    const lastChild = prev.getChild(prev.childCount - 1);
    const newPosition = lastChild instanceof text_default ? position_default._createAt(lastChild, "end") : position_default._createAt(prev, "end");
    this.move(range_default._createIn(next), position_default._createAt(prev, "end"));
    this.remove(range_default._createOn(next));
    return newPosition;
  }
  insert(position, nodes) {
    nodes = isIterable4(nodes) ? [...nodes] : [nodes];
    validateNodesToInsert(nodes, this.document);
    const nodeGroups = nodes.reduce((groups, node) => {
      const lastGroup = groups[groups.length - 1];
      const breakAttributes = !node.is("uiElement");
      if (!lastGroup || lastGroup.breakAttributes != breakAttributes) {
        groups.push({
          breakAttributes,
          nodes: [node]
        });
      } else {
        lastGroup.nodes.push(node);
      }
      return groups;
    }, []);
    let start = null;
    let end = position;
    for (const {nodes: nodes2, breakAttributes} of nodeGroups) {
      const range = this._insertNodes(end, nodes2, breakAttributes);
      if (!start) {
        start = range.start;
      }
      end = range.end;
    }
    if (!start) {
      return new range_default(position);
    }
    return new range_default(start, end);
  }
  remove(rangeOrItem) {
    const range = rangeOrItem instanceof range_default ? rangeOrItem : range_default._createOn(rangeOrItem);
    validateRangeContainer(range, this.document);
    if (range.isCollapsed) {
      return new documentfragment_default(this.document);
    }
    const {start: breakStart, end: breakEnd} = this._breakAttributesRange(range, true);
    const parentContainer = breakStart.parent;
    const count2 = breakEnd.offset - breakStart.offset;
    const removed = parentContainer._removeChildren(breakStart.offset, count2);
    for (const node of removed) {
      this._removeFromClonedElementsGroup(node);
    }
    const mergePosition = this.mergeAttributes(breakStart);
    range.start = mergePosition;
    range.end = mergePosition.clone();
    return new documentfragment_default(this.document, removed);
  }
  clear(range, element) {
    validateRangeContainer(range, this.document);
    const walker = range.getWalker({
      direction: "backward",
      ignoreElementEnd: true
    });
    for (const current of walker) {
      const item = current.item;
      let rangeToRemove;
      if (item.is("element") && element.isSimilar(item)) {
        rangeToRemove = range_default._createOn(item);
      } else if (!current.nextPosition.isAfter(range.start) && item.is("$textProxy")) {
        const parentElement = item.getAncestors().find((ancestor) => {
          return ancestor.is("element") && element.isSimilar(ancestor);
        });
        if (parentElement) {
          rangeToRemove = range_default._createIn(parentElement);
        }
      }
      if (rangeToRemove) {
        if (rangeToRemove.end.isAfter(range.end)) {
          rangeToRemove.end = range.end;
        }
        if (rangeToRemove.start.isBefore(range.start)) {
          rangeToRemove.start = range.start;
        }
        this.remove(rangeToRemove);
      }
    }
  }
  move(sourceRange, targetPosition) {
    let nodes;
    if (targetPosition.isAfter(sourceRange.end)) {
      targetPosition = this._breakAttributes(targetPosition, true);
      const parent = targetPosition.parent;
      const countBefore = parent.childCount;
      sourceRange = this._breakAttributesRange(sourceRange, true);
      nodes = this.remove(sourceRange);
      targetPosition.offset += parent.childCount - countBefore;
    } else {
      nodes = this.remove(sourceRange);
    }
    return this.insert(targetPosition, nodes);
  }
  wrap(range, attribute) {
    if (!(attribute instanceof attributeelement_default)) {
      throw new CKEditorError11("view-writer-wrap-invalid-attribute", this.document);
    }
    validateRangeContainer(range, this.document);
    if (!range.isCollapsed) {
      return this._wrapRange(range, attribute);
    } else {
      let position = range.start;
      if (position.parent.is("element") && !_hasNonUiChildren(position.parent)) {
        position = position.getLastMatchingPosition((value) => value.item.is("uiElement"));
      }
      position = this._wrapPosition(position, attribute);
      const viewSelection = this.document.selection;
      if (viewSelection.isCollapsed && viewSelection.getFirstPosition().isEqual(range.start)) {
        this.setSelection(position);
      }
      return new range_default(position);
    }
  }
  unwrap(range, attribute) {
    if (!(attribute instanceof attributeelement_default)) {
      throw new CKEditorError11("view-writer-unwrap-invalid-attribute", this.document);
    }
    validateRangeContainer(range, this.document);
    if (range.isCollapsed) {
      return range;
    }
    const {start: breakStart, end: breakEnd} = this._breakAttributesRange(range, true);
    const parentContainer = breakStart.parent;
    const newRange = this._unwrapChildren(parentContainer, breakStart.offset, breakEnd.offset, attribute);
    const start = this.mergeAttributes(newRange.start);
    if (!start.isEqual(newRange.start)) {
      newRange.end.offset--;
    }
    const end = this.mergeAttributes(newRange.end);
    return new range_default(start, end);
  }
  rename(newName, viewElement) {
    const newElement = new containerelement_default(this.document, newName, viewElement.getAttributes());
    this.insert(position_default._createAfter(viewElement), newElement);
    this.move(range_default._createIn(viewElement), position_default._createAt(newElement, 0));
    this.remove(range_default._createOn(viewElement));
    return newElement;
  }
  clearClonedElementsGroup(groupName) {
    this._cloneGroups.delete(groupName);
  }
  createPositionAt(itemOrPosition, offset) {
    return position_default._createAt(itemOrPosition, offset);
  }
  createPositionAfter(item) {
    return position_default._createAfter(item);
  }
  createPositionBefore(item) {
    return position_default._createBefore(item);
  }
  createRange(start, end) {
    return new range_default(start, end);
  }
  createRangeOn(item) {
    return range_default._createOn(item);
  }
  createRangeIn(element) {
    return range_default._createIn(element);
  }
  createSelection(...args) {
    return new selection_default(...args);
  }
  createSlot(modeOrFilter = "children") {
    if (!this._slotFactory) {
      throw new CKEditorError11("view-writer-invalid-create-slot-context", this.document);
    }
    return this._slotFactory(this, modeOrFilter);
  }
  _registerSlotFactory(slotFactory) {
    this._slotFactory = slotFactory;
  }
  _clearSlotFactory() {
    this._slotFactory = null;
  }
  _insertNodes(position, nodes, breakAttributes) {
    let parentElement;
    if (breakAttributes) {
      parentElement = getParentContainer(position);
    } else {
      parentElement = position.parent.is("$text") ? position.parent.parent : position.parent;
    }
    if (!parentElement) {
      throw new CKEditorError11("view-writer-invalid-position-container", this.document);
    }
    let insertionPosition;
    if (breakAttributes) {
      insertionPosition = this._breakAttributes(position, true);
    } else {
      insertionPosition = position.parent.is("$text") ? breakTextNode(position) : position;
    }
    const length = parentElement._insertChild(insertionPosition.offset, nodes);
    for (const node of nodes) {
      this._addToClonedElementsGroup(node);
    }
    const endPosition = insertionPosition.getShiftedBy(length);
    const start = this.mergeAttributes(insertionPosition);
    if (!start.isEqual(insertionPosition)) {
      endPosition.offset--;
    }
    const end = this.mergeAttributes(endPosition);
    return new range_default(start, end);
  }
  _wrapChildren(parent, startOffset, endOffset, wrapElement) {
    let i = startOffset;
    const wrapPositions = [];
    while (i < endOffset) {
      const child = parent.getChild(i);
      const isText4 = child.is("$text");
      const isAttribute = child.is("attributeElement");
      if (isAttribute && this._wrapAttributeElement(wrapElement, child)) {
        wrapPositions.push(new position_default(parent, i));
      } else if (isText4 || !isAttribute || shouldABeOutsideB(wrapElement, child)) {
        const newAttribute = wrapElement._clone();
        child._remove();
        newAttribute._appendChild(child);
        parent._insertChild(i, newAttribute);
        this._addToClonedElementsGroup(newAttribute);
        wrapPositions.push(new position_default(parent, i));
      } else {
        this._wrapChildren(child, 0, child.childCount, wrapElement);
      }
      i++;
    }
    let offsetChange = 0;
    for (const position of wrapPositions) {
      position.offset -= offsetChange;
      if (position.offset == startOffset) {
        continue;
      }
      const newPosition = this.mergeAttributes(position);
      if (!newPosition.isEqual(position)) {
        offsetChange++;
        endOffset--;
      }
    }
    return range_default._createFromParentsAndOffsets(parent, startOffset, parent, endOffset);
  }
  _unwrapChildren(parent, startOffset, endOffset, unwrapElement) {
    let i = startOffset;
    const unwrapPositions = [];
    while (i < endOffset) {
      const child = parent.getChild(i);
      if (!child.is("attributeElement")) {
        i++;
        continue;
      }
      if (child.isSimilar(unwrapElement)) {
        const unwrapped = child.getChildren();
        const count2 = child.childCount;
        child._remove();
        parent._insertChild(i, unwrapped);
        this._removeFromClonedElementsGroup(child);
        unwrapPositions.push(new position_default(parent, i), new position_default(parent, i + count2));
        i += count2;
        endOffset += count2 - 1;
        continue;
      }
      if (this._unwrapAttributeElement(unwrapElement, child)) {
        unwrapPositions.push(new position_default(parent, i), new position_default(parent, i + 1));
        i++;
        continue;
      }
      this._unwrapChildren(child, 0, child.childCount, unwrapElement);
      i++;
    }
    let offsetChange = 0;
    for (const position of unwrapPositions) {
      position.offset -= offsetChange;
      if (position.offset == startOffset || position.offset == endOffset) {
        continue;
      }
      const newPosition = this.mergeAttributes(position);
      if (!newPosition.isEqual(position)) {
        offsetChange++;
        endOffset--;
      }
    }
    return range_default._createFromParentsAndOffsets(parent, startOffset, parent, endOffset);
  }
  _wrapRange(range, attribute) {
    const {start: breakStart, end: breakEnd} = this._breakAttributesRange(range, true);
    const parentContainer = breakStart.parent;
    const newRange = this._wrapChildren(parentContainer, breakStart.offset, breakEnd.offset, attribute);
    const start = this.mergeAttributes(newRange.start);
    if (!start.isEqual(newRange.start)) {
      newRange.end.offset--;
    }
    const end = this.mergeAttributes(newRange.end);
    return new range_default(start, end);
  }
  _wrapPosition(position, attribute) {
    if (attribute.isSimilar(position.parent)) {
      return movePositionToTextNode(position.clone());
    }
    if (position.parent.is("$text")) {
      position = breakTextNode(position);
    }
    const fakeElement = this.createAttributeElement("_wrapPosition-fake-element");
    fakeElement._priority = Number.POSITIVE_INFINITY;
    fakeElement.isSimilar = () => false;
    position.parent._insertChild(position.offset, fakeElement);
    const wrapRange = new range_default(position, position.getShiftedBy(1));
    this.wrap(wrapRange, attribute);
    const newPosition = new position_default(fakeElement.parent, fakeElement.index);
    fakeElement._remove();
    const nodeBefore = newPosition.nodeBefore;
    const nodeAfter = newPosition.nodeAfter;
    if (nodeBefore instanceof text_default && nodeAfter instanceof text_default) {
      return mergeTextNodes(nodeBefore, nodeAfter);
    }
    return movePositionToTextNode(newPosition);
  }
  _wrapAttributeElement(wrapper, toWrap) {
    if (!canBeJoined(wrapper, toWrap)) {
      return false;
    }
    if (wrapper.name !== toWrap.name || wrapper.priority !== toWrap.priority) {
      return false;
    }
    for (const key of wrapper.getAttributeKeys()) {
      if (key === "class" || key === "style") {
        continue;
      }
      if (toWrap.hasAttribute(key) && toWrap.getAttribute(key) !== wrapper.getAttribute(key)) {
        return false;
      }
    }
    for (const key of wrapper.getStyleNames()) {
      if (toWrap.hasStyle(key) && toWrap.getStyle(key) !== wrapper.getStyle(key)) {
        return false;
      }
    }
    for (const key of wrapper.getAttributeKeys()) {
      if (key === "class" || key === "style") {
        continue;
      }
      if (!toWrap.hasAttribute(key)) {
        this.setAttribute(key, wrapper.getAttribute(key), toWrap);
      }
    }
    for (const key of wrapper.getStyleNames()) {
      if (!toWrap.hasStyle(key)) {
        this.setStyle(key, wrapper.getStyle(key), toWrap);
      }
    }
    for (const key of wrapper.getClassNames()) {
      if (!toWrap.hasClass(key)) {
        this.addClass(key, toWrap);
      }
    }
    return true;
  }
  _unwrapAttributeElement(wrapper, toUnwrap) {
    if (!canBeJoined(wrapper, toUnwrap)) {
      return false;
    }
    if (wrapper.name !== toUnwrap.name || wrapper.priority !== toUnwrap.priority) {
      return false;
    }
    for (const key of wrapper.getAttributeKeys()) {
      if (key === "class" || key === "style") {
        continue;
      }
      if (!toUnwrap.hasAttribute(key) || toUnwrap.getAttribute(key) !== wrapper.getAttribute(key)) {
        return false;
      }
    }
    if (!toUnwrap.hasClass(...wrapper.getClassNames())) {
      return false;
    }
    for (const key of wrapper.getStyleNames()) {
      if (!toUnwrap.hasStyle(key) || toUnwrap.getStyle(key) !== wrapper.getStyle(key)) {
        return false;
      }
    }
    for (const key of wrapper.getAttributeKeys()) {
      if (key === "class" || key === "style") {
        continue;
      }
      this.removeAttribute(key, toUnwrap);
    }
    this.removeClass(Array.from(wrapper.getClassNames()), toUnwrap);
    this.removeStyle(Array.from(wrapper.getStyleNames()), toUnwrap);
    return true;
  }
  _breakAttributesRange(range, forceSplitText = false) {
    const rangeStart = range.start;
    const rangeEnd = range.end;
    validateRangeContainer(range, this.document);
    if (range.isCollapsed) {
      const position = this._breakAttributes(range.start, forceSplitText);
      return new range_default(position, position);
    }
    const breakEnd = this._breakAttributes(rangeEnd, forceSplitText);
    const count2 = breakEnd.parent.childCount;
    const breakStart = this._breakAttributes(rangeStart, forceSplitText);
    breakEnd.offset += breakEnd.parent.childCount - count2;
    return new range_default(breakStart, breakEnd);
  }
  _breakAttributes(position, forceSplitText = false) {
    const positionOffset = position.offset;
    const positionParent = position.parent;
    if (position.parent.is("emptyElement")) {
      throw new CKEditorError11("view-writer-cannot-break-empty-element", this.document);
    }
    if (position.parent.is("uiElement")) {
      throw new CKEditorError11("view-writer-cannot-break-ui-element", this.document);
    }
    if (position.parent.is("rawElement")) {
      throw new CKEditorError11("view-writer-cannot-break-raw-element", this.document);
    }
    if (!forceSplitText && positionParent.is("$text") && isContainerOrFragment(positionParent.parent)) {
      return position.clone();
    }
    if (isContainerOrFragment(positionParent)) {
      return position.clone();
    }
    if (positionParent.is("$text")) {
      return this._breakAttributes(breakTextNode(position), forceSplitText);
    }
    const length = positionParent.childCount;
    if (positionOffset == length) {
      const newPosition = new position_default(positionParent.parent, positionParent.index + 1);
      return this._breakAttributes(newPosition, forceSplitText);
    } else {
      if (positionOffset === 0) {
        const newPosition = new position_default(positionParent.parent, positionParent.index);
        return this._breakAttributes(newPosition, forceSplitText);
      } else {
        const offsetAfter = positionParent.index + 1;
        const clonedNode = positionParent._clone();
        positionParent.parent._insertChild(offsetAfter, clonedNode);
        this._addToClonedElementsGroup(clonedNode);
        const count2 = positionParent.childCount - positionOffset;
        const nodesToMove = positionParent._removeChildren(positionOffset, count2);
        clonedNode._appendChild(nodesToMove);
        const newPosition = new position_default(positionParent.parent, offsetAfter);
        return this._breakAttributes(newPosition, forceSplitText);
      }
    }
  }
  _addToClonedElementsGroup(element) {
    if (!element.root.is("rootElement")) {
      return;
    }
    if (element.is("element")) {
      for (const child of element.getChildren()) {
        this._addToClonedElementsGroup(child);
      }
    }
    const id = element.id;
    if (!id) {
      return;
    }
    let group = this._cloneGroups.get(id);
    if (!group) {
      group = new Set();
      this._cloneGroups.set(id, group);
    }
    group.add(element);
    element._clonesGroup = group;
  }
  _removeFromClonedElementsGroup(element) {
    if (element.is("element")) {
      for (const child of element.getChildren()) {
        this._removeFromClonedElementsGroup(child);
      }
    }
    const id = element.id;
    if (!id) {
      return;
    }
    const group = this._cloneGroups.get(id);
    if (!group) {
      return;
    }
    group.delete(element);
  }
};
var downcastwriter_default = DowncastWriter;
function _hasNonUiChildren(parent) {
  return Array.from(parent.getChildren()).some((child) => !child.is("uiElement"));
}
function getParentContainer(position) {
  let parent = position.parent;
  while (!isContainerOrFragment(parent)) {
    if (!parent) {
      return void 0;
    }
    parent = parent.parent;
  }
  return parent;
}
function shouldABeOutsideB(a, b) {
  if (a.priority < b.priority) {
    return true;
  } else if (a.priority > b.priority) {
    return false;
  }
  return a.getIdentity() < b.getIdentity();
}
function movePositionToTextNode(position) {
  const nodeBefore = position.nodeBefore;
  if (nodeBefore && nodeBefore.is("$text")) {
    return new position_default(nodeBefore, nodeBefore.data.length);
  }
  const nodeAfter = position.nodeAfter;
  if (nodeAfter && nodeAfter.is("$text")) {
    return new position_default(nodeAfter, 0);
  }
  return position;
}
function breakTextNode(position) {
  if (position.offset == position.parent.data.length) {
    return new position_default(position.parent.parent, position.parent.index + 1);
  }
  if (position.offset === 0) {
    return new position_default(position.parent.parent, position.parent.index);
  }
  const textToMove = position.parent.data.slice(position.offset);
  position.parent._data = position.parent.data.slice(0, position.offset);
  position.parent.parent._insertChild(position.parent.index + 1, new text_default(position.root.document, textToMove));
  return new position_default(position.parent.parent, position.parent.index + 1);
}
function mergeTextNodes(t1, t2) {
  const nodeBeforeLength = t1.data.length;
  t1._data += t2.data;
  t2._remove();
  return new position_default(t1, nodeBeforeLength);
}
var validNodesToInsert = [text_default, attributeelement_default, containerelement_default, emptyelement_default, rawelement_default, uielement_default];
function validateNodesToInsert(nodes, errorContext) {
  for (const node of nodes) {
    if (!validNodesToInsert.some((validNode) => node instanceof validNode)) {
      throw new CKEditorError11("view-writer-insert-invalid-node-type", errorContext);
    }
    if (!node.is("$text")) {
      validateNodesToInsert(node.getChildren(), errorContext);
    }
  }
}
function isContainerOrFragment(node) {
  return node && (node.is("containerElement") || node.is("documentFragment"));
}
function validateRangeContainer(range, errorContext) {
  const startContainer = getParentContainer(range.start);
  const endContainer = getParentContainer(range.end);
  if (!startContainer || !endContainer || startContainer !== endContainer) {
    throw new CKEditorError11("view-writer-invalid-range-container", errorContext);
  }
}
function canBeJoined(a, b) {
  return a.id === null && b.id === null;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/filler.js
import {keyCodes as keyCodes2, isText} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var NBSP_FILLER = (domDocument) => domDocument.createTextNode("\xA0");
var MARKED_NBSP_FILLER = (domDocument) => {
  const span = domDocument.createElement("span");
  span.dataset.ckeFiller = "true";
  span.innerText = "\xA0";
  return span;
};
var BR_FILLER = (domDocument) => {
  const fillerBr = domDocument.createElement("br");
  fillerBr.dataset.ckeFiller = "true";
  return fillerBr;
};
var INLINE_FILLER_LENGTH = 7;
var INLINE_FILLER = "\u2060".repeat(INLINE_FILLER_LENGTH);
function startsWithFiller(domNode) {
  if (typeof domNode == "string") {
    return domNode.substr(0, INLINE_FILLER_LENGTH) === INLINE_FILLER;
  }
  return isText(domNode) && domNode.data.substr(0, INLINE_FILLER_LENGTH) === INLINE_FILLER;
}
function isInlineFiller(domText) {
  return domText.data.length == INLINE_FILLER_LENGTH && startsWithFiller(domText);
}
function getDataWithoutFiller(domText) {
  const data = typeof domText == "string" ? domText : domText.data;
  if (startsWithFiller(domText)) {
    return data.slice(INLINE_FILLER_LENGTH);
  }
  return data;
}
function injectQuirksHandling(view) {
  view.document.on("arrowKey", jumpOverInlineFiller, {priority: "low"});
}
function jumpOverInlineFiller(evt, data) {
  if (data.keyCode == keyCodes2.arrowleft) {
    const domSelection = data.domTarget.ownerDocument.defaultView.getSelection();
    if (domSelection.rangeCount == 1 && domSelection.getRangeAt(0).collapsed) {
      const domParent = domSelection.getRangeAt(0).startContainer;
      const domOffset = domSelection.getRangeAt(0).startOffset;
      if (startsWithFiller(domParent) && domOffset <= INLINE_FILLER_LENGTH) {
        domSelection.collapse(domParent, 0);
      }
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/renderer.js
import {CKEditorError as CKEditorError12, ObservableMixin as ObservableMixin3, diff, env, fastDiff, insertAt, isComment, isNode, isText as isText2, remove} from "es-ckeditor-lib/lib/utils";
import "@ckeditor/ckeditor5-engine/theme/renderer.css";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Renderer = class extends ObservableMixin3() {
  constructor(domConverter, selection) {
    super();
    this.domDocuments = new Set();
    this.markedAttributes = new Set();
    this.markedChildren = new Set();
    this.markedTexts = new Set();
    this._inlineFiller = null;
    this._fakeSelectionContainer = null;
    this.domConverter = domConverter;
    this.selection = selection;
    this.set("isFocused", false);
    this.set("isSelecting", false);
    if (env.isBlink && !env.isAndroid) {
      this.on("change:isSelecting", () => {
        if (!this.isSelecting) {
          this.render();
        }
      });
    }
    this.set("isComposing", false);
    this.on("change:isComposing", () => {
      if (!this.isComposing) {
        this.render();
      }
    });
  }
  markToSync(type, node) {
    if (type === "text") {
      if (this.domConverter.mapViewToDom(node.parent)) {
        this.markedTexts.add(node);
      }
    } else {
      if (!this.domConverter.mapViewToDom(node)) {
        return;
      }
      if (type === "attributes") {
        this.markedAttributes.add(node);
      } else if (type === "children") {
        this.markedChildren.add(node);
      } else {
        const unreachable = type;
        throw new CKEditorError12("view-renderer-unknown-type", this);
      }
    }
  }
  render() {
    if (this.isComposing && !env.isAndroid) {
      return;
    }
    let inlineFillerPosition = null;
    const isInlineFillerRenderingPossible = env.isBlink && !env.isAndroid ? !this.isSelecting : true;
    for (const element of this.markedChildren) {
      this._updateChildrenMappings(element);
    }
    if (isInlineFillerRenderingPossible) {
      if (this._inlineFiller && !this._isSelectionInInlineFiller()) {
        this._removeInlineFiller();
      }
      if (this._inlineFiller) {
        inlineFillerPosition = this._getInlineFillerPosition();
      } else if (this._needsInlineFillerAtSelection()) {
        inlineFillerPosition = this.selection.getFirstPosition();
        this.markedChildren.add(inlineFillerPosition.parent);
      }
    } else if (this._inlineFiller && this._inlineFiller.parentNode) {
      inlineFillerPosition = this.domConverter.domPositionToView(this._inlineFiller);
      if (inlineFillerPosition && inlineFillerPosition.parent.is("$text")) {
        inlineFillerPosition = position_default._createBefore(inlineFillerPosition.parent);
      }
    }
    for (const element of this.markedAttributes) {
      this._updateAttrs(element);
    }
    for (const element of this.markedChildren) {
      this._updateChildren(element, {inlineFillerPosition});
    }
    for (const node of this.markedTexts) {
      if (!this.markedChildren.has(node.parent) && this.domConverter.mapViewToDom(node.parent)) {
        this._updateText(node, {inlineFillerPosition});
      }
    }
    if (isInlineFillerRenderingPossible) {
      if (inlineFillerPosition) {
        const fillerDomPosition = this.domConverter.viewPositionToDom(inlineFillerPosition);
        const domDocument = fillerDomPosition.parent.ownerDocument;
        if (!startsWithFiller(fillerDomPosition.parent)) {
          this._inlineFiller = addInlineFiller(domDocument, fillerDomPosition.parent, fillerDomPosition.offset);
        } else {
          this._inlineFiller = fillerDomPosition.parent;
        }
      } else {
        this._inlineFiller = null;
      }
    }
    this._updateFocus();
    this._updateSelection();
    this.markedTexts.clear();
    this.markedAttributes.clear();
    this.markedChildren.clear();
  }
  _updateChildrenMappings(viewElement) {
    const domElement = this.domConverter.mapViewToDom(viewElement);
    if (!domElement) {
      return;
    }
    const actualDomChildren = Array.from(domElement.childNodes);
    const expectedDomChildren = Array.from(this.domConverter.viewChildrenToDom(viewElement, {withChildren: false}));
    const diff2 = this._diffNodeLists(actualDomChildren, expectedDomChildren);
    const actions = this._findUpdateActions(diff2, actualDomChildren, expectedDomChildren, areSimilarElements);
    if (actions.indexOf("update") !== -1) {
      const counter = {equal: 0, insert: 0, delete: 0};
      for (const action of actions) {
        if (action === "update") {
          const insertIndex = counter.equal + counter.insert;
          const deleteIndex = counter.equal + counter.delete;
          const viewChild = viewElement.getChild(insertIndex);
          if (viewChild && !(viewChild.is("uiElement") || viewChild.is("rawElement"))) {
            this._updateElementMappings(viewChild, actualDomChildren[deleteIndex]);
          }
          remove(expectedDomChildren[insertIndex]);
          counter.equal++;
        } else {
          counter[action]++;
        }
      }
    }
  }
  _updateElementMappings(viewElement, domElement) {
    this.domConverter.unbindDomElement(domElement);
    this.domConverter.bindElements(domElement, viewElement);
    this.markedChildren.add(viewElement);
    this.markedAttributes.add(viewElement);
  }
  _getInlineFillerPosition() {
    const firstPos = this.selection.getFirstPosition();
    if (firstPos.parent.is("$text")) {
      return position_default._createBefore(firstPos.parent);
    } else {
      return firstPos;
    }
  }
  _isSelectionInInlineFiller() {
    if (this.selection.rangeCount != 1 || !this.selection.isCollapsed) {
      return false;
    }
    const selectionPosition = this.selection.getFirstPosition();
    const position = this.domConverter.viewPositionToDom(selectionPosition);
    if (position && isText2(position.parent) && startsWithFiller(position.parent)) {
      return true;
    }
    return false;
  }
  _removeInlineFiller() {
    const domFillerNode = this._inlineFiller;
    if (!startsWithFiller(domFillerNode)) {
      throw new CKEditorError12("view-renderer-filler-was-lost", this);
    }
    if (isInlineFiller(domFillerNode)) {
      domFillerNode.remove();
    } else {
      domFillerNode.data = domFillerNode.data.substr(INLINE_FILLER_LENGTH);
    }
    this._inlineFiller = null;
  }
  _needsInlineFillerAtSelection() {
    if (this.selection.rangeCount != 1 || !this.selection.isCollapsed) {
      return false;
    }
    const selectionPosition = this.selection.getFirstPosition();
    const selectionParent = selectionPosition.parent;
    const selectionOffset = selectionPosition.offset;
    if (!this.domConverter.mapViewToDom(selectionParent.root)) {
      return false;
    }
    if (!selectionParent.is("element")) {
      return false;
    }
    if (!isEditable(selectionParent)) {
      return false;
    }
    if (selectionOffset === selectionParent.getFillerOffset()) {
      return false;
    }
    const nodeBefore = selectionPosition.nodeBefore;
    const nodeAfter = selectionPosition.nodeAfter;
    if (nodeBefore instanceof text_default || nodeAfter instanceof text_default) {
      return false;
    }
    if (env.isAndroid && (nodeBefore || nodeAfter)) {
      return false;
    }
    return true;
  }
  _updateText(viewText, options) {
    const domText = this.domConverter.findCorrespondingDomText(viewText);
    const newDomText = this.domConverter.viewToDom(viewText);
    let expectedText = newDomText.data;
    const filler = options.inlineFillerPosition;
    if (filler && filler.parent == viewText.parent && filler.offset == viewText.index) {
      expectedText = INLINE_FILLER + expectedText;
    }
    updateTextNode(domText, expectedText);
  }
  _updateAttrs(viewElement) {
    const domElement = this.domConverter.mapViewToDom(viewElement);
    if (!domElement) {
      return;
    }
    const domAttrKeys = Array.from(domElement.attributes).map((attr) => attr.name);
    const viewAttrKeys = viewElement.getAttributeKeys();
    for (const key of viewAttrKeys) {
      this.domConverter.setDomElementAttribute(domElement, key, viewElement.getAttribute(key), viewElement);
    }
    for (const key of domAttrKeys) {
      if (!viewElement.hasAttribute(key)) {
        this.domConverter.removeDomElementAttribute(domElement, key);
      }
    }
  }
  _updateChildren(viewElement, options) {
    const domElement = this.domConverter.mapViewToDom(viewElement);
    if (!domElement) {
      return;
    }
    if (env.isAndroid) {
      let previousDomNode = null;
      for (const domNode of Array.from(domElement.childNodes)) {
        if (previousDomNode && isText2(previousDomNode) && isText2(domNode)) {
          domElement.normalize();
          break;
        }
        previousDomNode = domNode;
      }
    }
    const inlineFillerPosition = options.inlineFillerPosition;
    const actualDomChildren = domElement.childNodes;
    const expectedDomChildren = Array.from(this.domConverter.viewChildrenToDom(viewElement, {bind: true}));
    if (inlineFillerPosition && inlineFillerPosition.parent === viewElement) {
      addInlineFiller(domElement.ownerDocument, expectedDomChildren, inlineFillerPosition.offset);
    }
    const diff2 = this._diffNodeLists(actualDomChildren, expectedDomChildren);
    const actions = this._findUpdateActions(diff2, actualDomChildren, expectedDomChildren, areTextNodes);
    let i = 0;
    const nodesToUnbind = new Set();
    for (const action of actions) {
      if (action === "delete") {
        nodesToUnbind.add(actualDomChildren[i]);
        remove(actualDomChildren[i]);
      } else if (action === "equal" || action === "update") {
        i++;
      }
    }
    i = 0;
    for (const action of actions) {
      if (action === "insert") {
        insertAt(domElement, i, expectedDomChildren[i]);
        i++;
      } else if (action === "update") {
        updateTextNode(actualDomChildren[i], expectedDomChildren[i].data);
        i++;
      } else if (action === "equal") {
        this._markDescendantTextToSync(this.domConverter.domToView(expectedDomChildren[i]));
        i++;
      }
    }
    for (const node of nodesToUnbind) {
      if (!node.parentNode) {
        this.domConverter.unbindDomElement(node);
      }
    }
  }
  _diffNodeLists(actualDomChildren, expectedDomChildren) {
    actualDomChildren = filterOutFakeSelectionContainer(actualDomChildren, this._fakeSelectionContainer);
    return diff(actualDomChildren, expectedDomChildren, sameNodes.bind(null, this.domConverter));
  }
  _findUpdateActions(actions, actualDom, expectedDom, comparator) {
    if (actions.indexOf("insert") === -1 || actions.indexOf("delete") === -1) {
      return actions;
    }
    let newActions = [];
    let actualSlice = [];
    let expectedSlice = [];
    const counter = {equal: 0, insert: 0, delete: 0};
    for (const action of actions) {
      if (action === "insert") {
        expectedSlice.push(expectedDom[counter.equal + counter.insert]);
      } else if (action === "delete") {
        actualSlice.push(actualDom[counter.equal + counter.delete]);
      } else {
        newActions = newActions.concat(diff(actualSlice, expectedSlice, comparator).map((action2) => action2 === "equal" ? "update" : action2));
        newActions.push("equal");
        actualSlice = [];
        expectedSlice = [];
      }
      counter[action]++;
    }
    return newActions.concat(diff(actualSlice, expectedSlice, comparator).map((action) => action === "equal" ? "update" : action));
  }
  _markDescendantTextToSync(viewNode) {
    if (!viewNode) {
      return;
    }
    if (viewNode.is("$text")) {
      this.markedTexts.add(viewNode);
    } else if (viewNode.is("element")) {
      for (const child of viewNode.getChildren()) {
        this._markDescendantTextToSync(child);
      }
    }
  }
  _updateSelection() {
    if (env.isBlink && !env.isAndroid && this.isSelecting && !this.markedChildren.size) {
      return;
    }
    if (this.selection.rangeCount === 0) {
      this._removeDomSelection();
      this._removeFakeSelection();
      return;
    }
    const domRoot = this.domConverter.mapViewToDom(this.selection.editableElement);
    if (!this.isFocused || !domRoot) {
      return;
    }
    if (this.selection.isFake) {
      this._updateFakeSelection(domRoot);
    } else if (this._fakeSelectionContainer && this._fakeSelectionContainer.isConnected) {
      this._removeFakeSelection();
      this._updateDomSelection(domRoot);
    } else if (!(this.isComposing && env.isAndroid)) {
      this._updateDomSelection(domRoot);
    }
  }
  _updateFakeSelection(domRoot) {
    const domDocument = domRoot.ownerDocument;
    if (!this._fakeSelectionContainer) {
      this._fakeSelectionContainer = createFakeSelectionContainer(domDocument);
    }
    const container = this._fakeSelectionContainer;
    this.domConverter.bindFakeSelection(container, this.selection);
    if (!this._fakeSelectionNeedsUpdate(domRoot)) {
      return;
    }
    if (!container.parentElement || container.parentElement != domRoot) {
      domRoot.appendChild(container);
    }
    container.textContent = this.selection.fakeSelectionLabel || "\xA0";
    const domSelection = domDocument.getSelection();
    const domRange = domDocument.createRange();
    domSelection.removeAllRanges();
    domRange.selectNodeContents(container);
    domSelection.addRange(domRange);
  }
  _updateDomSelection(domRoot) {
    const domSelection = domRoot.ownerDocument.defaultView.getSelection();
    if (!this._domSelectionNeedsUpdate(domSelection)) {
      return;
    }
    const anchor = this.domConverter.viewPositionToDom(this.selection.anchor);
    const focus = this.domConverter.viewPositionToDom(this.selection.focus);
    domSelection.setBaseAndExtent(anchor.parent, anchor.offset, focus.parent, focus.offset);
    if (env.isGecko) {
      fixGeckoSelectionAfterBr(focus, domSelection);
    }
  }
  _domSelectionNeedsUpdate(domSelection) {
    if (!this.domConverter.isDomSelectionCorrect(domSelection)) {
      return true;
    }
    const oldViewSelection = domSelection && this.domConverter.domSelectionToView(domSelection);
    if (oldViewSelection && this.selection.isEqual(oldViewSelection)) {
      return false;
    }
    if (!this.selection.isCollapsed && this.selection.isSimilar(oldViewSelection)) {
      return false;
    }
    return true;
  }
  _fakeSelectionNeedsUpdate(domRoot) {
    const container = this._fakeSelectionContainer;
    const domSelection = domRoot.ownerDocument.getSelection();
    if (!container || container.parentElement !== domRoot) {
      return true;
    }
    if (domSelection.anchorNode !== container && !container.contains(domSelection.anchorNode)) {
      return true;
    }
    return container.textContent !== this.selection.fakeSelectionLabel;
  }
  _removeDomSelection() {
    for (const doc of this.domDocuments) {
      const domSelection = doc.getSelection();
      if (domSelection.rangeCount) {
        const activeDomElement = doc.activeElement;
        const viewElement = this.domConverter.mapDomToView(activeDomElement);
        if (activeDomElement && viewElement) {
          domSelection.removeAllRanges();
        }
      }
    }
  }
  _removeFakeSelection() {
    const container = this._fakeSelectionContainer;
    if (container) {
      container.remove();
    }
  }
  _updateFocus() {
    if (this.isFocused) {
      const editable = this.selection.editableElement;
      if (editable) {
        this.domConverter.focus(editable);
      }
    }
  }
};
var renderer_default = Renderer;
function isEditable(element) {
  if (element.getAttribute("contenteditable") == "false") {
    return false;
  }
  const parent = element.findAncestor((element2) => element2.hasAttribute("contenteditable"));
  return !parent || parent.getAttribute("contenteditable") == "true";
}
function addInlineFiller(domDocument, domParentOrArray, offset) {
  const childNodes = domParentOrArray instanceof Array ? domParentOrArray : domParentOrArray.childNodes;
  const nodeAfterFiller = childNodes[offset];
  if (isText2(nodeAfterFiller)) {
    nodeAfterFiller.data = INLINE_FILLER + nodeAfterFiller.data;
    return nodeAfterFiller;
  } else {
    const fillerNode = domDocument.createTextNode(INLINE_FILLER);
    if (Array.isArray(domParentOrArray)) {
      childNodes.splice(offset, 0, fillerNode);
    } else {
      insertAt(domParentOrArray, offset, fillerNode);
    }
    return fillerNode;
  }
}
function areSimilarElements(node1, node2) {
  return isNode(node1) && isNode(node2) && !isText2(node1) && !isText2(node2) && !isComment(node1) && !isComment(node2) && node1.tagName.toLowerCase() === node2.tagName.toLowerCase();
}
function areTextNodes(node1, node2) {
  return isNode(node1) && isNode(node2) && isText2(node1) && isText2(node2);
}
function sameNodes(domConverter, actualDomChild, expectedDomChild) {
  if (actualDomChild === expectedDomChild) {
    return true;
  } else if (isText2(actualDomChild) && isText2(expectedDomChild)) {
    return actualDomChild.data === expectedDomChild.data;
  } else if (domConverter.isBlockFiller(actualDomChild) && domConverter.isBlockFiller(expectedDomChild)) {
    return true;
  }
  return false;
}
function fixGeckoSelectionAfterBr(focus, domSelection) {
  const parent = focus.parent;
  if (parent.nodeType != Node.ELEMENT_NODE || focus.offset != parent.childNodes.length - 1) {
    return;
  }
  const childAtOffset = parent.childNodes[focus.offset];
  if (childAtOffset && childAtOffset.tagName == "BR") {
    domSelection.addRange(domSelection.getRangeAt(0));
  }
}
function filterOutFakeSelectionContainer(domChildList, fakeSelectionContainer) {
  const childList = Array.from(domChildList);
  if (childList.length == 0 || !fakeSelectionContainer) {
    return childList;
  }
  const last = childList[childList.length - 1];
  if (last == fakeSelectionContainer) {
    childList.pop();
  }
  return childList;
}
function createFakeSelectionContainer(domDocument) {
  const container = domDocument.createElement("div");
  container.className = "ck-fake-selection-container";
  Object.assign(container.style, {
    position: "fixed",
    top: 0,
    left: "-9999px",
    width: "42px"
  });
  container.textContent = "\xA0";
  return container;
}
function updateTextNode(domText, expectedText) {
  const actualText = domText.data;
  if (actualText == expectedText) {
    return;
  }
  const actions = fastDiff(actualText, expectedText);
  for (const action of actions) {
    if (action.type === "insert") {
      domText.insertData(action.index, action.values.join(""));
    } else {
      domText.deleteData(action.index, action.howMany);
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/domconverter.js
import {global, logWarning as logWarning3, indexOf, getAncestors, isText as isText3, isComment as isComment2, isValidAttributeName, first, env as env2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BR_FILLER_REF = BR_FILLER(global.document);
var NBSP_FILLER_REF = NBSP_FILLER(global.document);
var MARKED_NBSP_FILLER_REF = MARKED_NBSP_FILLER(global.document);
var UNSAFE_ATTRIBUTE_NAME_PREFIX = "data-ck-unsafe-attribute-";
var UNSAFE_ELEMENT_REPLACEMENT_ATTRIBUTE = "data-ck-unsafe-element";
var DomConverter = class {
  constructor(document2, {blockFillerMode, renderingMode = "editing"} = {}) {
    this._domToViewMapping = new WeakMap();
    this._viewToDomMapping = new WeakMap();
    this._fakeSelectionMapping = new WeakMap();
    this._rawContentElementMatcher = new matcher_default();
    this._inlineObjectElementMatcher = new matcher_default();
    this.document = document2;
    this.renderingMode = renderingMode;
    this.blockFillerMode = blockFillerMode || (renderingMode === "editing" ? "br" : "nbsp");
    this.preElements = ["pre"];
    this.blockElements = [
      "address",
      "article",
      "aside",
      "blockquote",
      "caption",
      "center",
      "dd",
      "details",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "header",
      "hgroup",
      "legend",
      "li",
      "main",
      "menu",
      "nav",
      "ol",
      "p",
      "pre",
      "section",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "tr",
      "ul"
    ];
    this.inlineObjectElements = [
      "object",
      "iframe",
      "input",
      "button",
      "textarea",
      "select",
      "option",
      "video",
      "embed",
      "audio",
      "img",
      "canvas"
    ];
    this.unsafeElements = ["script", "style"];
    this._domDocument = this.renderingMode === "editing" ? global.document : global.document.implementation.createHTMLDocument("");
  }
  bindFakeSelection(domElement, viewDocumentSelection) {
    this._fakeSelectionMapping.set(domElement, new selection_default(viewDocumentSelection));
  }
  fakeSelectionToView(domElement) {
    return this._fakeSelectionMapping.get(domElement);
  }
  bindElements(domElement, viewElement) {
    this._domToViewMapping.set(domElement, viewElement);
    this._viewToDomMapping.set(viewElement, domElement);
  }
  unbindDomElement(domElement) {
    const viewElement = this._domToViewMapping.get(domElement);
    if (viewElement) {
      this._domToViewMapping.delete(domElement);
      this._viewToDomMapping.delete(viewElement);
      for (const child of Array.from(domElement.children)) {
        this.unbindDomElement(child);
      }
    }
  }
  bindDocumentFragments(domFragment, viewFragment) {
    this._domToViewMapping.set(domFragment, viewFragment);
    this._viewToDomMapping.set(viewFragment, domFragment);
  }
  shouldRenderAttribute(attributeKey, attributeValue, elementName) {
    if (this.renderingMode === "data") {
      return true;
    }
    attributeKey = attributeKey.toLowerCase();
    if (attributeKey.startsWith("on")) {
      return false;
    }
    if (attributeKey === "srcdoc" && attributeValue.match(/\bon\S+\s*=|javascript:|<\s*\/*script/i)) {
      return false;
    }
    if (elementName === "img" && (attributeKey === "src" || attributeKey === "srcset")) {
      return true;
    }
    if (elementName === "source" && attributeKey === "srcset") {
      return true;
    }
    if (attributeValue.match(/^\s*(javascript:|data:(image\/svg|text\/x?html))/i)) {
      return false;
    }
    return true;
  }
  setContentOf(domElement, html) {
    if (this.renderingMode === "data") {
      domElement.innerHTML = html;
      return;
    }
    const document2 = new DOMParser().parseFromString(html, "text/html");
    const fragment = document2.createDocumentFragment();
    const bodyChildNodes = document2.body.childNodes;
    while (bodyChildNodes.length > 0) {
      fragment.appendChild(bodyChildNodes[0]);
    }
    const treeWalker = document2.createTreeWalker(fragment, NodeFilter.SHOW_ELEMENT);
    const nodes = [];
    let currentNode;
    while (currentNode = treeWalker.nextNode()) {
      nodes.push(currentNode);
    }
    for (const currentNode2 of nodes) {
      for (const attributeName of currentNode2.getAttributeNames()) {
        this.setDomElementAttribute(currentNode2, attributeName, currentNode2.getAttribute(attributeName));
      }
      const elementName = currentNode2.tagName.toLowerCase();
      if (this._shouldRenameElement(elementName)) {
        _logUnsafeElement(elementName);
        currentNode2.replaceWith(this._createReplacementDomElement(elementName, currentNode2));
      }
    }
    while (domElement.firstChild) {
      domElement.firstChild.remove();
    }
    domElement.append(fragment);
  }
  viewToDom(viewNode, options = {}) {
    if (viewNode.is("$text")) {
      const textData = this._processDataFromViewText(viewNode);
      return this._domDocument.createTextNode(textData);
    } else {
      if (this.mapViewToDom(viewNode)) {
        return this.mapViewToDom(viewNode);
      }
      let domElement;
      if (viewNode.is("documentFragment")) {
        domElement = this._domDocument.createDocumentFragment();
        if (options.bind) {
          this.bindDocumentFragments(domElement, viewNode);
        }
      } else if (viewNode.is("uiElement")) {
        if (viewNode.name === "$comment") {
          domElement = this._domDocument.createComment(viewNode.getCustomProperty("$rawContent"));
        } else {
          domElement = viewNode.render(this._domDocument, this);
        }
        if (options.bind) {
          this.bindElements(domElement, viewNode);
        }
        return domElement;
      } else {
        if (this._shouldRenameElement(viewNode.name)) {
          _logUnsafeElement(viewNode.name);
          domElement = this._createReplacementDomElement(viewNode.name);
        } else if (viewNode.hasAttribute("xmlns")) {
          domElement = this._domDocument.createElementNS(viewNode.getAttribute("xmlns"), viewNode.name);
        } else {
          domElement = this._domDocument.createElement(viewNode.name);
        }
        if (viewNode.is("rawElement")) {
          viewNode.render(domElement, this);
        }
        if (options.bind) {
          this.bindElements(domElement, viewNode);
        }
        for (const key of viewNode.getAttributeKeys()) {
          this.setDomElementAttribute(domElement, key, viewNode.getAttribute(key), viewNode);
        }
      }
      if (options.withChildren !== false) {
        for (const child of this.viewChildrenToDom(viewNode, options)) {
          domElement.appendChild(child);
        }
      }
      return domElement;
    }
  }
  setDomElementAttribute(domElement, key, value, relatedViewElement) {
    const shouldRenderAttribute = this.shouldRenderAttribute(key, value, domElement.tagName.toLowerCase()) || relatedViewElement && relatedViewElement.shouldRenderUnsafeAttribute(key);
    if (!shouldRenderAttribute) {
      logWarning3("domconverter-unsafe-attribute-detected", {domElement, key, value});
    }
    if (!isValidAttributeName(key)) {
      logWarning3("domconverter-invalid-attribute-detected", {domElement, key, value});
      return;
    }
    if (domElement.hasAttribute(key) && !shouldRenderAttribute) {
      domElement.removeAttribute(key);
    } else if (domElement.hasAttribute(UNSAFE_ATTRIBUTE_NAME_PREFIX + key) && shouldRenderAttribute) {
      domElement.removeAttribute(UNSAFE_ATTRIBUTE_NAME_PREFIX + key);
    }
    domElement.setAttribute(shouldRenderAttribute ? key : UNSAFE_ATTRIBUTE_NAME_PREFIX + key, value);
  }
  removeDomElementAttribute(domElement, key) {
    if (key == UNSAFE_ELEMENT_REPLACEMENT_ATTRIBUTE) {
      return;
    }
    domElement.removeAttribute(key);
    domElement.removeAttribute(UNSAFE_ATTRIBUTE_NAME_PREFIX + key);
  }
  *viewChildrenToDom(viewElement, options = {}) {
    const fillerPositionOffset = viewElement.getFillerOffset && viewElement.getFillerOffset();
    let offset = 0;
    for (const childView of viewElement.getChildren()) {
      if (fillerPositionOffset === offset) {
        yield this._getBlockFiller();
      }
      const transparentRendering = childView.is("element") && !!childView.getCustomProperty("dataPipeline:transparentRendering") && !first(childView.getAttributes());
      if (transparentRendering && this.renderingMode == "data") {
        yield* this.viewChildrenToDom(childView, options);
      } else {
        if (transparentRendering) {
          logWarning3("domconverter-transparent-rendering-unsupported-in-editing-pipeline", {viewElement: childView});
        }
        yield this.viewToDom(childView, options);
      }
      offset++;
    }
    if (fillerPositionOffset === offset) {
      yield this._getBlockFiller();
    }
  }
  viewRangeToDom(viewRange) {
    const domStart = this.viewPositionToDom(viewRange.start);
    const domEnd = this.viewPositionToDom(viewRange.end);
    const domRange = this._domDocument.createRange();
    domRange.setStart(domStart.parent, domStart.offset);
    domRange.setEnd(domEnd.parent, domEnd.offset);
    return domRange;
  }
  viewPositionToDom(viewPosition) {
    const viewParent = viewPosition.parent;
    if (viewParent.is("$text")) {
      const domParent = this.findCorrespondingDomText(viewParent);
      if (!domParent) {
        return null;
      }
      let offset = viewPosition.offset;
      if (startsWithFiller(domParent)) {
        offset += INLINE_FILLER_LENGTH;
      }
      return {parent: domParent, offset};
    } else {
      let domParent, domBefore, domAfter;
      if (viewPosition.offset === 0) {
        domParent = this.mapViewToDom(viewParent);
        if (!domParent) {
          return null;
        }
        domAfter = domParent.childNodes[0];
      } else {
        const nodeBefore = viewPosition.nodeBefore;
        domBefore = nodeBefore.is("$text") ? this.findCorrespondingDomText(nodeBefore) : this.mapViewToDom(nodeBefore);
        if (!domBefore) {
          return null;
        }
        domParent = domBefore.parentNode;
        domAfter = domBefore.nextSibling;
      }
      if (isText3(domAfter) && startsWithFiller(domAfter)) {
        return {parent: domAfter, offset: INLINE_FILLER_LENGTH};
      }
      const offset = domBefore ? indexOf(domBefore) + 1 : 0;
      return {parent: domParent, offset};
    }
  }
  domToView(domNode, options = {}) {
    const inlineNodes = [];
    const generator = this._domToView(domNode, options, inlineNodes);
    const node = generator.next().value;
    if (!node) {
      return null;
    }
    generator.next();
    this._processDomInlineNodes(null, inlineNodes, options);
    if (node.is("$text") && node.data.length == 0) {
      return null;
    }
    return node;
  }
  *domChildrenToView(domElement, options = {}, inlineNodes = []) {
    for (let i = 0; i < domElement.childNodes.length; i++) {
      const domChild = domElement.childNodes[i];
      const generator = this._domToView(domChild, options, inlineNodes);
      const viewChild = generator.next().value;
      if (viewChild !== null) {
        if (this._isBlockViewElement(viewChild)) {
          this._processDomInlineNodes(domElement, inlineNodes, options);
        }
        yield viewChild;
        generator.next();
      }
    }
    this._processDomInlineNodes(domElement, inlineNodes, options);
  }
  domSelectionToView(domSelection) {
    if (isGeckoRestrictedDomSelection(domSelection)) {
      return new selection_default([]);
    }
    if (domSelection.rangeCount === 1) {
      let container = domSelection.getRangeAt(0).startContainer;
      if (isText3(container)) {
        container = container.parentNode;
      }
      const viewSelection = this.fakeSelectionToView(container);
      if (viewSelection) {
        return viewSelection;
      }
    }
    const isBackward = this.isDomSelectionBackward(domSelection);
    const viewRanges = [];
    for (let i = 0; i < domSelection.rangeCount; i++) {
      const domRange = domSelection.getRangeAt(i);
      const viewRange = this.domRangeToView(domRange);
      if (viewRange) {
        viewRanges.push(viewRange);
      }
    }
    return new selection_default(viewRanges, {backward: isBackward});
  }
  domRangeToView(domRange) {
    const viewStart = this.domPositionToView(domRange.startContainer, domRange.startOffset);
    const viewEnd = this.domPositionToView(domRange.endContainer, domRange.endOffset);
    if (viewStart && viewEnd) {
      return new range_default(viewStart, viewEnd);
    }
    return null;
  }
  domPositionToView(domParent, domOffset = 0) {
    if (this.isBlockFiller(domParent)) {
      return this.domPositionToView(domParent.parentNode, indexOf(domParent));
    }
    const viewElement = this.mapDomToView(domParent);
    if (viewElement && (viewElement.is("uiElement") || viewElement.is("rawElement"))) {
      return position_default._createBefore(viewElement);
    }
    if (isText3(domParent)) {
      if (isInlineFiller(domParent)) {
        return this.domPositionToView(domParent.parentNode, indexOf(domParent));
      }
      const viewParent = this.findCorrespondingViewText(domParent);
      let offset = domOffset;
      if (!viewParent) {
        return null;
      }
      if (startsWithFiller(domParent)) {
        offset -= INLINE_FILLER_LENGTH;
        offset = offset < 0 ? 0 : offset;
      }
      return new position_default(viewParent, offset);
    } else {
      if (domOffset === 0) {
        const viewParent = this.mapDomToView(domParent);
        if (viewParent) {
          return new position_default(viewParent, 0);
        }
      } else {
        const domBefore = domParent.childNodes[domOffset - 1];
        if (isText3(domBefore) && isInlineFiller(domBefore) || domBefore && this.isBlockFiller(domBefore)) {
          return this.domPositionToView(domBefore.parentNode, indexOf(domBefore));
        }
        const viewBefore = isText3(domBefore) ? this.findCorrespondingViewText(domBefore) : this.mapDomToView(domBefore);
        if (viewBefore && viewBefore.parent) {
          return new position_default(viewBefore.parent, viewBefore.index + 1);
        }
      }
      return null;
    }
  }
  mapDomToView(domElementOrDocumentFragment) {
    const hostElement = this.getHostViewElement(domElementOrDocumentFragment);
    return hostElement || this._domToViewMapping.get(domElementOrDocumentFragment);
  }
  findCorrespondingViewText(domText) {
    if (isInlineFiller(domText)) {
      return null;
    }
    const hostElement = this.getHostViewElement(domText);
    if (hostElement) {
      return hostElement;
    }
    const previousSibling = domText.previousSibling;
    if (previousSibling) {
      if (!this.isElement(previousSibling)) {
        return null;
      }
      const viewElement = this.mapDomToView(previousSibling);
      if (viewElement) {
        const nextSibling = viewElement.nextSibling;
        if (nextSibling instanceof text_default) {
          return nextSibling;
        } else {
          return null;
        }
      }
    } else {
      const viewElement = this.mapDomToView(domText.parentNode);
      if (viewElement) {
        const firstChild = viewElement.getChild(0);
        if (firstChild instanceof text_default) {
          return firstChild;
        } else {
          return null;
        }
      }
    }
    return null;
  }
  mapViewToDom(documentFragmentOrElement) {
    return this._viewToDomMapping.get(documentFragmentOrElement);
  }
  findCorrespondingDomText(viewText) {
    const previousSibling = viewText.previousSibling;
    if (previousSibling && this.mapViewToDom(previousSibling)) {
      return this.mapViewToDom(previousSibling).nextSibling;
    }
    if (!previousSibling && viewText.parent && this.mapViewToDom(viewText.parent)) {
      return this.mapViewToDom(viewText.parent).childNodes[0];
    }
    return null;
  }
  focus(viewEditable) {
    const domEditable = this.mapViewToDom(viewEditable);
    if (domEditable && domEditable.ownerDocument.activeElement !== domEditable) {
      const {scrollX, scrollY} = global.window;
      const scrollPositions = [];
      forEachDomElementAncestor(domEditable, (node) => {
        const {scrollLeft, scrollTop} = node;
        scrollPositions.push([scrollLeft, scrollTop]);
      });
      domEditable.focus();
      forEachDomElementAncestor(domEditable, (node) => {
        const [scrollLeft, scrollTop] = scrollPositions.shift();
        node.scrollLeft = scrollLeft;
        node.scrollTop = scrollTop;
      });
      global.window.scrollTo(scrollX, scrollY);
    }
  }
  _clearDomSelection() {
    const domEditable = this.mapViewToDom(this.document.selection.editableElement);
    if (!domEditable) {
      return;
    }
    const domSelection = domEditable.ownerDocument.defaultView.getSelection();
    const newViewSelection = this.domSelectionToView(domSelection);
    const selectionInEditable = newViewSelection && newViewSelection.rangeCount > 0;
    if (selectionInEditable) {
      domSelection.removeAllRanges();
    }
  }
  isElement(node) {
    return node && node.nodeType == Node.ELEMENT_NODE;
  }
  isDocumentFragment(node) {
    return node && node.nodeType == Node.DOCUMENT_FRAGMENT_NODE;
  }
  isBlockFiller(domNode) {
    if (this.blockFillerMode == "br") {
      return domNode.isEqualNode(BR_FILLER_REF);
    }
    if (domNode.tagName === "BR" && hasBlockParent(domNode, this.blockElements) && domNode.parentNode.childNodes.length === 1) {
      return true;
    }
    return domNode.isEqualNode(MARKED_NBSP_FILLER_REF) || isNbspBlockFiller(domNode, this.blockElements);
  }
  isDomSelectionBackward(selection) {
    if (selection.isCollapsed) {
      return false;
    }
    const range = this._domDocument.createRange();
    try {
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
    } catch (e) {
      return false;
    }
    const backward = range.collapsed;
    range.detach();
    return backward;
  }
  getHostViewElement(domNode) {
    const ancestors = getAncestors(domNode);
    ancestors.pop();
    while (ancestors.length) {
      const domNode2 = ancestors.pop();
      const viewNode = this._domToViewMapping.get(domNode2);
      if (viewNode && (viewNode.is("uiElement") || viewNode.is("rawElement"))) {
        return viewNode;
      }
    }
    return null;
  }
  isDomSelectionCorrect(domSelection) {
    return this._isDomSelectionPositionCorrect(domSelection.anchorNode, domSelection.anchorOffset) && this._isDomSelectionPositionCorrect(domSelection.focusNode, domSelection.focusOffset);
  }
  registerRawContentMatcher(pattern) {
    this._rawContentElementMatcher.add(pattern);
  }
  registerInlineObjectMatcher(pattern) {
    this._inlineObjectElementMatcher.add(pattern);
  }
  _getBlockFiller() {
    switch (this.blockFillerMode) {
      case "nbsp":
        return NBSP_FILLER(this._domDocument);
      case "markedNbsp":
        return MARKED_NBSP_FILLER(this._domDocument);
      case "br":
        return BR_FILLER(this._domDocument);
    }
  }
  _isDomSelectionPositionCorrect(domParent, offset) {
    if (isText3(domParent) && startsWithFiller(domParent) && offset < INLINE_FILLER_LENGTH) {
      return false;
    }
    if (this.isElement(domParent) && startsWithFiller(domParent.childNodes[offset])) {
      return false;
    }
    const viewParent = this.mapDomToView(domParent);
    if (viewParent && (viewParent.is("uiElement") || viewParent.is("rawElement"))) {
      return false;
    }
    return true;
  }
  *_domToView(domNode, options, inlineNodes) {
    if (this.isBlockFiller(domNode)) {
      return null;
    }
    const hostElement = this.getHostViewElement(domNode);
    if (hostElement) {
      return hostElement;
    }
    if (isComment2(domNode) && options.skipComments) {
      return null;
    }
    if (isText3(domNode)) {
      if (isInlineFiller(domNode)) {
        return null;
      } else {
        const textData = domNode.data;
        if (textData === "") {
          return null;
        }
        const textNode = new text_default(this.document, textData);
        inlineNodes.push(textNode);
        return textNode;
      }
    } else {
      let viewElement = this.mapDomToView(domNode);
      if (viewElement) {
        if (this._isInlineObjectElement(viewElement)) {
          inlineNodes.push(viewElement);
        }
        return viewElement;
      }
      if (this.isDocumentFragment(domNode)) {
        viewElement = new documentfragment_default(this.document);
        if (options.bind) {
          this.bindDocumentFragments(domNode, viewElement);
        }
      } else {
        viewElement = this._createViewElement(domNode, options);
        if (options.bind) {
          this.bindElements(domNode, viewElement);
        }
        const attrs = domNode.attributes;
        if (attrs) {
          for (let l = attrs.length, i = 0; i < l; i++) {
            viewElement._setAttribute(attrs[i].name, attrs[i].value);
          }
        }
        if (this._isViewElementWithRawContent(viewElement, options)) {
          viewElement._setCustomProperty("$rawContent", domNode.innerHTML);
          if (!this._isBlockViewElement(viewElement)) {
            inlineNodes.push(viewElement);
          }
          return viewElement;
        }
        if (isComment2(domNode)) {
          viewElement._setCustomProperty("$rawContent", domNode.data);
          return viewElement;
        }
      }
      yield viewElement;
      const nestedInlineNodes = [];
      if (options.withChildren !== false) {
        for (const child of this.domChildrenToView(domNode, options, nestedInlineNodes)) {
          viewElement._appendChild(child);
        }
      }
      if (this._isInlineObjectElement(viewElement)) {
        inlineNodes.push(viewElement);
      } else {
        for (const inlineNode of nestedInlineNodes) {
          inlineNodes.push(inlineNode);
        }
      }
    }
  }
  _processDomInlineNodes(domParent, inlineNodes, options) {
    if (!inlineNodes.length) {
      return;
    }
    if (domParent && !this.isDocumentFragment(domParent) && !this._isBlockDomElement(domParent)) {
      return;
    }
    let prevNodeEndsWithSpace = false;
    for (let i = 0; i < inlineNodes.length; i++) {
      const node = inlineNodes[i];
      if (!node.is("$text")) {
        prevNodeEndsWithSpace = false;
        continue;
      }
      let data;
      let nodeEndsWithSpace = false;
      if (_hasViewParentOfType(node, this.preElements)) {
        data = getDataWithoutFiller(node.data);
      } else {
        data = node.data.replace(/[ \n\t\r]{1,}/g, " ");
        nodeEndsWithSpace = /[^\S\u00A0]/.test(data.charAt(data.length - 1));
        const prevNode = i > 0 ? inlineNodes[i - 1] : null;
        const nextNode = i + 1 < inlineNodes.length ? inlineNodes[i + 1] : null;
        const shouldLeftTrim = !prevNode || prevNode.is("element") && prevNode.name == "br" || prevNodeEndsWithSpace;
        const shouldRightTrim = nextNode ? false : !startsWithFiller(node.data);
        if (options.withChildren !== false) {
          if (shouldLeftTrim) {
            data = data.replace(/^ /, "");
          }
          if (shouldRightTrim) {
            data = data.replace(/ $/, "");
          }
        }
        data = getDataWithoutFiller(data);
        data = data.replace(/ \u00A0/g, "  ");
        const isNextNodeInlineObjectElement = nextNode && nextNode.is("element") && nextNode.name != "br";
        const isNextNodeStartingWithSpace = nextNode && nextNode.is("$text") && nextNode.data.charAt(0) == " ";
        if (/[ \u00A0]\u00A0$/.test(data) || !nextNode || isNextNodeInlineObjectElement || isNextNodeStartingWithSpace) {
          data = data.replace(/\u00A0$/, " ");
        }
        if (shouldLeftTrim || prevNode && prevNode.is("element") && prevNode.name != "br") {
          data = data.replace(/^\u00A0/, " ");
        }
      }
      if (data.length == 0 && node.parent) {
        node._remove();
        inlineNodes.splice(i, 1);
        i--;
      } else {
        node._data = data;
        prevNodeEndsWithSpace = nodeEndsWithSpace;
      }
    }
    inlineNodes.length = 0;
  }
  _processDataFromViewText(node) {
    let data = node.data;
    if (node.getAncestors().some((parent) => this.preElements.includes(parent.name))) {
      return data;
    }
    if (data.charAt(0) == " ") {
      const prevNode = this._getTouchingInlineViewNode(node, false);
      const prevEndsWithSpace = prevNode && prevNode.is("$textProxy") && this._nodeEndsWithSpace(prevNode);
      if (prevEndsWithSpace || !prevNode) {
        data = "\xA0" + data.substr(1);
      }
    }
    if (data.charAt(data.length - 1) == " ") {
      const nextNode = this._getTouchingInlineViewNode(node, true);
      const nextStartsWithSpace = nextNode && nextNode.is("$textProxy") && nextNode.data.charAt(0) == " ";
      if (data.charAt(data.length - 2) == " " || !nextNode || nextStartsWithSpace) {
        data = data.substr(0, data.length - 1) + "\xA0";
      }
    }
    return data.replace(/ {2}/g, " \xA0");
  }
  _nodeEndsWithSpace(node) {
    if (node.getAncestors().some((parent) => this.preElements.includes(parent.name))) {
      return false;
    }
    const data = this._processDataFromViewText(node);
    return data.charAt(data.length - 1) == " ";
  }
  _getTouchingInlineViewNode(node, getNext) {
    const treeWalker = new treewalker_default({
      startPosition: getNext ? position_default._createAfter(node) : position_default._createBefore(node),
      direction: getNext ? "forward" : "backward"
    });
    for (const value of treeWalker) {
      if (value.item.is("element", "br")) {
        return null;
      } else if (this._isInlineObjectElement(value.item)) {
        return value.item;
      } else if (value.item.is("containerElement")) {
        return null;
      } else if (value.item.is("$textProxy")) {
        return value.item;
      }
    }
    return null;
  }
  _isBlockDomElement(node) {
    return this.isElement(node) && this.blockElements.includes(node.tagName.toLowerCase());
  }
  _isBlockViewElement(node) {
    return node.is("element") && this.blockElements.includes(node.name);
  }
  _isInlineObjectElement(node) {
    if (!node.is("element")) {
      return false;
    }
    return node.name == "br" || this.inlineObjectElements.includes(node.name) || !!this._inlineObjectElementMatcher.match(node);
  }
  _createViewElement(node, options) {
    if (isComment2(node)) {
      return new uielement_default(this.document, "$comment");
    }
    const viewName = options.keepOriginalCase ? node.tagName : node.tagName.toLowerCase();
    return new element_default(this.document, viewName);
  }
  _isViewElementWithRawContent(viewElement, options) {
    return options.withChildren !== false && viewElement.is("element") && !!this._rawContentElementMatcher.match(viewElement);
  }
  _shouldRenameElement(elementName) {
    const name = elementName.toLowerCase();
    return this.renderingMode === "editing" && this.unsafeElements.includes(name);
  }
  _createReplacementDomElement(elementName, originalDomElement) {
    const newDomElement = this._domDocument.createElement("span");
    newDomElement.setAttribute(UNSAFE_ELEMENT_REPLACEMENT_ATTRIBUTE, elementName);
    if (originalDomElement) {
      while (originalDomElement.firstChild) {
        newDomElement.appendChild(originalDomElement.firstChild);
      }
      for (const attributeName of originalDomElement.getAttributeNames()) {
        newDomElement.setAttribute(attributeName, originalDomElement.getAttribute(attributeName));
      }
    }
    return newDomElement;
  }
};
var domconverter_default = DomConverter;
function _hasViewParentOfType(node, types) {
  return node.getAncestors().some((parent) => parent.is("element") && types.includes(parent.name));
}
function forEachDomElementAncestor(element, callback) {
  let node = element;
  while (node) {
    callback(node);
    node = node.parentElement;
  }
}
function isNbspBlockFiller(domNode, blockElements) {
  const isNBSP = domNode.isEqualNode(NBSP_FILLER_REF);
  return isNBSP && hasBlockParent(domNode, blockElements) && domNode.parentNode.childNodes.length === 1;
}
function hasBlockParent(domNode, blockElements) {
  const parent = domNode.parentNode;
  return !!parent && !!parent.tagName && blockElements.includes(parent.tagName.toLowerCase());
}
function _logUnsafeElement(elementName) {
  if (elementName === "script") {
    logWarning3("domconverter-unsafe-script-element-detected");
  }
  if (elementName === "style") {
    logWarning3("domconverter-unsafe-style-element-detected");
  }
}
function isGeckoRestrictedDomSelection(domSelection) {
  if (!env2.isGecko) {
    return false;
  }
  if (!domSelection.rangeCount) {
    return false;
  }
  const container = domSelection.getRangeAt(0).startContainer;
  try {
    Object.prototype.toString.call(container);
  } catch (error) {
    return true;
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/observer.js
import {DomEmitterMixin} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Observer = class extends DomEmitterMixin() {
  constructor(view) {
    super();
    this._isEnabled = false;
    this.view = view;
    this.document = view.document;
  }
  get isEnabled() {
    return this._isEnabled;
  }
  enable() {
    this._isEnabled = true;
  }
  disable() {
    this._isEnabled = false;
  }
  destroy() {
    this.disable();
    this.stopListening();
  }
  checkShouldIgnoreEventFromTarget(domTarget) {
    if (domTarget && domTarget.nodeType === 3) {
      domTarget = domTarget.parentNode;
    }
    if (!domTarget || domTarget.nodeType !== 1) {
      return false;
    }
    return domTarget.matches("[data-cke-ignore-events], [data-cke-ignore-events] *");
  }
};
var observer_default = Observer;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/domeventdata.js
import {extend} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DomEventData = class {
  constructor(view, domEvent, additionalData) {
    this.view = view;
    this.document = view.document;
    this.domEvent = domEvent;
    this.domTarget = domEvent.target;
    extend(this, additionalData);
  }
  get target() {
    return this.view.domConverter.mapDomToView(this.domTarget);
  }
  preventDefault() {
    this.domEvent.preventDefault();
  }
  stopPropagation() {
    this.domEvent.stopPropagation();
  }
};
var domeventdata_default = DomEventData;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/domeventobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DomEventObserver = class extends observer_default {
  constructor() {
    super(...arguments);
    this.useCapture = false;
  }
  observe(domElement) {
    const types = typeof this.domEventType == "string" ? [this.domEventType] : this.domEventType;
    types.forEach((type) => {
      this.listenTo(domElement, type, (eventInfo, domEvent) => {
        if (this.isEnabled && !this.checkShouldIgnoreEventFromTarget(domEvent.target)) {
          this.onDomEvent(domEvent);
        }
      }, {useCapture: this.useCapture});
    });
  }
  stopObserving(domElement) {
    this.stopListening(domElement);
  }
  fire(eventType, domEvent, additionalData) {
    if (this.isEnabled) {
      this.document.fire(eventType, new domeventdata_default(this.view, domEvent, additionalData));
    }
  }
};
var domeventobserver_default = DomEventObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/keyobserver.js
import {getCode} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var KeyObserver = class extends domeventobserver_default {
  constructor() {
    super(...arguments);
    this.domEventType = ["keydown", "keyup"];
  }
  onDomEvent(domEvt) {
    const data = {
      keyCode: domEvt.keyCode,
      altKey: domEvt.altKey,
      ctrlKey: domEvt.ctrlKey,
      shiftKey: domEvt.shiftKey,
      metaKey: domEvt.metaKey,
      get keystroke() {
        return getCode(this);
      }
    };
    this.fire(domEvt.type, domEvt, data);
  }
};
var keyobserver_default = KeyObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/fakeselectionobserver.js
import {keyCodes as keyCodes3} from "es-ckeditor-lib/lib/utils";
import {debounce} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var FakeSelectionObserver = class extends observer_default {
  constructor(view) {
    super(view);
    this._fireSelectionChangeDoneDebounced = debounce((data) => {
      this.document.fire("selectionChangeDone", data);
    }, 200);
  }
  observe() {
    const document2 = this.document;
    document2.on("arrowKey", (eventInfo, data) => {
      const selection = document2.selection;
      if (selection.isFake && this.isEnabled) {
        data.preventDefault();
      }
    }, {context: "$capture"});
    document2.on("arrowKey", (eventInfo, data) => {
      const selection = document2.selection;
      if (selection.isFake && this.isEnabled) {
        this._handleSelectionMove(data.keyCode);
      }
    }, {priority: "lowest"});
  }
  stopObserving() {
  }
  destroy() {
    super.destroy();
    this._fireSelectionChangeDoneDebounced.cancel();
  }
  _handleSelectionMove(keyCode) {
    const selection = this.document.selection;
    const newSelection = new selection_default(selection.getRanges(), {backward: selection.isBackward, fake: false});
    if (keyCode == keyCodes3.arrowleft || keyCode == keyCodes3.arrowup) {
      newSelection.setTo(newSelection.getFirstPosition());
    }
    if (keyCode == keyCodes3.arrowright || keyCode == keyCodes3.arrowdown) {
      newSelection.setTo(newSelection.getLastPosition());
    }
    const data = {
      oldSelection: selection,
      newSelection,
      domSelection: null
    };
    this.document.fire("selectionChange", data);
    this._fireSelectionChangeDoneDebounced(data);
  }
};
var fakeselectionobserver_default = FakeSelectionObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/mutationobserver.js
import {isEqualWith} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MutationObserver = class extends observer_default {
  constructor(view) {
    super(view);
    this._config = {
      childList: true,
      characterData: true,
      subtree: true
    };
    this.domConverter = view.domConverter;
    this.renderer = view._renderer;
    this._domElements = new Set();
    this._mutationObserver = new window.MutationObserver(this._onMutations.bind(this));
  }
  flush() {
    this._onMutations(this._mutationObserver.takeRecords());
  }
  observe(domElement) {
    this._domElements.add(domElement);
    if (this.isEnabled) {
      this._mutationObserver.observe(domElement, this._config);
    }
  }
  stopObserving(domElement) {
    this._domElements.delete(domElement);
    if (this.isEnabled) {
      this._mutationObserver.disconnect();
      for (const domElement2 of this._domElements) {
        this._mutationObserver.observe(domElement2, this._config);
      }
    }
  }
  enable() {
    super.enable();
    for (const domElement of this._domElements) {
      this._mutationObserver.observe(domElement, this._config);
    }
  }
  disable() {
    super.disable();
    this._mutationObserver.disconnect();
  }
  destroy() {
    super.destroy();
    this._mutationObserver.disconnect();
  }
  _onMutations(domMutations) {
    if (domMutations.length === 0) {
      return;
    }
    const domConverter = this.domConverter;
    const mutatedTextNodes = new Set();
    const elementsWithMutatedChildren = new Set();
    for (const mutation of domMutations) {
      const element = domConverter.mapDomToView(mutation.target);
      if (!element) {
        continue;
      }
      if (element.is("uiElement") || element.is("rawElement")) {
        continue;
      }
      if (mutation.type === "childList" && !this._isBogusBrMutation(mutation)) {
        elementsWithMutatedChildren.add(element);
      }
    }
    for (const mutation of domMutations) {
      const element = domConverter.mapDomToView(mutation.target);
      if (element && (element.is("uiElement") || element.is("rawElement"))) {
        continue;
      }
      if (mutation.type === "characterData") {
        const text = domConverter.findCorrespondingViewText(mutation.target);
        if (text && !elementsWithMutatedChildren.has(text.parent)) {
          mutatedTextNodes.add(text);
        } else if (!text && startsWithFiller(mutation.target)) {
          elementsWithMutatedChildren.add(domConverter.mapDomToView(mutation.target.parentNode));
        }
      }
    }
    let hasMutations = false;
    for (const textNode of mutatedTextNodes) {
      hasMutations = true;
      this.renderer.markToSync("text", textNode);
    }
    for (const viewElement of elementsWithMutatedChildren) {
      const domElement = domConverter.mapViewToDom(viewElement);
      const viewChildren = Array.from(viewElement.getChildren());
      const newViewChildren = Array.from(domConverter.domChildrenToView(domElement, {withChildren: false}));
      if (!isEqualWith(viewChildren, newViewChildren, sameNodes2)) {
        hasMutations = true;
        this.renderer.markToSync("children", viewElement);
      }
    }
    if (hasMutations) {
      this.view.forceRender();
    }
  }
  _isBogusBrMutation(mutation) {
    let addedNode = null;
    if (mutation.nextSibling === null && mutation.removedNodes.length === 0 && mutation.addedNodes.length == 1) {
      addedNode = this.domConverter.domToView(mutation.addedNodes[0], {
        withChildren: false
      });
    }
    return addedNode && addedNode.is("element", "br");
  }
};
var mutationobserver_default = MutationObserver;
function sameNodes2(child1, child2) {
  if (Array.isArray(child1)) {
    return;
  }
  if (child1 === child2) {
    return true;
  } else if (child1.is("$text") && child2.is("$text")) {
    return child1.data === child2.data;
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/selectionobserver.js
import {env as env3} from "es-ckeditor-lib/lib/utils";
import {debounce as debounce2} from "lodash-es";

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/focusobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var FocusObserver = class extends domeventobserver_default {
  constructor(view) {
    super(view);
    this._isFocusChanging = false;
    this.domEventType = ["focus", "blur"];
    this.useCapture = true;
    const document2 = this.document;
    document2.on("focus", () => {
      this._isFocusChanging = true;
      this._renderTimeoutId = setTimeout(() => {
        this.flush();
        view.change(() => {
        });
      }, 50);
    });
    document2.on("blur", (evt, data) => {
      const selectedEditable = document2.selection.editableElement;
      if (selectedEditable === null || selectedEditable === data.target) {
        document2.isFocused = false;
        this._isFocusChanging = false;
        view.change(() => {
        });
      }
    });
  }
  flush() {
    if (this._isFocusChanging) {
      this._isFocusChanging = false;
      this.document.isFocused = true;
    }
  }
  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
  destroy() {
    if (this._renderTimeoutId) {
      clearTimeout(this._renderTimeoutId);
    }
    super.destroy();
  }
};
var focusobserver_default = FocusObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/selectionobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SelectionObserver = class extends observer_default {
  constructor(view) {
    super(view);
    this.mutationObserver = view.getObserver(mutationobserver_default);
    this.focusObserver = view.getObserver(focusobserver_default);
    this.selection = this.document.selection;
    this.domConverter = view.domConverter;
    this._documents = new WeakSet();
    this._fireSelectionChangeDoneDebounced = debounce2((data) => {
      this.document.fire("selectionChangeDone", data);
    }, 200);
    this._clearInfiniteLoopInterval = setInterval(() => this._clearInfiniteLoop(), 1e3);
    this._documentIsSelectingInactivityTimeoutDebounced = debounce2(() => this.document.isSelecting = false, 5e3);
    this._loopbackCounter = 0;
  }
  observe(domElement) {
    const domDocument = domElement.ownerDocument;
    const startDocumentIsSelecting = () => {
      this.document.isSelecting = true;
      this._documentIsSelectingInactivityTimeoutDebounced();
    };
    const endDocumentIsSelecting = () => {
      if (!this.document.isSelecting) {
        return;
      }
      this._handleSelectionChange(null, domDocument);
      this.document.isSelecting = false;
      this._documentIsSelectingInactivityTimeoutDebounced.cancel();
    };
    this.listenTo(domElement, "selectstart", startDocumentIsSelecting, {priority: "highest"});
    this.listenTo(domElement, "keydown", endDocumentIsSelecting, {priority: "highest", useCapture: true});
    this.listenTo(domElement, "keyup", endDocumentIsSelecting, {priority: "highest", useCapture: true});
    if (this._documents.has(domDocument)) {
      return;
    }
    this.listenTo(domDocument, "mouseup", endDocumentIsSelecting, {priority: "highest", useCapture: true});
    this.listenTo(domDocument, "selectionchange", (evt, domEvent) => {
      if (this.document.isComposing && !env3.isAndroid) {
        return;
      }
      this._handleSelectionChange(domEvent, domDocument);
      this._documentIsSelectingInactivityTimeoutDebounced();
    });
    this._documents.add(domDocument);
  }
  stopObserving(domElement) {
    this.stopListening(domElement);
  }
  destroy() {
    super.destroy();
    clearInterval(this._clearInfiniteLoopInterval);
    this._fireSelectionChangeDoneDebounced.cancel();
    this._documentIsSelectingInactivityTimeoutDebounced.cancel();
  }
  _reportInfiniteLoop() {
  }
  _handleSelectionChange(domEvent, domDocument) {
    if (!this.isEnabled) {
      return;
    }
    const domSelection = domDocument.defaultView.getSelection();
    if (this.checkShouldIgnoreEventFromTarget(domSelection.anchorNode)) {
      return;
    }
    this.mutationObserver.flush();
    const newViewSelection = this.domConverter.domSelectionToView(domSelection);
    if (newViewSelection.rangeCount == 0) {
      this.view.hasDomSelection = false;
      return;
    }
    this.view.hasDomSelection = true;
    this.focusObserver.flush();
    if (this.selection.isEqual(newViewSelection) && this.domConverter.isDomSelectionCorrect(domSelection)) {
      return;
    }
    if (++this._loopbackCounter > 60) {
      this._reportInfiniteLoop();
      return;
    }
    if (this.selection.isSimilar(newViewSelection)) {
      this.view.forceRender();
    } else {
      const data = {
        oldSelection: this.selection,
        newSelection: newViewSelection,
        domSelection
      };
      this.document.fire("selectionChange", data);
      this._fireSelectionChangeDoneDebounced(data);
    }
  }
  _clearInfiniteLoop() {
    this._loopbackCounter = 0;
  }
};
var selectionobserver_default = SelectionObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/compositionobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var CompositionObserver = class extends domeventobserver_default {
  constructor(view) {
    super(view);
    this.domEventType = ["compositionstart", "compositionupdate", "compositionend"];
    const document2 = this.document;
    document2.on("compositionstart", () => {
      document2.isComposing = true;
    }, {priority: "low"});
    document2.on("compositionend", () => {
      document2.isComposing = false;
    }, {priority: "low"});
  }
  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent, {
      data: domEvent.data
    });
  }
};
var compositionobserver_default = CompositionObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/datatransfer.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DataTransfer = class {
  constructor(nativeDataTransfer, options = {}) {
    this._files = options.cacheFiles ? getFiles(nativeDataTransfer) : null;
    this._native = nativeDataTransfer;
  }
  get files() {
    if (!this._files) {
      this._files = getFiles(this._native);
    }
    return this._files;
  }
  get types() {
    return this._native.types;
  }
  getData(type) {
    return this._native.getData(type);
  }
  setData(type, data) {
    this._native.setData(type, data);
  }
  set effectAllowed(value) {
    this._native.effectAllowed = value;
  }
  get effectAllowed() {
    return this._native.effectAllowed;
  }
  set dropEffect(value) {
    this._native.dropEffect = value;
  }
  get dropEffect() {
    return this._native.dropEffect;
  }
  setDragImage(image, x, y) {
    this._native.setDragImage(image, x, y);
  }
  get isCanceled() {
    return this._native.dropEffect == "none" || !!this._native.mozUserCancelled;
  }
};
var datatransfer_default = DataTransfer;
function getFiles(nativeDataTransfer) {
  const files = Array.from(nativeDataTransfer.files || []);
  const items = Array.from(nativeDataTransfer.items || []);
  if (files.length) {
    return files;
  }
  return items.filter((item) => item.kind === "file").map((item) => item.getAsFile());
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/inputobserver.js
import {env as env4} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InputObserver = class extends domeventobserver_default {
  constructor() {
    super(...arguments);
    this.domEventType = "beforeinput";
  }
  onDomEvent(domEvent) {
    const domTargetRanges = domEvent.getTargetRanges();
    const view = this.view;
    const viewDocument = view.document;
    let dataTransfer = null;
    let data = null;
    let targetRanges = [];
    if (domEvent.dataTransfer) {
      dataTransfer = new datatransfer_default(domEvent.dataTransfer);
    }
    if (domEvent.data !== null) {
      data = domEvent.data;
    } else if (dataTransfer) {
      data = dataTransfer.getData("text/plain");
    }
    if (viewDocument.selection.isFake) {
      targetRanges = Array.from(viewDocument.selection.getRanges());
    } else if (domTargetRanges.length) {
      targetRanges = domTargetRanges.map((domRange) => {
        const viewStart = view.domConverter.domPositionToView(domRange.startContainer, domRange.startOffset);
        const viewEnd = view.domConverter.domPositionToView(domRange.endContainer, domRange.endOffset);
        if (viewStart) {
          return view.createRange(viewStart, viewEnd);
        } else if (viewEnd) {
          return view.createRange(viewEnd);
        }
      }).filter((range) => !!range);
    } else if (env4.isAndroid) {
      const domSelection = domEvent.target.ownerDocument.defaultView.getSelection();
      targetRanges = Array.from(view.domConverter.domSelectionToView(domSelection).getRanges());
    }
    if (env4.isAndroid && domEvent.inputType == "insertCompositionText" && data && data.endsWith("\n")) {
      this.fire(domEvent.type, domEvent, {
        inputType: "insertParagraph",
        targetRanges: [view.createRange(targetRanges[0].end)]
      });
      return;
    }
    if (domEvent.inputType == "insertText" && data && data.includes("\n")) {
      const parts = data.split(/\n{1,2}/g);
      let partTargetRanges = targetRanges;
      for (let i = 0; i < parts.length; i++) {
        const dataPart = parts[i];
        if (dataPart != "") {
          this.fire(domEvent.type, domEvent, {
            data: dataPart,
            dataTransfer,
            targetRanges: partTargetRanges,
            inputType: domEvent.inputType,
            isComposing: domEvent.isComposing
          });
          partTargetRanges = [viewDocument.selection.getFirstRange()];
        }
        if (i + 1 < parts.length) {
          this.fire(domEvent.type, domEvent, {
            inputType: "insertParagraph",
            targetRanges: partTargetRanges
          });
          partTargetRanges = [viewDocument.selection.getFirstRange()];
        }
      }
      return;
    }
    this.fire(domEvent.type, domEvent, {
      data,
      dataTransfer,
      targetRanges,
      inputType: domEvent.inputType,
      isComposing: domEvent.isComposing
    });
  }
};
var inputobserver_default = InputObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/arrowkeysobserver.js
import {isArrowKeyCode} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ArrowKeysObserver = class extends observer_default {
  constructor(view) {
    super(view);
    this.document.on("keydown", (event, data) => {
      if (this.isEnabled && isArrowKeyCode(data.keyCode)) {
        const eventInfo = new bubblingeventinfo_default(this.document, "arrowKey", this.document.selection.getFirstRange());
        this.document.fire(eventInfo, data);
        if (eventInfo.stop.called) {
          event.stop();
        }
      }
    });
  }
  observe() {
  }
  stopObserving() {
  }
};
var arrowkeysobserver_default = ArrowKeysObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/tabobserver.js
import {keyCodes as keyCodes4} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TabObserver = class extends observer_default {
  constructor(view) {
    super(view);
    const doc = this.document;
    doc.on("keydown", (evt, data) => {
      if (!this.isEnabled || data.keyCode != keyCodes4.tab || data.ctrlKey) {
        return;
      }
      const event = new bubblingeventinfo_default(doc, "tab", doc.selection.getFirstRange());
      doc.fire(event, data);
      if (event.stop.called) {
        evt.stop();
      }
    });
  }
  observe() {
  }
  stopObserving() {
  }
};
var tabobserver_default = TabObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/view.js
import {CKEditorError as CKEditorError13, env as env5, ObservableMixin as ObservableMixin4, scrollViewportToShowTarget} from "es-ckeditor-lib/lib/utils";
import {cloneDeep} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var View = class extends ObservableMixin4() {
  constructor(stylesProcessor) {
    super();
    this.domRoots = new Map();
    this._initialDomRootAttributes = new WeakMap();
    this._observers = new Map();
    this._ongoingChange = false;
    this._postFixersInProgress = false;
    this._renderingDisabled = false;
    this._hasChangedSinceTheLastRendering = false;
    this.document = new document_default(stylesProcessor);
    this.domConverter = new domconverter_default(this.document);
    this.set("isRenderingInProgress", false);
    this.set("hasDomSelection", false);
    this._renderer = new renderer_default(this.domConverter, this.document.selection);
    this._renderer.bind("isFocused", "isSelecting", "isComposing").to(this.document, "isFocused", "isSelecting", "isComposing");
    this._writer = new downcastwriter_default(this.document);
    this.addObserver(mutationobserver_default);
    this.addObserver(focusobserver_default);
    this.addObserver(selectionobserver_default);
    this.addObserver(keyobserver_default);
    this.addObserver(fakeselectionobserver_default);
    this.addObserver(compositionobserver_default);
    this.addObserver(arrowkeysobserver_default);
    this.addObserver(inputobserver_default);
    this.addObserver(tabobserver_default);
    injectQuirksHandling(this);
    injectUiElementHandling(this);
    this.on("render", () => {
      this._render();
      this.document.fire("layoutChanged");
      this._hasChangedSinceTheLastRendering = false;
    });
    this.listenTo(this.document.selection, "change", () => {
      this._hasChangedSinceTheLastRendering = true;
    });
    this.listenTo(this.document, "change:isFocused", () => {
      this._hasChangedSinceTheLastRendering = true;
    });
    if (env5.isiOS) {
      this.listenTo(this.document, "blur", (evt, data) => {
        const relatedViewElement = this.domConverter.mapDomToView(data.domEvent.relatedTarget);
        if (!relatedViewElement) {
          this.domConverter._clearDomSelection();
        }
      });
    }
  }
  attachDomRoot(domRoot, name = "main") {
    const viewRoot = this.document.getRoot(name);
    viewRoot._name = domRoot.tagName.toLowerCase();
    const initialDomRootAttributes = {};
    for (const {name: name2, value} of Array.from(domRoot.attributes)) {
      initialDomRootAttributes[name2] = value;
      if (name2 === "class") {
        this._writer.addClass(value.split(" "), viewRoot);
      } else {
        this._writer.setAttribute(name2, value, viewRoot);
      }
    }
    this._initialDomRootAttributes.set(domRoot, initialDomRootAttributes);
    const updateContenteditableAttribute = () => {
      this._writer.setAttribute("contenteditable", (!viewRoot.isReadOnly).toString(), viewRoot);
      if (viewRoot.isReadOnly) {
        this._writer.addClass("ck-read-only", viewRoot);
      } else {
        this._writer.removeClass("ck-read-only", viewRoot);
      }
    };
    updateContenteditableAttribute();
    this.domRoots.set(name, domRoot);
    this.domConverter.bindElements(domRoot, viewRoot);
    this._renderer.markToSync("children", viewRoot);
    this._renderer.markToSync("attributes", viewRoot);
    this._renderer.domDocuments.add(domRoot.ownerDocument);
    viewRoot.on("change:children", (evt, node) => this._renderer.markToSync("children", node));
    viewRoot.on("change:attributes", (evt, node) => this._renderer.markToSync("attributes", node));
    viewRoot.on("change:text", (evt, node) => this._renderer.markToSync("text", node));
    viewRoot.on("change:isReadOnly", () => this.change(updateContenteditableAttribute));
    viewRoot.on("change", () => {
      this._hasChangedSinceTheLastRendering = true;
    });
    for (const observer of this._observers.values()) {
      observer.observe(domRoot, name);
    }
  }
  detachDomRoot(name) {
    const domRoot = this.domRoots.get(name);
    Array.from(domRoot.attributes).forEach(({name: name2}) => domRoot.removeAttribute(name2));
    const initialDomRootAttributes = this._initialDomRootAttributes.get(domRoot);
    for (const attribute in initialDomRootAttributes) {
      domRoot.setAttribute(attribute, initialDomRootAttributes[attribute]);
    }
    this.domRoots.delete(name);
    this.domConverter.unbindDomElement(domRoot);
    for (const observer of this._observers.values()) {
      observer.stopObserving(domRoot);
    }
  }
  getDomRoot(name = "main") {
    return this.domRoots.get(name);
  }
  addObserver(ObserverConstructor) {
    let observer = this._observers.get(ObserverConstructor);
    if (observer) {
      return observer;
    }
    observer = new ObserverConstructor(this);
    this._observers.set(ObserverConstructor, observer);
    for (const [name, domElement] of this.domRoots) {
      observer.observe(domElement, name);
    }
    observer.enable();
    return observer;
  }
  getObserver(ObserverConstructor) {
    return this._observers.get(ObserverConstructor);
  }
  disableObservers() {
    for (const observer of this._observers.values()) {
      observer.disable();
    }
  }
  enableObservers() {
    for (const observer of this._observers.values()) {
      observer.enable();
    }
  }
  scrollToTheSelection({alignToTop, forceScroll, viewportOffset = 20, ancestorOffset = 20} = {}) {
    const range = this.document.selection.getFirstRange();
    if (!range) {
      return;
    }
    const originalArgs = cloneDeep({alignToTop, forceScroll, viewportOffset, ancestorOffset});
    if (typeof viewportOffset === "number") {
      viewportOffset = {
        top: viewportOffset,
        bottom: viewportOffset,
        left: viewportOffset,
        right: viewportOffset
      };
    }
    const options = {
      target: this.domConverter.viewRangeToDom(range),
      viewportOffset,
      ancestorOffset,
      alignToTop,
      forceScroll
    };
    this.fire("scrollToTheSelection", options, originalArgs);
    scrollViewportToShowTarget(options);
  }
  focus() {
    if (!this.document.isFocused) {
      const editable = this.document.selection.editableElement;
      if (editable) {
        this.domConverter.focus(editable);
        this.forceRender();
      } else {
      }
    }
  }
  change(callback) {
    if (this.isRenderingInProgress || this._postFixersInProgress) {
      throw new CKEditorError13("cannot-change-view-tree", this);
    }
    try {
      if (this._ongoingChange) {
        return callback(this._writer);
      }
      this._ongoingChange = true;
      const callbackResult = callback(this._writer);
      this._ongoingChange = false;
      if (!this._renderingDisabled && this._hasChangedSinceTheLastRendering) {
        this._postFixersInProgress = true;
        this.document._callPostFixers(this._writer);
        this._postFixersInProgress = false;
        this.fire("render");
      }
      return callbackResult;
    } catch (err) {
      /* istanbul ignore next -- @preserve */
      CKEditorError13.rethrowUnexpectedError(err, this);
    }
  }
  forceRender() {
    this._hasChangedSinceTheLastRendering = true;
    this.getObserver(focusobserver_default).flush();
    this.change(() => {
    });
  }
  destroy() {
    for (const observer of this._observers.values()) {
      observer.destroy();
    }
    this.document.destroy();
    this.stopListening();
  }
  createPositionAt(itemOrPosition, offset) {
    return position_default._createAt(itemOrPosition, offset);
  }
  createPositionAfter(item) {
    return position_default._createAfter(item);
  }
  createPositionBefore(item) {
    return position_default._createBefore(item);
  }
  createRange(start, end) {
    return new range_default(start, end);
  }
  createRangeOn(item) {
    return range_default._createOn(item);
  }
  createRangeIn(element) {
    return range_default._createIn(element);
  }
  createSelection(...args) {
    return new selection_default(...args);
  }
  _disableRendering(flag) {
    this._renderingDisabled = flag;
    if (flag == false) {
      this.change(() => {
      });
    }
  }
  _render() {
    this.isRenderingInProgress = true;
    this.disableObservers();
    this._renderer.render();
    this.enableObservers();
    this.isRenderingInProgress = false;
  }
};
var view_default = View;

// node_modules/@ckeditor/ckeditor5-engine/src/model/typecheckable.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TypeCheckable2 = class {
  is() {
    throw new Error("is() method is abstract");
  }
};
var typecheckable_default2 = TypeCheckable2;

// node_modules/@ckeditor/ckeditor5-engine/src/model/node.js
import {CKEditorError as CKEditorError14, compareArrays as compareArrays3, toMap as toMap2} from "es-ckeditor-lib/lib/utils";
import "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Node3 = class extends typecheckable_default2 {
  constructor(attrs) {
    super();
    this.parent = null;
    this._attrs = toMap2(attrs);
  }
  get document() {
    return null;
  }
  get index() {
    let pos;
    if (!this.parent) {
      return null;
    }
    if ((pos = this.parent.getChildIndex(this)) === null) {
      throw new CKEditorError14("model-node-not-found-in-parent", this);
    }
    return pos;
  }
  get startOffset() {
    let pos;
    if (!this.parent) {
      return null;
    }
    if ((pos = this.parent.getChildStartOffset(this)) === null) {
      throw new CKEditorError14("model-node-not-found-in-parent", this);
    }
    return pos;
  }
  get offsetSize() {
    return 1;
  }
  get endOffset() {
    if (!this.parent) {
      return null;
    }
    return this.startOffset + this.offsetSize;
  }
  get nextSibling() {
    const index = this.index;
    return index !== null && this.parent.getChild(index + 1) || null;
  }
  get previousSibling() {
    const index = this.index;
    return index !== null && this.parent.getChild(index - 1) || null;
  }
  get root() {
    let root = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }
  isAttached() {
    return this.parent === null ? false : this.root.isAttached();
  }
  getPath() {
    const path = [];
    let node = this;
    while (node.parent) {
      path.unshift(node.startOffset);
      node = node.parent;
    }
    return path;
  }
  getAncestors(options = {}) {
    const ancestors = [];
    let parent = options.includeSelf ? this : this.parent;
    while (parent) {
      ancestors[options.parentFirst ? "push" : "unshift"](parent);
      parent = parent.parent;
    }
    return ancestors;
  }
  getCommonAncestor(node, options = {}) {
    const ancestorsA = this.getAncestors(options);
    const ancestorsB = node.getAncestors(options);
    let i = 0;
    while (ancestorsA[i] == ancestorsB[i] && ancestorsA[i]) {
      i++;
    }
    return i === 0 ? null : ancestorsA[i - 1];
  }
  isBefore(node) {
    if (this == node) {
      return false;
    }
    if (this.root !== node.root) {
      return false;
    }
    const thisPath = this.getPath();
    const nodePath = node.getPath();
    const result = compareArrays3(thisPath, nodePath);
    switch (result) {
      case "prefix":
        return true;
      case "extension":
        return false;
      default:
        return thisPath[result] < nodePath[result];
    }
  }
  isAfter(node) {
    if (this == node) {
      return false;
    }
    if (this.root !== node.root) {
      return false;
    }
    return !this.isBefore(node);
  }
  hasAttribute(key) {
    return this._attrs.has(key);
  }
  getAttribute(key) {
    return this._attrs.get(key);
  }
  getAttributes() {
    return this._attrs.entries();
  }
  getAttributeKeys() {
    return this._attrs.keys();
  }
  toJSON() {
    const json = {};
    if (this._attrs.size) {
      json.attributes = Array.from(this._attrs).reduce((result, attr) => {
        result[attr[0]] = attr[1];
        return result;
      }, {});
    }
    return json;
  }
  _clone(_deep) {
    return new this.constructor(this._attrs);
  }
  _remove() {
    this.parent._removeChildren(this.index);
  }
  _setAttribute(key, value) {
    this._attrs.set(key, value);
  }
  _setAttributesTo(attrs) {
    this._attrs = toMap2(attrs);
  }
  _removeAttribute(key) {
    return this._attrs.delete(key);
  }
  _clearAttributes() {
    this._attrs.clear();
  }
};
var node_default2 = Node3;
Node3.prototype.is = function(type) {
  return type === "node" || type === "model:node";
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/nodelist.js
import {CKEditorError as CKEditorError15, spliceArray} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var NodeList = class {
  constructor(nodes) {
    this._nodes = [];
    if (nodes) {
      this._insertNodes(0, nodes);
    }
  }
  [Symbol.iterator]() {
    return this._nodes[Symbol.iterator]();
  }
  get length() {
    return this._nodes.length;
  }
  get maxOffset() {
    return this._nodes.reduce((sum, node) => sum + node.offsetSize, 0);
  }
  getNode(index) {
    return this._nodes[index] || null;
  }
  getNodeIndex(node) {
    const index = this._nodes.indexOf(node);
    return index == -1 ? null : index;
  }
  getNodeStartOffset(node) {
    const index = this.getNodeIndex(node);
    return index === null ? null : this._nodes.slice(0, index).reduce((sum, node2) => sum + node2.offsetSize, 0);
  }
  indexToOffset(index) {
    if (index == this._nodes.length) {
      return this.maxOffset;
    }
    const node = this._nodes[index];
    if (!node) {
      throw new CKEditorError15("model-nodelist-index-out-of-bounds", this);
    }
    return this.getNodeStartOffset(node);
  }
  offsetToIndex(offset) {
    let totalOffset = 0;
    for (const node of this._nodes) {
      if (offset >= totalOffset && offset < totalOffset + node.offsetSize) {
        return this.getNodeIndex(node);
      }
      totalOffset += node.offsetSize;
    }
    if (totalOffset != offset) {
      throw new CKEditorError15("model-nodelist-offset-out-of-bounds", this, {
        offset,
        nodeList: this
      });
    }
    return this.length;
  }
  _insertNodes(index, nodes) {
    for (const node of nodes) {
      if (!(node instanceof node_default2)) {
        throw new CKEditorError15("model-nodelist-insertnodes-not-node", this);
      }
    }
    this._nodes = spliceArray(this._nodes, Array.from(nodes), index, 0);
  }
  _removeNodes(indexStart, howMany = 1) {
    return this._nodes.splice(indexStart, howMany);
  }
  toJSON() {
    return this._nodes.map((node) => node.toJSON());
  }
};
var nodelist_default = NodeList;

// node_modules/@ckeditor/ckeditor5-engine/src/model/text.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Text2 = class extends node_default2 {
  constructor(data, attrs) {
    super(attrs);
    this._data = data || "";
  }
  get offsetSize() {
    return this.data.length;
  }
  get data() {
    return this._data;
  }
  toJSON() {
    const json = super.toJSON();
    json.data = this.data;
    return json;
  }
  _clone() {
    return new Text2(this.data, this.getAttributes());
  }
  static fromJSON(json) {
    return new Text2(json.data, json.attributes);
  }
};
var text_default2 = Text2;
Text2.prototype.is = function(type) {
  return type === "$text" || type === "model:$text" || type === "text" || type === "model:text" || type === "node" || type === "model:node";
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/textproxy.js
import {CKEditorError as CKEditorError16} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TextProxy2 = class extends typecheckable_default2 {
  constructor(textNode, offsetInText, length) {
    super();
    this.textNode = textNode;
    if (offsetInText < 0 || offsetInText > textNode.offsetSize) {
      throw new CKEditorError16("model-textproxy-wrong-offsetintext", this);
    }
    if (length < 0 || offsetInText + length > textNode.offsetSize) {
      throw new CKEditorError16("model-textproxy-wrong-length", this);
    }
    this.data = textNode.data.substring(offsetInText, offsetInText + length);
    this.offsetInText = offsetInText;
  }
  get startOffset() {
    return this.textNode.startOffset !== null ? this.textNode.startOffset + this.offsetInText : null;
  }
  get offsetSize() {
    return this.data.length;
  }
  get endOffset() {
    return this.startOffset !== null ? this.startOffset + this.offsetSize : null;
  }
  get isPartial() {
    return this.offsetSize !== this.textNode.offsetSize;
  }
  get parent() {
    return this.textNode.parent;
  }
  get root() {
    return this.textNode.root;
  }
  getPath() {
    const path = this.textNode.getPath();
    if (path.length > 0) {
      path[path.length - 1] += this.offsetInText;
    }
    return path;
  }
  getAncestors(options = {}) {
    const ancestors = [];
    let parent = options.includeSelf ? this : this.parent;
    while (parent) {
      ancestors[options.parentFirst ? "push" : "unshift"](parent);
      parent = parent.parent;
    }
    return ancestors;
  }
  hasAttribute(key) {
    return this.textNode.hasAttribute(key);
  }
  getAttribute(key) {
    return this.textNode.getAttribute(key);
  }
  getAttributes() {
    return this.textNode.getAttributes();
  }
  getAttributeKeys() {
    return this.textNode.getAttributeKeys();
  }
};
var textproxy_default2 = TextProxy2;
TextProxy2.prototype.is = function(type) {
  return type === "$textProxy" || type === "model:$textProxy" || type === "textProxy" || type === "model:textProxy";
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/element.js
import {isIterable as isIterable5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Element2 = class extends node_default2 {
  constructor(name, attrs, children) {
    super(attrs);
    this._children = new nodelist_default();
    this.name = name;
    if (children) {
      this._insertChild(0, children);
    }
  }
  get childCount() {
    return this._children.length;
  }
  get maxOffset() {
    return this._children.maxOffset;
  }
  get isEmpty() {
    return this.childCount === 0;
  }
  getChild(index) {
    return this._children.getNode(index);
  }
  getChildren() {
    return this._children[Symbol.iterator]();
  }
  getChildIndex(node) {
    return this._children.getNodeIndex(node);
  }
  getChildStartOffset(node) {
    return this._children.getNodeStartOffset(node);
  }
  offsetToIndex(offset) {
    return this._children.offsetToIndex(offset);
  }
  getNodeByPath(relativePath) {
    let node = this;
    for (const index of relativePath) {
      node = node.getChild(node.offsetToIndex(index));
    }
    return node;
  }
  findAncestor(parentName, options = {}) {
    let parent = options.includeSelf ? this : this.parent;
    while (parent) {
      if (parent.name === parentName) {
        return parent;
      }
      parent = parent.parent;
    }
    return null;
  }
  toJSON() {
    const json = super.toJSON();
    json.name = this.name;
    if (this._children.length > 0) {
      json.children = [];
      for (const node of this._children) {
        json.children.push(node.toJSON());
      }
    }
    return json;
  }
  _clone(deep = false) {
    const children = deep ? Array.from(this._children).map((node) => node._clone(true)) : void 0;
    return new Element2(this.name, this.getAttributes(), children);
  }
  _appendChild(nodes) {
    this._insertChild(this.childCount, nodes);
  }
  _insertChild(index, items) {
    const nodes = normalize3(items);
    for (const node of nodes) {
      if (node.parent !== null) {
        node._remove();
      }
      node.parent = this;
    }
    this._children._insertNodes(index, nodes);
  }
  _removeChildren(index, howMany = 1) {
    const nodes = this._children._removeNodes(index, howMany);
    for (const node of nodes) {
      node.parent = null;
    }
    return nodes;
  }
  static fromJSON(json) {
    let children;
    if (json.children) {
      children = [];
      for (const child of json.children) {
        if (child.name) {
          children.push(Element2.fromJSON(child));
        } else {
          children.push(text_default2.fromJSON(child));
        }
      }
    }
    return new Element2(json.name, json.attributes, children);
  }
};
var element_default2 = Element2;
Element2.prototype.is = function(type, name) {
  if (!name) {
    return type === "element" || type === "model:element" || type === "node" || type === "model:node";
  }
  return name === this.name && (type === "element" || type === "model:element");
};
function normalize3(nodes) {
  if (typeof nodes == "string") {
    return [new text_default2(nodes)];
  }
  if (!isIterable5(nodes)) {
    nodes = [nodes];
  }
  return Array.from(nodes).map((node) => {
    if (typeof node == "string") {
      return new text_default2(node);
    }
    if (node instanceof textproxy_default2) {
      return new text_default2(node.data, node.getAttributes());
    }
    return node;
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/treewalker.js
import {CKEditorError as CKEditorError17} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var TreeWalker2 = class {
  constructor(options) {
    if (!options || !options.boundaries && !options.startPosition) {
      throw new CKEditorError17("model-tree-walker-no-start-position", null);
    }
    const direction = options.direction || "forward";
    if (direction != "forward" && direction != "backward") {
      throw new CKEditorError17("model-tree-walker-unknown-direction", options, {direction});
    }
    this.direction = direction;
    this.boundaries = options.boundaries || null;
    if (options.startPosition) {
      this._position = options.startPosition.clone();
    } else {
      this._position = position_default2._createAt(this.boundaries[this.direction == "backward" ? "end" : "start"]);
    }
    this.position.stickiness = "toNone";
    this.singleCharacters = !!options.singleCharacters;
    this.shallow = !!options.shallow;
    this.ignoreElementEnd = !!options.ignoreElementEnd;
    this._boundaryStartParent = this.boundaries ? this.boundaries.start.parent : null;
    this._boundaryEndParent = this.boundaries ? this.boundaries.end.parent : null;
    this._visitedParent = this.position.parent;
  }
  [Symbol.iterator]() {
    return this;
  }
  get position() {
    return this._position;
  }
  skip(skip) {
    let done, value, prevPosition, prevVisitedParent;
    do {
      prevPosition = this.position;
      prevVisitedParent = this._visitedParent;
      ({done, value} = this.next());
    } while (!done && skip(value));
    if (!done) {
      this._position = prevPosition;
      this._visitedParent = prevVisitedParent;
    }
  }
  next() {
    if (this.direction == "forward") {
      return this._next();
    } else {
      return this._previous();
    }
  }
  _next() {
    const previousPosition = this.position;
    const position = this.position.clone();
    const parent = this._visitedParent;
    if (parent.parent === null && position.offset === parent.maxOffset) {
      return {done: true, value: void 0};
    }
    if (parent === this._boundaryEndParent && position.offset == this.boundaries.end.offset) {
      return {done: true, value: void 0};
    }
    const textNodeAtPosition = getTextNodeAtPosition(position, parent);
    const node = textNodeAtPosition || getNodeAfterPosition(position, parent, textNodeAtPosition);
    if (node instanceof element_default2) {
      if (!this.shallow) {
        position.path.push(0);
        this._visitedParent = node;
      } else {
        if (this.boundaries && this.boundaries.end.isBefore(position)) {
          return {done: true, value: void 0};
        }
        position.offset++;
      }
      this._position = position;
      return formatReturnValue("elementStart", node, previousPosition, position, 1);
    }
    if (node instanceof text_default2) {
      let charactersCount;
      if (this.singleCharacters) {
        charactersCount = 1;
      } else {
        let offset = node.endOffset;
        if (this._boundaryEndParent == parent && this.boundaries.end.offset < offset) {
          offset = this.boundaries.end.offset;
        }
        charactersCount = offset - position.offset;
      }
      const offsetInTextNode = position.offset - node.startOffset;
      const item = new textproxy_default2(node, offsetInTextNode, charactersCount);
      position.offset += charactersCount;
      this._position = position;
      return formatReturnValue("text", item, previousPosition, position, charactersCount);
    }
    position.path.pop();
    position.offset++;
    this._position = position;
    this._visitedParent = parent.parent;
    if (this.ignoreElementEnd) {
      return this._next();
    }
    return formatReturnValue("elementEnd", parent, previousPosition, position);
  }
  _previous() {
    const previousPosition = this.position;
    const position = this.position.clone();
    const parent = this._visitedParent;
    if (parent.parent === null && position.offset === 0) {
      return {done: true, value: void 0};
    }
    if (parent == this._boundaryStartParent && position.offset == this.boundaries.start.offset) {
      return {done: true, value: void 0};
    }
    const positionParent = position.parent;
    const textNodeAtPosition = getTextNodeAtPosition(position, positionParent);
    const node = textNodeAtPosition || getNodeBeforePosition(position, positionParent, textNodeAtPosition);
    if (node instanceof element_default2) {
      position.offset--;
      if (this.shallow) {
        this._position = position;
        return formatReturnValue("elementStart", node, previousPosition, position, 1);
      }
      position.path.push(node.maxOffset);
      this._position = position;
      this._visitedParent = node;
      if (this.ignoreElementEnd) {
        return this._previous();
      }
      return formatReturnValue("elementEnd", node, previousPosition, position);
    }
    if (node instanceof text_default2) {
      let charactersCount;
      if (this.singleCharacters) {
        charactersCount = 1;
      } else {
        let offset = node.startOffset;
        if (this._boundaryStartParent == parent && this.boundaries.start.offset > offset) {
          offset = this.boundaries.start.offset;
        }
        charactersCount = position.offset - offset;
      }
      const offsetInTextNode = position.offset - node.startOffset;
      const item = new textproxy_default2(node, offsetInTextNode - charactersCount, charactersCount);
      position.offset -= charactersCount;
      this._position = position;
      return formatReturnValue("text", item, previousPosition, position, charactersCount);
    }
    position.path.pop();
    this._position = position;
    this._visitedParent = parent.parent;
    return formatReturnValue("elementStart", parent, previousPosition, position, 1);
  }
};
var treewalker_default2 = TreeWalker2;
function formatReturnValue(type, item, previousPosition, nextPosition, length) {
  return {
    done: false,
    value: {
      type,
      item,
      previousPosition,
      nextPosition,
      length
    }
  };
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/position.js
import {CKEditorError as CKEditorError18, compareArrays as compareArrays4} from "es-ckeditor-lib/lib/utils";
import "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Position2 = class extends typecheckable_default2 {
  constructor(root, path, stickiness = "toNone") {
    super();
    if (!root.is("element") && !root.is("documentFragment")) {
      throw new CKEditorError18("model-position-root-invalid", root);
    }
    if (!(path instanceof Array) || path.length === 0) {
      throw new CKEditorError18("model-position-path-incorrect-format", root, {path});
    }
    if (root.is("rootElement")) {
      path = path.slice();
    } else {
      path = [...root.getPath(), ...path];
      root = root.root;
    }
    this.root = root;
    this.path = path;
    this.stickiness = stickiness;
  }
  get offset() {
    return this.path[this.path.length - 1];
  }
  set offset(newOffset) {
    this.path[this.path.length - 1] = newOffset;
  }
  get parent() {
    let parent = this.root;
    for (let i = 0; i < this.path.length - 1; i++) {
      parent = parent.getChild(parent.offsetToIndex(this.path[i]));
      if (!parent) {
        throw new CKEditorError18("model-position-path-incorrect", this, {position: this});
      }
    }
    if (parent.is("$text")) {
      throw new CKEditorError18("model-position-path-incorrect", this, {position: this});
    }
    return parent;
  }
  get index() {
    return this.parent.offsetToIndex(this.offset);
  }
  get textNode() {
    return getTextNodeAtPosition(this, this.parent);
  }
  get nodeAfter() {
    const parent = this.parent;
    return getNodeAfterPosition(this, parent, getTextNodeAtPosition(this, parent));
  }
  get nodeBefore() {
    const parent = this.parent;
    return getNodeBeforePosition(this, parent, getTextNodeAtPosition(this, parent));
  }
  get isAtStart() {
    return this.offset === 0;
  }
  get isAtEnd() {
    return this.offset == this.parent.maxOffset;
  }
  compareWith(otherPosition) {
    if (this.root != otherPosition.root) {
      return "different";
    }
    const result = compareArrays4(this.path, otherPosition.path);
    switch (result) {
      case "same":
        return "same";
      case "prefix":
        return "before";
      case "extension":
        return "after";
      default:
        return this.path[result] < otherPosition.path[result] ? "before" : "after";
    }
  }
  getLastMatchingPosition(skip, options = {}) {
    options.startPosition = this;
    const treeWalker = new treewalker_default2(options);
    treeWalker.skip(skip);
    return treeWalker.position;
  }
  getParentPath() {
    return this.path.slice(0, -1);
  }
  getAncestors() {
    const parent = this.parent;
    if (parent.is("documentFragment")) {
      return [parent];
    } else {
      return parent.getAncestors({includeSelf: true});
    }
  }
  findAncestor(parentName) {
    const parent = this.parent;
    if (parent.is("element")) {
      return parent.findAncestor(parentName, {includeSelf: true});
    }
    return null;
  }
  getCommonPath(position) {
    if (this.root != position.root) {
      return [];
    }
    const cmp = compareArrays4(this.path, position.path);
    const diffAt = typeof cmp == "string" ? Math.min(this.path.length, position.path.length) : cmp;
    return this.path.slice(0, diffAt);
  }
  getCommonAncestor(position) {
    const ancestorsA = this.getAncestors();
    const ancestorsB = position.getAncestors();
    let i = 0;
    while (ancestorsA[i] == ancestorsB[i] && ancestorsA[i]) {
      i++;
    }
    return i === 0 ? null : ancestorsA[i - 1];
  }
  getShiftedBy(shift) {
    const shifted = this.clone();
    const offset = shifted.offset + shift;
    shifted.offset = offset < 0 ? 0 : offset;
    return shifted;
  }
  isAfter(otherPosition) {
    return this.compareWith(otherPosition) == "after";
  }
  isBefore(otherPosition) {
    return this.compareWith(otherPosition) == "before";
  }
  isEqual(otherPosition) {
    return this.compareWith(otherPosition) == "same";
  }
  isTouching(otherPosition) {
    if (this.root !== otherPosition.root) {
      return false;
    }
    const commonLevel = Math.min(this.path.length, otherPosition.path.length);
    for (let level = 0; level < commonLevel; level++) {
      const diff2 = this.path[level] - otherPosition.path[level];
      if (diff2 < -1 || diff2 > 1) {
        return false;
      } else if (diff2 === 1) {
        return checkTouchingBranch(otherPosition, this, level);
      } else if (diff2 === -1) {
        return checkTouchingBranch(this, otherPosition, level);
      }
    }
    if (this.path.length === otherPosition.path.length) {
      return true;
    } else if (this.path.length > otherPosition.path.length) {
      return checkOnlyZeroes(this.path, commonLevel);
    } else {
      return checkOnlyZeroes(otherPosition.path, commonLevel);
    }
  }
  hasSameParentAs(position) {
    if (this.root !== position.root) {
      return false;
    }
    const thisParentPath = this.getParentPath();
    const posParentPath = position.getParentPath();
    return compareArrays4(thisParentPath, posParentPath) == "same";
  }
  getTransformedByOperation(operation) {
    let result;
    switch (operation.type) {
      case "insert":
        result = this._getTransformedByInsertOperation(operation);
        break;
      case "move":
      case "remove":
      case "reinsert":
        result = this._getTransformedByMoveOperation(operation);
        break;
      case "split":
        result = this._getTransformedBySplitOperation(operation);
        break;
      case "merge":
        result = this._getTransformedByMergeOperation(operation);
        break;
      default:
        result = Position2._createAt(this);
        break;
    }
    return result;
  }
  _getTransformedByInsertOperation(operation) {
    return this._getTransformedByInsertion(operation.position, operation.howMany);
  }
  _getTransformedByMoveOperation(operation) {
    return this._getTransformedByMove(operation.sourcePosition, operation.targetPosition, operation.howMany);
  }
  _getTransformedBySplitOperation(operation) {
    const movedRange = operation.movedRange;
    const isContained = movedRange.containsPosition(this) || movedRange.start.isEqual(this) && this.stickiness == "toNext";
    if (isContained) {
      return this._getCombined(operation.splitPosition, operation.moveTargetPosition);
    } else {
      if (operation.graveyardPosition) {
        return this._getTransformedByMove(operation.graveyardPosition, operation.insertionPosition, 1);
      } else {
        return this._getTransformedByInsertion(operation.insertionPosition, 1);
      }
    }
  }
  _getTransformedByMergeOperation(operation) {
    const movedRange = operation.movedRange;
    const isContained = movedRange.containsPosition(this) || movedRange.start.isEqual(this);
    let pos;
    if (isContained) {
      pos = this._getCombined(operation.sourcePosition, operation.targetPosition);
      if (operation.sourcePosition.isBefore(operation.targetPosition)) {
        pos = pos._getTransformedByDeletion(operation.deletionPosition, 1);
      }
    } else if (this.isEqual(operation.deletionPosition)) {
      pos = Position2._createAt(operation.deletionPosition);
    } else {
      pos = this._getTransformedByMove(operation.deletionPosition, operation.graveyardPosition, 1);
    }
    return pos;
  }
  _getTransformedByDeletion(deletePosition, howMany) {
    const transformed = Position2._createAt(this);
    if (this.root != deletePosition.root) {
      return transformed;
    }
    if (compareArrays4(deletePosition.getParentPath(), this.getParentPath()) == "same") {
      if (deletePosition.offset < this.offset) {
        if (deletePosition.offset + howMany > this.offset) {
          return null;
        } else {
          transformed.offset -= howMany;
        }
      }
    } else if (compareArrays4(deletePosition.getParentPath(), this.getParentPath()) == "prefix") {
      const i = deletePosition.path.length - 1;
      if (deletePosition.offset <= this.path[i]) {
        if (deletePosition.offset + howMany > this.path[i]) {
          return null;
        } else {
          transformed.path[i] -= howMany;
        }
      }
    }
    return transformed;
  }
  _getTransformedByInsertion(insertPosition, howMany) {
    const transformed = Position2._createAt(this);
    if (this.root != insertPosition.root) {
      return transformed;
    }
    if (compareArrays4(insertPosition.getParentPath(), this.getParentPath()) == "same") {
      if (insertPosition.offset < this.offset || insertPosition.offset == this.offset && this.stickiness != "toPrevious") {
        transformed.offset += howMany;
      }
    } else if (compareArrays4(insertPosition.getParentPath(), this.getParentPath()) == "prefix") {
      const i = insertPosition.path.length - 1;
      if (insertPosition.offset <= this.path[i]) {
        transformed.path[i] += howMany;
      }
    }
    return transformed;
  }
  _getTransformedByMove(sourcePosition, targetPosition, howMany) {
    targetPosition = targetPosition._getTransformedByDeletion(sourcePosition, howMany);
    if (sourcePosition.isEqual(targetPosition)) {
      return Position2._createAt(this);
    }
    const transformed = this._getTransformedByDeletion(sourcePosition, howMany);
    const isMoved = transformed === null || sourcePosition.isEqual(this) && this.stickiness == "toNext" || sourcePosition.getShiftedBy(howMany).isEqual(this) && this.stickiness == "toPrevious";
    if (isMoved) {
      return this._getCombined(sourcePosition, targetPosition);
    } else {
      return transformed._getTransformedByInsertion(targetPosition, howMany);
    }
  }
  _getCombined(source, target) {
    const i = source.path.length - 1;
    const combined = Position2._createAt(target);
    combined.stickiness = this.stickiness;
    combined.offset = combined.offset + this.path[i] - source.offset;
    combined.path = [...combined.path, ...this.path.slice(i + 1)];
    return combined;
  }
  toJSON() {
    return {
      root: this.root.toJSON(),
      path: Array.from(this.path),
      stickiness: this.stickiness
    };
  }
  clone() {
    return new this.constructor(this.root, this.path, this.stickiness);
  }
  static _createAt(itemOrPosition, offset, stickiness = "toNone") {
    if (itemOrPosition instanceof Position2) {
      return new Position2(itemOrPosition.root, itemOrPosition.path, itemOrPosition.stickiness);
    } else {
      const node = itemOrPosition;
      if (offset == "end") {
        offset = node.maxOffset;
      } else if (offset == "before") {
        return this._createBefore(node, stickiness);
      } else if (offset == "after") {
        return this._createAfter(node, stickiness);
      } else if (offset !== 0 && !offset) {
        throw new CKEditorError18("model-createpositionat-offset-required", [this, itemOrPosition]);
      }
      if (!node.is("element") && !node.is("documentFragment")) {
        throw new CKEditorError18("model-position-parent-incorrect", [this, itemOrPosition]);
      }
      const path = node.getPath();
      path.push(offset);
      return new this(node.root, path, stickiness);
    }
  }
  static _createAfter(item, stickiness) {
    if (!item.parent) {
      throw new CKEditorError18("model-position-after-root", [this, item], {root: item});
    }
    return this._createAt(item.parent, item.endOffset, stickiness);
  }
  static _createBefore(item, stickiness) {
    if (!item.parent) {
      throw new CKEditorError18("model-position-before-root", item, {root: item});
    }
    return this._createAt(item.parent, item.startOffset, stickiness);
  }
  static fromJSON(json, doc) {
    if (json.root === "$graveyard") {
      const pos = new Position2(doc.graveyard, json.path);
      pos.stickiness = json.stickiness;
      return pos;
    }
    if (!doc.getRoot(json.root)) {
      throw new CKEditorError18("model-position-fromjson-no-root", doc, {rootName: json.root});
    }
    return new Position2(doc.getRoot(json.root), json.path, json.stickiness);
  }
};
var position_default2 = Position2;
Position2.prototype.is = function(type) {
  return type === "position" || type === "model:position";
};
function getTextNodeAtPosition(position, positionParent) {
  const node = positionParent.getChild(positionParent.offsetToIndex(position.offset));
  if (node && node.is("$text") && node.startOffset < position.offset) {
    return node;
  }
  return null;
}
function getNodeAfterPosition(position, positionParent, textNode) {
  if (textNode !== null) {
    return null;
  }
  return positionParent.getChild(positionParent.offsetToIndex(position.offset));
}
function getNodeBeforePosition(position, positionParent, textNode) {
  if (textNode !== null) {
    return null;
  }
  return positionParent.getChild(positionParent.offsetToIndex(position.offset) - 1);
}
function checkTouchingBranch(left, right, level) {
  if (level + 1 === left.path.length) {
    return false;
  }
  if (!checkOnlyZeroes(right.path, level + 1)) {
    return false;
  }
  if (!checkOnlyMaxOffset(left, level + 1)) {
    return false;
  }
  return true;
}
function checkOnlyZeroes(arr, idx) {
  while (idx < arr.length) {
    if (arr[idx] !== 0) {
      return false;
    }
    idx++;
  }
  return true;
}
function checkOnlyMaxOffset(pos, level) {
  let parent = pos.parent;
  let idx = pos.path.length - 1;
  let add = 0;
  while (idx >= level) {
    if (pos.path[idx] + add !== parent.maxOffset) {
      return false;
    }
    add = 1;
    idx--;
    parent = parent.parent;
  }
  return true;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/range.js
import {CKEditorError as CKEditorError19, compareArrays as compareArrays5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Range2 = class extends typecheckable_default2 {
  constructor(start, end) {
    super();
    this.start = position_default2._createAt(start);
    this.end = end ? position_default2._createAt(end) : position_default2._createAt(start);
    this.start.stickiness = this.isCollapsed ? "toNone" : "toNext";
    this.end.stickiness = this.isCollapsed ? "toNone" : "toPrevious";
  }
  *[Symbol.iterator]() {
    yield* new treewalker_default2({boundaries: this, ignoreElementEnd: true});
  }
  get isCollapsed() {
    return this.start.isEqual(this.end);
  }
  get isFlat() {
    const startParentPath = this.start.getParentPath();
    const endParentPath = this.end.getParentPath();
    return compareArrays5(startParentPath, endParentPath) == "same";
  }
  get root() {
    return this.start.root;
  }
  containsPosition(position) {
    return position.isAfter(this.start) && position.isBefore(this.end);
  }
  containsRange(otherRange, loose = false) {
    if (otherRange.isCollapsed) {
      loose = false;
    }
    const containsStart = this.containsPosition(otherRange.start) || loose && this.start.isEqual(otherRange.start);
    const containsEnd = this.containsPosition(otherRange.end) || loose && this.end.isEqual(otherRange.end);
    return containsStart && containsEnd;
  }
  containsItem(item) {
    const pos = position_default2._createBefore(item);
    return this.containsPosition(pos) || this.start.isEqual(pos);
  }
  isEqual(otherRange) {
    return this.start.isEqual(otherRange.start) && this.end.isEqual(otherRange.end);
  }
  isIntersecting(otherRange) {
    return this.start.isBefore(otherRange.end) && this.end.isAfter(otherRange.start);
  }
  getDifference(otherRange) {
    const ranges = [];
    if (this.isIntersecting(otherRange)) {
      if (this.containsPosition(otherRange.start)) {
        ranges.push(new Range2(this.start, otherRange.start));
      }
      if (this.containsPosition(otherRange.end)) {
        ranges.push(new Range2(otherRange.end, this.end));
      }
    } else {
      ranges.push(new Range2(this.start, this.end));
    }
    return ranges;
  }
  getIntersection(otherRange) {
    if (this.isIntersecting(otherRange)) {
      let commonRangeStart = this.start;
      let commonRangeEnd = this.end;
      if (this.containsPosition(otherRange.start)) {
        commonRangeStart = otherRange.start;
      }
      if (this.containsPosition(otherRange.end)) {
        commonRangeEnd = otherRange.end;
      }
      return new Range2(commonRangeStart, commonRangeEnd);
    }
    return null;
  }
  getJoined(otherRange, loose = false) {
    let shouldJoin = this.isIntersecting(otherRange);
    if (!shouldJoin) {
      if (this.start.isBefore(otherRange.start)) {
        shouldJoin = loose ? this.end.isTouching(otherRange.start) : this.end.isEqual(otherRange.start);
      } else {
        shouldJoin = loose ? otherRange.end.isTouching(this.start) : otherRange.end.isEqual(this.start);
      }
    }
    if (!shouldJoin) {
      return null;
    }
    let startPosition = this.start;
    let endPosition = this.end;
    if (otherRange.start.isBefore(startPosition)) {
      startPosition = otherRange.start;
    }
    if (otherRange.end.isAfter(endPosition)) {
      endPosition = otherRange.end;
    }
    return new Range2(startPosition, endPosition);
  }
  getMinimalFlatRanges() {
    const ranges = [];
    const diffAt = this.start.getCommonPath(this.end).length;
    const pos = position_default2._createAt(this.start);
    let posParent = pos.parent;
    while (pos.path.length > diffAt + 1) {
      const howMany = posParent.maxOffset - pos.offset;
      if (howMany !== 0) {
        ranges.push(new Range2(pos, pos.getShiftedBy(howMany)));
      }
      pos.path = pos.path.slice(0, -1);
      pos.offset++;
      posParent = posParent.parent;
    }
    while (pos.path.length <= this.end.path.length) {
      const offset = this.end.path[pos.path.length - 1];
      const howMany = offset - pos.offset;
      if (howMany !== 0) {
        ranges.push(new Range2(pos, pos.getShiftedBy(howMany)));
      }
      pos.offset = offset;
      pos.path.push(0);
    }
    return ranges;
  }
  getWalker(options = {}) {
    options.boundaries = this;
    return new treewalker_default2(options);
  }
  *getItems(options = {}) {
    options.boundaries = this;
    options.ignoreElementEnd = true;
    const treeWalker = new treewalker_default2(options);
    for (const value of treeWalker) {
      yield value.item;
    }
  }
  *getPositions(options = {}) {
    options.boundaries = this;
    const treeWalker = new treewalker_default2(options);
    yield treeWalker.position;
    for (const value of treeWalker) {
      yield value.nextPosition;
    }
  }
  getTransformedByOperation(operation) {
    switch (operation.type) {
      case "insert":
        return this._getTransformedByInsertOperation(operation);
      case "move":
      case "remove":
      case "reinsert":
        return this._getTransformedByMoveOperation(operation);
      case "split":
        return [this._getTransformedBySplitOperation(operation)];
      case "merge":
        return [this._getTransformedByMergeOperation(operation)];
    }
    return [new Range2(this.start, this.end)];
  }
  getTransformedByOperations(operations2) {
    const ranges = [new Range2(this.start, this.end)];
    for (const operation of operations2) {
      for (let i = 0; i < ranges.length; i++) {
        const result = ranges[i].getTransformedByOperation(operation);
        ranges.splice(i, 1, ...result);
        i += result.length - 1;
      }
    }
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      for (let j = i + 1; j < ranges.length; j++) {
        const next = ranges[j];
        if (range.containsRange(next) || next.containsRange(range) || range.isEqual(next)) {
          ranges.splice(j, 1);
        }
      }
    }
    return ranges;
  }
  getCommonAncestor() {
    return this.start.getCommonAncestor(this.end);
  }
  getContainedElement() {
    if (this.isCollapsed) {
      return null;
    }
    const nodeAfterStart = this.start.nodeAfter;
    const nodeBeforeEnd = this.end.nodeBefore;
    if (nodeAfterStart && nodeAfterStart.is("element") && nodeAfterStart === nodeBeforeEnd) {
      return nodeAfterStart;
    }
    return null;
  }
  toJSON() {
    return {
      start: this.start.toJSON(),
      end: this.end.toJSON()
    };
  }
  clone() {
    return new this.constructor(this.start, this.end);
  }
  _getTransformedByInsertOperation(operation, spread = false) {
    return this._getTransformedByInsertion(operation.position, operation.howMany, spread);
  }
  _getTransformedByMoveOperation(operation, spread = false) {
    const sourcePosition = operation.sourcePosition;
    const howMany = operation.howMany;
    const targetPosition = operation.targetPosition;
    return this._getTransformedByMove(sourcePosition, targetPosition, howMany, spread);
  }
  _getTransformedBySplitOperation(operation) {
    const start = this.start._getTransformedBySplitOperation(operation);
    let end = this.end._getTransformedBySplitOperation(operation);
    if (this.end.isEqual(operation.insertionPosition)) {
      end = this.end.getShiftedBy(1);
    }
    if (start.root != end.root) {
      end = this.end.getShiftedBy(-1);
    }
    return new Range2(start, end);
  }
  _getTransformedByMergeOperation(operation) {
    if (this.start.isEqual(operation.targetPosition) && this.end.isEqual(operation.deletionPosition)) {
      return new Range2(this.start);
    }
    let start = this.start._getTransformedByMergeOperation(operation);
    let end = this.end._getTransformedByMergeOperation(operation);
    if (start.root != end.root) {
      end = this.end.getShiftedBy(-1);
    }
    if (start.isAfter(end)) {
      if (operation.sourcePosition.isBefore(operation.targetPosition)) {
        start = position_default2._createAt(end);
        start.offset = 0;
      } else {
        if (!operation.deletionPosition.isEqual(start)) {
          end = operation.deletionPosition;
        }
        start = operation.targetPosition;
      }
      return new Range2(start, end);
    }
    return new Range2(start, end);
  }
  _getTransformedByInsertion(insertPosition, howMany, spread = false) {
    if (spread && this.containsPosition(insertPosition)) {
      return [
        new Range2(this.start, insertPosition),
        new Range2(insertPosition.getShiftedBy(howMany), this.end._getTransformedByInsertion(insertPosition, howMany))
      ];
    } else {
      const range = new Range2(this.start, this.end);
      range.start = range.start._getTransformedByInsertion(insertPosition, howMany);
      range.end = range.end._getTransformedByInsertion(insertPosition, howMany);
      return [range];
    }
  }
  _getTransformedByMove(sourcePosition, targetPosition, howMany, spread = false) {
    if (this.isCollapsed) {
      const newPos = this.start._getTransformedByMove(sourcePosition, targetPosition, howMany);
      return [new Range2(newPos)];
    }
    const moveRange = Range2._createFromPositionAndShift(sourcePosition, howMany);
    const insertPosition = targetPosition._getTransformedByDeletion(sourcePosition, howMany);
    if (this.containsPosition(targetPosition) && !spread) {
      if (moveRange.containsPosition(this.start) || moveRange.containsPosition(this.end)) {
        const start = this.start._getTransformedByMove(sourcePosition, targetPosition, howMany);
        const end = this.end._getTransformedByMove(sourcePosition, targetPosition, howMany);
        return [new Range2(start, end)];
      }
    }
    let result;
    const differenceSet = this.getDifference(moveRange);
    let difference = null;
    const common = this.getIntersection(moveRange);
    if (differenceSet.length == 1) {
      difference = new Range2(differenceSet[0].start._getTransformedByDeletion(sourcePosition, howMany), differenceSet[0].end._getTransformedByDeletion(sourcePosition, howMany));
    } else if (differenceSet.length == 2) {
      difference = new Range2(this.start, this.end._getTransformedByDeletion(sourcePosition, howMany));
    }
    if (difference) {
      result = difference._getTransformedByInsertion(insertPosition, howMany, common !== null || spread);
    } else {
      result = [];
    }
    if (common) {
      const transformedCommon = new Range2(common.start._getCombined(moveRange.start, insertPosition), common.end._getCombined(moveRange.start, insertPosition));
      if (result.length == 2) {
        result.splice(1, 0, transformedCommon);
      } else {
        result.push(transformedCommon);
      }
    }
    return result;
  }
  _getTransformedByDeletion(deletePosition, howMany) {
    let newStart = this.start._getTransformedByDeletion(deletePosition, howMany);
    let newEnd = this.end._getTransformedByDeletion(deletePosition, howMany);
    if (newStart == null && newEnd == null) {
      return null;
    }
    if (newStart == null) {
      newStart = deletePosition;
    }
    if (newEnd == null) {
      newEnd = deletePosition;
    }
    return new Range2(newStart, newEnd);
  }
  static _createFromPositionAndShift(position, shift) {
    const start = position;
    const end = position.getShiftedBy(shift);
    return shift > 0 ? new this(start, end) : new this(end, start);
  }
  static _createIn(element) {
    return new this(position_default2._createAt(element, 0), position_default2._createAt(element, element.maxOffset));
  }
  static _createOn(item) {
    return this._createFromPositionAndShift(position_default2._createBefore(item), item.offsetSize);
  }
  static _createFromRanges(ranges) {
    if (ranges.length === 0) {
      throw new CKEditorError19("range-create-from-ranges-empty-array", null);
    } else if (ranges.length == 1) {
      return ranges[0].clone();
    }
    const ref = ranges[0];
    ranges.sort((a, b) => {
      return a.start.isAfter(b.start) ? 1 : -1;
    });
    const refIndex = ranges.indexOf(ref);
    const result = new this(ref.start, ref.end);
    if (refIndex > 0) {
      for (let i = refIndex - 1; true; i++) {
        if (ranges[i].end.isEqual(result.start)) {
          result.start = position_default2._createAt(ranges[i].start);
        } else {
          break;
        }
      }
    }
    for (let i = refIndex + 1; i < ranges.length; i++) {
      if (ranges[i].start.isEqual(result.end)) {
        result.end = position_default2._createAt(ranges[i].end);
      } else {
        break;
      }
    }
    return result;
  }
  static fromJSON(json, doc) {
    return new this(position_default2.fromJSON(json.start, doc), position_default2.fromJSON(json.end, doc));
  }
};
var range_default2 = Range2;
Range2.prototype.is = function(type) {
  return type === "range" || type === "model:range";
};

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/mapper.js
import {CKEditorError as CKEditorError20, EmitterMixin as EmitterMixin6} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Mapper = class extends EmitterMixin6() {
  constructor() {
    super();
    this._modelToViewMapping = new WeakMap();
    this._viewToModelMapping = new WeakMap();
    this._viewToModelLengthCallbacks = new Map();
    this._markerNameToElements = new Map();
    this._elementToMarkerNames = new Map();
    this._deferredBindingRemovals = new Map();
    this._unboundMarkerNames = new Set();
    this.on("modelToViewPosition", (evt, data) => {
      if (data.viewPosition) {
        return;
      }
      const viewContainer = this._modelToViewMapping.get(data.modelPosition.parent);
      if (!viewContainer) {
        throw new CKEditorError20("mapping-model-position-view-parent-not-found", this, {modelPosition: data.modelPosition});
      }
      data.viewPosition = this.findPositionIn(viewContainer, data.modelPosition.offset);
    }, {priority: "low"});
    this.on("viewToModelPosition", (evt, data) => {
      if (data.modelPosition) {
        return;
      }
      const viewBlock = this.findMappedViewAncestor(data.viewPosition);
      const modelParent = this._viewToModelMapping.get(viewBlock);
      const modelOffset = this._toModelOffset(data.viewPosition.parent, data.viewPosition.offset, viewBlock);
      data.modelPosition = position_default2._createAt(modelParent, modelOffset);
    }, {priority: "low"});
  }
  bindElements(modelElement, viewElement) {
    this._modelToViewMapping.set(modelElement, viewElement);
    this._viewToModelMapping.set(viewElement, modelElement);
  }
  unbindViewElement(viewElement, options = {}) {
    const modelElement = this.toModelElement(viewElement);
    if (this._elementToMarkerNames.has(viewElement)) {
      for (const markerName of this._elementToMarkerNames.get(viewElement)) {
        this._unboundMarkerNames.add(markerName);
      }
    }
    if (options.defer) {
      this._deferredBindingRemovals.set(viewElement, viewElement.root);
    } else {
      this._viewToModelMapping.delete(viewElement);
      if (this._modelToViewMapping.get(modelElement) == viewElement) {
        this._modelToViewMapping.delete(modelElement);
      }
    }
  }
  unbindModelElement(modelElement) {
    const viewElement = this.toViewElement(modelElement);
    this._modelToViewMapping.delete(modelElement);
    if (this._viewToModelMapping.get(viewElement) == modelElement) {
      this._viewToModelMapping.delete(viewElement);
    }
  }
  bindElementToMarker(element, name) {
    const elements = this._markerNameToElements.get(name) || new Set();
    elements.add(element);
    const names = this._elementToMarkerNames.get(element) || new Set();
    names.add(name);
    this._markerNameToElements.set(name, elements);
    this._elementToMarkerNames.set(element, names);
  }
  unbindElementFromMarkerName(element, name) {
    const nameToElements = this._markerNameToElements.get(name);
    if (nameToElements) {
      nameToElements.delete(element);
      if (nameToElements.size == 0) {
        this._markerNameToElements.delete(name);
      }
    }
    const elementToNames = this._elementToMarkerNames.get(element);
    if (elementToNames) {
      elementToNames.delete(name);
      if (elementToNames.size == 0) {
        this._elementToMarkerNames.delete(element);
      }
    }
  }
  flushUnboundMarkerNames() {
    const markerNames = Array.from(this._unboundMarkerNames);
    this._unboundMarkerNames.clear();
    return markerNames;
  }
  flushDeferredBindings() {
    for (const [viewElement, root] of this._deferredBindingRemovals) {
      if (viewElement.root == root) {
        this.unbindViewElement(viewElement);
      }
    }
    this._deferredBindingRemovals = new Map();
  }
  clearBindings() {
    this._modelToViewMapping = new WeakMap();
    this._viewToModelMapping = new WeakMap();
    this._markerNameToElements = new Map();
    this._elementToMarkerNames = new Map();
    this._unboundMarkerNames = new Set();
    this._deferredBindingRemovals = new Map();
  }
  toModelElement(viewElement) {
    return this._viewToModelMapping.get(viewElement);
  }
  toViewElement(modelElement) {
    return this._modelToViewMapping.get(modelElement);
  }
  toModelRange(viewRange) {
    return new range_default2(this.toModelPosition(viewRange.start), this.toModelPosition(viewRange.end));
  }
  toViewRange(modelRange) {
    return new range_default(this.toViewPosition(modelRange.start), this.toViewPosition(modelRange.end));
  }
  toModelPosition(viewPosition) {
    const data = {
      viewPosition,
      mapper: this
    };
    this.fire("viewToModelPosition", data);
    return data.modelPosition;
  }
  toViewPosition(modelPosition, options = {}) {
    const data = {
      modelPosition,
      mapper: this,
      isPhantom: options.isPhantom
    };
    this.fire("modelToViewPosition", data);
    return data.viewPosition;
  }
  markerNameToElements(name) {
    const boundElements = this._markerNameToElements.get(name);
    if (!boundElements) {
      return null;
    }
    const elements = new Set();
    for (const element of boundElements) {
      if (element.is("attributeElement")) {
        for (const clone3 of element.getElementsWithSameId()) {
          elements.add(clone3);
        }
      } else {
        elements.add(element);
      }
    }
    return elements;
  }
  registerViewToModelLength(viewElementName, lengthCallback) {
    this._viewToModelLengthCallbacks.set(viewElementName, lengthCallback);
  }
  findMappedViewAncestor(viewPosition) {
    let parent = viewPosition.parent;
    while (!this._viewToModelMapping.has(parent)) {
      parent = parent.parent;
    }
    return parent;
  }
  _toModelOffset(viewParent, viewOffset, viewBlock) {
    if (viewBlock != viewParent) {
      const offsetToParentStart = this._toModelOffset(viewParent.parent, viewParent.index, viewBlock);
      const offsetInParent = this._toModelOffset(viewParent, viewOffset, viewParent);
      return offsetToParentStart + offsetInParent;
    }
    if (viewParent.is("$text")) {
      return viewOffset;
    }
    let modelOffset = 0;
    for (let i = 0; i < viewOffset; i++) {
      modelOffset += this.getModelLength(viewParent.getChild(i));
    }
    return modelOffset;
  }
  getModelLength(viewNode) {
    if (this._viewToModelLengthCallbacks.get(viewNode.name)) {
      const callback = this._viewToModelLengthCallbacks.get(viewNode.name);
      return callback(viewNode);
    } else if (this._viewToModelMapping.has(viewNode)) {
      return 1;
    } else if (viewNode.is("$text")) {
      return viewNode.data.length;
    } else if (viewNode.is("uiElement")) {
      return 0;
    } else {
      let len = 0;
      for (const child of viewNode.getChildren()) {
        len += this.getModelLength(child);
      }
      return len;
    }
  }
  findPositionIn(viewParent, expectedOffset) {
    let viewNode;
    let lastLength = 0;
    let modelOffset = 0;
    let viewOffset = 0;
    if (viewParent.is("$text")) {
      return new position_default(viewParent, expectedOffset);
    }
    while (modelOffset < expectedOffset) {
      viewNode = viewParent.getChild(viewOffset);
      lastLength = this.getModelLength(viewNode);
      modelOffset += lastLength;
      viewOffset++;
    }
    if (modelOffset == expectedOffset) {
      return this._moveViewPositionToTextNode(new position_default(viewParent, viewOffset));
    } else {
      return this.findPositionIn(viewNode, expectedOffset - (modelOffset - lastLength));
    }
  }
  _moveViewPositionToTextNode(viewPosition) {
    const nodeBefore = viewPosition.nodeBefore;
    const nodeAfter = viewPosition.nodeAfter;
    if (nodeBefore instanceof text_default) {
      return new position_default(nodeBefore, nodeBefore.data.length);
    } else if (nodeAfter instanceof text_default) {
      return new position_default(nodeAfter, 0);
    }
    return viewPosition;
  }
};
var mapper_default = Mapper;

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/modelconsumable.js
import {CKEditorError as CKEditorError21} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ModelConsumable = class {
  constructor() {
    this._consumable = new Map();
    this._textProxyRegistry = new Map();
  }
  add(item, type) {
    type = _normalizeConsumableType(type);
    if (item instanceof textproxy_default2) {
      item = this._getSymbolForTextProxy(item);
    }
    if (!this._consumable.has(item)) {
      this._consumable.set(item, new Map());
    }
    this._consumable.get(item).set(type, true);
  }
  consume(item, type) {
    type = _normalizeConsumableType(type);
    if (item instanceof textproxy_default2) {
      item = this._getSymbolForTextProxy(item);
    }
    if (this.test(item, type)) {
      this._consumable.get(item).set(type, false);
      return true;
    } else {
      return false;
    }
  }
  test(item, type) {
    type = _normalizeConsumableType(type);
    if (item instanceof textproxy_default2) {
      item = this._getSymbolForTextProxy(item);
    }
    const itemConsumables = this._consumable.get(item);
    if (itemConsumables === void 0) {
      return null;
    }
    const value = itemConsumables.get(type);
    if (value === void 0) {
      return null;
    }
    return value;
  }
  revert(item, type) {
    type = _normalizeConsumableType(type);
    if (item instanceof textproxy_default2) {
      item = this._getSymbolForTextProxy(item);
    }
    const test = this.test(item, type);
    if (test === false) {
      this._consumable.get(item).set(type, true);
      return true;
    } else if (test === true) {
      return false;
    }
    return null;
  }
  verifyAllConsumed(eventGroup) {
    const items = [];
    for (const [item, consumables] of this._consumable) {
      for (const [event, canConsume] of consumables) {
        const eventPrefix = event.split(":")[0];
        if (canConsume && eventGroup == eventPrefix) {
          items.push({
            event,
            item: item.name || item.description
          });
        }
      }
    }
    if (items.length) {
      throw new CKEditorError21("conversion-model-consumable-not-consumed", null, {items});
    }
  }
  _getSymbolForTextProxy(textProxy) {
    let symbol = null;
    const startMap = this._textProxyRegistry.get(textProxy.startOffset);
    if (startMap) {
      const endMap = startMap.get(textProxy.endOffset);
      if (endMap) {
        symbol = endMap.get(textProxy.parent);
      }
    }
    if (!symbol) {
      symbol = this._addSymbolForTextProxy(textProxy);
    }
    return symbol;
  }
  _addSymbolForTextProxy(textProxy) {
    const start = textProxy.startOffset;
    const end = textProxy.endOffset;
    const parent = textProxy.parent;
    const symbol = Symbol("$textProxy:" + textProxy.data);
    let startMap;
    let endMap;
    startMap = this._textProxyRegistry.get(start);
    if (!startMap) {
      startMap = new Map();
      this._textProxyRegistry.set(start, startMap);
    }
    endMap = startMap.get(end);
    if (!endMap) {
      endMap = new Map();
      startMap.set(end, endMap);
    }
    endMap.set(parent, symbol);
    return symbol;
  }
};
var modelconsumable_default = ModelConsumable;
function _normalizeConsumableType(type) {
  const parts = type.split(":");
  if (parts[0] == "insert") {
    return parts[0];
  }
  if (parts[0] == "addMarker" || parts[0] == "removeMarker") {
    return type;
  }
  return parts.length > 1 ? parts[0] + ":" + parts[1] : parts[0];
}

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/downcastdispatcher.js
import {EmitterMixin as EmitterMixin7} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DowncastDispatcher = class extends EmitterMixin7() {
  constructor(conversionApi) {
    super();
    this._conversionApi = {dispatcher: this, ...conversionApi};
    this._firedEventsMap = new WeakMap();
  }
  convertChanges(differ, markers, writer) {
    const conversionApi = this._createConversionApi(writer, differ.getRefreshedItems());
    for (const change of differ.getMarkersToRemove()) {
      this._convertMarkerRemove(change.name, change.range, conversionApi);
    }
    const changes = this._reduceChanges(differ.getChanges());
    for (const entry of changes) {
      if (entry.type === "insert") {
        this._convertInsert(range_default2._createFromPositionAndShift(entry.position, entry.length), conversionApi);
      } else if (entry.type === "reinsert") {
        this._convertReinsert(range_default2._createFromPositionAndShift(entry.position, entry.length), conversionApi);
      } else if (entry.type === "remove") {
        this._convertRemove(entry.position, entry.length, entry.name, conversionApi);
      } else {
        this._convertAttribute(entry.range, entry.attributeKey, entry.attributeOldValue, entry.attributeNewValue, conversionApi);
      }
    }
    for (const markerName of conversionApi.mapper.flushUnboundMarkerNames()) {
      const markerRange = markers.get(markerName).getRange();
      this._convertMarkerRemove(markerName, markerRange, conversionApi);
      this._convertMarkerAdd(markerName, markerRange, conversionApi);
    }
    for (const change of differ.getMarkersToAdd()) {
      this._convertMarkerAdd(change.name, change.range, conversionApi);
    }
    conversionApi.mapper.flushDeferredBindings();
    conversionApi.consumable.verifyAllConsumed("insert");
  }
  convert(range, markers, writer, options = {}) {
    const conversionApi = this._createConversionApi(writer, void 0, options);
    this._convertInsert(range, conversionApi);
    for (const [name, range2] of markers) {
      this._convertMarkerAdd(name, range2, conversionApi);
    }
    conversionApi.consumable.verifyAllConsumed("insert");
  }
  convertSelection(selection, markers, writer) {
    const conversionApi = this._createConversionApi(writer);
    this.fire("cleanSelection", {selection}, conversionApi);
    const modelRoot = selection.getFirstPosition().root;
    if (!conversionApi.mapper.toViewElement(modelRoot)) {
      return;
    }
    const markersAtSelection = Array.from(markers.getMarkersAtPosition(selection.getFirstPosition()));
    this._addConsumablesForSelection(conversionApi.consumable, selection, markersAtSelection);
    this.fire("selection", {selection}, conversionApi);
    if (!selection.isCollapsed) {
      return;
    }
    for (const marker of markersAtSelection) {
      if (conversionApi.consumable.test(selection, "addMarker:" + marker.name)) {
        const markerRange = marker.getRange();
        if (!shouldMarkerChangeBeConverted(selection.getFirstPosition(), marker, conversionApi.mapper)) {
          continue;
        }
        const data = {
          item: selection,
          markerName: marker.name,
          markerRange
        };
        this.fire(`addMarker:${marker.name}`, data, conversionApi);
      }
    }
    for (const key of selection.getAttributeKeys()) {
      if (conversionApi.consumable.test(selection, "attribute:" + key)) {
        const data = {
          item: selection,
          range: selection.getFirstRange(),
          attributeKey: key,
          attributeOldValue: null,
          attributeNewValue: selection.getAttribute(key)
        };
        this.fire(`attribute:${key}:$text`, data, conversionApi);
      }
    }
  }
  _convertInsert(range, conversionApi, options = {}) {
    if (!options.doNotAddConsumables) {
      this._addConsumablesForInsert(conversionApi.consumable, Array.from(range));
    }
    for (const data of Array.from(range.getWalker({shallow: true})).map(walkerValueToEventData)) {
      this._testAndFire("insert", data, conversionApi);
    }
  }
  _convertRemove(position, length, name, conversionApi) {
    this.fire(`remove:${name}`, {position, length}, conversionApi);
  }
  _convertAttribute(range, key, oldValue, newValue, conversionApi) {
    this._addConsumablesForRange(conversionApi.consumable, range, `attribute:${key}`);
    for (const value of range) {
      const data = {
        item: value.item,
        range: range_default2._createFromPositionAndShift(value.previousPosition, value.length),
        attributeKey: key,
        attributeOldValue: oldValue,
        attributeNewValue: newValue
      };
      this._testAndFire(`attribute:${key}`, data, conversionApi);
    }
  }
  _convertReinsert(range, conversionApi) {
    const walkerValues = Array.from(range.getWalker({shallow: true}));
    this._addConsumablesForInsert(conversionApi.consumable, walkerValues);
    for (const data of walkerValues.map(walkerValueToEventData)) {
      this._testAndFire("insert", {...data, reconversion: true}, conversionApi);
    }
  }
  _convertMarkerAdd(markerName, markerRange, conversionApi) {
    if (markerRange.root.rootName == "$graveyard") {
      return;
    }
    const eventName = `addMarker:${markerName}`;
    conversionApi.consumable.add(markerRange, eventName);
    this.fire(eventName, {markerName, markerRange}, conversionApi);
    if (!conversionApi.consumable.consume(markerRange, eventName)) {
      return;
    }
    this._addConsumablesForRange(conversionApi.consumable, markerRange, eventName);
    for (const item of markerRange.getItems()) {
      if (!conversionApi.consumable.test(item, eventName)) {
        continue;
      }
      const data = {item, range: range_default2._createOn(item), markerName, markerRange};
      this.fire(eventName, data, conversionApi);
    }
  }
  _convertMarkerRemove(markerName, markerRange, conversionApi) {
    if (markerRange.root.rootName == "$graveyard") {
      return;
    }
    this.fire(`removeMarker:${markerName}`, {markerName, markerRange}, conversionApi);
  }
  _reduceChanges(changes) {
    const data = {changes};
    this.fire("reduceChanges", data);
    return data.changes;
  }
  _addConsumablesForInsert(consumable, walkerValues) {
    for (const value of walkerValues) {
      const item = value.item;
      if (consumable.test(item, "insert") === null) {
        consumable.add(item, "insert");
        for (const key of item.getAttributeKeys()) {
          consumable.add(item, "attribute:" + key);
        }
      }
    }
    return consumable;
  }
  _addConsumablesForRange(consumable, range, type) {
    for (const item of range.getItems()) {
      consumable.add(item, type);
    }
    return consumable;
  }
  _addConsumablesForSelection(consumable, selection, markers) {
    consumable.add(selection, "selection");
    for (const marker of markers) {
      consumable.add(selection, "addMarker:" + marker.name);
    }
    for (const key of selection.getAttributeKeys()) {
      consumable.add(selection, "attribute:" + key);
    }
    return consumable;
  }
  _testAndFire(type, data, conversionApi) {
    const eventName = getEventName(type, data);
    const itemKey = data.item.is("$textProxy") ? conversionApi.consumable._getSymbolForTextProxy(data.item) : data.item;
    const eventsFiredForConversion = this._firedEventsMap.get(conversionApi);
    const eventsFiredForItem = eventsFiredForConversion.get(itemKey);
    if (!eventsFiredForItem) {
      eventsFiredForConversion.set(itemKey, new Set([eventName]));
    } else if (!eventsFiredForItem.has(eventName)) {
      eventsFiredForItem.add(eventName);
    } else {
      return;
    }
    this.fire(eventName, data, conversionApi);
  }
  _testAndFireAddAttributes(item, conversionApi) {
    const data = {
      item,
      range: range_default2._createOn(item)
    };
    for (const key of data.item.getAttributeKeys()) {
      data.attributeKey = key;
      data.attributeOldValue = null;
      data.attributeNewValue = data.item.getAttribute(key);
      this._testAndFire(`attribute:${key}`, data, conversionApi);
    }
  }
  _createConversionApi(writer, refreshedItems = new Set(), options = {}) {
    const conversionApi = {
      ...this._conversionApi,
      consumable: new modelconsumable_default(),
      writer,
      options,
      convertItem: (item) => this._convertInsert(range_default2._createOn(item), conversionApi),
      convertChildren: (element) => this._convertInsert(range_default2._createIn(element), conversionApi, {doNotAddConsumables: true}),
      convertAttributes: (item) => this._testAndFireAddAttributes(item, conversionApi),
      canReuseView: (viewElement) => !refreshedItems.has(conversionApi.mapper.toModelElement(viewElement))
    };
    this._firedEventsMap.set(conversionApi, new Map());
    return conversionApi;
  }
};
var downcastdispatcher_default = DowncastDispatcher;
function shouldMarkerChangeBeConverted(modelPosition, marker, mapper) {
  const range = marker.getRange();
  const ancestors = Array.from(modelPosition.getAncestors());
  ancestors.shift();
  ancestors.reverse();
  const hasCustomHandling = ancestors.some((element) => {
    if (range.containsItem(element)) {
      const viewElement = mapper.toViewElement(element);
      return !!viewElement.getCustomProperty("addHighlight");
    }
  });
  return !hasCustomHandling;
}
function getEventName(type, data) {
  const name = data.item.is("element") ? data.item.name : "$text";
  return `${type}:${name}`;
}
function walkerValueToEventData(value) {
  const item = value.item;
  const itemRange = range_default2._createFromPositionAndShift(value.previousPosition, value.length);
  return {
    item,
    range: itemRange
  };
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/selection.js
import {CKEditorError as CKEditorError22, EmitterMixin as EmitterMixin8, isIterable as isIterable6} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Selection2 = class extends EmitterMixin8(typecheckable_default2) {
  constructor(...args) {
    super();
    this._lastRangeBackward = false;
    this._attrs = new Map();
    this._ranges = [];
    if (args.length) {
      this.setTo(...args);
    }
  }
  get anchor() {
    if (this._ranges.length > 0) {
      const range = this._ranges[this._ranges.length - 1];
      return this._lastRangeBackward ? range.end : range.start;
    }
    return null;
  }
  get focus() {
    if (this._ranges.length > 0) {
      const range = this._ranges[this._ranges.length - 1];
      return this._lastRangeBackward ? range.start : range.end;
    }
    return null;
  }
  get isCollapsed() {
    const length = this._ranges.length;
    if (length === 1) {
      return this._ranges[0].isCollapsed;
    } else {
      return false;
    }
  }
  get rangeCount() {
    return this._ranges.length;
  }
  get isBackward() {
    return !this.isCollapsed && this._lastRangeBackward;
  }
  isEqual(otherSelection) {
    if (this.rangeCount != otherSelection.rangeCount) {
      return false;
    } else if (this.rangeCount === 0) {
      return true;
    }
    if (!this.anchor.isEqual(otherSelection.anchor) || !this.focus.isEqual(otherSelection.focus)) {
      return false;
    }
    for (const thisRange of this._ranges) {
      let found = false;
      for (const otherRange of otherSelection._ranges) {
        if (thisRange.isEqual(otherRange)) {
          found = true;
          break;
        }
      }
      if (!found) {
        return false;
      }
    }
    return true;
  }
  *getRanges() {
    for (const range of this._ranges) {
      yield new range_default2(range.start, range.end);
    }
  }
  getFirstRange() {
    let first4 = null;
    for (const range of this._ranges) {
      if (!first4 || range.start.isBefore(first4.start)) {
        first4 = range;
      }
    }
    return first4 ? new range_default2(first4.start, first4.end) : null;
  }
  getLastRange() {
    let last = null;
    for (const range of this._ranges) {
      if (!last || range.end.isAfter(last.end)) {
        last = range;
      }
    }
    return last ? new range_default2(last.start, last.end) : null;
  }
  getFirstPosition() {
    const first4 = this.getFirstRange();
    return first4 ? first4.start.clone() : null;
  }
  getLastPosition() {
    const lastRange = this.getLastRange();
    return lastRange ? lastRange.end.clone() : null;
  }
  setTo(...args) {
    let [selectable, placeOrOffset, options] = args;
    if (typeof placeOrOffset == "object") {
      options = placeOrOffset;
      placeOrOffset = void 0;
    }
    if (selectable === null) {
      this._setRanges([]);
    } else if (selectable instanceof Selection2) {
      this._setRanges(selectable.getRanges(), selectable.isBackward);
    } else if (selectable && typeof selectable.getRanges == "function") {
      this._setRanges(selectable.getRanges(), selectable.isBackward);
    } else if (selectable instanceof range_default2) {
      this._setRanges([selectable], !!options && !!options.backward);
    } else if (selectable instanceof position_default2) {
      this._setRanges([new range_default2(selectable)]);
    } else if (selectable instanceof node_default2) {
      const backward = !!options && !!options.backward;
      let range;
      if (placeOrOffset == "in") {
        range = range_default2._createIn(selectable);
      } else if (placeOrOffset == "on") {
        range = range_default2._createOn(selectable);
      } else if (placeOrOffset !== void 0) {
        range = new range_default2(position_default2._createAt(selectable, placeOrOffset));
      } else {
        throw new CKEditorError22("model-selection-setto-required-second-parameter", [this, selectable]);
      }
      this._setRanges([range], backward);
    } else if (isIterable6(selectable)) {
      this._setRanges(selectable, options && !!options.backward);
    } else {
      throw new CKEditorError22("model-selection-setto-not-selectable", [this, selectable]);
    }
  }
  _setRanges(newRanges, isLastBackward = false) {
    const ranges = Array.from(newRanges);
    const anyNewRange = ranges.some((newRange) => {
      if (!(newRange instanceof range_default2)) {
        throw new CKEditorError22("model-selection-set-ranges-not-range", [this, newRanges]);
      }
      return this._ranges.every((oldRange) => {
        return !oldRange.isEqual(newRange);
      });
    });
    if (ranges.length === this._ranges.length && !anyNewRange) {
      return;
    }
    this._replaceAllRanges(ranges);
    this._lastRangeBackward = !!isLastBackward;
    this.fire("change:range", {directChange: true});
  }
  setFocus(itemOrPosition, offset) {
    if (this.anchor === null) {
      throw new CKEditorError22("model-selection-setfocus-no-ranges", [this, itemOrPosition]);
    }
    const newFocus = position_default2._createAt(itemOrPosition, offset);
    if (newFocus.compareWith(this.focus) == "same") {
      return;
    }
    const anchor = this.anchor;
    if (this._ranges.length) {
      this._popRange();
    }
    if (newFocus.compareWith(anchor) == "before") {
      this._pushRange(new range_default2(newFocus, anchor));
      this._lastRangeBackward = true;
    } else {
      this._pushRange(new range_default2(anchor, newFocus));
      this._lastRangeBackward = false;
    }
    this.fire("change:range", {directChange: true});
  }
  getAttribute(key) {
    return this._attrs.get(key);
  }
  getAttributes() {
    return this._attrs.entries();
  }
  getAttributeKeys() {
    return this._attrs.keys();
  }
  hasAttribute(key) {
    return this._attrs.has(key);
  }
  removeAttribute(key) {
    if (this.hasAttribute(key)) {
      this._attrs.delete(key);
      this.fire("change:attribute", {attributeKeys: [key], directChange: true});
    }
  }
  setAttribute(key, value) {
    if (this.getAttribute(key) !== value) {
      this._attrs.set(key, value);
      this.fire("change:attribute", {attributeKeys: [key], directChange: true});
    }
  }
  getSelectedElement() {
    if (this.rangeCount !== 1) {
      return null;
    }
    return this.getFirstRange().getContainedElement();
  }
  *getSelectedBlocks() {
    const visited = new WeakSet();
    for (const range of this.getRanges()) {
      const startBlock = getParentBlock(range.start, visited);
      if (isStartBlockSelected(startBlock, range)) {
        yield startBlock;
      }
      for (const value of range.getWalker()) {
        const block = value.item;
        if (value.type == "elementEnd" && isUnvisitedTopBlock(block, visited, range)) {
          yield block;
        }
      }
      const endBlock = getParentBlock(range.end, visited);
      if (isEndBlockSelected(endBlock, range)) {
        yield endBlock;
      }
    }
  }
  containsEntireContent(element = this.anchor.root) {
    const limitStartPosition = position_default2._createAt(element, 0);
    const limitEndPosition = position_default2._createAt(element, "end");
    return limitStartPosition.isTouching(this.getFirstPosition()) && limitEndPosition.isTouching(this.getLastPosition());
  }
  _pushRange(range) {
    this._checkRange(range);
    this._ranges.push(new range_default2(range.start, range.end));
  }
  _checkRange(range) {
    for (let i = 0; i < this._ranges.length; i++) {
      if (range.isIntersecting(this._ranges[i])) {
        throw new CKEditorError22("model-selection-range-intersects", [this, range], {addedRange: range, intersectingRange: this._ranges[i]});
      }
    }
  }
  _replaceAllRanges(ranges) {
    this._removeAllRanges();
    for (const range of ranges) {
      this._pushRange(range);
    }
  }
  _removeAllRanges() {
    while (this._ranges.length > 0) {
      this._popRange();
    }
  }
  _popRange() {
    this._ranges.pop();
  }
};
var selection_default2 = Selection2;
Selection2.prototype.is = function(type) {
  return type === "selection" || type === "model:selection";
};
function isUnvisitedBlock(element, visited) {
  if (visited.has(element)) {
    return false;
  }
  visited.add(element);
  return element.root.document.model.schema.isBlock(element) && !!element.parent;
}
function isUnvisitedTopBlock(element, visited, range) {
  return isUnvisitedBlock(element, visited) && isTopBlockInRange(element, range);
}
function getParentBlock(position, visited) {
  const element = position.parent;
  const schema = element.root.document.model.schema;
  const ancestors = position.parent.getAncestors({parentFirst: true, includeSelf: true});
  let hasParentLimit = false;
  const block = ancestors.find((element2) => {
    if (hasParentLimit) {
      return false;
    }
    hasParentLimit = schema.isLimit(element2);
    return !hasParentLimit && isUnvisitedBlock(element2, visited);
  });
  ancestors.forEach((element2) => visited.add(element2));
  return block;
}
function isTopBlockInRange(block, range) {
  const parentBlock = findAncestorBlock(block);
  if (!parentBlock) {
    return true;
  }
  const isParentInRange = range.containsRange(range_default2._createOn(parentBlock), true);
  return !isParentInRange;
}
function isStartBlockSelected(startBlock, range) {
  if (!startBlock) {
    return false;
  }
  if (range.isCollapsed || startBlock.isEmpty) {
    return true;
  }
  if (range.start.isTouching(position_default2._createAt(startBlock, startBlock.maxOffset))) {
    return false;
  }
  return isTopBlockInRange(startBlock, range);
}
function isEndBlockSelected(endBlock, range) {
  if (!endBlock) {
    return false;
  }
  if (range.isCollapsed || endBlock.isEmpty) {
    return true;
  }
  if (range.end.isTouching(position_default2._createAt(endBlock, 0))) {
    return false;
  }
  return isTopBlockInRange(endBlock, range);
}
function findAncestorBlock(node) {
  const schema = node.root.document.model.schema;
  let parent = node.parent;
  while (parent) {
    if (schema.isBlock(parent)) {
      return parent;
    }
    parent = parent.parent;
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/liverange.js
import {EmitterMixin as EmitterMixin9} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var LiveRange = class extends EmitterMixin9(range_default2) {
  constructor(start, end) {
    super(start, end);
    bindWithDocument.call(this);
  }
  detach() {
    this.stopListening();
  }
  toRange() {
    return new range_default2(this.start, this.end);
  }
  static fromRange(range) {
    return new LiveRange(range.start, range.end);
  }
};
var liverange_default = LiveRange;
LiveRange.prototype.is = function(type) {
  return type === "liveRange" || type === "model:liveRange" || type == "range" || type === "model:range";
};
function bindWithDocument() {
  this.listenTo(this.root.document.model, "applyOperation", (event, args) => {
    const operation = args[0];
    if (!operation.isDocumentOperation) {
      return;
    }
    transform.call(this, operation);
  }, {priority: "low"});
}
function transform(operation) {
  const ranges = this.getTransformedByOperation(operation);
  const result = range_default2._createFromRanges(ranges);
  const boundariesChanged = !result.isEqual(this);
  const contentChanged = doesOperationChangeRangeContent(this, operation);
  let deletionPosition = null;
  if (boundariesChanged) {
    if (result.root.rootName == "$graveyard") {
      if (operation.type == "remove") {
        deletionPosition = operation.sourcePosition;
      } else {
        deletionPosition = operation.deletionPosition;
      }
    }
    const oldRange = this.toRange();
    this.start = result.start;
    this.end = result.end;
    this.fire("change:range", oldRange, {deletionPosition});
  } else if (contentChanged) {
    this.fire("change:content", this.toRange(), {deletionPosition});
  }
}
function doesOperationChangeRangeContent(range, operation) {
  switch (operation.type) {
    case "insert":
      return range.containsPosition(operation.position);
    case "move":
    case "remove":
    case "reinsert":
    case "merge":
      return range.containsPosition(operation.sourcePosition) || range.start.isEqual(operation.sourcePosition) || range.containsPosition(operation.targetPosition);
    case "split":
      return range.containsPosition(operation.splitPosition) || range.containsPosition(operation.insertionPosition);
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/documentselection.js
import {CKEditorError as CKEditorError23, Collection as Collection2, EmitterMixin as EmitterMixin10, toMap as toMap3, uid} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var storePrefix = "selection:";
var DocumentSelection2 = class extends EmitterMixin10(typecheckable_default2) {
  constructor(doc) {
    super();
    this._selection = new LiveSelection(doc);
    this._selection.delegate("change:range").to(this);
    this._selection.delegate("change:attribute").to(this);
    this._selection.delegate("change:marker").to(this);
  }
  get isCollapsed() {
    return this._selection.isCollapsed;
  }
  get anchor() {
    return this._selection.anchor;
  }
  get focus() {
    return this._selection.focus;
  }
  get rangeCount() {
    return this._selection.rangeCount;
  }
  get hasOwnRange() {
    return this._selection.hasOwnRange;
  }
  get isBackward() {
    return this._selection.isBackward;
  }
  get isGravityOverridden() {
    return this._selection.isGravityOverridden;
  }
  get markers() {
    return this._selection.markers;
  }
  get _ranges() {
    return this._selection._ranges;
  }
  getRanges() {
    return this._selection.getRanges();
  }
  getFirstPosition() {
    return this._selection.getFirstPosition();
  }
  getLastPosition() {
    return this._selection.getLastPosition();
  }
  getFirstRange() {
    return this._selection.getFirstRange();
  }
  getLastRange() {
    return this._selection.getLastRange();
  }
  getSelectedBlocks() {
    return this._selection.getSelectedBlocks();
  }
  getSelectedElement() {
    return this._selection.getSelectedElement();
  }
  containsEntireContent(element) {
    return this._selection.containsEntireContent(element);
  }
  destroy() {
    this._selection.destroy();
  }
  getAttributeKeys() {
    return this._selection.getAttributeKeys();
  }
  getAttributes() {
    return this._selection.getAttributes();
  }
  getAttribute(key) {
    return this._selection.getAttribute(key);
  }
  hasAttribute(key) {
    return this._selection.hasAttribute(key);
  }
  refresh() {
    this._selection.updateMarkers();
    this._selection._updateAttributes(false);
  }
  observeMarkers(prefixOrName) {
    this._selection.observeMarkers(prefixOrName);
  }
  _setFocus(itemOrPosition, offset) {
    this._selection.setFocus(itemOrPosition, offset);
  }
  _setTo(...args) {
    this._selection.setTo(...args);
  }
  _setAttribute(key, value) {
    this._selection.setAttribute(key, value);
  }
  _removeAttribute(key) {
    this._selection.removeAttribute(key);
  }
  _getStoredAttributes() {
    return this._selection.getStoredAttributes();
  }
  _overrideGravity() {
    return this._selection.overrideGravity();
  }
  _restoreGravity(uid2) {
    this._selection.restoreGravity(uid2);
  }
  static _getStoreAttributeKey(key) {
    return storePrefix + key;
  }
  static _isStoreAttributeKey(key) {
    return key.startsWith(storePrefix);
  }
};
var documentselection_default2 = DocumentSelection2;
DocumentSelection2.prototype.is = function(type) {
  return type === "selection" || type == "model:selection" || type == "documentSelection" || type == "model:documentSelection";
};
var LiveSelection = class extends selection_default2 {
  constructor(doc) {
    super();
    this.markers = new Collection2({idProperty: "name"});
    this._attributePriority = new Map();
    this._selectionRestorePosition = null;
    this._hasChangedRange = false;
    this._overriddenGravityRegister = new Set();
    this._observedMarkers = new Set();
    this._model = doc.model;
    this._document = doc;
    this.listenTo(this._model, "applyOperation", (evt, args) => {
      const operation = args[0];
      if (!operation.isDocumentOperation || operation.type == "marker" || operation.type == "rename" || operation.type == "noop") {
        return;
      }
      if (this._ranges.length == 0 && this._selectionRestorePosition) {
        this._fixGraveyardSelection(this._selectionRestorePosition);
      }
      this._selectionRestorePosition = null;
      if (this._hasChangedRange) {
        this._hasChangedRange = false;
        this.fire("change:range", {directChange: false});
      }
    }, {priority: "lowest"});
    this.on("change:range", () => {
      this._validateSelectionRanges(this.getRanges());
    });
    this.listenTo(this._model.markers, "update", (evt, marker, oldRange, newRange) => {
      this._updateMarker(marker, newRange);
    });
    this.listenTo(this._document, "change", (evt, batch) => {
      clearAttributesStoredInElement(this._model, batch);
    });
  }
  get isCollapsed() {
    const length = this._ranges.length;
    return length === 0 ? this._document._getDefaultRange().isCollapsed : super.isCollapsed;
  }
  get anchor() {
    return super.anchor || this._document._getDefaultRange().start;
  }
  get focus() {
    return super.focus || this._document._getDefaultRange().end;
  }
  get rangeCount() {
    return this._ranges.length ? this._ranges.length : 1;
  }
  get hasOwnRange() {
    return this._ranges.length > 0;
  }
  get isGravityOverridden() {
    return !!this._overriddenGravityRegister.size;
  }
  destroy() {
    for (let i = 0; i < this._ranges.length; i++) {
      this._ranges[i].detach();
    }
    this.stopListening();
  }
  *getRanges() {
    if (this._ranges.length) {
      yield* super.getRanges();
    } else {
      yield this._document._getDefaultRange();
    }
  }
  getFirstRange() {
    return super.getFirstRange() || this._document._getDefaultRange();
  }
  getLastRange() {
    return super.getLastRange() || this._document._getDefaultRange();
  }
  setTo(...args) {
    super.setTo(...args);
    this._updateAttributes(true);
    this.updateMarkers();
  }
  setFocus(itemOrPosition, offset) {
    super.setFocus(itemOrPosition, offset);
    this._updateAttributes(true);
    this.updateMarkers();
  }
  setAttribute(key, value) {
    if (this._setAttribute(key, value)) {
      const attributeKeys = [key];
      this.fire("change:attribute", {attributeKeys, directChange: true});
    }
  }
  removeAttribute(key) {
    if (this._removeAttribute(key)) {
      const attributeKeys = [key];
      this.fire("change:attribute", {attributeKeys, directChange: true});
    }
  }
  overrideGravity() {
    const overrideUid = uid();
    this._overriddenGravityRegister.add(overrideUid);
    if (this._overriddenGravityRegister.size === 1) {
      this._updateAttributes(true);
    }
    return overrideUid;
  }
  restoreGravity(uid2) {
    if (!this._overriddenGravityRegister.has(uid2)) {
      throw new CKEditorError23("document-selection-gravity-wrong-restore", this, {uid: uid2});
    }
    this._overriddenGravityRegister.delete(uid2);
    if (!this.isGravityOverridden) {
      this._updateAttributes(true);
    }
  }
  observeMarkers(prefixOrName) {
    this._observedMarkers.add(prefixOrName);
    this.updateMarkers();
  }
  _replaceAllRanges(ranges) {
    this._validateSelectionRanges(ranges);
    super._replaceAllRanges(ranges);
  }
  _popRange() {
    this._ranges.pop().detach();
  }
  _pushRange(range) {
    const liveRange = this._prepareRange(range);
    if (liveRange) {
      this._ranges.push(liveRange);
    }
  }
  _validateSelectionRanges(ranges) {
    for (const range of ranges) {
      if (!this._document._validateSelectionRange(range)) {
        throw new CKEditorError23("document-selection-wrong-position", this, {range});
      }
    }
  }
  _prepareRange(range) {
    this._checkRange(range);
    if (range.root == this._document.graveyard) {
      return;
    }
    const liveRange = liverange_default.fromRange(range);
    liveRange.on("change:range", (evt, oldRange, data) => {
      this._hasChangedRange = true;
      if (liveRange.root == this._document.graveyard) {
        this._selectionRestorePosition = data.deletionPosition;
        const index = this._ranges.indexOf(liveRange);
        this._ranges.splice(index, 1);
        liveRange.detach();
      }
    });
    return liveRange;
  }
  updateMarkers() {
    if (!this._observedMarkers.size) {
      return;
    }
    const markers = [];
    let changed = false;
    for (const marker of this._model.markers) {
      const markerGroup = marker.name.split(":", 1)[0];
      if (!this._observedMarkers.has(markerGroup)) {
        continue;
      }
      const markerRange = marker.getRange();
      for (const selectionRange of this.getRanges()) {
        if (markerRange.containsRange(selectionRange, !selectionRange.isCollapsed)) {
          markers.push(marker);
        }
      }
    }
    const oldMarkers = Array.from(this.markers);
    for (const marker of markers) {
      if (!this.markers.has(marker)) {
        this.markers.add(marker);
        changed = true;
      }
    }
    for (const marker of Array.from(this.markers)) {
      if (!markers.includes(marker)) {
        this.markers.remove(marker);
        changed = true;
      }
    }
    if (changed) {
      this.fire("change:marker", {oldMarkers, directChange: false});
    }
  }
  _updateMarker(marker, markerRange) {
    const markerGroup = marker.name.split(":", 1)[0];
    if (!this._observedMarkers.has(markerGroup)) {
      return;
    }
    let changed = false;
    const oldMarkers = Array.from(this.markers);
    const hasMarker = this.markers.has(marker);
    if (!markerRange) {
      if (hasMarker) {
        this.markers.remove(marker);
        changed = true;
      }
    } else {
      let contained = false;
      for (const selectionRange of this.getRanges()) {
        if (markerRange.containsRange(selectionRange, !selectionRange.isCollapsed)) {
          contained = true;
          break;
        }
      }
      if (contained && !hasMarker) {
        this.markers.add(marker);
        changed = true;
      } else if (!contained && hasMarker) {
        this.markers.remove(marker);
        changed = true;
      }
    }
    if (changed) {
      this.fire("change:marker", {oldMarkers, directChange: false});
    }
  }
  _updateAttributes(clearAll) {
    const newAttributes = toMap3(this._getSurroundingAttributes());
    const oldAttributes = toMap3(this.getAttributes());
    if (clearAll) {
      this._attributePriority = new Map();
      this._attrs = new Map();
    } else {
      for (const [key, priority] of this._attributePriority) {
        if (priority == "low") {
          this._attrs.delete(key);
          this._attributePriority.delete(key);
        }
      }
    }
    this._setAttributesTo(newAttributes);
    const changed = [];
    for (const [newKey, newValue] of this.getAttributes()) {
      if (!oldAttributes.has(newKey) || oldAttributes.get(newKey) !== newValue) {
        changed.push(newKey);
      }
    }
    for (const [oldKey] of oldAttributes) {
      if (!this.hasAttribute(oldKey)) {
        changed.push(oldKey);
      }
    }
    if (changed.length > 0) {
      this.fire("change:attribute", {attributeKeys: changed, directChange: false});
    }
  }
  _setAttribute(key, value, directChange = true) {
    const priority = directChange ? "normal" : "low";
    if (priority == "low" && this._attributePriority.get(key) == "normal") {
      return false;
    }
    const oldValue = super.getAttribute(key);
    if (oldValue === value) {
      return false;
    }
    this._attrs.set(key, value);
    this._attributePriority.set(key, priority);
    return true;
  }
  _removeAttribute(key, directChange = true) {
    const priority = directChange ? "normal" : "low";
    if (priority == "low" && this._attributePriority.get(key) == "normal") {
      return false;
    }
    this._attributePriority.set(key, priority);
    if (!super.hasAttribute(key)) {
      return false;
    }
    this._attrs.delete(key);
    return true;
  }
  _setAttributesTo(attrs) {
    const changed = new Set();
    for (const [oldKey, oldValue] of this.getAttributes()) {
      if (attrs.get(oldKey) === oldValue) {
        continue;
      }
      this._removeAttribute(oldKey, false);
    }
    for (const [key, value] of attrs) {
      const gotAdded = this._setAttribute(key, value, false);
      if (gotAdded) {
        changed.add(key);
      }
    }
    return changed;
  }
  *getStoredAttributes() {
    const selectionParent = this.getFirstPosition().parent;
    if (this.isCollapsed && selectionParent.isEmpty) {
      for (const key of selectionParent.getAttributeKeys()) {
        if (key.startsWith(storePrefix)) {
          const realKey = key.substr(storePrefix.length);
          yield [realKey, selectionParent.getAttribute(key)];
        }
      }
    }
  }
  _getSurroundingAttributes() {
    const position = this.getFirstPosition();
    const schema = this._model.schema;
    if (position.root.rootName == "$graveyard") {
      return null;
    }
    let attrs = null;
    if (!this.isCollapsed) {
      const range = this.getFirstRange();
      for (const value of range) {
        if (value.item.is("element") && schema.isObject(value.item)) {
          attrs = getTextAttributes(value.item, schema);
          break;
        }
        if (value.type == "text") {
          attrs = value.item.getAttributes();
          break;
        }
      }
    } else {
      const nodeBefore = position.textNode ? position.textNode : position.nodeBefore;
      const nodeAfter = position.textNode ? position.textNode : position.nodeAfter;
      if (!this.isGravityOverridden) {
        attrs = getTextAttributes(nodeBefore, schema);
      }
      if (!attrs) {
        attrs = getTextAttributes(nodeAfter, schema);
      }
      if (!this.isGravityOverridden && !attrs) {
        let node = nodeBefore;
        while (node && !attrs) {
          node = node.previousSibling;
          attrs = getTextAttributes(node, schema);
        }
      }
      if (!attrs) {
        let node = nodeAfter;
        while (node && !attrs) {
          node = node.nextSibling;
          attrs = getTextAttributes(node, schema);
        }
      }
      if (!attrs) {
        attrs = this.getStoredAttributes();
      }
    }
    return attrs;
  }
  _fixGraveyardSelection(deletionPosition) {
    const selectionRange = this._model.schema.getNearestSelectionRange(deletionPosition);
    if (selectionRange) {
      this._pushRange(selectionRange);
    }
  }
};
function getTextAttributes(node, schema) {
  if (!node) {
    return null;
  }
  if (node instanceof textproxy_default2 || node instanceof text_default2) {
    return node.getAttributes();
  }
  if (!schema.isInline(node)) {
    return null;
  }
  if (!schema.isObject(node)) {
    return [];
  }
  const attributes = [];
  for (const [key, value] of node.getAttributes()) {
    if (schema.checkAttribute("$text", key) && schema.getAttributeProperties(key).copyFromObject !== false) {
      attributes.push([key, value]);
    }
  }
  return attributes;
}
function clearAttributesStoredInElement(model, batch) {
  const differ = model.document.differ;
  for (const entry of differ.getChanges()) {
    if (entry.type != "insert") {
      continue;
    }
    const changeParent = entry.position.parent;
    const isNoLongerEmpty = entry.length === changeParent.maxOffset;
    if (isNoLongerEmpty) {
      model.enqueueChange(batch, (writer) => {
        const storedAttributes = Array.from(changeParent.getAttributeKeys()).filter((key) => key.startsWith(storePrefix));
        for (const key of storedAttributes) {
          writer.removeAttribute(key, changeParent);
        }
      });
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/conversionhelpers.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ConversionHelpers = class {
  constructor(dispatchers) {
    this._dispatchers = dispatchers;
  }
  add(conversionHelper) {
    for (const dispatcher of this._dispatchers) {
      conversionHelper(dispatcher);
    }
    return this;
  }
};
var conversionhelpers_default = ConversionHelpers;

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/downcasthelpers.js
import {CKEditorError as CKEditorError24, toArray as toArray3} from "es-ckeditor-lib/lib/utils";
import {cloneDeep as cloneDeep2} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DowncastHelpers = class extends conversionhelpers_default {
  elementToElement(config) {
    return this.add(downcastElementToElement(config));
  }
  elementToStructure(config) {
    return this.add(downcastElementToStructure(config));
  }
  attributeToElement(config) {
    return this.add(downcastAttributeToElement(config));
  }
  attributeToAttribute(config) {
    return this.add(downcastAttributeToAttribute(config));
  }
  markerToElement(config) {
    return this.add(downcastMarkerToElement(config));
  }
  markerToHighlight(config) {
    return this.add(downcastMarkerToHighlight(config));
  }
  markerToData(config) {
    return this.add(downcastMarkerToData(config));
  }
};
var downcasthelpers_default = DowncastHelpers;
function insertText() {
  return (evt, data, conversionApi) => {
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return;
    }
    const viewWriter = conversionApi.writer;
    const viewPosition = conversionApi.mapper.toViewPosition(data.range.start);
    const viewText = viewWriter.createText(data.item.data);
    viewWriter.insert(viewPosition, viewText);
  };
}
function insertAttributesAndChildren() {
  return (evt, data, conversionApi) => {
    conversionApi.convertAttributes(data.item);
    if (!data.reconversion && data.item.is("element") && !data.item.isEmpty) {
      conversionApi.convertChildren(data.item);
    }
  };
}
function remove2() {
  return (evt, data, conversionApi) => {
    const viewStart = conversionApi.mapper.toViewPosition(data.position);
    const modelEnd = data.position.getShiftedBy(data.length);
    const viewEnd = conversionApi.mapper.toViewPosition(modelEnd, {isPhantom: true});
    const viewRange = conversionApi.writer.createRange(viewStart, viewEnd);
    const removed = conversionApi.writer.remove(viewRange.getTrimmed());
    for (const child of conversionApi.writer.createRangeIn(removed).getItems()) {
      conversionApi.mapper.unbindViewElement(child, {defer: true});
    }
  };
}
function createViewElementFromHighlightDescriptor(writer, descriptor) {
  const viewElement = writer.createAttributeElement("span", descriptor.attributes);
  if (descriptor.classes) {
    viewElement._addClass(descriptor.classes);
  }
  if (typeof descriptor.priority === "number") {
    viewElement._priority = descriptor.priority;
  }
  viewElement._id = descriptor.id;
  return viewElement;
}
function convertRangeSelection() {
  return (evt, data, conversionApi) => {
    const selection = data.selection;
    if (selection.isCollapsed) {
      return;
    }
    if (!conversionApi.consumable.consume(selection, "selection")) {
      return;
    }
    const viewRanges = [];
    for (const range of selection.getRanges()) {
      viewRanges.push(conversionApi.mapper.toViewRange(range));
    }
    conversionApi.writer.setSelection(viewRanges, {backward: selection.isBackward});
  };
}
function convertCollapsedSelection() {
  return (evt, data, conversionApi) => {
    const selection = data.selection;
    if (!selection.isCollapsed) {
      return;
    }
    if (!conversionApi.consumable.consume(selection, "selection")) {
      return;
    }
    const viewWriter = conversionApi.writer;
    const modelPosition = selection.getFirstPosition();
    const viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
    const brokenPosition = viewWriter.breakAttributes(viewPosition);
    viewWriter.setSelection(brokenPosition);
  };
}
function cleanSelection() {
  return (evt, data, conversionApi) => {
    const viewWriter = conversionApi.writer;
    const viewSelection = viewWriter.document.selection;
    for (const range of viewSelection.getRanges()) {
      if (range.isCollapsed) {
        if (range.end.parent.isAttached()) {
          conversionApi.writer.mergeAttributes(range.start);
        }
      }
    }
    viewWriter.setSelection(null);
  };
}
function wrap(elementCreator) {
  return (evt, data, conversionApi) => {
    if (!conversionApi.consumable.test(data.item, evt.name)) {
      return;
    }
    const oldViewElement = elementCreator(data.attributeOldValue, conversionApi, data);
    const newViewElement = elementCreator(data.attributeNewValue, conversionApi, data);
    if (!oldViewElement && !newViewElement) {
      return;
    }
    conversionApi.consumable.consume(data.item, evt.name);
    const viewWriter = conversionApi.writer;
    const viewSelection = viewWriter.document.selection;
    if (data.item instanceof selection_default2 || data.item instanceof documentselection_default2) {
      viewWriter.wrap(viewSelection.getFirstRange(), newViewElement);
    } else {
      let viewRange = conversionApi.mapper.toViewRange(data.range);
      if (data.attributeOldValue !== null && oldViewElement) {
        viewRange = viewWriter.unwrap(viewRange, oldViewElement);
      }
      if (data.attributeNewValue !== null && newViewElement) {
        viewWriter.wrap(viewRange, newViewElement);
      }
    }
  };
}
function insertElement(elementCreator, consumer = defaultConsumer) {
  return (evt, data, conversionApi) => {
    if (!consumer(data.item, conversionApi.consumable, {preflight: true})) {
      return;
    }
    const viewElement = elementCreator(data.item, conversionApi, data);
    if (!viewElement) {
      return;
    }
    consumer(data.item, conversionApi.consumable);
    const viewPosition = conversionApi.mapper.toViewPosition(data.range.start);
    conversionApi.mapper.bindElements(data.item, viewElement);
    conversionApi.writer.insert(viewPosition, viewElement);
    conversionApi.convertAttributes(data.item);
    reinsertOrConvertNodes(viewElement, data.item.getChildren(), conversionApi, {reconversion: data.reconversion});
  };
}
function insertStructure(elementCreator, consumer) {
  return (evt, data, conversionApi) => {
    if (!consumer(data.item, conversionApi.consumable, {preflight: true})) {
      return;
    }
    const slotsMap = new Map();
    conversionApi.writer._registerSlotFactory(createSlotFactory(data.item, slotsMap, conversionApi));
    const viewElement = elementCreator(data.item, conversionApi, data);
    conversionApi.writer._clearSlotFactory();
    if (!viewElement) {
      return;
    }
    validateSlotsChildren(data.item, slotsMap, conversionApi);
    consumer(data.item, conversionApi.consumable);
    const viewPosition = conversionApi.mapper.toViewPosition(data.range.start);
    conversionApi.mapper.bindElements(data.item, viewElement);
    conversionApi.writer.insert(viewPosition, viewElement);
    conversionApi.convertAttributes(data.item);
    fillSlots(viewElement, slotsMap, conversionApi, {reconversion: data.reconversion});
  };
}
function insertUIElement(elementCreator) {
  return (evt, data, conversionApi) => {
    data.isOpening = true;
    const viewStartElement = elementCreator(data, conversionApi);
    data.isOpening = false;
    const viewEndElement = elementCreator(data, conversionApi);
    if (!viewStartElement || !viewEndElement) {
      return;
    }
    const markerRange = data.markerRange;
    if (markerRange.isCollapsed && !conversionApi.consumable.consume(markerRange, evt.name)) {
      return;
    }
    for (const value of markerRange) {
      if (!conversionApi.consumable.consume(value.item, evt.name)) {
        return;
      }
    }
    const mapper = conversionApi.mapper;
    const viewWriter = conversionApi.writer;
    viewWriter.insert(mapper.toViewPosition(markerRange.start), viewStartElement);
    conversionApi.mapper.bindElementToMarker(viewStartElement, data.markerName);
    if (!markerRange.isCollapsed) {
      viewWriter.insert(mapper.toViewPosition(markerRange.end), viewEndElement);
      conversionApi.mapper.bindElementToMarker(viewEndElement, data.markerName);
    }
    evt.stop();
  };
}
function removeUIElement() {
  return (evt, data, conversionApi) => {
    const elements = conversionApi.mapper.markerNameToElements(data.markerName);
    if (!elements) {
      return;
    }
    for (const element of elements) {
      conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
      conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);
    }
    conversionApi.writer.clearClonedElementsGroup(data.markerName);
    evt.stop();
  };
}
function insertMarkerData(viewCreator) {
  return (evt, data, conversionApi) => {
    const viewMarkerData = viewCreator(data.markerName, conversionApi);
    if (!viewMarkerData) {
      return;
    }
    const markerRange = data.markerRange;
    if (!conversionApi.consumable.consume(markerRange, evt.name)) {
      return;
    }
    handleMarkerBoundary(markerRange, false, conversionApi, data, viewMarkerData);
    handleMarkerBoundary(markerRange, true, conversionApi, data, viewMarkerData);
    evt.stop();
  };
}
function handleMarkerBoundary(range, isStart, conversionApi, data, viewMarkerData) {
  const modelPosition = isStart ? range.start : range.end;
  const elementAfter = modelPosition.nodeAfter && modelPosition.nodeAfter.is("element") ? modelPosition.nodeAfter : null;
  const elementBefore = modelPosition.nodeBefore && modelPosition.nodeBefore.is("element") ? modelPosition.nodeBefore : null;
  if (elementAfter || elementBefore) {
    let modelElement;
    let isBefore;
    if (isStart && elementAfter || !isStart && !elementBefore) {
      modelElement = elementAfter;
      isBefore = true;
    } else {
      modelElement = elementBefore;
      isBefore = false;
    }
    const viewElement = conversionApi.mapper.toViewElement(modelElement);
    if (viewElement) {
      insertMarkerAsAttribute(viewElement, isStart, isBefore, conversionApi, data, viewMarkerData);
      return;
    }
  }
  const viewPosition = conversionApi.mapper.toViewPosition(modelPosition);
  insertMarkerAsElement(viewPosition, isStart, conversionApi, data, viewMarkerData);
}
function insertMarkerAsAttribute(viewElement, isStart, isBefore, conversionApi, data, viewMarkerData) {
  const attributeName = `data-${viewMarkerData.group}-${isStart ? "start" : "end"}-${isBefore ? "before" : "after"}`;
  const markerNames = viewElement.hasAttribute(attributeName) ? viewElement.getAttribute(attributeName).split(",") : [];
  markerNames.unshift(viewMarkerData.name);
  conversionApi.writer.setAttribute(attributeName, markerNames.join(","), viewElement);
  conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
}
function insertMarkerAsElement(position, isStart, conversionApi, data, viewMarkerData) {
  const viewElementName = `${viewMarkerData.group}-${isStart ? "start" : "end"}`;
  const attrs = viewMarkerData.name ? {name: viewMarkerData.name} : null;
  const viewElement = conversionApi.writer.createUIElement(viewElementName, attrs);
  conversionApi.writer.insert(position, viewElement);
  conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
}
function removeMarkerData(viewCreator) {
  return (evt, data, conversionApi) => {
    const viewData = viewCreator(data.markerName, conversionApi);
    if (!viewData) {
      return;
    }
    const elements = conversionApi.mapper.markerNameToElements(data.markerName);
    if (!elements) {
      return;
    }
    for (const element of elements) {
      conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
      if (element.is("containerElement")) {
        removeMarkerFromAttribute(`data-${viewData.group}-start-before`, element);
        removeMarkerFromAttribute(`data-${viewData.group}-start-after`, element);
        removeMarkerFromAttribute(`data-${viewData.group}-end-before`, element);
        removeMarkerFromAttribute(`data-${viewData.group}-end-after`, element);
      } else {
        conversionApi.writer.clear(conversionApi.writer.createRangeOn(element), element);
      }
    }
    conversionApi.writer.clearClonedElementsGroup(data.markerName);
    evt.stop();
    function removeMarkerFromAttribute(attributeName, element) {
      if (element.hasAttribute(attributeName)) {
        const markerNames = new Set(element.getAttribute(attributeName).split(","));
        markerNames.delete(viewData.name);
        if (markerNames.size == 0) {
          conversionApi.writer.removeAttribute(attributeName, element);
        } else {
          conversionApi.writer.setAttribute(attributeName, Array.from(markerNames).join(","), element);
        }
      }
    }
  };
}
function changeAttribute(attributeCreator) {
  return (evt, data, conversionApi) => {
    if (!conversionApi.consumable.test(data.item, evt.name)) {
      return;
    }
    const oldAttribute = attributeCreator(data.attributeOldValue, conversionApi, data);
    const newAttribute = attributeCreator(data.attributeNewValue, conversionApi, data);
    if (!oldAttribute && !newAttribute) {
      return;
    }
    conversionApi.consumable.consume(data.item, evt.name);
    const viewElement = conversionApi.mapper.toViewElement(data.item);
    const viewWriter = conversionApi.writer;
    if (!viewElement) {
      throw new CKEditorError24("conversion-attribute-to-attribute-on-text", conversionApi.dispatcher, data);
    }
    if (data.attributeOldValue !== null && oldAttribute) {
      if (oldAttribute.key == "class") {
        const classes = toArray3(oldAttribute.value);
        for (const className of classes) {
          viewWriter.removeClass(className, viewElement);
        }
      } else if (oldAttribute.key == "style") {
        const keys = Object.keys(oldAttribute.value);
        for (const key of keys) {
          viewWriter.removeStyle(key, viewElement);
        }
      } else {
        viewWriter.removeAttribute(oldAttribute.key, viewElement);
      }
    }
    if (data.attributeNewValue !== null && newAttribute) {
      if (newAttribute.key == "class") {
        const classes = toArray3(newAttribute.value);
        for (const className of classes) {
          viewWriter.addClass(className, viewElement);
        }
      } else if (newAttribute.key == "style") {
        const keys = Object.keys(newAttribute.value);
        for (const key of keys) {
          viewWriter.setStyle(key, newAttribute.value[key], viewElement);
        }
      } else {
        viewWriter.setAttribute(newAttribute.key, newAttribute.value, viewElement);
      }
    }
  };
}
function highlightText(highlightDescriptor) {
  return (evt, data, conversionApi) => {
    if (!data.item) {
      return;
    }
    if (!(data.item instanceof selection_default2 || data.item instanceof documentselection_default2) && !data.item.is("$textProxy")) {
      return;
    }
    const descriptor = prepareDescriptor(highlightDescriptor, data, conversionApi);
    if (!descriptor) {
      return;
    }
    if (!conversionApi.consumable.consume(data.item, evt.name)) {
      return;
    }
    const viewWriter = conversionApi.writer;
    const viewElement = createViewElementFromHighlightDescriptor(viewWriter, descriptor);
    const viewSelection = viewWriter.document.selection;
    if (data.item instanceof selection_default2 || data.item instanceof documentselection_default2) {
      viewWriter.wrap(viewSelection.getFirstRange(), viewElement);
    } else {
      const viewRange = conversionApi.mapper.toViewRange(data.range);
      const rangeAfterWrap = viewWriter.wrap(viewRange, viewElement);
      for (const element of rangeAfterWrap.getItems()) {
        if (element.is("attributeElement") && element.isSimilar(viewElement)) {
          conversionApi.mapper.bindElementToMarker(element, data.markerName);
          break;
        }
      }
    }
  };
}
function highlightElement(highlightDescriptor) {
  return (evt, data, conversionApi) => {
    if (!data.item) {
      return;
    }
    if (!(data.item instanceof element_default2)) {
      return;
    }
    const descriptor = prepareDescriptor(highlightDescriptor, data, conversionApi);
    if (!descriptor) {
      return;
    }
    if (!conversionApi.consumable.test(data.item, evt.name)) {
      return;
    }
    const viewElement = conversionApi.mapper.toViewElement(data.item);
    if (viewElement && viewElement.getCustomProperty("addHighlight")) {
      conversionApi.consumable.consume(data.item, evt.name);
      for (const value of range_default2._createIn(data.item)) {
        conversionApi.consumable.consume(value.item, evt.name);
      }
      const addHighlightCallback = viewElement.getCustomProperty("addHighlight");
      addHighlightCallback(viewElement, descriptor, conversionApi.writer);
      conversionApi.mapper.bindElementToMarker(viewElement, data.markerName);
    }
  };
}
function removeHighlight(highlightDescriptor) {
  return (evt, data, conversionApi) => {
    if (data.markerRange.isCollapsed) {
      return;
    }
    const descriptor = prepareDescriptor(highlightDescriptor, data, conversionApi);
    if (!descriptor) {
      return;
    }
    const viewHighlightElement = createViewElementFromHighlightDescriptor(conversionApi.writer, descriptor);
    const elements = conversionApi.mapper.markerNameToElements(data.markerName);
    if (!elements) {
      return;
    }
    for (const element of elements) {
      conversionApi.mapper.unbindElementFromMarkerName(element, data.markerName);
      if (element.is("attributeElement")) {
        conversionApi.writer.unwrap(conversionApi.writer.createRangeOn(element), viewHighlightElement);
      } else {
        const removeHighlightCallback = element.getCustomProperty("removeHighlight");
        removeHighlightCallback(element, descriptor.id, conversionApi.writer);
      }
    }
    conversionApi.writer.clearClonedElementsGroup(data.markerName);
    evt.stop();
  };
}
function downcastElementToElement(config) {
  const model = normalizeModelElementConfig(config.model);
  const view = normalizeToElementConfig(config.view, "container");
  if (model.attributes.length) {
    model.children = true;
  }
  return (dispatcher) => {
    dispatcher.on(`insert:${model.name}`, insertElement(view, createConsumer(model)), {priority: config.converterPriority || "normal"});
    if (model.children || model.attributes.length) {
      dispatcher.on("reduceChanges", createChangeReducer(model), {priority: "low"});
    }
  };
}
function downcastElementToStructure(config) {
  const model = normalizeModelElementConfig(config.model);
  const view = normalizeToElementConfig(config.view, "container");
  model.children = true;
  return (dispatcher) => {
    if (dispatcher._conversionApi.schema.checkChild(model.name, "$text")) {
      throw new CKEditorError24("conversion-element-to-structure-disallowed-text", dispatcher, {elementName: model.name});
    }
    dispatcher.on(`insert:${model.name}`, insertStructure(view, createConsumer(model)), {priority: config.converterPriority || "normal"});
    dispatcher.on("reduceChanges", createChangeReducer(model), {priority: "low"});
  };
}
function downcastAttributeToElement(config) {
  config = cloneDeep2(config);
  let model = config.model;
  if (typeof model == "string") {
    model = {key: model};
  }
  let eventName = `attribute:${model.key}`;
  if (model.name) {
    eventName += ":" + model.name;
  }
  if (model.values) {
    for (const modelValue of model.values) {
      config.view[modelValue] = normalizeToElementConfig(config.view[modelValue], "attribute");
    }
  } else {
    config.view = normalizeToElementConfig(config.view, "attribute");
  }
  const elementCreator = getFromAttributeCreator(config);
  return (dispatcher) => {
    dispatcher.on(eventName, wrap(elementCreator), {priority: config.converterPriority || "normal"});
  };
}
function downcastAttributeToAttribute(config) {
  config = cloneDeep2(config);
  let model = config.model;
  if (typeof model == "string") {
    model = {key: model};
  }
  let eventName = `attribute:${model.key}`;
  if (model.name) {
    eventName += ":" + model.name;
  }
  if (model.values) {
    for (const modelValue of model.values) {
      config.view[modelValue] = normalizeToAttributeConfig(config.view[modelValue]);
    }
  } else {
    config.view = normalizeToAttributeConfig(config.view);
  }
  const elementCreator = getFromAttributeCreator(config);
  return (dispatcher) => {
    dispatcher.on(eventName, changeAttribute(elementCreator), {priority: config.converterPriority || "normal"});
  };
}
function downcastMarkerToElement(config) {
  const view = normalizeToElementConfig(config.view, "ui");
  return (dispatcher) => {
    dispatcher.on(`addMarker:${config.model}`, insertUIElement(view), {priority: config.converterPriority || "normal"});
    dispatcher.on(`removeMarker:${config.model}`, removeUIElement(), {priority: config.converterPriority || "normal"});
  };
}
function downcastMarkerToData(config) {
  config = cloneDeep2(config);
  const group = config.model;
  let view = config.view;
  if (!view) {
    view = (markerName) => ({
      group,
      name: markerName.substr(config.model.length + 1)
    });
  }
  return (dispatcher) => {
    dispatcher.on(`addMarker:${group}`, insertMarkerData(view), {priority: config.converterPriority || "normal"});
    dispatcher.on(`removeMarker:${group}`, removeMarkerData(view), {priority: config.converterPriority || "normal"});
  };
}
function downcastMarkerToHighlight(config) {
  return (dispatcher) => {
    dispatcher.on(`addMarker:${config.model}`, highlightText(config.view), {priority: config.converterPriority || "normal"});
    dispatcher.on(`addMarker:${config.model}`, highlightElement(config.view), {priority: config.converterPriority || "normal"});
    dispatcher.on(`removeMarker:${config.model}`, removeHighlight(config.view), {priority: config.converterPriority || "normal"});
  };
}
function normalizeModelElementConfig(model) {
  if (typeof model == "string") {
    model = {name: model};
  }
  if (!model.attributes) {
    model.attributes = [];
  } else if (!Array.isArray(model.attributes)) {
    model.attributes = [model.attributes];
  }
  model.children = !!model.children;
  return model;
}
function normalizeToElementConfig(view, viewElementType) {
  if (typeof view == "function") {
    return view;
  }
  return (modelData, conversionApi) => createViewElementFromDefinition(view, conversionApi, viewElementType);
}
function createViewElementFromDefinition(viewElementDefinition, conversionApi, viewElementType) {
  if (typeof viewElementDefinition == "string") {
    viewElementDefinition = {name: viewElementDefinition};
  }
  let element;
  const viewWriter = conversionApi.writer;
  const attributes = Object.assign({}, viewElementDefinition.attributes);
  if (viewElementType == "container") {
    element = viewWriter.createContainerElement(viewElementDefinition.name, attributes);
  } else if (viewElementType == "attribute") {
    const options = {
      priority: viewElementDefinition.priority || attributeelement_default.DEFAULT_PRIORITY
    };
    element = viewWriter.createAttributeElement(viewElementDefinition.name, attributes, options);
  } else {
    element = viewWriter.createUIElement(viewElementDefinition.name, attributes);
  }
  if (viewElementDefinition.styles) {
    const keys = Object.keys(viewElementDefinition.styles);
    for (const key of keys) {
      viewWriter.setStyle(key, viewElementDefinition.styles[key], element);
    }
  }
  if (viewElementDefinition.classes) {
    const classes = viewElementDefinition.classes;
    if (typeof classes == "string") {
      viewWriter.addClass(classes, element);
    } else {
      for (const className of classes) {
        viewWriter.addClass(className, element);
      }
    }
  }
  return element;
}
function getFromAttributeCreator(config) {
  if (config.model.values) {
    return (modelAttributeValue, conversionApi, data) => {
      const view = config.view[modelAttributeValue];
      if (view) {
        return view(modelAttributeValue, conversionApi, data);
      }
      return null;
    };
  } else {
    return config.view;
  }
}
function normalizeToAttributeConfig(view) {
  if (typeof view == "string") {
    return (modelAttributeValue) => ({key: view, value: modelAttributeValue});
  } else if (typeof view == "object") {
    if (view.value) {
      return () => view;
    } else {
      return (modelAttributeValue) => ({key: view.key, value: modelAttributeValue});
    }
  } else {
    return view;
  }
}
function prepareDescriptor(highlightDescriptor, data, conversionApi) {
  const descriptor = typeof highlightDescriptor == "function" ? highlightDescriptor(data, conversionApi) : highlightDescriptor;
  if (!descriptor) {
    return null;
  }
  if (!descriptor.priority) {
    descriptor.priority = 10;
  }
  if (!descriptor.id) {
    descriptor.id = data.markerName;
  }
  return descriptor;
}
function createChangeReducerCallback(model) {
  return (node, change) => {
    if (!node.is("element", model.name)) {
      return false;
    }
    if (change.type == "attribute") {
      if (model.attributes.includes(change.attributeKey)) {
        return true;
      }
    } else {
      /* istanbul ignore else: This is always true because otherwise it would not register a reducer callback. -- @preserve */
      if (model.children) {
        return true;
      }
    }
    return false;
  };
}
function createChangeReducer(model) {
  const shouldReplace = createChangeReducerCallback(model);
  return (evt, data) => {
    const reducedChanges = [];
    if (!data.reconvertedElements) {
      data.reconvertedElements = new Set();
    }
    for (const change of data.changes) {
      const node = change.type == "attribute" ? change.range.start.nodeAfter : change.position.parent;
      if (!node || !shouldReplace(node, change)) {
        reducedChanges.push(change);
        continue;
      }
      if (!data.reconvertedElements.has(node)) {
        data.reconvertedElements.add(node);
        const position = position_default2._createBefore(node);
        let changeIndex = reducedChanges.length;
        for (let i = reducedChanges.length - 1; i >= 0; i--) {
          const change2 = reducedChanges[i];
          const changePosition = change2.type == "attribute" ? change2.range.start : change2.position;
          const positionRelation = changePosition.compareWith(position);
          if (positionRelation == "before" || change2.type == "remove" && positionRelation == "same") {
            break;
          }
          changeIndex = i;
        }
        reducedChanges.splice(changeIndex, 0, {
          type: "remove",
          name: node.name,
          position,
          length: 1
        }, {
          type: "reinsert",
          name: node.name,
          position,
          length: 1
        });
      }
    }
    data.changes = reducedChanges;
  };
}
function createConsumer(model) {
  return (node, consumable, options = {}) => {
    const events = ["insert"];
    for (const attributeName of model.attributes) {
      if (node.hasAttribute(attributeName)) {
        events.push(`attribute:${attributeName}`);
      }
    }
    if (!events.every((event) => consumable.test(node, event))) {
      return false;
    }
    if (!options.preflight) {
      events.forEach((event) => consumable.consume(node, event));
    }
    return true;
  };
}
function createSlotFactory(element, slotsMap, conversionApi) {
  return (writer, modeOrFilter) => {
    const slot = writer.createContainerElement("$slot");
    let children = null;
    if (modeOrFilter === "children") {
      children = Array.from(element.getChildren());
    } else if (typeof modeOrFilter == "function") {
      children = Array.from(element.getChildren()).filter((element2) => modeOrFilter(element2));
    } else {
      throw new CKEditorError24("conversion-slot-mode-unknown", conversionApi.dispatcher, {modeOrFilter});
    }
    slotsMap.set(slot, children);
    return slot;
  };
}
function validateSlotsChildren(element, slotsMap, conversionApi) {
  const childrenInSlots = Array.from(slotsMap.values()).flat();
  const uniqueChildrenInSlots = new Set(childrenInSlots);
  if (uniqueChildrenInSlots.size != childrenInSlots.length) {
    throw new CKEditorError24("conversion-slot-filter-overlap", conversionApi.dispatcher, {element});
  }
  if (uniqueChildrenInSlots.size != element.childCount) {
    throw new CKEditorError24("conversion-slot-filter-incomplete", conversionApi.dispatcher, {element});
  }
}
function fillSlots(viewElement, slotsMap, conversionApi, options) {
  conversionApi.mapper.on("modelToViewPosition", toViewPositionMapping, {priority: "highest"});
  let currentSlot = null;
  let currentSlotNodes = null;
  for ([currentSlot, currentSlotNodes] of slotsMap) {
    reinsertOrConvertNodes(viewElement, currentSlotNodes, conversionApi, options);
    conversionApi.writer.move(conversionApi.writer.createRangeIn(currentSlot), conversionApi.writer.createPositionBefore(currentSlot));
    conversionApi.writer.remove(currentSlot);
  }
  conversionApi.mapper.off("modelToViewPosition", toViewPositionMapping);
  function toViewPositionMapping(evt, data) {
    const element = data.modelPosition.nodeAfter;
    const index = currentSlotNodes.indexOf(element);
    if (index < 0) {
      return;
    }
    data.viewPosition = data.mapper.findPositionIn(currentSlot, index);
  }
}
function reinsertOrConvertNodes(viewElement, modelNodes, conversionApi, options) {
  for (const modelChildNode of modelNodes) {
    if (!reinsertNode(viewElement.root, modelChildNode, conversionApi, options)) {
      conversionApi.convertItem(modelChildNode);
    }
  }
}
function reinsertNode(viewRoot, modelNode, conversionApi, options) {
  const {writer, mapper} = conversionApi;
  if (!options.reconversion) {
    return false;
  }
  const viewChildNode = mapper.toViewElement(modelNode);
  if (!viewChildNode || viewChildNode.root == viewRoot) {
    return false;
  }
  if (!conversionApi.canReuseView(viewChildNode)) {
    return false;
  }
  writer.move(writer.createRangeOn(viewChildNode), mapper.toViewPosition(position_default2._createBefore(modelNode)));
  return true;
}
function defaultConsumer(item, consumable, {preflight} = {}) {
  if (preflight) {
    return consumable.test(item, "insert");
  } else {
    return consumable.consume(item, "insert");
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/autoparagraphing.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function autoParagraphEmptyRoots(writer) {
  const {schema, document: document2} = writer.model;
  for (const root of document2.getRoots()) {
    if (root.isEmpty && !schema.checkChild(root, "$text")) {
      if (schema.checkChild(root, "paragraph")) {
        writer.insertElement("paragraph", root);
        return true;
      }
    }
  }
  return false;
}
function isParagraphable(position, nodeOrType, schema) {
  const context = schema.createContext(position);
  if (!schema.checkChild(context, "paragraph")) {
    return false;
  }
  if (!schema.checkChild(context.push("paragraph"), nodeOrType)) {
    return false;
  }
  return true;
}
function wrapInParagraph(position, writer) {
  const paragraph = writer.createElement("paragraph");
  writer.insert(paragraph, position);
  return writer.createPositionAt(paragraph, 0);
}

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/upcasthelpers.js
import {priorities} from "es-ckeditor-lib/lib/utils";
import {cloneDeep as cloneDeep3} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var UpcastHelpers = class extends conversionhelpers_default {
  elementToElement(config) {
    return this.add(upcastElementToElement(config));
  }
  elementToAttribute(config) {
    return this.add(upcastElementToAttribute(config));
  }
  attributeToAttribute(config) {
    return this.add(upcastAttributeToAttribute(config));
  }
  elementToMarker(config) {
    return this.add(upcastElementToMarker(config));
  }
  dataToMarker(config) {
    return this.add(upcastDataToMarker(config));
  }
};
var upcasthelpers_default = UpcastHelpers;
function convertToModelFragment() {
  return (evt, data, conversionApi) => {
    if (!data.modelRange && conversionApi.consumable.consume(data.viewItem, {name: true})) {
      const {modelRange, modelCursor} = conversionApi.convertChildren(data.viewItem, data.modelCursor);
      data.modelRange = modelRange;
      data.modelCursor = modelCursor;
    }
  };
}
function convertText() {
  return (evt, data, {schema, consumable, writer}) => {
    let position = data.modelCursor;
    if (!consumable.test(data.viewItem)) {
      return;
    }
    if (!schema.checkChild(position, "$text")) {
      if (!isParagraphable(position, "$text", schema)) {
        return;
      }
      if (data.viewItem.data.trim().length == 0) {
        return;
      }
      const nodeBefore = position.nodeBefore;
      position = wrapInParagraph(position, writer);
      if (nodeBefore && nodeBefore.is("element", "$marker")) {
        writer.move(writer.createRangeOn(nodeBefore), position);
        position = writer.createPositionAfter(nodeBefore);
      }
    }
    consumable.consume(data.viewItem);
    const text = writer.createText(data.viewItem.data);
    writer.insert(text, position);
    data.modelRange = writer.createRange(position, position.getShiftedBy(text.offsetSize));
    data.modelCursor = data.modelRange.end;
  };
}
function convertSelectionChange(model, mapper) {
  return (evt, data) => {
    const viewSelection = data.newSelection;
    const ranges = [];
    for (const viewRange of viewSelection.getRanges()) {
      ranges.push(mapper.toModelRange(viewRange));
    }
    const modelSelection = model.createSelection(ranges, {backward: viewSelection.isBackward});
    if (!modelSelection.isEqual(model.document.selection)) {
      model.change((writer) => {
        writer.setSelection(modelSelection);
      });
    }
  };
}
function upcastElementToElement(config) {
  config = cloneDeep3(config);
  const converter = prepareToElementConverter(config);
  const elementName = getViewElementNameFromConfig(config.view);
  const eventName = elementName ? `element:${elementName}` : "element";
  return (dispatcher) => {
    dispatcher.on(eventName, converter, {priority: config.converterPriority || "normal"});
  };
}
function upcastElementToAttribute(config) {
  config = cloneDeep3(config);
  normalizeModelAttributeConfig(config);
  const converter = prepareToAttributeConverter(config, false);
  const elementName = getViewElementNameFromConfig(config.view);
  const eventName = elementName ? `element:${elementName}` : "element";
  return (dispatcher) => {
    dispatcher.on(eventName, converter, {priority: config.converterPriority || "low"});
  };
}
function upcastAttributeToAttribute(config) {
  config = cloneDeep3(config);
  let viewKey = null;
  if (typeof config.view == "string" || config.view.key) {
    viewKey = normalizeViewAttributeKeyValueConfig(config);
  }
  normalizeModelAttributeConfig(config, viewKey);
  const converter = prepareToAttributeConverter(config, true);
  return (dispatcher) => {
    dispatcher.on("element", converter, {priority: config.converterPriority || "low"});
  };
}
function upcastElementToMarker(config) {
  const model = normalizeElementToMarkerModelConfig(config.model);
  return upcastElementToElement({...config, model});
}
function upcastDataToMarker(config) {
  config = cloneDeep3(config);
  if (!config.model) {
    config.model = (name) => {
      return name ? config.view + ":" + name : config.view;
    };
  }
  const normalizedConfig = {
    view: config.view,
    model: config.model
  };
  const converterStart = prepareToElementConverter(normalizeDataToMarkerConfig(normalizedConfig, "start"));
  const converterEnd = prepareToElementConverter(normalizeDataToMarkerConfig(normalizedConfig, "end"));
  return (dispatcher) => {
    dispatcher.on(`element:${config.view}-start`, converterStart, {priority: config.converterPriority || "normal"});
    dispatcher.on(`element:${config.view}-end`, converterEnd, {priority: config.converterPriority || "normal"});
    const basePriority = priorities.low;
    const maxPriority = priorities.highest;
    const priorityFactor = priorities.get(config.converterPriority) / maxPriority;
    dispatcher.on("element", upcastAttributeToMarker(normalizedConfig), {priority: basePriority + priorityFactor});
  };
}
function upcastAttributeToMarker(config) {
  return (evt, data, conversionApi) => {
    const attrName = `data-${config.view}`;
    if (!conversionApi.consumable.test(data.viewItem, {attributes: attrName + "-end-after"}) && !conversionApi.consumable.test(data.viewItem, {attributes: attrName + "-start-after"}) && !conversionApi.consumable.test(data.viewItem, {attributes: attrName + "-end-before"}) && !conversionApi.consumable.test(data.viewItem, {attributes: attrName + "-start-before"})) {
      return;
    }
    if (!data.modelRange) {
      Object.assign(data, conversionApi.convertChildren(data.viewItem, data.modelCursor));
    }
    if (conversionApi.consumable.consume(data.viewItem, {attributes: attrName + "-end-after"})) {
      addMarkerElements(data.modelRange.end, data.viewItem.getAttribute(attrName + "-end-after").split(","));
    }
    if (conversionApi.consumable.consume(data.viewItem, {attributes: attrName + "-start-after"})) {
      addMarkerElements(data.modelRange.end, data.viewItem.getAttribute(attrName + "-start-after").split(","));
    }
    if (conversionApi.consumable.consume(data.viewItem, {attributes: attrName + "-end-before"})) {
      addMarkerElements(data.modelRange.start, data.viewItem.getAttribute(attrName + "-end-before").split(","));
    }
    if (conversionApi.consumable.consume(data.viewItem, {attributes: attrName + "-start-before"})) {
      addMarkerElements(data.modelRange.start, data.viewItem.getAttribute(attrName + "-start-before").split(","));
    }
    function addMarkerElements(position, markerViewNames) {
      for (const markerViewName of markerViewNames) {
        const markerName = config.model(markerViewName, conversionApi);
        const element = conversionApi.writer.createElement("$marker", {"data-name": markerName});
        conversionApi.writer.insert(element, position);
        if (data.modelCursor.isEqual(position)) {
          data.modelCursor = data.modelCursor.getShiftedBy(1);
        } else {
          data.modelCursor = data.modelCursor._getTransformedByInsertion(position, 1);
        }
        data.modelRange = data.modelRange._getTransformedByInsertion(position, 1)[0];
      }
    }
  };
}
function getViewElementNameFromConfig(viewConfig) {
  if (typeof viewConfig == "string") {
    return viewConfig;
  }
  if (typeof viewConfig == "object" && typeof viewConfig.name == "string") {
    return viewConfig.name;
  }
  return null;
}
function prepareToElementConverter(config) {
  const matcher = new matcher_default(config.view);
  return (evt, data, conversionApi) => {
    const matcherResult = matcher.match(data.viewItem);
    if (!matcherResult) {
      return;
    }
    const match = matcherResult.match;
    match.name = true;
    if (!conversionApi.consumable.test(data.viewItem, match)) {
      return;
    }
    const modelElement = getModelElement(config.model, data.viewItem, conversionApi);
    if (!modelElement) {
      return;
    }
    if (!conversionApi.safeInsert(modelElement, data.modelCursor)) {
      return;
    }
    conversionApi.consumable.consume(data.viewItem, match);
    conversionApi.convertChildren(data.viewItem, modelElement);
    conversionApi.updateConversionResult(modelElement, data);
  };
}
function getModelElement(model, input, conversionApi) {
  if (model instanceof Function) {
    return model(input, conversionApi);
  } else {
    return conversionApi.writer.createElement(model);
  }
}
function normalizeViewAttributeKeyValueConfig(config) {
  if (typeof config.view == "string") {
    config.view = {key: config.view};
  }
  const key = config.view.key;
  let normalized;
  if (key == "class" || key == "style") {
    const keyName = key == "class" ? "classes" : "styles";
    normalized = {
      [keyName]: config.view.value
    };
  } else {
    const value = typeof config.view.value == "undefined" ? /[\s\S]*/ : config.view.value;
    normalized = {
      attributes: {
        [key]: value
      }
    };
  }
  if (config.view.name) {
    normalized.name = config.view.name;
  }
  config.view = normalized;
  return key;
}
function normalizeModelAttributeConfig(config, viewAttributeKeyToCopy = null) {
  const defaultModelValue = viewAttributeKeyToCopy === null ? true : (viewElement) => viewElement.getAttribute(viewAttributeKeyToCopy);
  const key = typeof config.model != "object" ? config.model : config.model.key;
  const value = typeof config.model != "object" || typeof config.model.value == "undefined" ? defaultModelValue : config.model.value;
  config.model = {key, value};
}
function prepareToAttributeConverter(config, shallow) {
  const matcher = new matcher_default(config.view);
  return (evt, data, conversionApi) => {
    if (!data.modelRange && shallow) {
      return;
    }
    const match = matcher.match(data.viewItem);
    if (!match) {
      return;
    }
    if (onlyViewNameIsDefined(config.view, data.viewItem)) {
      match.match.name = true;
    } else {
      delete match.match.name;
    }
    if (!conversionApi.consumable.test(data.viewItem, match.match)) {
      return;
    }
    const modelKey = config.model.key;
    const modelValue = typeof config.model.value == "function" ? config.model.value(data.viewItem, conversionApi) : config.model.value;
    if (modelValue === null) {
      return;
    }
    if (!data.modelRange) {
      Object.assign(data, conversionApi.convertChildren(data.viewItem, data.modelCursor));
    }
    const attributeWasSet = setAttributeOn(data.modelRange, {key: modelKey, value: modelValue}, shallow, conversionApi);
    if (attributeWasSet) {
      if (conversionApi.consumable.test(data.viewItem, {name: true})) {
        match.match.name = true;
      }
      conversionApi.consumable.consume(data.viewItem, match.match);
    }
  };
}
function onlyViewNameIsDefined(viewConfig, viewItem) {
  const configToTest = typeof viewConfig == "function" ? viewConfig(viewItem) : viewConfig;
  if (typeof configToTest == "object" && !getViewElementNameFromConfig(configToTest)) {
    return false;
  }
  return !configToTest.classes && !configToTest.attributes && !configToTest.styles;
}
function setAttributeOn(modelRange, modelAttribute, shallow, conversionApi) {
  let result = false;
  for (const node of Array.from(modelRange.getItems({shallow}))) {
    if (!conversionApi.schema.checkAttribute(node, modelAttribute.key)) {
      continue;
    }
    result = true;
    if (node.hasAttribute(modelAttribute.key)) {
      continue;
    }
    conversionApi.writer.setAttribute(modelAttribute.key, modelAttribute.value, node);
  }
  return result;
}
function normalizeElementToMarkerModelConfig(model) {
  return (viewElement, conversionApi) => {
    const markerName = typeof model == "string" ? model : model(viewElement, conversionApi);
    return conversionApi.writer.createElement("$marker", {"data-name": markerName});
  };
}
function normalizeDataToMarkerConfig(config, type) {
  const elementCreatorFunction = (viewElement, conversionApi) => {
    const viewName = viewElement.getAttribute("name");
    const markerName = config.model(viewName, conversionApi);
    return conversionApi.writer.createElement("$marker", {"data-name": markerName});
  };
  return {
    view: `${config.view}-${type}`,
    model: elementCreatorFunction
  };
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/selection-post-fixer.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function injectSelectionPostFixer(model) {
  model.document.registerPostFixer((writer) => selectionPostFixer(writer, model));
}
function selectionPostFixer(writer, model) {
  const selection = model.document.selection;
  const schema = model.schema;
  const ranges = [];
  let wasFixed = false;
  for (const modelRange of selection.getRanges()) {
    const correctedRange = tryFixingRange(modelRange, schema);
    if (correctedRange && !correctedRange.isEqual(modelRange)) {
      ranges.push(correctedRange);
      wasFixed = true;
    } else {
      ranges.push(modelRange);
    }
  }
  if (wasFixed) {
    writer.setSelection(mergeIntersectingRanges(ranges), {backward: selection.isBackward});
  }
  return false;
}
function tryFixingRange(range, schema) {
  if (range.isCollapsed) {
    return tryFixingCollapsedRange(range, schema);
  }
  return tryFixingNonCollapsedRage(range, schema);
}
function tryFixingCollapsedRange(range, schema) {
  const originalPosition = range.start;
  const nearestSelectionRange = schema.getNearestSelectionRange(originalPosition);
  if (!nearestSelectionRange) {
    const ancestorObject = originalPosition.getAncestors().reverse().find((item) => schema.isObject(item));
    if (ancestorObject) {
      return range_default2._createOn(ancestorObject);
    }
    return null;
  }
  if (!nearestSelectionRange.isCollapsed) {
    return nearestSelectionRange;
  }
  const fixedPosition = nearestSelectionRange.start;
  if (originalPosition.isEqual(fixedPosition)) {
    return null;
  }
  return new range_default2(fixedPosition);
}
function tryFixingNonCollapsedRage(range, schema) {
  const {start, end} = range;
  const isTextAllowedOnStart = schema.checkChild(start, "$text");
  const isTextAllowedOnEnd = schema.checkChild(end, "$text");
  const startLimitElement = schema.getLimitElement(start);
  const endLimitElement = schema.getLimitElement(end);
  if (startLimitElement === endLimitElement) {
    if (isTextAllowedOnStart && isTextAllowedOnEnd) {
      return null;
    }
    if (checkSelectionOnNonLimitElements(start, end, schema)) {
      const isStartBeforeSelectable = start.nodeAfter && schema.isSelectable(start.nodeAfter);
      const fixedStart = isStartBeforeSelectable ? null : schema.getNearestSelectionRange(start, "forward");
      const isEndAfterSelectable = end.nodeBefore && schema.isSelectable(end.nodeBefore);
      const fixedEnd = isEndAfterSelectable ? null : schema.getNearestSelectionRange(end, "backward");
      const rangeStart = fixedStart ? fixedStart.start : start;
      const rangeEnd = fixedEnd ? fixedEnd.end : end;
      return new range_default2(rangeStart, rangeEnd);
    }
  }
  const isStartInLimit = startLimitElement && !startLimitElement.is("rootElement");
  const isEndInLimit = endLimitElement && !endLimitElement.is("rootElement");
  if (isStartInLimit || isEndInLimit) {
    const bothInSameParent = start.nodeAfter && end.nodeBefore && start.nodeAfter.parent === end.nodeBefore.parent;
    const expandStart = isStartInLimit && (!bothInSameParent || !isSelectable(start.nodeAfter, schema));
    const expandEnd = isEndInLimit && (!bothInSameParent || !isSelectable(end.nodeBefore, schema));
    let fixedStart = start;
    let fixedEnd = end;
    if (expandStart) {
      fixedStart = position_default2._createBefore(findOutermostLimitAncestor(startLimitElement, schema));
    }
    if (expandEnd) {
      fixedEnd = position_default2._createAfter(findOutermostLimitAncestor(endLimitElement, schema));
    }
    return new range_default2(fixedStart, fixedEnd);
  }
  return null;
}
function findOutermostLimitAncestor(startingNode, schema) {
  let isLimitNode = startingNode;
  let parent = isLimitNode;
  while (schema.isLimit(parent) && parent.parent) {
    isLimitNode = parent;
    parent = parent.parent;
  }
  return isLimitNode;
}
function checkSelectionOnNonLimitElements(start, end, schema) {
  const startIsOnBlock = start.nodeAfter && !schema.isLimit(start.nodeAfter) || schema.checkChild(start, "$text");
  const endIsOnBlock = end.nodeBefore && !schema.isLimit(end.nodeBefore) || schema.checkChild(end, "$text");
  return startIsOnBlock || endIsOnBlock;
}
function mergeIntersectingRanges(ranges) {
  const rangesToMerge = [...ranges];
  const rangeIndexesToRemove = new Set();
  let currentRangeIndex = 1;
  while (currentRangeIndex < rangesToMerge.length) {
    const currentRange = rangesToMerge[currentRangeIndex];
    const previousRanges = rangesToMerge.slice(0, currentRangeIndex);
    for (const [previousRangeIndex, previousRange] of previousRanges.entries()) {
      if (rangeIndexesToRemove.has(previousRangeIndex)) {
        continue;
      }
      if (currentRange.isEqual(previousRange)) {
        rangeIndexesToRemove.add(previousRangeIndex);
      } else if (currentRange.isIntersecting(previousRange)) {
        rangeIndexesToRemove.add(previousRangeIndex);
        rangeIndexesToRemove.add(currentRangeIndex);
        const mergedRange = currentRange.getJoined(previousRange);
        rangesToMerge.push(mergedRange);
      }
    }
    currentRangeIndex++;
  }
  const nonIntersectingRanges = rangesToMerge.filter((_, index) => !rangeIndexesToRemove.has(index));
  return nonIntersectingRanges;
}
function isSelectable(node, schema) {
  return node && schema.isSelectable(node);
}

// node_modules/@ckeditor/ckeditor5-engine/src/controller/editingcontroller.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EditingController = class extends ObservableMixin5() {
  constructor(model, stylesProcessor) {
    super();
    this.model = model;
    this.view = new view_default(stylesProcessor);
    this.mapper = new mapper_default();
    this.downcastDispatcher = new downcastdispatcher_default({
      mapper: this.mapper,
      schema: model.schema
    });
    const doc = this.model.document;
    const selection = doc.selection;
    const markers = this.model.markers;
    this.listenTo(this.model, "_beforeChanges", () => {
      this.view._disableRendering(true);
    }, {priority: "highest"});
    this.listenTo(this.model, "_afterChanges", () => {
      this.view._disableRendering(false);
    }, {priority: "lowest"});
    this.listenTo(doc, "change", () => {
      this.view.change((writer) => {
        this.downcastDispatcher.convertChanges(doc.differ, markers, writer);
        this.downcastDispatcher.convertSelection(selection, markers, writer);
      });
    }, {priority: "low"});
    this.listenTo(this.view.document, "selectionChange", convertSelectionChange(this.model, this.mapper));
    this.listenTo(this.view.document, "beforeinput", fixTargetRanges(this.mapper, this.model.schema, this.view), {priority: "high"});
    this.downcastDispatcher.on("insert:$text", insertText(), {priority: "lowest"});
    this.downcastDispatcher.on("insert", insertAttributesAndChildren(), {priority: "lowest"});
    this.downcastDispatcher.on("remove", remove2(), {priority: "low"});
    this.downcastDispatcher.on("cleanSelection", cleanSelection());
    this.downcastDispatcher.on("selection", convertRangeSelection(), {priority: "low"});
    this.downcastDispatcher.on("selection", convertCollapsedSelection(), {priority: "low"});
    this.view.document.roots.bindTo(this.model.document.roots).using((root) => {
      if (root.rootName == "$graveyard") {
        return null;
      }
      const viewRoot = new rooteditableelement_default(this.view.document, root.name);
      viewRoot.rootName = root.rootName;
      this.mapper.bindElements(root, viewRoot);
      return viewRoot;
    });
  }
  destroy() {
    this.view.destroy();
    this.stopListening();
  }
  reconvertMarker(markerOrName) {
    const markerName = typeof markerOrName == "string" ? markerOrName : markerOrName.name;
    const currentMarker = this.model.markers.get(markerName);
    if (!currentMarker) {
      throw new CKEditorError25("editingcontroller-reconvertmarker-marker-not-exist", this, {markerName});
    }
    this.model.change(() => {
      this.model.markers._refresh(currentMarker);
    });
  }
  reconvertItem(item) {
    this.model.change(() => {
      this.model.document.differ._refreshItem(item);
    });
  }
};
var editingcontroller_default = EditingController;
function fixTargetRanges(mapper, schema, view) {
  return (evt, data) => {
    if (view.document.isComposing && !env6.isAndroid) {
      return;
    }
    for (let i = 0; i < data.targetRanges.length; i++) {
      const viewRange = data.targetRanges[i];
      const modelRange = mapper.toModelRange(viewRange);
      const correctedRange = tryFixingRange(modelRange, schema);
      if (!correctedRange || correctedRange.isEqual(modelRange)) {
        continue;
      }
      data.targetRanges[i] = mapper.toViewRange(correctedRange);
    }
  };
}

// node_modules/@ckeditor/ckeditor5-engine/src/controller/datacontroller.js
import {CKEditorError as CKEditorError29, EmitterMixin as EmitterMixin12, ObservableMixin as ObservableMixin7, logWarning as logWarning4} from "es-ckeditor-lib/lib/utils";

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/viewconsumable.js
import {CKEditorError as CKEditorError26} from "es-ckeditor-lib/lib/utils";
import {isArray} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ViewConsumable = class {
  constructor() {
    this._consumables = new Map();
  }
  add(element, consumables) {
    let elementConsumables;
    if (element.is("$text") || element.is("documentFragment")) {
      this._consumables.set(element, true);
      return;
    }
    if (!this._consumables.has(element)) {
      elementConsumables = new ViewElementConsumables(element);
      this._consumables.set(element, elementConsumables);
    } else {
      elementConsumables = this._consumables.get(element);
    }
    elementConsumables.add(consumables);
  }
  test(element, consumables) {
    const elementConsumables = this._consumables.get(element);
    if (elementConsumables === void 0) {
      return null;
    }
    if (element.is("$text") || element.is("documentFragment")) {
      return elementConsumables;
    }
    return elementConsumables.test(consumables);
  }
  consume(element, consumables) {
    if (this.test(element, consumables)) {
      if (element.is("$text") || element.is("documentFragment")) {
        this._consumables.set(element, false);
      } else {
        this._consumables.get(element).consume(consumables);
      }
      return true;
    }
    return false;
  }
  revert(element, consumables) {
    const elementConsumables = this._consumables.get(element);
    if (elementConsumables !== void 0) {
      if (element.is("$text") || element.is("documentFragment")) {
        this._consumables.set(element, true);
      } else {
        elementConsumables.revert(consumables);
      }
    }
  }
  static consumablesFromElement(element) {
    const consumables = {
      element,
      name: true,
      attributes: [],
      classes: [],
      styles: []
    };
    const attributes = element.getAttributeKeys();
    for (const attribute of attributes) {
      if (attribute == "style" || attribute == "class") {
        continue;
      }
      consumables.attributes.push(attribute);
    }
    const classes = element.getClassNames();
    for (const className of classes) {
      consumables.classes.push(className);
    }
    const styles = element.getStyleNames();
    for (const style of styles) {
      consumables.styles.push(style);
    }
    return consumables;
  }
  static createFrom(from, instance) {
    if (!instance) {
      instance = new ViewConsumable();
    }
    if (from.is("$text")) {
      instance.add(from);
      return instance;
    }
    if (from.is("element")) {
      instance.add(from, ViewConsumable.consumablesFromElement(from));
    }
    if (from.is("documentFragment")) {
      instance.add(from);
    }
    for (const child of from.getChildren()) {
      instance = ViewConsumable.createFrom(child, instance);
    }
    return instance;
  }
};
var viewconsumable_default = ViewConsumable;
var CONSUMABLE_TYPES = ["attributes", "classes", "styles"];
var ViewElementConsumables = class {
  constructor(from) {
    this.element = from;
    this._canConsumeName = null;
    this._consumables = {
      attributes: new Map(),
      styles: new Map(),
      classes: new Map()
    };
  }
  add(consumables) {
    if (consumables.name) {
      this._canConsumeName = true;
    }
    for (const type of CONSUMABLE_TYPES) {
      if (type in consumables) {
        this._add(type, consumables[type]);
      }
    }
  }
  test(consumables) {
    if (consumables.name && !this._canConsumeName) {
      return this._canConsumeName;
    }
    for (const type of CONSUMABLE_TYPES) {
      if (type in consumables) {
        const value = this._test(type, consumables[type]);
        if (value !== true) {
          return value;
        }
      }
    }
    return true;
  }
  consume(consumables) {
    if (consumables.name) {
      this._canConsumeName = false;
    }
    for (const type of CONSUMABLE_TYPES) {
      if (type in consumables) {
        this._consume(type, consumables[type]);
      }
    }
  }
  revert(consumables) {
    if (consumables.name) {
      this._canConsumeName = true;
    }
    for (const type of CONSUMABLE_TYPES) {
      if (type in consumables) {
        this._revert(type, consumables[type]);
      }
    }
  }
  _add(type, item) {
    const items = isArray(item) ? item : [item];
    const consumables = this._consumables[type];
    for (const name of items) {
      if (type === "attributes" && (name === "class" || name === "style")) {
        throw new CKEditorError26("viewconsumable-invalid-attribute", this);
      }
      consumables.set(name, true);
      if (type === "styles") {
        for (const alsoName of this.element.document.stylesProcessor.getRelatedStyles(name)) {
          consumables.set(alsoName, true);
        }
      }
    }
  }
  _test(type, item) {
    const items = isArray(item) ? item : [item];
    const consumables = this._consumables[type];
    for (const name of items) {
      if (type === "attributes" && (name === "class" || name === "style")) {
        const consumableName = name == "class" ? "classes" : "styles";
        const value = this._test(consumableName, [...this._consumables[consumableName].keys()]);
        if (value !== true) {
          return value;
        }
      } else {
        const value = consumables.get(name);
        if (value === void 0) {
          return null;
        }
        if (!value) {
          return false;
        }
      }
    }
    return true;
  }
  _consume(type, item) {
    const items = isArray(item) ? item : [item];
    const consumables = this._consumables[type];
    for (const name of items) {
      if (type === "attributes" && (name === "class" || name === "style")) {
        const consumableName = name == "class" ? "classes" : "styles";
        this._consume(consumableName, [...this._consumables[consumableName].keys()]);
      } else {
        consumables.set(name, false);
        if (type == "styles") {
          for (const toConsume of this.element.document.stylesProcessor.getRelatedStyles(name)) {
            consumables.set(toConsume, false);
          }
        }
      }
    }
  }
  _revert(type, item) {
    const items = isArray(item) ? item : [item];
    const consumables = this._consumables[type];
    for (const name of items) {
      if (type === "attributes" && (name === "class" || name === "style")) {
        const consumableName = name == "class" ? "classes" : "styles";
        this._revert(consumableName, [...this._consumables[consumableName].keys()]);
      } else {
        const value = consumables.get(name);
        if (value === false) {
          consumables.set(name, true);
        }
      }
    }
  }
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/schema.js
import {CKEditorError as CKEditorError27, ObservableMixin as ObservableMixin6} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Schema = class extends ObservableMixin6() {
  constructor() {
    super();
    this._sourceDefinitions = {};
    this._attributeProperties = {};
    this.decorate("checkChild");
    this.decorate("checkAttribute");
    this.on("checkAttribute", (evt, args) => {
      args[0] = new SchemaContext(args[0]);
    }, {priority: "highest"});
    this.on("checkChild", (evt, args) => {
      args[0] = new SchemaContext(args[0]);
      args[1] = this.getDefinition(args[1]);
    }, {priority: "highest"});
  }
  register(itemName, definition) {
    if (this._sourceDefinitions[itemName]) {
      throw new CKEditorError27("schema-cannot-register-item-twice", this, {
        itemName
      });
    }
    this._sourceDefinitions[itemName] = [
      Object.assign({}, definition)
    ];
    this._clearCache();
  }
  extend(itemName, definition) {
    if (!this._sourceDefinitions[itemName]) {
      throw new CKEditorError27("schema-cannot-extend-missing-item", this, {
        itemName
      });
    }
    this._sourceDefinitions[itemName].push(Object.assign({}, definition));
    this._clearCache();
  }
  getDefinitions() {
    if (!this._compiledDefinitions) {
      this._compile();
    }
    return this._compiledDefinitions;
  }
  getDefinition(item) {
    let itemName;
    if (typeof item == "string") {
      itemName = item;
    } else if ("is" in item && (item.is("$text") || item.is("$textProxy"))) {
      itemName = "$text";
    } else {
      itemName = item.name;
    }
    return this.getDefinitions()[itemName];
  }
  isRegistered(item) {
    return !!this.getDefinition(item);
  }
  isBlock(item) {
    const def = this.getDefinition(item);
    return !!(def && def.isBlock);
  }
  isLimit(item) {
    const def = this.getDefinition(item);
    if (!def) {
      return false;
    }
    return !!(def.isLimit || def.isObject);
  }
  isObject(item) {
    const def = this.getDefinition(item);
    if (!def) {
      return false;
    }
    return !!(def.isObject || def.isLimit && def.isSelectable && def.isContent);
  }
  isInline(item) {
    const def = this.getDefinition(item);
    return !!(def && def.isInline);
  }
  isSelectable(item) {
    const def = this.getDefinition(item);
    if (!def) {
      return false;
    }
    return !!(def.isSelectable || def.isObject);
  }
  isContent(item) {
    const def = this.getDefinition(item);
    if (!def) {
      return false;
    }
    return !!(def.isContent || def.isObject);
  }
  checkChild(context, def) {
    if (!def) {
      return false;
    }
    return this._checkContextMatch(def, context);
  }
  checkAttribute(context, attributeName) {
    const def = this.getDefinition(context.last);
    if (!def) {
      return false;
    }
    return def.allowAttributes.includes(attributeName);
  }
  checkMerge(positionOrBaseElement, elementToMerge) {
    if (positionOrBaseElement instanceof position_default2) {
      const nodeBefore = positionOrBaseElement.nodeBefore;
      const nodeAfter = positionOrBaseElement.nodeAfter;
      if (!(nodeBefore instanceof element_default2)) {
        throw new CKEditorError27("schema-check-merge-no-element-before", this);
      }
      if (!(nodeAfter instanceof element_default2)) {
        throw new CKEditorError27("schema-check-merge-no-element-after", this);
      }
      return this.checkMerge(nodeBefore, nodeAfter);
    }
    for (const child of elementToMerge.getChildren()) {
      if (!this.checkChild(positionOrBaseElement, child)) {
        return false;
      }
    }
    return true;
  }
  addChildCheck(callback) {
    this.on("checkChild", (evt, [ctx, childDef]) => {
      if (!childDef) {
        return;
      }
      const retValue = callback(ctx, childDef);
      if (typeof retValue == "boolean") {
        evt.stop();
        evt.return = retValue;
      }
    }, {priority: "high"});
  }
  addAttributeCheck(callback) {
    this.on("checkAttribute", (evt, [ctx, attributeName]) => {
      const retValue = callback(ctx, attributeName);
      if (typeof retValue == "boolean") {
        evt.stop();
        evt.return = retValue;
      }
    }, {priority: "high"});
  }
  setAttributeProperties(attributeName, properties) {
    this._attributeProperties[attributeName] = Object.assign(this.getAttributeProperties(attributeName), properties);
  }
  getAttributeProperties(attributeName) {
    return this._attributeProperties[attributeName] || {};
  }
  getLimitElement(selectionOrRangeOrPosition) {
    let element;
    if (selectionOrRangeOrPosition instanceof position_default2) {
      element = selectionOrRangeOrPosition.parent;
    } else {
      const ranges = selectionOrRangeOrPosition instanceof range_default2 ? [selectionOrRangeOrPosition] : Array.from(selectionOrRangeOrPosition.getRanges());
      element = ranges.reduce((element2, range) => {
        const rangeCommonAncestor = range.getCommonAncestor();
        if (!element2) {
          return rangeCommonAncestor;
        }
        return element2.getCommonAncestor(rangeCommonAncestor, {includeSelf: true});
      }, null);
    }
    while (!this.isLimit(element)) {
      if (element.parent) {
        element = element.parent;
      } else {
        break;
      }
    }
    return element;
  }
  checkAttributeInSelection(selection, attribute) {
    if (selection.isCollapsed) {
      const firstPosition = selection.getFirstPosition();
      const context = [
        ...firstPosition.getAncestors(),
        new text_default2("", selection.getAttributes())
      ];
      return this.checkAttribute(context, attribute);
    } else {
      const ranges = selection.getRanges();
      for (const range of ranges) {
        for (const value of range) {
          if (this.checkAttribute(value.item, attribute)) {
            return true;
          }
        }
      }
    }
    return false;
  }
  *getValidRanges(ranges, attribute) {
    ranges = convertToMinimalFlatRanges(ranges);
    for (const range of ranges) {
      yield* this._getValidRangesForRange(range, attribute);
    }
  }
  getNearestSelectionRange(position, direction = "both") {
    if (position.root.rootName == "$graveyard") {
      return null;
    }
    if (this.checkChild(position, "$text")) {
      return new range_default2(position);
    }
    let backwardWalker, forwardWalker;
    const limitElement = position.getAncestors().reverse().find((item) => this.isLimit(item)) || position.root;
    if (direction == "both" || direction == "backward") {
      backwardWalker = new treewalker_default2({
        boundaries: range_default2._createIn(limitElement),
        startPosition: position,
        direction: "backward"
      });
    }
    if (direction == "both" || direction == "forward") {
      forwardWalker = new treewalker_default2({
        boundaries: range_default2._createIn(limitElement),
        startPosition: position
      });
    }
    for (const data of combineWalkers(backwardWalker, forwardWalker)) {
      const type = data.walker == backwardWalker ? "elementEnd" : "elementStart";
      const value = data.value;
      if (value.type == type && this.isObject(value.item)) {
        return range_default2._createOn(value.item);
      }
      if (this.checkChild(value.nextPosition, "$text")) {
        return new range_default2(value.nextPosition);
      }
    }
    return null;
  }
  findAllowedParent(position, node) {
    let parent = position.parent;
    while (parent) {
      if (this.checkChild(parent, node)) {
        return parent;
      }
      if (this.isLimit(parent)) {
        return null;
      }
      parent = parent.parent;
    }
    return null;
  }
  setAllowedAttributes(node, attributes, writer) {
    const model = writer.model;
    for (const [attributeName, attributeValue] of Object.entries(attributes)) {
      if (model.schema.checkAttribute(node, attributeName)) {
        writer.setAttribute(attributeName, attributeValue, node);
      }
    }
  }
  removeDisallowedAttributes(nodes, writer) {
    for (const node of nodes) {
      if (node.is("$text")) {
        removeDisallowedAttributeFromNode(this, node, writer);
      } else {
        const rangeInNode = range_default2._createIn(node);
        const positionsInRange = rangeInNode.getPositions();
        for (const position of positionsInRange) {
          const item = position.nodeBefore || position.parent;
          removeDisallowedAttributeFromNode(this, item, writer);
        }
      }
    }
  }
  getAttributesWithProperty(node, propertyName, propertyValue) {
    const attributes = {};
    for (const [attributeName, attributeValue] of node.getAttributes()) {
      const attributeProperties = this.getAttributeProperties(attributeName);
      if (attributeProperties[propertyName] === void 0) {
        continue;
      }
      if (propertyValue === void 0 || propertyValue === attributeProperties[propertyName]) {
        attributes[attributeName] = attributeValue;
      }
    }
    return attributes;
  }
  createContext(context) {
    return new SchemaContext(context);
  }
  _clearCache() {
    this._compiledDefinitions = null;
  }
  _compile() {
    const compiledDefinitions = {};
    const sourceRules = this._sourceDefinitions;
    const itemNames = Object.keys(sourceRules);
    for (const itemName of itemNames) {
      compiledDefinitions[itemName] = compileBaseItemRule(sourceRules[itemName], itemName);
    }
    for (const itemName of itemNames) {
      compileAllowChildren(compiledDefinitions, itemName);
    }
    for (const itemName of itemNames) {
      compileAllowContentOf(compiledDefinitions, itemName);
    }
    for (const itemName of itemNames) {
      compileAllowWhere(compiledDefinitions, itemName);
    }
    for (const itemName of itemNames) {
      compileAllowAttributesOf(compiledDefinitions, itemName);
      compileInheritPropertiesFrom(compiledDefinitions, itemName);
    }
    for (const itemName of itemNames) {
      cleanUpAllowIn(compiledDefinitions, itemName);
      setupAllowChildren(compiledDefinitions, itemName);
      cleanUpAllowAttributes(compiledDefinitions, itemName);
    }
    this._compiledDefinitions = compiledDefinitions;
  }
  _checkContextMatch(def, context, contextItemIndex = context.length - 1) {
    const contextItem = context.getItem(contextItemIndex);
    if (def.allowIn.includes(contextItem.name)) {
      if (contextItemIndex == 0) {
        return true;
      } else {
        const parentRule = this.getDefinition(contextItem);
        return this._checkContextMatch(parentRule, context, contextItemIndex - 1);
      }
    } else {
      return false;
    }
  }
  *_getValidRangesForRange(range, attribute) {
    let start = range.start;
    let end = range.start;
    for (const item of range.getItems({shallow: true})) {
      if (item.is("element")) {
        yield* this._getValidRangesForRange(range_default2._createIn(item), attribute);
      }
      if (!this.checkAttribute(item, attribute)) {
        if (!start.isEqual(end)) {
          yield new range_default2(start, end);
        }
        start = position_default2._createAfter(item);
      }
      end = position_default2._createAfter(item);
    }
    if (!start.isEqual(end)) {
      yield new range_default2(start, end);
    }
  }
};
var schema_default = Schema;
var SchemaContext = class {
  constructor(context) {
    if (context instanceof SchemaContext) {
      return context;
    }
    let items;
    if (typeof context == "string") {
      items = [context];
    } else if (!Array.isArray(context)) {
      items = context.getAncestors({includeSelf: true});
    } else {
      items = context;
    }
    this._items = items.map(mapContextItem);
  }
  get length() {
    return this._items.length;
  }
  get last() {
    return this._items[this._items.length - 1];
  }
  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }
  push(item) {
    const ctx = new SchemaContext([item]);
    ctx._items = [...this._items, ...ctx._items];
    return ctx;
  }
  getItem(index) {
    return this._items[index];
  }
  *getNames() {
    yield* this._items.map((item) => item.name);
  }
  endsWith(query) {
    return Array.from(this.getNames()).join(" ").endsWith(query);
  }
  startsWith(query) {
    return Array.from(this.getNames()).join(" ").startsWith(query);
  }
};
function compileBaseItemRule(sourceItemRules, itemName) {
  const itemRule = {
    name: itemName,
    allowIn: [],
    allowContentOf: [],
    allowWhere: [],
    allowAttributes: [],
    allowAttributesOf: [],
    allowChildren: [],
    inheritTypesFrom: []
  };
  copyTypes(sourceItemRules, itemRule);
  copyProperty(sourceItemRules, itemRule, "allowIn");
  copyProperty(sourceItemRules, itemRule, "allowContentOf");
  copyProperty(sourceItemRules, itemRule, "allowWhere");
  copyProperty(sourceItemRules, itemRule, "allowAttributes");
  copyProperty(sourceItemRules, itemRule, "allowAttributesOf");
  copyProperty(sourceItemRules, itemRule, "allowChildren");
  copyProperty(sourceItemRules, itemRule, "inheritTypesFrom");
  makeInheritAllWork(sourceItemRules, itemRule);
  return itemRule;
}
function compileAllowChildren(compiledDefinitions, itemName) {
  const item = compiledDefinitions[itemName];
  for (const allowChildrenItem of item.allowChildren) {
    const allowedChildren = compiledDefinitions[allowChildrenItem];
    if (!allowedChildren) {
      continue;
    }
    allowedChildren.allowIn.push(itemName);
  }
  item.allowChildren.length = 0;
}
function compileAllowContentOf(compiledDefinitions, itemName) {
  for (const allowContentOfItemName of compiledDefinitions[itemName].allowContentOf) {
    if (compiledDefinitions[allowContentOfItemName]) {
      const allowedChildren = getAllowedChildren(compiledDefinitions, allowContentOfItemName);
      allowedChildren.forEach((allowedItem) => {
        allowedItem.allowIn.push(itemName);
      });
    }
  }
  delete compiledDefinitions[itemName].allowContentOf;
}
function compileAllowWhere(compiledDefinitions, itemName) {
  for (const allowWhereItemName of compiledDefinitions[itemName].allowWhere) {
    const inheritFrom = compiledDefinitions[allowWhereItemName];
    if (inheritFrom) {
      const allowedIn = inheritFrom.allowIn;
      compiledDefinitions[itemName].allowIn.push(...allowedIn);
    }
  }
  delete compiledDefinitions[itemName].allowWhere;
}
function compileAllowAttributesOf(compiledDefinitions, itemName) {
  for (const allowAttributeOfItem of compiledDefinitions[itemName].allowAttributesOf) {
    const inheritFrom = compiledDefinitions[allowAttributeOfItem];
    if (inheritFrom) {
      const inheritAttributes = inheritFrom.allowAttributes;
      compiledDefinitions[itemName].allowAttributes.push(...inheritAttributes);
    }
  }
  delete compiledDefinitions[itemName].allowAttributesOf;
}
function compileInheritPropertiesFrom(compiledDefinitions, itemName) {
  const item = compiledDefinitions[itemName];
  for (const inheritPropertiesOfItem of item.inheritTypesFrom) {
    const inheritFrom = compiledDefinitions[inheritPropertiesOfItem];
    if (inheritFrom) {
      const typeNames = Object.keys(inheritFrom).filter((name) => name.startsWith("is"));
      for (const name of typeNames) {
        if (!(name in item)) {
          item[name] = inheritFrom[name];
        }
      }
    }
  }
  delete item.inheritTypesFrom;
}
function cleanUpAllowIn(compiledDefinitions, itemName) {
  const itemRule = compiledDefinitions[itemName];
  const existingItems = itemRule.allowIn.filter((itemToCheck) => compiledDefinitions[itemToCheck]);
  itemRule.allowIn = Array.from(new Set(existingItems));
}
function setupAllowChildren(compiledDefinitions, itemName) {
  const itemRule = compiledDefinitions[itemName];
  for (const allowedParentItemName of itemRule.allowIn) {
    const allowedParentItem = compiledDefinitions[allowedParentItemName];
    allowedParentItem.allowChildren.push(itemName);
  }
}
function cleanUpAllowAttributes(compiledDefinitions, itemName) {
  const itemRule = compiledDefinitions[itemName];
  itemRule.allowAttributes = Array.from(new Set(itemRule.allowAttributes));
}
function copyTypes(sourceItemRules, itemRule) {
  for (const sourceItemRule of sourceItemRules) {
    const typeNames = Object.keys(sourceItemRule).filter((name) => name.startsWith("is"));
    for (const name of typeNames) {
      itemRule[name] = !!sourceItemRule[name];
    }
  }
}
function copyProperty(sourceItemRules, itemRule, propertyName) {
  for (const sourceItemRule of sourceItemRules) {
    const value = sourceItemRule[propertyName];
    if (typeof value == "string") {
      itemRule[propertyName].push(value);
    } else if (Array.isArray(value)) {
      itemRule[propertyName].push(...value);
    }
  }
}
function makeInheritAllWork(sourceItemRules, itemRule) {
  for (const sourceItemRule of sourceItemRules) {
    const inheritFrom = sourceItemRule.inheritAllFrom;
    if (inheritFrom) {
      itemRule.allowContentOf.push(inheritFrom);
      itemRule.allowWhere.push(inheritFrom);
      itemRule.allowAttributesOf.push(inheritFrom);
      itemRule.inheritTypesFrom.push(inheritFrom);
    }
  }
}
function getAllowedChildren(compiledDefinitions, itemName) {
  const itemRule = compiledDefinitions[itemName];
  return getValues(compiledDefinitions).filter((def) => def.allowIn.includes(itemRule.name));
}
function getValues(obj) {
  return Object.keys(obj).map((key) => obj[key]);
}
function mapContextItem(ctxItem) {
  if (typeof ctxItem == "string" || ctxItem.is("documentFragment")) {
    return {
      name: typeof ctxItem == "string" ? ctxItem : "$documentFragment",
      *getAttributeKeys() {
      },
      getAttribute() {
      }
    };
  } else {
    return {
      name: ctxItem.is("element") ? ctxItem.name : "$text",
      *getAttributeKeys() {
        yield* ctxItem.getAttributeKeys();
      },
      getAttribute(key) {
        return ctxItem.getAttribute(key);
      }
    };
  }
}
function* combineWalkers(backward, forward) {
  let done = false;
  while (!done) {
    done = true;
    if (backward) {
      const step = backward.next();
      if (!step.done) {
        done = false;
        yield {
          walker: backward,
          value: step.value
        };
      }
    }
    if (forward) {
      const step = forward.next();
      if (!step.done) {
        done = false;
        yield {
          walker: forward,
          value: step.value
        };
      }
    }
  }
}
function* convertToMinimalFlatRanges(ranges) {
  for (const range of ranges) {
    yield* range.getMinimalFlatRanges();
  }
}
function removeDisallowedAttributeFromNode(schema, node, writer) {
  for (const attribute of node.getAttributeKeys()) {
    if (!schema.checkAttribute(node, attribute)) {
      writer.removeAttribute(attribute, node);
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/upcastdispatcher.js
import {CKEditorError as CKEditorError28, EmitterMixin as EmitterMixin11} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var UpcastDispatcher = class extends EmitterMixin11() {
  constructor(conversionApi) {
    super();
    this._splitParts = new Map();
    this._cursorParents = new Map();
    this._modelCursor = null;
    this._emptyElementsToKeep = new Set();
    this.conversionApi = {
      ...conversionApi,
      consumable: null,
      writer: null,
      store: null,
      convertItem: (viewItem, modelCursor) => this._convertItem(viewItem, modelCursor),
      convertChildren: (viewElement, positionOrElement) => this._convertChildren(viewElement, positionOrElement),
      safeInsert: (modelNode, position) => this._safeInsert(modelNode, position),
      updateConversionResult: (modelElement, data) => this._updateConversionResult(modelElement, data),
      splitToAllowedParent: (modelNode, modelCursor) => this._splitToAllowedParent(modelNode, modelCursor),
      getSplitParts: (modelElement) => this._getSplitParts(modelElement),
      keepEmptyElement: (modelElement) => this._keepEmptyElement(modelElement)
    };
  }
  convert(viewElement, writer, context = ["$root"]) {
    this.fire("viewCleanup", viewElement);
    this._modelCursor = createContextTree(context, writer);
    this.conversionApi.writer = writer;
    this.conversionApi.consumable = viewconsumable_default.createFrom(viewElement);
    this.conversionApi.store = {};
    const {modelRange} = this._convertItem(viewElement, this._modelCursor);
    const documentFragment = writer.createDocumentFragment();
    if (modelRange) {
      this._removeEmptyElements();
      for (const item of Array.from(this._modelCursor.parent.getChildren())) {
        writer.append(item, documentFragment);
      }
      documentFragment.markers = extractMarkersFromModelFragment(documentFragment, writer);
    }
    this._modelCursor = null;
    this._splitParts.clear();
    this._cursorParents.clear();
    this._emptyElementsToKeep.clear();
    this.conversionApi.writer = null;
    this.conversionApi.store = null;
    return documentFragment;
  }
  _convertItem(viewItem, modelCursor) {
    const data = {viewItem, modelCursor, modelRange: null};
    if (viewItem.is("element")) {
      this.fire(`element:${viewItem.name}`, data, this.conversionApi);
    } else if (viewItem.is("$text")) {
      this.fire("text", data, this.conversionApi);
    } else {
      this.fire("documentFragment", data, this.conversionApi);
    }
    if (data.modelRange && !(data.modelRange instanceof range_default2)) {
      throw new CKEditorError28("view-conversion-dispatcher-incorrect-result", this);
    }
    return {modelRange: data.modelRange, modelCursor: data.modelCursor};
  }
  _convertChildren(viewItem, elementOrModelCursor) {
    let nextModelCursor = elementOrModelCursor.is("position") ? elementOrModelCursor : position_default2._createAt(elementOrModelCursor, 0);
    const modelRange = new range_default2(nextModelCursor);
    for (const viewChild of Array.from(viewItem.getChildren())) {
      const result = this._convertItem(viewChild, nextModelCursor);
      if (result.modelRange instanceof range_default2) {
        modelRange.end = result.modelRange.end;
        nextModelCursor = result.modelCursor;
      }
    }
    return {modelRange, modelCursor: nextModelCursor};
  }
  _safeInsert(modelNode, position) {
    const splitResult = this._splitToAllowedParent(modelNode, position);
    if (!splitResult) {
      return false;
    }
    this.conversionApi.writer.insert(modelNode, splitResult.position);
    return true;
  }
  _updateConversionResult(modelElement, data) {
    const parts = this._getSplitParts(modelElement);
    const writer = this.conversionApi.writer;
    if (!data.modelRange) {
      data.modelRange = writer.createRange(writer.createPositionBefore(modelElement), writer.createPositionAfter(parts[parts.length - 1]));
    }
    const savedCursorParent = this._cursorParents.get(modelElement);
    if (savedCursorParent) {
      data.modelCursor = writer.createPositionAt(savedCursorParent, 0);
    } else {
      data.modelCursor = data.modelRange.end;
    }
  }
  _splitToAllowedParent(node, modelCursor) {
    const {schema, writer} = this.conversionApi;
    let allowedParent = schema.findAllowedParent(modelCursor, node);
    if (allowedParent) {
      if (allowedParent === modelCursor.parent) {
        return {position: modelCursor};
      }
      if (this._modelCursor.parent.getAncestors().includes(allowedParent)) {
        allowedParent = null;
      }
    }
    if (!allowedParent) {
      if (!isParagraphable(modelCursor, node, schema)) {
        return null;
      }
      return {
        position: wrapInParagraph(modelCursor, writer)
      };
    }
    const splitResult = this.conversionApi.writer.split(modelCursor, allowedParent);
    const stack = [];
    for (const treeWalkerValue of splitResult.range.getWalker()) {
      if (treeWalkerValue.type == "elementEnd") {
        stack.push(treeWalkerValue.item);
      } else {
        const originalPart = stack.pop();
        const splitPart = treeWalkerValue.item;
        this._registerSplitPair(originalPart, splitPart);
      }
    }
    const cursorParent = splitResult.range.end.parent;
    this._cursorParents.set(node, cursorParent);
    return {
      position: splitResult.position,
      cursorParent
    };
  }
  _registerSplitPair(originalPart, splitPart) {
    if (!this._splitParts.has(originalPart)) {
      this._splitParts.set(originalPart, [originalPart]);
    }
    const list = this._splitParts.get(originalPart);
    this._splitParts.set(splitPart, list);
    list.push(splitPart);
  }
  _getSplitParts(element) {
    let parts;
    if (!this._splitParts.has(element)) {
      parts = [element];
    } else {
      parts = this._splitParts.get(element);
    }
    return parts;
  }
  _keepEmptyElement(element) {
    this._emptyElementsToKeep.add(element);
  }
  _removeEmptyElements() {
    let anyRemoved = false;
    for (const element of this._splitParts.keys()) {
      if (element.isEmpty && !this._emptyElementsToKeep.has(element)) {
        this.conversionApi.writer.remove(element);
        this._splitParts.delete(element);
        anyRemoved = true;
      }
    }
    if (anyRemoved) {
      this._removeEmptyElements();
    }
  }
};
var upcastdispatcher_default = UpcastDispatcher;
function extractMarkersFromModelFragment(modelItem, writer) {
  const markerElements = new Set();
  const markers = new Map();
  const range = range_default2._createIn(modelItem).getItems();
  for (const item of range) {
    if (item.is("element", "$marker")) {
      markerElements.add(item);
    }
  }
  for (const markerElement of markerElements) {
    const markerName = markerElement.getAttribute("data-name");
    const currentPosition = writer.createPositionBefore(markerElement);
    if (!markers.has(markerName)) {
      markers.set(markerName, new range_default2(currentPosition.clone()));
    } else {
      markers.get(markerName).end = currentPosition.clone();
    }
    writer.remove(markerElement);
  }
  return markers;
}
function createContextTree(contextDefinition, writer) {
  let position;
  for (const item of new SchemaContext(contextDefinition)) {
    const attributes = {};
    for (const key of item.getAttributeKeys()) {
      attributes[key] = item.getAttribute(key);
    }
    const current = writer.createElement(item.name, attributes);
    if (position) {
      writer.insert(current, position);
    }
    position = position_default2._createAt(current, 0);
  }
  return position;
}

// node_modules/@ckeditor/ckeditor5-engine/src/dataprocessor/basichtmlwriter.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BasicHtmlWriter = class {
  getHtml(fragment) {
    const doc = document.implementation.createHTMLDocument("");
    const container = doc.createElement("div");
    container.appendChild(fragment);
    return container.innerHTML;
  }
};
var basichtmlwriter_default = BasicHtmlWriter;

// node_modules/@ckeditor/ckeditor5-engine/src/dataprocessor/htmldataprocessor.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var HtmlDataProcessor = class {
  constructor(document2) {
    this.skipComments = true;
    this.domParser = new DOMParser();
    this.domConverter = new domconverter_default(document2, {renderingMode: "data"});
    this.htmlWriter = new basichtmlwriter_default();
  }
  toData(viewFragment) {
    const domFragment = this.domConverter.viewToDom(viewFragment);
    return this.htmlWriter.getHtml(domFragment);
  }
  toView(data) {
    const domFragment = this._toDom(data);
    return this.domConverter.domToView(domFragment, {skipComments: this.skipComments});
  }
  registerRawContentMatcher(pattern) {
    this.domConverter.registerRawContentMatcher(pattern);
  }
  useFillerType(type) {
    this.domConverter.blockFillerMode = type == "marked" ? "markedNbsp" : "nbsp";
  }
  _toDom(data) {
    if (!data.match(/<(?:html|body|head|meta)(?:\s[^>]*)?>/i)) {
      data = `<body>${data}</body>`;
    }
    const document2 = this.domParser.parseFromString(data, "text/html");
    const fragment = document2.createDocumentFragment();
    const bodyChildNodes = document2.body.childNodes;
    while (bodyChildNodes.length > 0) {
      fragment.appendChild(bodyChildNodes[0]);
    }
    return fragment;
  }
};
var htmldataprocessor_default = HtmlDataProcessor;

// node_modules/@ckeditor/ckeditor5-engine/src/controller/datacontroller.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DataController = class extends EmitterMixin12() {
  constructor(model, stylesProcessor) {
    super();
    this.model = model;
    this.mapper = new mapper_default();
    this.downcastDispatcher = new downcastdispatcher_default({
      mapper: this.mapper,
      schema: model.schema
    });
    this.downcastDispatcher.on("insert:$text", insertText(), {priority: "lowest"});
    this.downcastDispatcher.on("insert", insertAttributesAndChildren(), {priority: "lowest"});
    this.upcastDispatcher = new upcastdispatcher_default({
      schema: model.schema
    });
    this.viewDocument = new document_default(stylesProcessor);
    this.stylesProcessor = stylesProcessor;
    this.htmlProcessor = new htmldataprocessor_default(this.viewDocument);
    this.processor = this.htmlProcessor;
    this._viewWriter = new downcastwriter_default(this.viewDocument);
    this.upcastDispatcher.on("text", convertText(), {priority: "lowest"});
    this.upcastDispatcher.on("element", convertToModelFragment(), {priority: "lowest"});
    this.upcastDispatcher.on("documentFragment", convertToModelFragment(), {priority: "lowest"});
    ObservableMixin7().prototype.decorate.call(this, "init");
    ObservableMixin7().prototype.decorate.call(this, "set");
    ObservableMixin7().prototype.decorate.call(this, "get");
    ObservableMixin7().prototype.decorate.call(this, "toView");
    ObservableMixin7().prototype.decorate.call(this, "toModel");
    this.on("init", () => {
      this.fire("ready");
    }, {priority: "lowest"});
    this.on("ready", () => {
      this.model.enqueueChange({isUndoable: false}, autoParagraphEmptyRoots);
    }, {priority: "lowest"});
  }
  get(options = {}) {
    const {rootName = "main", trim = "empty"} = options;
    if (!this._checkIfRootsExists([rootName])) {
      throw new CKEditorError29("datacontroller-get-non-existent-root", this);
    }
    const root = this.model.document.getRoot(rootName);
    if (!root.isAttached()) {
      logWarning4("datacontroller-get-detached-root", this);
    }
    if (trim === "empty" && !this.model.hasContent(root, {ignoreWhitespaces: true})) {
      return "";
    }
    return this.stringify(root, options);
  }
  stringify(modelElementOrFragment, options = {}) {
    const viewDocumentFragment = this.toView(modelElementOrFragment, options);
    return this.processor.toData(viewDocumentFragment);
  }
  toView(modelElementOrFragment, options = {}) {
    const viewDocument = this.viewDocument;
    const viewWriter = this._viewWriter;
    this.mapper.clearBindings();
    const modelRange = range_default2._createIn(modelElementOrFragment);
    const viewDocumentFragment = new documentfragment_default(viewDocument);
    this.mapper.bindElements(modelElementOrFragment, viewDocumentFragment);
    const markers = modelElementOrFragment.is("documentFragment") ? modelElementOrFragment.markers : _getMarkersRelativeToElement(modelElementOrFragment);
    this.downcastDispatcher.convert(modelRange, markers, viewWriter, options);
    return viewDocumentFragment;
  }
  init(data) {
    if (this.model.document.version) {
      throw new CKEditorError29("datacontroller-init-document-not-empty", this);
    }
    let initialData = {};
    if (typeof data === "string") {
      initialData.main = data;
    } else {
      initialData = data;
    }
    if (!this._checkIfRootsExists(Object.keys(initialData))) {
      throw new CKEditorError29("datacontroller-init-non-existent-root", this);
    }
    this.model.enqueueChange({isUndoable: false}, (writer) => {
      for (const rootName of Object.keys(initialData)) {
        const modelRoot = this.model.document.getRoot(rootName);
        writer.insert(this.parse(initialData[rootName], modelRoot), modelRoot, 0);
      }
    });
    return Promise.resolve();
  }
  set(data, options = {}) {
    let newData = {};
    if (typeof data === "string") {
      newData.main = data;
    } else {
      newData = data;
    }
    if (!this._checkIfRootsExists(Object.keys(newData))) {
      throw new CKEditorError29("datacontroller-set-non-existent-root", this);
    }
    this.model.enqueueChange(options.batchType || {}, (writer) => {
      writer.setSelection(null);
      writer.removeSelectionAttribute(this.model.document.selection.getAttributeKeys());
      for (const rootName of Object.keys(newData)) {
        const modelRoot = this.model.document.getRoot(rootName);
        writer.remove(writer.createRangeIn(modelRoot));
        writer.insert(this.parse(newData[rootName], modelRoot), modelRoot, 0);
      }
    });
  }
  parse(data, context = "$root") {
    const viewDocumentFragment = this.processor.toView(data);
    return this.toModel(viewDocumentFragment, context);
  }
  toModel(viewElementOrFragment, context = "$root") {
    return this.model.change((writer) => {
      return this.upcastDispatcher.convert(viewElementOrFragment, writer, context);
    });
  }
  addStyleProcessorRules(callback) {
    callback(this.stylesProcessor);
  }
  registerRawContentMatcher(pattern) {
    if (this.processor && this.processor !== this.htmlProcessor) {
      this.processor.registerRawContentMatcher(pattern);
    }
    this.htmlProcessor.registerRawContentMatcher(pattern);
  }
  destroy() {
    this.stopListening();
  }
  _checkIfRootsExists(rootNames) {
    for (const rootName of rootNames) {
      if (!this.model.document.getRoot(rootName)) {
        return false;
      }
    }
    return true;
  }
};
var datacontroller_default = DataController;
function _getMarkersRelativeToElement(element) {
  const result = [];
  const doc = element.root.document;
  if (!doc) {
    return new Map();
  }
  const elementRange = range_default2._createIn(element);
  for (const marker of doc.model.markers) {
    const markerRange = marker.getRange();
    const isMarkerCollapsed = markerRange.isCollapsed;
    const isMarkerAtElementBoundary = markerRange.start.isEqual(elementRange.start) || markerRange.end.isEqual(elementRange.end);
    if (isMarkerCollapsed && isMarkerAtElementBoundary) {
      result.push([marker.name, markerRange]);
    } else {
      const updatedMarkerRange = elementRange.getIntersection(markerRange);
      if (updatedMarkerRange) {
        result.push([marker.name, updatedMarkerRange]);
      }
    }
  }
  result.sort(([n1, r1], [n2, r2]) => {
    if (r1.end.compareWith(r2.start) !== "after") {
      return 1;
    } else if (r1.start.compareWith(r2.end) !== "before") {
      return -1;
    } else {
      switch (r1.start.compareWith(r2.start)) {
        case "before":
          return 1;
        case "after":
          return -1;
        default:
          switch (r1.end.compareWith(r2.end)) {
            case "before":
              return 1;
            case "after":
              return -1;
            default:
              return n2.localeCompare(n1);
          }
      }
    }
  });
  return new Map(result);
}

// node_modules/@ckeditor/ckeditor5-engine/src/conversion/conversion.js
import {CKEditorError as CKEditorError30, toArray as toArray4} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Conversion = class {
  constructor(downcastDispatchers, upcastDispatchers) {
    this._helpers = new Map();
    this._downcast = toArray4(downcastDispatchers);
    this._createConversionHelpers({name: "downcast", dispatchers: this._downcast, isDowncast: true});
    this._upcast = toArray4(upcastDispatchers);
    this._createConversionHelpers({name: "upcast", dispatchers: this._upcast, isDowncast: false});
  }
  addAlias(alias, dispatcher) {
    const isDowncast = this._downcast.includes(dispatcher);
    const isUpcast = this._upcast.includes(dispatcher);
    if (!isUpcast && !isDowncast) {
      throw new CKEditorError30("conversion-add-alias-dispatcher-not-registered", this);
    }
    this._createConversionHelpers({name: alias, dispatchers: [dispatcher], isDowncast});
  }
  for(groupName) {
    if (!this._helpers.has(groupName)) {
      throw new CKEditorError30("conversion-for-unknown-group", this);
    }
    return this._helpers.get(groupName);
  }
  elementToElement(definition) {
    this.for("downcast").elementToElement(definition);
    for (const {model, view} of _getAllUpcastDefinitions(definition)) {
      this.for("upcast").elementToElement({
        model,
        view,
        converterPriority: definition.converterPriority
      });
    }
  }
  attributeToElement(definition) {
    this.for("downcast").attributeToElement(definition);
    for (const {model, view} of _getAllUpcastDefinitions(definition)) {
      this.for("upcast").elementToAttribute({
        view,
        model,
        converterPriority: definition.converterPriority
      });
    }
  }
  attributeToAttribute(definition) {
    this.for("downcast").attributeToAttribute(definition);
    for (const {model, view} of _getAllUpcastDefinitions(definition)) {
      this.for("upcast").attributeToAttribute({
        view,
        model
      });
    }
  }
  _createConversionHelpers({name, dispatchers, isDowncast}) {
    if (this._helpers.has(name)) {
      throw new CKEditorError30("conversion-group-exists", this);
    }
    const helpers = isDowncast ? new downcasthelpers_default(dispatchers) : new upcasthelpers_default(dispatchers);
    this._helpers.set(name, helpers);
  }
};
var conversion_default = Conversion;
function* _getAllUpcastDefinitions(definition) {
  if (definition.model.values) {
    for (const value of definition.model.values) {
      const model = {key: definition.model.key, value};
      const view = definition.view[value];
      const upcastAlso = definition.upcastAlso ? definition.upcastAlso[value] : void 0;
      yield* _getUpcastDefinition(model, view, upcastAlso);
    }
  } else {
    yield* _getUpcastDefinition(definition.model, definition.view, definition.upcastAlso);
  }
}
function* _getUpcastDefinition(model, view, upcastAlso) {
  yield {model, view};
  if (upcastAlso) {
    for (const upcastAlsoItem of toArray4(upcastAlso)) {
      yield {model, view: upcastAlsoItem};
    }
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/operation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Operation = class {
  constructor(baseVersion) {
    this.baseVersion = baseVersion;
    this.isDocumentOperation = this.baseVersion !== null;
    this.batch = null;
  }
  _validate() {
  }
  toJSON() {
    const json = Object.assign({}, this);
    json.__className = this.constructor.className;
    delete json.batch;
    delete json.isDocumentOperation;
    return json;
  }
  static get className() {
    return "Operation";
  }
  static fromJSON(json, document2) {
    return new this(json.baseVersion);
  }
};
var operation_default = Operation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/utils.js
import {CKEditorError as CKEditorError31, isIterable as isIterable7} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function _insert(position, nodes) {
  const normalizedNodes = _normalizeNodes(nodes);
  const offset = normalizedNodes.reduce((sum, node) => sum + node.offsetSize, 0);
  const parent = position.parent;
  _splitNodeAtPosition(position);
  const index = position.index;
  parent._insertChild(index, normalizedNodes);
  _mergeNodesAtIndex(parent, index + normalizedNodes.length);
  _mergeNodesAtIndex(parent, index);
  return new range_default2(position, position.getShiftedBy(offset));
}
function _remove(range) {
  if (!range.isFlat) {
    throw new CKEditorError31("operation-utils-remove-range-not-flat", this);
  }
  const parent = range.start.parent;
  _splitNodeAtPosition(range.start);
  _splitNodeAtPosition(range.end);
  const removed = parent._removeChildren(range.start.index, range.end.index - range.start.index);
  _mergeNodesAtIndex(parent, range.start.index);
  return removed;
}
function _move(sourceRange, targetPosition) {
  if (!sourceRange.isFlat) {
    throw new CKEditorError31("operation-utils-move-range-not-flat", this);
  }
  const nodes = _remove(sourceRange);
  targetPosition = targetPosition._getTransformedByDeletion(sourceRange.start, sourceRange.end.offset - sourceRange.start.offset);
  return _insert(targetPosition, nodes);
}
function _setAttribute(range, key, value) {
  _splitNodeAtPosition(range.start);
  _splitNodeAtPosition(range.end);
  for (const item of range.getItems({shallow: true})) {
    const node = item.is("$textProxy") ? item.textNode : item;
    if (value !== null) {
      node._setAttribute(key, value);
    } else {
      node._removeAttribute(key);
    }
    _mergeNodesAtIndex(node.parent, node.index);
  }
  _mergeNodesAtIndex(range.end.parent, range.end.index);
}
function _normalizeNodes(nodes) {
  const normalized = [];
  function convert(nodes2) {
    if (typeof nodes2 == "string") {
      normalized.push(new text_default2(nodes2));
    } else if (nodes2 instanceof textproxy_default2) {
      normalized.push(new text_default2(nodes2.data, nodes2.getAttributes()));
    } else if (nodes2 instanceof node_default2) {
      normalized.push(nodes2);
    } else if (isIterable7(nodes2)) {
      for (const node of nodes2) {
        convert(node);
      }
    }
  }
  convert(nodes);
  for (let i = 1; i < normalized.length; i++) {
    const node = normalized[i];
    const prev = normalized[i - 1];
    if (node instanceof text_default2 && prev instanceof text_default2 && _haveSameAttributes(node, prev)) {
      normalized.splice(i - 1, 2, new text_default2(prev.data + node.data, prev.getAttributes()));
      i--;
    }
  }
  return normalized;
}
function _mergeNodesAtIndex(element, index) {
  const nodeBefore = element.getChild(index - 1);
  const nodeAfter = element.getChild(index);
  if (nodeBefore && nodeAfter && nodeBefore.is("$text") && nodeAfter.is("$text") && _haveSameAttributes(nodeBefore, nodeAfter)) {
    const mergedNode = new text_default2(nodeBefore.data + nodeAfter.data, nodeBefore.getAttributes());
    element._removeChildren(index - 1, 2);
    element._insertChild(index - 1, mergedNode);
  }
}
function _splitNodeAtPosition(position) {
  const textNode = position.textNode;
  const element = position.parent;
  if (textNode) {
    const offsetDiff = position.offset - textNode.startOffset;
    const index = textNode.index;
    element._removeChildren(index, 1);
    const firstPart = new text_default2(textNode.data.substr(0, offsetDiff), textNode.getAttributes());
    const secondPart = new text_default2(textNode.data.substr(offsetDiff), textNode.getAttributes());
    element._insertChild(index, [firstPart, secondPart]);
  }
}
function _haveSameAttributes(nodeA, nodeB) {
  const iteratorA = nodeA.getAttributes();
  const iteratorB = nodeB.getAttributes();
  for (const attr of iteratorA) {
    if (attr[1] !== nodeB.getAttribute(attr[0])) {
      return false;
    }
    iteratorB.next();
  }
  return iteratorB.next().done;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/moveoperation.js
import {CKEditorError as CKEditorError32, compareArrays as compareArrays6} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MoveOperation = class extends operation_default {
  constructor(sourcePosition, howMany, targetPosition, baseVersion) {
    super(baseVersion);
    this.sourcePosition = sourcePosition.clone();
    this.sourcePosition.stickiness = "toNext";
    this.howMany = howMany;
    this.targetPosition = targetPosition.clone();
    this.targetPosition.stickiness = "toNone";
  }
  get type() {
    if (this.targetPosition.root.rootName == "$graveyard") {
      return "remove";
    } else if (this.sourcePosition.root.rootName == "$graveyard") {
      return "reinsert";
    }
    return "move";
  }
  get affectedSelectable() {
    return [
      range_default2._createFromPositionAndShift(this.sourcePosition, this.howMany),
      range_default2._createFromPositionAndShift(this.targetPosition, 0)
    ];
  }
  clone() {
    return new MoveOperation(this.sourcePosition, this.howMany, this.targetPosition, this.baseVersion);
  }
  getMovedRangeStart() {
    return this.targetPosition._getTransformedByDeletion(this.sourcePosition, this.howMany);
  }
  getReversed() {
    const newTargetPosition = this.sourcePosition._getTransformedByInsertion(this.targetPosition, this.howMany);
    return new MoveOperation(this.getMovedRangeStart(), this.howMany, newTargetPosition, this.baseVersion + 1);
  }
  _validate() {
    const sourceElement = this.sourcePosition.parent;
    const targetElement = this.targetPosition.parent;
    const sourceOffset = this.sourcePosition.offset;
    const targetOffset = this.targetPosition.offset;
    if (sourceOffset + this.howMany > sourceElement.maxOffset) {
      throw new CKEditorError32("move-operation-nodes-do-not-exist", this);
    } else if (sourceElement === targetElement && sourceOffset < targetOffset && targetOffset < sourceOffset + this.howMany) {
      throw new CKEditorError32("move-operation-range-into-itself", this);
    } else if (this.sourcePosition.root == this.targetPosition.root) {
      if (compareArrays6(this.sourcePosition.getParentPath(), this.targetPosition.getParentPath()) == "prefix") {
        const i = this.sourcePosition.path.length - 1;
        if (this.targetPosition.path[i] >= sourceOffset && this.targetPosition.path[i] < sourceOffset + this.howMany) {
          throw new CKEditorError32("move-operation-node-into-itself", this);
        }
      }
    }
  }
  _execute() {
    _move(range_default2._createFromPositionAndShift(this.sourcePosition, this.howMany), this.targetPosition);
  }
  toJSON() {
    const json = super.toJSON();
    json.sourcePosition = this.sourcePosition.toJSON();
    json.targetPosition = this.targetPosition.toJSON();
    return json;
  }
  static get className() {
    return "MoveOperation";
  }
  static fromJSON(json, document2) {
    const sourcePosition = position_default2.fromJSON(json.sourcePosition, document2);
    const targetPosition = position_default2.fromJSON(json.targetPosition, document2);
    return new this(sourcePosition, json.howMany, targetPosition, json.baseVersion);
  }
};
var moveoperation_default = MoveOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/insertoperation.js
import {CKEditorError as CKEditorError33} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var InsertOperation = class extends operation_default {
  constructor(position, nodes, baseVersion) {
    super(baseVersion);
    this.position = position.clone();
    this.position.stickiness = "toNone";
    this.nodes = new nodelist_default(_normalizeNodes(nodes));
    this.shouldReceiveAttributes = false;
  }
  get type() {
    return "insert";
  }
  get howMany() {
    return this.nodes.maxOffset;
  }
  get affectedSelectable() {
    return this.position.clone();
  }
  clone() {
    const nodes = new nodelist_default([...this.nodes].map((node) => node._clone(true)));
    const insert = new InsertOperation(this.position, nodes, this.baseVersion);
    insert.shouldReceiveAttributes = this.shouldReceiveAttributes;
    return insert;
  }
  getReversed() {
    const graveyard = this.position.root.document.graveyard;
    const gyPosition = new position_default2(graveyard, [0]);
    return new moveoperation_default(this.position, this.nodes.maxOffset, gyPosition, this.baseVersion + 1);
  }
  _validate() {
    const targetElement = this.position.parent;
    if (!targetElement || targetElement.maxOffset < this.position.offset) {
      throw new CKEditorError33("insert-operation-position-invalid", this);
    }
  }
  _execute() {
    const originalNodes = this.nodes;
    this.nodes = new nodelist_default([...originalNodes].map((node) => node._clone(true)));
    _insert(this.position, originalNodes);
  }
  toJSON() {
    const json = super.toJSON();
    json.position = this.position.toJSON();
    json.nodes = this.nodes.toJSON();
    return json;
  }
  static get className() {
    return "InsertOperation";
  }
  static fromJSON(json, document2) {
    const children = [];
    for (const child of json.nodes) {
      if (child.name) {
        children.push(element_default2.fromJSON(child));
      } else {
        children.push(text_default2.fromJSON(child));
      }
    }
    const insert = new InsertOperation(position_default2.fromJSON(json.position, document2), children, json.baseVersion);
    insert.shouldReceiveAttributes = json.shouldReceiveAttributes;
    return insert;
  }
};
var insertoperation_default = InsertOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/splitoperation.js
import {CKEditorError as CKEditorError34} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var SplitOperation = class extends operation_default {
  constructor(splitPosition, howMany, insertionPosition, graveyardPosition, baseVersion) {
    super(baseVersion);
    this.splitPosition = splitPosition.clone();
    this.splitPosition.stickiness = "toNext";
    this.howMany = howMany;
    this.insertionPosition = insertionPosition;
    this.graveyardPosition = graveyardPosition ? graveyardPosition.clone() : null;
    if (this.graveyardPosition) {
      this.graveyardPosition.stickiness = "toNext";
    }
  }
  get type() {
    return "split";
  }
  get moveTargetPosition() {
    const path = this.insertionPosition.path.slice();
    path.push(0);
    return new position_default2(this.insertionPosition.root, path);
  }
  get movedRange() {
    const end = this.splitPosition.getShiftedBy(Number.POSITIVE_INFINITY);
    return new range_default2(this.splitPosition, end);
  }
  get affectedSelectable() {
    const ranges = [
      range_default2._createFromPositionAndShift(this.splitPosition, 0),
      range_default2._createFromPositionAndShift(this.insertionPosition, 0)
    ];
    if (this.graveyardPosition) {
      ranges.push(range_default2._createFromPositionAndShift(this.graveyardPosition, 0));
    }
    return ranges;
  }
  clone() {
    return new SplitOperation(this.splitPosition, this.howMany, this.insertionPosition, this.graveyardPosition, this.baseVersion);
  }
  getReversed() {
    const graveyard = this.splitPosition.root.document.graveyard;
    const graveyardPosition = new position_default2(graveyard, [0]);
    return new mergeoperation_default(this.moveTargetPosition, this.howMany, this.splitPosition, graveyardPosition, this.baseVersion + 1);
  }
  _validate() {
    const element = this.splitPosition.parent;
    const offset = this.splitPosition.offset;
    if (!element || element.maxOffset < offset) {
      throw new CKEditorError34("split-operation-position-invalid", this);
    } else if (!element.parent) {
      throw new CKEditorError34("split-operation-split-in-root", this);
    } else if (this.howMany != element.maxOffset - this.splitPosition.offset) {
      throw new CKEditorError34("split-operation-how-many-invalid", this);
    } else if (this.graveyardPosition && !this.graveyardPosition.nodeAfter) {
      throw new CKEditorError34("split-operation-graveyard-position-invalid", this);
    }
  }
  _execute() {
    const splitElement = this.splitPosition.parent;
    if (this.graveyardPosition) {
      _move(range_default2._createFromPositionAndShift(this.graveyardPosition, 1), this.insertionPosition);
    } else {
      const newElement = splitElement._clone();
      _insert(this.insertionPosition, newElement);
    }
    const sourceRange = new range_default2(position_default2._createAt(splitElement, this.splitPosition.offset), position_default2._createAt(splitElement, splitElement.maxOffset));
    _move(sourceRange, this.moveTargetPosition);
  }
  toJSON() {
    const json = super.toJSON();
    json.splitPosition = this.splitPosition.toJSON();
    json.insertionPosition = this.insertionPosition.toJSON();
    if (this.graveyardPosition) {
      json.graveyardPosition = this.graveyardPosition.toJSON();
    }
    return json;
  }
  static get className() {
    return "SplitOperation";
  }
  static getInsertionPosition(splitPosition) {
    const path = splitPosition.path.slice(0, -1);
    path[path.length - 1]++;
    return new position_default2(splitPosition.root, path, "toPrevious");
  }
  static fromJSON(json, document2) {
    const splitPosition = position_default2.fromJSON(json.splitPosition, document2);
    const insertionPosition = position_default2.fromJSON(json.insertionPosition, document2);
    const graveyardPosition = json.graveyardPosition ? position_default2.fromJSON(json.graveyardPosition, document2) : null;
    return new this(splitPosition, json.howMany, insertionPosition, graveyardPosition, json.baseVersion);
  }
};
var splitoperation_default = SplitOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/mergeoperation.js
import {CKEditorError as CKEditorError35} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MergeOperation = class extends operation_default {
  constructor(sourcePosition, howMany, targetPosition, graveyardPosition, baseVersion) {
    super(baseVersion);
    this.sourcePosition = sourcePosition.clone();
    this.sourcePosition.stickiness = "toPrevious";
    this.howMany = howMany;
    this.targetPosition = targetPosition.clone();
    this.targetPosition.stickiness = "toNext";
    this.graveyardPosition = graveyardPosition.clone();
  }
  get type() {
    return "merge";
  }
  get deletionPosition() {
    return new position_default2(this.sourcePosition.root, this.sourcePosition.path.slice(0, -1));
  }
  get movedRange() {
    const end = this.sourcePosition.getShiftedBy(Number.POSITIVE_INFINITY);
    return new range_default2(this.sourcePosition, end);
  }
  get affectedSelectable() {
    const mergedElement = this.sourcePosition.parent;
    return [
      range_default2._createOn(mergedElement),
      range_default2._createFromPositionAndShift(this.targetPosition, 0),
      range_default2._createFromPositionAndShift(this.graveyardPosition, 0)
    ];
  }
  clone() {
    return new MergeOperation(this.sourcePosition, this.howMany, this.targetPosition, this.graveyardPosition, this.baseVersion);
  }
  getReversed() {
    const targetPosition = this.targetPosition._getTransformedByMergeOperation(this);
    const path = this.sourcePosition.path.slice(0, -1);
    const insertionPosition = new position_default2(this.sourcePosition.root, path)._getTransformedByMergeOperation(this);
    return new splitoperation_default(targetPosition, this.howMany, insertionPosition, this.graveyardPosition, this.baseVersion + 1);
  }
  _validate() {
    const sourceElement = this.sourcePosition.parent;
    const targetElement = this.targetPosition.parent;
    if (!sourceElement.parent) {
      throw new CKEditorError35("merge-operation-source-position-invalid", this);
    } else if (!targetElement.parent) {
      throw new CKEditorError35("merge-operation-target-position-invalid", this);
    } else if (this.howMany != sourceElement.maxOffset) {
      throw new CKEditorError35("merge-operation-how-many-invalid", this);
    }
  }
  _execute() {
    const mergedElement = this.sourcePosition.parent;
    const sourceRange = range_default2._createIn(mergedElement);
    _move(sourceRange, this.targetPosition);
    _move(range_default2._createOn(mergedElement), this.graveyardPosition);
  }
  toJSON() {
    const json = super.toJSON();
    json.sourcePosition = json.sourcePosition.toJSON();
    json.targetPosition = json.targetPosition.toJSON();
    json.graveyardPosition = json.graveyardPosition.toJSON();
    return json;
  }
  static get className() {
    return "MergeOperation";
  }
  static fromJSON(json, document2) {
    const sourcePosition = position_default2.fromJSON(json.sourcePosition, document2);
    const targetPosition = position_default2.fromJSON(json.targetPosition, document2);
    const graveyardPosition = position_default2.fromJSON(json.graveyardPosition, document2);
    return new this(sourcePosition, json.howMany, targetPosition, graveyardPosition, json.baseVersion);
  }
};
var mergeoperation_default = MergeOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/markeroperation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MarkerOperation = class extends operation_default {
  constructor(name, oldRange, newRange, markers, affectsData, baseVersion) {
    super(baseVersion);
    this.name = name;
    this.oldRange = oldRange ? oldRange.clone() : null;
    this.newRange = newRange ? newRange.clone() : null;
    this.affectsData = affectsData;
    this._markers = markers;
  }
  get type() {
    return "marker";
  }
  get affectedSelectable() {
    const ranges = [];
    if (this.oldRange) {
      ranges.push(this.oldRange.clone());
    }
    if (this.newRange) {
      if (this.oldRange) {
        ranges.push(...this.newRange.getDifference(this.oldRange));
      } else {
        ranges.push(this.newRange.clone());
      }
    }
    return ranges;
  }
  clone() {
    return new MarkerOperation(this.name, this.oldRange, this.newRange, this._markers, this.affectsData, this.baseVersion);
  }
  getReversed() {
    return new MarkerOperation(this.name, this.newRange, this.oldRange, this._markers, this.affectsData, this.baseVersion + 1);
  }
  _execute() {
    if (this.newRange) {
      this._markers._set(this.name, this.newRange, true, this.affectsData);
    } else {
      this._markers._remove(this.name);
    }
  }
  toJSON() {
    const json = super.toJSON();
    if (this.oldRange) {
      json.oldRange = this.oldRange.toJSON();
    }
    if (this.newRange) {
      json.newRange = this.newRange.toJSON();
    }
    delete json._markers;
    return json;
  }
  static get className() {
    return "MarkerOperation";
  }
  static fromJSON(json, document2) {
    return new MarkerOperation(json.name, json.oldRange ? range_default2.fromJSON(json.oldRange, document2) : null, json.newRange ? range_default2.fromJSON(json.newRange, document2) : null, document2.model.markers, json.affectsData, json.baseVersion);
  }
};
var markeroperation_default = MarkerOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/attributeoperation.js
import {CKEditorError as CKEditorError36} from "es-ckeditor-lib/lib/utils";
import {isEqual} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var AttributeOperation = class extends operation_default {
  constructor(range, key, oldValue, newValue, baseVersion) {
    super(baseVersion);
    this.range = range.clone();
    this.key = key;
    this.oldValue = oldValue === void 0 ? null : oldValue;
    this.newValue = newValue === void 0 ? null : newValue;
  }
  get type() {
    if (this.oldValue === null) {
      return "addAttribute";
    } else if (this.newValue === null) {
      return "removeAttribute";
    } else {
      return "changeAttribute";
    }
  }
  get affectedSelectable() {
    return this.range.clone();
  }
  clone() {
    return new AttributeOperation(this.range, this.key, this.oldValue, this.newValue, this.baseVersion);
  }
  getReversed() {
    return new AttributeOperation(this.range, this.key, this.newValue, this.oldValue, this.baseVersion + 1);
  }
  toJSON() {
    const json = super.toJSON();
    json.range = this.range.toJSON();
    return json;
  }
  _validate() {
    if (!this.range.isFlat) {
      throw new CKEditorError36("attribute-operation-range-not-flat", this);
    }
    for (const item of this.range.getItems({shallow: true})) {
      if (this.oldValue !== null && !isEqual(item.getAttribute(this.key), this.oldValue)) {
        throw new CKEditorError36("attribute-operation-wrong-old-value", this, {item, key: this.key, value: this.oldValue});
      }
      if (this.oldValue === null && this.newValue !== null && item.hasAttribute(this.key)) {
        throw new CKEditorError36("attribute-operation-attribute-exists", this, {node: item, key: this.key});
      }
    }
  }
  _execute() {
    if (!isEqual(this.oldValue, this.newValue)) {
      _setAttribute(this.range, this.key, this.newValue);
    }
  }
  static get className() {
    return "AttributeOperation";
  }
  static fromJSON(json, document2) {
    return new AttributeOperation(range_default2.fromJSON(json.range, document2), json.key, json.oldValue, json.newValue, json.baseVersion);
  }
};
var attributeoperation_default = AttributeOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/nooperation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var NoOperation = class extends operation_default {
  get type() {
    return "noop";
  }
  get affectedSelectable() {
    return null;
  }
  clone() {
    return new NoOperation(this.baseVersion);
  }
  getReversed() {
    return new NoOperation(this.baseVersion + 1);
  }
  _execute() {
  }
  static get className() {
    return "NoOperation";
  }
};
var nooperation_default = NoOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/renameoperation.js
import {CKEditorError as CKEditorError37} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RenameOperation = class extends operation_default {
  constructor(position, oldName, newName, baseVersion) {
    super(baseVersion);
    this.position = position;
    this.position.stickiness = "toNext";
    this.oldName = oldName;
    this.newName = newName;
  }
  get type() {
    return "rename";
  }
  get affectedSelectable() {
    return this.position.nodeAfter;
  }
  clone() {
    return new RenameOperation(this.position.clone(), this.oldName, this.newName, this.baseVersion);
  }
  getReversed() {
    return new RenameOperation(this.position.clone(), this.newName, this.oldName, this.baseVersion + 1);
  }
  _validate() {
    const element = this.position.nodeAfter;
    if (!(element instanceof element_default2)) {
      throw new CKEditorError37("rename-operation-wrong-position", this);
    } else if (element.name !== this.oldName) {
      throw new CKEditorError37("rename-operation-wrong-name", this);
    }
  }
  _execute() {
    const element = this.position.nodeAfter;
    element.name = this.newName;
  }
  toJSON() {
    const json = super.toJSON();
    json.position = this.position.toJSON();
    return json;
  }
  static get className() {
    return "RenameOperation";
  }
  static fromJSON(json, document2) {
    return new RenameOperation(position_default2.fromJSON(json.position, document2), json.oldName, json.newName, json.baseVersion);
  }
};
var renameoperation_default = RenameOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/rootattributeoperation.js
import {CKEditorError as CKEditorError38} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RootAttributeOperation = class extends operation_default {
  constructor(root, key, oldValue, newValue, baseVersion) {
    super(baseVersion);
    this.root = root;
    this.key = key;
    this.oldValue = oldValue === void 0 ? null : oldValue;
    this.newValue = newValue === void 0 ? null : newValue;
  }
  get type() {
    if (this.oldValue === null) {
      return "addRootAttribute";
    } else if (this.newValue === null) {
      return "removeRootAttribute";
    } else {
      return "changeRootAttribute";
    }
  }
  get affectedSelectable() {
    return this.root;
  }
  clone() {
    return new RootAttributeOperation(this.root, this.key, this.oldValue, this.newValue, this.baseVersion);
  }
  getReversed() {
    return new RootAttributeOperation(this.root, this.key, this.newValue, this.oldValue, this.baseVersion + 1);
  }
  _validate() {
    if (this.root != this.root.root || this.root.is("documentFragment")) {
      throw new CKEditorError38("rootattribute-operation-not-a-root", this, {root: this.root, key: this.key});
    }
    if (this.oldValue !== null && this.root.getAttribute(this.key) !== this.oldValue) {
      throw new CKEditorError38("rootattribute-operation-wrong-old-value", this, {root: this.root, key: this.key});
    }
    if (this.oldValue === null && this.newValue !== null && this.root.hasAttribute(this.key)) {
      throw new CKEditorError38("rootattribute-operation-attribute-exists", this, {root: this.root, key: this.key});
    }
  }
  _execute() {
    if (this.newValue !== null) {
      this.root._setAttribute(this.key, this.newValue);
    } else {
      this.root._removeAttribute(this.key);
    }
  }
  toJSON() {
    const json = super.toJSON();
    json.root = this.root.toJSON();
    return json;
  }
  static get className() {
    return "RootAttributeOperation";
  }
  static fromJSON(json, document2) {
    if (!document2.getRoot(json.root)) {
      throw new CKEditorError38("rootattribute-operation-fromjson-no-root", this, {rootName: json.root});
    }
    return new RootAttributeOperation(document2.getRoot(json.root), json.key, json.oldValue, json.newValue, json.baseVersion);
  }
};
var rootattributeoperation_default = RootAttributeOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/rootoperation.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RootOperation = class extends operation_default {
  constructor(rootName, elementName, isAdd, document2, baseVersion) {
    super(baseVersion);
    this.rootName = rootName;
    this.elementName = elementName;
    this.isAdd = isAdd;
    this._document = document2;
    if (!this._document.getRoot(this.rootName)) {
      const root = this._document.createRoot(this.elementName, this.rootName);
      root._isAttached = false;
    }
  }
  get type() {
    return this.isAdd ? "addRoot" : "detachRoot";
  }
  get affectedSelectable() {
    return this._document.getRoot(this.rootName);
  }
  clone() {
    return new RootOperation(this.rootName, this.elementName, this.isAdd, this._document, this.baseVersion);
  }
  getReversed() {
    return new RootOperation(this.rootName, this.elementName, !this.isAdd, this._document, this.baseVersion + 1);
  }
  _execute() {
    this._document.getRoot(this.rootName)._isAttached = this.isAdd;
  }
  toJSON() {
    const json = super.toJSON();
    delete json._document;
    return json;
  }
  static get className() {
    return "RootOperation";
  }
  static fromJSON(json, document2) {
    return new RootOperation(json.rootName, json.elementName, json.isAdd, document2, json.baseVersion);
  }
};
var rootoperation_default = RootOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/operationfactory.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var operations = {};
operations[attributeoperation_default.className] = attributeoperation_default;
operations[insertoperation_default.className] = insertoperation_default;
operations[markeroperation_default.className] = markeroperation_default;
operations[moveoperation_default.className] = moveoperation_default;
operations[nooperation_default.className] = nooperation_default;
operations[operation_default.className] = operation_default;
operations[renameoperation_default.className] = renameoperation_default;
operations[rootattributeoperation_default.className] = rootattributeoperation_default;
operations[rootoperation_default.className] = rootoperation_default;
operations[splitoperation_default.className] = splitoperation_default;
operations[mergeoperation_default.className] = mergeoperation_default;
var OperationFactory = class {
  static fromJSON(json, document2) {
    return operations[json.__className].fromJSON(json, document2);
  }
};
var operationfactory_default = OperationFactory;

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/transform.js
import {compareArrays as compareArrays7} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var transformations = new Map();
function setTransformation(OperationA, OperationB, transformationFunction) {
  let aGroup = transformations.get(OperationA);
  if (!aGroup) {
    aGroup = new Map();
    transformations.set(OperationA, aGroup);
  }
  aGroup.set(OperationB, transformationFunction);
}
function getTransformation(OperationA, OperationB) {
  const aGroup = transformations.get(OperationA);
  if (aGroup && aGroup.has(OperationB)) {
    return aGroup.get(OperationB);
  }
  return noUpdateTransformation;
}
function noUpdateTransformation(a) {
  return [a];
}
function transform2(a, b, context = {}) {
  const transformationFunction = getTransformation(a.constructor, b.constructor);
  try {
    a = a.clone();
    return transformationFunction(a, b, context);
  } catch (e) {
    throw e;
  }
}
function transformSets(operationsA, operationsB, options) {
  operationsA = operationsA.slice();
  operationsB = operationsB.slice();
  const contextFactory = new ContextFactory(options.document, options.useRelations, options.forceWeakRemove);
  contextFactory.setOriginalOperations(operationsA);
  contextFactory.setOriginalOperations(operationsB);
  const originalOperations = contextFactory.originalOperations;
  if (operationsA.length == 0 || operationsB.length == 0) {
    return {operationsA, operationsB, originalOperations};
  }
  const nextTransformIndex = new WeakMap();
  for (const op of operationsA) {
    nextTransformIndex.set(op, 0);
  }
  const data = {
    nextBaseVersionA: operationsA[operationsA.length - 1].baseVersion + 1,
    nextBaseVersionB: operationsB[operationsB.length - 1].baseVersion + 1,
    originalOperationsACount: operationsA.length,
    originalOperationsBCount: operationsB.length
  };
  let i = 0;
  while (i < operationsA.length) {
    const opA = operationsA[i];
    const indexB = nextTransformIndex.get(opA);
    if (indexB == operationsB.length) {
      i++;
      continue;
    }
    const opB = operationsB[indexB];
    const newOpsA = transform2(opA, opB, contextFactory.getContext(opA, opB, true));
    const newOpsB = transform2(opB, opA, contextFactory.getContext(opB, opA, false));
    contextFactory.updateRelation(opA, opB);
    contextFactory.setOriginalOperations(newOpsA, opA);
    contextFactory.setOriginalOperations(newOpsB, opB);
    for (const newOpA of newOpsA) {
      nextTransformIndex.set(newOpA, indexB + newOpsB.length);
    }
    operationsA.splice(i, 1, ...newOpsA);
    operationsB.splice(indexB, 1, ...newOpsB);
  }
  if (options.padWithNoOps) {
    const brokenOperationsACount = operationsA.length - data.originalOperationsACount;
    const brokenOperationsBCount = operationsB.length - data.originalOperationsBCount;
    padWithNoOps(operationsA, brokenOperationsBCount - brokenOperationsACount);
    padWithNoOps(operationsB, brokenOperationsACount - brokenOperationsBCount);
  }
  updateBaseVersions(operationsA, data.nextBaseVersionB);
  updateBaseVersions(operationsB, data.nextBaseVersionA);
  return {operationsA, operationsB, originalOperations};
}
var ContextFactory = class {
  constructor(document2, useRelations, forceWeakRemove = false) {
    this.originalOperations = new Map();
    this._history = document2.history;
    this._useRelations = useRelations;
    this._forceWeakRemove = !!forceWeakRemove;
    this._relations = new Map();
  }
  setOriginalOperations(operations2, takeFrom = null) {
    const originalOperation = takeFrom ? this.originalOperations.get(takeFrom) : null;
    for (const operation of operations2) {
      this.originalOperations.set(operation, originalOperation || operation);
    }
  }
  updateRelation(opA, opB) {
    if (opA instanceof moveoperation_default) {
      if (opB instanceof mergeoperation_default) {
        if (opA.targetPosition.isEqual(opB.sourcePosition) || opB.movedRange.containsPosition(opA.targetPosition)) {
          this._setRelation(opA, opB, "insertAtSource");
        } else if (opA.targetPosition.isEqual(opB.deletionPosition)) {
          this._setRelation(opA, opB, "insertBetween");
        } else if (opA.targetPosition.isAfter(opB.sourcePosition)) {
          this._setRelation(opA, opB, "moveTargetAfter");
        }
      } else if (opB instanceof moveoperation_default) {
        if (opA.targetPosition.isEqual(opB.sourcePosition) || opA.targetPosition.isBefore(opB.sourcePosition)) {
          this._setRelation(opA, opB, "insertBefore");
        } else {
          this._setRelation(opA, opB, "insertAfter");
        }
      }
    } else if (opA instanceof splitoperation_default) {
      if (opB instanceof mergeoperation_default) {
        if (opA.splitPosition.isBefore(opB.sourcePosition)) {
          this._setRelation(opA, opB, "splitBefore");
        }
      } else if (opB instanceof moveoperation_default) {
        if (opA.splitPosition.isEqual(opB.sourcePosition) || opA.splitPosition.isBefore(opB.sourcePosition)) {
          this._setRelation(opA, opB, "splitBefore");
        } else {
          const range = range_default2._createFromPositionAndShift(opB.sourcePosition, opB.howMany);
          if (opA.splitPosition.hasSameParentAs(opB.sourcePosition) && range.containsPosition(opA.splitPosition)) {
            const howMany = range.end.offset - opA.splitPosition.offset;
            const offset = opA.splitPosition.offset - range.start.offset;
            this._setRelation(opA, opB, {howMany, offset});
          }
        }
      }
    } else if (opA instanceof mergeoperation_default) {
      if (opB instanceof mergeoperation_default) {
        if (!opA.targetPosition.isEqual(opB.sourcePosition)) {
          this._setRelation(opA, opB, "mergeTargetNotMoved");
        }
        if (opA.sourcePosition.isEqual(opB.targetPosition)) {
          this._setRelation(opA, opB, "mergeSourceNotMoved");
        }
        if (opA.sourcePosition.isEqual(opB.sourcePosition)) {
          this._setRelation(opA, opB, "mergeSameElement");
        }
      } else if (opB instanceof splitoperation_default) {
        if (opA.sourcePosition.isEqual(opB.splitPosition)) {
          this._setRelation(opA, opB, "splitAtSource");
        }
      }
    } else if (opA instanceof markeroperation_default) {
      const markerRange = opA.newRange;
      if (!markerRange) {
        return;
      }
      if (opB instanceof moveoperation_default) {
        const movedRange = range_default2._createFromPositionAndShift(opB.sourcePosition, opB.howMany);
        const affectedLeft = movedRange.containsPosition(markerRange.start) || movedRange.start.isEqual(markerRange.start);
        const affectedRight = movedRange.containsPosition(markerRange.end) || movedRange.end.isEqual(markerRange.end);
        if ((affectedLeft || affectedRight) && !movedRange.containsRange(markerRange)) {
          this._setRelation(opA, opB, {
            side: affectedLeft ? "left" : "right",
            path: affectedLeft ? markerRange.start.path.slice() : markerRange.end.path.slice()
          });
        }
      } else if (opB instanceof mergeoperation_default) {
        const wasInLeftElement = markerRange.start.isEqual(opB.targetPosition);
        const wasStartBeforeMergedElement = markerRange.start.isEqual(opB.deletionPosition);
        const wasEndBeforeMergedElement = markerRange.end.isEqual(opB.deletionPosition);
        const wasInRightElement = markerRange.end.isEqual(opB.sourcePosition);
        if (wasInLeftElement || wasStartBeforeMergedElement || wasEndBeforeMergedElement || wasInRightElement) {
          this._setRelation(opA, opB, {
            wasInLeftElement,
            wasStartBeforeMergedElement,
            wasEndBeforeMergedElement,
            wasInRightElement
          });
        }
      }
    }
  }
  getContext(opA, opB, aIsStrong) {
    return {
      aIsStrong,
      aWasUndone: this._wasUndone(opA),
      bWasUndone: this._wasUndone(opB),
      abRelation: this._useRelations ? this._getRelation(opA, opB) : null,
      baRelation: this._useRelations ? this._getRelation(opB, opA) : null,
      forceWeakRemove: this._forceWeakRemove
    };
  }
  _wasUndone(op) {
    const originalOp = this.originalOperations.get(op);
    return originalOp.wasUndone || this._history.isUndoneOperation(originalOp);
  }
  _getRelation(opA, opB) {
    const origB = this.originalOperations.get(opB);
    const undoneB = this._history.getUndoneOperation(origB);
    if (!undoneB) {
      return null;
    }
    const origA = this.originalOperations.get(opA);
    const relationsA = this._relations.get(origA);
    if (relationsA) {
      return relationsA.get(undoneB) || null;
    }
    return null;
  }
  _setRelation(opA, opB, relation) {
    const origA = this.originalOperations.get(opA);
    const origB = this.originalOperations.get(opB);
    let relationsA = this._relations.get(origA);
    if (!relationsA) {
      relationsA = new Map();
      this._relations.set(origA, relationsA);
    }
    relationsA.set(origB, relation);
  }
};
function updateBaseVersions(operations2, baseVersion) {
  for (const operation of operations2) {
    operation.baseVersion = baseVersion++;
  }
}
function padWithNoOps(operations2, howMany) {
  for (let i = 0; i < howMany; i++) {
    operations2.push(new nooperation_default(0));
  }
}
setTransformation(attributeoperation_default, attributeoperation_default, (a, b, context) => {
  if (a.key === b.key && a.range.start.hasSameParentAs(b.range.start)) {
    const operations2 = a.range.getDifference(b.range).map((range) => {
      return new attributeoperation_default(range, a.key, a.oldValue, a.newValue, 0);
    });
    const common = a.range.getIntersection(b.range);
    if (common) {
      if (context.aIsStrong) {
        operations2.push(new attributeoperation_default(common, b.key, b.newValue, a.newValue, 0));
      }
    }
    if (operations2.length == 0) {
      return [new nooperation_default(0)];
    }
    return operations2;
  } else {
    return [a];
  }
});
setTransformation(attributeoperation_default, insertoperation_default, (a, b) => {
  if (a.range.start.hasSameParentAs(b.position) && a.range.containsPosition(b.position)) {
    const range = a.range._getTransformedByInsertion(b.position, b.howMany, !b.shouldReceiveAttributes);
    const result = range.map((r) => {
      return new attributeoperation_default(r, a.key, a.oldValue, a.newValue, a.baseVersion);
    });
    if (b.shouldReceiveAttributes) {
      const op = _getComplementaryAttributeOperations(b, a.key, a.oldValue);
      if (op) {
        result.unshift(op);
      }
    }
    return result;
  }
  a.range = a.range._getTransformedByInsertion(b.position, b.howMany, false)[0];
  return [a];
});
function _getComplementaryAttributeOperations(insertOperation, key, newValue) {
  const nodes = insertOperation.nodes;
  const insertValue = nodes.getNode(0).getAttribute(key);
  if (insertValue == newValue) {
    return null;
  }
  const range = new range_default2(insertOperation.position, insertOperation.position.getShiftedBy(insertOperation.howMany));
  return new attributeoperation_default(range, key, insertValue, newValue, 0);
}
setTransformation(attributeoperation_default, mergeoperation_default, (a, b) => {
  const ranges = [];
  if (a.range.start.hasSameParentAs(b.deletionPosition)) {
    if (a.range.containsPosition(b.deletionPosition) || a.range.start.isEqual(b.deletionPosition)) {
      ranges.push(range_default2._createFromPositionAndShift(b.graveyardPosition, 1));
    }
  }
  const range = a.range._getTransformedByMergeOperation(b);
  if (!range.isCollapsed) {
    ranges.push(range);
  }
  return ranges.map((range2) => {
    return new attributeoperation_default(range2, a.key, a.oldValue, a.newValue, a.baseVersion);
  });
});
setTransformation(attributeoperation_default, moveoperation_default, (a, b) => {
  const ranges = _breakRangeByMoveOperation(a.range, b);
  return ranges.map((range) => new attributeoperation_default(range, a.key, a.oldValue, a.newValue, a.baseVersion));
});
function _breakRangeByMoveOperation(range, moveOp) {
  const moveRange = range_default2._createFromPositionAndShift(moveOp.sourcePosition, moveOp.howMany);
  let common = null;
  let difference = [];
  if (moveRange.containsRange(range, true)) {
    common = range;
  } else if (range.start.hasSameParentAs(moveRange.start)) {
    difference = range.getDifference(moveRange);
    common = range.getIntersection(moveRange);
  } else {
    difference = [range];
  }
  const result = [];
  for (let diff2 of difference) {
    diff2 = diff2._getTransformedByDeletion(moveOp.sourcePosition, moveOp.howMany);
    const targetPosition = moveOp.getMovedRangeStart();
    const spread = diff2.start.hasSameParentAs(targetPosition);
    const diffs = diff2._getTransformedByInsertion(targetPosition, moveOp.howMany, spread);
    result.push(...diffs);
  }
  if (common) {
    result.push(common._getTransformedByMove(moveOp.sourcePosition, moveOp.targetPosition, moveOp.howMany, false)[0]);
  }
  return result;
}
setTransformation(attributeoperation_default, splitoperation_default, (a, b) => {
  if (a.range.end.isEqual(b.insertionPosition)) {
    if (!b.graveyardPosition) {
      a.range.end.offset++;
    }
    return [a];
  }
  if (a.range.start.hasSameParentAs(b.splitPosition) && a.range.containsPosition(b.splitPosition)) {
    const secondPart = a.clone();
    secondPart.range = new range_default2(b.moveTargetPosition.clone(), a.range.end._getCombined(b.splitPosition, b.moveTargetPosition));
    a.range.end = b.splitPosition.clone();
    a.range.end.stickiness = "toPrevious";
    return [a, secondPart];
  }
  a.range = a.range._getTransformedBySplitOperation(b);
  return [a];
});
setTransformation(insertoperation_default, attributeoperation_default, (a, b) => {
  const result = [a];
  if (a.shouldReceiveAttributes && a.position.hasSameParentAs(b.range.start) && b.range.containsPosition(a.position)) {
    const op = _getComplementaryAttributeOperations(a, b.key, b.newValue);
    if (op) {
      result.push(op);
    }
  }
  return result;
});
setTransformation(insertoperation_default, insertoperation_default, (a, b, context) => {
  if (a.position.isEqual(b.position) && context.aIsStrong) {
    return [a];
  }
  a.position = a.position._getTransformedByInsertOperation(b);
  return [a];
});
setTransformation(insertoperation_default, moveoperation_default, (a, b) => {
  a.position = a.position._getTransformedByMoveOperation(b);
  return [a];
});
setTransformation(insertoperation_default, splitoperation_default, (a, b) => {
  a.position = a.position._getTransformedBySplitOperation(b);
  return [a];
});
setTransformation(insertoperation_default, mergeoperation_default, (a, b) => {
  a.position = a.position._getTransformedByMergeOperation(b);
  return [a];
});
setTransformation(markeroperation_default, insertoperation_default, (a, b) => {
  if (a.oldRange) {
    a.oldRange = a.oldRange._getTransformedByInsertOperation(b)[0];
  }
  if (a.newRange) {
    a.newRange = a.newRange._getTransformedByInsertOperation(b)[0];
  }
  return [a];
});
setTransformation(markeroperation_default, markeroperation_default, (a, b, context) => {
  if (a.name == b.name) {
    if (context.aIsStrong) {
      a.oldRange = b.newRange ? b.newRange.clone() : null;
    } else {
      return [new nooperation_default(0)];
    }
  }
  return [a];
});
setTransformation(markeroperation_default, mergeoperation_default, (a, b) => {
  if (a.oldRange) {
    a.oldRange = a.oldRange._getTransformedByMergeOperation(b);
  }
  if (a.newRange) {
    a.newRange = a.newRange._getTransformedByMergeOperation(b);
  }
  return [a];
});
setTransformation(markeroperation_default, moveoperation_default, (a, b, context) => {
  if (a.oldRange) {
    a.oldRange = range_default2._createFromRanges(a.oldRange._getTransformedByMoveOperation(b));
  }
  if (a.newRange) {
    if (context.abRelation) {
      const aNewRange = range_default2._createFromRanges(a.newRange._getTransformedByMoveOperation(b));
      if (context.abRelation.side == "left" && b.targetPosition.isEqual(a.newRange.start)) {
        a.newRange.end = aNewRange.end;
        a.newRange.start.path = context.abRelation.path;
        return [a];
      } else if (context.abRelation.side == "right" && b.targetPosition.isEqual(a.newRange.end)) {
        a.newRange.start = aNewRange.start;
        a.newRange.end.path = context.abRelation.path;
        return [a];
      }
    }
    a.newRange = range_default2._createFromRanges(a.newRange._getTransformedByMoveOperation(b));
  }
  return [a];
});
setTransformation(markeroperation_default, splitoperation_default, (a, b, context) => {
  if (a.oldRange) {
    a.oldRange = a.oldRange._getTransformedBySplitOperation(b);
  }
  if (a.newRange) {
    if (context.abRelation) {
      const aNewRange = a.newRange._getTransformedBySplitOperation(b);
      if (a.newRange.start.isEqual(b.splitPosition) && context.abRelation.wasStartBeforeMergedElement) {
        a.newRange.start = position_default2._createAt(b.insertionPosition);
      } else if (a.newRange.start.isEqual(b.splitPosition) && !context.abRelation.wasInLeftElement) {
        a.newRange.start = position_default2._createAt(b.moveTargetPosition);
      }
      if (a.newRange.end.isEqual(b.splitPosition) && context.abRelation.wasInRightElement) {
        a.newRange.end = position_default2._createAt(b.moveTargetPosition);
      } else if (a.newRange.end.isEqual(b.splitPosition) && context.abRelation.wasEndBeforeMergedElement) {
        a.newRange.end = position_default2._createAt(b.insertionPosition);
      } else {
        a.newRange.end = aNewRange.end;
      }
      return [a];
    }
    a.newRange = a.newRange._getTransformedBySplitOperation(b);
  }
  return [a];
});
setTransformation(mergeoperation_default, insertoperation_default, (a, b) => {
  if (a.sourcePosition.hasSameParentAs(b.position)) {
    a.howMany += b.howMany;
  }
  a.sourcePosition = a.sourcePosition._getTransformedByInsertOperation(b);
  a.targetPosition = a.targetPosition._getTransformedByInsertOperation(b);
  return [a];
});
setTransformation(mergeoperation_default, mergeoperation_default, (a, b, context) => {
  if (a.sourcePosition.isEqual(b.sourcePosition) && a.targetPosition.isEqual(b.targetPosition)) {
    if (!context.bWasUndone) {
      return [new nooperation_default(0)];
    } else {
      const path = b.graveyardPosition.path.slice();
      path.push(0);
      a.sourcePosition = new position_default2(b.graveyardPosition.root, path);
      a.howMany = 0;
      return [a];
    }
  }
  if (a.sourcePosition.isEqual(b.sourcePosition) && !a.targetPosition.isEqual(b.targetPosition) && !context.bWasUndone && context.abRelation != "splitAtSource") {
    const aToGraveyard = a.targetPosition.root.rootName == "$graveyard";
    const bToGraveyard = b.targetPosition.root.rootName == "$graveyard";
    const aIsWeak = aToGraveyard && !bToGraveyard;
    const bIsWeak = bToGraveyard && !aToGraveyard;
    const forceMove = bIsWeak || !aIsWeak && context.aIsStrong;
    if (forceMove) {
      const sourcePosition = b.targetPosition._getTransformedByMergeOperation(b);
      const targetPosition = a.targetPosition._getTransformedByMergeOperation(b);
      return [new moveoperation_default(sourcePosition, a.howMany, targetPosition, 0)];
    } else {
      return [new nooperation_default(0)];
    }
  }
  if (a.sourcePosition.hasSameParentAs(b.targetPosition)) {
    a.howMany += b.howMany;
  }
  a.sourcePosition = a.sourcePosition._getTransformedByMergeOperation(b);
  a.targetPosition = a.targetPosition._getTransformedByMergeOperation(b);
  if (!a.graveyardPosition.isEqual(b.graveyardPosition) || !context.aIsStrong) {
    a.graveyardPosition = a.graveyardPosition._getTransformedByMergeOperation(b);
  }
  return [a];
});
setTransformation(mergeoperation_default, moveoperation_default, (a, b, context) => {
  const removedRange = range_default2._createFromPositionAndShift(b.sourcePosition, b.howMany);
  if (b.type == "remove" && !context.bWasUndone && !context.forceWeakRemove) {
    if (a.deletionPosition.hasSameParentAs(b.sourcePosition) && removedRange.containsPosition(a.sourcePosition)) {
      return [new nooperation_default(0)];
    }
  }
  if (a.sourcePosition.hasSameParentAs(b.targetPosition)) {
    a.howMany += b.howMany;
  }
  if (a.sourcePosition.hasSameParentAs(b.sourcePosition)) {
    a.howMany -= b.howMany;
  }
  a.sourcePosition = a.sourcePosition._getTransformedByMoveOperation(b);
  a.targetPosition = a.targetPosition._getTransformedByMoveOperation(b);
  if (!a.graveyardPosition.isEqual(b.targetPosition)) {
    a.graveyardPosition = a.graveyardPosition._getTransformedByMoveOperation(b);
  }
  return [a];
});
setTransformation(mergeoperation_default, splitoperation_default, (a, b, context) => {
  if (b.graveyardPosition) {
    a.graveyardPosition = a.graveyardPosition._getTransformedByDeletion(b.graveyardPosition, 1);
    if (a.deletionPosition.isEqual(b.graveyardPosition)) {
      a.howMany = b.howMany;
    }
  }
  if (a.targetPosition.isEqual(b.splitPosition)) {
    const mergeInside = b.howMany != 0;
    const mergeSplittingElement = b.graveyardPosition && a.deletionPosition.isEqual(b.graveyardPosition);
    if (mergeInside || mergeSplittingElement || context.abRelation == "mergeTargetNotMoved") {
      a.sourcePosition = a.sourcePosition._getTransformedBySplitOperation(b);
      return [a];
    }
  }
  if (a.sourcePosition.isEqual(b.splitPosition)) {
    if (context.abRelation == "mergeSourceNotMoved") {
      a.howMany = 0;
      a.targetPosition = a.targetPosition._getTransformedBySplitOperation(b);
      return [a];
    }
    if (context.abRelation == "mergeSameElement" || a.sourcePosition.offset > 0) {
      a.sourcePosition = b.moveTargetPosition.clone();
      a.targetPosition = a.targetPosition._getTransformedBySplitOperation(b);
      return [a];
    }
  }
  if (a.sourcePosition.hasSameParentAs(b.splitPosition)) {
    a.howMany = b.splitPosition.offset;
  }
  a.sourcePosition = a.sourcePosition._getTransformedBySplitOperation(b);
  a.targetPosition = a.targetPosition._getTransformedBySplitOperation(b);
  return [a];
});
setTransformation(moveoperation_default, insertoperation_default, (a, b) => {
  const moveRange = range_default2._createFromPositionAndShift(a.sourcePosition, a.howMany);
  const transformed = moveRange._getTransformedByInsertOperation(b, false)[0];
  a.sourcePosition = transformed.start;
  a.howMany = transformed.end.offset - transformed.start.offset;
  if (!a.targetPosition.isEqual(b.position)) {
    a.targetPosition = a.targetPosition._getTransformedByInsertOperation(b);
  }
  return [a];
});
setTransformation(moveoperation_default, moveoperation_default, (a, b, context) => {
  const rangeA = range_default2._createFromPositionAndShift(a.sourcePosition, a.howMany);
  const rangeB = range_default2._createFromPositionAndShift(b.sourcePosition, b.howMany);
  let aIsStrong = context.aIsStrong;
  let insertBefore = !context.aIsStrong;
  if (context.abRelation == "insertBefore" || context.baRelation == "insertAfter") {
    insertBefore = true;
  } else if (context.abRelation == "insertAfter" || context.baRelation == "insertBefore") {
    insertBefore = false;
  }
  let newTargetPosition;
  if (a.targetPosition.isEqual(b.targetPosition) && insertBefore) {
    newTargetPosition = a.targetPosition._getTransformedByDeletion(b.sourcePosition, b.howMany);
  } else {
    newTargetPosition = a.targetPosition._getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany);
  }
  if (_moveTargetIntoMovedRange(a, b) && _moveTargetIntoMovedRange(b, a)) {
    return [b.getReversed()];
  }
  const bTargetsToA = rangeA.containsPosition(b.targetPosition);
  if (bTargetsToA && rangeA.containsRange(rangeB, true)) {
    rangeA.start = rangeA.start._getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany);
    rangeA.end = rangeA.end._getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany);
    return _makeMoveOperationsFromRanges([rangeA], newTargetPosition);
  }
  const aTargetsToB = rangeB.containsPosition(a.targetPosition);
  if (aTargetsToB && rangeB.containsRange(rangeA, true)) {
    rangeA.start = rangeA.start._getCombined(b.sourcePosition, b.getMovedRangeStart());
    rangeA.end = rangeA.end._getCombined(b.sourcePosition, b.getMovedRangeStart());
    return _makeMoveOperationsFromRanges([rangeA], newTargetPosition);
  }
  const aCompB = compareArrays7(a.sourcePosition.getParentPath(), b.sourcePosition.getParentPath());
  if (aCompB == "prefix" || aCompB == "extension") {
    rangeA.start = rangeA.start._getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany);
    rangeA.end = rangeA.end._getTransformedByMove(b.sourcePosition, b.targetPosition, b.howMany);
    return _makeMoveOperationsFromRanges([rangeA], newTargetPosition);
  }
  if (a.type == "remove" && b.type != "remove" && !context.aWasUndone && !context.forceWeakRemove) {
    aIsStrong = true;
  } else if (a.type != "remove" && b.type == "remove" && !context.bWasUndone && !context.forceWeakRemove) {
    aIsStrong = false;
  }
  const ranges = [];
  const difference = rangeA.getDifference(rangeB);
  for (const range of difference) {
    range.start = range.start._getTransformedByDeletion(b.sourcePosition, b.howMany);
    range.end = range.end._getTransformedByDeletion(b.sourcePosition, b.howMany);
    const shouldSpread = compareArrays7(range.start.getParentPath(), b.getMovedRangeStart().getParentPath()) == "same";
    const newRanges = range._getTransformedByInsertion(b.getMovedRangeStart(), b.howMany, shouldSpread);
    ranges.push(...newRanges);
  }
  const common = rangeA.getIntersection(rangeB);
  if (common !== null && aIsStrong) {
    common.start = common.start._getCombined(b.sourcePosition, b.getMovedRangeStart());
    common.end = common.end._getCombined(b.sourcePosition, b.getMovedRangeStart());
    if (ranges.length === 0) {
      ranges.push(common);
    } else if (ranges.length == 1) {
      if (rangeB.start.isBefore(rangeA.start) || rangeB.start.isEqual(rangeA.start)) {
        ranges.unshift(common);
      } else {
        ranges.push(common);
      }
    } else {
      ranges.splice(1, 0, common);
    }
  }
  if (ranges.length === 0) {
    return [new nooperation_default(a.baseVersion)];
  }
  return _makeMoveOperationsFromRanges(ranges, newTargetPosition);
});
setTransformation(moveoperation_default, splitoperation_default, (a, b, context) => {
  let newTargetPosition = a.targetPosition.clone();
  if (!a.targetPosition.isEqual(b.insertionPosition) || !b.graveyardPosition || context.abRelation == "moveTargetAfter") {
    newTargetPosition = a.targetPosition._getTransformedBySplitOperation(b);
  }
  const moveRange = range_default2._createFromPositionAndShift(a.sourcePosition, a.howMany);
  if (moveRange.end.isEqual(b.insertionPosition)) {
    if (!b.graveyardPosition) {
      a.howMany++;
    }
    a.targetPosition = newTargetPosition;
    return [a];
  }
  if (moveRange.start.hasSameParentAs(b.splitPosition) && moveRange.containsPosition(b.splitPosition)) {
    let rightRange = new range_default2(b.splitPosition, moveRange.end);
    rightRange = rightRange._getTransformedBySplitOperation(b);
    const ranges2 = [
      new range_default2(moveRange.start, b.splitPosition),
      rightRange
    ];
    return _makeMoveOperationsFromRanges(ranges2, newTargetPosition);
  }
  if (a.targetPosition.isEqual(b.splitPosition) && context.abRelation == "insertAtSource") {
    newTargetPosition = b.moveTargetPosition;
  }
  if (a.targetPosition.isEqual(b.insertionPosition) && context.abRelation == "insertBetween") {
    newTargetPosition = a.targetPosition;
  }
  const transformed = moveRange._getTransformedBySplitOperation(b);
  const ranges = [transformed];
  if (b.graveyardPosition) {
    const movesGraveyardElement = moveRange.start.isEqual(b.graveyardPosition) || moveRange.containsPosition(b.graveyardPosition);
    if (a.howMany > 1 && movesGraveyardElement && !context.aWasUndone) {
      ranges.push(range_default2._createFromPositionAndShift(b.insertionPosition, 1));
    }
  }
  return _makeMoveOperationsFromRanges(ranges, newTargetPosition);
});
setTransformation(moveoperation_default, mergeoperation_default, (a, b, context) => {
  const movedRange = range_default2._createFromPositionAndShift(a.sourcePosition, a.howMany);
  if (b.deletionPosition.hasSameParentAs(a.sourcePosition) && movedRange.containsPosition(b.sourcePosition)) {
    if (a.type == "remove" && !context.forceWeakRemove) {
      if (!context.aWasUndone) {
        const results = [];
        let gyMoveSource = b.graveyardPosition.clone();
        let splitNodesMoveSource = b.targetPosition._getTransformedByMergeOperation(b);
        if (a.howMany > 1) {
          results.push(new moveoperation_default(a.sourcePosition, a.howMany - 1, a.targetPosition, 0));
          gyMoveSource = gyMoveSource._getTransformedByMove(a.sourcePosition, a.targetPosition, a.howMany - 1);
          splitNodesMoveSource = splitNodesMoveSource._getTransformedByMove(a.sourcePosition, a.targetPosition, a.howMany - 1);
        }
        const gyMoveTarget = b.deletionPosition._getCombined(a.sourcePosition, a.targetPosition);
        const gyMove = new moveoperation_default(gyMoveSource, 1, gyMoveTarget, 0);
        const splitNodesMoveTargetPath = gyMove.getMovedRangeStart().path.slice();
        splitNodesMoveTargetPath.push(0);
        const splitNodesMoveTarget = new position_default2(gyMove.targetPosition.root, splitNodesMoveTargetPath);
        splitNodesMoveSource = splitNodesMoveSource._getTransformedByMove(gyMoveSource, gyMoveTarget, 1);
        const splitNodesMove = new moveoperation_default(splitNodesMoveSource, b.howMany, splitNodesMoveTarget, 0);
        results.push(gyMove);
        results.push(splitNodesMove);
        return results;
      }
    } else {
      if (a.howMany == 1) {
        if (!context.bWasUndone) {
          return [new nooperation_default(0)];
        } else {
          a.sourcePosition = b.graveyardPosition.clone();
          a.targetPosition = a.targetPosition._getTransformedByMergeOperation(b);
          return [a];
        }
      }
    }
  }
  const moveRange = range_default2._createFromPositionAndShift(a.sourcePosition, a.howMany);
  const transformed = moveRange._getTransformedByMergeOperation(b);
  a.sourcePosition = transformed.start;
  a.howMany = transformed.end.offset - transformed.start.offset;
  a.targetPosition = a.targetPosition._getTransformedByMergeOperation(b);
  return [a];
});
setTransformation(renameoperation_default, insertoperation_default, (a, b) => {
  a.position = a.position._getTransformedByInsertOperation(b);
  return [a];
});
setTransformation(renameoperation_default, mergeoperation_default, (a, b) => {
  if (a.position.isEqual(b.deletionPosition)) {
    a.position = b.graveyardPosition.clone();
    a.position.stickiness = "toNext";
    return [a];
  }
  a.position = a.position._getTransformedByMergeOperation(b);
  return [a];
});
setTransformation(renameoperation_default, moveoperation_default, (a, b) => {
  a.position = a.position._getTransformedByMoveOperation(b);
  return [a];
});
setTransformation(renameoperation_default, renameoperation_default, (a, b, context) => {
  if (a.position.isEqual(b.position)) {
    if (context.aIsStrong) {
      a.oldName = b.newName;
    } else {
      return [new nooperation_default(0)];
    }
  }
  return [a];
});
setTransformation(renameoperation_default, splitoperation_default, (a, b) => {
  const renamePath = a.position.path;
  const splitPath = b.splitPosition.getParentPath();
  if (compareArrays7(renamePath, splitPath) == "same" && !b.graveyardPosition) {
    const extraRename = new renameoperation_default(a.position.getShiftedBy(1), a.oldName, a.newName, 0);
    return [a, extraRename];
  }
  a.position = a.position._getTransformedBySplitOperation(b);
  return [a];
});
setTransformation(rootattributeoperation_default, rootattributeoperation_default, (a, b, context) => {
  if (a.root === b.root && a.key === b.key) {
    if (!context.aIsStrong || a.newValue === b.newValue) {
      return [new nooperation_default(0)];
    } else {
      a.oldValue = b.newValue;
    }
  }
  return [a];
});
setTransformation(rootoperation_default, rootoperation_default, (a, b) => {
  if (a.rootName === b.rootName && a.isAdd === b.isAdd) {
    return [new nooperation_default(0)];
  }
  return [a];
});
setTransformation(splitoperation_default, insertoperation_default, (a, b) => {
  if (a.splitPosition.hasSameParentAs(b.position) && a.splitPosition.offset < b.position.offset) {
    a.howMany += b.howMany;
  }
  a.splitPosition = a.splitPosition._getTransformedByInsertOperation(b);
  a.insertionPosition = a.insertionPosition._getTransformedByInsertOperation(b);
  return [a];
});
setTransformation(splitoperation_default, mergeoperation_default, (a, b, context) => {
  if (!a.graveyardPosition && !context.bWasUndone && a.splitPosition.hasSameParentAs(b.sourcePosition)) {
    const splitPath = b.graveyardPosition.path.slice();
    splitPath.push(0);
    const splitPosition = new position_default2(b.graveyardPosition.root, splitPath);
    const insertionPosition = splitoperation_default.getInsertionPosition(new position_default2(b.graveyardPosition.root, splitPath));
    const additionalSplit = new splitoperation_default(splitPosition, 0, insertionPosition, null, 0);
    a.splitPosition = a.splitPosition._getTransformedByMergeOperation(b);
    a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
    a.graveyardPosition = additionalSplit.insertionPosition.clone();
    a.graveyardPosition.stickiness = "toNext";
    return [additionalSplit, a];
  }
  if (a.splitPosition.hasSameParentAs(b.deletionPosition) && !a.splitPosition.isAfter(b.deletionPosition)) {
    a.howMany--;
  }
  if (a.splitPosition.hasSameParentAs(b.targetPosition)) {
    a.howMany += b.howMany;
  }
  a.splitPosition = a.splitPosition._getTransformedByMergeOperation(b);
  a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
  if (a.graveyardPosition) {
    a.graveyardPosition = a.graveyardPosition._getTransformedByMergeOperation(b);
  }
  return [a];
});
setTransformation(splitoperation_default, moveoperation_default, (a, b, context) => {
  const rangeToMove = range_default2._createFromPositionAndShift(b.sourcePosition, b.howMany);
  if (a.graveyardPosition) {
    const gyElementMoved = rangeToMove.start.isEqual(a.graveyardPosition) || rangeToMove.containsPosition(a.graveyardPosition);
    if (!context.bWasUndone && gyElementMoved) {
      const sourcePosition = a.splitPosition._getTransformedByMoveOperation(b);
      const newParentPosition = a.graveyardPosition._getTransformedByMoveOperation(b);
      const newTargetPath = newParentPosition.path.slice();
      newTargetPath.push(0);
      const newTargetPosition = new position_default2(newParentPosition.root, newTargetPath);
      const moveOp = new moveoperation_default(sourcePosition, a.howMany, newTargetPosition, 0);
      return [moveOp];
    }
    a.graveyardPosition = a.graveyardPosition._getTransformedByMoveOperation(b);
  }
  const splitAtTarget = a.splitPosition.isEqual(b.targetPosition);
  if (splitAtTarget && (context.baRelation == "insertAtSource" || context.abRelation == "splitBefore")) {
    a.howMany += b.howMany;
    a.splitPosition = a.splitPosition._getTransformedByDeletion(b.sourcePosition, b.howMany);
    a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
    return [a];
  }
  if (splitAtTarget && context.abRelation && context.abRelation.howMany) {
    const {howMany, offset} = context.abRelation;
    a.howMany += howMany;
    a.splitPosition = a.splitPosition.getShiftedBy(offset);
    return [a];
  }
  if (a.splitPosition.hasSameParentAs(b.sourcePosition) && rangeToMove.containsPosition(a.splitPosition)) {
    const howManyRemoved = b.howMany - (a.splitPosition.offset - b.sourcePosition.offset);
    a.howMany -= howManyRemoved;
    if (a.splitPosition.hasSameParentAs(b.targetPosition) && a.splitPosition.offset < b.targetPosition.offset) {
      a.howMany += b.howMany;
    }
    a.splitPosition = b.sourcePosition.clone();
    a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
    return [a];
  }
  if (!b.sourcePosition.isEqual(b.targetPosition)) {
    if (a.splitPosition.hasSameParentAs(b.sourcePosition) && a.splitPosition.offset <= b.sourcePosition.offset) {
      a.howMany -= b.howMany;
    }
    if (a.splitPosition.hasSameParentAs(b.targetPosition) && a.splitPosition.offset < b.targetPosition.offset) {
      a.howMany += b.howMany;
    }
  }
  a.splitPosition.stickiness = "toNone";
  a.splitPosition = a.splitPosition._getTransformedByMoveOperation(b);
  a.splitPosition.stickiness = "toNext";
  if (a.graveyardPosition) {
    a.insertionPosition = a.insertionPosition._getTransformedByMoveOperation(b);
  } else {
    a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
  }
  return [a];
});
setTransformation(splitoperation_default, splitoperation_default, (a, b, context) => {
  if (a.splitPosition.isEqual(b.splitPosition)) {
    if (!a.graveyardPosition && !b.graveyardPosition) {
      return [new nooperation_default(0)];
    }
    if (a.graveyardPosition && b.graveyardPosition && a.graveyardPosition.isEqual(b.graveyardPosition)) {
      return [new nooperation_default(0)];
    }
    if (context.abRelation == "splitBefore") {
      a.howMany = 0;
      a.graveyardPosition = a.graveyardPosition._getTransformedBySplitOperation(b);
      return [a];
    }
  }
  if (a.graveyardPosition && b.graveyardPosition && a.graveyardPosition.isEqual(b.graveyardPosition)) {
    const aInGraveyard = a.splitPosition.root.rootName == "$graveyard";
    const bInGraveyard = b.splitPosition.root.rootName == "$graveyard";
    const aIsWeak = aInGraveyard && !bInGraveyard;
    const bIsWeak = bInGraveyard && !aInGraveyard;
    const forceMove = bIsWeak || !aIsWeak && context.aIsStrong;
    if (forceMove) {
      const result = [];
      if (b.howMany) {
        result.push(new moveoperation_default(b.moveTargetPosition, b.howMany, b.splitPosition, 0));
      }
      if (a.howMany) {
        result.push(new moveoperation_default(a.splitPosition, a.howMany, a.moveTargetPosition, 0));
      }
      return result;
    } else {
      return [new nooperation_default(0)];
    }
  }
  if (a.graveyardPosition) {
    a.graveyardPosition = a.graveyardPosition._getTransformedBySplitOperation(b);
  }
  if (a.splitPosition.isEqual(b.insertionPosition) && context.abRelation == "splitBefore") {
    a.howMany++;
    return [a];
  }
  if (b.splitPosition.isEqual(a.insertionPosition) && context.baRelation == "splitBefore") {
    const newPositionPath = b.insertionPosition.path.slice();
    newPositionPath.push(0);
    const newPosition = new position_default2(b.insertionPosition.root, newPositionPath);
    const moveOp = new moveoperation_default(a.insertionPosition, 1, newPosition, 0);
    return [a, moveOp];
  }
  if (a.splitPosition.hasSameParentAs(b.splitPosition) && a.splitPosition.offset < b.splitPosition.offset) {
    a.howMany -= b.howMany;
  }
  a.splitPosition = a.splitPosition._getTransformedBySplitOperation(b);
  a.insertionPosition = splitoperation_default.getInsertionPosition(a.splitPosition);
  return [a];
});
function _moveTargetIntoMovedRange(a, b) {
  return a.targetPosition._getTransformedByDeletion(b.sourcePosition, b.howMany) === null;
}
function _makeMoveOperationsFromRanges(ranges, targetPosition) {
  const operations2 = [];
  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];
    const op = new moveoperation_default(range.start, range.end.offset - range.start.offset, targetPosition, 0);
    operations2.push(op);
    for (let j = i + 1; j < ranges.length; j++) {
      ranges[j] = ranges[j]._getTransformedByMove(op.sourcePosition, op.targetPosition, op.howMany)[0];
    }
    targetPosition = targetPosition._getTransformedByMove(op.sourcePosition, op.targetPosition, op.howMany);
  }
  return operations2;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/liveposition.js
import {CKEditorError as CKEditorError39, EmitterMixin as EmitterMixin13} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var LivePosition = class extends EmitterMixin13(position_default2) {
  constructor(root, path, stickiness = "toNone") {
    super(root, path, stickiness);
    if (!this.root.is("rootElement")) {
      throw new CKEditorError39("model-liveposition-root-not-rootelement", root);
    }
    bindWithDocument2.call(this);
  }
  detach() {
    this.stopListening();
  }
  toPosition() {
    return new position_default2(this.root, this.path.slice(), this.stickiness);
  }
  static fromPosition(position, stickiness) {
    return new this(position.root, position.path.slice(), stickiness ? stickiness : position.stickiness);
  }
};
var liveposition_default = LivePosition;
LivePosition.prototype.is = function(type) {
  return type === "livePosition" || type === "model:livePosition" || type == "position" || type === "model:position";
};
function bindWithDocument2() {
  this.listenTo(this.root.document.model, "applyOperation", (event, args) => {
    const operation = args[0];
    if (!operation.isDocumentOperation) {
      return;
    }
    transform3.call(this, operation);
  }, {priority: "low"});
}
function transform3(operation) {
  const result = this.getTransformedByOperation(operation);
  if (!this.isEqual(result)) {
    const oldPosition = this.toPosition();
    this.path = result.path;
    this.root = result.root;
    this.fire("change", oldPosition);
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/batch.js
import {logWarning as logWarning5} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Batch = class {
  constructor(type = {}) {
    if (typeof type === "string") {
      type = type === "transparent" ? {isUndoable: false} : {};
      logWarning5("batch-constructor-deprecated-string-type");
    }
    const {isUndoable = true, isLocal = true, isUndo = false, isTyping = false} = type;
    this.operations = [];
    this.isUndoable = isUndoable;
    this.isLocal = isLocal;
    this.isUndo = isUndo;
    this.isTyping = isTyping;
  }
  get type() {
    logWarning5("batch-type-deprecated");
    return "default";
  }
  get baseVersion() {
    for (const op of this.operations) {
      if (op.baseVersion !== null) {
        return op.baseVersion;
      }
    }
    return null;
  }
  addOperation(operation) {
    operation.batch = this;
    this.operations.push(operation);
    return operation;
  }
};
var batch_default = Batch;

// node_modules/@ckeditor/ckeditor5-engine/src/model/differ.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Differ = class {
  constructor(markerCollection) {
    this._changesInElement = new Map();
    this._elementSnapshots = new Map();
    this._changedMarkers = new Map();
    this._changedRoots = new Map();
    this._changeCount = 0;
    this._cachedChanges = null;
    this._cachedChangesWithGraveyard = null;
    this._refreshedItems = new Set();
    this._markerCollection = markerCollection;
  }
  get isEmpty() {
    return this._changesInElement.size == 0 && this._changedMarkers.size == 0 && this._changedRoots.size == 0;
  }
  bufferOperation(operationToBuffer) {
    const operation = operationToBuffer;
    switch (operation.type) {
      case "insert": {
        if (this._isInInsertedElement(operation.position.parent)) {
          return;
        }
        this._markInsert(operation.position.parent, operation.position.offset, operation.nodes.maxOffset);
        break;
      }
      case "addAttribute":
      case "removeAttribute":
      case "changeAttribute": {
        for (const item of operation.range.getItems({shallow: true})) {
          if (this._isInInsertedElement(item.parent)) {
            continue;
          }
          this._markAttribute(item);
        }
        break;
      }
      case "remove":
      case "move":
      case "reinsert": {
        if (operation.sourcePosition.isEqual(operation.targetPosition) || operation.sourcePosition.getShiftedBy(operation.howMany).isEqual(operation.targetPosition)) {
          return;
        }
        const sourceParentInserted = this._isInInsertedElement(operation.sourcePosition.parent);
        const targetParentInserted = this._isInInsertedElement(operation.targetPosition.parent);
        if (!sourceParentInserted) {
          this._markRemove(operation.sourcePosition.parent, operation.sourcePosition.offset, operation.howMany);
        }
        if (!targetParentInserted) {
          this._markInsert(operation.targetPosition.parent, operation.getMovedRangeStart().offset, operation.howMany);
        }
        break;
      }
      case "rename": {
        if (this._isInInsertedElement(operation.position.parent)) {
          return;
        }
        this._markRemove(operation.position.parent, operation.position.offset, 1);
        this._markInsert(operation.position.parent, operation.position.offset, 1);
        const range = range_default2._createFromPositionAndShift(operation.position, 1);
        for (const marker of this._markerCollection.getMarkersIntersectingRange(range)) {
          const markerData = marker.getData();
          this.bufferMarkerChange(marker.name, markerData, markerData);
        }
        break;
      }
      case "split": {
        const splitElement = operation.splitPosition.parent;
        if (!this._isInInsertedElement(splitElement)) {
          this._markRemove(splitElement, operation.splitPosition.offset, operation.howMany);
        }
        if (!this._isInInsertedElement(operation.insertionPosition.parent)) {
          this._markInsert(operation.insertionPosition.parent, operation.insertionPosition.offset, 1);
        }
        if (operation.graveyardPosition) {
          this._markRemove(operation.graveyardPosition.parent, operation.graveyardPosition.offset, 1);
        }
        break;
      }
      case "merge": {
        const mergedElement = operation.sourcePosition.parent;
        if (!this._isInInsertedElement(mergedElement.parent)) {
          this._markRemove(mergedElement.parent, mergedElement.startOffset, 1);
        }
        const graveyardParent = operation.graveyardPosition.parent;
        this._markInsert(graveyardParent, operation.graveyardPosition.offset, 1);
        const mergedIntoElement = operation.targetPosition.parent;
        if (!this._isInInsertedElement(mergedIntoElement)) {
          this._markInsert(mergedIntoElement, operation.targetPosition.offset, mergedElement.maxOffset);
        }
        break;
      }
      case "detachRoot":
      case "addRoot": {
        const root = operation.affectedSelectable;
        if (!root._isLoaded) {
          return;
        }
        if (root.isAttached() == operation.isAdd) {
          return;
        }
        this._bufferRootStateChange(operation.rootName, operation.isAdd);
        break;
      }
      case "addRootAttribute":
      case "removeRootAttribute":
      case "changeRootAttribute": {
        if (!operation.root._isLoaded) {
          return;
        }
        const rootName = operation.root.rootName;
        this._bufferRootAttributeChange(rootName, operation.key, operation.oldValue, operation.newValue);
        break;
      }
    }
    this._cachedChanges = null;
  }
  bufferMarkerChange(markerName, oldMarkerData, newMarkerData) {
    if (oldMarkerData.range && oldMarkerData.range.root.is("rootElement") && !oldMarkerData.range.root._isLoaded) {
      oldMarkerData.range = null;
    }
    if (newMarkerData.range && newMarkerData.range.root.is("rootElement") && !newMarkerData.range.root._isLoaded) {
      newMarkerData.range = null;
    }
    let buffered = this._changedMarkers.get(markerName);
    if (!buffered) {
      buffered = {newMarkerData, oldMarkerData};
      this._changedMarkers.set(markerName, buffered);
    } else {
      buffered.newMarkerData = newMarkerData;
    }
    if (buffered.oldMarkerData.range == null && newMarkerData.range == null) {
      this._changedMarkers.delete(markerName);
    }
  }
  getMarkersToRemove() {
    const result = [];
    for (const [name, change] of this._changedMarkers) {
      if (change.oldMarkerData.range != null) {
        result.push({name, range: change.oldMarkerData.range});
      }
    }
    return result;
  }
  getMarkersToAdd() {
    const result = [];
    for (const [name, change] of this._changedMarkers) {
      if (change.newMarkerData.range != null) {
        result.push({name, range: change.newMarkerData.range});
      }
    }
    return result;
  }
  getChangedMarkers() {
    return Array.from(this._changedMarkers).map(([name, change]) => ({
      name,
      data: {
        oldRange: change.oldMarkerData.range,
        newRange: change.newMarkerData.range
      }
    }));
  }
  hasDataChanges() {
    if (this._changesInElement.size > 0) {
      return true;
    }
    if (this._changedRoots.size > 0) {
      return true;
    }
    for (const {newMarkerData, oldMarkerData} of this._changedMarkers.values()) {
      if (newMarkerData.affectsData !== oldMarkerData.affectsData) {
        return true;
      }
      if (newMarkerData.affectsData) {
        const markerAdded = newMarkerData.range && !oldMarkerData.range;
        const markerRemoved = !newMarkerData.range && oldMarkerData.range;
        const markerChanged = newMarkerData.range && oldMarkerData.range && !newMarkerData.range.isEqual(oldMarkerData.range);
        if (markerAdded || markerRemoved || markerChanged) {
          return true;
        }
      }
    }
    return false;
  }
  getChanges(options = {}) {
    if (this._cachedChanges) {
      if (options.includeChangesInGraveyard) {
        return this._cachedChangesWithGraveyard.slice();
      } else {
        return this._cachedChanges.slice();
      }
    }
    let diffSet = [];
    for (const element of this._changesInElement.keys()) {
      const changes = this._changesInElement.get(element).sort((a, b) => {
        if (a.offset === b.offset) {
          if (a.type != b.type) {
            return a.type == "remove" ? -1 : 1;
          }
          return 0;
        }
        return a.offset < b.offset ? -1 : 1;
      });
      const snapshotChildren = this._elementSnapshots.get(element);
      const elementChildren = _getChildrenSnapshot(element.getChildren());
      const actions = _generateActionsFromChanges(snapshotChildren.length, changes);
      let i = 0;
      let j = 0;
      for (const action of actions) {
        if (action === "i") {
          diffSet.push(this._getInsertDiff(element, i, elementChildren[i]));
          i++;
        } else if (action === "r") {
          diffSet.push(this._getRemoveDiff(element, i, snapshotChildren[j]));
          j++;
        } else if (action === "a") {
          const elementAttributes = elementChildren[i].attributes;
          const snapshotAttributes = snapshotChildren[j].attributes;
          let range;
          if (elementChildren[i].name == "$text") {
            range = new range_default2(position_default2._createAt(element, i), position_default2._createAt(element, i + 1));
          } else {
            const index = element.offsetToIndex(i);
            range = new range_default2(position_default2._createAt(element, i), position_default2._createAt(element.getChild(index), 0));
          }
          diffSet.push(...this._getAttributesDiff(range, snapshotAttributes, elementAttributes));
          i++;
          j++;
        } else {
          i++;
          j++;
        }
      }
    }
    diffSet.sort((a, b) => {
      if (a.position.root != b.position.root) {
        return a.position.root.rootName < b.position.root.rootName ? -1 : 1;
      }
      if (a.position.isEqual(b.position)) {
        return a.changeCount - b.changeCount;
      }
      return a.position.isBefore(b.position) ? -1 : 1;
    });
    for (let i = 1, prevIndex = 0; i < diffSet.length; i++) {
      const prevDiff = diffSet[prevIndex];
      const thisDiff = diffSet[i];
      const isConsecutiveTextRemove = prevDiff.type == "remove" && thisDiff.type == "remove" && prevDiff.name == "$text" && thisDiff.name == "$text" && prevDiff.position.isEqual(thisDiff.position);
      const isConsecutiveTextAdd = prevDiff.type == "insert" && thisDiff.type == "insert" && prevDiff.name == "$text" && thisDiff.name == "$text" && prevDiff.position.parent == thisDiff.position.parent && prevDiff.position.offset + prevDiff.length == thisDiff.position.offset;
      const isConsecutiveAttributeChange = prevDiff.type == "attribute" && thisDiff.type == "attribute" && prevDiff.position.parent == thisDiff.position.parent && prevDiff.range.isFlat && thisDiff.range.isFlat && prevDiff.position.offset + prevDiff.length == thisDiff.position.offset && prevDiff.attributeKey == thisDiff.attributeKey && prevDiff.attributeOldValue == thisDiff.attributeOldValue && prevDiff.attributeNewValue == thisDiff.attributeNewValue;
      if (isConsecutiveTextRemove || isConsecutiveTextAdd || isConsecutiveAttributeChange) {
        prevDiff.length++;
        if (isConsecutiveAttributeChange) {
          prevDiff.range.end = prevDiff.range.end.getShiftedBy(1);
        }
        diffSet[i] = null;
      } else {
        prevIndex = i;
      }
    }
    diffSet = diffSet.filter((v) => v);
    for (const item of diffSet) {
      delete item.changeCount;
      if (item.type == "attribute") {
        delete item.position;
        delete item.length;
      }
    }
    this._changeCount = 0;
    this._cachedChangesWithGraveyard = diffSet;
    this._cachedChanges = diffSet.filter(_changesInGraveyardFilter);
    if (options.includeChangesInGraveyard) {
      return this._cachedChangesWithGraveyard.slice();
    } else {
      return this._cachedChanges.slice();
    }
  }
  getChangedRoots() {
    return Array.from(this._changedRoots.values()).map((diffItem) => {
      const entry = {...diffItem};
      if (entry.state !== void 0) {
        delete entry.attributes;
      }
      return entry;
    });
  }
  getRefreshedItems() {
    return new Set(this._refreshedItems);
  }
  reset() {
    this._changesInElement.clear();
    this._elementSnapshots.clear();
    this._changedMarkers.clear();
    this._changedRoots.clear();
    this._refreshedItems = new Set();
    this._cachedChanges = null;
  }
  _bufferRootStateChange(rootName, isAttached) {
    if (!this._changedRoots.has(rootName)) {
      this._changedRoots.set(rootName, {name: rootName, state: isAttached ? "attached" : "detached"});
      return;
    }
    const diffItem = this._changedRoots.get(rootName);
    if (diffItem.state !== void 0) {
      delete diffItem.state;
      if (diffItem.attributes === void 0) {
        this._changedRoots.delete(rootName);
      }
    } else {
      diffItem.state = isAttached ? "attached" : "detached";
    }
  }
  _bufferRootAttributeChange(rootName, key, oldValue, newValue) {
    const diffItem = this._changedRoots.get(rootName) || {name: rootName};
    const attrs = diffItem.attributes || {};
    if (attrs[key]) {
      const attrEntry = attrs[key];
      if (newValue === attrEntry.oldValue) {
        delete attrs[key];
      } else {
        attrEntry.newValue = newValue;
      }
    } else {
      attrs[key] = {oldValue, newValue};
    }
    if (Object.entries(attrs).length === 0) {
      delete diffItem.attributes;
      if (diffItem.state === void 0) {
        this._changedRoots.delete(rootName);
      }
    } else {
      diffItem.attributes = attrs;
      this._changedRoots.set(rootName, diffItem);
    }
  }
  _refreshItem(item) {
    if (this._isInInsertedElement(item.parent)) {
      return;
    }
    this._markRemove(item.parent, item.startOffset, item.offsetSize);
    this._markInsert(item.parent, item.startOffset, item.offsetSize);
    this._refreshedItems.add(item);
    const range = range_default2._createOn(item);
    for (const marker of this._markerCollection.getMarkersIntersectingRange(range)) {
      const markerData = marker.getData();
      this.bufferMarkerChange(marker.name, markerData, markerData);
    }
    this._cachedChanges = null;
  }
  _bufferRootLoad(root) {
    if (!root.isAttached()) {
      return;
    }
    this._bufferRootStateChange(root.rootName, true);
    this._markInsert(root, 0, root.maxOffset);
    for (const key of root.getAttributeKeys()) {
      this._bufferRootAttributeChange(root.rootName, key, null, root.getAttribute(key));
    }
    for (const marker of this._markerCollection) {
      if (marker.getRange().root == root) {
        const markerData = marker.getData();
        this.bufferMarkerChange(marker.name, {...markerData, range: null}, markerData);
      }
    }
  }
  _markInsert(parent, offset, howMany) {
    if (parent.root.is("rootElement") && !parent.root._isLoaded) {
      return;
    }
    const changeItem = {type: "insert", offset, howMany, count: this._changeCount++};
    this._markChange(parent, changeItem);
  }
  _markRemove(parent, offset, howMany) {
    if (parent.root.is("rootElement") && !parent.root._isLoaded) {
      return;
    }
    const changeItem = {type: "remove", offset, howMany, count: this._changeCount++};
    this._markChange(parent, changeItem);
    this._removeAllNestedChanges(parent, offset, howMany);
  }
  _markAttribute(item) {
    if (item.root.is("rootElement") && !item.root._isLoaded) {
      return;
    }
    const changeItem = {type: "attribute", offset: item.startOffset, howMany: item.offsetSize, count: this._changeCount++};
    this._markChange(item.parent, changeItem);
  }
  _markChange(parent, changeItem) {
    this._makeSnapshot(parent);
    const changes = this._getChangesForElement(parent);
    this._handleChange(changeItem, changes);
    changes.push(changeItem);
    for (let i = 0; i < changes.length; i++) {
      if (changes[i].howMany < 1) {
        changes.splice(i, 1);
        i--;
      }
    }
  }
  _getChangesForElement(element) {
    let changes;
    if (this._changesInElement.has(element)) {
      changes = this._changesInElement.get(element);
    } else {
      changes = [];
      this._changesInElement.set(element, changes);
    }
    return changes;
  }
  _makeSnapshot(element) {
    if (!this._elementSnapshots.has(element)) {
      this._elementSnapshots.set(element, _getChildrenSnapshot(element.getChildren()));
    }
  }
  _handleChange(inc, changes) {
    inc.nodesToHandle = inc.howMany;
    for (const old of changes) {
      const incEnd = inc.offset + inc.howMany;
      const oldEnd = old.offset + old.howMany;
      if (inc.type == "insert") {
        if (old.type == "insert") {
          if (inc.offset <= old.offset) {
            old.offset += inc.howMany;
          } else if (inc.offset < oldEnd) {
            old.howMany += inc.nodesToHandle;
            inc.nodesToHandle = 0;
          }
        }
        if (old.type == "remove") {
          if (inc.offset < old.offset) {
            old.offset += inc.howMany;
          }
        }
        if (old.type == "attribute") {
          if (inc.offset <= old.offset) {
            old.offset += inc.howMany;
          } else if (inc.offset < oldEnd) {
            const howMany = old.howMany;
            old.howMany = inc.offset - old.offset;
            changes.unshift({
              type: "attribute",
              offset: incEnd,
              howMany: howMany - old.howMany,
              count: this._changeCount++
            });
          }
        }
      }
      if (inc.type == "remove") {
        if (old.type == "insert") {
          if (incEnd <= old.offset) {
            old.offset -= inc.howMany;
          } else if (incEnd <= oldEnd) {
            if (inc.offset < old.offset) {
              const intersectionLength = incEnd - old.offset;
              old.offset = inc.offset;
              old.howMany -= intersectionLength;
              inc.nodesToHandle -= intersectionLength;
            } else {
              old.howMany -= inc.nodesToHandle;
              inc.nodesToHandle = 0;
            }
          } else {
            if (inc.offset <= old.offset) {
              inc.nodesToHandle -= old.howMany;
              old.howMany = 0;
            } else if (inc.offset < oldEnd) {
              const intersectionLength = oldEnd - inc.offset;
              old.howMany -= intersectionLength;
              inc.nodesToHandle -= intersectionLength;
            }
          }
        }
        if (old.type == "remove") {
          if (incEnd <= old.offset) {
            old.offset -= inc.howMany;
          } else if (inc.offset < old.offset) {
            inc.nodesToHandle += old.howMany;
            old.howMany = 0;
          }
        }
        if (old.type == "attribute") {
          if (incEnd <= old.offset) {
            old.offset -= inc.howMany;
          } else if (inc.offset < old.offset) {
            const intersectionLength = incEnd - old.offset;
            old.offset = inc.offset;
            old.howMany -= intersectionLength;
          } else if (inc.offset < oldEnd) {
            if (incEnd <= oldEnd) {
              const howMany = old.howMany;
              old.howMany = inc.offset - old.offset;
              const howManyAfter = howMany - old.howMany - inc.nodesToHandle;
              changes.unshift({
                type: "attribute",
                offset: inc.offset,
                howMany: howManyAfter,
                count: this._changeCount++
              });
            } else {
              old.howMany -= oldEnd - inc.offset;
            }
          }
        }
      }
      if (inc.type == "attribute") {
        if (old.type == "insert") {
          if (inc.offset < old.offset && incEnd > old.offset) {
            if (incEnd > oldEnd) {
              const attributePart = {
                type: "attribute",
                offset: oldEnd,
                howMany: incEnd - oldEnd,
                count: this._changeCount++
              };
              this._handleChange(attributePart, changes);
              changes.push(attributePart);
            }
            inc.nodesToHandle = old.offset - inc.offset;
            inc.howMany = inc.nodesToHandle;
          } else if (inc.offset >= old.offset && inc.offset < oldEnd) {
            if (incEnd > oldEnd) {
              inc.nodesToHandle = incEnd - oldEnd;
              inc.offset = oldEnd;
            } else {
              inc.nodesToHandle = 0;
            }
          }
        }
        if (old.type == "remove") {
          if (inc.offset < old.offset && incEnd > old.offset) {
            const attributePart = {
              type: "attribute",
              offset: old.offset,
              howMany: incEnd - old.offset,
              count: this._changeCount++
            };
            this._handleChange(attributePart, changes);
            changes.push(attributePart);
            inc.nodesToHandle = old.offset - inc.offset;
            inc.howMany = inc.nodesToHandle;
          }
        }
        if (old.type == "attribute") {
          if (inc.offset >= old.offset && incEnd <= oldEnd) {
            inc.nodesToHandle = 0;
            inc.howMany = 0;
            inc.offset = 0;
          } else if (inc.offset <= old.offset && incEnd >= oldEnd) {
            old.howMany = 0;
          }
        }
      }
    }
    inc.howMany = inc.nodesToHandle;
    delete inc.nodesToHandle;
  }
  _getInsertDiff(parent, offset, elementSnapshot) {
    return {
      type: "insert",
      position: position_default2._createAt(parent, offset),
      name: elementSnapshot.name,
      attributes: new Map(elementSnapshot.attributes),
      length: 1,
      changeCount: this._changeCount++
    };
  }
  _getRemoveDiff(parent, offset, elementSnapshot) {
    return {
      type: "remove",
      position: position_default2._createAt(parent, offset),
      name: elementSnapshot.name,
      attributes: new Map(elementSnapshot.attributes),
      length: 1,
      changeCount: this._changeCount++
    };
  }
  _getAttributesDiff(range, oldAttributes, newAttributes) {
    const diffs = [];
    newAttributes = new Map(newAttributes);
    for (const [key, oldValue] of oldAttributes) {
      const newValue = newAttributes.has(key) ? newAttributes.get(key) : null;
      if (newValue !== oldValue) {
        diffs.push({
          type: "attribute",
          position: range.start,
          range: range.clone(),
          length: 1,
          attributeKey: key,
          attributeOldValue: oldValue,
          attributeNewValue: newValue,
          changeCount: this._changeCount++
        });
      }
      newAttributes.delete(key);
    }
    for (const [key, newValue] of newAttributes) {
      diffs.push({
        type: "attribute",
        position: range.start,
        range: range.clone(),
        length: 1,
        attributeKey: key,
        attributeOldValue: null,
        attributeNewValue: newValue,
        changeCount: this._changeCount++
      });
    }
    return diffs;
  }
  _isInInsertedElement(element) {
    const parent = element.parent;
    if (!parent) {
      return false;
    }
    const changes = this._changesInElement.get(parent);
    const offset = element.startOffset;
    if (changes) {
      for (const change of changes) {
        if (change.type == "insert" && offset >= change.offset && offset < change.offset + change.howMany) {
          return true;
        }
      }
    }
    return this._isInInsertedElement(parent);
  }
  _removeAllNestedChanges(parent, offset, howMany) {
    const range = new range_default2(position_default2._createAt(parent, offset), position_default2._createAt(parent, offset + howMany));
    for (const item of range.getItems({shallow: true})) {
      if (item.is("element")) {
        this._elementSnapshots.delete(item);
        this._changesInElement.delete(item);
        this._removeAllNestedChanges(item, 0, item.maxOffset);
      }
    }
  }
};
var differ_default = Differ;
function _getChildrenSnapshot(children) {
  const snapshot = [];
  for (const child of children) {
    if (child.is("$text")) {
      for (let i = 0; i < child.data.length; i++) {
        snapshot.push({
          name: "$text",
          attributes: new Map(child.getAttributes())
        });
      }
    } else {
      snapshot.push({
        name: child.name,
        attributes: new Map(child.getAttributes())
      });
    }
  }
  return snapshot;
}
function _generateActionsFromChanges(oldChildrenLength, changes) {
  const actions = [];
  let offset = 0;
  let oldChildrenHandled = 0;
  for (const change of changes) {
    if (change.offset > offset) {
      for (let i = 0; i < change.offset - offset; i++) {
        actions.push("e");
      }
      oldChildrenHandled += change.offset - offset;
    }
    if (change.type == "insert") {
      for (let i = 0; i < change.howMany; i++) {
        actions.push("i");
      }
      offset = change.offset + change.howMany;
    } else if (change.type == "remove") {
      for (let i = 0; i < change.howMany; i++) {
        actions.push("r");
      }
      offset = change.offset;
      oldChildrenHandled += change.howMany;
    } else {
      actions.push(..."a".repeat(change.howMany).split(""));
      offset = change.offset + change.howMany;
      oldChildrenHandled += change.howMany;
    }
  }
  if (oldChildrenHandled < oldChildrenLength) {
    for (let i = 0; i < oldChildrenLength - oldChildrenHandled - offset; i++) {
      actions.push("e");
    }
  }
  return actions;
}
function _changesInGraveyardFilter(entry) {
  const posInGy = "position" in entry && entry.position.root.rootName == "$graveyard";
  const rangeInGy = "range" in entry && entry.range.root.rootName == "$graveyard";
  return !posInGy && !rangeInGy;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/history.js
import {CKEditorError as CKEditorError40} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var History = class {
  constructor() {
    this._operations = [];
    this._undoPairs = new Map();
    this._undoneOperations = new Set();
    this._baseVersionToOperationIndex = new Map();
    this._version = 0;
    this._gaps = new Map();
  }
  get version() {
    return this._version;
  }
  set version(version) {
    if (this._operations.length && version > this._version + 1) {
      this._gaps.set(this._version, version);
    }
    this._version = version;
  }
  get lastOperation() {
    return this._operations[this._operations.length - 1];
  }
  addOperation(operation) {
    if (operation.baseVersion !== this.version) {
      throw new CKEditorError40("model-document-history-addoperation-incorrect-version", this, {
        operation,
        historyVersion: this.version
      });
    }
    this._operations.push(operation);
    this._version++;
    this._baseVersionToOperationIndex.set(operation.baseVersion, this._operations.length - 1);
  }
  getOperations(fromBaseVersion, toBaseVersion = this.version) {
    if (!this._operations.length) {
      return [];
    }
    const firstOperation = this._operations[0];
    if (fromBaseVersion === void 0) {
      fromBaseVersion = firstOperation.baseVersion;
    }
    let inclusiveTo = toBaseVersion - 1;
    for (const [gapFrom, gapTo] of this._gaps) {
      if (fromBaseVersion > gapFrom && fromBaseVersion < gapTo) {
        fromBaseVersion = gapTo;
      }
      if (inclusiveTo > gapFrom && inclusiveTo < gapTo) {
        inclusiveTo = gapFrom - 1;
      }
    }
    if (inclusiveTo < firstOperation.baseVersion || fromBaseVersion > this.lastOperation.baseVersion) {
      return [];
    }
    let fromIndex = this._baseVersionToOperationIndex.get(fromBaseVersion);
    if (fromIndex === void 0) {
      fromIndex = 0;
    }
    let toIndex = this._baseVersionToOperationIndex.get(inclusiveTo);
    if (toIndex === void 0) {
      toIndex = this._operations.length - 1;
    }
    return this._operations.slice(fromIndex, toIndex + 1);
  }
  getOperation(baseVersion) {
    const operationIndex = this._baseVersionToOperationIndex.get(baseVersion);
    if (operationIndex === void 0) {
      return;
    }
    return this._operations[operationIndex];
  }
  setOperationAsUndone(undoneOperation, undoingOperation) {
    this._undoPairs.set(undoingOperation, undoneOperation);
    this._undoneOperations.add(undoneOperation);
  }
  isUndoingOperation(operation) {
    return this._undoPairs.has(operation);
  }
  isUndoneOperation(operation) {
    return this._undoneOperations.has(operation);
  }
  getUndoneOperation(undoingOperation) {
    return this._undoPairs.get(undoingOperation);
  }
  reset() {
    this._version = 0;
    this._undoPairs = new Map();
    this._operations = [];
    this._undoneOperations = new Set();
    this._gaps = new Map();
    this._baseVersionToOperationIndex = new Map();
  }
};
var history_default = History;

// node_modules/@ckeditor/ckeditor5-engine/src/model/rootelement.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RootElement = class extends element_default2 {
  constructor(document2, name, rootName = "main") {
    super(name);
    this._isAttached = true;
    this._isLoaded = true;
    this._document = document2;
    this.rootName = rootName;
  }
  get document() {
    return this._document;
  }
  isAttached() {
    return this._isAttached;
  }
  toJSON() {
    return this.rootName;
  }
};
var rootelement_default = RootElement;
RootElement.prototype.is = function(type, name) {
  if (!name) {
    return type === "rootElement" || type === "model:rootElement" || type === "element" || type === "model:element" || type === "node" || type === "model:node";
  }
  return name === this.name && (type === "rootElement" || type === "model:rootElement" || type === "element" || type === "model:element");
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/document.js
import {CKEditorError as CKEditorError41, Collection as Collection3, EmitterMixin as EmitterMixin14, isInsideSurrogatePair, isInsideCombinedSymbol} from "es-ckeditor-lib/lib/utils";
import {clone as clone2} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var graveyardName = "$graveyard";
var Document2 = class extends EmitterMixin14() {
  constructor(model) {
    super();
    this.model = model;
    this.history = new history_default();
    this.selection = new documentselection_default2(this);
    this.roots = new Collection3({idProperty: "rootName"});
    this.differ = new differ_default(model.markers);
    this.isReadOnly = false;
    this._postFixers = new Set();
    this._hasSelectionChangedFromTheLastChangeBlock = false;
    this.createRoot("$root", graveyardName);
    this.listenTo(model, "applyOperation", (evt, args) => {
      const operation = args[0];
      if (operation.isDocumentOperation) {
        this.differ.bufferOperation(operation);
      }
    }, {priority: "high"});
    this.listenTo(model, "applyOperation", (evt, args) => {
      const operation = args[0];
      if (operation.isDocumentOperation) {
        this.history.addOperation(operation);
      }
    }, {priority: "low"});
    this.listenTo(this.selection, "change", () => {
      this._hasSelectionChangedFromTheLastChangeBlock = true;
    });
    this.listenTo(model.markers, "update", (evt, marker, oldRange, newRange, oldMarkerData) => {
      const newMarkerData = {...marker.getData(), range: newRange};
      this.differ.bufferMarkerChange(marker.name, oldMarkerData, newMarkerData);
      if (oldRange === null) {
        marker.on("change", (evt2, oldRange2) => {
          const markerData = marker.getData();
          this.differ.bufferMarkerChange(marker.name, {...markerData, range: oldRange2}, markerData);
        });
      }
    });
    this.registerPostFixer((writer) => {
      let result = false;
      for (const root of this.roots) {
        if (!root.isAttached() && !root.isEmpty) {
          writer.remove(writer.createRangeIn(root));
          result = true;
        }
      }
      for (const marker of this.model.markers) {
        if (!marker.getRange().root.isAttached()) {
          writer.removeMarker(marker);
          result = true;
        }
      }
      return result;
    });
  }
  get version() {
    return this.history.version;
  }
  set version(version) {
    this.history.version = version;
  }
  get graveyard() {
    return this.getRoot(graveyardName);
  }
  createRoot(elementName = "$root", rootName = "main") {
    if (this.roots.get(rootName)) {
      throw new CKEditorError41("model-document-createroot-name-exists", this, {name: rootName});
    }
    const root = new rootelement_default(this, elementName, rootName);
    this.roots.add(root);
    return root;
  }
  destroy() {
    this.selection.destroy();
    this.stopListening();
  }
  getRoot(name = "main") {
    return this.roots.get(name);
  }
  getRootNames(includeDetached = false) {
    return this.getRoots(includeDetached).map((root) => root.rootName);
  }
  getRoots(includeDetached = false) {
    return Array.from(this.roots).filter((root) => root != this.graveyard && (includeDetached || root.isAttached()) && root._isLoaded);
  }
  registerPostFixer(postFixer) {
    this._postFixers.add(postFixer);
  }
  toJSON() {
    const json = clone2(this);
    json.selection = "[engine.model.DocumentSelection]";
    json.model = "[engine.model.Model]";
    return json;
  }
  _handleChangeBlock(writer) {
    if (this._hasDocumentChangedFromTheLastChangeBlock()) {
      this._callPostFixers(writer);
      this.selection.refresh();
      if (this.differ.hasDataChanges()) {
        this.fire("change:data", writer.batch);
      } else {
        this.fire("change", writer.batch);
      }
      this.selection.refresh();
      this.differ.reset();
    }
    this._hasSelectionChangedFromTheLastChangeBlock = false;
  }
  _hasDocumentChangedFromTheLastChangeBlock() {
    return !this.differ.isEmpty || this._hasSelectionChangedFromTheLastChangeBlock;
  }
  _getDefaultRoot() {
    const roots = this.getRoots();
    return roots.length ? roots[0] : this.graveyard;
  }
  _getDefaultRange() {
    const defaultRoot = this._getDefaultRoot();
    const model = this.model;
    const schema = model.schema;
    const position = model.createPositionFromPath(defaultRoot, [0]);
    const nearestRange = schema.getNearestSelectionRange(position);
    return nearestRange || model.createRange(position);
  }
  _validateSelectionRange(range) {
    return validateTextNodePosition(range.start) && validateTextNodePosition(range.end);
  }
  _callPostFixers(writer) {
    let wasFixed = false;
    do {
      for (const callback of this._postFixers) {
        this.selection.refresh();
        wasFixed = callback(writer);
        if (wasFixed) {
          break;
        }
      }
    } while (wasFixed);
  }
};
var document_default2 = Document2;
function validateTextNodePosition(rangeBoundary) {
  const textNode = rangeBoundary.textNode;
  if (textNode) {
    const data = textNode.data;
    const offset = rangeBoundary.offset - textNode.startOffset;
    return !isInsideSurrogatePair(data, offset) && !isInsideCombinedSymbol(data, offset);
  }
  return true;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/markercollection.js
import {CKEditorError as CKEditorError42, EmitterMixin as EmitterMixin15} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MarkerCollection = class extends EmitterMixin15() {
  constructor() {
    super(...arguments);
    this._markers = new Map();
  }
  [Symbol.iterator]() {
    return this._markers.values();
  }
  has(markerOrName) {
    const markerName = markerOrName instanceof Marker ? markerOrName.name : markerOrName;
    return this._markers.has(markerName);
  }
  get(markerName) {
    return this._markers.get(markerName) || null;
  }
  _set(markerOrName, range, managedUsingOperations = false, affectsData = false) {
    const markerName = markerOrName instanceof Marker ? markerOrName.name : markerOrName;
    if (markerName.includes(",")) {
      throw new CKEditorError42("markercollection-incorrect-marker-name", this);
    }
    const oldMarker = this._markers.get(markerName);
    if (oldMarker) {
      const oldMarkerData = oldMarker.getData();
      const oldRange = oldMarker.getRange();
      let hasChanged = false;
      if (!oldRange.isEqual(range)) {
        oldMarker._attachLiveRange(liverange_default.fromRange(range));
        hasChanged = true;
      }
      if (managedUsingOperations != oldMarker.managedUsingOperations) {
        oldMarker._managedUsingOperations = managedUsingOperations;
        hasChanged = true;
      }
      if (typeof affectsData === "boolean" && affectsData != oldMarker.affectsData) {
        oldMarker._affectsData = affectsData;
        hasChanged = true;
      }
      if (hasChanged) {
        this.fire(`update:${markerName}`, oldMarker, oldRange, range, oldMarkerData);
      }
      return oldMarker;
    }
    const liveRange = liverange_default.fromRange(range);
    const marker = new Marker(markerName, liveRange, managedUsingOperations, affectsData);
    this._markers.set(markerName, marker);
    this.fire(`update:${markerName}`, marker, null, range, {...marker.getData(), range: null});
    return marker;
  }
  _remove(markerOrName) {
    const markerName = markerOrName instanceof Marker ? markerOrName.name : markerOrName;
    const oldMarker = this._markers.get(markerName);
    if (oldMarker) {
      this._markers.delete(markerName);
      this.fire(`update:${markerName}`, oldMarker, oldMarker.getRange(), null, oldMarker.getData());
      this._destroyMarker(oldMarker);
      return true;
    }
    return false;
  }
  _refresh(markerOrName) {
    const markerName = markerOrName instanceof Marker ? markerOrName.name : markerOrName;
    const marker = this._markers.get(markerName);
    if (!marker) {
      throw new CKEditorError42("markercollection-refresh-marker-not-exists", this);
    }
    const range = marker.getRange();
    this.fire(`update:${markerName}`, marker, range, range, marker.getData());
  }
  *getMarkersAtPosition(position) {
    for (const marker of this) {
      if (marker.getRange().containsPosition(position)) {
        yield marker;
      }
    }
  }
  *getMarkersIntersectingRange(range) {
    for (const marker of this) {
      if (marker.getRange().getIntersection(range) !== null) {
        yield marker;
      }
    }
  }
  destroy() {
    for (const marker of this._markers.values()) {
      this._destroyMarker(marker);
    }
    this._markers = null;
    this.stopListening();
  }
  *getMarkersGroup(prefix) {
    for (const marker of this._markers.values()) {
      if (marker.name.startsWith(prefix + ":")) {
        yield marker;
      }
    }
  }
  _destroyMarker(marker) {
    marker.stopListening();
    marker._detachLiveRange();
  }
};
var markercollection_default = MarkerCollection;
var Marker = class extends EmitterMixin15(typecheckable_default2) {
  constructor(name, liveRange, managedUsingOperations, affectsData) {
    super();
    this.name = name;
    this._liveRange = this._attachLiveRange(liveRange);
    this._managedUsingOperations = managedUsingOperations;
    this._affectsData = affectsData;
  }
  get managedUsingOperations() {
    if (!this._liveRange) {
      throw new CKEditorError42("marker-destroyed", this);
    }
    return this._managedUsingOperations;
  }
  get affectsData() {
    if (!this._liveRange) {
      throw new CKEditorError42("marker-destroyed", this);
    }
    return this._affectsData;
  }
  getData() {
    return {
      range: this.getRange(),
      affectsData: this.affectsData,
      managedUsingOperations: this.managedUsingOperations
    };
  }
  getStart() {
    if (!this._liveRange) {
      throw new CKEditorError42("marker-destroyed", this);
    }
    return this._liveRange.start.clone();
  }
  getEnd() {
    if (!this._liveRange) {
      throw new CKEditorError42("marker-destroyed", this);
    }
    return this._liveRange.end.clone();
  }
  getRange() {
    if (!this._liveRange) {
      throw new CKEditorError42("marker-destroyed", this);
    }
    return this._liveRange.toRange();
  }
  _attachLiveRange(liveRange) {
    if (this._liveRange) {
      this._detachLiveRange();
    }
    liveRange.delegate("change:range").to(this);
    liveRange.delegate("change:content").to(this);
    this._liveRange = liveRange;
    return liveRange;
  }
  _detachLiveRange() {
    this._liveRange.stopDelegating("change:range", this);
    this._liveRange.stopDelegating("change:content", this);
    this._liveRange.detach();
    this._liveRange = null;
  }
};
Marker.prototype.is = function(type) {
  return type === "marker" || type === "model:marker";
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/operation/detachoperation.js
import {CKEditorError as CKEditorError43} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DetachOperation = class extends operation_default {
  constructor(sourcePosition, howMany) {
    super(null);
    this.sourcePosition = sourcePosition.clone();
    this.howMany = howMany;
  }
  get type() {
    return "detach";
  }
  get affectedSelectable() {
    return null;
  }
  toJSON() {
    const json = super.toJSON();
    json.sourcePosition = this.sourcePosition.toJSON();
    return json;
  }
  _validate() {
    if (this.sourcePosition.root.document) {
      throw new CKEditorError43("detach-operation-on-document-node", this);
    }
  }
  _execute() {
    _remove(range_default2._createFromPositionAndShift(this.sourcePosition, this.howMany));
  }
  static get className() {
    return "DetachOperation";
  }
};
var detachoperation_default = DetachOperation;

// node_modules/@ckeditor/ckeditor5-engine/src/model/documentfragment.js
import {isIterable as isIterable8} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DocumentFragment2 = class extends typecheckable_default2 {
  constructor(children) {
    super();
    this.markers = new Map();
    this._children = new nodelist_default();
    if (children) {
      this._insertChild(0, children);
    }
  }
  [Symbol.iterator]() {
    return this.getChildren();
  }
  get childCount() {
    return this._children.length;
  }
  get maxOffset() {
    return this._children.maxOffset;
  }
  get isEmpty() {
    return this.childCount === 0;
  }
  get nextSibling() {
    return null;
  }
  get previousSibling() {
    return null;
  }
  get root() {
    return this;
  }
  get parent() {
    return null;
  }
  get document() {
    return null;
  }
  isAttached() {
    return false;
  }
  getAncestors() {
    return [];
  }
  getChild(index) {
    return this._children.getNode(index);
  }
  getChildren() {
    return this._children[Symbol.iterator]();
  }
  getChildIndex(node) {
    return this._children.getNodeIndex(node);
  }
  getChildStartOffset(node) {
    return this._children.getNodeStartOffset(node);
  }
  getPath() {
    return [];
  }
  getNodeByPath(relativePath) {
    let node = this;
    for (const index of relativePath) {
      node = node.getChild(node.offsetToIndex(index));
    }
    return node;
  }
  offsetToIndex(offset) {
    return this._children.offsetToIndex(offset);
  }
  toJSON() {
    const json = [];
    for (const node of this._children) {
      json.push(node.toJSON());
    }
    return json;
  }
  static fromJSON(json) {
    const children = [];
    for (const child of json) {
      if (child.name) {
        children.push(element_default2.fromJSON(child));
      } else {
        children.push(text_default2.fromJSON(child));
      }
    }
    return new DocumentFragment2(children);
  }
  _appendChild(items) {
    this._insertChild(this.childCount, items);
  }
  _insertChild(index, items) {
    const nodes = normalize4(items);
    for (const node of nodes) {
      if (node.parent !== null) {
        node._remove();
      }
      node.parent = this;
    }
    this._children._insertNodes(index, nodes);
  }
  _removeChildren(index, howMany = 1) {
    const nodes = this._children._removeNodes(index, howMany);
    for (const node of nodes) {
      node.parent = null;
    }
    return nodes;
  }
};
var documentfragment_default2 = DocumentFragment2;
DocumentFragment2.prototype.is = function(type) {
  return type === "documentFragment" || type === "model:documentFragment";
};
function normalize4(nodes) {
  if (typeof nodes == "string") {
    return [new text_default2(nodes)];
  }
  if (!isIterable8(nodes)) {
    nodes = [nodes];
  }
  return Array.from(nodes).map((node) => {
    if (typeof node == "string") {
      return new text_default2(node);
    }
    if (node instanceof textproxy_default2) {
      return new text_default2(node.data, node.getAttributes());
    }
    return node;
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/writer.js
import {CKEditorError as CKEditorError44, logWarning as logWarning6, toMap as toMap4} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Writer = class {
  constructor(model, batch) {
    this.model = model;
    this.batch = batch;
  }
  createText(data, attributes) {
    return new text_default2(data, attributes);
  }
  createElement(name, attributes) {
    return new element_default2(name, attributes);
  }
  createDocumentFragment() {
    return new documentfragment_default2();
  }
  cloneElement(element, deep = true) {
    return element._clone(deep);
  }
  insert(item, itemOrPosition, offset = 0) {
    this._assertWriterUsedCorrectly();
    if (item instanceof text_default2 && item.data == "") {
      return;
    }
    const position = position_default2._createAt(itemOrPosition, offset);
    if (item.parent) {
      if (isSameTree(item.root, position.root)) {
        this.move(range_default2._createOn(item), position);
        return;
      } else {
        if (item.root.document) {
          throw new CKEditorError44("model-writer-insert-forbidden-move", this);
        } else {
          this.remove(item);
        }
      }
    }
    const version = position.root.document ? position.root.document.version : null;
    const insert = new insertoperation_default(position, item, version);
    if (item instanceof text_default2) {
      insert.shouldReceiveAttributes = true;
    }
    this.batch.addOperation(insert);
    this.model.applyOperation(insert);
    if (item instanceof documentfragment_default2) {
      for (const [markerName, markerRange] of item.markers) {
        const rangeRootPosition = position_default2._createAt(markerRange.root, 0);
        const range = new range_default2(markerRange.start._getCombined(rangeRootPosition, position), markerRange.end._getCombined(rangeRootPosition, position));
        const options = {range, usingOperation: true, affectsData: true};
        if (this.model.markers.has(markerName)) {
          this.updateMarker(markerName, options);
        } else {
          this.addMarker(markerName, options);
        }
      }
    }
  }
  insertText(text, attributes, itemOrPosition, offset) {
    if (attributes instanceof documentfragment_default2 || attributes instanceof element_default2 || attributes instanceof position_default2) {
      this.insert(this.createText(text), attributes, itemOrPosition);
    } else {
      this.insert(this.createText(text, attributes), itemOrPosition, offset);
    }
  }
  insertElement(name, attributes, itemOrPositionOrOffset, offset) {
    if (attributes instanceof documentfragment_default2 || attributes instanceof element_default2 || attributes instanceof position_default2) {
      this.insert(this.createElement(name), attributes, itemOrPositionOrOffset);
    } else {
      this.insert(this.createElement(name, attributes), itemOrPositionOrOffset, offset);
    }
  }
  append(item, parent) {
    this.insert(item, parent, "end");
  }
  appendText(text, attributes, parent) {
    if (attributes instanceof documentfragment_default2 || attributes instanceof element_default2) {
      this.insert(this.createText(text), attributes, "end");
    } else {
      this.insert(this.createText(text, attributes), parent, "end");
    }
  }
  appendElement(name, attributes, parent) {
    if (attributes instanceof documentfragment_default2 || attributes instanceof element_default2) {
      this.insert(this.createElement(name), attributes, "end");
    } else {
      this.insert(this.createElement(name, attributes), parent, "end");
    }
  }
  setAttribute(key, value, itemOrRange) {
    this._assertWriterUsedCorrectly();
    if (itemOrRange instanceof range_default2) {
      const ranges = itemOrRange.getMinimalFlatRanges();
      for (const range of ranges) {
        setAttributeOnRange(this, key, value, range);
      }
    } else {
      setAttributeOnItem(this, key, value, itemOrRange);
    }
  }
  setAttributes(attributes, itemOrRange) {
    for (const [key, val] of toMap4(attributes)) {
      this.setAttribute(key, val, itemOrRange);
    }
  }
  removeAttribute(key, itemOrRange) {
    this._assertWriterUsedCorrectly();
    if (itemOrRange instanceof range_default2) {
      const ranges = itemOrRange.getMinimalFlatRanges();
      for (const range of ranges) {
        setAttributeOnRange(this, key, null, range);
      }
    } else {
      setAttributeOnItem(this, key, null, itemOrRange);
    }
  }
  clearAttributes(itemOrRange) {
    this._assertWriterUsedCorrectly();
    const removeAttributesFromItem = (item) => {
      for (const attribute of item.getAttributeKeys()) {
        this.removeAttribute(attribute, item);
      }
    };
    if (!(itemOrRange instanceof range_default2)) {
      removeAttributesFromItem(itemOrRange);
    } else {
      for (const item of itemOrRange.getItems()) {
        removeAttributesFromItem(item);
      }
    }
  }
  move(range, itemOrPosition, offset) {
    this._assertWriterUsedCorrectly();
    if (!(range instanceof range_default2)) {
      throw new CKEditorError44("writer-move-invalid-range", this);
    }
    if (!range.isFlat) {
      throw new CKEditorError44("writer-move-range-not-flat", this);
    }
    const position = position_default2._createAt(itemOrPosition, offset);
    if (position.isEqual(range.start)) {
      return;
    }
    this._addOperationForAffectedMarkers("move", range);
    if (!isSameTree(range.root, position.root)) {
      throw new CKEditorError44("writer-move-different-document", this);
    }
    const version = range.root.document ? range.root.document.version : null;
    const operation = new moveoperation_default(range.start, range.end.offset - range.start.offset, position, version);
    this.batch.addOperation(operation);
    this.model.applyOperation(operation);
  }
  remove(itemOrRange) {
    this._assertWriterUsedCorrectly();
    const rangeToRemove = itemOrRange instanceof range_default2 ? itemOrRange : range_default2._createOn(itemOrRange);
    const ranges = rangeToRemove.getMinimalFlatRanges().reverse();
    for (const flat of ranges) {
      this._addOperationForAffectedMarkers("move", flat);
      applyRemoveOperation(flat.start, flat.end.offset - flat.start.offset, this.batch, this.model);
    }
  }
  merge(position) {
    this._assertWriterUsedCorrectly();
    const nodeBefore = position.nodeBefore;
    const nodeAfter = position.nodeAfter;
    this._addOperationForAffectedMarkers("merge", position);
    if (!(nodeBefore instanceof element_default2)) {
      throw new CKEditorError44("writer-merge-no-element-before", this);
    }
    if (!(nodeAfter instanceof element_default2)) {
      throw new CKEditorError44("writer-merge-no-element-after", this);
    }
    if (!position.root.document) {
      this._mergeDetached(position);
    } else {
      this._merge(position);
    }
  }
  createPositionFromPath(root, path, stickiness) {
    return this.model.createPositionFromPath(root, path, stickiness);
  }
  createPositionAt(itemOrPosition, offset) {
    return this.model.createPositionAt(itemOrPosition, offset);
  }
  createPositionAfter(item) {
    return this.model.createPositionAfter(item);
  }
  createPositionBefore(item) {
    return this.model.createPositionBefore(item);
  }
  createRange(start, end) {
    return this.model.createRange(start, end);
  }
  createRangeIn(element) {
    return this.model.createRangeIn(element);
  }
  createRangeOn(element) {
    return this.model.createRangeOn(element);
  }
  createSelection(...args) {
    return this.model.createSelection(...args);
  }
  _mergeDetached(position) {
    const nodeBefore = position.nodeBefore;
    const nodeAfter = position.nodeAfter;
    this.move(range_default2._createIn(nodeAfter), position_default2._createAt(nodeBefore, "end"));
    this.remove(nodeAfter);
  }
  _merge(position) {
    const targetPosition = position_default2._createAt(position.nodeBefore, "end");
    const sourcePosition = position_default2._createAt(position.nodeAfter, 0);
    const graveyard = position.root.document.graveyard;
    const graveyardPosition = new position_default2(graveyard, [0]);
    const version = position.root.document.version;
    const merge2 = new mergeoperation_default(sourcePosition, position.nodeAfter.maxOffset, targetPosition, graveyardPosition, version);
    this.batch.addOperation(merge2);
    this.model.applyOperation(merge2);
  }
  rename(element, newName) {
    this._assertWriterUsedCorrectly();
    if (!(element instanceof element_default2)) {
      throw new CKEditorError44("writer-rename-not-element-instance", this);
    }
    const version = element.root.document ? element.root.document.version : null;
    const renameOperation = new renameoperation_default(position_default2._createBefore(element), element.name, newName, version);
    this.batch.addOperation(renameOperation);
    this.model.applyOperation(renameOperation);
  }
  split(position, limitElement) {
    this._assertWriterUsedCorrectly();
    let splitElement = position.parent;
    if (!splitElement.parent) {
      throw new CKEditorError44("writer-split-element-no-parent", this);
    }
    if (!limitElement) {
      limitElement = splitElement.parent;
    }
    if (!position.parent.getAncestors({includeSelf: true}).includes(limitElement)) {
      throw new CKEditorError44("writer-split-invalid-limit-element", this);
    }
    let firstSplitElement;
    let firstCopyElement;
    do {
      const version = splitElement.root.document ? splitElement.root.document.version : null;
      const howMany = splitElement.maxOffset - position.offset;
      const insertionPosition = splitoperation_default.getInsertionPosition(position);
      const split = new splitoperation_default(position, howMany, insertionPosition, null, version);
      this.batch.addOperation(split);
      this.model.applyOperation(split);
      if (!firstSplitElement && !firstCopyElement) {
        firstSplitElement = splitElement;
        firstCopyElement = position.parent.nextSibling;
      }
      position = this.createPositionAfter(position.parent);
      splitElement = position.parent;
    } while (splitElement !== limitElement);
    return {
      position,
      range: new range_default2(position_default2._createAt(firstSplitElement, "end"), position_default2._createAt(firstCopyElement, 0))
    };
  }
  wrap(range, elementOrString) {
    this._assertWriterUsedCorrectly();
    if (!range.isFlat) {
      throw new CKEditorError44("writer-wrap-range-not-flat", this);
    }
    const element = elementOrString instanceof element_default2 ? elementOrString : new element_default2(elementOrString);
    if (element.childCount > 0) {
      throw new CKEditorError44("writer-wrap-element-not-empty", this);
    }
    if (element.parent !== null) {
      throw new CKEditorError44("writer-wrap-element-attached", this);
    }
    this.insert(element, range.start);
    const shiftedRange = new range_default2(range.start.getShiftedBy(1), range.end.getShiftedBy(1));
    this.move(shiftedRange, position_default2._createAt(element, 0));
  }
  unwrap(element) {
    this._assertWriterUsedCorrectly();
    if (element.parent === null) {
      throw new CKEditorError44("writer-unwrap-element-no-parent", this);
    }
    this.move(range_default2._createIn(element), this.createPositionAfter(element));
    this.remove(element);
  }
  addMarker(name, options) {
    this._assertWriterUsedCorrectly();
    if (!options || typeof options.usingOperation != "boolean") {
      throw new CKEditorError44("writer-addmarker-no-usingoperation", this);
    }
    const usingOperation = options.usingOperation;
    const range = options.range;
    const affectsData = options.affectsData === void 0 ? false : options.affectsData;
    if (this.model.markers.has(name)) {
      throw new CKEditorError44("writer-addmarker-marker-exists", this);
    }
    if (!range) {
      throw new CKEditorError44("writer-addmarker-no-range", this);
    }
    if (!usingOperation) {
      return this.model.markers._set(name, range, usingOperation, affectsData);
    }
    applyMarkerOperation(this, name, null, range, affectsData);
    return this.model.markers.get(name);
  }
  updateMarker(markerOrName, options) {
    this._assertWriterUsedCorrectly();
    const markerName = typeof markerOrName == "string" ? markerOrName : markerOrName.name;
    const currentMarker = this.model.markers.get(markerName);
    if (!currentMarker) {
      throw new CKEditorError44("writer-updatemarker-marker-not-exists", this);
    }
    if (!options) {
      logWarning6("writer-updatemarker-reconvert-using-editingcontroller", {markerName});
      this.model.markers._refresh(currentMarker);
      return;
    }
    const hasUsingOperationDefined = typeof options.usingOperation == "boolean";
    const affectsDataDefined = typeof options.affectsData == "boolean";
    const affectsData = affectsDataDefined ? options.affectsData : currentMarker.affectsData;
    if (!hasUsingOperationDefined && !options.range && !affectsDataDefined) {
      throw new CKEditorError44("writer-updatemarker-wrong-options", this);
    }
    const currentRange = currentMarker.getRange();
    const updatedRange = options.range ? options.range : currentRange;
    if (hasUsingOperationDefined && options.usingOperation !== currentMarker.managedUsingOperations) {
      if (options.usingOperation) {
        applyMarkerOperation(this, markerName, null, updatedRange, affectsData);
      } else {
        applyMarkerOperation(this, markerName, currentRange, null, affectsData);
        this.model.markers._set(markerName, updatedRange, void 0, affectsData);
      }
      return;
    }
    if (currentMarker.managedUsingOperations) {
      applyMarkerOperation(this, markerName, currentRange, updatedRange, affectsData);
    } else {
      this.model.markers._set(markerName, updatedRange, void 0, affectsData);
    }
  }
  removeMarker(markerOrName) {
    this._assertWriterUsedCorrectly();
    const name = typeof markerOrName == "string" ? markerOrName : markerOrName.name;
    if (!this.model.markers.has(name)) {
      throw new CKEditorError44("writer-removemarker-no-marker", this);
    }
    const marker = this.model.markers.get(name);
    if (!marker.managedUsingOperations) {
      this.model.markers._remove(name);
      return;
    }
    const oldRange = marker.getRange();
    applyMarkerOperation(this, name, oldRange, null, marker.affectsData);
  }
  addRoot(rootName, elementName = "$root") {
    this._assertWriterUsedCorrectly();
    const root = this.model.document.getRoot(rootName);
    if (root && root.isAttached()) {
      throw new CKEditorError44("writer-addroot-root-exists", this);
    }
    const document2 = this.model.document;
    const operation = new rootoperation_default(rootName, elementName, true, document2, document2.version);
    this.batch.addOperation(operation);
    this.model.applyOperation(operation);
    return this.model.document.getRoot(rootName);
  }
  detachRoot(rootOrName) {
    this._assertWriterUsedCorrectly();
    const root = typeof rootOrName == "string" ? this.model.document.getRoot(rootOrName) : rootOrName;
    if (!root || !root.isAttached()) {
      throw new CKEditorError44("writer-detachroot-no-root", this);
    }
    for (const marker of this.model.markers) {
      if (marker.getRange().root === root) {
        this.removeMarker(marker);
      }
    }
    for (const key of root.getAttributeKeys()) {
      this.removeAttribute(key, root);
    }
    this.remove(this.createRangeIn(root));
    const document2 = this.model.document;
    const operation = new rootoperation_default(root.rootName, root.name, false, document2, document2.version);
    this.batch.addOperation(operation);
    this.model.applyOperation(operation);
  }
  setSelection(...args) {
    this._assertWriterUsedCorrectly();
    this.model.document.selection._setTo(...args);
  }
  setSelectionFocus(itemOrPosition, offset) {
    this._assertWriterUsedCorrectly();
    this.model.document.selection._setFocus(itemOrPosition, offset);
  }
  setSelectionAttribute(keyOrObjectOrIterable, value) {
    this._assertWriterUsedCorrectly();
    if (typeof keyOrObjectOrIterable === "string") {
      this._setSelectionAttribute(keyOrObjectOrIterable, value);
    } else {
      for (const [key, value2] of toMap4(keyOrObjectOrIterable)) {
        this._setSelectionAttribute(key, value2);
      }
    }
  }
  removeSelectionAttribute(keyOrIterableOfKeys) {
    this._assertWriterUsedCorrectly();
    if (typeof keyOrIterableOfKeys === "string") {
      this._removeSelectionAttribute(keyOrIterableOfKeys);
    } else {
      for (const key of keyOrIterableOfKeys) {
        this._removeSelectionAttribute(key);
      }
    }
  }
  overrideSelectionGravity() {
    return this.model.document.selection._overrideGravity();
  }
  restoreSelectionGravity(uid2) {
    this.model.document.selection._restoreGravity(uid2);
  }
  _setSelectionAttribute(key, value) {
    const selection = this.model.document.selection;
    if (selection.isCollapsed && selection.anchor.parent.isEmpty) {
      const storeKey = documentselection_default2._getStoreAttributeKey(key);
      this.setAttribute(storeKey, value, selection.anchor.parent);
    }
    selection._setAttribute(key, value);
  }
  _removeSelectionAttribute(key) {
    const selection = this.model.document.selection;
    if (selection.isCollapsed && selection.anchor.parent.isEmpty) {
      const storeKey = documentselection_default2._getStoreAttributeKey(key);
      this.removeAttribute(storeKey, selection.anchor.parent);
    }
    selection._removeAttribute(key);
  }
  _assertWriterUsedCorrectly() {
    if (this.model._currentWriter !== this) {
      throw new CKEditorError44("writer-incorrect-use", this);
    }
  }
  _addOperationForAffectedMarkers(type, positionOrRange) {
    for (const marker of this.model.markers) {
      if (!marker.managedUsingOperations) {
        continue;
      }
      const markerRange = marker.getRange();
      let isAffected = false;
      if (type === "move") {
        const range = positionOrRange;
        isAffected = range.containsPosition(markerRange.start) || range.start.isEqual(markerRange.start) || range.containsPosition(markerRange.end) || range.end.isEqual(markerRange.end);
      } else {
        const position = positionOrRange;
        const elementBefore = position.nodeBefore;
        const elementAfter = position.nodeAfter;
        const affectedInLeftElement = markerRange.start.parent == elementBefore && markerRange.start.isAtEnd;
        const affectedInRightElement = markerRange.end.parent == elementAfter && markerRange.end.offset == 0;
        const affectedAfterLeftElement = markerRange.end.nodeAfter == elementAfter;
        const affectedBeforeRightElement = markerRange.start.nodeAfter == elementAfter;
        isAffected = affectedInLeftElement || affectedInRightElement || affectedAfterLeftElement || affectedBeforeRightElement;
      }
      if (isAffected) {
        this.updateMarker(marker.name, {range: markerRange});
      }
    }
  }
};
var writer_default = Writer;
function setAttributeOnRange(writer, key, value, range) {
  const model = writer.model;
  const doc = model.document;
  let lastSplitPosition = range.start;
  let position;
  let valueBefore;
  let valueAfter;
  for (const val of range.getWalker({shallow: true})) {
    valueAfter = val.item.getAttribute(key);
    if (position && valueBefore != valueAfter) {
      if (valueBefore != value) {
        addOperation();
      }
      lastSplitPosition = position;
    }
    position = val.nextPosition;
    valueBefore = valueAfter;
  }
  if (position instanceof position_default2 && position != lastSplitPosition && valueBefore != value) {
    addOperation();
  }
  function addOperation() {
    const range2 = new range_default2(lastSplitPosition, position);
    const version = range2.root.document ? doc.version : null;
    const operation = new attributeoperation_default(range2, key, valueBefore, value, version);
    writer.batch.addOperation(operation);
    model.applyOperation(operation);
  }
}
function setAttributeOnItem(writer, key, value, item) {
  const model = writer.model;
  const doc = model.document;
  const previousValue = item.getAttribute(key);
  let range, operation;
  if (previousValue != value) {
    const isRootChanged = item.root === item;
    if (isRootChanged) {
      const version = item.document ? doc.version : null;
      operation = new rootattributeoperation_default(item, key, previousValue, value, version);
    } else {
      range = new range_default2(position_default2._createBefore(item), writer.createPositionAfter(item));
      const version = range.root.document ? doc.version : null;
      operation = new attributeoperation_default(range, key, previousValue, value, version);
    }
    writer.batch.addOperation(operation);
    model.applyOperation(operation);
  }
}
function applyMarkerOperation(writer, name, oldRange, newRange, affectsData) {
  const model = writer.model;
  const doc = model.document;
  const operation = new markeroperation_default(name, oldRange, newRange, model.markers, !!affectsData, doc.version);
  writer.batch.addOperation(operation);
  model.applyOperation(operation);
}
function applyRemoveOperation(position, howMany, batch, model) {
  let operation;
  if (position.root.document) {
    const doc = model.document;
    const graveyardPosition = new position_default2(doc.graveyard, [0]);
    operation = new moveoperation_default(position, howMany, graveyardPosition, doc.version);
  } else {
    operation = new detachoperation_default(position, howMany);
  }
  batch.addOperation(operation);
  model.applyOperation(operation);
}
function isSameTree(rootA, rootB) {
  if (rootA === rootB) {
    return true;
  }
  if (rootA instanceof rootelement_default && rootB instanceof rootelement_default) {
    return true;
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/deletecontent.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function deleteContent(model, selection, options = {}) {
  if (selection.isCollapsed) {
    return;
  }
  const selRange = selection.getFirstRange();
  if (selRange.root.rootName == "$graveyard") {
    return;
  }
  const schema = model.schema;
  model.change((writer) => {
    if (!options.doNotResetEntireContent && shouldEntireContentBeReplacedWithParagraph(schema, selection)) {
      replaceEntireContentWithParagraph(writer, selection);
      return;
    }
    const attributesForAutoparagraph = {};
    if (!options.doNotAutoparagraph) {
      const selectedElement = selection.getSelectedElement();
      if (selectedElement) {
        Object.assign(attributesForAutoparagraph, schema.getAttributesWithProperty(selectedElement, "copyOnReplace", true));
      }
    }
    const [startPosition, endPosition] = getLivePositionsForSelectedBlocks(selRange);
    if (!startPosition.isTouching(endPosition)) {
      writer.remove(writer.createRange(startPosition, endPosition));
    }
    if (!options.leaveUnmerged) {
      mergeBranches(writer, startPosition, endPosition);
      schema.removeDisallowedAttributes(startPosition.parent.getChildren(), writer);
    }
    collapseSelectionAt(writer, selection, startPosition);
    if (!options.doNotAutoparagraph && shouldAutoparagraph(schema, startPosition)) {
      insertParagraph(writer, startPosition, selection, attributesForAutoparagraph);
    }
    startPosition.detach();
    endPosition.detach();
  });
}
function getLivePositionsForSelectedBlocks(range) {
  const model = range.root.document.model;
  const startPosition = range.start;
  let endPosition = range.end;
  if (model.hasContent(range, {ignoreMarkers: true})) {
    const endBlock = getParentBlock2(endPosition);
    if (endBlock && endPosition.isTouching(model.createPositionAt(endBlock, 0))) {
      const selection = model.createSelection(range);
      model.modifySelection(selection, {direction: "backward"});
      const newEndPosition = selection.getLastPosition();
      const skippedRange = model.createRange(newEndPosition, endPosition);
      if (!model.hasContent(skippedRange, {ignoreMarkers: true})) {
        endPosition = newEndPosition;
      }
    }
  }
  return [
    liveposition_default.fromPosition(startPosition, "toPrevious"),
    liveposition_default.fromPosition(endPosition, "toNext")
  ];
}
function getParentBlock2(position) {
  const element = position.parent;
  const schema = element.root.document.model.schema;
  const ancestors = element.getAncestors({parentFirst: true, includeSelf: true});
  for (const element2 of ancestors) {
    if (schema.isLimit(element2)) {
      return null;
    }
    if (schema.isBlock(element2)) {
      return element2;
    }
  }
}
function mergeBranches(writer, startPosition, endPosition) {
  const model = writer.model;
  if (!checkShouldMerge(writer.model.schema, startPosition, endPosition)) {
    return;
  }
  const [startAncestor, endAncestor] = getAncestorsJustBelowCommonAncestor(startPosition, endPosition);
  if (!startAncestor || !endAncestor) {
    return;
  }
  if (!model.hasContent(startAncestor, {ignoreMarkers: true}) && model.hasContent(endAncestor, {ignoreMarkers: true})) {
    mergeBranchesRight(writer, startPosition, endPosition, startAncestor.parent);
  } else {
    mergeBranchesLeft(writer, startPosition, endPosition, startAncestor.parent);
  }
}
function mergeBranchesLeft(writer, startPosition, endPosition, commonAncestor) {
  const startElement = startPosition.parent;
  const endElement = endPosition.parent;
  if (startElement == commonAncestor || endElement == commonAncestor) {
    return;
  }
  startPosition = writer.createPositionAfter(startElement);
  endPosition = writer.createPositionBefore(endElement);
  if (!endPosition.isEqual(startPosition)) {
    writer.insert(endElement, startPosition);
  }
  writer.merge(startPosition);
  while (endPosition.parent.isEmpty) {
    const parentToRemove = endPosition.parent;
    endPosition = writer.createPositionBefore(parentToRemove);
    writer.remove(parentToRemove);
  }
  if (!checkShouldMerge(writer.model.schema, startPosition, endPosition)) {
    return;
  }
  mergeBranchesLeft(writer, startPosition, endPosition, commonAncestor);
}
function mergeBranchesRight(writer, startPosition, endPosition, commonAncestor) {
  const startElement = startPosition.parent;
  const endElement = endPosition.parent;
  if (startElement == commonAncestor || endElement == commonAncestor) {
    return;
  }
  startPosition = writer.createPositionAfter(startElement);
  endPosition = writer.createPositionBefore(endElement);
  if (!endPosition.isEqual(startPosition)) {
    writer.insert(startElement, endPosition);
  }
  while (startPosition.parent.isEmpty) {
    const parentToRemove = startPosition.parent;
    startPosition = writer.createPositionBefore(parentToRemove);
    writer.remove(parentToRemove);
  }
  endPosition = writer.createPositionBefore(endElement);
  mergeRight(writer, endPosition);
  if (!checkShouldMerge(writer.model.schema, startPosition, endPosition)) {
    return;
  }
  mergeBranchesRight(writer, startPosition, endPosition, commonAncestor);
}
function mergeRight(writer, position) {
  const startElement = position.nodeBefore;
  const endElement = position.nodeAfter;
  if (startElement.name != endElement.name) {
    writer.rename(startElement, endElement.name);
  }
  writer.clearAttributes(startElement);
  writer.setAttributes(Object.fromEntries(endElement.getAttributes()), startElement);
  writer.merge(position);
}
function checkShouldMerge(schema, startPosition, endPosition) {
  const startElement = startPosition.parent;
  const endElement = endPosition.parent;
  if (startElement == endElement) {
    return false;
  }
  if (schema.isLimit(startElement) || schema.isLimit(endElement)) {
    return false;
  }
  return isCrossingLimitElement(startPosition, endPosition, schema);
}
function getAncestorsJustBelowCommonAncestor(positionA, positionB) {
  const ancestorsA = positionA.getAncestors();
  const ancestorsB = positionB.getAncestors();
  let i = 0;
  while (ancestorsA[i] && ancestorsA[i] == ancestorsB[i]) {
    i++;
  }
  return [ancestorsA[i], ancestorsB[i]];
}
function shouldAutoparagraph(schema, position) {
  const isTextAllowed = schema.checkChild(position, "$text");
  const isParagraphAllowed = schema.checkChild(position, "paragraph");
  return !isTextAllowed && isParagraphAllowed;
}
function isCrossingLimitElement(leftPos, rightPos, schema) {
  const rangeToCheck = new range_default2(leftPos, rightPos);
  for (const value of rangeToCheck.getWalker()) {
    if (schema.isLimit(value.item)) {
      return false;
    }
  }
  return true;
}
function insertParagraph(writer, position, selection, attributes = {}) {
  const paragraph = writer.createElement("paragraph");
  writer.model.schema.setAllowedAttributes(paragraph, attributes, writer);
  writer.insert(paragraph, position);
  collapseSelectionAt(writer, selection, writer.createPositionAt(paragraph, 0));
}
function replaceEntireContentWithParagraph(writer, selection) {
  const limitElement = writer.model.schema.getLimitElement(selection);
  writer.remove(writer.createRangeIn(limitElement));
  insertParagraph(writer, writer.createPositionAt(limitElement, 0), selection);
}
function shouldEntireContentBeReplacedWithParagraph(schema, selection) {
  const limitElement = schema.getLimitElement(selection);
  if (!selection.containsEntireContent(limitElement)) {
    return false;
  }
  const range = selection.getFirstRange();
  if (range.start.parent == range.end.parent) {
    return false;
  }
  return schema.checkChild(limitElement, "paragraph");
}
function collapseSelectionAt(writer, selection, positionOrRange) {
  if (selection instanceof documentselection_default2) {
    writer.setSelection(positionOrRange);
  } else {
    selection.setTo(positionOrRange);
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/getselectedcontent.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getSelectedContent(model, selection) {
  return model.change((writer) => {
    const frag = writer.createDocumentFragment();
    const range = selection.getFirstRange();
    if (!range || range.isCollapsed) {
      return frag;
    }
    const root = range.start.root;
    const commonPath = range.start.getCommonPath(range.end);
    const commonParent = root.getNodeByPath(commonPath);
    let flatSubtreeRange;
    if (range.start.parent == range.end.parent) {
      flatSubtreeRange = range;
    } else {
      flatSubtreeRange = writer.createRange(writer.createPositionAt(commonParent, range.start.path[commonPath.length]), writer.createPositionAt(commonParent, range.end.path[commonPath.length] + 1));
    }
    const howMany = flatSubtreeRange.end.offset - flatSubtreeRange.start.offset;
    for (const item of flatSubtreeRange.getItems({shallow: true})) {
      if (item.is("$textProxy")) {
        writer.appendText(item.data, item.getAttributes(), frag);
      } else {
        writer.append(writer.cloneElement(item, true), frag);
      }
    }
    if (flatSubtreeRange != range) {
      const newRange = range._getTransformedByMove(flatSubtreeRange.start, writer.createPositionAt(frag, 0), howMany)[0];
      const leftExcessRange = writer.createRange(writer.createPositionAt(frag, 0), newRange.start);
      const rightExcessRange = writer.createRange(newRange.end, writer.createPositionAt(frag, "end"));
      removeRangeContent(rightExcessRange, writer);
      removeRangeContent(leftExcessRange, writer);
    }
    return frag;
  });
}
function removeRangeContent(range, writer) {
  const parentsToCheck = [];
  Array.from(range.getItems({direction: "backward"})).map((item) => writer.createRangeOn(item)).filter((itemRange) => {
    const contained = (itemRange.start.isAfter(range.start) || itemRange.start.isEqual(range.start)) && (itemRange.end.isBefore(range.end) || itemRange.end.isEqual(range.end));
    return contained;
  }).forEach((itemRange) => {
    parentsToCheck.push(itemRange.start.parent);
    writer.remove(itemRange);
  });
  parentsToCheck.forEach((parentToCheck) => {
    let parent = parentToCheck;
    while (parent.parent && parent.isEmpty) {
      const removeRange = writer.createRangeOn(parent);
      parent = parent.parent;
      writer.remove(removeRange);
    }
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/insertcontent.js
import {CKEditorError as CKEditorError45} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function insertContent(model, content, selectable) {
  return model.change((writer) => {
    const selection = selectable ? selectable : model.document.selection;
    if (!selection.isCollapsed) {
      model.deleteContent(selection, {doNotAutoparagraph: true});
    }
    const insertion = new Insertion(model, writer, selection.anchor);
    const fakeMarkerElements = [];
    let nodesToInsert;
    if (content.is("documentFragment")) {
      if (content.markers.size) {
        const markersPosition = [];
        for (const [name, range] of content.markers) {
          const {start, end} = range;
          const isCollapsed = start.isEqual(end);
          markersPosition.push({position: start, name, isCollapsed}, {position: end, name, isCollapsed});
        }
        markersPosition.sort(({position: posA}, {position: posB}) => posA.isBefore(posB) ? 1 : -1);
        for (const {position, name, isCollapsed} of markersPosition) {
          let fakeElement = null;
          let collapsed = null;
          const isAtBeginning = position.parent === content && position.isAtStart;
          const isAtEnd = position.parent === content && position.isAtEnd;
          if (!isAtBeginning && !isAtEnd) {
            fakeElement = writer.createElement("$marker");
            writer.insert(fakeElement, position);
          } else if (isCollapsed) {
            collapsed = isAtBeginning ? "start" : "end";
          }
          fakeMarkerElements.push({
            name,
            element: fakeElement,
            collapsed
          });
        }
      }
      nodesToInsert = content.getChildren();
    } else {
      nodesToInsert = [content];
    }
    insertion.handleNodes(nodesToInsert);
    let newRange = insertion.getSelectionRange();
    if (content.is("documentFragment") && fakeMarkerElements.length) {
      const selectionLiveRange = newRange ? liverange_default.fromRange(newRange) : null;
      const markersData = {};
      for (let i = fakeMarkerElements.length - 1; i >= 0; i--) {
        const {name, element, collapsed} = fakeMarkerElements[i];
        const isStartBoundary = !markersData[name];
        if (isStartBoundary) {
          markersData[name] = [];
        }
        if (element) {
          const elementPosition = writer.createPositionAt(element, "before");
          markersData[name].push(elementPosition);
          writer.remove(element);
        } else {
          const rangeOnInsertion = insertion.getAffectedRange();
          if (!rangeOnInsertion) {
            if (collapsed) {
              markersData[name].push(insertion.position);
            }
            continue;
          }
          if (collapsed) {
            markersData[name].push(rangeOnInsertion[collapsed]);
          } else {
            markersData[name].push(isStartBoundary ? rangeOnInsertion.start : rangeOnInsertion.end);
          }
        }
      }
      for (const [name, [start, end]] of Object.entries(markersData)) {
        if (start && end && start.root === end.root) {
          writer.addMarker(name, {
            usingOperation: true,
            affectsData: true,
            range: new range_default2(start, end)
          });
        }
      }
      if (selectionLiveRange) {
        newRange = selectionLiveRange.toRange();
        selectionLiveRange.detach();
      }
    }
    /* istanbul ignore else -- @preserve */
    if (newRange) {
      if (selection instanceof documentselection_default2) {
        writer.setSelection(newRange);
      } else {
        selection.setTo(newRange);
      }
    } else {
    }
    const affectedRange = insertion.getAffectedRange() || model.createRange(selection.anchor);
    insertion.destroy();
    return affectedRange;
  });
}
var Insertion = class {
  constructor(model, writer, position) {
    this._firstNode = null;
    this._lastNode = null;
    this._lastAutoParagraph = null;
    this._filterAttributesOf = [];
    this._affectedStart = null;
    this._affectedEnd = null;
    this._nodeToSelect = null;
    this.model = model;
    this.writer = writer;
    this.position = position;
    this.canMergeWith = new Set([this.position.parent]);
    this.schema = model.schema;
    this._documentFragment = writer.createDocumentFragment();
    this._documentFragmentPosition = writer.createPositionAt(this._documentFragment, 0);
  }
  handleNodes(nodes) {
    for (const node of Array.from(nodes)) {
      this._handleNode(node);
    }
    this._insertPartialFragment();
    if (this._lastAutoParagraph) {
      this._updateLastNodeFromAutoParagraph(this._lastAutoParagraph);
    }
    this._mergeOnRight();
    this.schema.removeDisallowedAttributes(this._filterAttributesOf, this.writer);
    this._filterAttributesOf = [];
  }
  _updateLastNodeFromAutoParagraph(node) {
    const positionAfterLastNode = this.writer.createPositionAfter(this._lastNode);
    const positionAfterNode = this.writer.createPositionAfter(node);
    if (positionAfterNode.isAfter(positionAfterLastNode)) {
      this._lastNode = node;
      /* istanbul ignore if -- @preserve */
      if (this.position.parent != node || !this.position.isAtEnd) {
        throw new CKEditorError45("insertcontent-invalid-insertion-position", this);
      }
      this.position = positionAfterNode;
      this._setAffectedBoundaries(this.position);
    }
  }
  getSelectionRange() {
    if (this._nodeToSelect) {
      return range_default2._createOn(this._nodeToSelect);
    }
    return this.model.schema.getNearestSelectionRange(this.position);
  }
  getAffectedRange() {
    if (!this._affectedStart) {
      return null;
    }
    return new range_default2(this._affectedStart, this._affectedEnd);
  }
  destroy() {
    if (this._affectedStart) {
      this._affectedStart.detach();
    }
    if (this._affectedEnd) {
      this._affectedEnd.detach();
    }
  }
  _handleNode(node) {
    if (this.schema.isObject(node)) {
      this._handleObject(node);
      return;
    }
    let isAllowed = this._checkAndAutoParagraphToAllowedPosition(node);
    if (!isAllowed) {
      isAllowed = this._checkAndSplitToAllowedPosition(node);
      if (!isAllowed) {
        this._handleDisallowedNode(node);
        return;
      }
    }
    this._appendToFragment(node);
    if (!this._firstNode) {
      this._firstNode = node;
    }
    this._lastNode = node;
  }
  _insertPartialFragment() {
    if (this._documentFragment.isEmpty) {
      return;
    }
    const livePosition = liveposition_default.fromPosition(this.position, "toNext");
    this._setAffectedBoundaries(this.position);
    if (this._documentFragment.getChild(0) == this._firstNode) {
      this.writer.insert(this._firstNode, this.position);
      this._mergeOnLeft();
      this.position = livePosition.toPosition();
    }
    if (!this._documentFragment.isEmpty) {
      this.writer.insert(this._documentFragment, this.position);
    }
    this._documentFragmentPosition = this.writer.createPositionAt(this._documentFragment, 0);
    this.position = livePosition.toPosition();
    livePosition.detach();
  }
  _handleObject(node) {
    if (this._checkAndSplitToAllowedPosition(node)) {
      this._appendToFragment(node);
    } else {
      this._tryAutoparagraphing(node);
    }
  }
  _handleDisallowedNode(node) {
    if (node.is("element")) {
      this.handleNodes(node.getChildren());
    } else {
      this._tryAutoparagraphing(node);
    }
  }
  _appendToFragment(node) {
    /* istanbul ignore if -- @preserve */
    if (!this.schema.checkChild(this.position, node)) {
      throw new CKEditorError45("insertcontent-wrong-position", this, {node, position: this.position});
    }
    this.writer.insert(node, this._documentFragmentPosition);
    this._documentFragmentPosition = this._documentFragmentPosition.getShiftedBy(node.offsetSize);
    if (this.schema.isObject(node) && !this.schema.checkChild(this.position, "$text")) {
      this._nodeToSelect = node;
    } else {
      this._nodeToSelect = null;
    }
    this._filterAttributesOf.push(node);
  }
  _setAffectedBoundaries(position) {
    if (!this._affectedStart) {
      this._affectedStart = liveposition_default.fromPosition(position, "toPrevious");
    }
    if (!this._affectedEnd || this._affectedEnd.isBefore(position)) {
      if (this._affectedEnd) {
        this._affectedEnd.detach();
      }
      this._affectedEnd = liveposition_default.fromPosition(position, "toNext");
    }
  }
  _mergeOnLeft() {
    const node = this._firstNode;
    if (!(node instanceof element_default2)) {
      return;
    }
    if (!this._canMergeLeft(node)) {
      return;
    }
    const mergePosLeft = liveposition_default._createBefore(node);
    mergePosLeft.stickiness = "toNext";
    const livePosition = liveposition_default.fromPosition(this.position, "toNext");
    if (this._affectedStart.isEqual(mergePosLeft)) {
      this._affectedStart.detach();
      this._affectedStart = liveposition_default._createAt(mergePosLeft.nodeBefore, "end", "toPrevious");
    }
    if (this._firstNode === this._lastNode) {
      this._firstNode = mergePosLeft.nodeBefore;
      this._lastNode = mergePosLeft.nodeBefore;
    }
    this.writer.merge(mergePosLeft);
    if (mergePosLeft.isEqual(this._affectedEnd) && this._firstNode === this._lastNode) {
      this._affectedEnd.detach();
      this._affectedEnd = liveposition_default._createAt(mergePosLeft.nodeBefore, "end", "toNext");
    }
    this.position = livePosition.toPosition();
    livePosition.detach();
    this._filterAttributesOf.push(this.position.parent);
    mergePosLeft.detach();
  }
  _mergeOnRight() {
    const node = this._lastNode;
    if (!(node instanceof element_default2)) {
      return;
    }
    if (!this._canMergeRight(node)) {
      return;
    }
    const mergePosRight = liveposition_default._createAfter(node);
    mergePosRight.stickiness = "toNext";
    /* istanbul ignore if -- @preserve */
    if (!this.position.isEqual(mergePosRight)) {
      throw new CKEditorError45("insertcontent-invalid-insertion-position", this);
    }
    this.position = position_default2._createAt(mergePosRight.nodeBefore, "end");
    const livePosition = liveposition_default.fromPosition(this.position, "toPrevious");
    if (this._affectedEnd.isEqual(mergePosRight)) {
      this._affectedEnd.detach();
      this._affectedEnd = liveposition_default._createAt(mergePosRight.nodeBefore, "end", "toNext");
    }
    if (this._firstNode === this._lastNode) {
      this._firstNode = mergePosRight.nodeBefore;
      this._lastNode = mergePosRight.nodeBefore;
    }
    this.writer.merge(mergePosRight);
    if (mergePosRight.getShiftedBy(-1).isEqual(this._affectedStart) && this._firstNode === this._lastNode) {
      this._affectedStart.detach();
      this._affectedStart = liveposition_default._createAt(mergePosRight.nodeBefore, 0, "toPrevious");
    }
    this.position = livePosition.toPosition();
    livePosition.detach();
    this._filterAttributesOf.push(this.position.parent);
    mergePosRight.detach();
  }
  _canMergeLeft(node) {
    const previousSibling = node.previousSibling;
    return previousSibling instanceof element_default2 && this.canMergeWith.has(previousSibling) && this.model.schema.checkMerge(previousSibling, node);
  }
  _canMergeRight(node) {
    const nextSibling = node.nextSibling;
    return nextSibling instanceof element_default2 && this.canMergeWith.has(nextSibling) && this.model.schema.checkMerge(node, nextSibling);
  }
  _tryAutoparagraphing(node) {
    const paragraph = this.writer.createElement("paragraph");
    if (this._getAllowedIn(this.position.parent, paragraph) && this.schema.checkChild(paragraph, node)) {
      paragraph._appendChild(node);
      this._handleNode(paragraph);
    }
  }
  _checkAndAutoParagraphToAllowedPosition(node) {
    if (this.schema.checkChild(this.position.parent, node)) {
      return true;
    }
    if (!this.schema.checkChild(this.position.parent, "paragraph") || !this.schema.checkChild("paragraph", node)) {
      return false;
    }
    this._insertPartialFragment();
    const paragraph = this.writer.createElement("paragraph");
    this.writer.insert(paragraph, this.position);
    this._setAffectedBoundaries(this.position);
    this._lastAutoParagraph = paragraph;
    this.position = this.writer.createPositionAt(paragraph, 0);
    return true;
  }
  _checkAndSplitToAllowedPosition(node) {
    const allowedIn = this._getAllowedIn(this.position.parent, node);
    if (!allowedIn) {
      return false;
    }
    if (allowedIn != this.position.parent) {
      this._insertPartialFragment();
    }
    while (allowedIn != this.position.parent) {
      if (this.position.isAtStart) {
        const parent = this.position.parent;
        this.position = this.writer.createPositionBefore(parent);
        if (parent.isEmpty && parent.parent === allowedIn) {
          this.writer.remove(parent);
        }
      } else if (this.position.isAtEnd) {
        this.position = this.writer.createPositionAfter(this.position.parent);
      } else {
        const tempPos = this.writer.createPositionAfter(this.position.parent);
        this._setAffectedBoundaries(this.position);
        this.writer.split(this.position);
        this.position = tempPos;
        this.canMergeWith.add(this.position.nodeAfter);
      }
    }
    return true;
  }
  _getAllowedIn(contextElement, childNode) {
    if (this.schema.checkChild(contextElement, childNode)) {
      return contextElement;
    }
    if (this.schema.isLimit(contextElement)) {
      return null;
    }
    return this._getAllowedIn(contextElement.parent, childNode);
  }
};

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/findoptimalinsertionrange.js
import {first as first2} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function findOptimalInsertionRange(selection, model, place = "auto") {
  const selectedElement = selection.getSelectedElement();
  if (selectedElement && model.schema.isObject(selectedElement) && !model.schema.isInline(selectedElement)) {
    if (place == "before" || place == "after") {
      return model.createRange(model.createPositionAt(selectedElement, place));
    }
    return model.createRangeOn(selectedElement);
  }
  const firstBlock = first2(selection.getSelectedBlocks());
  if (!firstBlock) {
    return model.createRange(selection.focus);
  }
  if (firstBlock.isEmpty) {
    return model.createRange(model.createPositionAt(firstBlock, 0));
  }
  const positionAfter = model.createPositionAfter(firstBlock);
  if (selection.focus.isTouching(positionAfter)) {
    return model.createRange(positionAfter);
  }
  return model.createRange(model.createPositionBefore(firstBlock));
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/insertobject.js
import {CKEditorError as CKEditorError46, first as first3} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function insertObject(model, object, selectable, options = {}) {
  if (!model.schema.isObject(object)) {
    throw new CKEditorError46("insertobject-element-not-an-object", model, {object});
  }
  const originalSelection = selectable ? selectable : model.document.selection;
  let insertionSelection = originalSelection;
  if (options.findOptimalPosition && model.schema.isBlock(object)) {
    insertionSelection = model.createSelection(findOptimalInsertionRange(originalSelection, model, options.findOptimalPosition));
  }
  const firstSelectedBlock = first3(originalSelection.getSelectedBlocks());
  const attributesToCopy = {};
  if (firstSelectedBlock) {
    Object.assign(attributesToCopy, model.schema.getAttributesWithProperty(firstSelectedBlock, "copyOnReplace", true));
  }
  return model.change((writer) => {
    if (!insertionSelection.isCollapsed) {
      model.deleteContent(insertionSelection, {doNotAutoparagraph: true});
    }
    let elementToInsert = object;
    const insertionPositionParent = insertionSelection.anchor.parent;
    if (!model.schema.checkChild(insertionPositionParent, object) && model.schema.checkChild(insertionPositionParent, "paragraph") && model.schema.checkChild("paragraph", object)) {
      elementToInsert = writer.createElement("paragraph");
      writer.insert(object, elementToInsert);
    }
    model.schema.setAllowedAttributes(elementToInsert, attributesToCopy, writer);
    const affectedRange = model.insertContent(elementToInsert, insertionSelection);
    if (affectedRange.isCollapsed) {
      return affectedRange;
    }
    if (options.setSelection) {
      updateSelection(writer, object, options.setSelection, attributesToCopy);
    }
    return affectedRange;
  });
}
function updateSelection(writer, contextElement, place, paragraphAttributes) {
  const model = writer.model;
  if (place == "on") {
    writer.setSelection(contextElement, "on");
    return;
  }
  if (place != "after") {
    throw new CKEditorError46("insertobject-invalid-place-parameter-value", model);
  }
  let nextElement = contextElement.nextSibling;
  if (model.schema.isInline(contextElement)) {
    writer.setSelection(contextElement, "after");
    return;
  }
  const canSetSelection = nextElement && model.schema.checkChild(nextElement, "$text");
  if (!canSetSelection && model.schema.checkChild(contextElement.parent, "paragraph")) {
    nextElement = writer.createElement("paragraph");
    model.schema.setAllowedAttributes(nextElement, paragraphAttributes, writer);
    model.insertContent(nextElement, writer.createPositionAfter(contextElement));
  }
  if (nextElement) {
    writer.setSelection(nextElement, 0);
  }
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/utils/modifyselection.js
import {isInsideSurrogatePair as isInsideSurrogatePair2, isInsideCombinedSymbol as isInsideCombinedSymbol2, isInsideEmojiSequence} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var wordBoundaryCharacters = ' ,.?!:;"-()';
function modifySelection(model, selection, options = {}) {
  const schema = model.schema;
  const isForward = options.direction != "backward";
  const unit = options.unit ? options.unit : "character";
  const treatEmojiAsSingleUnit = !!options.treatEmojiAsSingleUnit;
  const focus = selection.focus;
  const walker = new treewalker_default2({
    boundaries: getSearchRange(focus, isForward),
    singleCharacters: true,
    direction: isForward ? "forward" : "backward"
  });
  const data = {walker, schema, isForward, unit, treatEmojiAsSingleUnit};
  let next;
  while (next = walker.next()) {
    if (next.done) {
      return;
    }
    const position = tryExtendingTo(data, next.value);
    if (position) {
      if (selection instanceof documentselection_default2) {
        model.change((writer) => {
          writer.setSelectionFocus(position);
        });
      } else {
        selection.setFocus(position);
      }
      return;
    }
  }
}
function tryExtendingTo(data, value) {
  const {isForward, walker, unit, schema, treatEmojiAsSingleUnit} = data;
  const {type, item, nextPosition} = value;
  if (type == "text") {
    if (data.unit === "word") {
      return getCorrectWordBreakPosition(walker, isForward);
    }
    return getCorrectPosition(walker, unit, treatEmojiAsSingleUnit);
  }
  if (type == (isForward ? "elementStart" : "elementEnd")) {
    if (schema.isSelectable(item)) {
      return position_default2._createAt(item, isForward ? "after" : "before");
    }
    if (schema.checkChild(nextPosition, "$text")) {
      return nextPosition;
    }
  } else {
    if (schema.isLimit(item)) {
      walker.skip(() => true);
      return;
    }
    if (schema.checkChild(nextPosition, "$text")) {
      return nextPosition;
    }
  }
}
function getCorrectPosition(walker, unit, treatEmojiAsSingleUnit) {
  const textNode = walker.position.textNode;
  if (textNode) {
    const data = textNode.data;
    let offset = walker.position.offset - textNode.startOffset;
    while (isInsideSurrogatePair2(data, offset) || unit == "character" && isInsideCombinedSymbol2(data, offset) || treatEmojiAsSingleUnit && isInsideEmojiSequence(data, offset)) {
      walker.next();
      offset = walker.position.offset - textNode.startOffset;
    }
  }
  return walker.position;
}
function getCorrectWordBreakPosition(walker, isForward) {
  let textNode = walker.position.textNode;
  if (!textNode) {
    textNode = isForward ? walker.position.nodeAfter : walker.position.nodeBefore;
  }
  while (textNode && textNode.is("$text")) {
    const offset = walker.position.offset - textNode.startOffset;
    if (isAtNodeBoundary(textNode, offset, isForward)) {
      textNode = isForward ? walker.position.nodeAfter : walker.position.nodeBefore;
    } else if (isAtWordBoundary(textNode.data, offset, isForward)) {
      break;
    } else {
      walker.next();
    }
  }
  return walker.position;
}
function getSearchRange(start, isForward) {
  const root = start.root;
  const searchEnd = position_default2._createAt(root, isForward ? "end" : 0);
  if (isForward) {
    return new range_default2(start, searchEnd);
  } else {
    return new range_default2(searchEnd, start);
  }
}
function isAtWordBoundary(data, offset, isForward) {
  const offsetToCheck = offset + (isForward ? 0 : -1);
  return wordBoundaryCharacters.includes(data.charAt(offsetToCheck));
}
function isAtNodeBoundary(textNode, offset, isForward) {
  return offset === (isForward ? textNode.offsetSize : 0);
}

// node_modules/@ckeditor/ckeditor5-engine/src/model/model.js
import {CKEditorError as CKEditorError47, ObservableMixin as ObservableMixin8} from "es-ckeditor-lib/lib/utils";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Model = class extends ObservableMixin8() {
  constructor() {
    super();
    this.markers = new markercollection_default();
    this.document = new document_default2(this);
    this.schema = new schema_default();
    this._pendingChanges = [];
    this._currentWriter = null;
    ["deleteContent", "modifySelection", "getSelectedContent", "applyOperation"].forEach((methodName) => this.decorate(methodName));
    this.on("applyOperation", (evt, args) => {
      const operation = args[0];
      operation._validate();
    }, {priority: "highest"});
    this.schema.register("$root", {
      isLimit: true
    });
    this.schema.register("$container", {
      allowIn: ["$root", "$container"]
    });
    this.schema.register("$block", {
      allowIn: ["$root", "$container"],
      isBlock: true
    });
    this.schema.register("$blockObject", {
      allowWhere: "$block",
      isBlock: true,
      isObject: true
    });
    this.schema.register("$inlineObject", {
      allowWhere: "$text",
      allowAttributesOf: "$text",
      isInline: true,
      isObject: true
    });
    this.schema.register("$text", {
      allowIn: "$block",
      isInline: true,
      isContent: true
    });
    this.schema.register("$clipboardHolder", {
      allowContentOf: "$root",
      allowChildren: "$text",
      isLimit: true
    });
    this.schema.register("$documentFragment", {
      allowContentOf: "$root",
      allowChildren: "$text",
      isLimit: true
    });
    this.schema.register("$marker");
    this.schema.addChildCheck((context, childDefinition) => {
      if (childDefinition.name === "$marker") {
        return true;
      }
    });
    injectSelectionPostFixer(this);
    this.document.registerPostFixer(autoParagraphEmptyRoots);
    this.on("insertContent", (evt, [content, selectable]) => {
      evt.return = insertContent(this, content, selectable);
    });
    this.on("insertObject", (evt, [element, selection, options]) => {
      evt.return = insertObject(this, element, selection, options);
    });
    this.on("canEditAt", (evt) => {
      const canEditAt = !this.document.isReadOnly;
      evt.return = canEditAt;
      if (!canEditAt) {
        evt.stop();
      }
    });
  }
  change(callback) {
    try {
      if (this._pendingChanges.length === 0) {
        this._pendingChanges.push({batch: new batch_default(), callback});
        return this._runPendingChanges()[0];
      } else {
        return callback(this._currentWriter);
      }
    } catch (err) {
      /* istanbul ignore next -- @preserve */
      CKEditorError47.rethrowUnexpectedError(err, this);
    }
  }
  enqueueChange(batchOrType, callback) {
    try {
      if (!batchOrType) {
        batchOrType = new batch_default();
      } else if (typeof batchOrType === "function") {
        callback = batchOrType;
        batchOrType = new batch_default();
      } else if (!(batchOrType instanceof batch_default)) {
        batchOrType = new batch_default(batchOrType);
      }
      this._pendingChanges.push({batch: batchOrType, callback});
      if (this._pendingChanges.length == 1) {
        this._runPendingChanges();
      }
    } catch (err) {
      /* istanbul ignore next -- @preserve */
      CKEditorError47.rethrowUnexpectedError(err, this);
    }
  }
  applyOperation(operation) {
    operation._execute();
  }
  insertContent(content, selectable, placeOrOffset, ...rest) {
    const selection = normalizeSelectable(selectable, placeOrOffset);
    return this.fire("insertContent", [content, selection, placeOrOffset, ...rest]);
  }
  insertObject(element, selectable, placeOrOffset, options, ...rest) {
    const selection = normalizeSelectable(selectable, placeOrOffset);
    return this.fire("insertObject", [element, selection, options, options, ...rest]);
  }
  deleteContent(selection, options) {
    deleteContent(this, selection, options);
  }
  modifySelection(selection, options) {
    modifySelection(this, selection, options);
  }
  getSelectedContent(selection) {
    return getSelectedContent(this, selection);
  }
  hasContent(rangeOrElement, options = {}) {
    const range = rangeOrElement instanceof range_default2 ? rangeOrElement : range_default2._createIn(rangeOrElement);
    if (range.isCollapsed) {
      return false;
    }
    const {ignoreWhitespaces = false, ignoreMarkers = false} = options;
    if (!ignoreMarkers) {
      for (const intersectingMarker of this.markers.getMarkersIntersectingRange(range)) {
        if (intersectingMarker.affectsData) {
          return true;
        }
      }
    }
    for (const item of range.getItems()) {
      if (this.schema.isContent(item)) {
        if (item.is("$textProxy")) {
          if (!ignoreWhitespaces) {
            return true;
          } else if (item.data.search(/\S/) !== -1) {
            return true;
          }
        } else {
          return true;
        }
      }
    }
    return false;
  }
  canEditAt(selectable) {
    const selection = normalizeSelectable(selectable);
    return this.fire("canEditAt", [selection]);
  }
  createPositionFromPath(root, path, stickiness) {
    return new position_default2(root, path, stickiness);
  }
  createPositionAt(itemOrPosition, offset) {
    return position_default2._createAt(itemOrPosition, offset);
  }
  createPositionAfter(item) {
    return position_default2._createAfter(item);
  }
  createPositionBefore(item) {
    return position_default2._createBefore(item);
  }
  createRange(start, end) {
    return new range_default2(start, end);
  }
  createRangeIn(element) {
    return range_default2._createIn(element);
  }
  createRangeOn(item) {
    return range_default2._createOn(item);
  }
  createSelection(...args) {
    return new selection_default2(...args);
  }
  createBatch(type) {
    return new batch_default(type);
  }
  createOperationFromJSON(json) {
    return operationfactory_default.fromJSON(json, this.document);
  }
  destroy() {
    this.document.destroy();
    this.stopListening();
  }
  _runPendingChanges() {
    const ret = [];
    this.fire("_beforeChanges");
    try {
      while (this._pendingChanges.length) {
        const currentBatch = this._pendingChanges[0].batch;
        this._currentWriter = new writer_default(this, currentBatch);
        const callbackReturnValue = this._pendingChanges[0].callback(this._currentWriter);
        ret.push(callbackReturnValue);
        this.document._handleChangeBlock(this._currentWriter);
        this._pendingChanges.shift();
        this._currentWriter = null;
      }
    } finally {
      this._pendingChanges.length = 0;
      this._currentWriter = null;
      this.fire("_afterChanges");
    }
    return ret;
  }
};
var model_default = Model;
function normalizeSelectable(selectable, placeOrOffset) {
  if (!selectable) {
    return;
  }
  if (selectable instanceof selection_default2 || selectable instanceof documentselection_default2) {
    return selectable;
  }
  if (selectable instanceof node_default2) {
    if (placeOrOffset || placeOrOffset === 0) {
      return new selection_default2(selectable, placeOrOffset);
    } else if (selectable.is("rootElement")) {
      return new selection_default2(selectable, "in");
    } else {
      return new selection_default2(selectable, "on");
    }
  }
  return new selection_default2(selectable);
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/clickobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ClickObserver = class extends domeventobserver_default {
  constructor() {
    super(...arguments);
    this.domEventType = "click";
  }
  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
};
var clickobserver_default = ClickObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/observer/mouseobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var MouseObserver = class extends domeventobserver_default {
  constructor() {
    super(...arguments);
    this.domEventType = ["mousedown", "mouseup", "mouseover", "mouseout"];
  }
  onDomEvent(domEvent) {
    this.fire(domEvent.type, domEvent);
  }
};
var mouseobserver_default = MouseObserver;

// node_modules/@ckeditor/ckeditor5-engine/src/view/upcastwriter.js
import {isPlainObject as isPlainObject3} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var UpcastWriter = class {
  constructor(document2) {
    this.document = document2;
  }
  createDocumentFragment(children) {
    return new documentfragment_default(this.document, children);
  }
  createElement(name, attrs, children) {
    return new element_default(this.document, name, attrs, children);
  }
  createText(data) {
    return new text_default(this.document, data);
  }
  clone(element, deep = false) {
    return element._clone(deep);
  }
  appendChild(items, element) {
    return element._appendChild(items);
  }
  insertChild(index, items, element) {
    return element._insertChild(index, items);
  }
  removeChildren(index, howMany, element) {
    return element._removeChildren(index, howMany);
  }
  remove(element) {
    const parent = element.parent;
    if (parent) {
      return this.removeChildren(parent.getChildIndex(element), 1, parent);
    }
    return [];
  }
  replace(oldElement, newElement) {
    const parent = oldElement.parent;
    if (parent) {
      const index = parent.getChildIndex(oldElement);
      this.removeChildren(index, 1, parent);
      this.insertChild(index, newElement, parent);
      return true;
    }
    return false;
  }
  unwrapElement(element) {
    const parent = element.parent;
    if (parent) {
      const index = parent.getChildIndex(element);
      this.remove(element);
      this.insertChild(index, element.getChildren(), parent);
    }
  }
  rename(newName, element) {
    const newElement = new element_default(this.document, newName, element.getAttributes(), element.getChildren());
    return this.replace(element, newElement) ? newElement : null;
  }
  setAttribute(key, value, element) {
    element._setAttribute(key, value);
  }
  removeAttribute(key, element) {
    element._removeAttribute(key);
  }
  addClass(className, element) {
    element._addClass(className);
  }
  removeClass(className, element) {
    element._removeClass(className);
  }
  setStyle(property, valueOrElement, element) {
    if (isPlainObject3(property) && element === void 0) {
      valueOrElement._setStyle(property);
    } else {
      element._setStyle(property, valueOrElement);
    }
  }
  removeStyle(property, element) {
    element._removeStyle(property);
  }
  setCustomProperty(key, value, element) {
    element._setCustomProperty(key, value);
  }
  removeCustomProperty(key, element) {
    return element._removeCustomProperty(key);
  }
  createPositionAt(itemOrPosition, offset) {
    return position_default._createAt(itemOrPosition, offset);
  }
  createPositionAfter(item) {
    return position_default._createAfter(item);
  }
  createPositionBefore(item) {
    return position_default._createBefore(item);
  }
  createRange(start, end) {
    return new range_default(start, end);
  }
  createRangeOn(item) {
    return range_default._createOn(item);
  }
  createRangeIn(element) {
    return range_default._createIn(element);
  }
  createSelection(...args) {
    return new selection_default(...args);
  }
};
var upcastwriter_default = UpcastWriter;

// node_modules/@ckeditor/ckeditor5-engine/src/view/styles/utils.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var HEX_COLOR_REGEXP = /^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
var RGB_COLOR_REGEXP = /^rgb\([ ]?([0-9]{1,3}[ %]?,[ ]?){2,3}[0-9]{1,3}[ %]?\)$/i;
var RGBA_COLOR_REGEXP = /^rgba\([ ]?([0-9]{1,3}[ %]?,[ ]?){3}(1|[0-9]+%|[0]?\.?[0-9]+)\)$/i;
var HSL_COLOR_REGEXP = /^hsl\([ ]?([0-9]{1,3}[ %]?[,]?[ ]*){3}(1|[0-9]+%|[0]?\.?[0-9]+)?\)$/i;
var HSLA_COLOR_REGEXP = /^hsla\([ ]?([0-9]{1,3}[ %]?,[ ]?){2,3}(1|[0-9]+%|[0]?\.?[0-9]+)\)$/i;
var CSS_SHORTHAND_VALUE_REGEXP = /\w+\((?:[^()]|\([^()]*\))*\)|\S+/gi;
var COLOR_NAMES = new Set([
  "black",
  "silver",
  "gray",
  "white",
  "maroon",
  "red",
  "purple",
  "fuchsia",
  "green",
  "lime",
  "olive",
  "yellow",
  "navy",
  "blue",
  "teal",
  "aqua",
  "orange",
  "aliceblue",
  "antiquewhite",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "limegreen",
  "linen",
  "magenta",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "oldlace",
  "olivedrab",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "whitesmoke",
  "yellowgreen",
  "activeborder",
  "activecaption",
  "appworkspace",
  "background",
  "buttonface",
  "buttonhighlight",
  "buttonshadow",
  "buttontext",
  "captiontext",
  "graytext",
  "highlight",
  "highlighttext",
  "inactiveborder",
  "inactivecaption",
  "inactivecaptiontext",
  "infobackground",
  "infotext",
  "menu",
  "menutext",
  "scrollbar",
  "threeddarkshadow",
  "threedface",
  "threedhighlight",
  "threedlightshadow",
  "threedshadow",
  "window",
  "windowframe",
  "windowtext",
  "rebeccapurple",
  "currentcolor",
  "transparent"
]);
function isColor(string) {
  if (string.startsWith("#")) {
    return HEX_COLOR_REGEXP.test(string);
  }
  if (string.startsWith("rgb")) {
    return RGB_COLOR_REGEXP.test(string) || RGBA_COLOR_REGEXP.test(string);
  }
  if (string.startsWith("hsl")) {
    return HSL_COLOR_REGEXP.test(string) || HSLA_COLOR_REGEXP.test(string);
  }
  return COLOR_NAMES.has(string.toLowerCase());
}
var lineStyleValues = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
function isLineStyle(string) {
  return lineStyleValues.includes(string);
}
var lengthRegExp = /^([+-]?[0-9]*([.][0-9]+)?(px|cm|mm|in|pc|pt|ch|em|ex|rem|vh|vw|vmin|vmax)|0)$/;
function isLength(string) {
  return lengthRegExp.test(string);
}
var PERCENTAGE_VALUE_REGEXP = /^[+-]?[0-9]*([.][0-9]+)?%$/;
function isPercentage(string) {
  return PERCENTAGE_VALUE_REGEXP.test(string);
}
var repeatValues = ["repeat-x", "repeat-y", "repeat", "space", "round", "no-repeat"];
function isRepeat(string) {
  return repeatValues.includes(string);
}
var positionValues = ["center", "top", "bottom", "left", "right"];
function isPosition(string) {
  return positionValues.includes(string);
}
var attachmentValues = ["fixed", "scroll", "local"];
function isAttachment(string) {
  return attachmentValues.includes(string);
}
var urlRegExp = /^url\(/;
function isURL(string) {
  return urlRegExp.test(string);
}
function getBoxSidesValues(value = "") {
  if (value === "") {
    return {top: void 0, right: void 0, bottom: void 0, left: void 0};
  }
  const values = getShorthandValues(value);
  const top = values[0];
  const bottom = values[2] || top;
  const right = values[1] || top;
  const left = values[3] || right;
  return {top, bottom, right, left};
}
function getBoxSidesValueReducer(styleShorthand) {
  return (value) => {
    const {top, right, bottom, left} = value;
    const reduced = [];
    if (![top, right, left, bottom].every((value2) => !!value2)) {
      if (top) {
        reduced.push([styleShorthand + "-top", top]);
      }
      if (right) {
        reduced.push([styleShorthand + "-right", right]);
      }
      if (bottom) {
        reduced.push([styleShorthand + "-bottom", bottom]);
      }
      if (left) {
        reduced.push([styleShorthand + "-left", left]);
      }
    } else {
      reduced.push([styleShorthand, getBoxSidesShorthandValue(value)]);
    }
    return reduced;
  };
}
function getBoxSidesShorthandValue({top, right, bottom, left}) {
  const out = [];
  if (left !== right) {
    out.push(top, right, bottom, left);
  } else if (bottom !== top) {
    out.push(top, right, bottom);
  } else if (right !== top) {
    out.push(top, right);
  } else {
    out.push(top);
  }
  return out.join(" ");
}
function getPositionShorthandNormalizer(shorthand) {
  return (value) => {
    return {
      path: shorthand,
      value: getBoxSidesValues(value)
    };
  };
}
function getShorthandValues(string) {
  const matches = string.matchAll(CSS_SHORTHAND_VALUE_REGEXP);
  return Array.from(matches).map((i) => i[0]);
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/styles/background.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function addBackgroundRules(stylesProcessor) {
  stylesProcessor.setNormalizer("background", getBackgroundNormalizer());
  stylesProcessor.setNormalizer("background-color", getBackgroundColorNormalizer());
  stylesProcessor.setReducer("background", getBackgroundReducer());
  stylesProcessor.setStyleRelation("background", ["background-color"]);
}
function getBackgroundNormalizer() {
  return (value) => {
    const background = {};
    const parts = getShorthandValues(value);
    for (const part of parts) {
      if (isRepeat(part)) {
        background.repeat = background.repeat || [];
        background.repeat.push(part);
      } else if (isPosition(part)) {
        background.position = background.position || [];
        background.position.push(part);
      } else if (isAttachment(part)) {
        background.attachment = part;
      } else if (isColor(part)) {
        background.color = part;
      } else if (isURL(part)) {
        background.image = part;
      }
    }
    return {
      path: "background",
      value: background
    };
  };
}
function getBackgroundColorNormalizer() {
  return (value) => ({path: "background.color", value});
}
function getBackgroundReducer() {
  return (value) => {
    const ret = [];
    ret.push(["background-color", value.color]);
    return ret;
  };
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/styles/border.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function addBorderRules(stylesProcessor) {
  stylesProcessor.setNormalizer("border", getBorderNormalizer());
  stylesProcessor.setNormalizer("border-top", getBorderPositionNormalizer("top"));
  stylesProcessor.setNormalizer("border-right", getBorderPositionNormalizer("right"));
  stylesProcessor.setNormalizer("border-bottom", getBorderPositionNormalizer("bottom"));
  stylesProcessor.setNormalizer("border-left", getBorderPositionNormalizer("left"));
  stylesProcessor.setNormalizer("border-color", getBorderPropertyNormalizer("color"));
  stylesProcessor.setNormalizer("border-width", getBorderPropertyNormalizer("width"));
  stylesProcessor.setNormalizer("border-style", getBorderPropertyNormalizer("style"));
  stylesProcessor.setNormalizer("border-top-color", getBorderPropertyPositionNormalizer("color", "top"));
  stylesProcessor.setNormalizer("border-top-style", getBorderPropertyPositionNormalizer("style", "top"));
  stylesProcessor.setNormalizer("border-top-width", getBorderPropertyPositionNormalizer("width", "top"));
  stylesProcessor.setNormalizer("border-right-color", getBorderPropertyPositionNormalizer("color", "right"));
  stylesProcessor.setNormalizer("border-right-style", getBorderPropertyPositionNormalizer("style", "right"));
  stylesProcessor.setNormalizer("border-right-width", getBorderPropertyPositionNormalizer("width", "right"));
  stylesProcessor.setNormalizer("border-bottom-color", getBorderPropertyPositionNormalizer("color", "bottom"));
  stylesProcessor.setNormalizer("border-bottom-style", getBorderPropertyPositionNormalizer("style", "bottom"));
  stylesProcessor.setNormalizer("border-bottom-width", getBorderPropertyPositionNormalizer("width", "bottom"));
  stylesProcessor.setNormalizer("border-left-color", getBorderPropertyPositionNormalizer("color", "left"));
  stylesProcessor.setNormalizer("border-left-style", getBorderPropertyPositionNormalizer("style", "left"));
  stylesProcessor.setNormalizer("border-left-width", getBorderPropertyPositionNormalizer("width", "left"));
  stylesProcessor.setExtractor("border-top", getBorderPositionExtractor("top"));
  stylesProcessor.setExtractor("border-right", getBorderPositionExtractor("right"));
  stylesProcessor.setExtractor("border-bottom", getBorderPositionExtractor("bottom"));
  stylesProcessor.setExtractor("border-left", getBorderPositionExtractor("left"));
  stylesProcessor.setExtractor("border-top-color", "border.color.top");
  stylesProcessor.setExtractor("border-right-color", "border.color.right");
  stylesProcessor.setExtractor("border-bottom-color", "border.color.bottom");
  stylesProcessor.setExtractor("border-left-color", "border.color.left");
  stylesProcessor.setExtractor("border-top-width", "border.width.top");
  stylesProcessor.setExtractor("border-right-width", "border.width.right");
  stylesProcessor.setExtractor("border-bottom-width", "border.width.bottom");
  stylesProcessor.setExtractor("border-left-width", "border.width.left");
  stylesProcessor.setExtractor("border-top-style", "border.style.top");
  stylesProcessor.setExtractor("border-right-style", "border.style.right");
  stylesProcessor.setExtractor("border-bottom-style", "border.style.bottom");
  stylesProcessor.setExtractor("border-left-style", "border.style.left");
  stylesProcessor.setReducer("border-color", getBoxSidesValueReducer("border-color"));
  stylesProcessor.setReducer("border-style", getBoxSidesValueReducer("border-style"));
  stylesProcessor.setReducer("border-width", getBoxSidesValueReducer("border-width"));
  stylesProcessor.setReducer("border-top", getBorderPositionReducer("top"));
  stylesProcessor.setReducer("border-right", getBorderPositionReducer("right"));
  stylesProcessor.setReducer("border-bottom", getBorderPositionReducer("bottom"));
  stylesProcessor.setReducer("border-left", getBorderPositionReducer("left"));
  stylesProcessor.setReducer("border", getBorderReducer());
  stylesProcessor.setStyleRelation("border", [
    "border-color",
    "border-style",
    "border-width",
    "border-top",
    "border-right",
    "border-bottom",
    "border-left",
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color",
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width"
  ]);
  stylesProcessor.setStyleRelation("border-color", [
    "border-top-color",
    "border-right-color",
    "border-bottom-color",
    "border-left-color"
  ]);
  stylesProcessor.setStyleRelation("border-style", [
    "border-top-style",
    "border-right-style",
    "border-bottom-style",
    "border-left-style"
  ]);
  stylesProcessor.setStyleRelation("border-width", [
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width"
  ]);
  stylesProcessor.setStyleRelation("border-top", ["border-top-color", "border-top-style", "border-top-width"]);
  stylesProcessor.setStyleRelation("border-right", ["border-right-color", "border-right-style", "border-right-width"]);
  stylesProcessor.setStyleRelation("border-bottom", ["border-bottom-color", "border-bottom-style", "border-bottom-width"]);
  stylesProcessor.setStyleRelation("border-left", ["border-left-color", "border-left-style", "border-left-width"]);
}
function getBorderNormalizer() {
  return (value) => {
    const {color, style, width} = normalizeBorderShorthand(value);
    return {
      path: "border",
      value: {
        color: getBoxSidesValues(color),
        style: getBoxSidesValues(style),
        width: getBoxSidesValues(width)
      }
    };
  };
}
function getBorderPositionNormalizer(side) {
  return (value) => {
    const {color, style, width} = normalizeBorderShorthand(value);
    const border = {};
    if (color !== void 0) {
      border.color = {[side]: color};
    }
    if (style !== void 0) {
      border.style = {[side]: style};
    }
    if (width !== void 0) {
      border.width = {[side]: width};
    }
    return {
      path: "border",
      value: border
    };
  };
}
function getBorderPropertyNormalizer(propertyName) {
  return (value) => {
    return {
      path: "border",
      value: toBorderPropertyShorthand(value, propertyName)
    };
  };
}
function toBorderPropertyShorthand(value, property) {
  return {
    [property]: getBoxSidesValues(value)
  };
}
function getBorderPropertyPositionNormalizer(property, side) {
  return (value) => {
    return {
      path: "border",
      value: {
        [property]: {
          [side]: value
        }
      }
    };
  };
}
function getBorderPositionExtractor(which) {
  return (name, styles) => {
    if (styles.border) {
      return extractBorderPosition(styles.border, which);
    }
  };
}
function extractBorderPosition(border, which) {
  const value = {};
  if (border.width && border.width[which]) {
    value.width = border.width[which];
  }
  if (border.style && border.style[which]) {
    value.style = border.style[which];
  }
  if (border.color && border.color[which]) {
    value.color = border.color[which];
  }
  return value;
}
function normalizeBorderShorthand(string) {
  const result = {};
  const parts = getShorthandValues(string);
  for (const part of parts) {
    if (isLength(part) || /thin|medium|thick/.test(part)) {
      result.width = part;
    } else if (isLineStyle(part)) {
      result.style = part;
    } else {
      result.color = part;
    }
  }
  return result;
}
function getBorderReducer() {
  return (value) => {
    const topStyles = extractBorderPosition(value, "top");
    const rightStyles = extractBorderPosition(value, "right");
    const bottomStyles = extractBorderPosition(value, "bottom");
    const leftStyles = extractBorderPosition(value, "left");
    const borderStyles = [topStyles, rightStyles, bottomStyles, leftStyles];
    const borderStylesByType = {
      width: getReducedStyleValueForType(borderStyles, "width"),
      style: getReducedStyleValueForType(borderStyles, "style"),
      color: getReducedStyleValueForType(borderStyles, "color")
    };
    const reducedBorderStyle = reduceBorderPosition(borderStylesByType, "all");
    if (reducedBorderStyle.length) {
      return reducedBorderStyle;
    }
    const reducedStyleTypes = Object.entries(borderStylesByType).reduce((reducedStyleTypes2, [type, value2]) => {
      if (value2) {
        reducedStyleTypes2.push([`border-${type}`, value2]);
        borderStyles.forEach((style) => delete style[type]);
      }
      return reducedStyleTypes2;
    }, []);
    return [
      ...reducedStyleTypes,
      ...reduceBorderPosition(topStyles, "top"),
      ...reduceBorderPosition(rightStyles, "right"),
      ...reduceBorderPosition(bottomStyles, "bottom"),
      ...reduceBorderPosition(leftStyles, "left")
    ];
  };
  function getReducedStyleValueForType(styles, type) {
    return styles.map((style) => style[type]).reduce((result, style) => result == style ? result : null);
  }
}
function getBorderPositionReducer(which) {
  return (value) => reduceBorderPosition(value, which);
}
function reduceBorderPosition(value, which) {
  const borderTypes = [];
  if (value && value.width) {
    borderTypes.push("width");
  }
  if (value && value.style) {
    borderTypes.push("style");
  }
  if (value && value.color) {
    borderTypes.push("color");
  }
  if (borderTypes.length == 3) {
    const borderValue = borderTypes.map((item) => value[item]).join(" ");
    return [
      which == "all" ? ["border", borderValue] : [`border-${which}`, borderValue]
    ];
  }
  if (which == "all") {
    return [];
  }
  return borderTypes.map((type) => {
    return [`border-${which}-${type}`, value[type]];
  });
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/styles/margin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function addMarginRules(stylesProcessor) {
  stylesProcessor.setNormalizer("margin", getPositionShorthandNormalizer("margin"));
  stylesProcessor.setNormalizer("margin-top", (value) => ({path: "margin.top", value}));
  stylesProcessor.setNormalizer("margin-right", (value) => ({path: "margin.right", value}));
  stylesProcessor.setNormalizer("margin-bottom", (value) => ({path: "margin.bottom", value}));
  stylesProcessor.setNormalizer("margin-left", (value) => ({path: "margin.left", value}));
  stylesProcessor.setReducer("margin", getBoxSidesValueReducer("margin"));
  stylesProcessor.setStyleRelation("margin", ["margin-top", "margin-right", "margin-bottom", "margin-left"]);
}

// node_modules/@ckeditor/ckeditor5-engine/src/view/styles/padding.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function addPaddingRules(stylesProcessor) {
  stylesProcessor.setNormalizer("padding", getPositionShorthandNormalizer("padding"));
  stylesProcessor.setNormalizer("padding-top", (value) => ({path: "padding.top", value}));
  stylesProcessor.setNormalizer("padding-right", (value) => ({path: "padding.right", value}));
  stylesProcessor.setNormalizer("padding-bottom", (value) => ({path: "padding.bottom", value}));
  stylesProcessor.setNormalizer("padding-left", (value) => ({path: "padding.left", value}));
  stylesProcessor.setReducer("padding", getBoxSidesValueReducer("padding"));
  stylesProcessor.setStyleRelation("padding", ["padding-top", "padding-right", "padding-bottom", "padding-left"]);
}

// node_modules/@ckeditor/ckeditor5-engine/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
export {
  attributeelement_default as AttributeElement,
  attributeoperation_default as AttributeOperation,
  bubblingeventinfo_default as BubblingEventInfo,
  clickobserver_default as ClickObserver,
  conversion_default as Conversion,
  datacontroller_default as DataController,
  datatransfer_default as DataTransfer,
  documentfragment_default2 as DocumentFragment,
  documentselection_default2 as DocumentSelection,
  domconverter_default as DomConverter,
  domeventdata_default as DomEventData,
  domeventobserver_default as DomEventObserver,
  downcastwriter_default as DowncastWriter,
  editingcontroller_default as EditingController,
  element_default2 as Element,
  focusobserver_default as FocusObserver,
  history_default as History,
  htmldataprocessor_default as HtmlDataProcessor,
  insertoperation_default as InsertOperation,
  liveposition_default as LivePosition,
  liverange_default as LiveRange,
  markeroperation_default as MarkerOperation,
  matcher_default as Matcher,
  mergeoperation_default as MergeOperation,
  model_default as Model,
  mouseobserver_default as MouseObserver,
  moveoperation_default as MoveOperation,
  nooperation_default as NoOperation,
  observer_default as Observer,
  operationfactory_default as OperationFactory,
  position_default2 as Position,
  range_default2 as Range,
  renameoperation_default as RenameOperation,
  renderer_default as Renderer,
  rootattributeoperation_default as RootAttributeOperation,
  rootoperation_default as RootOperation,
  splitoperation_default as SplitOperation,
  StylesProcessor,
  tabobserver_default as TabObserver,
  text_default2 as Text,
  textproxy_default2 as TextProxy,
  treewalker_default2 as TreeWalker,
  upcastwriter_default as UpcastWriter,
  view_default as View,
  attributeelement_default as ViewAttributeElement,
  containerelement_default as ViewContainerElement,
  document_default as ViewDocument,
  documentfragment_default as ViewDocumentFragment,
  editableelement_default as ViewEditableElement,
  element_default as ViewElement,
  emptyelement_default as ViewEmptyElement,
  rawelement_default as ViewRawElement,
  rooteditableelement_default as ViewRootEditableElement,
  text_default as ViewText,
  treewalker_default as ViewTreeWalker,
  uielement_default as ViewUIElement,
  addBackgroundRules,
  addBorderRules,
  addMarginRules,
  addPaddingRules,
  disablePlaceholder,
  enablePlaceholder,
  findOptimalInsertionRange,
  getBoxSidesShorthandValue,
  getBoxSidesValueReducer,
  getBoxSidesValues,
  getFillerOffset,
  getPositionShorthandNormalizer,
  getShorthandValues,
  hidePlaceholder,
  isAttachment,
  isColor,
  isLength,
  isLineStyle,
  isPercentage,
  isPosition,
  isRepeat,
  isURL,
  needsPlaceholder,
  showPlaceholder,
  transformSets
};
