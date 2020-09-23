"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  RNMWZMap
} = _reactNative.NativeModules;
const MyUIManager = _reactNative.UIManager;

class Command {
  constructor() {
    _defineProperty(this, "promisesMap", {});

    _defineProperty(this, "nextPromiseId", 0);

    _defineProperty(this, "dispatch", (methodName, nativeRef, args) => {
      if (_reactNative.Platform.OS === 'android') {
        const promiseId = this.nextPromiseId++;
        return new Promise((accept, reject) => {
          this.promisesMap[promiseId] = {
            accept,
            reject
          };
          MyUIManager.dispatchViewManagerCommand(nativeRef, methodName, [promiseId, ...args]);
        });
      } else {
        return RNMWZMap[methodName](nativeRef, ...args);
      }
    });

    _defineProperty(this, "handlePromise", event => {
      const {
        promiseId,
        success,
        value
      } = event;
      const p = this.promisesMap[promiseId];
      delete this.promisesMap[promiseId];

      if (success) {
        p.accept(value);
      } else {
        p.reject(value && value.message);
      }
    });
  }

}

var _default = Command;
exports.default = _default;
//# sourceMappingURL=command.js.map