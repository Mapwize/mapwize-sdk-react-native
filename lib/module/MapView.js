function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import * as ReactNative from 'react-native';
import { requireNativeComponent } from 'react-native';
import Commands from './command';

const transform = externalProp => {
  return ({
    nativeEvent: event
  }) => externalProp && externalProp(event.value);
};

class MapView extends React.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "command", new Commands());

    _defineProperty(this, "onMapwizeEvent", ({
      nativeEvent
    }) => {
      this.command.handlePromise(nativeEvent);
    });

    _defineProperty(this, "centerOn", (position, zoom = 18, animated = true) => this.command.dispatch('centerOn', ReactNative.findNodeHandle(this), [position, zoom, animated]));

    _defineProperty(this, "centerOnCoordinate", latLngFloor => this.command.dispatch('centerOnCoordinate', ReactNative.findNodeHandle(this), [latLngFloor]));

    _defineProperty(this, "getFloor", () => this.command.dispatch('getFloor', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "addImageToMap", (imageName, imageBase64) => this.command.dispatch('addImageToMap', ReactNative.findNodeHandle(this), [imageName, imageBase64]));

    _defineProperty(this, "grantAccess", accessKey => this.command.dispatch('grantAccess', ReactNative.findNodeHandle(this), [accessKey]));

    _defineProperty(this, "setFloor", floorNumber => this.command.dispatch('setFloor', ReactNative.findNodeHandle(this), [floorNumber]));

    _defineProperty(this, "getFloors", () => this.command.dispatch('getFloors', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "setPreferredLanguage", language => this.command.dispatch('setPreferredLanguage', ReactNative.findNodeHandle(this), [language]));

    _defineProperty(this, "getPreferredLanguage", () => this.command.dispatch('getPreferredLanguage', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "setLanguageForVenue", (language, venue) => this.command.dispatch('setLanguageForVenue', ReactNative.findNodeHandle(this), [language, venue]));

    _defineProperty(this, "getLanguageForVenue", venue => this.command.dispatch('getLanguageForVenue', ReactNative.findNodeHandle(this), [venue]));

    _defineProperty(this, "getLanguage", () => this.command.dispatch('getLanguage', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "setUniverse", universe => this.command.dispatch('setUniverse', ReactNative.findNodeHandle(this), [universe]));

    _defineProperty(this, "setUniverseForVenue", (universe, venue) => this.command.dispatch('setUniverseForVenue', ReactNative.findNodeHandle(this), [universe, venue]));

    _defineProperty(this, "getUniverse", () => this.command.dispatch('getUniverse', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "getUniverseForVenue", venue => this.command.dispatch('getUniverseForVenue', ReactNative.findNodeHandle(this), [venue]));

    _defineProperty(this, "getUniverses", () => this.command.dispatch('getUniverses', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "setFollowUserMode", followUserMode => this.command.dispatch('setFollowUserMode', ReactNative.findNodeHandle(this), [followUserMode]));

    _defineProperty(this, "getFollowUserMode", () => this.command.dispatch('getFollowUserMode', ReactNative.findNodeHandle(this), []));

    _defineProperty(this, "getDirectionModes", () => this.command.dispatch('getDirectionModes', ReactNative.findNodeHandle(this), []));
  }

  componentDidMount() {
    this.command.dispatch('componentDidMount', ReactNative.findNodeHandle(this), []);
  }

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
      onLanguageChange,
      onDirectionModesChange,
      onNavigationError,
      onNavigationStart,
      onNavigationStop,
      onNavigationUpdate,
      onNavigationWillStart,
      ...rest
    } = this.props;
    const propEvents = {
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
      onLanguageChange: transform(onLanguageChange),
      onDirectionModesChange: transform(onDirectionModesChange),
      onNavigationError: transform(onNavigationError),
      onNavigationStart: transform(onNavigationStart),
      onNavigationStop: transform(onNavigationStop),
      onNavigationUpdate: transform(onNavigationUpdate),
      onNavigationWillStart: transform(onNavigationWillStart)
    };
    return /*#__PURE__*/React.createElement(NativeView, _extends({}, rest, propEvents, {
      onMapwizeEvent: this.onMapwizeEvent,
      onMapLoaded: () => onExternalLoad && onExternalLoad(this)
    }));
  }

}

const NativeView = requireNativeComponent('RNMWZMap');
export { MapView as default };
//# sourceMappingURL=MapView.js.map