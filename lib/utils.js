// node_modules/@ckeditor/ckeditor5-utils/src/env.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getUserAgent() {
  try {
    return navigator.userAgent.toLowerCase();
  } catch (e) {
    return "";
  }
}
var userAgent = getUserAgent();
var env = {
  isMac: isMac(userAgent),
  isWindows: isWindows(userAgent),
  isGecko: isGecko(userAgent),
  isSafari: isSafari(userAgent),
  isiOS: isiOS(userAgent),
  isAndroid: isAndroid(userAgent),
  isBlink: isBlink(userAgent),
  features: {
    isRegExpUnicodePropertySupported: isRegExpUnicodePropertySupported()
  }
};
var env_default = env;
function isMac(userAgent2) {
  return userAgent2.indexOf("macintosh") > -1;
}
function isWindows(userAgent2) {
  return userAgent2.indexOf("windows") > -1;
}
function isGecko(userAgent2) {
  return !!userAgent2.match(/gecko\/\d+/);
}
function isSafari(userAgent2) {
  return userAgent2.indexOf(" applewebkit/") > -1 && userAgent2.indexOf("chrome") === -1;
}
function isiOS(userAgent2) {
  return !!userAgent2.match(/iphone|ipad/i) || isMac(userAgent2) && navigator.maxTouchPoints > 0;
}
function isAndroid(userAgent2) {
  return userAgent2.indexOf("android") > -1;
}
function isBlink(userAgent2) {
  return userAgent2.indexOf("chrome/") > -1 && userAgent2.indexOf("edge/") < 0;
}
function isRegExpUnicodePropertySupported() {
  let isSupported = false;
  try {
    isSupported = "\u0107".search(new RegExp("[\\p{L}]", "u")) === 0;
  } catch (error) {
  }
  return isSupported;
}

// node_modules/@ckeditor/ckeditor5-utils/src/fastdiff.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function fastDiff(a, b, cmp, atomicChanges) {
  cmp = cmp || function(a2, b2) {
    return a2 === b2;
  };
  const arrayA = Array.isArray(a) ? a : Array.prototype.slice.call(a);
  const arrayB = Array.isArray(b) ? b : Array.prototype.slice.call(b);
  const changeIndexes = findChangeBoundaryIndexes(arrayA, arrayB, cmp);
  const result = atomicChanges ? changeIndexesToAtomicChanges(changeIndexes, arrayB.length) : changeIndexesToChanges(arrayB, changeIndexes);
  return result;
}
function findChangeBoundaryIndexes(arr1, arr2, cmp) {
  const firstIndex = findFirstDifferenceIndex(arr1, arr2, cmp);
  if (firstIndex === -1) {
    return {firstIndex: -1, lastIndexOld: -1, lastIndexNew: -1};
  }
  const oldArrayReversed = cutAndReverse(arr1, firstIndex);
  const newArrayReversed = cutAndReverse(arr2, firstIndex);
  const lastIndex = findFirstDifferenceIndex(oldArrayReversed, newArrayReversed, cmp);
  const lastIndexOld = arr1.length - lastIndex;
  const lastIndexNew = arr2.length - lastIndex;
  return {firstIndex, lastIndexOld, lastIndexNew};
}
function findFirstDifferenceIndex(arr1, arr2, cmp) {
  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    if (arr1[i] === void 0 || arr2[i] === void 0 || !cmp(arr1[i], arr2[i])) {
      return i;
    }
  }
  return -1;
}
function cutAndReverse(arr, howMany) {
  return arr.slice(howMany).reverse();
}
function changeIndexesToChanges(newArray, changeIndexes) {
  const result = [];
  const {firstIndex, lastIndexOld, lastIndexNew} = changeIndexes;
  if (lastIndexNew - firstIndex > 0) {
    result.push({
      index: firstIndex,
      type: "insert",
      values: newArray.slice(firstIndex, lastIndexNew)
    });
  }
  if (lastIndexOld - firstIndex > 0) {
    result.push({
      index: firstIndex + (lastIndexNew - firstIndex),
      type: "delete",
      howMany: lastIndexOld - firstIndex
    });
  }
  return result;
}
function changeIndexesToAtomicChanges(changeIndexes, newLength) {
  const {firstIndex, lastIndexOld, lastIndexNew} = changeIndexes;
  if (firstIndex === -1) {
    return Array(newLength).fill("equal");
  }
  let result = [];
  if (firstIndex > 0) {
    result = result.concat(Array(firstIndex).fill("equal"));
  }
  if (lastIndexNew - firstIndex > 0) {
    result = result.concat(Array(lastIndexNew - firstIndex).fill("insert"));
  }
  if (lastIndexOld - firstIndex > 0) {
    result = result.concat(Array(lastIndexOld - firstIndex).fill("delete"));
  }
  if (lastIndexNew < newLength) {
    result = result.concat(Array(newLength - lastIndexNew).fill("equal"));
  }
  return result;
}

// node_modules/@ckeditor/ckeditor5-utils/src/diff.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function diff(a, b, cmp) {
  cmp = cmp || function(a2, b2) {
    return a2 === b2;
  };
  const aLength = a.length;
  const bLength = b.length;
  if (aLength > 200 || bLength > 200 || aLength + bLength > 300) {
    return diff.fastDiff(a, b, cmp, true);
  }
  let _insert, _delete;
  if (bLength < aLength) {
    const tmp = a;
    a = b;
    b = tmp;
    _insert = "delete";
    _delete = "insert";
  } else {
    _insert = "insert";
    _delete = "delete";
  }
  const m = a.length;
  const n = b.length;
  const delta = n - m;
  const es = {};
  const fp = {};
  function snake(k2) {
    const y1 = (fp[k2 - 1] !== void 0 ? fp[k2 - 1] : -1) + 1;
    const y2 = fp[k2 + 1] !== void 0 ? fp[k2 + 1] : -1;
    const dir = y1 > y2 ? -1 : 1;
    if (es[k2 + dir]) {
      es[k2] = es[k2 + dir].slice(0);
    }
    if (!es[k2]) {
      es[k2] = [];
    }
    es[k2].push(y1 > y2 ? _insert : _delete);
    let y = Math.max(y1, y2);
    let x = y - k2;
    while (x < m && y < n && cmp(a[x], b[y])) {
      x++;
      y++;
      es[k2].push("equal");
    }
    return y;
  }
  let p = 0;
  let k;
  do {
    for (k = -p; k < delta; k++) {
      fp[k] = snake(k);
    }
    for (k = delta + p; k > delta; k--) {
      fp[k] = snake(k);
    }
    fp[delta] = snake(delta);
    p++;
  } while (fp[delta] !== n);
  return es[delta].slice(1);
}
diff.fastDiff = fastDiff;

// node_modules/@ckeditor/ckeditor5-utils/src/difftochanges.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function diffToChanges(diff2, output) {
  const changes = [];
  let index = 0;
  let lastOperation = null;
  diff2.forEach((change) => {
    if (change == "equal") {
      pushLast();
      index++;
    } else if (change == "insert") {
      if (lastOperation && lastOperation.type == "insert") {
        lastOperation.values.push(output[index]);
      } else {
        pushLast();
        lastOperation = {
          type: "insert",
          index,
          values: [output[index]]
        };
      }
      index++;
    } else {
      if (lastOperation && lastOperation.type == "delete") {
        lastOperation.howMany++;
      } else {
        pushLast();
        lastOperation = {
          type: "delete",
          index,
          howMany: 1
        };
      }
    }
  });
  pushLast();
  return changes;
  function pushLast() {
    if (lastOperation) {
      changes.push(lastOperation);
      lastOperation = null;
    }
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/mix.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function mix(baseClass, ...mixins) {
  mixins.forEach((mixin) => {
    const propertyNames = Object.getOwnPropertyNames(mixin);
    const propertySymbols = Object.getOwnPropertySymbols(mixin);
    propertyNames.concat(propertySymbols).forEach((key) => {
      if (key in baseClass.prototype) {
        return;
      }
      if (typeof mixin == "function" && (key == "length" || key == "name" || key == "prototype")) {
        return;
      }
      const sourceDescriptor = Object.getOwnPropertyDescriptor(mixin, key);
      sourceDescriptor.enumerable = false;
      Object.defineProperty(baseClass.prototype, key, sourceDescriptor);
    });
  });
}

// node_modules/@ckeditor/ckeditor5-utils/src/spy.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function spy() {
  return function spy2() {
    spy2.called = true;
  };
}
var spy_default = spy;

// node_modules/@ckeditor/ckeditor5-utils/src/eventinfo.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var EventInfo = class {
  constructor(source, name) {
    this.source = source;
    this.name = name;
    this.path = [];
    this.stop = spy_default();
    this.off = spy_default();
  }
};
var eventinfo_default = EventInfo;

// node_modules/@ckeditor/ckeditor5-utils/src/uid.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var HEX_NUMBERS = new Array(256).fill("").map((_, index) => ("0" + index.toString(16)).slice(-2));
function uid() {
  const r1 = Math.random() * 4294967296 >>> 0;
  const r2 = Math.random() * 4294967296 >>> 0;
  const r3 = Math.random() * 4294967296 >>> 0;
  const r4 = Math.random() * 4294967296 >>> 0;
  return "e" + HEX_NUMBERS[r1 >> 0 & 255] + HEX_NUMBERS[r1 >> 8 & 255] + HEX_NUMBERS[r1 >> 16 & 255] + HEX_NUMBERS[r1 >> 24 & 255] + HEX_NUMBERS[r2 >> 0 & 255] + HEX_NUMBERS[r2 >> 8 & 255] + HEX_NUMBERS[r2 >> 16 & 255] + HEX_NUMBERS[r2 >> 24 & 255] + HEX_NUMBERS[r3 >> 0 & 255] + HEX_NUMBERS[r3 >> 8 & 255] + HEX_NUMBERS[r3 >> 16 & 255] + HEX_NUMBERS[r3 >> 24 & 255] + HEX_NUMBERS[r4 >> 0 & 255] + HEX_NUMBERS[r4 >> 8 & 255] + HEX_NUMBERS[r4 >> 16 & 255] + HEX_NUMBERS[r4 >> 24 & 255];
}

// node_modules/@ckeditor/ckeditor5-utils/src/priorities.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var priorities = {
  get(priority = "normal") {
    if (typeof priority != "number") {
      return this[priority] || this.normal;
    } else {
      return priority;
    }
  },
  highest: 1e5,
  high: 1e3,
  normal: 0,
  low: -1e3,
  lowest: -1e5
};
var priorities_default = priorities;

// node_modules/@ckeditor/ckeditor5-utils/src/inserttopriorityarray.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function insertToPriorityArray(objects, objectToInsert) {
  const priority = priorities_default.get(objectToInsert.priority);
  for (let i = 0; i < objects.length; i++) {
    if (priorities_default.get(objects[i].priority) < priority) {
      objects.splice(i, 0, objectToInsert);
      return;
    }
  }
  objects.push(objectToInsert);
}

// node_modules/@ckeditor/ckeditor5-utils/src/ckeditorerror.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var DOCUMENTATION_URL = "https://ckeditor.com/docs/ckeditor5/latest/support/error-codes.html";
var CKEditorError = class extends Error {
  constructor(errorName, context, data) {
    super(getErrorMessage(errorName, data));
    this.name = "CKEditorError";
    this.context = context;
    this.data = data;
  }
  is(type) {
    return type === "CKEditorError";
  }
  static rethrowUnexpectedError(err, context) {
    if (err.is && err.is("CKEditorError")) {
      throw err;
    }
    const error = new CKEditorError(err.message, context);
    error.stack = err.stack;
    throw error;
  }
};
var ckeditorerror_default = CKEditorError;
function logWarning(errorName, data) {
  console.warn(...formatConsoleArguments(errorName, data));
}
function logError(errorName, data) {
  console.error(...formatConsoleArguments(errorName, data));
}
function getLinkToDocumentationMessage(errorName) {
  return `
Read more: ${DOCUMENTATION_URL}#error-${errorName}`;
}
function getErrorMessage(errorName, data) {
  const processedObjects = new WeakSet();
  const circularReferencesReplacer = (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (processedObjects.has(value)) {
        return `[object ${value.constructor.name}]`;
      }
      processedObjects.add(value);
    }
    return value;
  };
  const stringifiedData = data ? ` ${JSON.stringify(data, circularReferencesReplacer)}` : "";
  const documentationLink = getLinkToDocumentationMessage(errorName);
  return errorName + stringifiedData + documentationLink;
}
function formatConsoleArguments(errorName, data) {
  const documentationMessage = getLinkToDocumentationMessage(errorName);
  return data ? [errorName, data, documentationMessage] : [errorName, documentationMessage];
}

// node_modules/@ckeditor/ckeditor5-utils/src/version.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var version = "40.0.0";
var version_default = version;
var releaseDate = new Date(2023, 9, 4);
/* istanbul ignore next -- @preserve */
if (globalThis.CKEDITOR_VERSION) {
  throw new ckeditorerror_default("ckeditor-duplicated-modules", null);
} else {
  globalThis.CKEDITOR_VERSION = version;
}

// node_modules/@ckeditor/ckeditor5-utils/src/emittermixin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var _listeningTo = Symbol("listeningTo");
var _emitterId = Symbol("emitterId");
var _delegations = Symbol("delegations");
var defaultEmitterClass = EmitterMixin(Object);
function EmitterMixin(base) {
  if (!base) {
    return defaultEmitterClass;
  }
  class Mixin extends base {
    on(event, callback, options) {
      this.listenTo(this, event, callback, options);
    }
    once(event, callback, options) {
      let wasFired = false;
      const onceCallback = (event2, ...args) => {
        if (!wasFired) {
          wasFired = true;
          event2.off();
          callback.call(this, event2, ...args);
        }
      };
      this.listenTo(this, event, onceCallback, options);
    }
    off(event, callback) {
      this.stopListening(this, event, callback);
    }
    listenTo(emitter, event, callback, options = {}) {
      let emitterInfo, eventCallbacks;
      if (!this[_listeningTo]) {
        this[_listeningTo] = {};
      }
      const emitters = this[_listeningTo];
      if (!_getEmitterId(emitter)) {
        _setEmitterId(emitter);
      }
      const emitterId = _getEmitterId(emitter);
      if (!(emitterInfo = emitters[emitterId])) {
        emitterInfo = emitters[emitterId] = {
          emitter,
          callbacks: {}
        };
      }
      if (!(eventCallbacks = emitterInfo.callbacks[event])) {
        eventCallbacks = emitterInfo.callbacks[event] = [];
      }
      eventCallbacks.push(callback);
      addEventListener(this, emitter, event, callback, options);
    }
    stopListening(emitter, event, callback) {
      const emitters = this[_listeningTo];
      let emitterId = emitter && _getEmitterId(emitter);
      const emitterInfo = emitters && emitterId ? emitters[emitterId] : void 0;
      const eventCallbacks = emitterInfo && event ? emitterInfo.callbacks[event] : void 0;
      if (!emitters || emitter && !emitterInfo || event && !eventCallbacks) {
        return;
      }
      if (callback) {
        removeEventListener(this, emitter, event, callback);
        const index = eventCallbacks.indexOf(callback);
        if (index !== -1) {
          if (eventCallbacks.length === 1) {
            delete emitterInfo.callbacks[event];
          } else {
            removeEventListener(this, emitter, event, callback);
          }
        }
      } else if (eventCallbacks) {
        while (callback = eventCallbacks.pop()) {
          removeEventListener(this, emitter, event, callback);
        }
        delete emitterInfo.callbacks[event];
      } else if (emitterInfo) {
        for (event in emitterInfo.callbacks) {
          this.stopListening(emitter, event);
        }
        delete emitters[emitterId];
      } else {
        for (emitterId in emitters) {
          this.stopListening(emitters[emitterId].emitter);
        }
        delete this[_listeningTo];
      }
    }
    fire(eventOrInfo, ...args) {
      try {
        const eventInfo = eventOrInfo instanceof eventinfo_default ? eventOrInfo : new eventinfo_default(this, eventOrInfo);
        const event = eventInfo.name;
        let callbacks = getCallbacksForEvent(this, event);
        eventInfo.path.push(this);
        if (callbacks) {
          const callbackArgs = [eventInfo, ...args];
          callbacks = Array.from(callbacks);
          for (let i = 0; i < callbacks.length; i++) {
            callbacks[i].callback.apply(this, callbackArgs);
            if (eventInfo.off.called) {
              delete eventInfo.off.called;
              this._removeEventListener(event, callbacks[i].callback);
            }
            if (eventInfo.stop.called) {
              break;
            }
          }
        }
        const delegations = this[_delegations];
        if (delegations) {
          const destinations = delegations.get(event);
          const passAllDestinations = delegations.get("*");
          if (destinations) {
            fireDelegatedEvents(destinations, eventInfo, args);
          }
          if (passAllDestinations) {
            fireDelegatedEvents(passAllDestinations, eventInfo, args);
          }
        }
        return eventInfo.return;
      } catch (err) {
        /* istanbul ignore next -- @preserve */
        ckeditorerror_default.rethrowUnexpectedError(err, this);
      }
    }
    delegate(...events) {
      return {
        to: (emitter, nameOrFunction) => {
          if (!this[_delegations]) {
            this[_delegations] = new Map();
          }
          events.forEach((eventName) => {
            const destinations = this[_delegations].get(eventName);
            if (!destinations) {
              this[_delegations].set(eventName, new Map([[emitter, nameOrFunction]]));
            } else {
              destinations.set(emitter, nameOrFunction);
            }
          });
        }
      };
    }
    stopDelegating(event, emitter) {
      if (!this[_delegations]) {
        return;
      }
      if (!event) {
        this[_delegations].clear();
      } else if (!emitter) {
        this[_delegations].delete(event);
      } else {
        const destinations = this[_delegations].get(event);
        if (destinations) {
          destinations.delete(emitter);
        }
      }
    }
    _addEventListener(event, callback, options) {
      createEventNamespace(this, event);
      const lists = getCallbacksListsForNamespace(this, event);
      const priority = priorities_default.get(options.priority);
      const callbackDefinition = {
        callback,
        priority
      };
      for (const callbacks of lists) {
        insertToPriorityArray(callbacks, callbackDefinition);
      }
    }
    _removeEventListener(event, callback) {
      const lists = getCallbacksListsForNamespace(this, event);
      for (const callbacks of lists) {
        for (let i = 0; i < callbacks.length; i++) {
          if (callbacks[i].callback == callback) {
            callbacks.splice(i, 1);
            i--;
          }
        }
      }
    }
  }
  return Mixin;
}
[
  "on",
  "once",
  "off",
  "listenTo",
  "stopListening",
  "fire",
  "delegate",
  "stopDelegating",
  "_addEventListener",
  "_removeEventListener"
].forEach((key) => {
  EmitterMixin[key] = defaultEmitterClass.prototype[key];
});
function _getEmitterListenedTo(listeningEmitter, listenedToEmitterId) {
  const listeningTo = listeningEmitter[_listeningTo];
  if (listeningTo && listeningTo[listenedToEmitterId]) {
    return listeningTo[listenedToEmitterId].emitter;
  }
  return null;
}
function _setEmitterId(emitter, id) {
  if (!emitter[_emitterId]) {
    emitter[_emitterId] = id || uid();
  }
}
function _getEmitterId(emitter) {
  return emitter[_emitterId];
}
function getEvents(source) {
  if (!source._events) {
    Object.defineProperty(source, "_events", {
      value: {}
    });
  }
  return source._events;
}
function makeEventNode() {
  return {
    callbacks: [],
    childEvents: []
  };
}
function createEventNamespace(source, eventName) {
  const events = getEvents(source);
  if (events[eventName]) {
    return;
  }
  let name = eventName;
  let childEventName = null;
  const newEventNodes = [];
  while (name !== "") {
    if (events[name]) {
      break;
    }
    events[name] = makeEventNode();
    newEventNodes.push(events[name]);
    if (childEventName) {
      events[name].childEvents.push(childEventName);
    }
    childEventName = name;
    name = name.substr(0, name.lastIndexOf(":"));
  }
  if (name !== "") {
    for (const node of newEventNodes) {
      node.callbacks = events[name].callbacks.slice();
    }
    events[name].childEvents.push(childEventName);
  }
}
function getCallbacksListsForNamespace(source, eventName) {
  const eventNode = getEvents(source)[eventName];
  if (!eventNode) {
    return [];
  }
  let callbacksLists = [eventNode.callbacks];
  for (let i = 0; i < eventNode.childEvents.length; i++) {
    const childCallbacksLists = getCallbacksListsForNamespace(source, eventNode.childEvents[i]);
    callbacksLists = callbacksLists.concat(childCallbacksLists);
  }
  return callbacksLists;
}
function getCallbacksForEvent(source, eventName) {
  let event;
  if (!source._events || !(event = source._events[eventName]) || !event.callbacks.length) {
    if (eventName.indexOf(":") > -1) {
      return getCallbacksForEvent(source, eventName.substr(0, eventName.lastIndexOf(":")));
    } else {
      return null;
    }
  }
  return event.callbacks;
}
function fireDelegatedEvents(destinations, eventInfo, fireArgs) {
  for (let [emitter, name] of destinations) {
    if (!name) {
      name = eventInfo.name;
    } else if (typeof name == "function") {
      name = name(eventInfo.name);
    }
    const delegatedInfo = new eventinfo_default(eventInfo.source, name);
    delegatedInfo.path = [...eventInfo.path];
    emitter.fire(delegatedInfo, ...fireArgs);
  }
}
function addEventListener(listener, emitter, event, callback, options) {
  if (emitter._addEventListener) {
    emitter._addEventListener(event, callback, options);
  } else {
    listener._addEventListener.call(emitter, event, callback, options);
  }
}
function removeEventListener(listener, emitter, event, callback) {
  if (emitter._removeEventListener) {
    emitter._removeEventListener(event, callback);
  } else {
    listener._removeEventListener.call(emitter, event, callback);
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/observablemixin.js
import {isObject} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var observablePropertiesSymbol = Symbol("observableProperties");
var boundObservablesSymbol = Symbol("boundObservables");
var boundPropertiesSymbol = Symbol("boundProperties");
var decoratedMethods = Symbol("decoratedMethods");
var decoratedOriginal = Symbol("decoratedOriginal");
var defaultObservableClass = ObservableMixin(EmitterMixin());
function ObservableMixin(base) {
  if (!base) {
    return defaultObservableClass;
  }
  class Mixin extends base {
    set(name, value) {
      if (isObject(name)) {
        Object.keys(name).forEach((property) => {
          this.set(property, name[property]);
        }, this);
        return;
      }
      initObservable(this);
      const properties = this[observablePropertiesSymbol];
      if (name in this && !properties.has(name)) {
        throw new ckeditorerror_default("observable-set-cannot-override", this);
      }
      Object.defineProperty(this, name, {
        enumerable: true,
        configurable: true,
        get() {
          return properties.get(name);
        },
        set(value2) {
          const oldValue = properties.get(name);
          let newValue = this.fire(`set:${name}`, name, value2, oldValue);
          if (newValue === void 0) {
            newValue = value2;
          }
          if (oldValue !== newValue || !properties.has(name)) {
            properties.set(name, newValue);
            this.fire(`change:${name}`, name, newValue, oldValue);
          }
        }
      });
      this[name] = value;
    }
    bind(...bindProperties) {
      if (!bindProperties.length || !isStringArray(bindProperties)) {
        throw new ckeditorerror_default("observable-bind-wrong-properties", this);
      }
      if (new Set(bindProperties).size !== bindProperties.length) {
        throw new ckeditorerror_default("observable-bind-duplicate-properties", this);
      }
      initObservable(this);
      const boundProperties = this[boundPropertiesSymbol];
      bindProperties.forEach((propertyName) => {
        if (boundProperties.has(propertyName)) {
          throw new ckeditorerror_default("observable-bind-rebind", this);
        }
      });
      const bindings = new Map();
      bindProperties.forEach((a) => {
        const binding = {property: a, to: []};
        boundProperties.set(a, binding);
        bindings.set(a, binding);
      });
      return {
        to: bindTo,
        toMany: bindToMany,
        _observable: this,
        _bindProperties: bindProperties,
        _to: [],
        _bindings: bindings
      };
    }
    unbind(...unbindProperties) {
      if (!this[observablePropertiesSymbol]) {
        return;
      }
      const boundProperties = this[boundPropertiesSymbol];
      const boundObservables = this[boundObservablesSymbol];
      if (unbindProperties.length) {
        if (!isStringArray(unbindProperties)) {
          throw new ckeditorerror_default("observable-unbind-wrong-properties", this);
        }
        unbindProperties.forEach((propertyName) => {
          const binding = boundProperties.get(propertyName);
          if (!binding) {
            return;
          }
          binding.to.forEach(([toObservable, toProperty]) => {
            const toProperties = boundObservables.get(toObservable);
            const toPropertyBindings = toProperties[toProperty];
            toPropertyBindings.delete(binding);
            if (!toPropertyBindings.size) {
              delete toProperties[toProperty];
            }
            if (!Object.keys(toProperties).length) {
              boundObservables.delete(toObservable);
              this.stopListening(toObservable, "change");
            }
          });
          boundProperties.delete(propertyName);
        });
      } else {
        boundObservables.forEach((bindings, boundObservable) => {
          this.stopListening(boundObservable, "change");
        });
        boundObservables.clear();
        boundProperties.clear();
      }
    }
    decorate(methodName) {
      initObservable(this);
      const originalMethod = this[methodName];
      if (!originalMethod) {
        throw new ckeditorerror_default("observablemixin-cannot-decorate-undefined", this, {object: this, methodName});
      }
      this.on(methodName, (evt, args) => {
        evt.return = originalMethod.apply(this, args);
      });
      this[methodName] = function(...args) {
        return this.fire(methodName, args);
      };
      this[methodName][decoratedOriginal] = originalMethod;
      if (!this[decoratedMethods]) {
        this[decoratedMethods] = [];
      }
      this[decoratedMethods].push(methodName);
    }
    stopListening(emitter, event, callback) {
      if (!emitter && this[decoratedMethods]) {
        for (const methodName of this[decoratedMethods]) {
          this[methodName] = this[methodName][decoratedOriginal];
        }
        delete this[decoratedMethods];
      }
      super.stopListening(emitter, event, callback);
    }
  }
  return Mixin;
}
[
  "set",
  "bind",
  "unbind",
  "decorate",
  "on",
  "once",
  "off",
  "listenTo",
  "stopListening",
  "fire",
  "delegate",
  "stopDelegating",
  "_addEventListener",
  "_removeEventListener"
].forEach((key) => {
  ObservableMixin[key] = defaultObservableClass.prototype[key];
});
function initObservable(observable) {
  if (observable[observablePropertiesSymbol]) {
    return;
  }
  Object.defineProperty(observable, observablePropertiesSymbol, {
    value: new Map()
  });
  Object.defineProperty(observable, boundObservablesSymbol, {
    value: new Map()
  });
  Object.defineProperty(observable, boundPropertiesSymbol, {
    value: new Map()
  });
}
function bindTo(...args) {
  const parsedArgs = parseBindToArgs(...args);
  const bindingsKeys = Array.from(this._bindings.keys());
  const numberOfBindings = bindingsKeys.length;
  if (!parsedArgs.callback && parsedArgs.to.length > 1) {
    throw new ckeditorerror_default("observable-bind-to-no-callback", this);
  }
  if (numberOfBindings > 1 && parsedArgs.callback) {
    throw new ckeditorerror_default("observable-bind-to-extra-callback", this);
  }
  parsedArgs.to.forEach((to) => {
    if (to.properties.length && to.properties.length !== numberOfBindings) {
      throw new ckeditorerror_default("observable-bind-to-properties-length", this);
    }
    if (!to.properties.length) {
      to.properties = this._bindProperties;
    }
  });
  this._to = parsedArgs.to;
  if (parsedArgs.callback) {
    this._bindings.get(bindingsKeys[0]).callback = parsedArgs.callback;
  }
  attachBindToListeners(this._observable, this._to);
  updateBindToBound(this);
  this._bindProperties.forEach((propertyName) => {
    updateBoundObservableProperty(this._observable, propertyName);
  });
}
function bindToMany(observables, attribute, callback) {
  if (this._bindings.size > 1) {
    throw new ckeditorerror_default("observable-bind-to-many-not-one-binding", this);
  }
  this.to(...getBindingTargets(observables, attribute), callback);
}
function getBindingTargets(observables, attribute) {
  const observableAndAttributePairs = observables.map((observable) => [observable, attribute]);
  return Array.prototype.concat.apply([], observableAndAttributePairs);
}
function isStringArray(arr) {
  return arr.every((a) => typeof a == "string");
}
function parseBindToArgs(...args) {
  if (!args.length) {
    throw new ckeditorerror_default("observable-bind-to-parse-error", null);
  }
  const parsed = {to: []};
  let lastObservable;
  if (typeof args[args.length - 1] == "function") {
    parsed.callback = args.pop();
  }
  args.forEach((a) => {
    if (typeof a == "string") {
      lastObservable.properties.push(a);
    } else if (typeof a == "object") {
      lastObservable = {observable: a, properties: []};
      parsed.to.push(lastObservable);
    } else {
      throw new ckeditorerror_default("observable-bind-to-parse-error", null);
    }
  });
  return parsed;
}
function updateBoundObservables(observable, binding, toObservable, toPropertyName) {
  const boundObservables = observable[boundObservablesSymbol];
  const bindingsToObservable = boundObservables.get(toObservable);
  const bindings = bindingsToObservable || {};
  if (!bindings[toPropertyName]) {
    bindings[toPropertyName] = new Set();
  }
  bindings[toPropertyName].add(binding);
  if (!bindingsToObservable) {
    boundObservables.set(toObservable, bindings);
  }
}
function updateBindToBound(chain) {
  let toProperty;
  chain._bindings.forEach((binding, propertyName) => {
    chain._to.forEach((to) => {
      toProperty = to.properties[binding.callback ? 0 : chain._bindProperties.indexOf(propertyName)];
      binding.to.push([to.observable, toProperty]);
      updateBoundObservables(chain._observable, binding, to.observable, toProperty);
    });
  });
}
function updateBoundObservableProperty(observable, propertyName) {
  const boundProperties = observable[boundPropertiesSymbol];
  const binding = boundProperties.get(propertyName);
  let propertyValue;
  if (binding.callback) {
    propertyValue = binding.callback.apply(observable, binding.to.map((to) => to[0][to[1]]));
  } else {
    propertyValue = binding.to[0];
    propertyValue = propertyValue[0][propertyValue[1]];
  }
  if (Object.prototype.hasOwnProperty.call(observable, propertyName)) {
    observable[propertyName] = propertyValue;
  } else {
    observable.set(propertyName, propertyValue);
  }
}
function attachBindToListeners(observable, toBindings) {
  toBindings.forEach((to) => {
    const boundObservables = observable[boundObservablesSymbol];
    let bindings;
    if (!boundObservables.get(to.observable)) {
      observable.listenTo(to.observable, "change", (evt, propertyName) => {
        bindings = boundObservables.get(to.observable)[propertyName];
        if (bindings) {
          bindings.forEach((binding) => {
            updateBoundObservableProperty(observable, binding.property);
          });
        }
      });
    }
  });
}

// node_modules/@ckeditor/ckeditor5-utils/src/elementreplacer.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ElementReplacer = class {
  constructor() {
    this._replacedElements = [];
  }
  replace(element, newElement) {
    this._replacedElements.push({element, newElement});
    element.style.display = "none";
    if (newElement) {
      element.parentNode.insertBefore(newElement, element.nextSibling);
    }
  }
  restore() {
    this._replacedElements.forEach(({element, newElement}) => {
      element.style.display = "";
      if (newElement) {
        newElement.remove();
      }
    });
    this._replacedElements = [];
  }
};
var elementreplacer_default = ElementReplacer;

// node_modules/@ckeditor/ckeditor5-utils/src/count.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function count(iterable) {
  let count2 = 0;
  for (const _ of iterable) {
    count2++;
  }
  return count2;
}

// node_modules/@ckeditor/ckeditor5-utils/src/comparearrays.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function compareArrays(a, b) {
  const minLen = Math.min(a.length, b.length);
  for (let i = 0; i < minLen; i++) {
    if (a[i] != b[i]) {
      return i;
    }
  }
  if (a.length == b.length) {
    return "same";
  } else if (a.length < b.length) {
    return "prefix";
  } else {
    return "extension";
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/isiterable.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isIterable(value) {
  return !!(value && value[Symbol.iterator]);
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/createelement.js
import {isString} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function createElement(doc, name, attributes = {}, children = []) {
  const namespace = attributes && attributes.xmlns;
  const element = namespace ? doc.createElementNS(namespace, name) : doc.createElement(name);
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  if (isString(children) || !isIterable(children)) {
    children = [children];
  }
  for (let child of children) {
    if (isString(child)) {
      child = doc.createTextNode(child);
    }
    element.appendChild(child);
  }
  return element;
}

// node_modules/@ckeditor/ckeditor5-utils/src/config.js
import {isPlainObject, isElement, cloneDeepWith} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Config = class {
  constructor(configurations, defaultConfigurations) {
    this._config = {};
    if (defaultConfigurations) {
      this.define(cloneConfig(defaultConfigurations));
    }
    if (configurations) {
      this._setObjectToTarget(this._config, configurations);
    }
  }
  set(name, value) {
    this._setToTarget(this._config, name, value);
  }
  define(name, value) {
    const isDefine = true;
    this._setToTarget(this._config, name, value, isDefine);
  }
  get(name) {
    return this._getFromSource(this._config, name);
  }
  *names() {
    for (const name of Object.keys(this._config)) {
      yield name;
    }
  }
  _setToTarget(target, name, value, isDefine = false) {
    if (isPlainObject(name)) {
      this._setObjectToTarget(target, name, isDefine);
      return;
    }
    const parts = name.split(".");
    name = parts.pop();
    for (const part of parts) {
      if (!isPlainObject(target[part])) {
        target[part] = {};
      }
      target = target[part];
    }
    if (isPlainObject(value)) {
      if (!isPlainObject(target[name])) {
        target[name] = {};
      }
      target = target[name];
      this._setObjectToTarget(target, value, isDefine);
      return;
    }
    if (isDefine && typeof target[name] != "undefined") {
      return;
    }
    target[name] = value;
  }
  _getFromSource(source, name) {
    const parts = name.split(".");
    name = parts.pop();
    for (const part of parts) {
      if (!isPlainObject(source[part])) {
        source = null;
        break;
      }
      source = source[part];
    }
    return source ? cloneConfig(source[name]) : void 0;
  }
  _setObjectToTarget(target, configuration, isDefine) {
    Object.keys(configuration).forEach((key) => {
      this._setToTarget(target, key, configuration[key], isDefine);
    });
  }
};
var config_default = Config;
function cloneConfig(source) {
  return cloneDeepWith(source, leaveDOMReferences);
}
function leaveDOMReferences(value) {
  return isElement(value) ? value : void 0;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/isnode.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isNode(obj) {
  if (obj) {
    if (obj.defaultView) {
      return obj instanceof obj.defaultView.Document;
    } else if (obj.ownerDocument && obj.ownerDocument.defaultView) {
      return obj instanceof obj.ownerDocument.defaultView.Node;
    }
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/iswindow.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isWindow(obj) {
  const stringifiedObject = Object.prototype.toString.apply(obj);
  if (stringifiedObject == "[object Window]") {
    return true;
  }
  if (stringifiedObject == "[object global]") {
    return true;
  }
  return false;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/emittermixin.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var defaultEmitterClass2 = DomEmitterMixin(EmitterMixin());
function DomEmitterMixin(base) {
  if (!base) {
    return defaultEmitterClass2;
  }
  class Mixin extends base {
    listenTo(emitter, event, callback, options = {}) {
      if (isNode(emitter) || isWindow(emitter)) {
        const proxyOptions = {
          capture: !!options.useCapture,
          passive: !!options.usePassive
        };
        const proxyEmitter = this._getProxyEmitter(emitter, proxyOptions) || new ProxyEmitter(emitter, proxyOptions);
        this.listenTo(proxyEmitter, event, callback, options);
      } else {
        super.listenTo(emitter, event, callback, options);
      }
    }
    stopListening(emitter, event, callback) {
      if (isNode(emitter) || isWindow(emitter)) {
        const proxyEmitters = this._getAllProxyEmitters(emitter);
        for (const proxy of proxyEmitters) {
          this.stopListening(proxy, event, callback);
        }
      } else {
        super.stopListening(emitter, event, callback);
      }
    }
    _getProxyEmitter(node, options) {
      return _getEmitterListenedTo(this, getProxyEmitterId(node, options));
    }
    _getAllProxyEmitters(node) {
      return [
        {capture: false, passive: false},
        {capture: false, passive: true},
        {capture: true, passive: false},
        {capture: true, passive: true}
      ].map((options) => this._getProxyEmitter(node, options)).filter((proxy) => !!proxy);
    }
  }
  return Mixin;
}
[
  "_getProxyEmitter",
  "_getAllProxyEmitters",
  "on",
  "once",
  "off",
  "listenTo",
  "stopListening",
  "fire",
  "delegate",
  "stopDelegating",
  "_addEventListener",
  "_removeEventListener"
].forEach((key) => {
  DomEmitterMixin[key] = defaultEmitterClass2.prototype[key];
});
var ProxyEmitter = class extends EmitterMixin() {
  constructor(node, options) {
    super();
    _setEmitterId(this, getProxyEmitterId(node, options));
    this._domNode = node;
    this._options = options;
  }
  attach(event) {
    if (this._domListeners && this._domListeners[event]) {
      return;
    }
    const domListener = this._createDomListener(event);
    this._domNode.addEventListener(event, domListener, this._options);
    if (!this._domListeners) {
      this._domListeners = {};
    }
    this._domListeners[event] = domListener;
  }
  detach(event) {
    let events;
    if (this._domListeners[event] && (!(events = this._events[event]) || !events.callbacks.length)) {
      this._domListeners[event].removeListener();
    }
  }
  _addEventListener(event, callback, options) {
    this.attach(event);
    EmitterMixin().prototype._addEventListener.call(this, event, callback, options);
  }
  _removeEventListener(event, callback) {
    EmitterMixin().prototype._removeEventListener.call(this, event, callback);
    this.detach(event);
  }
  _createDomListener(event) {
    const domListener = (domEvt) => {
      this.fire(event, domEvt);
    };
    domListener.removeListener = () => {
      this._domNode.removeEventListener(event, domListener, this._options);
      delete this._domListeners[event];
    };
    return domListener;
  }
};
function getNodeUID(node) {
  return node["data-ck-expando"] || (node["data-ck-expando"] = uid());
}
function getProxyEmitterId(node, options) {
  let id = getNodeUID(node);
  for (const option of Object.keys(options).sort()) {
    if (options[option]) {
      id += "-" + option;
    }
  }
  return id;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/global.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var globalVar;
try {
  globalVar = {window, document};
} catch (e) {
  /* istanbul ignore next -- @preserve */
  globalVar = {window: {}, document: {}};
}
var global_default = globalVar;

// node_modules/@ckeditor/ckeditor5-utils/src/dom/findclosestscrollableancestor.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function findClosestScrollableAncestor(domElement) {
  let element = domElement.parentElement;
  if (!element) {
    return null;
  }
  while (element.tagName != "BODY") {
    const overflow = element.style.overflowY || global_default.window.getComputedStyle(element).overflowY;
    if (overflow === "auto" || overflow === "scroll") {
      break;
    }
    element = element.parentElement;
    if (!element) {
      return null;
    }
  }
  return element;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/getancestors.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getAncestors(node) {
  const nodes = [];
  let currentNode = node;
  while (currentNode && currentNode.nodeType != Node.DOCUMENT_NODE) {
    nodes.unshift(currentNode);
    currentNode = currentNode.parentNode;
  }
  return nodes;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/getdatafromelement.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getDataFromElement(el) {
  if (el instanceof HTMLTextAreaElement) {
    return el.value;
  }
  return el.innerHTML;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/getborderwidths.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getBorderWidths(element) {
  const style = element.ownerDocument.defaultView.getComputedStyle(element);
  return {
    top: parseInt(style.borderTopWidth, 10),
    right: parseInt(style.borderRightWidth, 10),
    bottom: parseInt(style.borderBottomWidth, 10),
    left: parseInt(style.borderLeftWidth, 10)
  };
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/istext.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isText(obj) {
  return Object.prototype.toString.call(obj) == "[object Text]";
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/isrange.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isRange(obj) {
  return Object.prototype.toString.apply(obj) == "[object Range]";
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/getpositionedancestor.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getPositionedAncestor(element) {
  if (!element || !element.parentNode) {
    return null;
  }
  if (element.offsetParent === global_default.document.body) {
    return null;
  }
  return element.offsetParent;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/rect.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var rectProperties = ["top", "right", "bottom", "left", "width", "height"];
var Rect = class {
  constructor(source) {
    const isSourceRange = isRange(source);
    Object.defineProperty(this, "_source", {
      value: source._source || source,
      writable: true,
      enumerable: false
    });
    if (isDomElement(source) || isSourceRange) {
      if (isSourceRange) {
        const rangeRects = Rect.getDomRangeRects(source);
        copyRectProperties(this, Rect.getBoundingRect(rangeRects));
      } else {
        copyRectProperties(this, source.getBoundingClientRect());
      }
    } else if (isWindow(source)) {
      const {innerWidth, innerHeight} = source;
      copyRectProperties(this, {
        top: 0,
        right: innerWidth,
        bottom: innerHeight,
        left: 0,
        width: innerWidth,
        height: innerHeight
      });
    } else {
      copyRectProperties(this, source);
    }
  }
  clone() {
    return new Rect(this);
  }
  moveTo(x, y) {
    this.top = y;
    this.right = x + this.width;
    this.bottom = y + this.height;
    this.left = x;
    return this;
  }
  moveBy(x, y) {
    this.top += y;
    this.right += x;
    this.left += x;
    this.bottom += y;
    return this;
  }
  getIntersection(anotherRect) {
    const rect = {
      top: Math.max(this.top, anotherRect.top),
      right: Math.min(this.right, anotherRect.right),
      bottom: Math.min(this.bottom, anotherRect.bottom),
      left: Math.max(this.left, anotherRect.left),
      width: 0,
      height: 0
    };
    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;
    if (rect.width < 0 || rect.height < 0) {
      return null;
    } else {
      const newRect = new Rect(rect);
      newRect._source = this._source;
      return newRect;
    }
  }
  getIntersectionArea(anotherRect) {
    const rect = this.getIntersection(anotherRect);
    if (rect) {
      return rect.getArea();
    } else {
      return 0;
    }
  }
  getArea() {
    return this.width * this.height;
  }
  getVisible() {
    const source = this._source;
    let visibleRect = this.clone();
    if (isBody(source)) {
      return visibleRect;
    }
    let child = source;
    let parent = source.parentNode || source.commonAncestorContainer;
    let absolutelyPositionedChildElement;
    while (parent && !isBody(parent)) {
      const isParentOverflowVisible = getElementOverflow(parent) === "visible";
      if (child instanceof HTMLElement && getElementPosition(child) === "absolute") {
        absolutelyPositionedChildElement = child;
      }
      const parentElementPosition = getElementPosition(parent);
      if (isParentOverflowVisible || absolutelyPositionedChildElement && (parentElementPosition === "relative" && isParentOverflowVisible || parentElementPosition !== "relative")) {
        child = parent;
        parent = parent.parentNode;
        continue;
      }
      const parentRect = new Rect(parent);
      const intersectionRect = visibleRect.getIntersection(parentRect);
      if (intersectionRect) {
        if (intersectionRect.getArea() < visibleRect.getArea()) {
          visibleRect = intersectionRect;
        }
      } else {
        return null;
      }
      child = parent;
      parent = parent.parentNode;
    }
    return visibleRect;
  }
  isEqual(anotherRect) {
    for (const prop of rectProperties) {
      if (this[prop] !== anotherRect[prop]) {
        return false;
      }
    }
    return true;
  }
  contains(anotherRect) {
    const intersectRect = this.getIntersection(anotherRect);
    return !!(intersectRect && intersectRect.isEqual(anotherRect));
  }
  toAbsoluteRect() {
    const {scrollX, scrollY} = global_default.window;
    const absoluteRect = this.clone().moveBy(scrollX, scrollY);
    if (isDomElement(absoluteRect._source)) {
      const positionedAncestor = getPositionedAncestor(absoluteRect._source);
      if (positionedAncestor) {
        shiftRectToCompensatePositionedAncestor(absoluteRect, positionedAncestor);
      }
    }
    return absoluteRect;
  }
  excludeScrollbarsAndBorders() {
    const source = this._source;
    let scrollBarWidth, scrollBarHeight, direction;
    if (isWindow(source)) {
      scrollBarWidth = source.innerWidth - source.document.documentElement.clientWidth;
      scrollBarHeight = source.innerHeight - source.document.documentElement.clientHeight;
      direction = source.getComputedStyle(source.document.documentElement).direction;
    } else {
      const borderWidths = getBorderWidths(source);
      scrollBarWidth = source.offsetWidth - source.clientWidth - borderWidths.left - borderWidths.right;
      scrollBarHeight = source.offsetHeight - source.clientHeight - borderWidths.top - borderWidths.bottom;
      direction = source.ownerDocument.defaultView.getComputedStyle(source).direction;
      this.left += borderWidths.left;
      this.top += borderWidths.top;
      this.right -= borderWidths.right;
      this.bottom -= borderWidths.bottom;
      this.width = this.right - this.left;
      this.height = this.bottom - this.top;
    }
    this.width -= scrollBarWidth;
    if (direction === "ltr") {
      this.right -= scrollBarWidth;
    } else {
      this.left += scrollBarWidth;
    }
    this.height -= scrollBarHeight;
    this.bottom -= scrollBarHeight;
    return this;
  }
  static getDomRangeRects(range) {
    const rects = [];
    const clientRects = Array.from(range.getClientRects());
    if (clientRects.length) {
      for (const rect of clientRects) {
        rects.push(new Rect(rect));
      }
    } else {
      let startContainer = range.startContainer;
      if (isText(startContainer)) {
        startContainer = startContainer.parentNode;
      }
      const rect = new Rect(startContainer.getBoundingClientRect());
      rect.right = rect.left;
      rect.width = 0;
      rects.push(rect);
    }
    return rects;
  }
  static getBoundingRect(rects) {
    const boundingRectData = {
      left: Number.POSITIVE_INFINITY,
      top: Number.POSITIVE_INFINITY,
      right: Number.NEGATIVE_INFINITY,
      bottom: Number.NEGATIVE_INFINITY,
      width: 0,
      height: 0
    };
    let rectangleCount = 0;
    for (const rect of rects) {
      rectangleCount++;
      boundingRectData.left = Math.min(boundingRectData.left, rect.left);
      boundingRectData.top = Math.min(boundingRectData.top, rect.top);
      boundingRectData.right = Math.max(boundingRectData.right, rect.right);
      boundingRectData.bottom = Math.max(boundingRectData.bottom, rect.bottom);
    }
    if (rectangleCount == 0) {
      return null;
    }
    boundingRectData.width = boundingRectData.right - boundingRectData.left;
    boundingRectData.height = boundingRectData.bottom - boundingRectData.top;
    return new Rect(boundingRectData);
  }
};
var rect_default = Rect;
function copyRectProperties(rect, source) {
  for (const p of rectProperties) {
    rect[p] = source[p];
  }
}
function isBody(value) {
  if (!isDomElement(value)) {
    return false;
  }
  return value === value.ownerDocument.body;
}
function isDomElement(value) {
  return value !== null && typeof value === "object" && value.nodeType === 1 && typeof value.getBoundingClientRect === "function";
}
function getElementPosition(element) {
  return element instanceof HTMLElement ? element.ownerDocument.defaultView.getComputedStyle(element).position : "static";
}
function getElementOverflow(element) {
  return element instanceof HTMLElement ? element.ownerDocument.defaultView.getComputedStyle(element).overflow : "visible";
}
function shiftRectToCompensatePositionedAncestor(rect, positionedElementAncestor) {
  const ancestorPosition = new Rect(positionedElementAncestor);
  const ancestorBorderWidths = getBorderWidths(positionedElementAncestor);
  let moveX = 0;
  let moveY = 0;
  moveX -= ancestorPosition.left;
  moveY -= ancestorPosition.top;
  moveX += positionedElementAncestor.scrollLeft;
  moveY += positionedElementAncestor.scrollTop;
  moveX -= ancestorBorderWidths.left;
  moveY -= ancestorBorderWidths.top;
  rect.moveBy(moveX, moveY);
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/resizeobserver.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var ResizeObserver = class {
  constructor(element, callback) {
    if (!ResizeObserver._observerInstance) {
      ResizeObserver._createObserver();
    }
    this._element = element;
    this._callback = callback;
    ResizeObserver._addElementCallback(element, callback);
    ResizeObserver._observerInstance.observe(element);
  }
  get element() {
    return this._element;
  }
  destroy() {
    ResizeObserver._deleteElementCallback(this._element, this._callback);
  }
  static _addElementCallback(element, callback) {
    if (!ResizeObserver._elementCallbacks) {
      ResizeObserver._elementCallbacks = new Map();
    }
    let callbacks = ResizeObserver._elementCallbacks.get(element);
    if (!callbacks) {
      callbacks = new Set();
      ResizeObserver._elementCallbacks.set(element, callbacks);
    }
    callbacks.add(callback);
  }
  static _deleteElementCallback(element, callback) {
    const callbacks = ResizeObserver._getElementCallbacks(element);
    if (callbacks) {
      callbacks.delete(callback);
      if (!callbacks.size) {
        ResizeObserver._elementCallbacks.delete(element);
        ResizeObserver._observerInstance.unobserve(element);
      }
    }
    if (ResizeObserver._elementCallbacks && !ResizeObserver._elementCallbacks.size) {
      ResizeObserver._observerInstance = null;
      ResizeObserver._elementCallbacks = null;
    }
  }
  static _getElementCallbacks(element) {
    if (!ResizeObserver._elementCallbacks) {
      return null;
    }
    return ResizeObserver._elementCallbacks.get(element);
  }
  static _createObserver() {
    ResizeObserver._observerInstance = new global_default.window.ResizeObserver((entries) => {
      for (const entry of entries) {
        const callbacks = ResizeObserver._getElementCallbacks(entry.target);
        if (callbacks) {
          for (const callback of callbacks) {
            callback(entry);
          }
        }
      }
    });
  }
};
var resizeobserver_default = ResizeObserver;
ResizeObserver._observerInstance = null;
ResizeObserver._elementCallbacks = null;

// node_modules/@ckeditor/ckeditor5-utils/src/dom/setdatainelement.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function setDataInElement(el, data) {
  if (el instanceof HTMLTextAreaElement) {
    el.value = data;
  }
  el.innerHTML = data;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/tounit.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function toUnit(unit) {
  return (value) => value + unit;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/indexof.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function indexOf(node) {
  let index = 0;
  while (node.previousSibling) {
    node = node.previousSibling;
    index++;
  }
  return index;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/insertat.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function insertAt(parentElement, index, nodeToInsert) {
  parentElement.insertBefore(nodeToInsert, parentElement.childNodes[index] || null);
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/iscomment.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isComment(obj) {
  return obj && obj.nodeType === Node.COMMENT_NODE;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/isvalidattributename.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isValidAttributeName(name) {
  try {
    global_default.document.createAttribute(name);
  } catch (error) {
    return false;
  }
  return true;
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/isvisible.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isVisible(element) {
  return !!(element && element.getClientRects && element.getClientRects().length);
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/position.js
import {isFunction} from "lodash-es";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function getOptimalPosition({element, target, positions, limiter, fitInViewport, viewportOffsetConfig}) {
  if (isFunction(target)) {
    target = target();
  }
  if (isFunction(limiter)) {
    limiter = limiter();
  }
  const positionedElementAncestor = getPositionedAncestor(element);
  const constrainedViewportRect = getConstrainedViewportRect(viewportOffsetConfig);
  const elementRect = new rect_default(element);
  const visibleTargetRect = getVisibleViewportIntersectionRect(target, constrainedViewportRect);
  let bestPosition;
  if (!visibleTargetRect || !constrainedViewportRect.getIntersection(visibleTargetRect)) {
    return null;
  }
  const positionOptions = {
    targetRect: visibleTargetRect,
    elementRect,
    positionedElementAncestor,
    viewportRect: constrainedViewportRect
  };
  if (!limiter && !fitInViewport) {
    bestPosition = new PositionObject(positions[0], positionOptions);
  } else {
    if (limiter) {
      const visibleLimiterRect = getVisibleViewportIntersectionRect(limiter, constrainedViewportRect);
      if (visibleLimiterRect) {
        positionOptions.limiterRect = visibleLimiterRect;
      }
    }
    bestPosition = getBestPosition(positions, positionOptions);
  }
  return bestPosition;
}
function getVisibleViewportIntersectionRect(source, viewportRect) {
  const visibleSourceRect = new rect_default(source).getVisible();
  if (!visibleSourceRect) {
    return null;
  }
  return visibleSourceRect.getIntersection(viewportRect);
}
function getConstrainedViewportRect(viewportOffsetConfig) {
  viewportOffsetConfig = Object.assign({top: 0, bottom: 0, left: 0, right: 0}, viewportOffsetConfig);
  const viewportRect = new rect_default(global_default.window);
  viewportRect.top += viewportOffsetConfig.top;
  viewportRect.height -= viewportOffsetConfig.top;
  viewportRect.bottom -= viewportOffsetConfig.bottom;
  viewportRect.height -= viewportOffsetConfig.bottom;
  return viewportRect;
}
function getBestPosition(positions, options) {
  const {elementRect} = options;
  const elementRectArea = elementRect.getArea();
  const positionInstances = positions.map((positioningFunction) => new PositionObject(positioningFunction, options)).filter((position) => !!position.name);
  let maxFitFactor = 0;
  let bestPosition = null;
  for (const position of positionInstances) {
    const {limiterIntersectionArea, viewportIntersectionArea} = position;
    if (limiterIntersectionArea === elementRectArea) {
      return position;
    }
    const fitFactor = viewportIntersectionArea ** 2 + limiterIntersectionArea ** 2;
    if (fitFactor > maxFitFactor) {
      maxFitFactor = fitFactor;
      bestPosition = position;
    }
  }
  return bestPosition;
}
var PositionObject = class {
  constructor(positioningFunction, options) {
    const positioningFunctionOutput = positioningFunction(options.targetRect, options.elementRect, options.viewportRect, options.limiterRect);
    if (!positioningFunctionOutput) {
      return;
    }
    const {left, top, name, config} = positioningFunctionOutput;
    this.name = name;
    this.config = config;
    this._positioningFunctionCoordinates = {left, top};
    this._options = options;
  }
  get left() {
    return this._absoluteRect.left;
  }
  get top() {
    return this._absoluteRect.top;
  }
  get limiterIntersectionArea() {
    const limiterRect = this._options.limiterRect;
    if (limiterRect) {
      return limiterRect.getIntersectionArea(this._rect);
    }
    return 0;
  }
  get viewportIntersectionArea() {
    const viewportRect = this._options.viewportRect;
    return viewportRect.getIntersectionArea(this._rect);
  }
  get _rect() {
    if (this._cachedRect) {
      return this._cachedRect;
    }
    this._cachedRect = this._options.elementRect.clone().moveTo(this._positioningFunctionCoordinates.left, this._positioningFunctionCoordinates.top);
    return this._cachedRect;
  }
  get _absoluteRect() {
    if (this._cachedAbsoluteRect) {
      return this._cachedAbsoluteRect;
    }
    this._cachedAbsoluteRect = this._rect.toAbsoluteRect();
    return this._cachedAbsoluteRect;
  }
};

// node_modules/@ckeditor/ckeditor5-utils/src/dom/remove.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function remove(node) {
  const parent = node.parentNode;
  if (parent) {
    parent.removeChild(node);
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/dom/scroll.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function scrollViewportToShowTarget({target, viewportOffset = 0, ancestorOffset = 0, alignToTop, forceScroll}) {
  const targetWindow = getWindow(target);
  let currentWindow = targetWindow;
  let currentFrame = null;
  viewportOffset = normalizeViewportOffset(viewportOffset);
  while (currentWindow) {
    let firstAncestorToScroll;
    if (currentWindow == targetWindow) {
      firstAncestorToScroll = getParentElement(target);
    } else {
      firstAncestorToScroll = getParentElement(currentFrame);
    }
    scrollAncestorsToShowRect({
      parent: firstAncestorToScroll,
      getRect: () => {
        return getRectRelativeToWindow(target, currentWindow);
      },
      alignToTop,
      ancestorOffset,
      forceScroll
    });
    const targetRect = getRectRelativeToWindow(target, currentWindow);
    scrollWindowToShowRect({
      window: currentWindow,
      rect: targetRect,
      viewportOffset,
      alignToTop,
      forceScroll
    });
    if (currentWindow.parent != currentWindow) {
      currentFrame = currentWindow.frameElement;
      currentWindow = currentWindow.parent;
      if (!currentFrame) {
        return;
      }
    } else {
      currentWindow = null;
    }
  }
}
function scrollAncestorsToShowTarget(target, ancestorOffset, limiterElement) {
  const targetParent = getParentElement(target);
  scrollAncestorsToShowRect({
    parent: targetParent,
    getRect: () => new rect_default(target),
    ancestorOffset,
    limiterElement
  });
}
function scrollWindowToShowRect({window: window2, rect, alignToTop, forceScroll, viewportOffset}) {
  const targetShiftedDownRect = rect.clone().moveBy(0, viewportOffset.bottom);
  const targetShiftedUpRect = rect.clone().moveBy(0, -viewportOffset.top);
  const viewportRect = new rect_default(window2).excludeScrollbarsAndBorders();
  const rects = [targetShiftedUpRect, targetShiftedDownRect];
  const forceScrollToTop = alignToTop && forceScroll;
  const allRectsFitInViewport = rects.every((rect2) => viewportRect.contains(rect2));
  let {scrollX, scrollY} = window2;
  const initialScrollX = scrollX;
  const initialScrollY = scrollY;
  if (forceScrollToTop) {
    scrollY -= viewportRect.top - rect.top + viewportOffset.top;
  } else if (!allRectsFitInViewport) {
    if (isAbove(targetShiftedUpRect, viewportRect)) {
      scrollY -= viewportRect.top - rect.top + viewportOffset.top;
    } else if (isBelow(targetShiftedDownRect, viewportRect)) {
      if (alignToTop) {
        scrollY += rect.top - viewportRect.top - viewportOffset.top;
      } else {
        scrollY += rect.bottom - viewportRect.bottom + viewportOffset.bottom;
      }
    }
  }
  if (!allRectsFitInViewport) {
    if (isLeftOf(rect, viewportRect)) {
      scrollX -= viewportRect.left - rect.left + viewportOffset.left;
    } else if (isRightOf(rect, viewportRect)) {
      scrollX += rect.right - viewportRect.right + viewportOffset.right;
    }
  }
  if (scrollX != initialScrollX || scrollY !== initialScrollY) {
    window2.scrollTo(scrollX, scrollY);
  }
}
function scrollAncestorsToShowRect({parent, getRect, alignToTop, forceScroll, ancestorOffset = 0, limiterElement}) {
  const parentWindow = getWindow(parent);
  const forceScrollToTop = alignToTop && forceScroll;
  let parentRect, targetRect, targetFitsInTarget;
  const limiter = limiterElement || parentWindow.document.body;
  while (parent != limiter) {
    targetRect = getRect();
    parentRect = new rect_default(parent).excludeScrollbarsAndBorders();
    targetFitsInTarget = parentRect.contains(targetRect);
    if (forceScrollToTop) {
      parent.scrollTop -= parentRect.top - targetRect.top + ancestorOffset;
    } else if (!targetFitsInTarget) {
      if (isAbove(targetRect, parentRect)) {
        parent.scrollTop -= parentRect.top - targetRect.top + ancestorOffset;
      } else if (isBelow(targetRect, parentRect)) {
        if (alignToTop) {
          parent.scrollTop += targetRect.top - parentRect.top - ancestorOffset;
        } else {
          parent.scrollTop += targetRect.bottom - parentRect.bottom + ancestorOffset;
        }
      }
    }
    if (!targetFitsInTarget) {
      if (isLeftOf(targetRect, parentRect)) {
        parent.scrollLeft -= parentRect.left - targetRect.left + ancestorOffset;
      } else if (isRightOf(targetRect, parentRect)) {
        parent.scrollLeft += targetRect.right - parentRect.right + ancestorOffset;
      }
    }
    parent = parent.parentNode;
  }
}
function isBelow(firstRect, secondRect) {
  return firstRect.bottom > secondRect.bottom;
}
function isAbove(firstRect, secondRect) {
  return firstRect.top < secondRect.top;
}
function isLeftOf(firstRect, secondRect) {
  return firstRect.left < secondRect.left;
}
function isRightOf(firstRect, secondRect) {
  return firstRect.right > secondRect.right;
}
function getWindow(elementOrRange) {
  if (isRange(elementOrRange)) {
    return elementOrRange.startContainer.ownerDocument.defaultView;
  } else {
    return elementOrRange.ownerDocument.defaultView;
  }
}
function getParentElement(elementOrRange) {
  if (isRange(elementOrRange)) {
    let parent = elementOrRange.commonAncestorContainer;
    if (isText(parent)) {
      parent = parent.parentNode;
    }
    return parent;
  } else {
    return elementOrRange.parentNode;
  }
}
function getRectRelativeToWindow(target, relativeWindow) {
  const targetWindow = getWindow(target);
  const rect = new rect_default(target);
  if (targetWindow === relativeWindow) {
    return rect;
  } else {
    let currentWindow = targetWindow;
    while (currentWindow != relativeWindow) {
      const frame = currentWindow.frameElement;
      const frameRect = new rect_default(frame).excludeScrollbarsAndBorders();
      rect.moveBy(frameRect.left, frameRect.top);
      currentWindow = currentWindow.parent;
    }
  }
  return rect;
}
function normalizeViewportOffset(viewportOffset) {
  if (typeof viewportOffset === "number") {
    return {
      top: viewportOffset,
      bottom: viewportOffset,
      left: viewportOffset,
      right: viewportOffset
    };
  }
  return viewportOffset;
}

// node_modules/@ckeditor/ckeditor5-utils/src/keyboard.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var modifiersToGlyphsMac = {
  ctrl: "\u2303",
  cmd: "\u2318",
  alt: "\u2325",
  shift: "\u21E7"
};
var modifiersToGlyphsNonMac = {
  ctrl: "Ctrl+",
  alt: "Alt+",
  shift: "Shift+"
};
var keyCodes = generateKnownKeyCodes();
var keyCodeNames = Object.fromEntries(Object.entries(keyCodes).map(([name, code]) => [code, name.charAt(0).toUpperCase() + name.slice(1)]));
function getCode(key) {
  let keyCode;
  if (typeof key == "string") {
    keyCode = keyCodes[key.toLowerCase()];
    if (!keyCode) {
      throw new ckeditorerror_default("keyboard-unknown-key", null, {key});
    }
  } else {
    keyCode = key.keyCode + (key.altKey ? keyCodes.alt : 0) + (key.ctrlKey ? keyCodes.ctrl : 0) + (key.shiftKey ? keyCodes.shift : 0) + (key.metaKey ? keyCodes.cmd : 0);
  }
  return keyCode;
}
function parseKeystroke(keystroke) {
  if (typeof keystroke == "string") {
    keystroke = splitKeystrokeText(keystroke);
  }
  return keystroke.map((key) => typeof key == "string" ? getEnvKeyCode(key) : key).reduce((key, sum) => sum + key, 0);
}
function getEnvKeystrokeText(keystroke) {
  let keystrokeCode = parseKeystroke(keystroke);
  const modifiersToGlyphs = Object.entries(env_default.isMac || env_default.isiOS ? modifiersToGlyphsMac : modifiersToGlyphsNonMac);
  const modifiers = modifiersToGlyphs.reduce((modifiers2, [name, glyph]) => {
    if ((keystrokeCode & keyCodes[name]) != 0) {
      keystrokeCode &= ~keyCodes[name];
      modifiers2 += glyph;
    }
    return modifiers2;
  }, "");
  return modifiers + (keystrokeCode ? keyCodeNames[keystrokeCode] : "");
}
function isArrowKeyCode(keyCode) {
  return keyCode == keyCodes.arrowright || keyCode == keyCodes.arrowleft || keyCode == keyCodes.arrowup || keyCode == keyCodes.arrowdown;
}
function getLocalizedArrowKeyCodeDirection(keyCode, contentLanguageDirection) {
  const isLtrContent = contentLanguageDirection === "ltr";
  switch (keyCode) {
    case keyCodes.arrowleft:
      return isLtrContent ? "left" : "right";
    case keyCodes.arrowright:
      return isLtrContent ? "right" : "left";
    case keyCodes.arrowup:
      return "up";
    case keyCodes.arrowdown:
      return "down";
  }
}
function getEnvKeyCode(key) {
  if (key.endsWith("!")) {
    return getCode(key.slice(0, -1));
  }
  const code = getCode(key);
  return (env_default.isMac || env_default.isiOS) && code == keyCodes.ctrl ? keyCodes.cmd : code;
}
function isForwardArrowKeyCode(keyCode, contentLanguageDirection) {
  const localizedKeyCodeDirection = getLocalizedArrowKeyCodeDirection(keyCode, contentLanguageDirection);
  return localizedKeyCodeDirection === "down" || localizedKeyCodeDirection === "right";
}
function generateKnownKeyCodes() {
  const keyCodes2 = {
    arrowleft: 37,
    arrowup: 38,
    arrowright: 39,
    arrowdown: 40,
    backspace: 8,
    delete: 46,
    enter: 13,
    space: 32,
    esc: 27,
    tab: 9,
    ctrl: 1114112,
    shift: 2228224,
    alt: 4456448,
    cmd: 8912896
  };
  for (let code = 65; code <= 90; code++) {
    const letter = String.fromCharCode(code);
    keyCodes2[letter.toLowerCase()] = code;
  }
  for (let code = 48; code <= 57; code++) {
    keyCodes2[code - 48] = code;
  }
  for (let code = 112; code <= 123; code++) {
    keyCodes2["f" + (code - 111)] = code;
  }
  for (const char of "`-=[];',./\\") {
    keyCodes2[char] = char.charCodeAt(0);
  }
  return keyCodes2;
}
function splitKeystrokeText(keystroke) {
  return keystroke.split("+").map((key) => key.trim());
}

// node_modules/@ckeditor/ckeditor5-utils/src/language.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var RTL_LANGUAGE_CODES = [
  "ar",
  "ara",
  "fa",
  "per",
  "fas",
  "he",
  "heb",
  "ku",
  "kur",
  "ug",
  "uig"
];
function getLanguageDirection(languageCode) {
  return RTL_LANGUAGE_CODES.includes(languageCode) ? "rtl" : "ltr";
}

// node_modules/@ckeditor/ckeditor5-utils/src/toarray.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function toArray(data) {
  return Array.isArray(data) ? data : [data];
}

// node_modules/@ckeditor/ckeditor5-utils/src/translation-service.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
/* istanbul ignore else -- @preserve */
if (!global_default.window.CKEDITOR_TRANSLATIONS) {
  global_default.window.CKEDITOR_TRANSLATIONS = {};
}
function _translate(language, message, quantity = 1) {
  if (typeof quantity !== "number") {
    throw new ckeditorerror_default("translation-service-quantity-not-a-number", null, {quantity});
  }
  const numberOfLanguages = getNumberOfLanguages();
  if (numberOfLanguages === 1) {
    language = Object.keys(global_default.window.CKEDITOR_TRANSLATIONS)[0];
  }
  const messageId = message.id || message.string;
  if (numberOfLanguages === 0 || !hasTranslation(language, messageId)) {
    if (quantity !== 1) {
      return message.plural;
    }
    return message.string;
  }
  const dictionary = global_default.window.CKEDITOR_TRANSLATIONS[language].dictionary;
  const getPluralForm = global_default.window.CKEDITOR_TRANSLATIONS[language].getPluralForm || ((n) => n === 1 ? 0 : 1);
  const translation = dictionary[messageId];
  if (typeof translation === "string") {
    return translation;
  }
  const pluralFormIndex = Number(getPluralForm(quantity));
  return translation[pluralFormIndex];
}
function hasTranslation(language, messageId) {
  return !!global_default.window.CKEDITOR_TRANSLATIONS[language] && !!global_default.window.CKEDITOR_TRANSLATIONS[language].dictionary[messageId];
}
function getNumberOfLanguages() {
  return Object.keys(global_default.window.CKEDITOR_TRANSLATIONS).length;
}

// node_modules/@ckeditor/ckeditor5-utils/src/locale.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Locale = class {
  constructor({uiLanguage = "en", contentLanguage} = {}) {
    this.uiLanguage = uiLanguage;
    this.contentLanguage = contentLanguage || this.uiLanguage;
    this.uiLanguageDirection = getLanguageDirection(this.uiLanguage);
    this.contentLanguageDirection = getLanguageDirection(this.contentLanguage);
    this.t = (message, values) => this._t(message, values);
  }
  get language() {
    console.warn("locale-deprecated-language-property: The Locale#language property has been deprecated and will be removed in the near future. Please use #uiLanguage and #contentLanguage properties instead.");
    return this.uiLanguage;
  }
  _t(message, values = []) {
    values = toArray(values);
    if (typeof message === "string") {
      message = {string: message};
    }
    const hasPluralForm = !!message.plural;
    const quantity = hasPluralForm ? values[0] : 1;
    const translatedString = _translate(this.uiLanguage, message, quantity);
    return interpolateString(translatedString, values);
  }
};
var locale_default = Locale;
function interpolateString(string, values) {
  return string.replace(/%(\d+)/g, (match, index) => {
    return index < values.length ? values[index] : match;
  });
}

// node_modules/@ckeditor/ckeditor5-utils/src/collection.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var Collection = class extends EmitterMixin() {
  constructor(initialItemsOrOptions = {}, options = {}) {
    super();
    const hasInitialItems = isIterable(initialItemsOrOptions);
    if (!hasInitialItems) {
      options = initialItemsOrOptions;
    }
    this._items = [];
    this._itemMap = new Map();
    this._idProperty = options.idProperty || "id";
    this._bindToExternalToInternalMap = new WeakMap();
    this._bindToInternalToExternalMap = new WeakMap();
    this._skippedIndexesFromExternal = [];
    if (hasInitialItems) {
      for (const item of initialItemsOrOptions) {
        this._items.push(item);
        this._itemMap.set(this._getItemIdBeforeAdding(item), item);
      }
    }
  }
  get length() {
    return this._items.length;
  }
  get first() {
    return this._items[0] || null;
  }
  get last() {
    return this._items[this.length - 1] || null;
  }
  add(item, index) {
    return this.addMany([item], index);
  }
  addMany(items, index) {
    if (index === void 0) {
      index = this._items.length;
    } else if (index > this._items.length || index < 0) {
      throw new ckeditorerror_default("collection-add-item-invalid-index", this);
    }
    let offset = 0;
    for (const item of items) {
      const itemId = this._getItemIdBeforeAdding(item);
      const currentItemIndex = index + offset;
      this._items.splice(currentItemIndex, 0, item);
      this._itemMap.set(itemId, item);
      this.fire("add", item, currentItemIndex);
      offset++;
    }
    this.fire("change", {
      added: items,
      removed: [],
      index
    });
    return this;
  }
  get(idOrIndex) {
    let item;
    if (typeof idOrIndex == "string") {
      item = this._itemMap.get(idOrIndex);
    } else if (typeof idOrIndex == "number") {
      item = this._items[idOrIndex];
    } else {
      throw new ckeditorerror_default("collection-get-invalid-arg", this);
    }
    return item || null;
  }
  has(itemOrId) {
    if (typeof itemOrId == "string") {
      return this._itemMap.has(itemOrId);
    } else {
      const idProperty = this._idProperty;
      const id = itemOrId[idProperty];
      return id && this._itemMap.has(id);
    }
  }
  getIndex(itemOrId) {
    let item;
    if (typeof itemOrId == "string") {
      item = this._itemMap.get(itemOrId);
    } else {
      item = itemOrId;
    }
    return item ? this._items.indexOf(item) : -1;
  }
  remove(subject) {
    const [item, index] = this._remove(subject);
    this.fire("change", {
      added: [],
      removed: [item],
      index
    });
    return item;
  }
  map(callback, ctx) {
    return this._items.map(callback, ctx);
  }
  find(callback, ctx) {
    return this._items.find(callback, ctx);
  }
  filter(callback, ctx) {
    return this._items.filter(callback, ctx);
  }
  clear() {
    if (this._bindToCollection) {
      this.stopListening(this._bindToCollection);
      this._bindToCollection = null;
    }
    const removedItems = Array.from(this._items);
    while (this.length) {
      this._remove(0);
    }
    this.fire("change", {
      added: [],
      removed: removedItems,
      index: 0
    });
  }
  bindTo(externalCollection) {
    if (this._bindToCollection) {
      throw new ckeditorerror_default("collection-bind-to-rebind", this);
    }
    this._bindToCollection = externalCollection;
    return {
      as: (Class) => {
        this._setUpBindToBinding((item) => new Class(item));
      },
      using: (callbackOrProperty) => {
        if (typeof callbackOrProperty == "function") {
          this._setUpBindToBinding(callbackOrProperty);
        } else {
          this._setUpBindToBinding((item) => item[callbackOrProperty]);
        }
      }
    };
  }
  _setUpBindToBinding(factory) {
    const externalCollection = this._bindToCollection;
    const addItem = (evt, externalItem, index) => {
      const isExternalBoundToThis = externalCollection._bindToCollection == this;
      const externalItemBound = externalCollection._bindToInternalToExternalMap.get(externalItem);
      if (isExternalBoundToThis && externalItemBound) {
        this._bindToExternalToInternalMap.set(externalItem, externalItemBound);
        this._bindToInternalToExternalMap.set(externalItemBound, externalItem);
      } else {
        const item = factory(externalItem);
        if (!item) {
          this._skippedIndexesFromExternal.push(index);
          return;
        }
        let finalIndex = index;
        for (const skipped of this._skippedIndexesFromExternal) {
          if (index > skipped) {
            finalIndex--;
          }
        }
        for (const skipped of externalCollection._skippedIndexesFromExternal) {
          if (finalIndex >= skipped) {
            finalIndex++;
          }
        }
        this._bindToExternalToInternalMap.set(externalItem, item);
        this._bindToInternalToExternalMap.set(item, externalItem);
        this.add(item, finalIndex);
        for (let i = 0; i < externalCollection._skippedIndexesFromExternal.length; i++) {
          if (finalIndex <= externalCollection._skippedIndexesFromExternal[i]) {
            externalCollection._skippedIndexesFromExternal[i]++;
          }
        }
      }
    };
    for (const externalItem of externalCollection) {
      addItem(null, externalItem, externalCollection.getIndex(externalItem));
    }
    this.listenTo(externalCollection, "add", addItem);
    this.listenTo(externalCollection, "remove", (evt, externalItem, index) => {
      const item = this._bindToExternalToInternalMap.get(externalItem);
      if (item) {
        this.remove(item);
      }
      this._skippedIndexesFromExternal = this._skippedIndexesFromExternal.reduce((result, skipped) => {
        if (index < skipped) {
          result.push(skipped - 1);
        }
        if (index > skipped) {
          result.push(skipped);
        }
        return result;
      }, []);
    });
  }
  _getItemIdBeforeAdding(item) {
    const idProperty = this._idProperty;
    let itemId;
    if (idProperty in item) {
      itemId = item[idProperty];
      if (typeof itemId != "string") {
        throw new ckeditorerror_default("collection-add-invalid-id", this);
      }
      if (this.get(itemId)) {
        throw new ckeditorerror_default("collection-add-item-already-exists", this);
      }
    } else {
      item[idProperty] = itemId = uid();
    }
    return itemId;
  }
  _remove(subject) {
    let index, id, item;
    let itemDoesNotExist = false;
    const idProperty = this._idProperty;
    if (typeof subject == "string") {
      id = subject;
      item = this._itemMap.get(id);
      itemDoesNotExist = !item;
      if (item) {
        index = this._items.indexOf(item);
      }
    } else if (typeof subject == "number") {
      index = subject;
      item = this._items[index];
      itemDoesNotExist = !item;
      if (item) {
        id = item[idProperty];
      }
    } else {
      item = subject;
      id = item[idProperty];
      index = this._items.indexOf(item);
      itemDoesNotExist = index == -1 || !this._itemMap.get(id);
    }
    if (itemDoesNotExist) {
      throw new ckeditorerror_default("collection-remove-404", this);
    }
    this._items.splice(index, 1);
    this._itemMap.delete(id);
    const externalItem = this._bindToInternalToExternalMap.get(item);
    this._bindToInternalToExternalMap.delete(item);
    this._bindToExternalToInternalMap.delete(externalItem);
    this.fire("remove", item, index);
    return [item, index];
  }
  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }
};
var collection_default = Collection;

// node_modules/@ckeditor/ckeditor5-utils/src/first.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function first(iterator) {
  const iteratorItem = iterator.next();
  if (iteratorItem.done) {
    return null;
  }
  return iteratorItem.value;
}

// node_modules/@ckeditor/ckeditor5-utils/src/focustracker.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var FocusTracker = class extends DomEmitterMixin(ObservableMixin()) {
  constructor() {
    super();
    this._elements = new Set();
    this._nextEventLoopTimeout = null;
    this.set("isFocused", false);
    this.set("focusedElement", null);
  }
  add(element) {
    if (this._elements.has(element)) {
      throw new ckeditorerror_default("focustracker-add-element-already-exist", this);
    }
    this.listenTo(element, "focus", () => this._focus(element), {useCapture: true});
    this.listenTo(element, "blur", () => this._blur(), {useCapture: true});
    this._elements.add(element);
  }
  remove(element) {
    if (element === this.focusedElement) {
      this._blur();
    }
    if (this._elements.has(element)) {
      this.stopListening(element);
      this._elements.delete(element);
    }
  }
  destroy() {
    this.stopListening();
  }
  _focus(element) {
    clearTimeout(this._nextEventLoopTimeout);
    this.focusedElement = element;
    this.isFocused = true;
  }
  _blur() {
    clearTimeout(this._nextEventLoopTimeout);
    this._nextEventLoopTimeout = setTimeout(() => {
      this.focusedElement = null;
      this.isFocused = false;
    }, 0);
  }
};
var focustracker_default = FocusTracker;

// node_modules/@ckeditor/ckeditor5-utils/src/keystrokehandler.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var KeystrokeHandler = class {
  constructor() {
    this._listener = new (DomEmitterMixin())();
  }
  listenTo(emitter) {
    this._listener.listenTo(emitter, "keydown", (evt, keyEvtData) => {
      this._listener.fire("_keydown:" + getCode(keyEvtData), keyEvtData);
    });
  }
  set(keystroke, callback, options = {}) {
    const keyCode = parseKeystroke(keystroke);
    const priority = options.priority;
    this._listener.listenTo(this._listener, "_keydown:" + keyCode, (evt, keyEvtData) => {
      callback(keyEvtData, () => {
        keyEvtData.preventDefault();
        keyEvtData.stopPropagation();
        evt.stop();
      });
      evt.return = true;
    }, {priority});
  }
  press(keyEvtData) {
    return !!this._listener.fire("_keydown:" + getCode(keyEvtData), keyEvtData);
  }
  stopListening(emitter) {
    this._listener.stopListening(emitter);
  }
  destroy() {
    this.stopListening();
  }
};
var keystrokehandler_default = KeystrokeHandler;

// node_modules/@ckeditor/ckeditor5-utils/src/objecttomap.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function objectToMap(obj) {
  const map = new Map();
  for (const key in obj) {
    map.set(key, obj[key]);
  }
  return map;
}

// node_modules/@ckeditor/ckeditor5-utils/src/tomap.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function toMap(data) {
  if (isIterable(data)) {
    return new Map(data);
  } else {
    return objectToMap(data);
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/splicearray.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
var BIG_CHUNK_SIZE = 1e4;
function spliceArray(target, source, start, count2) {
  if (Math.max(source.length, target.length) > BIG_CHUNK_SIZE) {
    return target.slice(0, start).concat(source).concat(target.slice(start + count2, target.length));
  } else {
    const newTarget = Array.from(target);
    newTarget.splice(start, count2, ...source);
    return newTarget;
  }
}

// node_modules/@ckeditor/ckeditor5-utils/src/delay.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function delay(func, wait) {
  let timer;
  function delayed(...args) {
    delayed.cancel();
    timer = setTimeout(() => func(...args), wait);
  }
  delayed.cancel = () => {
    clearTimeout(timer);
  };
  return delayed;
}

// node_modules/@ckeditor/ckeditor5-utils/src/verifylicense.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function verifyLicense(token) {
  function oldTokenCheck(token2) {
    if (token2.length >= 40 && token2.length <= 255) {
      return "VALID";
    } else {
      return "INVALID";
    }
  }
  if (!token) {
    return "INVALID";
  }
  let decryptedData = "";
  try {
    decryptedData = atob(token);
  } catch (e) {
    return "INVALID";
  }
  const splittedDecryptedData = decryptedData.split("-");
  const firstElement = splittedDecryptedData[0];
  const secondElement = splittedDecryptedData[1];
  if (!secondElement) {
    return oldTokenCheck(token);
  }
  try {
    atob(secondElement);
  } catch (e) {
    try {
      atob(firstElement);
      if (!atob(firstElement).length) {
        return oldTokenCheck(token);
      }
    } catch (e2) {
      return oldTokenCheck(token);
    }
  }
  if (firstElement.length < 40 || firstElement.length > 255) {
    return "INVALID";
  }
  let decryptedSecondElement = "";
  try {
    atob(firstElement);
    decryptedSecondElement = atob(secondElement);
  } catch (e) {
    return "INVALID";
  }
  if (decryptedSecondElement.length !== 8) {
    return "INVALID";
  }
  const year = Number(decryptedSecondElement.substring(0, 4));
  const monthIndex = Number(decryptedSecondElement.substring(4, 6)) - 1;
  const day = Number(decryptedSecondElement.substring(6, 8));
  const date = new Date(year, monthIndex, day);
  if (date < releaseDate || isNaN(Number(date))) {
    return "INVALID";
  }
  return "VALID";
}

// node_modules/@ckeditor/ckeditor5-utils/src/unicode.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
function isCombiningMark(character) {
  return !!character && character.length == 1 && /[\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]/.test(character);
}
function isHighSurrogateHalf(character) {
  return !!character && character.length == 1 && /[\ud800-\udbff]/.test(character);
}
function isLowSurrogateHalf(character) {
  return !!character && character.length == 1 && /[\udc00-\udfff]/.test(character);
}
function isInsideSurrogatePair(string, offset) {
  return isHighSurrogateHalf(string.charAt(offset - 1)) && isLowSurrogateHalf(string.charAt(offset));
}
function isInsideCombinedSymbol(string, offset) {
  return isCombiningMark(string.charAt(offset));
}
var EMOJI_PATTERN = buildEmojiRegexp();
function isInsideEmojiSequence(string, offset) {
  const matches = String(string).matchAll(EMOJI_PATTERN);
  return Array.from(matches).some((match) => match.index < offset && offset < match.index + match[0].length);
}
function buildEmojiRegexp() {
  const parts = [
    /\p{Emoji}[\u{E0020}-\u{E007E}]+\u{E007F}/u,
    /\p{Emoji}\u{FE0F}?\u{20E3}/u,
    /\p{Emoji}\u{FE0F}/u,
    /(?=\p{General_Category=Other_Symbol})\p{Emoji}\p{Emoji_Modifier}*/u
  ];
  const flagSequence = /\p{Regional_Indicator}{2}/u.source;
  const emoji = "(?:" + parts.map((part) => part.source).join("|") + ")";
  const sequence = `${flagSequence}|${emoji}(?:\u200D${emoji})*`;
  return new RegExp(sequence, "ug");
}

// node_modules/@ckeditor/ckeditor5-utils/src/index.js
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
export {
  ckeditorerror_default as CKEditorError,
  collection_default as Collection,
  config_default as Config,
  DomEmitterMixin,
  elementreplacer_default as ElementReplacer,
  EmitterMixin,
  eventinfo_default as EventInfo,
  focustracker_default as FocusTracker,
  keystrokehandler_default as KeystrokeHandler,
  locale_default as Locale,
  ObservableMixin,
  rect_default as Rect,
  resizeobserver_default as ResizeObserver,
  compareArrays,
  count,
  createElement,
  delay,
  diff,
  diffToChanges,
  env_default as env,
  fastDiff,
  findClosestScrollableAncestor,
  first,
  getAncestors,
  getBorderWidths,
  getCode,
  getDataFromElement,
  getEnvKeystrokeText,
  getLanguageDirection,
  getLocalizedArrowKeyCodeDirection,
  getOptimalPosition,
  global_default as global,
  indexOf,
  insertAt,
  insertToPriorityArray,
  isArrowKeyCode,
  isCombiningMark,
  isComment,
  isForwardArrowKeyCode,
  isHighSurrogateHalf,
  isInsideCombinedSymbol,
  isInsideEmojiSequence,
  isInsideSurrogatePair,
  isIterable,
  isLowSurrogateHalf,
  isNode,
  isRange,
  isText,
  isValidAttributeName,
  isVisible,
  keyCodes,
  logError,
  logWarning,
  mix,
  parseKeystroke,
  priorities_default as priorities,
  releaseDate,
  remove,
  scrollAncestorsToShowTarget,
  scrollViewportToShowTarget,
  setDataInElement,
  spliceArray,
  toArray,
  toMap,
  toUnit,
  uid,
  verifyLicense,
  version_default as version
};
