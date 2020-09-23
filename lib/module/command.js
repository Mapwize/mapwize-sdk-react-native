function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { UIManager, NativeModules, Platform } from 'react-native';
const {
  RNMWZMap
} = NativeModules;
const MyUIManager = UIManager;

class Command {
  constructor() {
    _defineProperty(this, "promisesMap", {});

    _defineProperty(this, "nextPromiseId", 0);

    _defineProperty(this, "dispatch", (methodName, nativeRef, args) => {
      if (Platform.OS === 'android') {
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

export default Command;
//# sourceMappingURL=command.js.map