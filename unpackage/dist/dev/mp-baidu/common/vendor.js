(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!***********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _swan$getSystemInfoSy =




  swan.getSystemInfoSync(),platform = _swan$getSystemInfoSy.platform,pixelRatio = _swan$getSystemInfoSy.pixelRatio,windowWidth = _swan$getSystemInfoSy.windowWidth; // uni=>swan runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


// 不支持的 API 列表
var todos = [
'preloadPage',
'unPreloadPage'
// 'hideKeyboard',
// 'onGyroscopeChange',
// 'startGyroscope',
// 'stopGyroscope',
// 'openBluetoothAdapter',
// 'startBluetoothDevicesDiscovery',
// 'onBluetoothDeviceFound',
// 'stopBluetoothDevicesDiscovery',
// 'onBluetoothAdapterStateChange',
// 'getConnectedBluetoothDevices',
// 'getBluetoothDevices',
// 'getBluetoothAdapterState',
// 'closeBluetoothAdapter',
// 'writeBLECharacteristicValue',
// 'readBLECharacteristicValue',
// 'onBLEConnectionStateChange',
// 'onBLECharacteristicValueChange',
// 'notifyBLECharacteristicValueChange',
// 'getBLEDeviceServices',
// 'getBLEDeviceCharacteristics',
// 'createBLEConnection',
// 'closeBLEConnection',
// 'onBeaconServiceChange',
// 'onBeaconUpdate',
// 'getBeacons',
// 'startBeaconDiscovery',
// 'stopBeaconDiscovery',
// 'hideShareMenu',
// 'onWindowResize',
// 'offWindowResize',
// 'vibrate'
];

// 存在兼容性的 API 列表
var canIUses = [];

function createTodoMethod(contextName, methodName) {
  return function unsupported() {
    console.error("\u767E\u5EA6\u5C0F\u7A0B\u5E8F ".concat(contextName, "\u6682\u4E0D\u652F\u6301").concat(methodName));
  };
}

function _handleEnvInfo(result) {
  result.miniProgram = {
    appId: result.appKey };

  result.plugin = {
    version: result.sdkVersion };

}

// 需要做转换的 API 列表
var protocols = {
  request: {
    args: function args(fromArgs) {
      // TODO
      // data 不支持 ArrayBuffer
      // method 不支持 TRACE, CONNECT
      return {
        method: 'method',
        dataType: function dataType(type) {
          return {
            name: 'dataType',
            value: type === 'json' ? type : 'string' };

        } };

    } },

  connectSocket: {
    args: {
      method: false } },


  previewImage: previewImage,
  getRecorderManager: {
    returnValue: function returnValue(fromRet) {
      fromRet.onFrameRecorded = createTodoMethod('RecorderManager', 'onFrameRecorded');
    } },

  getBackgroundAudioManager: {
    returnValue: function returnValue(fromRet) {
      fromRet.onPrev = createTodoMethod('BackgroundAudioManager', 'onPrev');
      fromRet.onNext = createTodoMethod('BackgroundAudioManager', 'onNext');
    } },

  scanCode: {
    args: {
      onlyFromCamera: false,
      scanType: false } },


  navigateToMiniProgram: {
    name: 'navigateToSmartProgram',
    args: {
      appId: 'appKey',
      envVersion: false } },


  navigateBackMiniProgram: {
    name: 'navigateBackSmartProgram' },

  showShareMenu: {
    name: 'openShare' },

  getAccountInfoSync: {
    name: 'getEnvInfoSync',
    returnValue: _handleEnvInfo } };



var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u767E\u5EA6\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u767E\u5EA6\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = swan[options.name || methodName].apply(swan, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['baidu'],
  share: ['baidu'],
  payment: ['baidu'],
  push: ['baidu'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


function requestPayment(params) {
  var parseError = false;
  if (typeof params.orderInfo === 'string') {
    try {
      params.orderInfo = JSON.parse(params.orderInfo);
    } catch (e) {
      parseError = true;
    }
  }
  if (parseError) {
    params.fail && params.fail({
      errMsg: 'requestPayment:fail: 参数 orderInfo 数据结构不正确，参考：https://uniapp.dcloud.io/api/plugins/payment?id=orderinfo' });

  } else {
    swan.requestPolymerPayment(params);
  }
}

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  requestPayment: requestPayment });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "swan".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  {
    if (
    defaultValue === false &&
    Array.isArray(type) &&
    type.length === 2 &&
    type.indexOf(String) !== -1 &&
    type.indexOf(Boolean) !== -1)
    {// [String,Boolean]=>Boolean
      if (file) {
        console.warn("props.".concat(
        key, ".type should use Boolean instead of [String,Boolean] at ").concat(file));

      }
      return Boolean;
    }
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  {// mp-baidu，checked=>value
    if (
    isPlainObject(event.detail) &&
    hasOwn(event.detail, 'checked') &&
    !hasOwn(event.detail, 'value'))
    {
      event.detail.value = event.detail.checked;
    }
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-baidu";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

var mocks = ['nodeId', 'componentName', '_componentId', 'uniquePrefix'];

function isPage() {
  return !this.ownerId;
}

function initRelation(detail) {
  this.dispatch('__l', detail);
}

function parseApp(vm) {
  // 百度 onShow 竟然会在 onLaunch 之前
  var appOptions = parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

  appOptions.onShow = function onShow(args) {
    if (!this.$vm) {
      this.onLaunch(args);
    }
    this.$vm.__call_hook('onShow', args);
  };
  return appOptions;
}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

var newLifecycle = swan.canIUse('lifecycle-2-0');

function parseComponent(vueOptions) {
  var componentOptions = parseBaseComponent(vueOptions, {
    isPage: isPage,
    initRelation: initRelation });


  // 关于百度小程序生命周期的说明(组件作为页面时):
  // lifetimes:attached --> methods:onShow --> methods:onLoad --> methods:onReady
  // 这里在强制将onShow挪到onLoad之后触发,另外一处修改在page-parser.js
  var oldAttached = componentOptions.lifetimes.attached;
  componentOptions.lifetimes.attached = function attached() {
    oldAttached.call(this);
    if (isPage.call(this)) {// 百度 onLoad 在 attached 之前触发
      // 百度 当组件作为页面时 pageinstancce 不是原来组件的 instance
      this.pageinstance.$vm = this.$vm;
      if (hasOwn(this.pageinstance, '_$args')) {
        this.$vm.$mp.query = this.pageinstance._$args;
        this.$vm.__call_hook('onLoad', this.pageinstance._$args);
        this.$vm.__call_hook('onShow');
        delete this.pageinstance._$args;
      }
    } else {
      // 百度小程序组件不触发methods内的onReady
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
      }
    }
  };

  if (newLifecycle) {
    delete componentOptions.lifetimes.ready;
    componentOptions.methods.onReady = function () {
      if (this.$vm) {
        this.$vm._isMounted = true;
        this.$vm.__call_hook('mounted');
        this.$vm.__call_hook('onReady');
      }
    };
  }

  componentOptions.messages = {
    __l: componentOptions.methods.__l };

  delete componentOptions.methods.__l;

  return componentOptions;
}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function detached($vm) {
  $vm.$children.forEach(function (childVm) {
    childVm.$scope.detached();
  });
  $vm.$scope.detached();
}

function onPageUnload($vm) {
  $vm.$destroy();
  $vm.$children.forEach(function (childVm) {
    detached(childVm);
  });
}

function parsePage(vuePageOptions) {
  var pageOptions = parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  // 纠正百度小程序生命周期methods:onShow在methods:onLoad之前触发的问题
  pageOptions.methods.onShow = function onShow() {
    if (this.$vm && this.$vm.$mp.query) {
      this.$vm.__call_hook('onShow');
    }
  };

  pageOptions.methods.onLoad = function onLoad(args) {
    // 百度 onLoad 在 attached 之前触发，先存储 args, 在 attached 里边触发 onLoad
    if (this.$vm) {
      this.$vm.$mp.query = args;
      this.$vm.__call_hook('onLoad', args);
      this.$vm.__call_hook('onShow');
    } else {
      this.pageinstance._$args = args;
    }
  };

  pageOptions.methods.onUnload = function onUnload() {
    this.$vm.__call_hook('onUnload');
    onPageUnload(this.$vm);
  };

  return pageOptions;
}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!swan.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-baidu" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(swan, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, swan[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(swan).forEach(function (name) {
    if (hasOwn(swan, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, swan[name]));
    }
  });
}

swan.createApp = createApp;
swan.createPage = createPage;
swan.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 11:
/*!****************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/store/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    /**
            * 是否需要强制登录
            */
    forcedLogin: true,
    hasLogin: false,
    userName: "",
    phone: "" },

  mutations: {
    login: function login(state, phone) {
      state.phone = phone;
      state.hasLogin = true;
    },
    logout: function logout(state) {
      state.phone = "";
      state.hasLogin = false;
    } } });var _default =



store;exports.default = _default;

/***/ }),

/***/ 12:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 13:
/*!*******************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 14));



var _request = _interopRequireDefault(__webpack_require__(/*! ./libs/request */ 15));




















var _queryParams = _interopRequireDefault(__webpack_require__(/*! ./libs/function/queryParams.js */ 19));

var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/function/route.js */ 20));

var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFormat.js */ 21));

var _timeFrom = _interopRequireDefault(__webpack_require__(/*! ./libs/function/timeFrom.js */ 22));

var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 23));

var _guid = _interopRequireDefault(__webpack_require__(/*! ./libs/function/guid.js */ 24));

var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/function/color.js */ 25));

var _type2icon = _interopRequireDefault(__webpack_require__(/*! ./libs/function/type2icon.js */ 26));

var _randomArray = _interopRequireDefault(__webpack_require__(/*! ./libs/function/randomArray.js */ 27));

var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepClone.js */ 17));

var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ./libs/function/deepMerge.js */ 16));

var _addUnit = _interopRequireDefault(__webpack_require__(/*! ./libs/function/addUnit.js */ 28));


var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 18));

var _random = _interopRequireDefault(__webpack_require__(/*! ./libs/function/random.js */ 29));

var _trim = _interopRequireDefault(__webpack_require__(/*! ./libs/function/trim.js */ 30));

var _toast = _interopRequireDefault(__webpack_require__(/*! ./libs/function/toast.js */ 31));

var _getParent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/getParent.js */ 32));

var _$parent = _interopRequireDefault(__webpack_require__(/*! ./libs/function/$parent.js */ 33));



var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 34));

var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 35));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // 引入全局mixin
// 引入关于是否mixin集成小程序分享的配置
// import wxshare from './libs/mixin/mpShare.js'
// 全局挂载引入http相关请求拦截插件
function wranning(str) {// 开发环境进行信息输出,主要是一些报错信息
  // 这个环境的来由是在程序编写时候,点击hx编辑器运行调试代码的时候,详见:
  // 	https://uniapp.dcloud.io/frame?id=%e5%bc%80%e5%8f%91%e7%8e%af%e5%a2%83%e5%92%8c%e7%94%9f%e4%ba%a7%e7%8e%af%e5%a2%83
  if (true) {console.warn(str);}} // 尝试判断在根目录的/store中是否有$u.mixin.js，此文件uView默认为需要挂在到全局的vuex的state变量
// HX2.6.11版本,放到try中,控制台依然会警告,暂时不用此方式，
// let vuexStore = {};
// try {
// 	vuexStore = require("@/store/$u.mixin.js");
// } catch (e) {
// 	//TODO handle the exception
// }
// post类型对象参数转为get类型url参数
var $u = { queryParams: _queryParams.default, route: _route.default, timeFormat: _timeFormat.default, date: _timeFormat.default, // 另名date
  timeFrom: _timeFrom.default, colorGradient: _colorGradient.default.colorGradient, guid: _guid.default, color: _color.default, type2icon: _type2icon.default, randomArray: _randomArray.default, wranning: wranning, get: _request.default.get, post: _request.default.post, put: _request.default.put, 'delete': _request.default.delete,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  test: _test.default,
  random: _random.default,
  deepClone: _deepClone.default,
  deepMerge: _deepMerge.default,
  getParent: _getParent.default,
  $parent: _$parent.default,
  addUnit: _addUnit.default,
  trim: _trim.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: _request.default,
  toast: _toast.default,
  config: _config.default, // uView配置信息相关，比如版本号
  zIndex: _zIndex.default };


var install = function install(Vue) {
  Vue.mixin(_mixin.default);
  if (Vue.prototype.openShare) {
    Vue.mixin(mpShare);
  }
  // Vue.mixin(vuexStore);
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return (0, _timeFormat.default)(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return (0, _timeFrom.default)(timestamp, format);
  });
  Vue.prototype.$u = $u;
};var _default =

{
  install: install };exports.default = _default;

/***/ }),

/***/ 14:
/*!******************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/mixin/mixin.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  methods: {
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {var _this = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().
        in(_this)[all ? 'selectAll' : 'select'](selector).
        boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).
        exec();
      });
    } },

  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 149:
/*!*****************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/components/mescroll-uni/mescroll-uni.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = MeScroll; /* mescroll
                                                                                                        * version 1.2.5
                                                                                                        * 2020-03-15 wenju
                                                                                                        * http://www.mescroll.com
                                                                                                        */

function MeScroll(options, isScrollBody) {
  var me = this;
  me.version = '1.2.5'; // mescroll版本号
  me.options = options || {}; // 配置
  me.isScrollBody = isScrollBody || false; // 滚动区域是否为原生页面滚动; 默认为scroll-view

  me.isDownScrolling = false; // 是否在执行下拉刷新的回调
  me.isUpScrolling = false; // 是否在执行上拉加载的回调
  var hasDownCallback = me.options.down && me.options.down.callback; // 是否配置了down的callback

  // 初始化下拉刷新
  me.initDownScroll();
  // 初始化上拉加载,则初始化
  me.initUpScroll();

  // 自动加载
  setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
    // 自动触发下拉刷新 (只有配置了down的callback才自动触发下拉刷新)
    if (me.optDown.use && me.optDown.auto && hasDownCallback) {
      if (me.optDown.autoShowLoading) {
        me.triggerDownScroll(); // 显示下拉进度,执行下拉回调
      } else {
        me.optDown.callback && me.optDown.callback(me); // 不显示下拉进度,直接执行下拉回调
      }
    }
    // 自动触发上拉加载
    setTimeout(function () {// 延时确保先执行down的callback,再执行up的callback,因为部分小程序emit是异步,会导致isUpAutoLoad判断有误
      me.optUp.use && me.optUp.auto && !me.isUpAutoLoad && me.triggerUpScroll();
    }, 100);
  }, 30); // 需让me.optDown.inited和me.optUp.inited先执行
}

/* 配置参数:下拉刷新 */
MeScroll.prototype.extendDownScroll = function (optDown) {
  // 下拉刷新的配置
  MeScroll.extend(optDown, {
    use: true, // 是否启用下拉刷新; 默认true
    auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
    native: false, // 是否使用系统自带的下拉刷新; 默认false; 仅mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
    autoShowLoading: false, // 如果设置auto=true(在初始化完毕之后自动执行下拉刷新的回调),那么是否显示下拉刷新的进度; 默认false
    isLock: false, // 是否锁定下拉刷新,默认false;
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    startTop: 100, // scroll-view滚动到顶部时,此时的scroll-top不一定为0, 此值用于控制最大的误差
    fps: 80, // 下拉节流 (值越大每秒刷新频率越高)
    inOffsetRate: 1, // 在列表顶部,下拉的距离小于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    outOffsetRate: 0.2, // 在列表顶部,下拉的距离大于offset时,改变下拉区域高度比例;值小于1且越接近0,高度变化越小,表现为越往下越难拉
    bottomOffset: 20, // 当手指touchmove位置在距离body底部20px范围内的时候结束上拉刷新,避免Webview嵌套导致touchend事件不执行
    minAngle: 45, // 向下滑动最少偏移的角度,取值区间  [0,90];默认45度,即向下滑动的角度大于45度则触发下拉;而小于45度,将不触发下拉,避免与左右滑动的轮播等组件冲突;
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorTop)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 下拉刷新初始化完毕的回调
    inOffset: null, // 下拉的距离进入offset范围内那一刻的回调
    outOffset: null, // 下拉的距离大于offset那一刻的回调
    onMoving: null, // 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度
    beforeLoading: null, // 准备触发下拉刷新的回调: 如果return true,将不触发showLoading和callback回调; 常用来完全自定义下拉刷新, 参考案例【淘宝 v6.8.0】
    showLoading: null, // 显示下拉刷新进度的回调
    afterLoading: null, // 准备结束下拉的回调. 返回结束下拉的延时执行时间,默认0ms; 常用于结束下拉之前再显示另外一小段动画,才去隐藏下拉刷新的场景, 参考案例【dotJump】
    endDownScroll: null, // 结束下拉刷新的回调
    callback: function callback(mescroll) {
      // 下拉刷新的回调;默认重置上拉加载列表为第一页
      mescroll.resetUpScroll();
    } });

};

/* 配置参数:上拉加载 */
MeScroll.prototype.extendUpScroll = function (optUp) {
  // 上拉加载的配置
  MeScroll.extend(optUp, {
    use: true, // 是否启用上拉加载; 默认true
    auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
    isLock: false, // 是否锁定上拉加载,默认false;
    isBoth: true, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认true,两者可同时触发;
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    callback: null, // 上拉加载的回调;function(page,mescroll){ }
    page: {
      num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
      size: 10, // 每页数据的数量
      time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
    },
    noMoreSize: 5, // 如果列表已无数据,可设置列表的总数量要大于等于5条才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
    offset: 80, // 距底部多远时,触发upCallback
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '没有更多了', // 没有更多数据的提示文本
    bgColor: "transparent", // 背景颜色 (建议在pages.json中再设置一下backgroundColorBottom)
    textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
    inited: null, // 初始化完毕的回调
    showLoading: null, // 显示加载中的回调
    showNoMore: null, // 显示无更多数据的回调
    hideUpScroll: null, // 隐藏上拉加载的回调
    errDistance: 60, // endErr的时候需往上滑动一段距离,使其往下滑动时再次触发onReachBottom,仅mescroll-body生效
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: null, // 图片路径,默认null (绝对路径或网络图)
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000
      duration: 300, // 回到顶部的动画时长,默认300ms (当值为0或300则使用系统自带回到顶部,更流畅; 其他值则通过step模拟,部分机型可能不够流畅,所以非特殊情况不建议修改此项)
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      zIndex: 9990, // fixed定位z-index值
      left: null, // 到左边的距离, 默认null. 此项有值时,right不生效. (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      right: 20, // 到右边的距离, 默认20 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      safearea: false, // bottom的偏移量是否加上底部安全区的距离, 默认false, 需要适配iPhoneX时使用 (具体的界面如果不配置此项,则取本vue的safearea值)
      width: 72, // 回到顶部图标的宽度, 默认72 (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
      radius: "50%" // 圆角, 默认"50%" (支持20, "20rpx", "20px", "20%"格式的值, 其中纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: null, // 图标路径
      tip: '~ 暂无相关数据 ~', // 提示
      btnText: '', // 按钮
      btnClick: null, // 点击按钮的回调
      onShow: null, // 是否显示的回调
      fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
      top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
      zIndex: 99 // fixed定位z-index值
    },
    onScroll: false // 是否监听滚动事件
  });
};

/* 配置参数 */
MeScroll.extend = function (userOption, defaultOption) {
  if (!userOption) return defaultOption;
  for (var key in defaultOption) {
    if (userOption[key] == null) {
      var def = defaultOption[key];
      if (def != null && typeof def === 'object') {
        userOption[key] = MeScroll.extend({}, def); // 深度匹配
      } else {
        userOption[key] = def;
      }
    } else if (typeof userOption[key] === 'object') {
      MeScroll.extend(userOption[key], defaultOption[key]); // 深度匹配
    }
  }
  return userOption;
};

/* 简单判断是否配置了颜色 (非透明,非白色) */
MeScroll.prototype.hasColor = function (color) {
  if (!color) return false;
  var c = color.toLowerCase();
  return c != "#fff" && c != "#ffffff" && c != "transparent" && c != "white";
};

/* -------初始化下拉刷新------- */
MeScroll.prototype.initDownScroll = function () {
  var me = this;
  // 配置参数
  me.optDown = me.options.down || {};
  if (!me.optDown.textColor && me.hasColor(me.optDown.bgColor)) me.optDown.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendDownScroll(me.optDown);

  // 如果是mescroll-body且配置了native,则禁止自定义的下拉刷新
  if (me.isScrollBody && me.optDown.native) {
    me.optDown.use = false;
  } else {
    me.optDown.native = false; // 仅mescroll-body支持,mescroll-uni不支持
  }

  me.downHight = 0; // 下拉区域的高度

  // 在页面中加入下拉布局
  if (me.optDown.use && me.optDown.inited) {
    // 初始化完毕的回调
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optDown.inited(me);
    }, 0);
  }
};

/* 列表touchstart事件 */
MeScroll.prototype.touchstartEvent = function (e) {
  if (!this.optDown.use) return;

  this.startPoint = this.getPoint(e); // 记录起点
  this.startTop = this.getScrollTop(); // 记录此时的滚动条位置
  this.lastPoint = this.startPoint; // 重置上次move的点
  this.maxTouchmoveY = this.getBodyHeight() - this.optDown.bottomOffset; // 手指触摸的最大范围(写在touchstart避免body获取高度为0的情况)
  this.inTouchend = false; // 标记不是touchend
};

/* 列表touchmove事件 */
MeScroll.prototype.touchmoveEvent = function (e) {




  if (!this.optDown.use) return;
  if (!this.startPoint) return;
  var me = this;

  // 节流
  var t = new Date().getTime();
  if (me.moveTime && t - me.moveTime < me.moveTimeDiff) {// 小于节流时间,则不处理
    return;
  } else {
    me.moveTime = t;
    if (!me.moveTimeDiff) me.moveTimeDiff = 1000 / me.optDown.fps;
  }

  var scrollTop = me.getScrollTop(); // 当前滚动条的距离
  var curPoint = me.getPoint(e); // 当前点

  var moveY = curPoint.y - me.startPoint.y; // 和起点比,移动的距离,大于0向下拉,小于0向上拉

  // 向下拉 && 在顶部
  // mescroll-body,直接判定在顶部即可
  // scroll-view在滚动时不会触发touchmove,当触顶/底/左/右时,才会触发touchmove
  // scroll-view滚动到顶部时,scrollTop不一定为0; 在iOS的APP中scrollTop可能为负数,不一定和startTop相等
  if (moveY > 0 && (
  me.isScrollBody && scrollTop <= 0 ||
  !me.isScrollBody && (scrollTop <= 0 || scrollTop <= me.optDown.startTop && scrollTop === me.startTop)))
  {
    // 可下拉的条件
    if (!me.inTouchend && !me.isDownScrolling && !me.optDown.isLock && (!me.isUpScrolling || me.isUpScrolling &&
    me.optUp.isBoth)) {

      // 下拉的角度是否在配置的范围内
      var angle = me.getAngle(me.lastPoint, curPoint); // 两点之间的角度,区间 [0,90]
      if (angle < me.optDown.minAngle) return; // 如果小于配置的角度,则不往下执行下拉刷新

      // 如果手指的位置超过配置的距离,则提前结束下拉,避免Webview嵌套导致touchend无法触发
      if (me.maxTouchmoveY > 0 && curPoint.y >= me.maxTouchmoveY) {
        me.inTouchend = true; // 标记执行touchend
        me.touchendEvent(); // 提前触发touchend
        return;
      }




      me.preventDefault(e); // 阻止默认事件

      var diff = curPoint.y - me.lastPoint.y; // 和上次比,移动的距离 (大于0向下,小于0向上)

      // 下拉距离  < 指定距离
      if (me.downHight < me.optDown.offset) {
        if (me.movetype !== 1) {
          me.movetype = 1; // 加入标记,保证只执行一次
          me.optDown.inOffset && me.optDown.inOffset(me); // 进入指定距离范围内那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        me.downHight += diff * me.optDown.inOffsetRate; // 越往下,高度变化越小

        // 指定距离  <= 下拉距离
      } else {
        if (me.movetype !== 2) {
          me.movetype = 2; // 加入标记,保证只执行一次
          me.optDown.outOffset && me.optDown.outOffset(me); // 下拉超过指定距离那一刻的回调,只执行一次
          me.isMoveDown = true; // 标记下拉区域高度改变,在touchend重置回来
        }
        if (diff > 0) {// 向下拉
          me.downHight += Math.round(diff * me.optDown.outOffsetRate); // 越往下,高度变化越小
        } else {// 向上收
          me.downHight += diff; // 向上收回高度,则向上滑多少收多少高度
        }
      }

      var rate = me.downHight / me.optDown.offset; // 下拉区域当前高度与指定距离的比值
      me.optDown.onMoving && me.optDown.onMoving(me, rate, me.downHight); // 下拉过程中的回调,一直在执行
    }
  }

  me.lastPoint = curPoint; // 记录本次移动的点
};

/* 列表touchend事件 */
MeScroll.prototype.touchendEvent = function (e) {
  if (!this.optDown.use) return;
  // 如果下拉区域高度已改变,则需重置回来
  if (this.isMoveDown) {
    if (this.downHight >= this.optDown.offset) {
      // 符合触发刷新的条件
      this.triggerDownScroll();
    } else {
      // 不符合的话 则重置
      this.downHight = 0;
      this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    }
    this.movetype = 0;
    this.isMoveDown = false;
  } else if (!this.isScrollBody && this.getScrollTop() === this.startTop) {// scroll-view到顶/左/右/底的滑动事件
    var isScrollUp = this.getPoint(e).y - this.startPoint.y < 0; // 和起点比,移动的距离,大于0向下拉,小于0向上拉
    // 上滑
    if (isScrollUp) {
      // 需检查滑动的角度
      var angle = this.getAngle(this.getPoint(e), this.startPoint); // 两点之间的角度,区间 [0,90]
      if (angle > 80) {
        // 检查并触发上拉
        this.triggerUpScroll(true);
      }
    }
  }
};

/* 根据点击滑动事件获取第一个手指的坐标 */
MeScroll.prototype.getPoint = function (e) {
  if (!e) {
    return {
      x: 0,
      y: 0 };

  }
  if (e.touches && e.touches[0]) {
    return {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY };

  } else if (e.changedTouches && e.changedTouches[0]) {
    return {
      x: e.changedTouches[0].pageX,
      y: e.changedTouches[0].pageY };

  } else {
    return {
      x: e.clientX,
      y: e.clientY };

  }
};

/* 计算两点之间的角度: 区间 [0,90]*/
MeScroll.prototype.getAngle = function (p1, p2) {
  var x = Math.abs(p1.x - p2.x);
  var y = Math.abs(p1.y - p2.y);
  var z = Math.sqrt(x * x + y * y);
  var angle = 0;
  if (z !== 0) {
    angle = Math.asin(y / z) / Math.PI * 180;
  }
  return angle;
};

/* 触发下拉刷新 */
MeScroll.prototype.triggerDownScroll = function () {
  if (this.optDown.beforeLoading && this.optDown.beforeLoading(this)) {
    //return true则处于完全自定义状态
  } else {
    this.showDownScroll(); // 下拉刷新中...
    this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示下拉进度布局 */
MeScroll.prototype.showDownScroll = function () {
  this.isDownScrolling = true; // 标记下拉中
  if (this.optDown.native) {
    uni.startPullDownRefresh(); // 系统自带的下拉刷新
    this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  } else {
    this.downHight = this.optDown.offset; // 更新下拉区域高度
    this.optDown.showLoading && this.optDown.showLoading(this, this.downHight); // 下拉刷新中...
  }
};

/* 显示系统自带的下拉刷新时需要处理的业务 */
MeScroll.prototype.onPullDownRefresh = function () {
  this.isDownScrolling = true; // 标记下拉中
  this.optDown.showLoading && this.optDown.showLoading(this, 0); // 仍触发showLoading,因为上拉加载用到
  this.optDown.callback && this.optDown.callback(this); // 执行回调,联网加载数据
};

/* 结束下拉刷新 */
MeScroll.prototype.endDownScroll = function () {
  if (this.optDown.native) {// 结束原生下拉刷新
    this.isDownScrolling = false;
    this.optDown.endDownScroll && this.optDown.endDownScroll(this);
    uni.stopPullDownRefresh();
    return;
  }
  var me = this;
  // 结束下拉刷新的方法
  var endScroll = function endScroll() {
    me.downHight = 0;
    me.isDownScrolling = false;
    me.optDown.endDownScroll && me.optDown.endDownScroll(me);
    !me.isScrollBody && me.setScrollHeight(0); // scroll-view重置滚动区域,使数据不满屏时仍可检查触发翻页
  };
  // 结束下拉刷新时的回调
  var delay = 0;
  if (me.optDown.afterLoading) delay = me.optDown.afterLoading(me); // 结束下拉刷新的延时,单位ms
  if (typeof delay === 'number' && delay > 0) {
    setTimeout(endScroll, delay);
  } else {
    endScroll();
  }
};

/* 锁定下拉刷新:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockDownScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optDown.isLock = isLock;
};

/* 锁定上拉加载:isLock=ture,null锁定;isLock=false解锁 */
MeScroll.prototype.lockUpScroll = function (isLock) {
  if (isLock == null) isLock = true;
  this.optUp.isLock = isLock;
};

/* -------初始化上拉加载------- */
MeScroll.prototype.initUpScroll = function () {
  var me = this;
  // 配置参数
  me.optUp = me.options.up || {
    use: false };

  if (!me.optUp.textColor && me.hasColor(me.optUp.bgColor)) me.optUp.textColor = "#fff"; // 当bgColor有值且textColor未设置,则textColor默认白色
  me.extendUpScroll(me.optUp);

  if (!me.optUp.isBounce) me.setBounce(false); // 不允许bounce时,需禁止window的touchmove事件

  if (me.optUp.use === false) return; // 配置不使用上拉加载时,则不初始化上拉布局
  me.optUp.hasNext = true; // 如果使用上拉,则默认有下一页
  me.startNum = me.optUp.page.num + 1; // 记录page开始的页码

  // 初始化完毕的回调
  if (me.optUp.inited) {
    setTimeout(function () {// 待主线程执行完毕再执行,避免new MeScroll未初始化,在回调获取不到mescroll的实例
      me.optUp.inited(me);
    }, 0);
  }
};

/*滚动到底部的事件 (仅mescroll-body生效)*/
MeScroll.prototype.onReachBottom = function () {
  if (this.isScrollBody && !this.isUpScrolling) {// 只能支持下拉刷新的时候同时可以触发上拉加载,否则滚动到底部就需要上滑一点才能触发onReachBottom
    if (!this.optUp.isLock && this.optUp.hasNext) {
      this.triggerUpScroll();
    }
  }
};

/*列表滚动事件 (仅mescroll-body生效)*/
MeScroll.prototype.onPageScroll = function (e) {
  if (!this.isScrollBody) return;

  // 更新滚动条的位置 (主要用于判断下拉刷新时,滚动条是否在顶部)
  this.setScrollTop(e.scrollTop);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }
};

/*列表滚动事件*/
MeScroll.prototype.scroll = function (e, onScroll) {
  // 更新滚动条的位置
  this.setScrollTop(e.scrollTop);
  // 更新滚动内容高度
  this.setScrollHeight(e.scrollHeight);

  // 向上滑还是向下滑动
  if (this.preScrollY == null) this.preScrollY = 0;
  this.isScrollUp = e.scrollTop - this.preScrollY > 0;
  this.preScrollY = e.scrollTop;

  // 上滑 && 检查并触发上拉
  this.isScrollUp && this.triggerUpScroll(true);

  // 顶部按钮的显示隐藏
  if (e.scrollTop >= this.optUp.toTop.offset) {
    this.showTopBtn();
  } else {
    this.hideTopBtn();
  }

  // 滑动监听
  this.optUp.onScroll && onScroll && onScroll();
};

/* 触发上拉加载 */
MeScroll.prototype.triggerUpScroll = function (isCheck) {
  if (!this.isUpScrolling && this.optUp.use && this.optUp.callback) {
    // 是否校验在底部; 默认不校验
    if (isCheck === true) {
      var canUp = false;
      // 还有下一页 && 没有锁定 && 不在下拉中
      if (this.optUp.hasNext && !this.optUp.isLock && !this.isDownScrolling) {
        if (this.getScrollBottom() <= this.optUp.offset) {// 到底部
          canUp = true; // 标记可上拉
        }
      }
      if (canUp === false) return;
    }
    this.showUpScroll(); // 上拉加载中...
    this.optUp.page.num++; // 预先加一页,如果失败则减回
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = this.optUp.page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = this.optUp.page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = this.optUp.page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback(this); // 执行回调,联网加载数据
  }
};

/* 显示上拉加载中 */
MeScroll.prototype.showUpScroll = function () {
  this.isUpScrolling = true; // 标记上拉加载中
  this.optUp.showLoading && this.optUp.showLoading(this); // 回调
};

/* 显示上拉无更多数据 */
MeScroll.prototype.showNoMore = function () {

  this.optUp.hasNext = false; // 标记无更多数据
  this.optUp.showNoMore && this.optUp.showNoMore(this); // 回调
};
/* 显示加载失败 */
MeScroll.prototype.showErr = function () {
  this.options.showErr && this.options.showErr(this); // 回调
};
/* 隐藏上拉区域**/
MeScroll.prototype.hideUpScroll = function () {
  this.optUp.hideUpScroll && this.optUp.hideUpScroll(this); // 回调
};

/* 结束上拉加载 */
MeScroll.prototype.endUpScroll = function (isShowNoMore) {
  if (isShowNoMore != null) {// isShowNoMore=null,不处理下拉状态,下拉刷新的时候调用
    if (isShowNoMore) {
      this.showNoMore(); // isShowNoMore=true,显示无更多数据
    } else {
      this.hideUpScroll(); // isShowNoMore=false,隐藏上拉加载
    }
  }
  this.isUpScrolling = false; // 标记结束上拉加载
};

/* 重置上拉加载列表为第一页
    *isShowLoading 是否显示进度布局;
    * 1.默认null,不传参,则显示上拉加载的进度布局
    * 2.传参true, 则显示下拉刷新的进度布局
    * 3.传参false,则不显示上拉和下拉的进度 (常用于静默更新列表数据)
    */
MeScroll.prototype.resetUpScroll = function (isShowLoading) {
  if (this.optUp && this.optUp.use) {
    var page = this.optUp.page;
    this.prePageNum = page.num; // 缓存重置前的页码,加载失败可退回
    this.prePageTime = page.time; // 缓存重置前的时间,加载失败可退回
    page.num = this.startNum; // 重置为第一页
    page.time = null; // 重置时间为空
    if (!this.isDownScrolling && isShowLoading !== false) {// 如果不是下拉刷新触发的resetUpScroll并且不配置列表静默更新,则显示进度;
      if (isShowLoading == null) {
        this.removeEmpty(); // 移除空布局
        this.showUpScroll(); // 不传参,默认显示上拉加载的进度布局
      } else {
        this.showDownScroll(); // 传true,显示下拉刷新的进度布局,不清空列表
      }
    }
    this.isUpAutoLoad = true; // 标记上拉已经自动执行过,避免初始化时多次触发上拉回调
    this.num = page.num; // 把最新的页数赋值在mescroll上,避免对page的影响
    this.size = page.size; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.time = page.time; // 把最新的页码赋值在mescroll上,避免对page的影响
    this.optUp.callback && this.optUp.callback(this); // 执行上拉回调
  }
};

/* 设置page.num的值 */
MeScroll.prototype.setPageNum = function (num) {
  this.optUp.page.num = num - 1;
};

/* 设置page.size的值 */
MeScroll.prototype.setPageSize = function (size) {
  this.optUp.page.size = size;
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalPage: 总页数(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endByPage = function (dataSize, totalPage, systime) {
  var hasNext;
  if (this.optUp.use && totalPage != null) hasNext = this.optUp.page.num < totalPage; // 是否还有下一页
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据量(必传)
    * totalSize: 列表所有数据总数量(必传)
    * systime: 服务器时间 (可空)
    */
MeScroll.prototype.endBySize = function (dataSize, totalSize, systime) {
  var hasNext;
  if (this.optUp.use && totalSize != null) {
    var loadSize = (this.optUp.page.num - 1) * this.optUp.page.size + dataSize; // 已加载的数据总数
    hasNext = loadSize < totalSize; // 是否还有下一页
  }
  this.endSuccess(dataSize, hasNext, systime);
};

/* 联网回调成功,结束下拉刷新和上拉加载
    * dataSize: 当前页的数据个数(不是所有页的数据总和),用于上拉加载判断是否还有下一页.如果不传,则会判断还有下一页
    * hasNext: 是否还有下一页,布尔类型;用来解决这个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据dataSize判断,则需翻到第三页才会知道无更多数据,如果传了hasNext,则翻到第二页即可显示无更多数据.
    * systime: 服务器时间(可空);用来解决这个小问题:当准备翻下一页时,数据库新增了几条记录,此时翻下一页,前面的几条数据会和上一页的重复;这里传入了systime,那么upCallback的page.time就会有值,把page.time传给服务器,让后台过滤新加入的那几条记录
    */
MeScroll.prototype.endSuccess = function (dataSize, hasNext, systime) {
  var me = this;
  // 结束上拉加载
  if (me.optUp.use) {
    var isShowNoMore; // 是否已无更多数据
    if (dataSize != null) {
      var pageNum = me.optUp.page.num; // 当前页码
      var pageSize = me.optUp.page.size; // 每页长度
      // 如果是第一页
      if (pageNum === 1) {
        if (systime) me.optUp.page.time = systime; // 设置加载列表数据第一页的时间
      }
      if (dataSize < pageSize || hasNext === false) {
        // 返回的数据不满一页时,则说明已无更多数据
        me.optUp.hasNext = false;
        if (dataSize === 0 && pageNum === 1) {
          // 如果第一页无任何数据且配置了空布局
          isShowNoMore = false;
          me.showEmpty();
        } else {
          // 总列表数少于配置的数量,则不显示无更多数据
          var allDataSize = (pageNum - 1) * pageSize + dataSize;
          if (allDataSize < me.optUp.noMoreSize) {
            isShowNoMore = false;
          } else {
            isShowNoMore = true;
          }
          me.removeEmpty(); // 移除空布局
        }
      } else {
        // 还有下一页
        isShowNoMore = false;
        me.optUp.hasNext = true;
        me.removeEmpty(); // 移除空布局
      }
    }

    // 隐藏上拉
    me.endUpScroll(isShowNoMore);
  }
  // 结束下拉刷新
  if (me.isDownScrolling) {
    this.optUp.page.num = 1;
    me.endDownScroll();
  };
};

/* 回调失败,结束下拉刷新和上拉加载 */
MeScroll.prototype.endErr = function (errDistance) {
  // 结束下拉,回调失败重置回原来的页码和时间
  if (this.isDownScrolling) {
    var page = this.optUp.page;
    if (page && this.prePageNum) {
      page.num = this.prePageNum;
      page.time = this.prePageTime;
    }
    this.endDownScroll();
    this.showErr();
  }
  // 结束上拉,回调失败重置回原来的页码
  if (this.isUpScrolling) {
    this.optUp.page.num--;
    this.endUpScroll(false);
    this.showErr();
    // 如果是mescroll-body,则需往回滚一定距离
    if (this.isScrollBody && errDistance !== 0) {// 不处理0
      if (!errDistance) errDistance = this.optUp.errDistance; // 不传,则取默认
      this.scrollTo(this.getScrollTop() - errDistance, 0); // 往上回滚的距离
    }
  }
};

/* 显示空布局 */
MeScroll.prototype.showEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(true);
};

/* 移除空布局 */
MeScroll.prototype.removeEmpty = function () {
  this.optUp.empty.use && this.optUp.empty.onShow && this.optUp.empty.onShow(false);
};

/* 显示回到顶部的按钮 */
MeScroll.prototype.showTopBtn = function () {
  if (!this.topBtnShow) {
    this.topBtnShow = true;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(true);
  }
};

/* 隐藏回到顶部的按钮 */
MeScroll.prototype.hideTopBtn = function () {
  if (this.topBtnShow) {
    this.topBtnShow = false;
    this.optUp.toTop.onShow && this.optUp.toTop.onShow(false);
  }
};

/* 获取滚动条的位置 */
MeScroll.prototype.getScrollTop = function () {
  return this.scrollTop || 0;
};

/* 记录滚动条的位置 */
MeScroll.prototype.setScrollTop = function (y) {
  this.scrollTop = y;
};

/* 滚动到指定位置 */
MeScroll.prototype.scrollTo = function (y, t) {
  this.myScrollTo && this.myScrollTo(y, t); // scrollview需自定义回到顶部方法
};

/* 自定义scrollTo */
MeScroll.prototype.resetScrollTo = function (myScrollTo) {
  this.myScrollTo = myScrollTo;
};

/* 滚动条到底部的距离 */
MeScroll.prototype.getScrollBottom = function () {
  return this.getScrollHeight() - this.getClientHeight() - this.getScrollTop();
};

/* 计步器
    star: 开始值
    end: 结束值
    callback(step,timer): 回调step值,计步器timer,可自行通过window.clearInterval(timer)结束计步器;
    t: 计步时长,传0则直接回调end值;不传则默认300ms
    rate: 周期;不传则默认30ms计步一次
    * */
MeScroll.prototype.getStep = function (star, end, callback, t, rate) {
  var diff = end - star; // 差值
  if (t === 0 || diff === 0) {
    callback && callback(end);
    return;
  }
  t = t || 300; // 时长 300ms
  rate = rate || 30; // 周期 30ms
  var count = t / rate; // 次数
  var step = diff / count; // 步长
  var i = 0; // 计数
  var timer = setInterval(function () {
    if (i < count - 1) {
      star += step;
      callback && callback(star, timer);
      i++;
    } else {
      callback && callback(end, timer); // 最后一次直接设置end,避免计算误差
      clearInterval(timer);
    }
  }, rate);
};

/* 滚动容器的高度 */
MeScroll.prototype.getClientHeight = function (isReal) {
  var h = this.clientHeight || 0;
  if (h === 0 && isReal !== true) {// 未获取到容器的高度,可临时取body的高度 (可能会有误差)
    h = this.getBodyHeight();
  }
  return h;
};
MeScroll.prototype.setClientHeight = function (h) {
  this.clientHeight = h;
};

/* 滚动内容的高度 */
MeScroll.prototype.getScrollHeight = function () {
  return this.scrollHeight || 0;
};
MeScroll.prototype.setScrollHeight = function (h) {
  this.scrollHeight = h;
};

/* body的高度 */
MeScroll.prototype.getBodyHeight = function () {
  return this.bodyHeight || 0;
};
MeScroll.prototype.setBodyHeight = function (h) {
  this.bodyHeight = h;
};

/* 阻止浏览器默认滚动事件 */
MeScroll.prototype.preventDefault = function (e) {
  // 小程序不支持e.preventDefault
  // app的bounce只能通过配置pages.json的style.app-plus.bounce为"none"来禁止
  // cancelable:是否可以被禁用; defaultPrevented:是否已经被禁用
  if (e && e.cancelable && !e.defaultPrevented) e.preventDefault();
};

/* 是否允许下拉回弹(橡皮筋效果); true或null为允许; false禁止bounce */
MeScroll.prototype.setBounce = function (isBounce) {




































































};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 15:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/request/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepMerge = _interopRequireDefault(__webpack_require__(/*! ../function/deepMerge */ 16));
var _test = _interopRequireDefault(__webpack_require__(/*! ../function/test */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var
Request = /*#__PURE__*/function () {_createClass(Request, [{ key: "setConfig",
    // 设置全局默认配置
    value: function setConfig(customConfig) {
      // 深度合并对象，否则会造成对象深层属性丢失
      this.config = (0, _deepMerge.default)(this.config, customConfig);
    }

    // 主要请求部分
  }, { key: "request", value: function request() {var _this = this;var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // 检查请求拦截
      if (this.interceptor.request && typeof this.interceptor.request === 'function') {
        var tmpConfig = {};
        var interceptorReuest = this.interceptor.request(options);
        if (interceptorReuest === false) {
          return false;
        }
        this.options = interceptorReuest;
      }

      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || '';
      options.params = options.params || {};
      options.header = Object.assign(this.config.header, options.header);
      options.method = options.method || this.config.method;

      return new Promise(function (resolve, reject) {
        options.complete = function (response) {
          // 请求返回后，隐藏loading(如果请求返回快的话，可能会没有loading)
          uni.hideLoading();
          // 清除定时器，如果请求回来了，就无需loading
          clearTimeout(_this.config.timer);
          _this.timer = null;
          // 判断用户对拦截返回数据的要求，如果originalData为true，返回所有的数据(response)到拦截器，否则只返回response.data
          if (_this.config.originalData) {
            // 判断是否存在拦截器
            if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
              var resInterceptors = _this.interceptor.response(response);
              // 如果拦截器不返回false，就将拦截器返回的内容给this.$u.post的then回调
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                // 如果拦截器返回false，意味着拦截器定义者认为返回有问题，直接接入catch回调
                reject(response);
              }
            } else {
              // 如果要求返回原始数据，就算没有拦截器，也返回最原始的数据
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (_this.interceptor.response && typeof _this.interceptor.response === 'function') {
                var _resInterceptors = _this.interceptor.response(response.data);
                if (_resInterceptors !== false) {
                  resolve(_resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                // 如果不是返回原始数据(originalData=false)，且没有拦截器的情况下，返回纯数据给then回调
                resolve(response.data);
              }
            } else {
              // 不返回原始数据的情况下，服务器状态码不为200，modal弹框提示
              if (response.errMsg) {
                uni.showModal({
                  title: response.errMsg });

              }
              reject(response);
            }
          }
        };

        // 判断用户传递的URL是否/开头,如果不是,加上/，这里使用了uView的test.js验证库的url()方法
        options.url = _test.default.url(options.url) ? options.url : _this.config.baseUrl + (options.url.indexOf('/') == 0 ?
        options.url : '/' + options.url);

        // 是否显示loading
        // 加一个是否已有timer定时器的判断，否则有两个同时请求的时候，后者会清除前者的定时器id
        // 而没有清除前者的定时器，导致前者超时，一直显示loading
        if (_this.config.showLoading && !_this.config.timer) {
          _this.config.timer = setTimeout(function () {
            uni.showLoading({
              title: _this.config.loadingText,
              mask: _this.config.loadingMask });

            _this.config.timer = null;
          }, _this.config.loadingTime);
        }
        uni.request(options);
      });
    } }]);

  function Request() {var _this2 = this;_classCallCheck(this, Request);
    this.config = {
      baseUrl: '', // 请求的根域名
      // 默认的请求头
      header: {},
      method: 'POST',
      // 设置为json，返回后uni.request会对数据进行一次JSON.parse
      dataType: 'json',
      // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
      responseType: 'text',
      showLoading: true, // 是否显示请求中的loading
      loadingText: '请求中...',
      loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
      timer: null, // 定时器
      originalData: false, // 是否在拦截器中返回服务端的原始数据，见文档说明
      loadingMask: true // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
    };

    // 拦截器
    this.interceptor = {
      // 请求前的拦截
      request: null,
      // 请求后的拦截
      response: null };


    // get请求
    this.get = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        method: 'GET',
        url: url,
        header: header,
        data: data });

    };

    // post请求
    this.post = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'POST',
        header: header,
        data: data });

    };

    // put请求，不支持支付宝小程序(HX2.6.15)
    this.put = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'PUT',
        header: header,
        data: data });

    };

    // delete请求，不支持支付宝和头条小程序(HX2.6.15)
    this.delete = function (url) {var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var header = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _this2.request({
        url: url,
        method: 'DELETE',
        header: header,
        data: data });

    };
  }return Request;}();var _default =

new Request();exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 150:
/*!************************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/components/mescroll-uni/mescroll-uni-option.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 全局配置
// mescroll-body 和 mescroll-uni 通用
var GlobalOption = {
  down: {
    // 其他down的配置参数也可以写,这里只展示了常用的配置:
    textInOffset: '下拉刷新', // 下拉的距离在offset范围内的提示文本
    textOutOffset: '释放更新', // 下拉的距离大于offset范围的提示文本
    textLoading: '加载中 ...', // 加载中的提示文本
    offset: 80, // 在列表顶部,下拉大于80px,松手即可触发下拉刷新的回调
    native: false // 是否使用系统自带的下拉刷新; 默认false; 仅在mescroll-body生效 (值为true时,还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  },
  up: {
    // 其他up的配置参数也可以写,这里只展示了常用的配置:
    textLoading: '加载中 ...', // 加载中的提示文本
    textNoMore: '没有更多了', // 没有更多数据的提示文本
    textErr: "加载失败",
    offset: 80, // 距底部多远时,触发upCallback
    isBounce: false, // 默认禁止橡皮筋的回弹效果, 必读事项: http://www.mescroll.com/qa.html?v=190725#q25
    toTop: {
      // 回到顶部按钮,需配置src才显示
      src: "http://www.mescroll.com/img/mescroll-totop.png?v=1", // 图片路径 (建议放入static目录, 如 /static/img/mescroll-totop.png )
      offset: 1000, // 列表滚动多少距离才显示回到顶部按钮,默认1000px
      right: 20, // 到右边的距离, 默认20 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      bottom: 120, // 到底部的距离, 默认120 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
      width: 72 // 回到顶部图标的宽度, 默认72 (支持"20rpx", "20px", "20%"格式的值, 纯数字则默认单位rpx)
    },
    empty: {
      use: true, // 是否显示空布局
      icon: "http://www.mescroll.com/img/mescroll-empty.png?v=1", // 图标路径 (建议放入static目录, 如 /static/img/mescroll-empty.png )
      tip: '~ 暂无相关数据 ~' // 提示
    } } };var _default =



GlobalOption;exports.default = _default;

/***/ }),

/***/ 16:
/*!*************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/deepMerge.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _deepClone = _interopRequireDefault(__webpack_require__(/*! ./deepClone */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// JS对象深度合并
function deepMerge() {var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = (0, _deepClone.default)(target);
  if (typeof target !== 'object' || typeof source !== 'object') return false;
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    if (prop in target) {
      if (typeof target[prop] !== 'object') {
        target[prop] = source[prop];
      } else {
        if (typeof source[prop] !== 'object') {
          target[prop] = source[prop];
        } else {
          if (target[prop].concat && source[prop].concat) {
            target[prop] = target[prop].concat(source[prop]);
          } else {
            target[prop] = deepMerge(target[prop], source[prop]);
          }
        }
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}var _default =

deepMerge;exports.default = _default;

/***/ }),

/***/ 17:
/*!*************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/deepClone.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

// 深度克隆
function deepClone(obj) {
  // 对常见的“非”值，直接返回原来值
  if ([null, undefined, NaN, false].includes(obj)) return obj;
  if (typeof obj !== "object" && typeof obj !== 'function') {
    //原始类型直接返回
    return obj;
  }
  var o = isArray(obj) ? [] : {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
    }
  }
  return o;
}var _default =

deepClone;exports.default = _default;

/***/ }),

/***/ 179:
/*!****************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/components/content/data.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = [{
  "name": "冰希黎一日情人金字塔香水3件套女士持久淡香大牌正品",
  "img": "http://qn.kemean.cn/upload/202004/15/5c9a58ea389148f782f684c0d93134e1?imageView2/0/w/800",
  "priceShop": "¥1.0",
  "priceDiscount": "¥0.1",
  "numSales": 4,
  "ptPrice": null,
  "shopName": "AD品牌旗舰店",
  "objId": 1509 },
{
  "name": "秭归九月红早红橙5斤/10斤中果装橙子",
  "img": "http://qn.kemean.cn/upload/201912/27/7e8dfcfdc8bd45b484502f9c6ed25220?imageView2/0/w/800",
  "priceShop": "¥69.0",
  "priceDiscount": "¥23.0",
  "numSales": 273,
  "ptPrice": null,
  "shopName": "商家云旗舰店",
  "objId": 748 },
{
  "name": "三只松鼠坚果大礼包礼盒大吉大利套餐1266g",
  "img": "http://qn.kemean.cn/upload/201912/06/48c3c8b3b6924b8bbb112888edd4747a?imageView2/0/w/800",
  "priceShop": "¥158.0",
  "priceDiscount": "¥82.0",
  "numSales": 419,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1102 },
{
  "name": "康怡乐（koyle） 涮烤一体锅麦饭石电烧烤炉家用无烟电烤盘不粘烤肉涮烤火锅鸳鸯火锅YH-KY15 涮烤一体锅（大号圆款）",
  "img": "http://qn.kemean.cn/upload/201912/10/dca8997195ba49d3b79cbfeb627d0bec?imageView2/0/w/800",
  "priceShop": "¥998.0",
  "priceDiscount": "¥499.0",
  "numSales": 326,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1170 },
{
  "name": "西域美农古澈玉葡萄干500g 新疆吐鲁番提子",
  "img": "http://qn.kemean.cn/upload/201911/09/56a1740ddcbd4c3a9b94f9c04d48b353?imageView2/0/w/800",
  "priceShop": "¥30.9",
  "priceDiscount": "¥18.9",
  "numSales": 312,
  "ptPrice": null,
  "shopName": "西域美农旗舰店",
  "objId": 646 },
{
  "name": "三只松鼠坚果大礼包礼盒万事亨通套餐1588g",
  "img": "http://qn.kemean.cn/upload/201912/06/5cf59abc872643a4bb2a26a062a83bf6?imageView2/0/w/800",
  "priceShop": "¥268.0",
  "priceDiscount": "¥162.0",
  "numSales": 309,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1104 },
{
  "name": "费列罗榛果威化巧克力钻石装16粒",
  "img": "http://qn.kemean.cn/upload/201912/18/646638e423d34144b74a0d333832fed6?imageView2/0/w/800",
  "priceShop": "¥68.0",
  "priceDiscount": "¥58.8",
  "numSales": 308,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1363 },
{
  "name": "泉氏净水器家用厨房卫生间水龙头过滤器自来水滤水器前置净化水机",
  "img": "http://qn.kemean.cn/upload/201911/06/8ca473e5fc6645a0b88987a6a1015bfb?imageView2/0/w/800",
  "priceShop": "¥220.0",
  "priceDiscount": "¥55.0",
  "numSales": 308,
  "ptPrice": "¥44.0",
  "shopName": "深圳市泉氏清科技有限公司",
  "objId": 180 },
{
  "name": "欧锐铂（ORVIBO） 和美e家涮烤一体电火锅",
  "img": "http://qn.kemean.cn/upload/201912/10/2e2eb512e5914b38a5433946f1a2c935?imageView2/0/w/800",
  "priceShop": "¥1219.0",
  "priceDiscount": "¥608.0",
  "numSales": 275,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1166 },
{
  "name": "苏泊尔 （SUPOR）温馨之家 三件套T1360T",
  "img": "http://qn.kemean.cn/upload/201911/12/2675d3619e944830ba88f65f71f1d621?imageView2/0/w/800",
  "priceShop": "¥399.0",
  "priceDiscount": "¥169.0",
  "numSales": 213,
  "ptPrice": null,
  "shopName": "苏泊尔专卖店",
  "objId": 732 },
{
  "name": "西域美农山药脆片50g*3袋薄片脆薯片好吃的吃货休闲零食小吃",
  "img": "http://qn.kemean.cn/upload/201911/09/ce79652bc5f740398ff2ab4698c47683?imageView2/0/w/800",
  "priceShop": "¥46.9",
  "priceDiscount": "¥20.9",
  "numSales": 208,
  "ptPrice": null,
  "shopName": "西域美农旗舰店",
  "objId": 647 },
{
  "name": "【香港直邮】格丽松Guerisson奇迹马油面霜70g",
  "img": "http://qn.kemean.cn/upload/201911/07/b1d49ff7502c40b8b25423983657601f?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥79.0",
  "numSales": 207,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 284 },
{
  "name": "蕉下小黑伞250线系列 折叠晴雨伞女防紫外线太阳遮阳伞",
  "img": "http://qn.kemean.cn/upload/201911/28/1d8dc888d9274382a5b83c50ce4718d1?imageView2/0/w/800",
  "priceShop": "¥299.0",
  "priceDiscount": "¥169.0",
  "numSales": 207,
  "ptPrice": null,
  "shopName": "索芙特专卖店",
  "objId": 747 },
{
  "name": "【西域美农红枣核桃派300g】新疆特产手工零食红枣核桃糕",
  "img": "http://qn.kemean.cn/upload/201911/09/2b1029ad48634c0ea6b763feecead123?imageView2/0/w/800",
  "priceShop": "¥54.0",
  "priceDiscount": "¥29.9",
  "numSales": 206,
  "ptPrice": null,
  "shopName": "西域美农旗舰店",
  "objId": 645 },
{
  "name": "优妮马油洗发水去屑止痒修护柔顺清爽男女通用茶麸留香亮黑净屑洗发乳",
  "img": "http://qn.kemean.cn/upload/201911/20/b475daf488d949a2884f20142e3e7440?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥29.0",
  "numSales": 191,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 819 },
{
  "name": "德泽 记忆棉套装组合（腰枕+U型枕）",
  "img": "http://qn.kemean.cn/upload/201912/13/61b22d96ad9f4cf98266a24ab9b6accc?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥286.0",
  "numSales": 190,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1247 },
{
  "name": "【香港直邮】Dior迪奥口红烈焰蓝金唇膏口红 888#哑光",
  "img": "http://qn.kemean.cn/upload/201911/07/ef3fdbdd84e840ea90feb286273785e7?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 183,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 307 },
{
  "name": "广发草原手撕风干牛肉原味",
  "img": "http://qn.kemean.cn/upload/201912/18/0d71f5b807f943f5b277c0075d4e9c00?imageView2/0/w/800",
  "priceShop": "¥49.0",
  "priceDiscount": "¥46.8",
  "numSales": 182,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1354 },
{
  "name": "康派2020新款真皮女包时尚简约欧美外贸单肩斜跨包（加大版）",
  "img": "http://qn.kemean.cn/upload/201911/20/0bcd06f79978486da2ae78e0cf301667?imageView2/0/w/800",
  "priceShop": "¥169.0",
  "priceDiscount": "¥69.0",
  "numSales": 164,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 802 },
{
  "name": "索芙特真萃养颜橄榄油160ml护肤护发卸妆油",
  "img": "http://qn.kemean.cn/upload/201911/28/563c4c78563d43cc9be022fc61f1772d?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥19.9",
  "numSales": 158,
  "ptPrice": null,
  "shopName": "索芙特专卖店",
  "objId": 655 },
{
  "name": "康派工厂直销时尚真皮女士单肩包刺绣风格斜挎包",
  "img": "http://qn.kemean.cn/upload/201911/20/970ec654fb844be2bb4c47dc98e55268?imageView2/0/w/800",
  "priceShop": "¥499.0",
  "priceDiscount": "¥209.0",
  "numSales": 136,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 808 },
{
  "name": "苏泊尔 （SUPOR）炫彩不粘 煎锅PJ24M6",
  "img": "http://qn.kemean.cn/upload/201911/12/151f3e0ad4c344a2af2077b02a4b95a7?imageView2/0/w/800",
  "priceShop": "¥299.0",
  "priceDiscount": "¥129.0",
  "numSales": 128,
  "ptPrice": null,
  "shopName": "苏泊尔专卖店",
  "objId": 730 },
{
  "name": "优妮 马油护发素发膜男女通用飘逸补水发膜（免蒸）400ml",
  "img": "http://qn.kemean.cn/upload/201911/20/b5a2aeddf46a46339eaa450a228bd8de?imageView2/0/w/800",
  "priceShop": "¥89.0",
  "priceDiscount": "¥68.0",
  "numSales": 82,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 816 },
{
  "name": "麦饭石煎锅多功能不粘平底锅三合一早餐锅",
  "img": "http://qn.kemean.cn/upload/201912/23/eceef738dc2c49d6887adc5e8a99aa4f?imageView2/0/w/800",
  "priceShop": "¥488.0",
  "priceDiscount": "¥168.0",
  "numSales": 76,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1383 },
{
  "name": "迪迪尼卡麦饭石奶锅蒸锅不粘锅20CM奶锅",
  "img": "http://qn.kemean.cn/upload/201912/23/d644a681cd9447cca22aa9adeeb7b969?imageView2/0/w/800",
  "priceShop": "¥488.0",
  "priceDiscount": "¥188.0",
  "numSales": 69,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1385 },
{
  "name": "张小盒时尚行李箱纯铝合金框潮流拉杆箱男女万向轮登机箱",
  "img": "http://qn.kemean.cn/upload/201912/08/9e588a3ab6424c42ab42b2ad9cbfa79b?imageView2/0/w/800",
  "priceShop": "¥1500.0",
  "priceDiscount": "¥789.0",
  "numSales": 39,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1125 },
{
  "name": "双面煎锅不粘锅早餐平底锅小熊双面煎锅",
  "img": "http://qn.kemean.cn/upload/201912/23/53d049f894504399aaef75b5f50dcc21?imageView2/0/w/800",
  "priceShop": "¥368.0",
  "priceDiscount": "¥168.0",
  "numSales": 32,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1384 },
{
  "name": "迪迪尼卡麦饭石不粘锅平底炒锅三代32CM炒锅",
  "img": "http://qn.kemean.cn/upload/201912/23/6880d0000838435197670195aa78516b?imageView2/0/w/800",
  "priceShop": "¥378.0",
  "priceDiscount": "¥198.0",
  "numSales": 14,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1381 },
{
  "name": "迪迪尼卡麦饭石汤锅不粘锅电磁炉燃气蒸锅家用小炖锅24CM汤锅",
  "img": "http://qn.kemean.cn/upload/201912/23/9995d08a5b94436493ab98214d06c322?imageView2/0/w/800",
  "priceShop": "¥498.0",
  "priceDiscount": "¥198.0",
  "numSales": 8,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1382 },
{
  "name": "新鲜山西红富士苹果当季水果整箱包邮",
  "img": "http://qn.kemean.cn/upload/201911/07/b345f622de504a2ba9c8bc872d5e9841?imageView2/0/w/800",
  "priceShop": "¥59.9",
  "priceDiscount": "¥24.8",
  "numSales": 7,
  "ptPrice": null,
  "shopName": "运城市博雨电子商务有限公司",
  "objId": 334 },
{
  "name": "阿道夫人参自然洗发水（祛屑止痒）500g02218",
  "img": "http://qn.kemean.cn/upload/201911/07/3b4ca910a5004b02829c3bbed514027a?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥68.0",
  "numSales": 7,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 213 },
{
  "name": "秭归中华红橙血橙子",
  "img": "http://qn.kemean.cn/upload/202003/12/e8521e91ef6c44c08f19043c0f3c0425?imageView2/0/w/800",
  "priceShop": "¥49.0",
  "priceDiscount": "¥39.0",
  "numSales": 6,
  "ptPrice": null,
  "shopName": "商家云旗舰店",
  "objId": 1453 },
{
  "name": "苏泊尔（SUPOR）不锈钢厨房刀具套装菜刀水果刀果蔬刀果皮刀厨房多用剪刀TK1718T",
  "img": "http://qn.kemean.cn/upload/201911/11/5b456a1ad892462296f9b694e2423a0a?imageView2/0/w/800",
  "priceShop": "¥399.0",
  "priceDiscount": "¥189.0",
  "numSales": 5,
  "ptPrice": null,
  "shopName": "苏泊尔专卖店",
  "objId": 696 },
{
  "name": "【香港直邮】LANEIGE兰芝水衡护肤水乳套装 补水保湿水衡滋养（清爽型）",
  "img": "http://qn.kemean.cn/upload/201911/07/c3f9a916193c47198d9b78eec60e742a?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥268.0",
  "numSales": 3,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 218 },
{
  "name": "康玶时光",
  "img": "http://qn.kemean.cn/upload/201911/13/619f1c0814eb41caa97963c35d44a9b8?imageView2/0/w/800",
  "priceShop": "¥30.0",
  "priceDiscount": "¥15.0",
  "numSales": 3,
  "ptPrice": null,
  "shopName": "四海盛宴",
  "objId": 740 },
{
  "name": "【年终大促】樱花薰衣草/法国香水洗衣液2L持久留香01310",
  "img": "http://qn.kemean.cn/upload/201911/07/ebf975e7edb740169f687852185947bc?imageView2/0/w/800",
  "priceShop": "¥49.9",
  "priceDiscount": "¥29.9",
  "numSales": 2,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 342 },
{
  "name": "西域美农红枣小魅枣500g*2阿克苏魅枣若羌灰枣红枣",
  "img": "http://qn.kemean.cn/upload/201911/09/5b1258b8019142e994f2e87be5210b11?imageView2/0/w/800",
  "priceShop": "¥49.0",
  "priceDiscount": "¥20.9",
  "numSales": 2,
  "ptPrice": null,
  "shopName": "西域美农旗舰店",
  "objId": 642 },
{
  "name": "【香港直邮】BYPHASSE蓓昂斯卸妆水温和清洁500ml",
  "img": "http://qn.kemean.cn/upload/201911/07/81fd39255c4341f89036a29837da626b?imageView2/0/w/800",
  "priceShop": "¥118.0",
  "priceDiscount": "¥59.0",
  "numSales": 1,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 277 },
{
  "name": "【双11大促】百雀羚 三生花控油清肌净肤泥膜50g（深层清洁 净肤面膜）120157",
  "img": "http://qn.kemean.cn/upload/201911/07/6c4eeb6e49d6465da160bded3c8a8f35?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥68.0",
  "numSales": 1,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 292 },
{
  "name": "泉氏净水器家用10寸透明前置过滤器通用PPF棉滤芯自来水净水机过滤器",
  "img": "http://qn.kemean.cn/upload/201911/07/5b1493019fad4f86bfaa29be9c4ba26e?imageView2/0/w/800",
  "priceShop": "¥188.0",
  "priceDiscount": "¥66.8",
  "numSales": 1,
  "ptPrice": "¥40.08",
  "shopName": "深圳市泉氏清科技有限公司",
  "objId": 185 },
{
  "name": "（NLMI）那拉米/泰国皇家天然乳胶枕头宝宝儿童动物薄睡枕/卡通矮抱枕低靠枕/ （猴）63*35*5cm",
  "img": "http://qn.kemean.cn/upload/201911/07/831d070d906e430ba05d0b63655aefb6?imageView2/0/w/800",
  "priceShop": "¥399.0",
  "priceDiscount": "¥339.0",
  "numSales": 1,
  "ptPrice": "¥203.4",
  "shopName": "森尼健康家纺专营店",
  "objId": 187 },
{
  "name": "西域美农树上黄葡萄干250g*2 新疆特",
  "img": "http://qn.kemean.cn/upload/201911/08/1270453fb57f4dbaaceacc3a5c9d17ad?imageView2/0/w/800",
  "priceShop": "¥39.9",
  "priceDiscount": "¥18.9",
  "numSales": 1,
  "ptPrice": null,
  "shopName": "西域美农旗舰店",
  "objId": 454 },
{
  "name": "原创设计北欧后现代简约客厅/餐厅吊灯",
  "img": "http://qn.kemean.cn/upload/201911/28/d5cb3b069ca545b8b313d6385728efe8?imageView2/0/w/800",
  "priceShop": "¥635.0",
  "priceDiscount": "¥345.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1024 },
{
  "name": "德泽 全棉印花被 纯棉被子 单被 空调被 夏被150*200CM",
  "img": "http://qn.kemean.cn/upload/201912/14/e762dff2615d4d7595b9815f038f8dce?imageView2/0/w/800",
  "priceShop": "¥628.0",
  "priceDiscount": "¥598.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1280 },
{
  "name": "德泽 全棉印花被 纯棉被子 单被 空调被 夏被150*200CM",
  "img": "http://qn.kemean.cn/upload/201912/14/e762dff2615d4d7595b9815f038f8dce?imageView2/0/w/800",
  "priceShop": "¥628.0",
  "priceDiscount": "¥598.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1281 },
{
  "name": "原创设计北欧后现代简约客厅/餐厅吊灯",
  "img": "http://qn.kemean.cn/upload/201911/28/f113a0d0100d49da9da2d76695755b1d?imageView2/0/w/800",
  "priceShop": "¥600.0",
  "priceDiscount": "¥325.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1026 },
{
  "name": "德泽 臻品暖绒棉花被 被子 单被 空调被 夏被 200*230CM",
  "img": "http://qn.kemean.cn/upload/201912/14/8d4a858a2c2c4e0fa7ed328e8156eced?imageView2/0/w/800",
  "priceShop": "¥629.0",
  "priceDiscount": "¥499.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1282 },
{
  "name": "德泽 活性贡棉四件套 幸福叶羽 被套床单枕套 床单230*240cm 被套200*230cm 适用于1.5M/1.8M床",
  "img": "http://qn.kemean.cn/upload/201912/14/c224da9028d24c16b3c11cd5e7e3c2e1?imageView2/0/w/800",
  "priceShop": "¥998.0",
  "priceDiscount": "¥798.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1283 },
{
  "name": "德泽 爱丁堡至尊鹅绒被 被子棉被冬被被芯鹅绒 200*230cm/2500克",
  "img": "http://qn.kemean.cn/upload/201912/14/5e58478813e84cfe866bf9cb2dad92d3?imageView2/0/w/800",
  "priceShop": "¥1288.0",
  "priceDiscount": "¥999.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1284 },
{
  "name": "【香港直邮】Dr.Jart+蒂佳婷银管BB霜40ml",
  "img": "http://qn.kemean.cn/upload/201911/07/b6dda1efed864c4c8c716becae97988e?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥105.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 261 },
{
  "name": "德泽 金典纯羊毛被 被子被芯冬被 200*230cm/2000g",
  "img": "http://qn.kemean.cn/upload/201912/14/92aba9d139bf48668e37c32a5ef0a103?imageView2/0/w/800",
  "priceShop": "¥1199.0",
  "priceDiscount": "¥969.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1285 },
{
  "name": "原创设计北欧后现代简约客厅/楼梯吊灯",
  "img": "http://qn.kemean.cn/upload/201911/28/cd105fc4ed0a4501b8ddcc82bc9c0975?imageView2/0/w/800",
  "priceShop": "¥1110.0",
  "priceDiscount": "¥605.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1030 },
{
  "name": "德泽 臻品暖绒棉花被（秋冬款）棉被被子被芯 200*230cm/2000g",
  "img": "http://qn.kemean.cn/upload/201912/14/78e02c5f443541fcada9b967aa2b2fa4?imageView2/0/w/800",
  "priceShop": "¥1266.0",
  "priceDiscount": "¥999.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1286 },
{
  "name": "原创北欧后现代简约马卡龙卧室/客厅吊灯",
  "img": "http://qn.kemean.cn/upload/201911/28/a3e61a85db3a440b9e757b5a4667b931?imageView2/0/w/800",
  "priceShop": "¥1245.0",
  "priceDiscount": "¥675.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1031 },
{
  "name": "德泽 纯棉活性印花四件套 缤纷花语 枕套被套床单 适用于1.8M床 床单：230*250cm 被套：200*230cm",
  "img": "http://qn.kemean.cn/upload/201912/14/5b7aa13d165247a58778b890fc3caadf?imageView2/0/w/800",
  "priceShop": "¥1199.0",
  "priceDiscount": "¥400.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1287 },
{
  "name": "【香港直邮】Dr.Jart+/蒂佳婷V7素颜霜裸妆遮瑕保湿50ml",
  "img": "http://qn.kemean.cn/upload/201911/07/d6664dd8baf445bcb038fa702250e3db?imageView2/0/w/800",
  "priceShop": "¥228.0",
  "priceDiscount": "¥158.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 264 },
{
  "name": "原创北欧后现代简约马卡龙卧室/客厅吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/93222dbb1765421db84f537395867349?imageView2/0/w/800",
  "priceShop": "¥1746.0",
  "priceDiscount": "¥945.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1032 },
{
  "name": "德泽 全棉磨毛加厚四件套 唐之韵 全棉四件套枕套被套床单 适用于1.8M床（床单：250*250cm 被套：200*230cm）",
  "img": "http://qn.kemean.cn/upload/201912/14/70201e386a964687b1ad3662a6b5150a?imageView2/0/w/800",
  "priceShop": "¥1990.0",
  "priceDiscount": "¥1599.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1288 },
{
  "name": "/葆缇嘉 防脱发精华导入液 60ML",
  "img": "http://qn.kemean.cn/upload/201911/19/778c762f2e844ae6bc04b0097747aa57?imageView2/0/w/800",
  "priceShop": "¥368.0",
  "priceDiscount": "¥312.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 777 },
{
  "name": "原创北欧后现代简约马卡龙卧室/客厅吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/830a8bac476847b88b355bb2da4e82f6?imageView2/0/w/800",
  "priceShop": "¥2214.0",
  "priceDiscount": "¥1199.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1033 },
{
  "name": "德泽 全棉贡缎提花手工蚕丝被 被芯被子冬被200x230cm 1800克",
  "img": "http://qn.kemean.cn/upload/201912/14/aea91b7b8ad24b38882b8b1627b37e61?imageView2/0/w/800",
  "priceShop": "¥3880.0",
  "priceDiscount": "¥2800.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1289 },
{
  "name": "【香港直邮】Dr.Jart+蒂佳婷蓝色药丸面膜5片/盒",
  "img": "http://qn.kemean.cn/upload/201911/07/6ef1d1e0c87f45f0a3854239a1ce4b87?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 266 },
{
  "name": "无印良品 纯色系全棉色织水洗棉四件套 WYLP-CSQMSZ",
  "img": "http://qn.kemean.cn/upload/201912/14/d853d39ef9954f35b0fecbde76843c31?imageView2/0/w/800",
  "priceShop": "¥898.0",
  "priceDiscount": "¥434.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1290 },
{
  "name": "紫色3支套刷",
  "img": "http://qn.kemean.cn/upload/201912/14/cf7b7170f566420b83a663c00051f6b0?imageView2/0/w/800",
  "priceShop": "¥59.0",
  "priceDiscount": "¥37.5",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1291 },
{
  "name": "葆缇嘉 强效防脱安瓶 10ML*10 ",
  "img": "http://qn.kemean.cn/upload/201911/19/1abeac734a90484c9afd7a6e65621fbe?imageView2/0/w/800",
  "priceShop": "¥428.0",
  "priceDiscount": "¥360.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 780 },
{
  "name": "6支小妖精套刷",
  "img": "http://qn.kemean.cn/upload/201912/14/2ade3ac065d64057a5004bb6d1c8d2cd?imageView2/0/w/800",
  "priceShop": "¥299.0",
  "priceDiscount": "¥168.1",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1292 },
{
  "name": "【香港直邮】Dr.Jart+蒂佳婷绿色药丸面膜5片/盒",
  "img": "http://qn.kemean.cn/upload/201911/07/2ddffea99b9f45c48c7ddd46bc91bc5b?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 269 },
{
  "name": "葆缇嘉 生发膳食补充胶囊 30粒/盒 ",
  "img": "http://qn.kemean.cn/upload/201911/19/3476dd73d0864e07a9f804e49599ff59?imageView2/0/w/800",
  "priceShop": "¥280.0",
  "priceDiscount": "¥250.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 781 },
{
  "name": "白色双头套刷",
  "img": "http://qn.kemean.cn/upload/201912/14/e917ed4b9f5741ebb371c93b9efc18b5?imageView2/0/w/800",
  "priceShop": "¥98.0",
  "priceDiscount": "¥50.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1293 },
{
  "name": "葆缇嘉黄金系列手部护理",
  "img": "http://qn.kemean.cn/upload/201911/19/f4bbf462eb7a40b2a53b40dfb2d9176b?imageView2/0/w/800",
  "priceShop": "¥220.0",
  "priceDiscount": "¥150.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 782 },
{
  "name": "7支套刷 肤色",
  "img": "http://qn.kemean.cn/upload/201912/14/e33963cdd7234f638868cdbf50f452e1?imageView2/0/w/800",
  "priceShop": "¥46.0",
  "priceDiscount": "¥28.8",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1294 },
{
  "name": "【香港直邮】Banila CO芭妮兰卸妆膏脸部温和清洁卸妆100ml",
  "img": "http://qn.kemean.cn/upload/201911/07/bc208e430e7843c882d5fbdebc70ac94?imageView2/0/w/800",
  "priceShop": "¥158.0",
  "priceDiscount": "¥89.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 271 },
{
  "name": "葆缇嘉黄金系列活性珍珠精华",
  "img": "http://qn.kemean.cn/upload/201911/19/afb7c348d80840b1ac40dce081ed071c?imageView2/0/w/800",
  "priceShop": "¥600.0",
  "priceDiscount": "¥508.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 783 },
{
  "name": "砰然心动",
  "img": "http://qn.kemean.cn/upload/201912/14/6453ef97480e450391c123bd9991ef71?imageView2/0/w/800",
  "priceShop": "¥299.0",
  "priceDiscount": "¥186.3",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1295 },
{
  "name": "百雀羚草本系列水嫩倍现臻美套装12527新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/9da12843d7b34a6ca6ccfbd79f502b08?imageView2/0/w/800",
  "priceShop": "¥268.0",
  "priceDiscount": "¥228.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 272 },
{
  "name": "葆缇嘉黄金系列抗衰老保湿面膜",
  "img": "http://qn.kemean.cn/upload/201911/19/9599bdbd94c84d2d97c53647071debb1?imageView2/0/w/800",
  "priceShop": "¥218.0",
  "priceDiscount": "¥180.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 784 },
{
  "name": "七彩套刷",
  "img": "http://qn.kemean.cn/upload/201912/14/0ce24e07845045cda4933dd63e9d470c?imageView2/0/w/800",
  "priceShop": "¥118.0",
  "priceDiscount": "¥70.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1296 },
{
  "name": "【香港直邮】Banila CO芭妮兰zero卸妆膏脸部眼唇温和清洁卸妆180ml",
  "img": "http://qn.kemean.cn/upload/201911/07/9eab399c0613421b9b183e429952d3ac?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥139.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 273 },
{
  "name": "闪亮系列6支套刷&专业刷包",
  "img": "http://qn.kemean.cn/upload/201912/14/88ef29dbc59b45d9920d931c40d7c675?imageView2/0/w/800",
  "priceShop": "¥149.0",
  "priceDiscount": "¥93.1",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1297 },
{
  "name": "葆缇嘉黄金系列干细胞新生面霜",
  "img": "http://qn.kemean.cn/upload/201911/19/b1c0d5d7e4074ef988481c8bea16a3b8?imageView2/0/w/800",
  "priceShop": "¥499.0",
  "priceDiscount": "¥465.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "bottgadilungavita海外旗舰店",
  "objId": 786 },
{
  "name": "樱花系列9支套刷&专业刷包",
  "img": "http://qn.kemean.cn/upload/201912/14/681623089258415b83bce43370d0440b?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥123.8",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1298 },
{
  "name": "曼佗油茶籽油725ML花海版",
  "img": "http://qn.kemean.cn/upload/201911/19/3da0febba0a44b0894ca118173f28443?imageView2/0/w/800",
  "priceShop": "¥150.0",
  "priceDiscount": "¥110.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 787 },
{
  "name": "红粉系列9支套刷&专业刷包",
  "img": "http://qn.kemean.cn/upload/201912/14/216aa0b2bbb94634a0e145f582ddc725?imageView2/0/w/800",
  "priceShop": "¥228.0",
  "priceDiscount": "¥142.5",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1299 },
{
  "name": "百雀羚草本精萃惊喜套装12541新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/c1a5db1ff4474f1bbda5b308dc403620?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥138.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 276 },
{
  "name": "曼佗油茶籽油725MLx2",
  "img": "http://qn.kemean.cn/upload/201911/19/1f15a2e3a21f4bd88683255de6399b49?imageView2/0/w/800",
  "priceShop": "¥250.0",
  "priceDiscount": "¥230.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 788 },
{
  "name": "SY大号腮红刷",
  "img": "http://qn.kemean.cn/upload/201912/14/90624e995c6343b492eb30d4232290ec?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥80.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1300 },
{
  "name": "曼佗油茶籽油725MLx3",
  "img": "http://qn.kemean.cn/upload/201911/19/6a7f252e2e584629b5b472bb2d032e7d?imageView2/0/w/800",
  "priceShop": "¥350.0",
  "priceDiscount": "¥320.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 789 },
{
  "name": "SY大号粉扑刷",
  "img": "http://qn.kemean.cn/upload/201912/14/839a30daafeb401eb0f8c5fa90e4c30f?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥105.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1301 },
{
  "name": "激情系列10支",
  "img": "http://qn.kemean.cn/upload/201912/14/629b3218986d4fb1a0591408110b7dee?imageView2/0/w/800",
  "priceShop": "¥229.0",
  "priceDiscount": "¥142.5",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1302 },
{
  "name": "激情系列7支套刷&专业刷包",
  "img": "http://qn.kemean.cn/upload/201912/14/080c803013734907918ae3875a190709?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥105.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1303 },
{
  "name": "曼佗油茶籽油2L单瓶装",
  "img": "http://qn.kemean.cn/upload/201911/19/fd8a322318754944a25636dd11446661?imageView2/0/w/800",
  "priceShop": "¥250.0",
  "priceDiscount": "¥220.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 792 },
{
  "name": "SY大号轮廓刷",
  "img": "http://qn.kemean.cn/upload/201912/14/50d85b65f91d497da05a4ca05f8c7fba?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥105.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1304 },
{
  "name": "曼佗神露食用植物调和油5L",
  "img": "http://qn.kemean.cn/upload/201911/19/cb58c5d4ed18413886204f4189729d14?imageView2/0/w/800",
  "priceShop": "¥150.0",
  "priceDiscount": "¥120.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 793 },
{
  "name": "SY粉底刷",
  "img": "http://qn.kemean.cn/upload/201912/14/3baf905153734454b6ca67fe22d0cc81?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥80.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1305 },
{
  "name": "曼佗神露食用植物调和油2L",
  "img": "http://qn.kemean.cn/upload/201911/19/ec47dc4803f14d73b97f8bb560452fa7?imageView2/0/w/800",
  "priceShop": "¥90.0",
  "priceDiscount": "¥65.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 794 },
{
  "name": "SY3D立体眉刷",
  "img": "http://qn.kemean.cn/upload/201912/14/4b03907e6f04419e8bb2314f5499ee0e?imageView2/0/w/800",
  "priceShop": "¥78.0",
  "priceDiscount": "¥48.8",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1306 },
{
  "name": "百雀羚水能量焕耀套装12954新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/0ce535c737b043cb9da3df08385043a0?imageView2/0/w/800",
  "priceShop": "¥538.0",
  "priceDiscount": "¥488.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 283 },
{
  "name": "曼佗神露食用植物调和油1.8L",
  "img": "http://qn.kemean.cn/upload/201911/19/238292ec305a45c2ad0f849dfaaadab9?imageView2/0/w/800",
  "priceShop": "¥85.0",
  "priceDiscount": "¥60.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 795 },
{
  "name": "SY眼影刷",
  "img": "http://qn.kemean.cn/upload/201912/14/331002436ef94c5d81dd0314aa852913?imageView2/0/w/800",
  "priceShop": "¥68.0",
  "priceDiscount": "¥42.5",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1307 },
{
  "name": "曼佗神露食用植物调和油1.5Lx2",
  "img": "http://qn.kemean.cn/upload/201911/19/58bc3aadc8f8481bb4eff0d040c712db?imageView2/0/w/800",
  "priceShop": "¥120.0",
  "priceDiscount": "¥100.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 796 },
{
  "name": "SY唇刷",
  "img": "http://qn.kemean.cn/upload/201912/14/e524046adf8947d48ac1dd94a58afe24?imageView2/0/w/800",
  "priceShop": "¥68.0",
  "priceDiscount": "¥42.5",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1308 },
{
  "name": "康派网红爆款女包欧美时尚斜跨包",
  "img": "http://qn.kemean.cn/upload/201911/19/5e857702a22a430c8834b85f4b358fd2?imageView2/0/w/800",
  "priceShop": "¥229.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 797 },
{
  "name": "5支化妆刷",
  "img": "http://qn.kemean.cn/upload/201912/14/1526fd4ddd8448a99024d9d6357507fd?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥23.8",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1309 },
{
  "name": "百雀羚焕采莹润亮肤面膜22ml*5片X3盒 20607",
  "img": "http://qn.kemean.cn/upload/201911/07/94c3e04a171f48959679aacca4a37aea?imageView2/0/w/800",
  "priceShop": "¥264.0",
  "priceDiscount": "¥188.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 286 },
{
  "name": "曼佗山茶籽沐浴套装450MLx2",
  "img": "http://qn.kemean.cn/upload/201911/19/14479805889e48a39bcfeb7022f85771?imageView2/0/w/800",
  "priceShop": "¥90.0",
  "priceDiscount": "¥75.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 798 },
{
  "name": "女神双头套刷",
  "img": "http://qn.kemean.cn/upload/201912/14/0807c3059e0e4615a8514c0409cd929e?imageView2/0/w/800",
  "priceShop": "¥98.0",
  "priceDiscount": "¥50.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1310 },
{
  "name": "【香港直邮】SNP海洋燕窝水库保湿补水面膜11片/盒",
  "img": "http://qn.kemean.cn/upload/201911/07/dbd70b310a0e40f6a675184e3fa50a41?imageView2/0/w/800",
  "priceShop": "¥128.0",
  "priceDiscount": "¥75.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 287 },
{
  "name": "曼佗山茶籽沐浴套装750MLx2",
  "img": "http://qn.kemean.cn/upload/201911/19/50e100ac011c43ec8c767ac33ce40204?imageView2/0/w/800",
  "priceShop": "¥110.0",
  "priceDiscount": "¥85.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "曼佗茶油品牌店",
  "objId": 799 },
{
  "name": "多功能化妆刷",
  "img": "http://qn.kemean.cn/upload/201912/14/8974487c9a8f420b8aa9be2b70b8b1ee?imageView2/0/w/800",
  "priceShop": "¥189.0",
  "priceDiscount": "¥142.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1311 },
{
  "name": "【香港直邮】SHANGPREE香蒲丽绿公主眼膜贴祛淡化细纹黑眼圈60片/盒",
  "img": "http://qn.kemean.cn/upload/201911/07/78cf48795cc74f8f87be71efea07d20d?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥108.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 288 },
{
  "name": "电动洗刷器",
  "img": "http://qn.kemean.cn/upload/201912/14/dc9a949eeb1d40c0ab81a1e0e9e7fab8?imageView2/0/w/800",
  "priceShop": "¥99.0",
  "priceDiscount": "¥75.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1312 },
{
  "name": "【香港直邮】SHANGPREE香蒲丽红参果修复眼膜贴淡化黑眼圈细皱纹60片/盒",
  "img": "http://qn.kemean.cn/upload/201911/07/64d8cf8f43314e4081a3efec98a24e67?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥108.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 289 },
{
  "name": "康派2020新款真皮女包时尚简约欧美外贸单肩斜跨包（标准版）",
  "img": "http://qn.kemean.cn/upload/201911/20/f9c021bd4a084ee79519be65ed2e59f6?imageView2/0/w/800",
  "priceShop": "¥159.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 801 },
{
  "name": "歪头洁面仪",
  "img": "http://qn.kemean.cn/upload/201912/14/626b0406c322474e967aaf4ec80b26f0?imageView2/0/w/800",
  "priceShop": "¥199.0",
  "priceDiscount": "¥103.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1313 },
{
  "name": "【香港直邮】Embryolisse保湿妆前乳隔离霜75ml",
  "img": "http://qn.kemean.cn/upload/201911/07/62e701937f544c60bdbfa91bff9ccbd8?imageView2/0/w/800",
  "priceShop": "¥198.0",
  "priceDiscount": "¥128.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 290 },
{
  "name": "圆贝洁面仪/4个色（红/粉/蓝/绿）",
  "img": "http://qn.kemean.cn/upload/201912/14/7c2ced4f143b400ba95562000a8b8e5d?imageView2/0/w/800",
  "priceShop": "¥299.0",
  "priceDiscount": "¥87.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1314 },
{
  "name": "【双11特促】百雀羚至臻皙白亮采眼部精华液20g118581",
  "img": "http://qn.kemean.cn/upload/201911/07/70bba58321214c3c8ec7f353da35a2ae?imageView2/0/w/800",
  "priceShop": "¥238.0",
  "priceDiscount": "¥88.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 291 },
{
  "name": "康派爆款热线小CK同款女式单肩包时尚PU斜挎包",
  "img": "http://qn.kemean.cn/upload/201911/20/e812b6672d5e4ab2abbb8011f1c4c8a6?imageView2/0/w/800",
  "priceShop": "¥399.0",
  "priceDiscount": "¥119.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 803 },
{
  "name": "眼部去皱美眼仪",
  "img": "http://qn.kemean.cn/upload/201912/14/3f84310be21a4da4a68b556050262a6f?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥40.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1315 },
{
  "name": "康派时尚亮片女式小方包韩版PU斜挎包",
  "img": "http://qn.kemean.cn/upload/201911/20/689e9a82558e4639975c74e987881b9b?imageView2/0/w/800",
  "priceShop": "¥199.0",
  "priceDiscount": "¥69.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 804 },
{
  "name": "滚轮瘦脸仪",
  "img": "http://qn.kemean.cn/upload/201912/14/573af8aaaf744b9a8c111616059ceff4?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥49.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1316 },
{
  "name": "百雀羚草本系列水能量焕彩洁容膏80g12756",
  "img": "http://qn.kemean.cn/upload/201911/07/c3be584f270a45caa023b1728b22c0cb?imageView2/0/w/800",
  "priceShop": "¥118.0",
  "priceDiscount": "¥98.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 293 },
{
  "name": "康派热销小CK同款时尚亮片女包五金流苏装饰女式斜挎包",
  "img": "http://qn.kemean.cn/upload/201911/20/0cd41dc4aabf4a2eafa30aa19999648e?imageView2/0/w/800",
  "priceShop": "¥399.0",
  "priceDiscount": "¥89.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "康派皮具旗舰店",
  "objId": 805 },
{
  "name": "荷叶黄金美容棒",
  "img": "http://qn.kemean.cn/upload/201912/14/c17f610aee0f4b43a421f8b7bd30d02b?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥0.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1317 },
{
  "name": "百雀羚草本系列水能量焕颜美容液90ml12794",
  "img": "http://qn.kemean.cn/upload/201911/07/0e97758b581642ad966f3d68dcb9d202?imageView2/0/w/800",
  "priceShop": "¥188.0",
  "priceDiscount": "¥168.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 294 },
{
  "name": "咪然 2019现磨鲜米 东北大米 珍珠粥米 黑龙江原产地饭香珍珠米5kg",
  "img": "http://qn.kemean.cn/upload/201912/14/ef812630a686486286009a7d0b589741?imageView2/0/w/800",
  "priceShop": "¥108.0",
  "priceDiscount": "¥77.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1318 },
{
  "name": "原创设计北欧后现代简约客厅/卧室吊灯",
  "img": "http://qn.kemean.cn/upload/201912/31/a87b7e0362cb4da090ed9e99509e5acd?imageView2/0/w/800",
  "priceShop": "¥720.0",
  "priceDiscount": "¥390.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1063 },
{
  "name": "咪然 稻花香香米五常大米 东北大米10斤 黑龙江原产地直供现磨新米 真空袋装5kg",
  "img": "http://qn.kemean.cn/upload/201912/14/3b16c032cb9e4d1a8be4b7c08abad6e0?imageView2/0/w/800",
  "priceShop": "¥135.0",
  "priceDiscount": "¥128.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1319 },
{
  "name": "咪然 东北直供长粒香米5斤 2019新上市现磨鲜米 东北大米 黑龙江大米2.5kg",
  "img": "http://qn.kemean.cn/upload/201912/14/05dfe010ad564ecabe410ad0e4cc4334?imageView2/0/w/800",
  "priceShop": "¥68.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1320 },
{
  "name": "优妮护发喷雾修复干燥毛躁免洗柔顺顺滑精华素营养水保湿补水精油",
  "img": "http://qn.kemean.cn/upload/201911/20/800a2d0440f2470f99e81738e6f067bc?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥29.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 809 },
{
  "name": "原创设计北欧后现代简约客厅/卧室吊灯",
  "img": "http://qn.kemean.cn/upload/201912/31/8fa8353b56814d3e8c77bd1e751d8102?imageView2/0/w/800",
  "priceShop": "¥1020.0",
  "priceDiscount": "¥549.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1065 },
{
  "name": "咪然 东北直供现磨鲜米 长粒香米 东北大米 原粮地直供真空包装大米5KG",
  "img": "http://qn.kemean.cn/upload/201912/14/56bc654a255449d1b02287bd3989ab71?imageView2/0/w/800",
  "priceShop": "¥115.0",
  "priceDiscount": "¥97.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1321 },
{
  "name": "优妮啫喱水保湿定型发蜡男女士卷发定型保湿亮泽持久留香发胶",
  "img": "http://qn.kemean.cn/upload/201911/20/a275e311bbda400780268f3267512aaa?imageView2/0/w/800",
  "priceShop": "¥35.0",
  "priceDiscount": "¥28.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 810 },
{
  "name": "咪然东北大米10斤正宗五常稻花香香米五常水稻研究所监制现磨新米原粮原产地直发5kg",
  "img": "http://qn.kemean.cn/upload/201912/14/3747ab8442d94a5aa2ccfbf28b769988?imageView2/0/w/800",
  "priceShop": "¥235.0",
  "priceDiscount": "¥224.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1322 },
{
  "name": "【香港直邮】Dior迪奥口红烈焰蓝金唇膏口红 999#哑光",
  "img": "http://qn.kemean.cn/upload/201911/07/8182a0e2c4a44bda89d2a74f978ad642?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 299 },
{
  "name": "优妮马油倒膜膏正品修复干枯补水顺滑防毛躁柔顺头发发膜焗油膏",
  "img": "http://qn.kemean.cn/upload/201911/20/54296f3f3c06477cba2494583b42fcf7?imageView2/0/w/800",
  "priceShop": "¥119.0",
  "priceDiscount": "¥89.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 811 },
{
  "name": "咪然 东北大米 正宗五常有机稻花香大米 五常水稻研究所监制现磨新米 原粮原产地袋装2.5kg",
  "img": "http://qn.kemean.cn/upload/201912/14/81137fb5e99c4772aa25200dce71d8fd?imageView2/0/w/800",
  "priceShop": "¥168.0",
  "priceDiscount": "¥161.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1323 },
{
  "name": "优妮马油茶麸护发素修复干枯烫染受损补水柔顺顺滑男女正品改善毛躁",
  "img": "http://qn.kemean.cn/upload/201911/20/f9934932a41243a09b17e1cfc20753a7?imageView2/0/w/800",
  "priceShop": "¥57.0",
  "priceDiscount": "¥49.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 812 },
{
  "name": "咪然 富硒现磨鲜米 煮粥大米 黑龙江大米 东北原粮地直供真空包装1kg袋装",
  "img": "http://qn.kemean.cn/upload/201912/14/4bf9cccdb8784923905e5bcc9b016e14?imageView2/0/w/800",
  "priceShop": "¥43.0",
  "priceDiscount": "¥33.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1324 },
{
  "name": "【香港直邮】Dior迪奥口红烈焰蓝金唇膏口红 999#滋润 ",
  "img": "http://qn.kemean.cn/upload/201911/07/bdff93f4312d47c7819996a08143c29c?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 301 },
{
  "name": "优妮无患子洗发水沐浴露套装控油清爽去屑柔顺持久留香保湿60ML*2-保质期2021年11月",
  "img": "http://qn.kemean.cn/upload/201911/20/9cf228ceb3624dc1b0af765db9c1bccc?imageView2/0/w/800",
  "priceShop": "¥29.0",
  "priceDiscount": "¥19.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 813 },
{
  "name": "原创设计北欧后现代简约客厅/卧室吊灯",
  "img": "http://qn.kemean.cn/upload/201912/31/e9fe7ece23984d9d9491c0444a52be24?imageView2/0/w/800",
  "priceShop": "¥1115.0",
  "priceDiscount": "¥605.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1069 },
{
  "name": "咪然 富硒现磨鲜米 煮粥大米 黑龙江大米 东北原粮地直供真空包装5kg袋装",
  "img": "http://qn.kemean.cn/upload/201912/14/a60dc4f6af914dfb86d582a4e909495e?imageView2/0/w/800",
  "priceShop": "¥150.0",
  "priceDiscount": "¥121.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1325 },
{
  "name": "优妮马油洗发水护发洗护去屑止痒修护持久留香去油随机体验装10ML8",
  "img": "http://qn.kemean.cn/upload/201911/20/b0e917eff801456ca7e8bc51b5e2bdd3?imageView2/0/w/800",
  "priceShop": "¥19.9",
  "priceDiscount": "¥9.9",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 814 },
{
  "name": "原创设计北欧后现代简约卧室/客厅家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/d39ac4daa8124ef4b246895f697af1bf?imageView2/0/w/800",
  "priceShop": "¥655.0",
  "priceDiscount": "¥655.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1070 },
{
  "name": "咪然 富硒现磨鲜米 煮粥大米 黑龙江大米 东北原粮地直供真空包装2.5kg袋装",
  "img": "http://qn.kemean.cn/upload/201912/14/1079660b35b54abfb0dbaf4a6c2049d8?imageView2/0/w/800",
  "priceShop": "¥78.0",
  "priceDiscount": "¥77.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1326 },
{
  "name": "索芙特汉方1kg留香补水保湿留香补水保湿",
  "img": "http://qn.kemean.cn/upload/201911/28/557f0b949fe1420fb75e3aada5e514a5?imageView2/0/w/800",
  "priceShop": "¥29.9",
  "priceDiscount": "¥19.9",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "索芙特专卖店",
  "objId": 303 },
{
  "name": "优妮马油丝滑水漾洗发乳 无患子洗发水修复受损 水润柔顺",
  "img": "http://qn.kemean.cn/upload/201911/20/75a6f8c2c5054c1b8fde4241ed4185f9?imageView2/0/w/800",
  "priceShop": "¥55.0",
  "priceDiscount": "¥49.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 815 },
{
  "name": "原创设计北欧后现代简约卧室/客厅家居马卡龙吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/b13b2f380eaa4e0ba34da60f906bef9f?imageView2/0/w/800",
  "priceShop": "¥1476.0",
  "priceDiscount": "¥799.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1071 },
{
  "name": "咪然 东北直供现磨鲜米 长粒香米 东北大米 原粮地直供真空包装大米5KG",
  "img": "http://qn.kemean.cn/upload/201912/14/f88edf6570ca414c96f63f3e854a9272?imageView2/0/w/800",
  "priceShop": "¥118.0",
  "priceDiscount": "¥103.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1327 },
{
  "name": "【香港直邮】Dior迪奥口红烈焰蓝金唇膏口红 999#金属",
  "img": "http://qn.kemean.cn/upload/201911/07/9646ac480d3045f98e626117842e51ac?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 304 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/3a03f91e6d1b45eba80810ee8efdc40e?imageView2/0/w/800",
  "priceShop": "¥1615.0",
  "priceDiscount": "¥875.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1072 },
{
  "name": "无印良品 条纹系全棉色织水洗棉四件套 WYLP-TWQMSZ",
  "img": "http://qn.kemean.cn/upload/201912/14/6da690f90b294702b3d6ed5bbc889570?imageView2/0/w/800",
  "priceShop": "¥898.0",
  "priceDiscount": "¥434.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "左立直营店",
  "objId": 1328 },
{
  "name": "迪菲娜蜗牛套盒680ml+380ml03483新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/a078866a13e14c6db70d189ad2afeea5?imageView2/0/w/800",
  "priceShop": "¥118.0",
  "priceDiscount": "¥98.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 305 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/aad5d482e7b7458b9b8da52829ad006c?imageView2/0/w/800",
  "priceShop": "¥1989.0",
  "priceDiscount": "¥1079.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1073 },
{
  "name": "迪菲娜洋甘菊精油滋养修护沐浴乳液900ml03285",
  "img": "http://qn.kemean.cn/upload/201911/07/c5e53ff52e0e4e9b9dcc1a2d16b6b8e5?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥68.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 306 },
{
  "name": "马油生姜洗发水去屑止痒茶麸无患子洗发露持久留香女控油男士随机220",
  "img": "http://qn.kemean.cn/upload/201911/20/3ce796b83c5243f98c0a59bb045c6f8f?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥29.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 818 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/599b62f144a9448388c51c4228ef50e7?imageView2/0/w/800",
  "priceShop": "¥1368.0",
  "priceDiscount": "¥741.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1074 },
{
  "name": "原创设计北欧后现代简约餐厅/楼道/酒吧吊灯",
  "img": "http://qn.kemean.cn/upload/201912/14/a3b62c71f2a245d38072d2d350f669e4?imageView2/0/w/800",
  "priceShop": "¥1029.0",
  "priceDiscount": "¥635.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1330 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/374bfea0a52a4dd6946b99f390dc772d?imageView2/0/w/800",
  "priceShop": "¥1640.0",
  "priceDiscount": "¥888.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1075 },
{
  "name": "原创设计北欧后现代简约餐厅/楼道/酒吧吊灯",
  "img": "http://qn.kemean.cn/upload/201912/14/990aa3b40f424c18a05448fe1fdb310c?imageView2/0/w/800",
  "priceShop": "¥1827.0",
  "priceDiscount": "¥1129.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1331 },
{
  "name": "迪菲娜茶树原液头皮净爽去屑洗发露680ml003421",
  "img": "http://qn.kemean.cn/upload/201911/07/3ab2cfa3332148f18d423e3adf118458?imageView2/0/w/800",
  "priceShop": "¥88.0",
  "priceDiscount": "¥68.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 308 },
{
  "name": "优妮马油丝滑水漾洗发乳 无患子洗发水修复受损 ",
  "img": "http://qn.kemean.cn/upload/201911/20/646aac0720de429d96da28a422d1a55a?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥29.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 820 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/48bebf93b1ac40539f4bcf2c73e66a1a?imageView2/0/w/800",
  "priceShop": "¥1995.0",
  "priceDiscount": "¥1080.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1076 },
{
  "name": "原创设计北欧后现代卧室/客厅/餐厅家居吊灯",
  "img": "http://qn.kemean.cn/upload/201912/14/0eb633c5524f4fe8943e6afcda38895c?imageView2/0/w/800",
  "priceShop": "¥1215.0",
  "priceDiscount": "¥750.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1332 },
{
  "name": "【香港直邮】Dior迪奥口红烈焰蓝金唇膏口红 520#星星色",
  "img": "http://qn.kemean.cn/upload/201911/07/adc159b72f92431bb344c48543154dcc?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 309 },
{
  "name": "优妮洗发水沐浴露套装正品家庭装补水柔顺滑",
  "img": "http://qn.kemean.cn/upload/201911/20/e868e209f67c42ab92b5f9e3b8e55fab?imageView2/0/w/800",
  "priceShop": "¥89.0",
  "priceDiscount": "¥68.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "广州聚惠商贸有限公司",
  "objId": 821 },
{
  "name": "原创设计北欧后现代卧室/客厅马卡龙家居吊灯",
  "img": "http://qn.kemean.cn/upload/201911/29/6fd9a4fc1a2d436d82c99e61d7de484d?imageView2/0/w/800",
  "priceShop": "¥2253.0",
  "priceDiscount": "¥1220.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1077 },
{
  "name": "相宜本草红景天焕亮明星挚爱礼盒13861新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/e12a306e1cd14a2cb24ce3584b82a3ed?imageView2/0/w/800",
  "priceShop": "¥386.0",
  "priceDiscount": "¥328.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 310 },
{
  "name": "中国风传统剪纸 梅/兰/竹/菊四件套",
  "img": "http://qn.kemean.cn/upload/201911/30/6790b1ceb607442bae03022059b3428b?imageView2/0/w/800",
  "priceShop": "¥2000.0",
  "priceDiscount": "¥2000.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "商家云旗舰店",
  "objId": 1078 },
{
  "name": "原创设计北欧后现代卧室/客厅/餐厅家居吊灯",
  "img": "http://qn.kemean.cn/upload/201912/14/e680c26069344f1da7374ad4ee4c7308?imageView2/0/w/800",
  "priceShop": "¥1569.0",
  "priceDiscount": "¥969.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1334 },
{
  "name": "【香港直邮】Dior迪奥魅惑釉唇膏漆光唇彩口红740#",
  "img": "http://qn.kemean.cn/upload/201911/07/2cfd79762e1d423489efb6c38a819935?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 311 },
{
  "name": "原创设计北欧后现代简约卧室/床头/楼道壁灯",
  "img": "http://qn.kemean.cn/upload/201911/30/1e31bbee9a844ba890b96e77e4797fbb?imageView2/0/w/800",
  "priceShop": "¥245.0",
  "priceDiscount": "¥132.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1079 },
{
  "name": "索芙特香水沐浴露670g持久留香改善粗糙干燥",
  "img": "http://qn.kemean.cn/upload/201911/28/7603fac0b14c4dc99ca81f0685e78d8c?imageView2/0/w/800",
  "priceShop": "¥39.0",
  "priceDiscount": "¥26.9",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "索芙特专卖店",
  "objId": 312 },
{
  "name": "原创设计北欧后现代简约卧室/床头/楼道壁灯",
  "img": "http://qn.kemean.cn/upload/201911/30/73bc6c5ad16742cc9b9bc6782d696a1e?imageView2/0/w/800",
  "priceShop": "¥333.0",
  "priceDiscount": "¥179.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1080 },
{
  "name": "欧莱雅复颜抗皱紧致滋润眼霜15ml",
  "img": "http://qn.kemean.cn/upload/201912/16/91985ec7a9ba46c79057b204f4373e34?imageView2/0/w/800",
  "priceShop": "¥240.0",
  "priceDiscount": "¥179.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1336 },
{
  "name": "【香港直邮】Dior迪奥魅惑釉唇膏漆光唇彩口红744#",
  "img": "http://qn.kemean.cn/upload/201911/07/984e34c064484ff4ad5d84977094b512?imageView2/0/w/800",
  "priceShop": "¥358.0",
  "priceDiscount": "¥235.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 313 },
{
  "name": "原创设计北欧后现代简约卧室/床头/楼道壁灯",
  "img": "http://qn.kemean.cn/upload/201912/02/313dcba0bcb545159616093d1fe33568?imageView2/0/w/800",
  "priceShop": "¥475.0",
  "priceDiscount": "¥255.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1081 },
{
  "name": "欧莱雅复颜清乳柔肤水130ml",
  "img": "http://qn.kemean.cn/upload/201912/16/3b0cd2a5738f4986929a26adada02084?imageView2/0/w/800",
  "priceShop": "¥190.0",
  "priceDiscount": "¥169.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1337 },
{
  "name": "【香港直邮】Dior迪奥粉漾诱惑变色润唇膏口红001#粉色",
  "img": "http://qn.kemean.cn/upload/201911/07/e732e2e9b08a44c6ba2d826a69abcd78?imageView2/0/w/800",
  "priceShop": "¥298.0",
  "priceDiscount": "¥215.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 314 },
{
  "name": "原创设计北欧后现代简约卧室/床头/书房/客厅家居台灯",
  "img": "http://qn.kemean.cn/upload/201912/02/76a2505a5f784b799710644d4d8c6c86?imageView2/0/w/800",
  "priceShop": "¥309.0",
  "priceDiscount": "¥169.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1082 },
{
  "name": "欧莱雅清润葡萄籽保湿柔肤水130ml",
  "img": "http://qn.kemean.cn/upload/201912/16/07925ec78323490d802971828a0df666?imageView2/0/w/800",
  "priceShop": "¥155.0",
  "priceDiscount": "¥99.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1338 },
{
  "name": "【香港直邮】Dior迪奥粉漾诱惑变色润唇膏口红004#橘色",
  "img": "http://qn.kemean.cn/upload/201911/07/adf83e68c1d64aacb94c9ead6a3d9d8c?imageView2/0/w/800",
  "priceShop": "¥298.0",
  "priceDiscount": "¥215.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 315 },
{
  "name": "原创设计北欧后现代简约卧室/床头/书房/客厅家居台灯",
  "img": "http://qn.kemean.cn/upload/201912/02/4908be5dcd4646acb4655b3583767f4f?imageView2/0/w/800",
  "priceShop": "¥402.0",
  "priceDiscount": "¥219.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1083 },
{
  "name": "欧莱雅小黑瓶青春密码酵素精华肌底液30ml/50ml/70ml",
  "img": "http://qn.kemean.cn/upload/201912/16/f9de32afdd504a41bc8e2545efe0da44?imageView2/0/w/800",
  "priceShop": "¥280.0",
  "priceDiscount": "¥199.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1339 },
{
  "name": "相宜本草睡莲水灵肌沁润臻享礼盒13571新旧款随机发货",
  "img": "http://qn.kemean.cn/upload/201911/07/76b56c2e63e440b08189fb4ca2406db3?imageView2/0/w/800",
  "priceShop": "¥458.0",
  "priceDiscount": "¥428.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 316 },
{
  "name": "原创设计北欧后现代简约卧室/床头/书房/客厅家居台灯",
  "img": "http://qn.kemean.cn/upload/201912/02/ad7975f7692b4c6090e4ee31cf0434cb?imageView2/0/w/800",
  "priceShop": "¥285.0",
  "priceDiscount": "¥155.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1084 },
{
  "name": "欧莱雅小黑瓶青春密码酵素精华肌底液30ml/50ml/70ml",
  "img": "http://qn.kemean.cn/upload/201912/16/f9de32afdd504a41bc8e2545efe0da44?imageView2/0/w/800",
  "priceShop": "¥280.0",
  "priceDiscount": "¥199.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1340 },
{
  "name": "【香港直邮】YSL圣罗兰方管口红 1#正红色",
  "img": "http://qn.kemean.cn/upload/201911/07/75b6f1465e4a46e8a9ded38f7602dcb5?imageView2/0/w/800",
  "priceShop": "¥398.0",
  "priceDiscount": "¥229.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 317 },
{
  "name": "原创设计北欧后现代简约卧室/床头/楼道壁灯",
  "img": "http://qn.kemean.cn/upload/201912/02/1a99dee3d8854778ad484c3dc08e21c3?imageView2/0/w/800",
  "priceShop": "¥210.0",
  "priceDiscount": "¥115.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1085 },
{
  "name": "欧莱雅清润葡萄籽保湿乳液110ml",
  "img": "http://qn.kemean.cn/upload/201912/16/904788dc20234d11aec1d4e02724e477?imageView2/0/w/800",
  "priceShop": "¥169.0",
  "priceDiscount": "¥129.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1341 },
{
  "name": "相宜本草红景天焕亮精华液40g10396",
  "img": "http://qn.kemean.cn/upload/201911/07/00032dee7a734d8f97bcdf06d109d35f?imageView2/0/w/800",
  "priceShop": "¥238.0",
  "priceDiscount": "¥198.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 318 },
{
  "name": "原创设计北欧后现代简约卧室/床头/楼道壁灯",
  "img": "http://qn.kemean.cn/upload/201912/02/0d296f900f974d7f8147f6fdb9fd8368?imageView2/0/w/800",
  "priceShop": "¥339.0",
  "priceDiscount": "¥185.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1086 },
{
  "name": "【香港直邮】YSL圣罗兰方管口红 13#橘红色",
  "img": "http://qn.kemean.cn/upload/201911/07/11bd0775e75a4f1587602e7d33ded2fc?imageView2/0/w/800",
  "priceShop": "¥398.0",
  "priceDiscount": "¥229.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 319 },
{
  "name": "原创设计北欧后现代简约客厅/卧室/书房/阳台落地灯",
  "img": "http://qn.kemean.cn/upload/201912/02/0edf7250aecd4152bd2462604e20044b?imageView2/0/w/800",
  "priceShop": "¥719.0",
  "priceDiscount": "¥469.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1087 },
{
  "name": "欧莱雅清润葡萄籽保湿特润凝霜50ml",
  "img": "http://qn.kemean.cn/upload/201912/16/1b263aa4f63643fa9d7a61a7d00f9957?imageView2/0/w/800",
  "priceShop": "¥160.0",
  "priceDiscount": "¥129.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1343 },
{
  "name": "【香港直邮】YSL圣罗兰方管口红 17#西柚粉",
  "img": "http://qn.kemean.cn/upload/201911/07/5cc63b5622b54b0eb2d9b8526d50eecd?imageView2/0/w/800",
  "priceShop": "¥398.0",
  "priceDiscount": "¥229.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 320 },
{
  "name": "原创设计北欧后现代简约客厅/楼梯灯螺旋吊灯",
  "img": "http://qn.kemean.cn/upload/201912/02/d96689596701484787e7974096f60541?imageView2/0/w/800",
  "priceShop": "¥854.0",
  "priceDiscount": "¥459.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1088 },
{
  "name": "欧莱雅男士水能保湿强润霜50ml",
  "img": "http://qn.kemean.cn/upload/201912/16/62bdcd6a1560460788c2a7111b5d6549?imageView2/0/w/800",
  "priceShop": "¥79.0",
  "priceDiscount": "¥59.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1344 },
{
  "name": "【香港直邮】YSL圣罗兰方管口红 52#星星色",
  "img": "http://qn.kemean.cn/upload/201911/07/00a659269a72452d99228ce5a8528fdc?imageView2/0/w/800",
  "priceShop": "¥398.0",
  "priceDiscount": "¥229.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "帝耀美妆全球购",
  "objId": 321 },
{
  "name": "原创设计北欧后现代简约客厅/楼梯灯螺旋吊灯",
  "img": "http://qn.kemean.cn/upload/201912/02/285500eebd094aa9aa73cb16f3c88438?imageView2/0/w/800",
  "priceShop": "¥1290.0",
  "priceDiscount": "¥699.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1089 },
{
  "name": "欧莱雅复颜洁面乳125ml",
  "img": "http://qn.kemean.cn/upload/201912/16/eb78688166d44ab4aa5ec42ccce16c5c?imageView2/0/w/800",
  "priceShop": "¥129.0",
  "priceDiscount": "¥99.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1345 },
{
  "name": "相宜本草红景天幼白精华水120ml03442",
  "img": "http://qn.kemean.cn/upload/201911/07/1a3e9802b7644e79b629183a894d1b18?imageView2/0/w/800",
  "priceShop": "¥109.0",
  "priceDiscount": "¥88.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 322 },
{
  "name": "原创设计北欧后现代简约客厅/楼梯灯螺旋吊灯",
  "img": "http://qn.kemean.cn/upload/201912/02/e74757691c804b81aae3b206660139a8?imageView2/0/w/800",
  "priceShop": "¥2346.0",
  "priceDiscount": "¥1269.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1090 },
{
  "name": "欧莱雅清润葡萄籽水嫩洁面乳125ml",
  "img": "http://qn.kemean.cn/upload/201912/16/d2cead460a8847a3a9b63ac42757e37c?imageView2/0/w/800",
  "priceShop": "¥109.0",
  "priceDiscount": "¥78.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1346 },
{
  "name": "相宜本草红景天幼白精华乳120g03466",
  "img": "http://qn.kemean.cn/upload/201911/07/2402e48191214f13a3862694a2a676ed?imageView2/0/w/800",
  "priceShop": "¥119.0",
  "priceDiscount": "¥98.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 323 },
{
  "name": "原创设计北欧后现代简约餐厅书房吊灯",
  "img": "http://qn.kemean.cn/upload/201912/02/6f4ecc2640844b9ba3d75cd326713fd2?imageView2/0/w/800",
  "priceShop": "¥525.0",
  "priceDiscount": "¥284.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "和光时创旗舰店",
  "objId": 1091 },
{
  "name": "欧莱雅复颜紧致滋润晚霜50ml",
  "img": "http://qn.kemean.cn/upload/201912/16/8848d51d45fc479c98e85f471fc3a083?imageView2/0/w/800",
  "priceShop": "¥219.0",
  "priceDiscount": "¥169.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "九九自营店",
  "objId": 1347 },
{
  "name": "花迷.净颜睡莲净润卸妆水400ML （特供）90312",
  "img": "http://qn.kemean.cn/upload/201911/07/1b1cb9f784ba4faebff80b42849f7039?imageView2/0/w/800",
  "priceShop": "¥139.0",
  "priceDiscount": "¥88.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "美妆一号商城旗舰店",
  "objId": 324 },
{
  "name": "泉氏净水器水龙头过滤器家用厨房卫生间自来水滤水器前置净化水机",
  "img": "http://qn.kemean.cn/upload/201912/03/8223dd2c4f2c4297aca3b6716ea8d6fb?imageView2/0/w/800",
  "priceShop": "¥320.0",
  "priceDiscount": "¥108.0",
  "numSales": 0,
  "ptPrice": null,
  "shopName": "深圳市泉氏清科技有限公司",
  "objId": 1092 }];exports.default = _default;

/***/ }),

/***/ 18:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/test.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 验证电子邮箱格式
                                                                                                      */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
   * 验证手机格式
   */
function mobile(value) {
  return /^1[23456789]\d{9}$/.test(value);
}

/**
   * 验证URL格式
   */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.
  test(value);
}

/**
   * 验证日期格式
   */
function date(value) {
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
   * 验证ISO类型的日期格式
   */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
   * 验证十进制数字
   */
function number(value) {
  return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
}

/**
   * 验证整数
   */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
   * 验证身份证号码
   */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
  value);
}

/**
   * 是否车牌号
   */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  } else if (value.length === 8) {
    return xreg.test(value);
  } else {
    return false;
  }
}

/**
   * 金额,只允许2位小数
   */
function amount(value) {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
   * 中文
   */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
   * 只能输入字母
   */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
   * 只能是字母或者数字
   */
function enOrNum(value) {
  //英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
   * 验证是否包含某个值
   */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
   * 验证一个值范围[min, max]
   */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
   * 验证一个长度范围[min, max]
   */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
   * 是否固定电话
   */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
   * 判断是否为空
   */
function empty(value) {
  switch (typeof value) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (0 === value || isNaN(value)) return true;
      break;
    case 'object':
      if (null === value || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;}

  return false;
}

/**
   * 是否json字符串
   */
function jsonString(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value);
      if (typeof obj == 'object' && obj) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  }
  return false;
}


/**
   * 是否数组
   */
function array(value) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(value);
  } else {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
}


/**
   * 是否对象
   */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}var _default =


{
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array };exports.default = _default;

/***/ }),

/***/ 180:
/*!********************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/components/mescroll-uni/mescroll-mixins.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // mescroll-body 和 mescroll-uni 通用

// import MescrollUni from "./mescroll-uni.vue";
// import MescrollBody from "./mescroll-body.vue";

var MescrollMixin = {
  // components: { // 非H5端无法通过mixin注册组件, 只能在main.js中注册全局组件或具体界面中注册
  // 	MescrollUni,
  // 	MescrollBody
  // },
  data: function data() {
    return {
      mescroll: null //mescroll实例对象
    };
  },
  // 注册系统自带的下拉刷新 (配置down.native为true时生效, 还需在pages配置enablePullDownRefresh:true;详请参考mescroll-native的案例)
  onPullDownRefresh: function onPullDownRefresh() {
    this.mescroll && this.mescroll.onPullDownRefresh();
  },
  // 注册列表滚动事件,用于判定在顶部可下拉刷新,在指定位置可显示隐藏回到顶部按钮 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onPageScroll: function onPageScroll(e) {
    this.mescroll && this.mescroll.onPageScroll(e);
  },
  // 注册滚动到底部的事件,用于上拉加载 (此方法为页面生命周期,无法在子组件中触发, 仅在mescroll-body生效)
  onReachBottom: function onReachBottom() {
    this.mescroll && this.mescroll.onReachBottom();
  },
  methods: {
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit: function mescrollInit(mescroll) {
      this.mescroll = mescroll;
      this.mescrollInitByRef(); // 兼容字节跳动小程序
    },
    // 以ref的方式初始化mescroll对象 (兼容字节跳动小程序: http://www.mescroll.com/qa.html?v=20200107#q26)
    mescrollInitByRef: function mescrollInitByRef() {
      if (!this.mescroll || !this.mescroll.resetUpScroll) {
        var mescrollRef = this.$refs.mescrollRef;
        if (mescrollRef) this.mescroll = mescrollRef.mescroll;
      }
    },
    // 下拉刷新的回调
    downCallback: function downCallback() {
      // mixin默认resetUpScroll
      this.mescroll.resetUpScroll();
    },
    // 上拉加载的回调
    upCallback: function upCallback() {var _this = this;
      // mixin默认延时500自动结束加载
      setTimeout(function () {
        _this.mescroll.endErr();
      }, 500);
    } },

  mounted: function mounted() {
    this.mescrollInitByRef(); // 兼容字节跳动小程序, 避免未设置@init或@init此时未能取到ref的情况
  } };var _default =



MescrollMixin;exports.default = _default;

/***/ }),

/***/ 19:
/*!***************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/queryParams.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 对象转url参数
                                                                                                      * @param {*} data,对象
                                                                                                      * @param {*} isPrefix,是否自动加上"?"
                                                                                                      */
function queryParams() {var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';var _loop = function _loop(
  key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = "";
          value.forEach(function (_value) {
            commaStr += (commaStr ? "," : "") + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(function (_value) {
            _result.push(key + '[]=' + _value);
          });}

    } else {
      _result.push(key + '=' + value);
    }};for (var key in data) {var _ret = _loop(key);if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}var _default =

queryParams;exports.default = _default;

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-baidu","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue ) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/route.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _queryParams = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/queryParams.js */ 19));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
                                                                                                                                                                                                                                                                                            * 路由跳转
                                                                                                                                                                                                                                                                                            * 注意:本方法没有对跳转的回调函数进行封装
                                                                                                                                                                                                                                                                                            */
function route() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var config = {
    type: 'navigateTo',
    url: '',
    delta: 1, // navigateBack页面后退时,回退的层数
    params: {}, // 传递的参数
    animationType: 'pop-in', // 窗口动画,只在APP有效
    animationDuration: 300 // 窗口动画持续时间,单位毫秒,只在APP有效
  };
  config = Object.assign(config, options);
  // 如果url没有"/"开头，添加上，因为uni的路由跳转需要"/"开头
  if (config.url[0] != '/') config.url = '/' + config.url;
  // 判断是否有传递显式的参数,Object.keys转为数组并判断长度,switchTab类型时不能携带参数
  if (Object.keys(config.params).length && config.type != 'switchTab') {
    // 判断用户传递的url中，是否带有参数
    // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
    // 如果有url中有get参数，转换后无需带上"?"
    var query = '';
    if (/.*\/.*\?.*=.*/.test(config.url)) {
      // object对象转为get类型的参数
      query = (0, _queryParams.default)(config.params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      config.url += "&" + query;
    } else {
      query = (0, _queryParams.default)(config.params);
      config.url += query;
    }
  }
  // 简写形式，把url和参数拼接起来
  if (typeof options === 'string' && typeof params == 'object') {
    var _query = '';
    if (/.*\/.*\?.*=.*/.test(options)) {
      // object对象转为get类型的参数
      _query = (0, _queryParams.default)(params, false);
      // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
      options += "&" + _query;
    } else {
      _query = (0, _queryParams.default)(params);
      options += _query;
    }
  }
  // 判断是否一个字符串，如果是，直接跳转(简写法)
  // 如果是中情形，默认第二个参数为对象形式的参数
  if (typeof options === 'string') {
    if (options[0] != '/') options = '/' + options;
    return uni.navigateTo({
      url: options });

  }
  // navigateTo类型的跳转
  if (config.type == 'navigateTo' || config.type == 'to') {
    return uni.navigateTo({
      url: config.url,
      animationType: config.animationType,
      animationDuration: config.animationDuration });

  }
  if (config.type == 'redirectTo' || config.type == 'redirect') {
    return uni.redirectTo({
      url: config.url });

  }
  if (config.type == 'switchTab' || config.type == 'tab') {
    return uni.switchTab({
      url: config.url });

  }
  if (config.type == 'reLaunch') {
    return uni.reLaunch({
      url: config.url });

  }
  if (config.type == 'navigateBack' || config.type == 'back') {
    return uni.navigateBack({
      delta: parseInt(config.delta ? config.delta : this.delta) });

  }
}var _default =

route;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 21:
/*!**************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/timeFormat.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function timeFormat() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var fmt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  // 其他更多是格式化有如下:
  // yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合
  timestamp = parseInt(timestamp);
  // 如果为null,则格式化当前时间
  if (!timestamp) timestamp = Number(new Date());
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var date = new Date(timestamp);
  var ret;
  var opt = {
    "y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "h+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "s+": date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (var k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
    };
  };
  return fmt;
}var _default =

timeFormat;exports.default = _default;

/***/ }),

/***/ 211:
/*!*********************************************************************************************!*\
  !*** ./node_modules/@vue/babel-preset-app/node_modules/@babel/runtime/regenerator/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 212);

/***/ }),

/***/ 212:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 213);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 213:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 22:
/*!************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/timeFrom.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _timeFormat = _interopRequireDefault(__webpack_require__(/*! ../../libs/function/timeFormat.js */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

/**
                                                                                                                                                                                                                                                                                          * 时间戳转为多久之前
                                                                                                                                                                                                                                                                                          * @param String timestamp 时间戳
                                                                                                                                                                                                                                                                                          * @param String | Boolean format 如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
                                                                                                                                                                                                                                                                                          * 如果为布尔值false，无论什么时间，都返回多久以前的格式
                                                                                                                                                                                                                                                                                          */
function timeFrom() {var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = parseInt(timer / 60) + '分钟前';
      break;
    case timer >= 3600 && timer < 86400:
      tips = parseInt(timer / 3600) + '小时前';
      break;
    case timer >= 86400 && timer < 2592000:
      tips = parseInt(timer / 86400) + '天前';
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = parseInt(timer / (86400 * 30)) + '个月前';
        } else {
          tips = parseInt(timer / (86400 * 365)) + '年前';
        }
      } else {
        tips = (0, _timeFormat.default)(timestamp, format);
      }}

  return tips;
}var _default =

timeFrom;exports.default = _default;

/***/ }),

/***/ 23:
/*!*****************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/colorGradient.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 求两个颜色之间的渐变值
                                                                                                      * @param {string} startColor 开始的颜色
                                                                                                      * @param {string} endColor 结束的颜色
                                                                                                      * @param {number} step 颜色等分的份额
                                                                                                      * */
function colorGradient() {var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); //转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];

  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];

  var sR = (endR - startR) / step; //总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    //计算每一步的hex值 
    var hex = rgbToHex('rgb(' + Math.round(sR * i + startR) + ',' + Math.round(sG * i + startG) + ',' + Math.round(sB *
    i + startB) + ')');
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    //处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(_i, _i + 2)));
    }
    if (!str) {
      return sColorChange;
    } else {
      return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
    }
  } else if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    return arr.map(function (val) {return Number(val);});
  } else {
    return sColor;
  }
};

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    var aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}var _default =

{
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex };exports.default = _default;

/***/ }),

/***/ 24:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/guid.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 本算法来源于简书开源代码，详见：https://www.jianshu.com/p/fdbf293d0a85
                                                                                                      * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
                                                                                                      * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
                                                                                                      * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
                                                                                                      * v-for的时候,推荐使用后端返回的id而不是循环的index
                                                                                                      * @param {Number} len uuid的长度
                                                                                                      * @param {Boolean} firstU 将返回的首字母置为"u"
                                                                                                      * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
                                                                                                      */
function guid() {var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;

  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {uuid[i] = chars[0 | Math.random() * radix];}
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return 'u' + uuid.join('');
  } else {
    return uuid.join('');
  }
}var _default =

guid;exports.default = _default;

/***/ }),

/***/ 25:
/*!*********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/color.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: "#2979ff",
  primaryDark: "#2b85e4",
  primaryDisabled: "#a0cfff",
  primaryLight: "#ecf5ff",
  bgColor: "#f3f4f6",

  info: "#909399",
  infoDark: "#82848a",
  infoDisabled: "#c8c9cc",
  infoLight: "#f4f4f5",

  warning: "#ff9900",
  warningDark: "#f29100",
  warningDisabled: "#fcbd71",
  warningLight: "#fdf6ec",

  error: "#fa3534",
  errorDark: "#dd6161",
  errorDisabled: "#fab6b6",
  errorLight: "#fef0f0",

  success: "#19be6b",
  successDark: "#18b566",
  successDisabled: "#71d5a1",
  successLight: "#dbf1e1",

  mainColor: "#303133",
  contentColor: "#606266",
  tipsColor: "#909399",
  lightColor: "#c0c4cc",
  borderColor: "#e4e7ed" };var _default =


color;exports.default = _default;

/***/ }),

/***/ 26:
/*!*************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/type2icon.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      * 根据主题type值,获取对应的图标
                                                                                                      * @param String type 主题名称,primary|info|error|warning|success
                                                                                                      * @param String fill 是否使用fill填充实体的图标  
                                                                                                      */
function type2icon() {var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';}

  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}var _default =

type2icon;exports.default = _default;

/***/ }),

/***/ 27:
/*!***************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/randomArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 打乱数组
function randomArray() {var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {return Math.random() - 0.5;});
}var _default =

randomArray;exports.default = _default;

/***/ }),

/***/ 28:
/*!***********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/addUnit.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = addUnit;var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 18));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

// 添加单位，如果有rpx，%，px等单位结尾或者值为auto，直接返回，否则加上rpx单位结尾
function addUnit() {var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rpx';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/***/ }),

/***/ 29:
/*!**********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/random.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  } else {
    return 0;
  }
}var _default =

random;exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/trim.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function trim(str) {var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, '');
  } else if (pos == 'right') {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == 'all') {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}var _default =

trim;exports.default = _default;

/***/ }),

/***/ 31:
/*!*********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/toast.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function toast(title) {var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  uni.showToast({
    title: title,
    icon: 'none',
    duration: duration });

}var _default =

toast;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-baidu/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 32:
/*!*************************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/getParent.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = getParent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function getParent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {var _ret = function () {
        var data = {};
        // 判断keys是否数组，如果传过来的是一个数组，那么直接使用数组元素值当做键值去父组件寻找
        if (Array.isArray(keys)) {
          keys.map(function (val) {
            data[val] = parent[val] ? parent[val] : '';
          });
        } else {
          // 历遍传过来的对象参数
          for (var i in keys) {
            // 如果子组件有此值则用，无此值则用父组件的值
            // 判断是否空数组，如果是，则用父组件的值，否则用子组件的值
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              // 判断是否对象，如果是对象，且有属性，那么使用子组件的值，否则使用父组件的值
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              // 只要子组件有传值，即使是false值，也是“传值”了，也需要覆盖父组件的同名参数
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return { v: data };}();if (typeof _ret === "object") return _ret.v;
    }
  }

  return {};
}

/***/ }),

/***/ 33:
/*!***********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/function/$parent.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = $parent; // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
// this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
function $parent(name, keys) {
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/***/ }),

/***/ 34:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/config/config.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // 此版本发布于2020-07-21
var version = '1.5.4';var _default =

{
  v: version,
  version: version,
  // 主题名称
  type: [
  'primary',
  'success',
  'info',
  'error',
  'warning'] };exports.default = _default;

/***/ }),

/***/ 35:
/*!********************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/uview-ui/libs/config/zIndex.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */var _default =

{
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965 };exports.default = _default;

/***/ }),

/***/ 4:
/*!************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/pages.json ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 70:
/*!*******************************************************************!*\
  !*** C:/Users/wang/Desktop/风眼/demo/components/uni-icons/icons.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "pulldown": "\uE588",
  "refreshempty": "\uE461",
  "back": "\uE471",
  "forward": "\uE470",
  "more": "\uE507",
  "more-filled": "\uE537",
  "scan": "\uE612",
  "qq": "\uE264",
  "weibo": "\uE260",
  "weixin": "\uE261",
  "pengyouquan": "\uE262",
  "loop": "\uE565",
  "refresh": "\uE407",
  "refresh-filled": "\uE437",
  "arrowthindown": "\uE585",
  "arrowthinleft": "\uE586",
  "arrowthinright": "\uE587",
  "arrowthinup": "\uE584",
  "undo-filled": "\uE7D6",
  "undo": "\uE406",
  "redo": "\uE405",
  "redo-filled": "\uE7D9",
  "bars": "\uE563",
  "chatboxes": "\uE203",
  "camera": "\uE301",
  "chatboxes-filled": "\uE233",
  "camera-filled": "\uE7EF",
  "cart-filled": "\uE7F4",
  "cart": "\uE7F5",
  "checkbox-filled": "\uE442",
  "checkbox": "\uE7FA",
  "arrowleft": "\uE582",
  "arrowdown": "\uE581",
  "arrowright": "\uE583",
  "smallcircle-filled": "\uE801",
  "arrowup": "\uE580",
  "circle": "\uE411",
  "eye-filled": "\uE568",
  "eye-slash-filled": "\uE822",
  "eye-slash": "\uE823",
  "eye": "\uE824",
  "flag-filled": "\uE825",
  "flag": "\uE508",
  "gear-filled": "\uE532",
  "reload": "\uE462",
  "gear": "\uE502",
  "hand-thumbsdown-filled": "\uE83B",
  "hand-thumbsdown": "\uE83C",
  "hand-thumbsup-filled": "\uE83D",
  "heart-filled": "\uE83E",
  "hand-thumbsup": "\uE83F",
  "heart": "\uE840",
  "home": "\uE500",
  "info": "\uE504",
  "home-filled": "\uE530",
  "info-filled": "\uE534",
  "circle-filled": "\uE441",
  "chat-filled": "\uE847",
  "chat": "\uE263",
  "mail-open-filled": "\uE84D",
  "email-filled": "\uE231",
  "mail-open": "\uE84E",
  "email": "\uE201",
  "checkmarkempty": "\uE472",
  "list": "\uE562",
  "locked-filled": "\uE856",
  "locked": "\uE506",
  "map-filled": "\uE85C",
  "map-pin": "\uE85E",
  "map-pin-ellipse": "\uE864",
  "map": "\uE364",
  "minus-filled": "\uE440",
  "mic-filled": "\uE332",
  "minus": "\uE410",
  "micoff": "\uE360",
  "mic": "\uE302",
  "clear": "\uE434",
  "smallcircle": "\uE868",
  "close": "\uE404",
  "closeempty": "\uE460",
  "paperclip": "\uE567",
  "paperplane": "\uE503",
  "paperplane-filled": "\uE86E",
  "person-filled": "\uE131",
  "contact-filled": "\uE130",
  "person": "\uE101",
  "contact": "\uE100",
  "images-filled": "\uE87A",
  "phone": "\uE200",
  "images": "\uE87B",
  "image": "\uE363",
  "image-filled": "\uE877",
  "location-filled": "\uE333",
  "location": "\uE303",
  "plus-filled": "\uE439",
  "plus": "\uE409",
  "plusempty": "\uE468",
  "help-filled": "\uE535",
  "help": "\uE505",
  "navigate-filled": "\uE884",
  "navigate": "\uE501",
  "mic-slash-filled": "\uE892",
  "search": "\uE466",
  "settings": "\uE560",
  "sound": "\uE590",
  "sound-filled": "\uE8A1",
  "spinner-cycle": "\uE465",
  "download-filled": "\uE8A4",
  "personadd-filled": "\uE132",
  "videocam-filled": "\uE8AF",
  "personadd": "\uE102",
  "upload": "\uE402",
  "upload-filled": "\uE8B1",
  "starhalf": "\uE463",
  "star-filled": "\uE438",
  "star": "\uE408",
  "trash": "\uE401",
  "phone-filled": "\uE230",
  "compose": "\uE400",
  "videocam": "\uE300",
  "trash-filled": "\uE8DC",
  "download": "\uE403",
  "chatbubble-filled": "\uE232",
  "chatbubble": "\uE202",
  "cloud-download": "\uE8E4",
  "cloud-upload-filled": "\uE8E5",
  "cloud-upload": "\uE8E6",
  "cloud-download-filled": "\uE8E9",
  "headphones": "\uE8BF",
  "shop": "\uE609" };exports.default = _default;

/***/ })

}]);