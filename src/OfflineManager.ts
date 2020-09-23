import { NativeEventEmitter, NativeModules } from 'react-native'

import type {
  Venue,
  MapwizeConfiguration,
  OfflineManager,
  Universe,
  OfflineRegion,
  DownloadDataOptions,
} from './types'

const { RNMWZOfflineManager } = NativeModules

let count: number = 0
export const createOfflineManager = (
  mapwizeConfiguration: MapwizeConfiguration
): OfflineManager => {
  let contextId = 'context-' + count++
  RNMWZOfflineManager.createOfflineManager(mapwizeConfiguration, contextId)
  return new OfflineManagerImp(contextId)
}
class OfflineManagerImp implements OfflineManager {
  contextId: string
  progressListeners: {
    [key: string]: (progress: number) => void
  } = {}
  nextProgressListenerId: number = 0
  constructor(contextId: string) {
    this.contextId = contextId
  }
  downloadData(
    offlineRegion: OfflineRegion,
    onProgress: (progress: number) => void
  ): Promise<OfflineRegion> {
    const eventEmitter = new NativeEventEmitter(RNMWZOfflineManager)
    const eventListener = eventEmitter.addListener(
      'OfflineManagerEvent',
      (e) => {
        const { downloadTaskListenerId, progress, contextId } = e
        if (contextId === this.contextId) {
          //Handle only this instance's events
          this.progressListeners[downloadTaskListenerId] &&
            this.progressListeners[downloadTaskListenerId](progress)
        }
      }
    )
    const progressListenerId = '' + this.nextProgressListenerId++
    this.progressListeners[progressListenerId] = onProgress
    return new Promise((resolve, reject) =>
      RNMWZOfflineManager.downloadData(
        this.contextId,
        progressListenerId,
        offlineRegion
      ).then(
        (offlineRegion1: OfflineRegion) => {
          eventListener.remove()
          delete this.progressListeners[progressListenerId]
          resolve(offlineRegion1)
        },
        (message: string) => {
          eventListener.remove()
          delete this.progressListeners[progressListenerId]
          reject(message)
        }
      )
    )
  }
  updateData(
    offlineRegion: OfflineRegion,
    onProgress: (progress: number) => void
  ): Promise<OfflineRegion> {
    const eventEmitter = new NativeEventEmitter(RNMWZOfflineManager)
    const eventListener = eventEmitter.addListener(
      'OfflineManagerEvent',
      (e) => {
        const { downloadTaskListenerId, progress, contextId } = e
        if (contextId === this.contextId) {
          //Handle only this instance's events
          this.progressListeners[downloadTaskListenerId] &&
            this.progressListeners[downloadTaskListenerId](progress)
        }
      }
    )
    const progressListenerId = '' + this.nextProgressListenerId++
    this.progressListeners[progressListenerId] = onProgress
    return new Promise((resolve, reject) =>
      RNMWZOfflineManager.updateData(
        this.contextId,
        progressListenerId,
        offlineRegion
      ).then(
        (offlineRegion: OfflineRegion) => {
          eventListener.remove()
          delete this.progressListeners[progressListenerId]
          resolve(offlineRegion)
        },
        (message: string) => {
          eventListener.remove()
          delete this.progressListeners[progressListenerId]
          reject(message)
        }
      )
    )
  }
  hasOfflineRegion(venue: Venue, universe: Universe): Promise<boolean> {
    return RNMWZOfflineManager.hasOfflineRegion(this.contextId, venue, universe)
  }

  getOfflineRegion(venue: Venue, universe: Universe): Promise<OfflineRegion> {
    return RNMWZOfflineManager.getOfflineRegion(this.contextId, venue, universe)
  }

  getOfflineRegions(): Promise<OfflineRegion[]> {
    return RNMWZOfflineManager.getOfflineRegions(this.contextId)
  }

  removeData(offlineRegion: OfflineRegion): Promise<void> {
    return RNMWZOfflineManager.removeData(this.contextId, offlineRegion)
  }

  checkForUpdate(offlineRegion: OfflineRegion): Promise<Boolean> {
    return RNMWZOfflineManager.checkForUpdate(this.contextId, offlineRegion)
  }
}

export default createOfflineManager
