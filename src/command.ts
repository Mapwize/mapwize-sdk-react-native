import { UIManager, NativeModules, Platform } from 'react-native'
import type { MapwizeInternalEvent } from './types'
const { RNMWZMap } = NativeModules
const MyUIManager = UIManager as any
type AcceptReject = (val?: any) => void
class Command {
  promisesMap: {
    [key: string]: { accept: AcceptReject; reject: AcceptReject }
  } = {}
  nextPromiseId = 0
  constructor() {}
  dispatch = (
    methodName: string,
    nativeRef: any,
    args: any[]
  ): Promise<any> => {
    if (Platform.OS === 'android') {
      const promiseId = this.nextPromiseId++
      return new Promise<void>((accept, reject) => {
        this.promisesMap[promiseId] = { accept, reject }
        MyUIManager.dispatchViewManagerCommand(nativeRef, methodName, [
          promiseId,
          ...args,
        ])
      })
    } else {
      return RNMWZMap[methodName](nativeRef, ...args)
    }
  }
  handlePromise = (event: MapwizeInternalEvent) => {
    const { promiseId, success, value } = event
    const p = this.promisesMap[promiseId]
    delete this.promisesMap[promiseId]
    if (success) {
      p.accept(value)
    } else {
      p.reject(value && value.message)
    }
  }
}
export default Command
