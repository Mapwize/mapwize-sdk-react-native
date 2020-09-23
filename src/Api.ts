import { NativeModules, Platform } from 'react-native'

import type {
  MapwizeApi,
  ApiFilter,
  Venue,
  DirectionPoint,
  DirectionMode,
  DistanceOptions,
  SearchParams,
  MapwizeConfiguration,
} from './types'

const { RNMWZApi } = NativeModules

let count: number = 0
export const createApi = (
  mapwizeConfiguration: MapwizeConfiguration
): MapwizeApi => {
  let contextId = 'context-' + count++
  RNMWZApi.createMapwizeApi(mapwizeConfiguration, contextId)
  return {
    getAccess: getAccess(contextId),
    getAccessibleUniversesForVenue: getAccessibleUniversesForVenue(contextId),
    getDirection: getDirection(contextId),
    getDistances: getDistances(contextId),
    getLayer: getLayer(contextId),
    getLayerWithName: getLayerWithName(contextId),
    getLayerWithAlias: getLayerWithAlias(contextId),
    getLayers: getLayers(contextId),
    getMainFroms: getMainFroms(contextId),
    getMainSearches: getMainSearches(contextId),
    getPlacesForPlacelist: getPlacesForPlacelist(contextId),
    getPlace: getPlace(contextId),
    getPlaceWithName: getPlaceWithName(contextId),
    getPlaceWithAlias: getPlaceWithAlias(contextId),
    getPlaces: getPlaces(contextId),
    getPlacelist: getPlacelist(contextId),
    getPlacelistWithName: getPlacelistWithName(contextId),
    getPlacelistWithAlias: getPlacelistWithAlias(contextId),
    getPlacelists: getPlacelists(contextId),
    getVenue: getVenue(contextId),
    getVenueWithName: getVenueWithName(contextId),
    getVenueWithAlias: getVenueWithAlias(contextId),
    getVenues: getVenues(contextId),
    search: search(contextId),
  }
}

const getAccess = (contextId: string) => (accessKey: string) =>
  RNMWZApi.getAccess(contextId, accessKey)

const getAccessibleUniversesForVenue = (contextId: string) => (venue: Venue) =>
  RNMWZApi.getAccessibleUniversesForVenue(contextId, venue)

const getDirection = (contextId: string) => (
  from: DirectionPoint,
  to: DirectionPoint | DirectionPoint[],
  mode: DirectionMode,
  waypoints?: DirectionPoint[],
  waypointsOptimize: boolean = false
) => {
  if (to.constructor === Array && Platform.OS === 'android') {
    return RNMWZApi.getDirectionToMultiple(
      contextId,
      from,
      to,
      mode,
      waypoints,
      waypointsOptimize
    )
  } else {
    return RNMWZApi.getDirection(
      contextId,
      from,
      to,
      mode,
      waypoints,
      waypointsOptimize
    )
  }
}

const getDistances = (contextId: string) => (
  from: DirectionPoint,
  to: DirectionPoint[],
  directionMode: DirectionMode,
  sortByTraveltime: boolean = false
) => RNMWZApi.getDistances(contextId, from, to, directionMode, sortByTraveltime)

const getLayer = (contextId: string) => (id: string) =>
  RNMWZApi.getLayer(contextId, id)

const getLayerWithName = (contextId: string) => (name: string, venue: Venue) =>
  RNMWZApi.getLayerWithName(contextId, name, venue)

const getLayerWithAlias = (contextId: string) => (
  alias: string,
  venue: Venue
) => RNMWZApi.getLayerWithAlias(contextId, alias, venue)

const getLayers = (contextId: string) => (filter: ApiFilter) =>
  RNMWZApi.getLayers(contextId, filter)

const getMainFroms = (contextId: string) => (venue: Venue) =>
  RNMWZApi.getMainFroms(contextId, venue)

const getMainSearches = (contextId: string) => (venue: Venue) =>
  RNMWZApi.getMainSearches(contextId, venue)

const getPlacesForPlacelist = (contextId: string) => (id: string) =>
  RNMWZApi.getPlacesForPlacelist(contextId, id)

const getPlace = (contextId: string) => (id: string) =>
  RNMWZApi.getPlace(contextId, id)

const getPlaceWithName = (contextId: string) => (name: string, venue: Venue) =>
  RNMWZApi.getPlaceWithName(contextId, name, venue)

const getPlaceWithAlias = (contextId: string) => (
  alias: string,
  venue: Venue
) => RNMWZApi.getPlaceWithAlias(contextId, alias, venue)

const getPlaces = (contextId: string) => (filter: ApiFilter) =>
  RNMWZApi.getPlaces(contextId, filter)

const getPlacelist = (contextId: string) => (id: string) =>
  RNMWZApi.getPlacelist(contextId, id)

const getPlacelistWithName = (contextId: string) => (
  name: string,
  venue: Venue
) => RNMWZApi.getPlacelistWithName(contextId, name, venue)

const getPlacelistWithAlias = (contextId: string) => (
  alias: string,
  venue: Venue
) => RNMWZApi.getPlacelistWithAlias(contextId, alias, venue)

const getPlacelists = (contextId: string) => (filter: ApiFilter) =>
  RNMWZApi.getPlacelists(contextId, filter)

const getVenue = (contextId: string) => (id: string) =>
  RNMWZApi.getVenue(contextId, id)

const getVenueWithName = (contextId: string) => (name: string) =>
  RNMWZApi.getVenueWithName(contextId, name)

const getVenueWithAlias = (contextId: string) => (alias: string) =>
  RNMWZApi.getVenueWithAlias(contextId, alias)

const getVenues = (contextId: string) => (filter: ApiFilter) =>
  RNMWZApi.getVenues(contextId, filter)

const search = (contextId: string) => (searchParams: SearchParams) =>
  RNMWZApi.search(contextId, searchParams)

export default createApi
