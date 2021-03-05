import React from 'react'
import * as ReactNative from 'react-native'
import { requireNativeComponent } from 'react-native'
import type {
  MapwizeViewProps,
  Floor,
  MapwizeViewRef,
  Venue,
  VenuePreview,
  Place,
  PlacePreview,
  Universe,
  FollowUserMode,
  DirectionMode,
  LatLngFloor,
} from './types'
import type { MapwizeInternalEvent, EventValue } from './internalTypes'
import Commands from './command'

const transform = (externalProp: any) => {
  return ({ nativeEvent: event }: { nativeEvent: EventValue<any> }) =>
    externalProp && externalProp(event.value)
}
class MapView
  extends React.Component<MapwizeViewProps>
  implements MapwizeViewRef {
  command = new Commands()
  onMapwizeEvent = ({ nativeEvent }: { nativeEvent: MapwizeInternalEvent }) => {
    this.command.handlePromise(nativeEvent)
  }
  componentDidMount() {
    this.command.dispatch(
      'componentDidMount',
      ReactNative.findNodeHandle(this),
      []
    )
  }

  centerOn = (
    position: LatLngFloor | Place | PlacePreview | VenuePreview | Venue,
    zoom: number = 18,
    animated: boolean = true
  ) =>
    this.command.dispatch('centerOn', ReactNative.findNodeHandle(this), [
      position,
      zoom,
      animated,
    ])

  centerOnCoordinate = (latLngFloor: LatLngFloor) =>
    this.command.dispatch(
      'centerOnCoordinate',
      ReactNative.findNodeHandle(this),
      [latLngFloor]
    )

  getFloor = (): Promise<Floor> =>
    this.command.dispatch('getFloor', ReactNative.findNodeHandle(this), [])
  addImageToMap = (imageName: string, imageBase64: string) =>
    this.command.dispatch('addImageToMap', ReactNative.findNodeHandle(this), [
      imageName,
      imageBase64,
    ])
  grantAccess = (accessKey: string): Promise<void> =>
    this.command.dispatch('grantAccess', ReactNative.findNodeHandle(this), [
      accessKey,
    ])
  setFloor = (floorNumber: number) =>
    this.command.dispatch('setFloor', ReactNative.findNodeHandle(this), [
      floorNumber,
    ])
  getFloors = (): Promise<Floor[]> =>
    this.command.dispatch('getFloors', ReactNative.findNodeHandle(this), [])
  setPreferredLanguage = (language: string) =>
    this.command.dispatch(
      'setPreferredLanguage',
      ReactNative.findNodeHandle(this),
      [language]
    )
  getPreferredLanguage = (): Promise<string> =>
    this.command.dispatch(
      'getPreferredLanguage',
      ReactNative.findNodeHandle(this),
      []
    )
  setLanguageForVenue = (language: string, venue: Venue) =>
    this.command.dispatch(
      'setLanguageForVenue',
      ReactNative.findNodeHandle(this),
      [language, venue]
    )
  getLanguageForVenue = (venue: Venue): Promise<string> =>
    this.command.dispatch(
      'getLanguageForVenue',
      ReactNative.findNodeHandle(this),
      [venue]
    )
  getLanguage = (): Promise<string> =>
    this.command.dispatch('getLanguage', ReactNative.findNodeHandle(this), [])
  setUniverse = (universe: Universe) =>
    this.command.dispatch('setUniverse', ReactNative.findNodeHandle(this), [
      universe,
    ])
  setUniverseForVenue = (universe: Universe, venue: Venue) =>
    this.command.dispatch(
      'setUniverseForVenue',
      ReactNative.findNodeHandle(this),
      [universe, venue]
    )
  getUniverse = (): Promise<Universe> =>
    this.command.dispatch('getUniverse', ReactNative.findNodeHandle(this), [])
  getUniverseForVenue = (venue: Venue): Promise<Universe> =>
    this.command.dispatch(
      'getUniverseForVenue',
      ReactNative.findNodeHandle(this),
      [venue]
    )
  getUniverses = (): Promise<Universe[]> =>
    this.command.dispatch('getUniverses', ReactNative.findNodeHandle(this), [])
  setFollowUserMode = (followUserMode: FollowUserMode) =>
    this.command.dispatch(
      'setFollowUserMode',
      ReactNative.findNodeHandle(this),
      [followUserMode]
    )
  getFollowUserMode = (): Promise<FollowUserMode> =>
    this.command.dispatch(
      'getFollowUserMode',
      ReactNative.findNodeHandle(this),
      []
    )
  getZoom = (): Promise<Number> =>
    this.command.dispatch('getZoom', ReactNative.findNodeHandle(this), [])
  zoomTo = (zoom: Number): void => {
    this.command.dispatch('zoomTo', ReactNative.findNodeHandle(this), [zoom])
  }
  getDirectionModes = (): Promise<DirectionMode[]> =>
    this.command.dispatch(
      'getDirectionModes',
      ReactNative.findNodeHandle(this),
      []
    )

  render() {
    const {
      onMapLoaded: onExternalLoad,
      onVenueWillEnter,
      onVenueEnter,
      onVenueEnterError,
      onVenueExit,
      onUniversesChange,
      onUniverseWillChange,
      onUniverseChange,
      onUniverseChangeError,
      onFloorsChange,
      onFloorWillChange,
      onFloorChange,
      onFloorChangeError,
      onMarkerClick,
      onMapClick,
      onFollowUserModeChange,
      onLanguagesChange,
      onLanguageChange,
      onDirectionModesChange,
      onNavigationError,
      onNavigationStart,
      onNavigationStop,
      onNavigationUpdate,
      onNavigationWillStart,
      ...rest
    } = this.props
    const propEvents: any = {
      onVenueWillEnter: transform(onVenueWillEnter),
      onVenueEnter: transform(onVenueEnter),
      onVenueEnterError: transform(onVenueEnterError),
      onVenueExit: transform(onVenueExit),
      onUniversesChange: transform(onUniversesChange),
      onUniverseWillChange: transform(onUniverseWillChange),
      onUniverseChange: transform(onUniverseChange),
      onUniverseChangeError: transform(onUniverseChangeError),
      onFloorsChange: transform(onFloorsChange),
      onFloorWillChange: transform(onFloorWillChange),
      onFloorChange: transform(onFloorChange),
      onFloorChangeError: transform(onFloorChangeError),
      onMarkerClick: transform(onMarkerClick),
      onMapClick: transform(onMapClick),
      onFollowUserModeChange: transform(onFollowUserModeChange),
      onLanguagesChange: transform(onLanguagesChange),
      onLanguageChange: transform(onLanguageChange),
      onDirectionModesChange: transform(onDirectionModesChange),
      onNavigationError: transform(onNavigationError),
      onNavigationStart: transform(onNavigationStart),
      onNavigationStop: transform(onNavigationStop),
      onNavigationUpdate: transform(onNavigationUpdate),
      onNavigationWillStart: transform(onNavigationWillStart),
    }
    return (
      <NativeView
        {...rest}
        {...propEvents}
        onMapwizeEvent={this.onMapwizeEvent}
        onMapLoaded={() => onExternalLoad && onExternalLoad(this)}
      />
    )
  }
}

const NativeView = requireNativeComponent('RNMWZMap')

export { MapView as default }
