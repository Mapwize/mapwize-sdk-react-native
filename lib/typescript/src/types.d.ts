/// <reference types="react" />
import type { StyleProp, ViewStyle } from 'react-native';
/**
 * MapwizeApi is the entry point to retrieve Mapwize data from the Mapwize backend.
 * It can be instantiated using CreateMapwizeAPI(mapwizeConfiguration:MapwizeConfiguration)
 */
export interface MapwizeApi {
    /**
     * Gain access to private building using an access key
     */
    getAccess: (accessKey: string) => Promise<boolean>;
    /**
     * Get the list of universes that are accessible for this venue
     */
    getAccessibleUniversesForVenue: (venue: Venue) => Promise<Universe[]>;
    /**
     * Get the direction between a starting point and a destination.
     * The destination can be one or multiple DirectionPoint
     * You can optionally add some waypoints
     */
    getDirection: (from: DirectionPoint, to: DirectionPoint | DirectionPoint[], mode: DirectionMode, waypoints?: DirectionPoint[], waypointsOptimize?: boolean) => Promise<Direction>;
    /**
     * Get the distances between a starting point and a list of destination
     */
    getDistances: (from: DirectionPoint, to: DirectionPoint[], directionMode: DirectionMode, sortByTraveltime: boolean) => Promise<DistanceResponse>;
    /**
     * Get a layer using its id
     */
    getLayer: (id: string) => Promise<Layer>;
    /**
     * Get a layer using its name. As a layer name is only unique in a specific venue, you have to pass this venue as parameter
     */
    getLayerWithName: (name: string, venue: Venue) => Promise<Layer>;
    /**
     * Get a layer using its alias. As a layer alias is only unique in a specific venue, you have to pass this venue as parameter
     */
    getLayerWithAlias: (alias: string, venue: Venue) => Promise<Layer>;
    /**
     * Get all the layers that match the ApiFilter
     */
    getLayers: (params: ApiFilter) => Promise<Layer[]>;
    /**
     * Get the main froms for the specific venue
     */
    getMainFroms: (venue: Venue) => Promise<Place[]>;
    /**
     * Get the main searches for the specific venue
     */
    getMainSearches: (venue: Venue) => Promise<MapwizeObject[]>;
    /**
     * Get a place using its id
     */
    getPlace: (id: string) => Promise<Place>;
    /**
     * Get a place using its name. As a place name is only unique in a specific venue, you have to pass this venue as parameter
     */
    getPlaceWithName: (name: string, venue: Venue) => Promise<Place>;
    /**
     * Get a place using its alias. As a place alias is only unique in a specific venue, you have to pass this venue as parameter
     */
    getPlaceWithAlias: (alias: string, venue: Venue) => Promise<Place>;
    /**
     * Get all the places that match the ApiFilter
     */
    getPlaces: (params: ApiFilter) => Promise<Place[]>;
    /**
     * Get all places contained in the placelist
     */
    getPlacesForPlacelist: (placelist: Placelist) => Promise<Place[]>;
    /**
     * Get a placelist using its id
     */
    getPlacelist: (id: string) => Promise<Placelist>;
    /**
     * Get a placelist using its name. As a placelist name is only unique in a specific venue, you have to pass this venue as parameter
     */
    getPlacelistWithName: (name: string, venue: Venue) => Promise<Placelist>;
    /**
     * Get a placelist using its alias. As a placelist alias is only unique in a specific venue, you have to pass this venue as parameter
     */
    getPlacelistWithAlias: (alias: string, venue: Venue) => Promise<Placelist>;
    /**
     * Get all the placelists that match the ApiFilter
     */
    getPlacelists: (filter: ApiFilter) => Promise<Placelist[]>;
    /**
     * Get a venue using its id
     */
    getVenue: (id: string) => Promise<Venue>;
    /**
     * Get a venue using its name
     */
    getVenueWithName: (name: string) => Promise<Venue>;
    /**
     * Get a venue using its alias
     */
    getVenueWithAlias: (alias: string) => Promise<Venue>;
    /**
     * Get all venue that match the ApiFilter
     */
    getVenues: (filter: ApiFilter) => Promise<Venue[]>;
    /**
     * Get search result using the SearchParams
     */
    search: (searchParams: SearchParams) => Promise<MapwizeObject[]>;
}
/**
 * OfflineManager is the entry point to download Mapwize offline data.
 * It can be instantiated using createOfflineManager(mapwizeConfiguration:MapwizeConfiguration)
 */
export interface OfflineManager {
    /**
     * Download offline data for the given (venue, universe) pair
     */
    downloadData: (offlineRegion: OfflineRegion, onProgress: (progress: number) => void) => Promise<OfflineRegion>;
    /**
     * Update the offline data for a given offline region if something has changed.
     */
    updateData: (offlineRegion: OfflineRegion, onProgress: (progress: number) => void) => Promise<OfflineRegion>;
    /**
     * Check if a pair of venue universe is accessible offline
     * @param venue  the venue to be downloaded.
     * @param universe  the universe to be downloaded.
     */
    hasOfflineRegion: (venue: Venue, universe: Universe) => Promise<boolean>;
    /**
     * Get an offline region using a (venue, universe) pair
     * @param venue  the venue to be downloaded.
     * @param universe  the universe to be downloaded.
     */
    getOfflineRegion: (venue: Venue, universe: Universe) => Promise<OfflineRegion>;
    /**
     * Get all the offline regions
     */
    getOfflineRegions: () => Promise<OfflineRegion[]>;
    /**
     * remove an offline region
     */
    removeData: (offlineRegion: OfflineRegion) => Promise<void>;
    /**
     * check if there is an update for a given offline region
     */
    checkForUpdate: (offlineRegion: OfflineRegion) => Promise<Boolean>;
}
export declare class DownloadDataOptions {
    venue: Venue;
    universe: Universe;
    minZoom: number;
    maxZoom: number;
    constructor(venue: Venue, universe: Universe, minZoom?: number, maxZoom?: number);
}
export interface MapwizeViewRef {
    /**
     * Add an image to the map in order to be able to use its name in other Mapwize method/props
     */
    addImageToMap: (imageName: string, imageBase64: string) => void;
    /**
     * Gain access to private building using an access key
     */
    grantAccess: (accessKey: string) => Promise<void>;
    /**
     * Center on a specific location.
     * @param position Can be a LatLngFloor, a Place, a PlacePreview, a Venue or a VenuePreview
     * @param zoom Optional the targeted camera zoom level. Default value is 18
     * @param animated Optional If true, the camera movement will be animated. Default is true
     */
    centerOn: (position: LatLngFloor | Place | PlacePreview | VenuePreview | Venue, zoom?: number, animated?: boolean) => void;
    /**
     * Set the current displayed floor
     * @param floorNumber that will be set
     */
    setFloor: (floorNumber: number) => void;
    /**
     * Get the current displayed floor
     */
    getFloor: () => Promise<Floor>;
    /**
     * Get the current accessible floors regarding the venue/universe displayed
     */
    getFloors: () => Promise<Floor[]>;
    /**
     * Set the preferred language that should be chosen if available when entering in a venue
     */
    setPreferredLanguage: (language: string) => void;
    /**
     * Get the preferred language that should be chosen if available when entering in a venue
     */
    getPreferredLanguage: () => Promise<string>;
    /**
     * Set the language for a specific venue
     */
    setLanguageForVenue: (language: string, venue: Venue) => void;
    /**
     * Get the language for a specific venue
     */
    getLanguageForVenue: (venue: Venue) => Promise<string>;
    /**
     * Get the current language.
     * If in a venue, it will return the language set for this venue.
     * Otherwise, it will return the preferred language.
     */
    getLanguage: () => Promise<string>;
    /**
     * Set universe. If in a venue, it will set the universe for this venue.
     * Otherwise, it will set the universe for the next venue you enter in.
     */
    setUniverse: (universe: Universe) => void;
    /**
     * Set universe for the specific venue.
     */
    setUniverseForVenue: (universe: Universe, venue: Venue) => void;
    /**
     * Get the current universe.
     */
    getUniverse: () => Promise<Universe>;
    /**
     * Get the universe for a specific venue.
     */
    getUniverseForVenue: (venue: Venue) => Promise<Universe>;
    /**
     * Get the list of accessible universe.
     */
    getUniverses: () => Promise<Universe[]>;
    /**
     * Set the follow user mode
     */
    setFollowUserMode: (followUserMode: FollowUserMode) => void;
    /**
     * Get the follow user mode
     */
    getFollowUserMode: () => Promise<FollowUserMode>;
    /**
     * Get the accessible direction mode for the venue / universe currently displayed
     */
    getDirectionModes: () => Promise<DirectionMode[]>;
}
export interface MapwizeViewProps {
    style?: StyleProp<ViewStyle>;
    ref?: React.RefObject<MapwizeViewRef>;
    /**
     * The mapwize configuration that will be used for this instance of MapwizeView
     */
    mapwizeConfiguration: MapwizeConfiguration;
    /**
     * The map options that will be used to initialized this instance of MapwizeView
     */
    mapOptions: MapOptions;
    /**
     * The user current location
     */
    userLocation: LatLngFloor | undefined;
    /**
     * Markers that are currently displayed on the map.
     */
    markers: MarkerProp[] | undefined;
    /**
     * Places that are currently promoted on the map
     */
    promotedPlaces: (Place | PlacePreview | Placelist)[] | undefined;
    /**
     * Custom place styles
     */
    placeStyles: PlaceStyleProp[] | undefined;
    /**
     * Direction that is currentrly displayed on the map
     */
    mapDirection: DirectionProp | undefined;
    /**
     * Navigation that is currentrly displayed on the map
     */
    mapNavigation: NavigationProp | undefined;
    onMapwizeEvent?: ({ nativeEvent, }: {
        nativeEvent: MapwizeInternalEvent;
    }) => void;
    /**
     * Called when the MapwizeMap component is fully load and ready to be used.
     * You can use this method to get the MapwizeViewRef
     */
    onMapLoaded?: (ref: MapwizeViewRef) => void;
    /**
     * Called when a venue start loading
     */
    onVenueWillEnter?: (venue: Venue) => void;
    /**
     * Called when a venue is loaded
     */
    onVenueEnter?: (venue: Venue) => void;
    /**
     * Called when something goes wrong trying to enter in a venue
     */
    onVenueEnterError?: (venue: Venue, error: Error) => void;
    /**
     * Called when a venue is exit
     */
    onVenueExit?: (venue: Venue) => void;
    /**
     * Called when the accessible universes changed
     */
    onUniversesChange?: (universes: Universe[]) => void;
    /**
     * Called when a universe is going to be loaded
     */
    onUniverseWillChange?: (universe: Universe) => void;
    /**
     * Called when a universe is loaded
     */
    onUniverseChange?: (universe: Universe) => void;
    /**
     * Called when something goes wrong  trying to load a universe
     */
    onUniverseChangeError?: (universe: Universe, error: Error) => void;
    /**
     * Called when the accessible floors changed
     */
    onFloorsChange?: (floors: Floor[]) => void;
    /**
     * Called when a floor is going to be loaded
     */
    onFloorWillChange?: (floor: Floor) => void;
    /**
     * Called when a floor is loaded
     */
    onFloorChange?: (floor: Floor) => void;
    /**
     * Called when something goes wrong trying to load a floor
     */
    onFloorChangeError?: (floor: Floor, error: Error) => void;
    /**
     * Called when the user click on a marker
     */
    onMarkerClick?: (marker: Marker) => void;
    /**
     * Called when the user click on the map
     */
    onMapClick?: (clickEvent: ClickEvent) => void;
    /**
     * Called when the follow user mode changed
     */
    onFollowUserModeChange?: (followUserMode: FollowUserMode) => void;
    /**
     * Called when the current language changed
     */
    onLanguageChange?: (language: string) => void;
    /**
     * Called when the accessible direction mode changed
     */
    onDirectionModesChange?: (directionModes: DirectionMode[]) => void;
    /**
     * Called when a navigation is about to start
     */
    onNavigationWillStart?: () => void;
    /**
     * Called when a navigation started
     */
    onNavigationStart?: () => void;
    /**
     * Called when a navigation update is avaible
     */
    onNavigationUpdate?: (navigationInfo: NavigationInfo) => void;
    /**
     * Called when a navigation stopped
     */
    onNavigationStop?: () => void;
    /**
     * Called when something goes wrong with a navigation
     */
    onNavigationError?: (message: string) => void;
}
/**
 * PlaceStyleProp contains required properties to set a custom style for a place
 */
export declare class PlaceStyleProp {
    placeId: string;
    style: Style;
    constructor(placeId: string, style: Style);
}
/**
 * MarkerProp contains required properties to display markers on the map
 */
export declare class MarkerProp {
    position: LatLngFloor | PlacePreview | Place | Placelist;
    markerName?: string;
    constructor(position: LatLngFloor | PlacePreview | Place | Placelist, markerName?: string);
}
/**
 * DirectionProp contains required properties to display a direction on the map
 */
export declare class DirectionProp {
    direction: Direction;
    directionOptions: DirectionOptions;
    constructor(direction: Direction, directionOptions: DirectionOptions);
}
/**
 * NavigationProp contains required properties to display a navigation on the map
 */
export declare class NavigationProp {
    destination: DirectionPoint;
    directionMode: DirectionMode;
    directionOptions: DirectionOptions;
    maxDistanceBeforeRecompute?: number;
    constructor(destination: DirectionPoint, directionMode: DirectionMode, directionOptions: DirectionOptions, maxDistanceBeforeRecompute?: number);
}
/**
 * OfflineRegion contains information about the downloaded (Venue,universe) pair.
 * You should not create an OfflineRegion info yourself.
 */
export declare class OfflineRegion {
    venue: Venue;
    universe: Universe;
    minZoom?: number;
    maxZoom?: number;
    constructor(venue: Venue, universe: Universe, minZoom?: number, maxZoom?: number);
}
/**
 * NavigationInfo contains information about the current Navigation such as the remaining distance, duration.
 * You should not create a Navigation info yourself.
 */
export declare class NavigationInfo {
    duration: number;
    distance: number;
    locationDelta: number;
    originalLocation: LatLngFloor;
    snappedLocation: LatLngFloor;
    constructor(duration: number, distance: number, locationDelta: number, originalLocation: LatLngFloor, snappedLocation: LatLngFloor);
}
/**
 * Internal use only
 */
export interface EventValue<T> {
    value: T;
}
/**
 * Internal use only
 */
export interface MapwizeInternalEvent {
    promiseId: number;
    success: boolean;
    value: any;
}
/**
 * Mapwize Configuration contains properties that are required to use the map and the api.
 */
export declare class MapwizeConfiguration {
    objectClass: string;
    apiKey: string;
    serverUrl?: string;
    styleUrl?: string;
    cacheSize?: number;
    refreshInterval?: number;
    telemetryEnabled: boolean;
    constructor(apiKey: string);
    setServerUrl(serverUrl: string): MapwizeConfiguration;
    setStyleUrl(styleUrl: string): MapwizeConfiguration;
    setCacheSize(cacheSize: number): MapwizeConfiguration;
    setRefreshInterval(refreshInterval: number): MapwizeConfiguration;
    setTelemetryEnabled(telemetryEnabled: boolean): MapwizeConfiguration;
}
/**
 * ApiFilter are used in the Api to limit the result to intersting value for you
 */
export declare class ApiFilter {
    objectClass: string;
    venueId?: string;
    universeId?: string;
    organizationId?: string;
    floor?: number;
    venueIds?: Array<string>;
    isVisible?: boolean;
    alias?: string;
    name?: string;
    latitudeMin?: number;
    latitudeMax?: number;
    longitudeMin?: number;
    longitudeMax?: number;
    constructor();
    setVenueId(venueId: string): ApiFilter;
    setUniverseId(universeId: string): ApiFilter;
    setOrganizationId(organizationId: string): ApiFilter;
    setFloor(floor: number): ApiFilter;
    setVenueIds(venueIds: Array<string>): ApiFilter;
    setIsVisible(isVisible: boolean): ApiFilter;
    setName(name: string): ApiFilter;
    setLatitudeMin(latitudeMin: number): ApiFilter;
    setLatitudeMax(latitudeMax: number): ApiFilter;
    setLongitudeMin(longitudeMin: number): ApiFilter;
    setLongitudeMax(longitudeMax: number): ApiFilter;
}
/**
 * SearchParams contains properties that allow you to search points of interest
 */
export declare class SearchParams {
    objectClass: string;
    query: string;
    venueId?: string;
    venueIds?: Array<string>;
    organizationId?: string;
    universeId?: string;
    objectClasses?: Array<'place' | 'placelist' | 'venue'>;
    constructor(query: string);
    setVenueId(venueId?: string): SearchParams;
    setVenueIds(venueIds?: Array<string>): SearchParams;
    setOrganizationId(organizationId?: string): SearchParams;
    setUniverseId(universeId?: string): SearchParams;
    setObjectClasses(objectClasses?: Array<'place' | 'placelist' | 'venue'>): SearchParams;
}
/**
 * Direction that can be displayed on the map.
 * This object is provided by the Api.getDirection method. You should not instantiate it yourself
 */
export declare class Direction {
    objectClass: string;
    from: DirectionPointWrapper;
    to: DirectionPointWrapper;
    distance: number;
    traveltime: number;
    route: Array<Route>;
    bounds: LatLngBounds;
    waypoints: Array<DirectionPointWrapper>;
    subdirections: Array<Direction>;
    mode: DirectionMode;
    constructor(from: DirectionPointWrapper, to: DirectionPointWrapper, distance: number, traveltime: number, route: Array<Route>, bounds: LatLngBounds, waypoints: Array<DirectionPointWrapper>, subdirections: Array<Direction>, mode: DirectionMode);
}
/**
 * DirectionPointWrapper are you by the SDK when working with direction.
 * You should not instantiate it yourself
 */
export declare class DirectionPointWrapper implements DirectionPoint {
    objectClass: string;
    latitude?: number;
    longitude?: number;
    floor?: number;
    venueId?: string;
    placeId?: string;
    placeListId?: string;
    constructor(latitude?: number, longitude?: number, floor?: number, venueId?: string, placeId?: string, placeListId?: string);
}
/**
 * DirectionPointWrapperAndDistance are you by the SDK when working with distances.
 * You should not instantiate it yourself
 */
export declare class DirectionPointWrapperAndDistance extends DirectionPointWrapper implements DirectionPoint {
    objectClass: string;
    distance: number;
    traveltime: number;
    constructor(distance: number, traveltime: number, latitude?: number, longitude?: number, floor?: number, venueId?: string, placeId?: string, placeListId?: string);
}
/**
 * DistanceResponse is returned by the Api.getDistance method.
 * You should not instantiate it yourself
 */
export declare class DistanceResponse {
    objectClass: string;
    from: DirectionPointWrapper;
    distances: Array<DirectionPointWrapperAndDistance>;
    constructor(from: DirectionPointWrapper, distances: Array<DirectionPointWrapperAndDistance>);
}
/**
 * DirectionMode are accessible through the SDK and can be used in the Api.getDirection and Api.getDistance methods
 * You should not instantiate it yourself.
 */
export declare class DirectionMode {
    objectClass: string;
    _id: string;
    name: string;
    averageSpeed: number;
    type: string;
    constructor(_id: string, name: string, averageSpeed: number, type: string);
}
export declare class Floor {
    objectClass: string;
    number: number;
    name: string;
    constructor(number: number, name: string);
}
export declare class Route {
    objectClass: string;
    floor: number;
    fromFloor: number;
    toFloor: number;
    isStart: boolean;
    isEnd: boolean;
    traveltime: number;
    timeToEnd: number;
    distance: number;
    bounds: LatLngBounds;
    connectorTypeTo: string;
    connectorTypeFrom: string;
    path: Array<LatLng>;
    constructor(floor: number, fromFloor: number, toFloor: number, isStart: boolean, isEnd: boolean, traveltime: number, timeToEnd: number, distance: number, bounds: LatLngBounds, connectorTypeTo: string, connectorTypeFrom: string, path: Array<LatLng>);
}
/**
 * Interface used to represent Mapwize Object that can be used as DirectionPoint
 */
export interface DirectionPoint {
}
/**
 * LatLng represent a geo coordinate
 */
export declare class LatLng {
    objectClass: string;
    latitude: number;
    longitude: number;
    constructor(latitude: number, longitude: number);
}
/**
 * LatLngFloor represent a geo coordinate with a floor in order to work inside building
 */
export declare class LatLngFloor extends LatLng implements DirectionPoint {
    objectClass: string;
    floor: number;
    constructor(latitude: number, longitude: number, floor: number);
}
/**
 * LagLngFloorInVenue represent a geo coordinate with a floor and a specific venue. It may be useful with Api.getDirection and Api.getDistance
 */
export declare class LatLngFloorInVenue extends LatLngFloor implements DirectionPoint {
    objectClass: string;
    venueId: string;
    constructor(venueId: string, latitude: number, longitude: number, floor: number);
}
/**
 * Reprensents Bounding box
 */
export declare class LatLngBounds {
    objectClass: string;
    southWest: LatLng;
    northEast: LatLng;
    constructor(southWest: LatLng, northEast: LatLng);
}
/**
 * Layer reprensent a floor plan. Layers are provided by the SDK and Api.
 * You should instantiate it yourself.
 */
export declare class Layer {
    objectClass: string;
    _id: string;
    name: string;
    floor: number;
    type: string;
    venueId: string;
    universes: Array<Universe>;
    order: number;
    bounds: LatLngBounds;
    minZoom: number;
    maxZoom: number;
    constructor(_id: string, name: string, floor: number, type: string, venueId: string, universes: Array<Universe>, order: number, bounds: LatLngBounds, minZoom: number, maxZoom: number);
}
export declare class MapwizeIcon {
    objectClass: string;
    iconKey: string;
    iconBase64: string;
    constructor(iconKey: string, iconBase64: string);
}
/**
 * Universe are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Universe {
    objectClass: string;
    _id: string;
    name: string;
    constructor(_id: string, name: string);
}
/**
 * Organization are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Organization {
    objectClass: string;
    _id: string;
    name: string;
    constructor(_id: string, name: string);
}
/**
 * Translation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Translation {
    objectClass: string;
    _id: string;
    title: string;
    subtitle: string;
    details: string;
    language: string;
    constructor(_id: string, title: string, subtitle: string, details: string, language: string);
}
export interface MapwizeObject {
    objectClass: string;
    _id: string;
    name: string;
    alias: string;
    iconUrl: string;
    universes: Array<Universe>;
    data?: Map<string, any>;
    translations: Array<Translation>;
    translation: (language: string) => Translation;
}
/**
 * Place are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Place implements MapwizeObject {
    objectClass: string;
    _id: string;
    venueId: string;
    name: string;
    alias: string;
    iconUrl: string;
    universes: Universe[];
    translations: Translation[];
    translation: (language: string) => Translation;
    iconBase64: string;
    fillColor: string;
    fillOpacity: number;
    strokeColor: string;
    strokeOpacity: number;
    strokeWidth: number;
    markerDisplay: boolean;
    order: number;
    floor: number;
    isSearchable: boolean;
    isVisible: boolean;
    isClickable: boolean;
    markerCoordinate: LatLngFloor;
    entranceCoordinate: LatLngFloor;
    placeTypeId: string;
    minZoom: number;
    maxZoom: number;
    data?: Map<string, any> | undefined;
    constructor(_id: string, venueId: string, name: string, alias: string, iconUrl: string, universes: Universe[], translations: Translation[], translation: (language: string) => Translation, iconBase64: string, fillColor: string, fillOpacity: number, strokeColor: string, strokeOpacity: number, strokeWidth: number, markerDisplay: boolean, order: number, floor: number, isSearchable: boolean, isVisible: boolean, isClickable: boolean, markerCoordinate: LatLngFloor, entranceCoordinate: LatLngFloor, placeTypeId: string, minZoom: number, maxZoom: number);
}
/**
 * Venue are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Venue implements MapwizeObject {
    objectClass: string;
    _id: string;
    name: string;
    alias: string;
    iconUrl: string;
    universes: Universe[];
    translations: Translation[];
    translation: (language: string) => Translation;
    defaultLanguage: string;
    supportedLanguages: Array<string>;
    iconBase64: string;
    markerCoordinate: LatLng;
    defaultCenter: LatLng;
    defaultZoom?: number;
    defaultFloor?: number;
    defaultBearing?: number;
    defaultPitch?: number;
    data?: Map<string, any> | undefined;
    constructor(_id: string, name: string, alias: string, iconUrl: string, universes: Universe[], translations: Translation[], translation: (language: string) => Translation, defaultLanguage: string, supportedLanguages: Array<string>, iconBase64: string, markerCoordinate: LatLng, defaultCenter: LatLng, defaultZoom?: number, defaultFloor?: number, defaultBearing?: number, defaultPitch?: number);
}
/**
 * Placelist are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Placelist implements MapwizeObject {
    objectClass: string;
    _id: string;
    venueId: string;
    name: string;
    alias: string;
    iconUrl: string;
    universes: Universe[];
    data?: Map<string, any> | undefined;
    translations: Translation[];
    translation: (language: string) => Translation;
    placeIds: Array<string>;
    isSearchable: boolean;
    constructor(_id: string, venueId: string, name: string, alias: string, iconUrl: string, universes: Universe[], translations: Translation[], translation: (language: string) => Translation, placeIds: Array<string>, isSearchable: boolean, data?: Map<string, any> | undefined);
}
/**
 * Style contains properties that allow you to update dynamically the aspect of a place.
 */
export declare class Style {
    objectClass: string;
    iconName?: string;
    fillColor?: string;
    fillOpacity?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWidth?: number;
    markerDisplay?: boolean;
    shapeDisplay?: boolean;
    title?: string;
    constructor(iconName?: string, fillColor?: string, fillOpacity?: number, strokeColor?: string, strokeOpacity?: number, strokeWidth?: number, markerDisplay?: boolean, shapeDisplay?: boolean, title?: string);
}
/**
 * UserInfo are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class UserInfo {
    objectClass: string;
    displayName: string;
    email: string;
    organizations: Array<Organization>;
    constructor(displayName: string, email: string, organizations: Array<Organization>);
}
/**
 * ClickEvent are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class ClickEvent {
    objectClass: string;
    eventType: 'map_click' | 'place_click' | 'venue_click';
    latLngFloor: LatLngFloor;
    placePreview?: PlacePreview;
    venuePreview?: VenuePreview;
    constructor(eventType: 'map_click' | 'place_click' | 'venue_click', latLngFloor: LatLngFloor, placePreview?: PlacePreview, venuePreview?: VenuePreview);
}
/**
 * PlacePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class PlacePreview implements DirectionPoint {
    objectClass: string;
    _id: string;
    title: string;
    subtitle: string;
    iconUrl: string;
    defaultCenter: LatLngFloor;
    defaultZoom: number;
    constructor(_id: string, title: string, subtitle: string, iconUrl: string, defaultCenter: LatLngFloor, defaultZoom: number);
}
/**
 * VenuePreview are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class VenuePreview {
    objectClass: string;
    _id: string;
    title: string;
    iconUrl: string;
    defaultCenter: LatLng;
    defaultZoom: number;
    defaultBearing: number;
    defaultPitch: number;
    defaultFloor: number;
    constructor(_id: string, title: string, iconUrl: string, defaultCenter: LatLng, defaultZoom: number, defaultBearing: number, defaultPitch: number, defaultFloor: number);
}
/**
 * DirectionOptions contains property that can be used to configured the camera and icon when starting a direction or a navigation
 */
export declare class DirectionOptions {
    objectClass: string;
    endMarkerIconName: string;
    displayEndMarker: boolean;
    centerOnStart: boolean;
    displayStartingFloor: boolean;
    constructor();
    setEndMarkerIconName(endMarkerIconName: string): this;
    setDisplayEndMarker(displayEndMarker: boolean): this;
    setCenterOnStart(centerOnStart: boolean): this;
    setDisplayStartingFloor(displayStartingFloor: boolean): this;
}
/**
 * MapOptions contains property to configure the initial state of the map.
 */
export declare class MapOptions {
    objectClass: string;
    floor?: number;
    language?: string;
    universeId?: string;
    centerOnVenueId?: string;
    centerOnPlaceId?: string;
    restrictContentToVenueIds?: Array<string>;
    restrictContentToOrganizationId?: string;
    logoClickable?: boolean;
    constructor();
    setFloor(floor: number): MapOptions;
    setLanguage(language: string): MapOptions;
    setUniverseId(universeId: string): MapOptions;
    setCenterOnVenueId(centerOnVenueId: string): MapOptions;
    setCenterOnPlaceId(centerOnPlaceId: string): MapOptions;
    setRestrictContentToVenueIds(restrictContentToVenueIds: string[]): MapOptions;
    setRestrictContentToOrganizationId(restrictContentToOrganizationId: string): MapOptions;
    setLogoClickable(logoClickable: boolean): MapOptions;
}
/**
 * Marker are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class Marker {
    objectClass: string;
    position: LatLngFloor | Place | Placelist | PlacePreview;
    markerIconName?: string;
    uuid?: string;
    placePreview?: PlacePreview;
    constructor(position: LatLngFloor | Place | Placelist | PlacePreview, markerIconName?: string);
}
/**
 * FollowUserMode are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class FollowUserMode {
    objectClass: string;
    followUserMode: 'none' | 'follow_user' | 'follow_user_and_heading';
    constructor(followUserMode: 'none' | 'follow_user' | 'follow_user_and_heading');
}
/**
 * IndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class IndoorLocation {
    objectClass: string;
    provider: string;
    latitude: number;
    longitude: number;
    floor: number;
    time: number;
    constructor(provider: string, latitude: number, longitude: number, floor: number, time: number);
}
/**
 * MapwizeIndoorLocation are provided by the SDK and the API.
 * You should not instantiate it yourself.
 */
export declare class MapwizeIndoorLocation extends IndoorLocation {
    objectClass: string;
    constructor(provider: string, latitude: number, longitude: number, floor: number, time: number);
}
