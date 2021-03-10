import type { StyleProp, ViewStyle } from 'react-native'

/**
 * MapwizeApi is the entry point to retrieve Mapwize data from the Mapwize backend.
 * It can be instantiated using CreateMapwizeAPI(mapwizeConfiguration:MapwizeConfiguration)
 */
export interface MapwizeApi {
  /**
   * Gain access to private building using an access key
   */
  getAccess: (accessKey: string) => Promise<boolean>
  /**
   * Get the list of universes that are accessible for this venue
   */
  getAccessibleUniversesForVenue: (venue: Venue) => Promise<Universe[]>
  /**
   * Get the direction between a starting point and a destination.
   * The destination can be one or multiple DirectionPoint
   * You can optionally add some waypoints
   */
  getDirection: (
    from: DirectionPoint,
    to: DirectionPoint | DirectionPoint[],
    mode: DirectionMode,
    waypoints?: DirectionPoint[],
    waypointsOptimize?: boolean
  ) => Promise<Direction>
  /**
   * Get the distances between a starting point and a list of destination
   */
  getDistances: (
    from: DirectionPoint,
    to: DirectionPoint[],
    directionMode: DirectionMode,
    sortByTraveltime: boolean
  ) => Promise<DistanceResponse>
  /**
   * Get a layer using its id
   */
  getLayer: (id: string) => Promise<Layer>
  /**
   * Get a layer using its name. As a layer name is only unique in a specific venue, you have to pass this venue as parameter
   */
  getLayerWithName: (name: string, venue: Venue) => Promise<Layer>
  /**
   * Get a layer using its alias. As a layer alias is only unique in a specific venue, you have to pass this venue as parameter
   */
  getLayerWithAlias: (alias: string, venue: Venue) => Promise<Layer>
  /**
   * Get all the layers that match the ApiFilter
   */
  getLayers: (params: ApiFilter) => Promise<Layer[]>
  /**
   * Get the main froms for the specific venue
   */
  getMainFroms: (venue: Venue) => Promise<Place[]>
  /**
   * Get the main searches for the specific venue
   */
  getMainSearches: (venue: Venue) => Promise<MapwizeObject[]>
  /**
   * Get a place details using the place id
   */
  getPlaceDetails: (id: string) => Promise<PlaceDetails>
  /**
   * Get a place using its id
   */
  getPlace: (id: string) => Promise<Place>
  /**
   * Get a place using its name. As a place name is only unique in a specific venue, you have to pass this venue as parameter
   */
  getPlaceWithName: (name: string, venue: Venue) => Promise<Place>
  /**
   * Get a place using its alias. As a place alias is only unique in a specific venue, you have to pass this venue as parameter
   */
  getPlaceWithAlias: (alias: string, venue: Venue) => Promise<Place>
  /**
   * Get all the places that match the ApiFilter
   */
  getPlaces: (params: ApiFilter) => Promise<Place[]>
  /**
   * Get all places contained in the placelist
   */
  getPlacesForPlacelist: (placelist: Placelist) => Promise<Place[]>
  /**
   * Get a placelist using its id
   */
  getPlacelist: (id: string) => Promise<Placelist>
  /**
   * Get a placelist using its name. As a placelist name is only unique in a specific venue, you have to pass this venue as parameter
   */
  getPlacelistWithName: (name: string, venue: Venue) => Promise<Placelist>
  /**
   * Get a placelist using its alias. As a placelist alias is only unique in a specific venue, you have to pass this venue as parameter
   */
  getPlacelistWithAlias: (alias: string, venue: Venue) => Promise<Placelist>
  /**
   * Get all the placelists that match the ApiFilter
   */
  getPlacelists: (filter: ApiFilter) => Promise<Placelist[]>
  /**
   * Get a venue using its id
   */
  getVenue: (id: string) => Promise<Venue>
  /**
   * Get a venue using its name
   */
  getVenueWithName: (name: string) => Promise<Venue>
  /**
   * Get a venue using its alias
   */
  getVenueWithAlias: (alias: string) => Promise<Venue>
  /**
   * Get all venue that match the ApiFilter
   */
  getVenues: (filter: ApiFilter) => Promise<Venue[]>
  /**
   * Get search result using the SearchParams
   */
  search: (searchParams: SearchParams) => Promise<MapwizeObject[]>
}
/**
 * OfflineManager is the entry point to download Mapwize offline data.
 * It can be instantiated using createOfflineManager(mapwizeConfiguration:MapwizeConfiguration)
 */
export interface OfflineManager {
  /**
   * Download offline data for the given (venue, universe) pair
   */
  downloadData: (
    offlineRegion: OfflineRegion,
    onProgress: (progress: number) => void
  ) => Promise<OfflineRegion>
  /**
   * Update the offline data for a given offline region if something has changed.
   */
  updateData: (
    offlineRegion: OfflineRegion,
    onProgress: (progress: number) => void
  ) => Promise<OfflineRegion>
  /**
   * Check if a pair of venue universe is accessible offline
   * @param venue  the venue to be downloaded.
   * @param universe  the universe to be downloaded.
   */
  hasOfflineRegion: (venue: Venue, universe: Universe) => Promise<boolean>
  /**
   * Get an offline region using a (venue, universe) pair
   * @param venue  the venue to be downloaded.
   * @param universe  the universe to be downloaded.
   */
  getOfflineRegion: (venue: Venue, universe: Universe) => Promise<OfflineRegion>
  /**
   * Get all the offline regions
   */
  getOfflineRegions: () => Promise<OfflineRegion[]>
  /**
   * remove an offline region
   */
  removeData: (offlineRegion: OfflineRegion) => Promise<void>
  /**
   * check if there is an update for a given offline region
   */
  checkForUpdate: (offlineRegion: OfflineRegion) => Promise<Boolean>
}
/*
MapView direct methods
*/
export interface MapwizeViewRef {
  /**
   * Add an image to the map in order to be able to use its name in other Mapwize method/props
   */
  addImageToMap: (imageName: string, imageBase64: string) => void

  /**
   * Gain access to private building using an access key
   */
  grantAccess: (accessKey: string) => Promise<void>

  /**
   * Center on a specific location.
   * @param position Can be a LatLngFloor, a Place, a PlacePreview, a Venue or a VenuePreview
   * @param zoom Optional the targeted camera zoom level. Default value is 18
   * @param animated Optional If true, the camera movement will be animated. Default is true
   */
  centerOn: (
    position: LatLngFloor | Place | PlacePreview | VenuePreview | Venue,
    zoom?: number,
    animated?: boolean
  ) => void

  /**
   * Set the current displayed floor
   * @param floorNumber that will be set
   */
  setFloor: (floorNumber: number) => void
  /**
   * Get the current displayed floor
   */
  getFloor: () => Promise<Floor>
  /**
   * Get the current accessible floors regarding the venue/universe displayed
   */
  getFloors: () => Promise<Floor[]>

  /**
   * Set the preferred language that should be chosen if available when entering in a venue
   */
  setPreferredLanguage: (language: string) => void
  /**
   * Get the preferred language that should be chosen if available when entering in a venue
   */
  getPreferredLanguage: () => Promise<string>
  /**
   * Set the language for a specific venue
   */
  setLanguageForVenue: (language: string, venue: Venue) => void
  /**
   * Get the language for a specific venue
   */
  getLanguageForVenue: (venue: Venue) => Promise<string>
  /**
   * Get the current language.
   * If in a venue, it will return the language set for this venue.
   * Otherwise, it will return the preferred language.
   */
  getLanguage: () => Promise<string>

  /**
   * Set universe. If in a venue, it will set the universe for this venue.
   * Otherwise, it will set the universe for the next venue you enter in.
   */
  setUniverse: (universe: Universe) => void
  /**
   * Set universe for the specific venue.
   */
  setUniverseForVenue: (universe: Universe, venue: Venue) => void
  /**
   * Get the current universe.
   */
  getUniverse: () => Promise<Universe>
  /**
   * Get the universe for a specific venue.
   */
  getUniverseForVenue: (venue: Venue) => Promise<Universe>
  /**
   * Get the list of accessible universe.
   */
  getUniverses: () => Promise<Universe[]>
  /**
   * Set the follow user mode
   */
  setFollowUserMode: (followUserMode: FollowUserMode) => void
  /**
   * Get the follow user mode
   */
  getFollowUserMode: () => Promise<FollowUserMode>
  /**
   * Get the accessible direction mode for the venue / universe currently displayed
   */
  getDirectionModes: () => Promise<DirectionMode[]>

  /**
   * Zoom to the specified zoom level
   */
  zoomTo: (zoom: number) => void

  /**
   * Get the current zoom level
   */
  getZoom: () => Promise<number>

  /**
   * Reset North
   */
  resetNorth: () => void
}

/*
MapView Props
*/
export interface MapwizeViewProps {
  style?: StyleProp<ViewStyle>
  ref?: React.RefObject<MapwizeViewRef>
  /**
   * The mapwize configuration that will be used for this instance of MapwizeView
   */
  mapwizeConfiguration: MapwizeConfiguration
  /**
   * The map options that will be used to initialized this instance of MapwizeView
   */
  mapOptions?: MapOptions
  /**
   * The user current location
   */
  userLocation?: LatLngFloor | undefined
  /**
   * Markers that are currently displayed on the map.
   */
  markers?: MarkerProp[] | undefined
  /**
   * Places that are currently promoted on the map
   */
  promotedPlaces?: (Place | PlacePreview | Placelist)[] | undefined
  /**
   * Place that is currently selected on the map
   */
  selectedPlace?: Place | PlacePreview | undefined
  /**
   * Custom place styles
   */
  placeStyles?: PlaceStyleProp[] | undefined
  /**
   * Direction that is currentrly displayed on the map
   */
  mapDirection?: DirectionProp | undefined
  /**
   * Navigation that is currentrly displayed on the map
   */
  mapNavigation?: NavigationProp | undefined
  /**
   * Called when the MapwizeMap component is fully load and ready to be used.
   * You can use this method to get the MapwizeViewRef
   */
  onMapLoaded?: (ref: MapwizeViewRef) => void

  /**
   * Called when a venue start loading
   */
  onVenueWillEnter?: (venue: Venue) => void
  /**
   * Called when a venue is loaded
   */
  onVenueEnter?: (venue: Venue) => void
  /**
   * Called when something goes wrong trying to enter in a venue
   */
  onVenueEnterError?: (venue: Venue, error: Error) => void
  /**
   * Called when a venue is exit
   */
  onVenueExit?: (venue: Venue) => void

  /**
   * Called when the accessible universes changed
   */
  onUniversesChange?: (universes: Universe[]) => void
  /**
   * Called when a universe is going to be loaded
   */
  onUniverseWillChange?: (universe: Universe) => void
  /**
   * Called when a universe is loaded
   */
  onUniverseChange?: (universe: Universe) => void
  /**
   * Called when something goes wrong  trying to load a universe
   */
  onUniverseChangeError?: (universe: Universe, error: Error) => void
  /**
   * Called when the accessible floors changed
   */
  onFloorsChange?: (floors: Floor[]) => void
  /**
   * Called when a floor is going to be loaded
   */
  onFloorWillChange?: (floor: Floor) => void
  /**
   * Called when a floor is loaded
   */
  onFloorChange?: (floor: Floor) => void
  /**
   * Called when something goes wrong trying to load a floor
   */
  onFloorChangeError?: (floor: Floor, error: Error) => void
  /**
   * Called when the user click on a marker
   */
  onMarkerClick?: (marker: Marker) => void
  /**
   * Called when the user click on the map
   */
  onMapClick?: (clickEvent: ClickEvent) => void
  /**
   * Called when the follow user mode changed
   */
  onFollowUserModeChange?: (followUserMode: FollowUserMode) => void
  /**
   * Called on entering the venue
   */
  onLanguagesChange?: (languages: string[]) => void
  /**
   * Called when the current language changed
   */
  onLanguageChange?: (language: string) => void
  /**
   * Called when the accessible direction mode changed
   */
  onDirectionModesChange?: (directionModes: DirectionMode[]) => void
  /**
   * Called when a navigation is about to start
   */
  onNavigationWillStart?: () => void
  /**
   * Called when a navigation started
   */
  onNavigationStart?: () => void
  /**
   * Called when a navigation update is avaible
   */
  onNavigationUpdate?: (navigationInfo: NavigationInfo) => void
  /**
   * Called when a navigation stopped
   */
  onNavigationStop?: () => void
  /**
   * Called when something goes wrong with a navigation
   */
  onNavigationError?: (message: string) => void
  /**
   * Called when the map bearing changes
   */
  onCameraChange?: (camera: Camera) => void
}

/**
 * PlaceStyleProp contains required properties to set a custom style for a place
 */
export class PlaceStyleProp {
  placeId: string
  style: Style
  constructor(placeId: string, style: Style) {
    this.placeId = placeId
    this.style = style
  }
}

/**
 * MarkerProp contains required properties to display markers on the map
 */
export class MarkerProp {
  position: LatLngFloor | PlacePreview | Place | Placelist
  markerName?: string
  constructor(
    position: LatLngFloor | PlacePreview | Place | Placelist,
    markerName?: string
  ) {
    this.position = position
    this.markerName = markerName
  }
}

/**
 * DirectionProp contains required properties to display a direction on the map
 */
export class DirectionProp {
  direction: Direction
  directionOptions: DirectionOptions
  constructor(direction: Direction, directionOptions: DirectionOptions) {
    this.direction = direction
    this.directionOptions = directionOptions
  }
}

/**
 * NavigationProp contains required properties to display a navigation on the map
 */
export class NavigationProp {
  destination: DirectionPoint
  directionMode: DirectionMode
  directionOptions: DirectionOptions
  maxDistanceBeforeRecompute?: number
  constructor(
    destination: DirectionPoint,
    directionMode: DirectionMode,
    directionOptions: DirectionOptions,
    maxDistanceBeforeRecompute?: number
  ) {
    this.destination = destination
    this.directionMode = directionMode
    this.directionOptions = directionOptions
    this.maxDistanceBeforeRecompute = maxDistanceBeforeRecompute
  }
}

/**
 * OfflineRegion contains information about the downloaded (Venue,universe) pair.
 * You should not create an OfflineRegion info yourself.
 */
export class OfflineRegion {
  venue: Venue
  universe: Universe
  minZoom?: number
  maxZoom?: number
  constructor(
    venue: Venue,
    universe: Universe,
    minZoom: number = 18,
    maxZoom: number = 23
  ) {
    this.venue = venue
    this.universe = universe
    this.minZoom = minZoom
    this.maxZoom = maxZoom
  }
}

export interface Camera {
  zoomLevel: number
  bearing: number
  tilt: number
  coordinate: LatLngFloor
}

/**
 * NavigationInfo contains information about the current Navigation such as the remaining distance, duration.
 * You should not create a Navigation info yourself.
 */
export class NavigationInfo {
  duration: number
  distance: number
  locationDelta: number
  originalLocation: LatLngFloor
  snappedLocation: LatLngFloor
  constructor(
    duration: number,
    distance: number,
    locationDelta: number,
    originalLocation: LatLngFloor,
    snappedLocation: LatLngFloor
  ) {
    this.duration = duration
    this.distance = distance
    this.locationDelta = locationDelta
    this.originalLocation = originalLocation
    this.snappedLocation = snappedLocation
  }
}

/**
 * Mapwize Configuration contains properties that are required to use the map and the api.
 */
export class MapwizeConfiguration {
  objectClass = 'MapwizeConfiguration'
  apiKey: string
  serverUrl?: string
  styleUrl?: string
  cacheSize?: number
  refreshInterval?: number
  telemetryEnabled: boolean
  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.telemetryEnabled = true
  }
  setServerUrl(serverUrl: string): MapwizeConfiguration {
    this.serverUrl = serverUrl
    return this
  }
  setStyleUrl(styleUrl: string): MapwizeConfiguration {
    this.styleUrl = styleUrl
    return this
  }
  setCacheSize(cacheSize: number): MapwizeConfiguration {
    this.cacheSize = cacheSize
    return this
  }
  setRefreshInterval(refreshInterval: number): MapwizeConfiguration {
    this.refreshInterval = refreshInterval
    return this
  }
  setTelemetryEnabled(telemetryEnabled: boolean): MapwizeConfiguration {
    this.telemetryEnabled = telemetryEnabled
    return this
  }
}

/**
 * ApiFilter are used in the Api to limit the result to intersting value for you
 */
export class ApiFilter {
  objectClass = 'ApiFilter'
  venueId?: string
  universeId?: string
  organizationId?: string
  floor?: number
  venueIds?: Array<string>
  isVisible?: boolean
  alias?: string
  name?: string
  latitudeMin?: number
  latitudeMax?: number
  longitudeMin?: number
  longitudeMax?: number
  constructor() {}
  setVenueId(venueId: string): ApiFilter {
    this.venueId = venueId
    return this
  }
  setUniverseId(universeId: string): ApiFilter {
    this.universeId = universeId
    return this
  }
  setOrganizationId(organizationId: string): ApiFilter {
    this.organizationId = organizationId
    return this
  }
  setFloor(floor: number): ApiFilter {
    this.floor = floor
    return this
  }
  setVenueIds(venueIds: Array<string>): ApiFilter {
    this.venueIds = venueIds
    return this
  }
  setIsVisible(isVisible: boolean): ApiFilter {
    this.isVisible = isVisible
    return this
  }
  setName(name: string): ApiFilter {
    this.name = name
    return this
  }
  setLatitudeMin(latitudeMin: number): ApiFilter {
    this.latitudeMin = latitudeMin
    return this
  }
  setLatitudeMax(latitudeMax: number): ApiFilter {
    this.latitudeMax = latitudeMax
    return this
  }
  setLongitudeMin(longitudeMin: number): ApiFilter {
    this.longitudeMin = longitudeMin
    return this
  }
  setLongitudeMax(longitudeMax: number): ApiFilter {
    this.longitudeMax = longitudeMax
    return this
  }
}

/**
 * SearchParams contains properties that allow you to search points of interest
 */
export class SearchParams {
  objectClass = 'SearchParams'
  query: string
  venueId?: string
  venueIds?: Array<string>
  organizationId?: string
  universeId?: string
  objectClasses?: Array<'place' | 'placelist' | 'venue'>
  constructor(query: string) {
    this.query = query
  }
  setVenueId(venueId?: string): SearchParams {
    this.venueId = venueId
    return this
  }
  setVenueIds(venueIds?: Array<string>): SearchParams {
    this.venueIds = venueIds
    return this
  }
  setOrganizationId(organizationId?: string): SearchParams {
    this.organizationId = organizationId
    return this
  }
  setUniverseId(universeId?: string): SearchParams {
    this.universeId = universeId
    return this
  }
  setObjectClasses(
    objectClasses?: Array<'place' | 'placelist' | 'venue'>
  ): SearchParams {
    this.objectClasses = objectClasses
    return this
  }
}

/**
 * Direction that can be displayed on the map.
 * This object is provided by the Api.getDirection method. You should not instantiate it yourself
 */
export class Direction {
  objectClass = 'Direction'
  from: DirectionPointWrapper
  to: DirectionPointWrapper
  distance: number
  traveltime: number
  route: Array<Route>
  bounds: LatLngBounds
  waypoints: Array<DirectionPointWrapper>
  subdirections: Array<Direction>
  mode: DirectionMode
  constructor(
    from: DirectionPointWrapper,
    to: DirectionPointWrapper,
    distance: number,
    traveltime: number,
    route: Array<Route>,
    bounds: LatLngBounds,
    waypoints: Array<DirectionPointWrapper>,
    subdirections: Array<Direction>,
    mode: DirectionMode
  ) {
    this.from = from
    this.to = to
    this.distance = distance
    this.traveltime = traveltime
    this.route = route
    this.bounds = bounds
    this.waypoints = waypoints
    this.subdirections = subdirections
    this.mode = mode
  }
}

/**
 * DirectionPointWrapper are you by the SDK when working with direction.
 * You should not instantiate it yourself
 */
export class DirectionPointWrapper implements DirectionPoint {
  objectClass = 'DirectionPointWrapper'
  latitude?: number
  longitude?: number
  floor?: number
  venueId?: string
  placeId?: string
  placeListId?: string
  constructor(
    latitude?: number,
    longitude?: number,
    floor?: number,
    venueId?: string,
    placeId?: string,
    placeListId?: string
  ) {
    this.latitude = latitude
    this.longitude = longitude
    this.floor = floor
    this.venueId = venueId
    this.placeId = placeId
    this.placeListId = placeListId
  }
}

/**
 * DirectionPointWrapperAndDistance are you by the SDK when working with distances.
 * You should not instantiate it yourself
 */
export class DirectionPointWrapperAndDistance
  extends DirectionPointWrapper
  implements DirectionPoint {
  objectClass = 'DirectionPointWrapperAndDistance'
  distance: number
  traveltime: number
  constructor(
    distance: number,
    traveltime: number,
    latitude?: number,
    longitude?: number,
    floor?: number,
    venueId?: string,
    placeId?: string,
    placeListId?: string
  ) {
    super(latitude, longitude, floor, venueId, placeId, placeListId)
    this.distance = distance
    this.traveltime = traveltime
  }
}

/**
 * DistanceResponse is returned by the Api.getDistance method.
 * You should not instantiate it yourself
 */
export class DistanceResponse {
  objectClass = 'DistanceResponse'
  from: DirectionPointWrapper
  distances: Array<DirectionPointWrapperAndDistance>
  constructor(
    from: DirectionPointWrapper,
    distances: Array<DirectionPointWrapperAndDistance>
  ) {
    this.from = from
    this.distances = distances
  }
}

/**
 * DirectionMode are accessible through the SDK and can be used in the Api.getDirection and Api.getDistance methods
 * You should not instantiate it yourself.
 */
export class DirectionMode {
  objectClass = 'DirectionMode'
  _id: string
  name: string
  averageSpeed: number
  type: string
  // TODO icon: Image ?
  constructor(_id: string, name: string, averageSpeed: number, type: string) {
    this._id = _id
    this.name = name
    this.averageSpeed = averageSpeed
    this.type = type
  }
}

export class Floor {
  objectClass = 'Floor'
  number: number
  name: string
  constructor(number: number, name: string) {
    this.number = number
    this.name = name
  }
}

export class Route {
  objectClass = 'Route'
  floor: number
  fromFloor: number
  toFloor: number
  isStart: boolean
  isEnd: boolean
  traveltime: number
  timeToEnd: number
  distance: number
  bounds: LatLngBounds
  connectorTypeTo: string
  connectorTypeFrom: string
  path: Array<LatLng>
  constructor(
    floor: number,
    fromFloor: number,
    toFloor: number,
    isStart: boolean,
    isEnd: boolean,
    traveltime: number,
    timeToEnd: number,
    distance: number,
    bounds: LatLngBounds,
    connectorTypeTo: string,
    connectorTypeFrom: string,
    path: Array<LatLng>
  ) {
    this.floor = floor
    this.fromFloor = fromFloor
    this.toFloor = toFloor
    this.isStart = isStart
    this.isEnd = isEnd
    this.traveltime = traveltime
    this.timeToEnd = timeToEnd
    this.distance = distance
    this.bounds = bounds
    this.connectorTypeTo = connectorTypeTo
    this.connectorTypeFrom = connectorTypeFrom
    this.path = path
  }
}

/**
 * Interface used to represent Mapwize Object that can be used as DirectionPoint
 */
export interface DirectionPoint {}

/**
 * LatLng represent a geo coordinate
 */
export class LatLng {
  objectClass = 'LatLng'
  latitude: number
  longitude: number
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }
}

/**
 * LatLngFloor represent a geo coordinate with a floor in order to work inside building
 */
export class LatLngFloor extends LatLng implements DirectionPoint {
  objectClass = 'LatLngFloor'
  floor: number
  constructor(latitude: number, longitude: number, floor: number) {
    super(latitude, longitude)
    this.floor = floor
  }
}

/**
 * LagLngFloorInVenue represent a geo coordinate with a floor and a specific venue. It may be useful with Api.getDirection and Api.getDistance
 */
export class LatLngFloorInVenue extends LatLngFloor implements DirectionPoint {
  objectClass = 'LatLngFloorInVenue'
  venueId: string
  constructor(
    venueId: string,
    latitude: number,
    longitude: number,
    floor: number
  ) {
    super(latitude, longitude, floor)
    this.venueId = venueId
  }
}

/**
 * Reprensents Bounding box
 */
export class LatLngBounds {
  objectClass = 'LatLngBounds'
  southWest: LatLng
  northEast: LatLng
  constructor(southWest: LatLng, northEast: LatLng) {
    this.southWest = southWest
    this.northEast = northEast
  }
}

/**
 * Layer reprensent a floor plan. Layers are provided by the SDK and Api.
 * You should instantiate it yourself.
 */
export class Layer {
  objectClass = 'Layer'
  _id: string
  name: string
  floor: number
  type: string
  venueId: string
  universes: Array<Universe>
  order: number
  bounds: LatLngBounds
  minZoom: number
  maxZoom: number
  constructor(
    _id: string,
    name: string,
    floor: number,
    type: string,
    venueId: string,
    universes: Array<Universe>,
    order: number,
    bounds: LatLngBounds,
    minZoom: number,
    maxZoom: number
  ) {
    this._id = _id
    this.name = name
    this.floor = floor
    this.type = type
    this.venueId = venueId
    this.universes = universes
    this.order = order
    this.bounds = bounds
    this.minZoom = minZoom
    this.maxZoom = maxZoom
  }
}

export class MapwizeIcon {
  objectClass = 'MapwizeIcon'
  iconKey: string
  iconBase64: string
  constructor(iconKey: string, iconBase64: string) {
    this.iconKey = iconKey
    this.iconBase64 = iconBase64
  }
}

/**
 * Universe are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Universe {
  objectClass = 'Universe'
  _id: string
  name: string
  constructor(_id: string, name: string) {
    this._id = _id
    this.name = name
  }
}

/**
 * Organization are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Organization {
  objectClass = 'Organization'
  _id: string
  name: string
  constructor(_id: string, name: string) {
    this._id = _id
    this.name = name
  }
}

/**
 * Translation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Translation {
  objectClass = 'Translation'
  _id: string
  title: string
  subtitle: string
  details: string
  language: string
  constructor(
    _id: string,
    title: string,
    subtitle: string,
    details: string,
    language: string
  ) {
    this._id = _id
    this.title = title
    this.subtitle = subtitle
    this.details = details
    this.language = language
  }
}

export interface MapwizeObject {
  objectClass: string
  _id: string
  name: string
  alias: string
  iconUrl: string
  universes: Array<Universe>
  data?: Map<string, any>
  translations: Array<Translation>
  translation: (language: string) => Translation
}

/**
 * Place are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Place implements MapwizeObject {
  objectClass = 'Place'
  _id: string
  venueId: string
  name: string
  alias: string
  iconUrl: string
  universes: Universe[]
  translations: Translation[]
  translation: (language: string) => Translation
  iconBase64: string
  fillColor: string
  fillOpacity: number
  strokeColor: string
  strokeOpacity: number
  strokeWidth: number
  markerDisplay: boolean
  order: number
  floor: number
  isSearchable: boolean
  isVisible: boolean
  isClickable: boolean
  markerCoordinate: LatLngFloor
  entranceCoordinate: LatLngFloor
  placeTypeId: string
  minZoom: number
  maxZoom: number
  data?: Map<string, any> | undefined
  constructor(
    _id: string,
    venueId: string,
    name: string,
    alias: string,
    iconUrl: string,
    universes: Universe[],
    translations: Translation[],
    translation: (language: string) => Translation,
    iconBase64: string,
    fillColor: string,
    fillOpacity: number,
    strokeColor: string,
    strokeOpacity: number,
    strokeWidth: number,
    markerDisplay: boolean,
    order: number,
    floor: number,
    isSearchable: boolean,
    isVisible: boolean,
    isClickable: boolean,
    markerCoordinate: LatLngFloor,
    entranceCoordinate: LatLngFloor,
    placeTypeId: string,
    minZoom: number,
    maxZoom: number
  ) {
    this._id = _id
    this.venueId = venueId
    this.name = name
    this.alias = alias
    this.iconUrl = iconUrl
    this.universes = universes
    this.translations = translations
    this.translation = translation
    this.iconBase64 = iconBase64
    this.fillColor = fillColor
    this.fillOpacity = fillOpacity
    this.strokeColor = strokeColor
    this.strokeOpacity = strokeOpacity
    this.strokeWidth = strokeWidth
    this.markerDisplay = markerDisplay
    this.order = order
    this.floor = floor
    this.isSearchable = isSearchable
    this.isVisible = isVisible
    this.isClickable = isClickable
    this.markerCoordinate = markerCoordinate
    this.entranceCoordinate = entranceCoordinate
    this.placeTypeId = placeTypeId
    this.minZoom = minZoom
    this.maxZoom = maxZoom
  }
}

export class PlaceDetails {
  objectClass = 'PlaceDetails'
  _id: string
  name: string
  floor: any //You should use `floor.number` to access the floor number
  markerCoordinate: LatLngFloor
  placetype: { name: string }
  venue: any
  style: any
  data: any
  translations: Translation[]
  translation: (language: string) => Translation
  universes: string[]
  calendarEmail: string
  photos: string[]
  openingHours: { day: number; open: string; close: string }[]
  phone: string
  website: string
  capacity: number
  timezone: string
  shareLink: string
  calendarEvents: { day: number; start: Date; end: Date }[]
  constructor(
    _id: string,
    name: string,
    floor: string,
    markerCoordinate: LatLngFloor,
    placetype: { name: string },
    venue: any,
    style: any,
    data: Map<string, any> | undefined,
    translations: Translation[],
    translation: (language: string) => Translation,
    universes: string[],
    calendarEmail: string,
    photos: string[],
    openingHours: { day: number; open: string; close: string }[],
    phone: string,
    website: string,
    capacity: number,
    timezone: string,
    shareLink: string,
    calendarEvents: { day: number; start: Date; end: Date }[]
  ) {
    this._id = _id
    this.name = name
    this.floor = floor
    this.markerCoordinate = markerCoordinate
    this.placetype = placetype
    this.venue = venue
    this.style = style
    this.data = data
    this.translations = translations
    this.translation = translation
    this.universes = universes
    this.calendarEmail = calendarEmail
    this.photos = photos
    this.openingHours = openingHours
    this.phone = phone
    this.website = website
    this.capacity = capacity
    this.timezone = timezone
    this.shareLink = shareLink
    this.calendarEvents = calendarEvents
  }
}

/**
 * Venue are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Venue implements MapwizeObject {
  objectClass = 'Venue'
  _id: string
  name: string
  alias: string
  iconUrl: string
  universes: Universe[]
  translations: Translation[]
  translation: (language: string) => Translation
  defaultLanguage: string
  supportedLanguages: Array<string>
  iconBase64: string
  markerCoordinate: LatLng
  defaultCenter: LatLng
  defaultZoom?: number
  defaultFloor?: number
  defaultBearing?: number
  defaultPitch?: number
  data?: Map<string, any> | undefined
  constructor(
    _id: string,
    name: string,
    alias: string,
    iconUrl: string,
    universes: Universe[],
    translations: Translation[],
    translation: (language: string) => Translation,
    defaultLanguage: string,
    supportedLanguages: Array<string>,
    iconBase64: string,
    markerCoordinate: LatLng,
    defaultCenter: LatLng,
    defaultZoom?: number,
    defaultFloor?: number,
    defaultBearing?: number,
    defaultPitch?: number
  ) {
    this._id = _id
    this.name = name
    this.alias = alias
    this.iconUrl = iconUrl
    this.universes = universes
    this.translations = translations
    this.translation = translation
    this.defaultLanguage = defaultLanguage
    this.supportedLanguages = supportedLanguages
    this.iconBase64 = iconBase64
    this.markerCoordinate = markerCoordinate
    this.defaultCenter = defaultCenter
    this.defaultZoom = defaultZoom
    this.defaultFloor = defaultFloor
    this.defaultBearing = defaultBearing
    this.defaultPitch = defaultPitch
  }
}

/**
 * Placelist are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Placelist implements MapwizeObject {
  objectClass = 'Placelist'
  _id: string
  venueId: string
  name: string
  alias: string
  iconUrl: string
  universes: Universe[]
  data?: Map<string, any> | undefined
  translations: Translation[]
  translation: (language: string) => Translation
  placeIds: Array<string>
  isSearchable: boolean
  constructor(
    _id: string,
    venueId: string,
    name: string,
    alias: string,
    iconUrl: string,
    universes: Universe[],
    translations: Translation[],
    translation: (language: string) => Translation,
    placeIds: Array<string>,
    isSearchable: boolean,
    data?: Map<string, any> | undefined
  ) {
    this._id = _id
    this.venueId = venueId
    this.name = name
    this.alias = alias
    this.iconUrl = iconUrl
    this.universes = universes
    this.translations = translations
    this.translation = translation
    this.placeIds = placeIds
    this.isSearchable = isSearchable
    this.data = data
  }
}

/**
 * Style contains properties that allow you to update dynamically the aspect of a place.
 */
export class Style {
  objectClass = 'Style'
  iconName?: string
  fillColor?: string
  fillOpacity?: number
  strokeColor?: string
  strokeOpacity?: number
  strokeWidth?: number
  markerDisplay?: boolean
  shapeDisplay?: boolean
  title?: string
  constructor(
    iconName?: string,
    fillColor?: string,
    fillOpacity?: number,
    strokeColor?: string,
    strokeOpacity?: number,
    strokeWidth?: number,
    markerDisplay?: boolean,
    shapeDisplay?: boolean,
    title?: string
  ) {
    this.iconName = iconName
    this.fillColor = fillColor
    this.fillOpacity = fillOpacity
    this.strokeColor = strokeColor
    this.strokeOpacity = strokeOpacity
    this.strokeWidth = strokeWidth
    this.markerDisplay = markerDisplay
    this.shapeDisplay = shapeDisplay
    this.title = title
  }
}

/**
 * UserInfo are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class UserInfo {
  objectClass = 'UserInfo'
  displayName: string
  email: string
  organizations: Array<Organization>
  constructor(
    displayName: string,
    email: string,
    organizations: Array<Organization>
  ) {
    this.displayName = displayName
    this.email = email
    this.organizations = organizations
  }
}

/**
 * ClickEvent are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class ClickEvent {
  objectClass = 'ClickEvent'
  eventType: 'map_click' | 'place_click' | 'venue_click'
  latLngFloor: LatLngFloor
  placePreview?: PlacePreview
  venuePreview?: VenuePreview
  constructor(
    eventType: 'map_click' | 'place_click' | 'venue_click',
    latLngFloor: LatLngFloor,
    placePreview?: PlacePreview,
    venuePreview?: VenuePreview
  ) {
    this.eventType = eventType
    this.latLngFloor = latLngFloor
    this.placePreview = placePreview
    this.venuePreview = venuePreview
  }
}

/**
 * PlacePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class PlacePreview implements DirectionPoint {
  objectClass = 'PlacePreview'
  _id: string
  title: string
  subtitle: string
  iconUrl: string
  defaultCenter: LatLngFloor
  defaultZoom: number
  constructor(
    _id: string,
    title: string,
    subtitle: string,
    iconUrl: string,
    defaultCenter: LatLngFloor,
    defaultZoom: number
  ) {
    this._id = _id
    this.title = title
    this.subtitle = subtitle
    this.iconUrl = iconUrl
    this.defaultCenter = defaultCenter
    this.defaultZoom = defaultZoom
  }
}

/**
 * VenuePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class VenuePreview {
  objectClass = 'VenuePreview'
  _id: string
  title: string
  iconUrl: string
  defaultCenter: LatLng
  defaultZoom: number
  defaultBearing: number
  defaultPitch: number
  defaultFloor: number
  constructor(
    _id: string,
    title: string,
    iconUrl: string,
    defaultCenter: LatLng,
    defaultZoom: number,
    defaultBearing: number,
    defaultPitch: number,
    defaultFloor: number
  ) {
    this._id = _id
    this.title = title
    this.iconUrl = iconUrl
    this.defaultCenter = defaultCenter
    this.defaultZoom = defaultZoom
    this.defaultBearing = defaultBearing
    this.defaultPitch = defaultPitch
    this.defaultFloor = defaultFloor
  }
}

/**
 * DirectionOptions contains property that can be used to configured the camera and icon when starting a direction or a navigation
 */
export class DirectionOptions {
  objectClass = 'DirectionOptions'
  endMarkerIconName: string
  displayEndMarker: boolean
  centerOnStart: boolean
  displayStartingFloor: boolean
  constructor() {
    this.endMarkerIconName = ''
    this.displayEndMarker = true
    this.centerOnStart = true
    this.displayStartingFloor = true
  }
  setEndMarkerIconName(endMarkerIconName: string) {
    this.endMarkerIconName = endMarkerIconName
    return this
  }
  setDisplayEndMarker(displayEndMarker: boolean) {
    this.displayEndMarker = displayEndMarker
    return this
  }
  setCenterOnStart(centerOnStart: boolean) {
    this.centerOnStart = centerOnStart
    return this
  }
  setDisplayStartingFloor(displayStartingFloor: boolean) {
    this.displayStartingFloor = displayStartingFloor
    return this
  }
}

/**
 * MapOptions contains property to configure the initial state of the map.
 */
export class MapOptions {
  objectClass = 'MapOptions'
  floor?: number
  language?: string
  universeId?: string
  centerOnVenueId?: string
  centerOnPlaceId?: string
  restrictContentToVenueIds?: Array<string>
  restrictContentToOrganizationId?: string
  logoClickable?: boolean
  tilt?: number
  bearing?: number
  compassEnabled?: boolean = true
  constructor() {}
  setFloor(floor: number): MapOptions {
    this.floor = floor
    return this
  }
  setLanguage(language: string): MapOptions {
    this.language = language
    return this
  }
  setUniverseId(universeId: string): MapOptions {
    this.universeId = universeId
    return this
  }
  setCenterOnVenueId(centerOnVenueId: string): MapOptions {
    this.centerOnVenueId = centerOnVenueId
    return this
  }
  setCenterOnPlaceId(centerOnPlaceId: string): MapOptions {
    this.centerOnPlaceId = centerOnPlaceId
    return this
  }
  setRestrictContentToVenueIds(
    restrictContentToVenueIds: string[]
  ): MapOptions {
    this.restrictContentToVenueIds = restrictContentToVenueIds
    return this
  }
  setRestrictContentToOrganizationId(
    restrictContentToOrganizationId: string
  ): MapOptions {
    this.restrictContentToOrganizationId = restrictContentToOrganizationId
    return this
  }
  setLogoClickable(logoClickable: boolean): MapOptions {
    this.logoClickable = logoClickable
    return this
  }
  setTilt(tilt: number): MapOptions {
    this.tilt = tilt
    return this
  }
  setBearing(bearing: number): MapOptions {
    this.bearing = bearing
    return this
  }
  setCompassEnabled(compassEnabled: boolean): MapOptions {
    this.compassEnabled = compassEnabled
    return this
  }
}

/**
 * Marker are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class Marker {
  objectClass = 'Marker'
  position: LatLngFloor | Place | Placelist | PlacePreview
  markerIconName?: string
  uuid?: string
  placePreview?: PlacePreview
  constructor(
    position: LatLngFloor | Place | Placelist | PlacePreview,
    markerIconName?: string
  ) {
    this.position = position
    this.markerIconName = markerIconName
  }
}

/**
 * FollowUserMode are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class FollowUserMode {
  objectClass = 'FollowUserMode'
  followUserMode: 'none' | 'follow_user' | 'follow_user_and_heading'
  constructor(
    followUserMode: 'none' | 'follow_user' | 'follow_user_and_heading'
  ) {
    this.followUserMode = followUserMode
  }
}
/**
 * IndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class IndoorLocation {
  objectClass = 'IndoorLocation'
  provider: string
  latitude: number
  longitude: number
  floor: number
  time: number
  constructor(
    provider: string,
    latitude: number,
    longitude: number,
    floor: number,
    time: number
  ) {
    this.provider = provider
    this.latitude = latitude
    this.longitude = longitude
    this.floor = floor
    this.time = time
  }
}
/**
 * MapwizeIndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export class MapwizeIndoorLocation extends IndoorLocation {
  objectClass = 'MapwizeIndoorLocation'
  constructor(
    provider: string,
    latitude: number,
    longitude: number,
    floor: number,
    time: number
  ) {
    super(provider, latitude, longitude, floor, time)
  }
}
