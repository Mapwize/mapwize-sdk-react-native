function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { NativeEventEmitter, NativeModules } from 'react-native';
const {
  RNMWZOfflineManager
} = NativeModules;
let count = 0;
export const createOfflineManager = mapwizeConfiguration => {
  let contextId = 'context-' + count++;
  RNMWZOfflineManager.createOfflineManager(mapwizeConfiguration, contextId);
  return new OfflineManagerImp(contextId);
};

class OfflineManagerImp {
  constructor(contextId) {
    _defineProperty(this, "contextId", void 0);

    _defineProperty(this, "progressListeners", {});

    _defineProperty(this, "nextProgressListenerId", 0);

    this.contextId = contextId;
  }

  downloadData(offlineRegion, onProgress) {
    const eventEmitter = new NativeEventEmitter(RNMWZOfflineManager);
    const eventListener = eventEmitter.addListener('OfflineManagerEvent', e => {
      const {
        downloadTaskListenerId,
        progress,
        contextId
      } = e;

      if (contextId === this.contextId) {
        //Handle only this instance's events
        this.progressListeners[downloadTaskListenerId] && this.progressListeners[downloadTaskListenerId](progress);
      }
    });
    const progressListenerId = '' + this.nextProgressListenerId++;
    this.progressListeners[progressListenerId] = onProgress;
    return new Promise((resolve, reject) => RNMWZOfflineManager.downloadData(this.contextId, progressListenerId, offlineRegion).then(offlineRegion1 => {
      eventListener.remove();
      delete this.progressListeners[progressListenerId];
      resolve(offlineRegion1);
    }, message => {
      eventListener.remove();
      delete this.progressListeners[progressListenerId];
      reject(message);
    }));
  }

  updateData(offlineRegion, onProgress) {
    const eventEmitter = new NativeEventEmitter(RNMWZOfflineManager);
    const eventListener = eventEmitter.addListener('OfflineManagerEvent', e => {
      const {
        downloadTaskListenerId,
        progress,
        contextId
      } = e;

      if (contextId === this.contextId) {
        //Handle only this instance's events
        this.progressListeners[downloadTaskListenerId] && this.progressListeners[downloadTaskListenerId](progress);
      }
    });
    const progressListenerId = '' + this.nextProgressListenerId++;
    this.progressListeners[progressListenerId] = onProgress;
    return new Promise((resolve, reject) => RNMWZOfflineManager.updateData(this.contextId, progressListenerId, offlineRegion).then(offlineRegion => {
      eventListener.remove();
      delete this.progressListeners[progressListenerId];
      resolve(offlineRegion);
    }, message => {
      eventListener.remove();
      delete this.progressListeners[progressListenerId];
      reject(message);
    }));
  }

  hasOfflineRegion(venue, universe) {
    return RNMWZOfflineManager.hasOfflineRegion(this.contextId, venue, universe);
  }

  getOfflineRegion(venue, universe) {
    return RNMWZOfflineManager.getOfflineRegion(this.contextId, venue, universe);
  }

  getOfflineRegions() {
    return RNMWZOfflineManager.getOfflineRegions(this.contextId);
  }

  removeData(offlineRegion) {
    return RNMWZOfflineManager.removeData(this.contextId, offlineRegion);
  }

  checkForUpdate(offlineRegion) {
    return RNMWZOfflineManager.checkForUpdate(this.contextId, offlineRegion);
  }

}

export default createOfflineManager;
//# sourceMappingURL=OfflineManager.js.map