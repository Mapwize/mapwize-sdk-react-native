"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapwizeIndoorLocation = exports.IndoorLocation = exports.FollowUserMode = exports.Marker = exports.MapOptions = exports.DirectionOptions = exports.VenuePreview = exports.PlacePreview = exports.ClickEvent = exports.UserInfo = exports.Style = exports.Placelist = exports.Venue = exports.Place = exports.Translation = exports.Organization = exports.Universe = exports.MapwizeIcon = exports.Layer = exports.LatLngBounds = exports.LatLngFloorInVenue = exports.LatLngFloor = exports.LatLng = exports.Route = exports.Floor = exports.DirectionMode = exports.DistanceResponse = exports.DirectionPointWrapperAndDistance = exports.DirectionPointWrapper = exports.Direction = exports.SearchParams = exports.ApiFilter = exports.MapwizeConfiguration = exports.NavigationInfo = exports.OfflineRegion = exports.NavigationProp = exports.DirectionProp = exports.MarkerProp = exports.PlaceStyleProp = exports.DownloadDataOptions = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * MapwizeApi is the entry point to retrieve Mapwize data from the Mapwize backend.
 * It can be instantiated using CreateMapwizeAPI(mapwizeConfiguration:MapwizeConfiguration)
 */

/**
 * OfflineManager is the entry point to download Mapwize offline data.
 * It can be instantiated using createOfflineManager(mapwizeConfiguration:MapwizeConfiguration)
 */
class DownloadDataOptions {
  constructor(venue, universe, minZoom = 18, maxZoom = 23) {
    _defineProperty(this, "venue", void 0);

    _defineProperty(this, "universe", void 0);

    _defineProperty(this, "minZoom", void 0);

    _defineProperty(this, "maxZoom", void 0);

    this.venue = venue;
    this.universe = universe;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
  }

}
/*
MapView direct methods
*/


exports.DownloadDataOptions = DownloadDataOptions;

/**
 * PlaceStyleProp contains required properties to set a custom style for a place
 */
class PlaceStyleProp {
  constructor(placeId, style) {
    _defineProperty(this, "placeId", void 0);

    _defineProperty(this, "style", void 0);

    this.placeId = placeId;
    this.style = style;
  }

}
/**
 * MarkerProp contains required properties to display markers on the map
 */


exports.PlaceStyleProp = PlaceStyleProp;

class MarkerProp {
  constructor(position, markerName) {
    _defineProperty(this, "position", void 0);

    _defineProperty(this, "markerName", void 0);

    this.position = position;
    this.markerName = markerName;
  }

}
/**
 * DirectionProp contains required properties to display a direction on the map
 */


exports.MarkerProp = MarkerProp;

class DirectionProp {
  constructor(direction, directionOptions) {
    _defineProperty(this, "direction", void 0);

    _defineProperty(this, "directionOptions", void 0);

    this.direction = direction;
    this.directionOptions = directionOptions;
  }

}
/**
 * NavigationProp contains required properties to display a navigation on the map
 */


exports.DirectionProp = DirectionProp;

class NavigationProp {
  constructor(destination, directionMode, directionOptions, maxDistanceBeforeRecompute) {
    _defineProperty(this, "destination", void 0);

    _defineProperty(this, "directionMode", void 0);

    _defineProperty(this, "directionOptions", void 0);

    _defineProperty(this, "maxDistanceBeforeRecompute", void 0);

    this.destination = destination;
    this.directionMode = directionMode;
    this.directionOptions = directionOptions;
    this.maxDistanceBeforeRecompute = maxDistanceBeforeRecompute;
  }

}
/**
 * OfflineRegion contains information about the downloaded (Venue,universe) pair.
 * You should not create an OfflineRegion info yourself.
 */


exports.NavigationProp = NavigationProp;

class OfflineRegion {
  constructor(venue, universe, minZoom = 18, maxZoom = 23) {
    _defineProperty(this, "venue", void 0);

    _defineProperty(this, "universe", void 0);

    _defineProperty(this, "minZoom", void 0);

    _defineProperty(this, "maxZoom", void 0);

    this.venue = venue;
    this.universe = universe;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
  }

}
/**
 * NavigationInfo contains information about the current Navigation such as the remaining distance, duration.
 * You should not create a Navigation info yourself.
 */


exports.OfflineRegion = OfflineRegion;

class NavigationInfo {
  constructor(duration, distance, locationDelta, originalLocation, snappedLocation) {
    _defineProperty(this, "duration", void 0);

    _defineProperty(this, "distance", void 0);

    _defineProperty(this, "locationDelta", void 0);

    _defineProperty(this, "originalLocation", void 0);

    _defineProperty(this, "snappedLocation", void 0);

    this.duration = duration;
    this.distance = distance;
    this.locationDelta = locationDelta;
    this.originalLocation = originalLocation;
    this.snappedLocation = snappedLocation;
  }

}
/**
 * Internal use only
 */


exports.NavigationInfo = NavigationInfo;

/**
 * Mapwize Configuration contains properties that are required to use the map and the api.
 */
class MapwizeConfiguration {
  constructor(apiKey) {
    _defineProperty(this, "objectClass", 'MapwizeConfiguration');

    _defineProperty(this, "apiKey", void 0);

    _defineProperty(this, "serverUrl", void 0);

    _defineProperty(this, "styleUrl", void 0);

    _defineProperty(this, "cacheSize", void 0);

    _defineProperty(this, "refreshInterval", void 0);

    _defineProperty(this, "telemetryEnabled", void 0);

    this.apiKey = apiKey;
    this.telemetryEnabled = true;
  }

  setServerUrl(serverUrl) {
    this.serverUrl = serverUrl;
    return this;
  }

  setStyleUrl(styleUrl) {
    this.styleUrl = styleUrl;
    return this;
  }

  setCacheSize(cacheSize) {
    this.cacheSize = cacheSize;
    return this;
  }

  setRefreshInterval(refreshInterval) {
    this.refreshInterval = refreshInterval;
    return this;
  }

  setTelemetryEnabled(telemetryEnabled) {
    this.telemetryEnabled = telemetryEnabled;
    return this;
  }

}
/**
 * ApiFilter are used in the Api to limit the result to intersting value for you
 */


exports.MapwizeConfiguration = MapwizeConfiguration;

class ApiFilter {
  constructor() {
    _defineProperty(this, "objectClass", 'ApiFilter');

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "universeId", void 0);

    _defineProperty(this, "organizationId", void 0);

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "venueIds", void 0);

    _defineProperty(this, "isVisible", void 0);

    _defineProperty(this, "alias", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "latitudeMin", void 0);

    _defineProperty(this, "latitudeMax", void 0);

    _defineProperty(this, "longitudeMin", void 0);

    _defineProperty(this, "longitudeMax", void 0);
  }

  setVenueId(venueId) {
    this.venueId = venueId;
    return this;
  }

  setUniverseId(universeId) {
    this.universeId = universeId;
    return this;
  }

  setOrganizationId(organizationId) {
    this.organizationId = organizationId;
    return this;
  }

  setFloor(floor) {
    this.floor = floor;
    return this;
  }

  setVenueIds(venueIds) {
    this.venueIds = venueIds;
    return this;
  }

  setIsVisible(isVisible) {
    this.isVisible = isVisible;
    return this;
  }

  setName(name) {
    this.name = name;
    return this;
  }

  setLatitudeMin(latitudeMin) {
    this.latitudeMin = latitudeMin;
    return this;
  }

  setLatitudeMax(latitudeMax) {
    this.latitudeMax = latitudeMax;
    return this;
  }

  setLongitudeMin(longitudeMin) {
    this.longitudeMin = longitudeMin;
    return this;
  }

  setLongitudeMax(longitudeMax) {
    this.longitudeMax = longitudeMax;
    return this;
  }

}
/**
 * SearchParams contains properties that allow you to search points of interest
 */


exports.ApiFilter = ApiFilter;

class SearchParams {
  constructor(query) {
    _defineProperty(this, "objectClass", 'SearchParams');

    _defineProperty(this, "query", void 0);

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "venueIds", void 0);

    _defineProperty(this, "organizationId", void 0);

    _defineProperty(this, "universeId", void 0);

    _defineProperty(this, "objectClasses", void 0);

    this.query = query;
  }

  setVenueId(venueId) {
    this.venueId = venueId;
    return this;
  }

  setVenueIds(venueIds) {
    this.venueIds = venueIds;
    return this;
  }

  setOrganizationId(organizationId) {
    this.organizationId = organizationId;
    return this;
  }

  setUniverseId(universeId) {
    this.universeId = universeId;
    return this;
  }

  setObjectClasses(objectClasses) {
    this.objectClasses = objectClasses;
    return this;
  }

}
/**
 * Direction that can be displayed on the map.
 * This object is provided by the Api.getDirection method. You should not instantiate it yourself
 */


exports.SearchParams = SearchParams;

class Direction {
  constructor(from, to, distance, traveltime, route, bounds, waypoints, subdirections, mode) {
    _defineProperty(this, "objectClass", 'Direction');

    _defineProperty(this, "from", void 0);

    _defineProperty(this, "to", void 0);

    _defineProperty(this, "distance", void 0);

    _defineProperty(this, "traveltime", void 0);

    _defineProperty(this, "route", void 0);

    _defineProperty(this, "bounds", void 0);

    _defineProperty(this, "waypoints", void 0);

    _defineProperty(this, "subdirections", void 0);

    _defineProperty(this, "mode", void 0);

    this.from = from;
    this.to = to;
    this.distance = distance;
    this.traveltime = traveltime;
    this.route = route;
    this.bounds = bounds;
    this.waypoints = waypoints;
    this.subdirections = subdirections;
    this.mode = mode;
  }

}
/**
 * DirectionPointWrapper are you by the SDK when working with direction.
 * You should not instantiate it yourself
 */


exports.Direction = Direction;

class DirectionPointWrapper {
  constructor(latitude, longitude, floor, venueId, placeId, placeListId) {
    _defineProperty(this, "objectClass", 'DirectionPointWrapper');

    _defineProperty(this, "latitude", void 0);

    _defineProperty(this, "longitude", void 0);

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "placeId", void 0);

    _defineProperty(this, "placeListId", void 0);

    this.latitude = latitude;
    this.longitude = longitude;
    this.floor = floor;
    this.venueId = venueId;
    this.placeId = placeId;
    this.placeListId = placeListId;
  }

}
/**
 * DirectionPointWrapperAndDistance are you by the SDK when working with distances.
 * You should not instantiate it yourself
 */


exports.DirectionPointWrapper = DirectionPointWrapper;

class DirectionPointWrapperAndDistance extends DirectionPointWrapper {
  constructor(distance, traveltime, latitude, longitude, floor, venueId, placeId, placeListId) {
    super(latitude, longitude, floor, venueId, placeId, placeListId);

    _defineProperty(this, "objectClass", 'DirectionPointWrapperAndDistance');

    _defineProperty(this, "distance", void 0);

    _defineProperty(this, "traveltime", void 0);

    this.distance = distance;
    this.traveltime = traveltime;
  }

}
/**
 * DistanceResponse is returned by the Api.getDistance method.
 * You should not instantiate it yourself
 */


exports.DirectionPointWrapperAndDistance = DirectionPointWrapperAndDistance;

class DistanceResponse {
  constructor(from, distances) {
    _defineProperty(this, "objectClass", 'DistanceResponse');

    _defineProperty(this, "from", void 0);

    _defineProperty(this, "distances", void 0);

    this.from = from;
    this.distances = distances;
  }

}
/**
 * DirectionMode are accessible through the SDK and can be used in the Api.getDirection and Api.getDistance methods
 * You should not instantiate it yourself.
 */


exports.DistanceResponse = DistanceResponse;

class DirectionMode {
  // TODO icon: Image ?
  constructor(_id, name, averageSpeed, type) {
    _defineProperty(this, "objectClass", 'DirectionMode');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "averageSpeed", void 0);

    _defineProperty(this, "type", void 0);

    this._id = _id;
    this.name = name;
    this.averageSpeed = averageSpeed;
    this.type = type;
  }

}

exports.DirectionMode = DirectionMode;

class Floor {
  constructor(number, name) {
    _defineProperty(this, "objectClass", 'Floor');

    _defineProperty(this, "number", void 0);

    _defineProperty(this, "name", void 0);

    this.number = number;
    this.name = name;
  }

}

exports.Floor = Floor;

class Route {
  constructor(floor, fromFloor, toFloor, isStart, isEnd, traveltime, timeToEnd, distance, bounds, connectorTypeTo, connectorTypeFrom, path) {
    _defineProperty(this, "objectClass", 'Route');

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "fromFloor", void 0);

    _defineProperty(this, "toFloor", void 0);

    _defineProperty(this, "isStart", void 0);

    _defineProperty(this, "isEnd", void 0);

    _defineProperty(this, "traveltime", void 0);

    _defineProperty(this, "timeToEnd", void 0);

    _defineProperty(this, "distance", void 0);

    _defineProperty(this, "bounds", void 0);

    _defineProperty(this, "connectorTypeTo", void 0);

    _defineProperty(this, "connectorTypeFrom", void 0);

    _defineProperty(this, "path", void 0);

    this.floor = floor;
    this.fromFloor = fromFloor;
    this.toFloor = toFloor;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.traveltime = traveltime;
    this.timeToEnd = timeToEnd;
    this.distance = distance;
    this.bounds = bounds;
    this.connectorTypeTo = connectorTypeTo;
    this.connectorTypeFrom = connectorTypeFrom;
    this.path = path;
  }

}
/**
 * Interface used to represent Mapwize Object that can be used as DirectionPoint
 */


exports.Route = Route;

/**
 * LatLng represent a geo coordinate
 */
class LatLng {
  constructor(latitude, longitude) {
    _defineProperty(this, "objectClass", 'LatLng');

    _defineProperty(this, "latitude", void 0);

    _defineProperty(this, "longitude", void 0);

    this.latitude = latitude;
    this.longitude = longitude;
  }

}
/**
 * LatLngFloor represent a geo coordinate with a floor in order to work inside building
 */


exports.LatLng = LatLng;

class LatLngFloor extends LatLng {
  constructor(latitude, longitude, floor) {
    super(latitude, longitude);

    _defineProperty(this, "objectClass", 'LatLngFloor');

    _defineProperty(this, "floor", void 0);

    this.floor = floor;
  }

}
/**
 * LagLngFloorInVenue represent a geo coordinate with a floor and a specific venue. It may be useful with Api.getDirection and Api.getDistance
 */


exports.LatLngFloor = LatLngFloor;

class LatLngFloorInVenue extends LatLngFloor {
  constructor(venueId, latitude, longitude, floor) {
    super(latitude, longitude, floor);

    _defineProperty(this, "objectClass", 'LatLngFloorInVenue');

    _defineProperty(this, "venueId", void 0);

    this.venueId = venueId;
  }

}
/**
 * Reprensents Bounding box
 */


exports.LatLngFloorInVenue = LatLngFloorInVenue;

class LatLngBounds {
  constructor(southWest, northEast) {
    _defineProperty(this, "objectClass", 'LatLngBounds');

    _defineProperty(this, "southWest", void 0);

    _defineProperty(this, "northEast", void 0);

    this.southWest = southWest;
    this.northEast = northEast;
  }

}
/**
 * Layer reprensent a floor plan. Layers are provided by the SDK and Api.
 * You should instantiate it yourself.
 */


exports.LatLngBounds = LatLngBounds;

class Layer {
  constructor(_id, name, floor, type, venueId, universes, order, bounds, minZoom, maxZoom) {
    _defineProperty(this, "objectClass", 'Layer');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "universes", void 0);

    _defineProperty(this, "order", void 0);

    _defineProperty(this, "bounds", void 0);

    _defineProperty(this, "minZoom", void 0);

    _defineProperty(this, "maxZoom", void 0);

    this._id = _id;
    this.name = name;
    this.floor = floor;
    this.type = type;
    this.venueId = venueId;
    this.universes = universes;
    this.order = order;
    this.bounds = bounds;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
  }

}

exports.Layer = Layer;

class MapwizeIcon {
  constructor(iconKey, iconBase64) {
    _defineProperty(this, "objectClass", 'MapwizeIcon');

    _defineProperty(this, "iconKey", void 0);

    _defineProperty(this, "iconBase64", void 0);

    this.iconKey = iconKey;
    this.iconBase64 = iconBase64;
  }

}
/**
 * Universe are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.MapwizeIcon = MapwizeIcon;

class Universe {
  constructor(_id, name) {
    _defineProperty(this, "objectClass", 'Universe');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "name", void 0);

    this._id = _id;
    this.name = name;
  }

}
/**
 * Organization are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Universe = Universe;

class Organization {
  constructor(_id, name) {
    _defineProperty(this, "objectClass", 'Organization');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "name", void 0);

    this._id = _id;
    this.name = name;
  }

}
/**
 * Translation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Organization = Organization;

class Translation {
  constructor(_id, title, subtitle, details, language) {
    _defineProperty(this, "objectClass", 'Translation');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "subtitle", void 0);

    _defineProperty(this, "details", void 0);

    _defineProperty(this, "language", void 0);

    this._id = _id;
    this.title = title;
    this.subtitle = subtitle;
    this.details = details;
    this.language = language;
  }

}

exports.Translation = Translation;

/**
 * Place are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
class Place {
  constructor(_id, venueId, name, alias, iconUrl, universes, translations, translation, iconBase64, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeWidth, markerDisplay, order, floor, isSearchable, isVisible, isClickable, markerCoordinate, entranceCoordinate, placeTypeId, minZoom, maxZoom) {
    _defineProperty(this, "objectClass", 'Place');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "alias", void 0);

    _defineProperty(this, "iconUrl", void 0);

    _defineProperty(this, "universes", void 0);

    _defineProperty(this, "translations", void 0);

    _defineProperty(this, "translation", void 0);

    _defineProperty(this, "iconBase64", void 0);

    _defineProperty(this, "fillColor", void 0);

    _defineProperty(this, "fillOpacity", void 0);

    _defineProperty(this, "strokeColor", void 0);

    _defineProperty(this, "strokeOpacity", void 0);

    _defineProperty(this, "strokeWidth", void 0);

    _defineProperty(this, "markerDisplay", void 0);

    _defineProperty(this, "order", void 0);

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "isSearchable", void 0);

    _defineProperty(this, "isVisible", void 0);

    _defineProperty(this, "isClickable", void 0);

    _defineProperty(this, "markerCoordinate", void 0);

    _defineProperty(this, "entranceCoordinate", void 0);

    _defineProperty(this, "placeTypeId", void 0);

    _defineProperty(this, "minZoom", void 0);

    _defineProperty(this, "maxZoom", void 0);

    _defineProperty(this, "data", void 0);

    this._id = _id;
    this.venueId = venueId;
    this.name = name;
    this.alias = alias;
    this.iconUrl = iconUrl;
    this.universes = universes;
    this.translations = translations;
    this.translation = translation;
    this.iconBase64 = iconBase64;
    this.fillColor = fillColor;
    this.fillOpacity = fillOpacity;
    this.strokeColor = strokeColor;
    this.strokeOpacity = strokeOpacity;
    this.strokeWidth = strokeWidth;
    this.markerDisplay = markerDisplay;
    this.order = order;
    this.floor = floor;
    this.isSearchable = isSearchable;
    this.isVisible = isVisible;
    this.isClickable = isClickable;
    this.markerCoordinate = markerCoordinate;
    this.entranceCoordinate = entranceCoordinate;
    this.placeTypeId = placeTypeId;
    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
  }

}
/**
 * Venue are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Place = Place;

class Venue {
  constructor(_id, name, alias, iconUrl, universes, translations, translation, defaultLanguage, supportedLanguages, iconBase64, markerCoordinate, defaultCenter, defaultZoom, defaultFloor, defaultBearing, defaultPitch) {
    _defineProperty(this, "objectClass", 'Venue');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "alias", void 0);

    _defineProperty(this, "iconUrl", void 0);

    _defineProperty(this, "universes", void 0);

    _defineProperty(this, "translations", void 0);

    _defineProperty(this, "translation", void 0);

    _defineProperty(this, "defaultLanguage", void 0);

    _defineProperty(this, "supportedLanguages", void 0);

    _defineProperty(this, "iconBase64", void 0);

    _defineProperty(this, "markerCoordinate", void 0);

    _defineProperty(this, "defaultCenter", void 0);

    _defineProperty(this, "defaultZoom", void 0);

    _defineProperty(this, "defaultFloor", void 0);

    _defineProperty(this, "defaultBearing", void 0);

    _defineProperty(this, "defaultPitch", void 0);

    _defineProperty(this, "data", void 0);

    this._id = _id;
    this.name = name;
    this.alias = alias;
    this.iconUrl = iconUrl;
    this.universes = universes;
    this.translations = translations;
    this.translation = translation;
    this.defaultLanguage = defaultLanguage;
    this.supportedLanguages = supportedLanguages;
    this.iconBase64 = iconBase64;
    this.markerCoordinate = markerCoordinate;
    this.defaultCenter = defaultCenter;
    this.defaultZoom = defaultZoom;
    this.defaultFloor = defaultFloor;
    this.defaultBearing = defaultBearing;
    this.defaultPitch = defaultPitch;
  }

}
/**
 * Placelist are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Venue = Venue;

class Placelist {
  constructor(_id, venueId, name, alias, iconUrl, universes, translations, translation, placeIds, isSearchable, data) {
    _defineProperty(this, "objectClass", 'Placelist');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "venueId", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "alias", void 0);

    _defineProperty(this, "iconUrl", void 0);

    _defineProperty(this, "universes", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "translations", void 0);

    _defineProperty(this, "translation", void 0);

    _defineProperty(this, "placeIds", void 0);

    _defineProperty(this, "isSearchable", void 0);

    this._id = _id;
    this.venueId = venueId;
    this.name = name;
    this.alias = alias;
    this.iconUrl = iconUrl;
    this.universes = universes;
    this.translations = translations;
    this.translation = translation;
    this.placeIds = placeIds;
    this.isSearchable = isSearchable;
    this.data = data;
  }

}
/**
 * Style contains properties that allow you to update dynamically the aspect of a place.
 */


exports.Placelist = Placelist;

class Style {
  constructor(iconName, fillColor, fillOpacity, strokeColor, strokeOpacity, strokeWidth, markerDisplay, shapeDisplay, title) {
    _defineProperty(this, "objectClass", 'Style');

    _defineProperty(this, "iconName", void 0);

    _defineProperty(this, "fillColor", void 0);

    _defineProperty(this, "fillOpacity", void 0);

    _defineProperty(this, "strokeColor", void 0);

    _defineProperty(this, "strokeOpacity", void 0);

    _defineProperty(this, "strokeWidth", void 0);

    _defineProperty(this, "markerDisplay", void 0);

    _defineProperty(this, "shapeDisplay", void 0);

    _defineProperty(this, "title", void 0);

    this.iconName = iconName;
    this.fillColor = fillColor;
    this.fillOpacity = fillOpacity;
    this.strokeColor = strokeColor;
    this.strokeOpacity = strokeOpacity;
    this.strokeWidth = strokeWidth;
    this.markerDisplay = markerDisplay;
    this.shapeDisplay = shapeDisplay;
    this.title = title;
  }

}
/**
 * UserInfo are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Style = Style;

class UserInfo {
  constructor(displayName, email, organizations) {
    _defineProperty(this, "objectClass", 'UserInfo');

    _defineProperty(this, "displayName", void 0);

    _defineProperty(this, "email", void 0);

    _defineProperty(this, "organizations", void 0);

    this.displayName = displayName;
    this.email = email;
    this.organizations = organizations;
  }

}
/**
 * ClickEvent are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.UserInfo = UserInfo;

class ClickEvent {
  constructor(eventType, latLngFloor, placePreview, venuePreview) {
    _defineProperty(this, "objectClass", 'ClickEvent');

    _defineProperty(this, "eventType", void 0);

    _defineProperty(this, "latLngFloor", void 0);

    _defineProperty(this, "placePreview", void 0);

    _defineProperty(this, "venuePreview", void 0);

    this.eventType = eventType;
    this.latLngFloor = latLngFloor;
    this.placePreview = placePreview;
    this.venuePreview = venuePreview;
  }

}
/**
 * PlacePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.ClickEvent = ClickEvent;

class PlacePreview {
  constructor(_id, title, subtitle, iconUrl, defaultCenter, defaultZoom) {
    _defineProperty(this, "objectClass", 'PlacePreview');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "subtitle", void 0);

    _defineProperty(this, "iconUrl", void 0);

    _defineProperty(this, "defaultCenter", void 0);

    _defineProperty(this, "defaultZoom", void 0);

    this._id = _id;
    this.title = title;
    this.subtitle = subtitle;
    this.iconUrl = iconUrl;
    this.defaultCenter = defaultCenter;
    this.defaultZoom = defaultZoom;
  }

}
/**
 * VenuePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.PlacePreview = PlacePreview;

class VenuePreview {
  constructor(_id, title, iconUrl, defaultCenter, defaultZoom, defaultBearing, defaultPitch, defaultFloor) {
    _defineProperty(this, "objectClass", 'VenuePreview');

    _defineProperty(this, "_id", void 0);

    _defineProperty(this, "title", void 0);

    _defineProperty(this, "iconUrl", void 0);

    _defineProperty(this, "defaultCenter", void 0);

    _defineProperty(this, "defaultZoom", void 0);

    _defineProperty(this, "defaultBearing", void 0);

    _defineProperty(this, "defaultPitch", void 0);

    _defineProperty(this, "defaultFloor", void 0);

    this._id = _id;
    this.title = title;
    this.iconUrl = iconUrl;
    this.defaultCenter = defaultCenter;
    this.defaultZoom = defaultZoom;
    this.defaultBearing = defaultBearing;
    this.defaultPitch = defaultPitch;
    this.defaultFloor = defaultFloor;
  }

}
/**
 * DirectionOptions contains property that can be used to configured the camera and icon when starting a direction or a navigation
 */


exports.VenuePreview = VenuePreview;

class DirectionOptions {
  constructor() {
    _defineProperty(this, "objectClass", 'DirectionOptions');

    _defineProperty(this, "endMarkerIconName", void 0);

    _defineProperty(this, "displayEndMarker", void 0);

    _defineProperty(this, "centerOnStart", void 0);

    _defineProperty(this, "displayStartingFloor", void 0);

    this.endMarkerIconName = '';
    this.displayEndMarker = true;
    this.centerOnStart = true;
    this.displayStartingFloor = true;
  }

  setEndMarkerIconName(endMarkerIconName) {
    this.endMarkerIconName = endMarkerIconName;
    return this;
  }

  setDisplayEndMarker(displayEndMarker) {
    this.displayEndMarker = displayEndMarker;
    return this;
  }

  setCenterOnStart(centerOnStart) {
    this.centerOnStart = centerOnStart;
    return this;
  }

  setDisplayStartingFloor(displayStartingFloor) {
    this.displayStartingFloor = displayStartingFloor;
    return this;
  }

}
/**
 * MapOptions contains property to configure the initial state of the map.
 */


exports.DirectionOptions = DirectionOptions;

class MapOptions {
  constructor() {
    _defineProperty(this, "objectClass", 'MapOptions');

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "language", void 0);

    _defineProperty(this, "universeId", void 0);

    _defineProperty(this, "centerOnVenueId", void 0);

    _defineProperty(this, "centerOnPlaceId", void 0);

    _defineProperty(this, "restrictContentToVenueIds", void 0);

    _defineProperty(this, "restrictContentToOrganizationId", void 0);

    _defineProperty(this, "logoClickable", void 0);
  }

  setFloor(floor) {
    this.floor = floor;
    return this;
  }

  setLanguage(language) {
    this.language = language;
    return this;
  }

  setUniverseId(universeId) {
    this.universeId = universeId;
    return this;
  }

  setCenterOnVenueId(centerOnVenueId) {
    this.centerOnVenueId = centerOnVenueId;
    return this;
  }

  setCenterOnPlaceId(centerOnPlaceId) {
    this.centerOnPlaceId = centerOnPlaceId;
    return this;
  }

  setRestrictContentToVenueIds(restrictContentToVenueIds) {
    this.restrictContentToVenueIds = restrictContentToVenueIds;
    return this;
  }

  setRestrictContentToOrganizationId(restrictContentToOrganizationId) {
    this.restrictContentToOrganizationId = restrictContentToOrganizationId;
    return this;
  }

  setLogoClickable(logoClickable) {
    this.logoClickable = logoClickable;
    return this;
  }

}
/**
 * Marker are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.MapOptions = MapOptions;

class Marker {
  constructor(position, markerIconName) {
    _defineProperty(this, "objectClass", 'Marker');

    _defineProperty(this, "position", void 0);

    _defineProperty(this, "markerIconName", void 0);

    _defineProperty(this, "uuid", void 0);

    _defineProperty(this, "placePreview", void 0);

    this.position = position;
    this.markerIconName = markerIconName;
  }

}
/**
 * FollowUserMode are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.Marker = Marker;

class FollowUserMode {
  constructor(followUserMode) {
    _defineProperty(this, "objectClass", 'FollowUserMode');

    _defineProperty(this, "followUserMode", void 0);

    this.followUserMode = followUserMode;
  }

}
/**
 * IndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.FollowUserMode = FollowUserMode;

class IndoorLocation {
  constructor(provider, latitude, longitude, floor, time) {
    _defineProperty(this, "objectClass", 'IndoorLocation');

    _defineProperty(this, "provider", void 0);

    _defineProperty(this, "latitude", void 0);

    _defineProperty(this, "longitude", void 0);

    _defineProperty(this, "floor", void 0);

    _defineProperty(this, "time", void 0);

    this.provider = provider;
    this.latitude = latitude;
    this.longitude = longitude;
    this.floor = floor;
    this.time = time;
  }

}
/**
 * MapwizeIndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */


exports.IndoorLocation = IndoorLocation;

class MapwizeIndoorLocation extends IndoorLocation {
  constructor(provider, latitude, longitude, floor, time) {
    super(provider, latitude, longitude, floor, time);

    _defineProperty(this, "objectClass", 'MapwizeIndoorLocation');
  }

}

exports.MapwizeIndoorLocation = MapwizeIndoorLocation;
//# sourceMappingURL=types.js.map