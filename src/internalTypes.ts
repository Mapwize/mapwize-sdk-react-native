/**
 * Internal use only
 */
export interface EventValue<T> {
  value: T
}
/**
 * Internal use only
 */
export interface MapwizeInternalEvent {
  promiseId: number
  success: boolean
  value: any
}
