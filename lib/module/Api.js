import { NativeModules, Platform } from 'react-native';
const {
  RNMWZApi
} = NativeModules;
let count = 0;
export const createApi = mapwizeConfiguration => {
  let contextId = 'context-' + count++;
  RNMWZApi.createMapwizeApi(mapwizeConfiguration, contextId);
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
    search: search(contextId)
  };
};

const getAccess = contextId => accessKey => RNMWZApi.getAccess(contextId, accessKey);

const getAccessibleUniversesForVenue = contextId => venue => RNMWZApi.getAccessibleUniversesForVenue(contextId, venue);

const getDirection = contextId => (from, to, mode, waypoints, waypointsOptimize = false) => {
  if (to.constructor === Array && Platform.OS === 'android') {
    return RNMWZApi.getDirectionToMultiple(contextId, from, to, mode, waypoints, waypointsOptimize);
  } else {
    return RNMWZApi.getDirection(contextId, from, to, mode, waypoints, waypointsOptimize);
  }
};

const getDistances = contextId => (from, to, directionMode, sortByTraveltime = false) => RNMWZApi.getDistances(contextId, from, to, directionMode, sortByTraveltime);

const getLayer = contextId => id => RNMWZApi.getLayer(contextId, id);

const getLayerWithName = contextId => (name, venue) => RNMWZApi.getLayerWithName(contextId, name, venue);

const getLayerWithAlias = contextId => (alias, venue) => RNMWZApi.getLayerWithAlias(contextId, alias, venue);

const getLayers = contextId => filter => RNMWZApi.getLayers(contextId, filter);

const getMainFroms = contextId => venue => RNMWZApi.getMainFroms(contextId, venue);

const getMainSearches = contextId => venue => RNMWZApi.getMainSearches(contextId, venue);

const getPlacesForPlacelist = contextId => id => RNMWZApi.getPlacesForPlacelist(contextId, id);

const getPlace = contextId => id => RNMWZApi.getPlace(contextId, id);

const getPlaceWithName = contextId => (name, venue) => RNMWZApi.getPlaceWithName(contextId, name, venue);

const getPlaceWithAlias = contextId => (alias, venue) => RNMWZApi.getPlaceWithAlias(contextId, alias, venue);

const getPlaces = contextId => filter => RNMWZApi.getPlaces(contextId, filter);

const getPlacelist = contextId => id => RNMWZApi.getPlacelist(contextId, id);

const getPlacelistWithName = contextId => (name, venue) => RNMWZApi.getPlacelistWithName(contextId, name, venue);

const getPlacelistWithAlias = contextId => (alias, venue) => RNMWZApi.getPlacelistWithAlias(contextId, alias, venue);

const getPlacelists = contextId => filter => RNMWZApi.getPlacelists(contextId, filter);

const getVenue = contextId => id => RNMWZApi.getVenue(contextId, id);

const getVenueWithName = contextId => name => RNMWZApi.getVenueWithName(contextId, name);

const getVenueWithAlias = contextId => alias => RNMWZApi.getVenueWithAlias(contextId, alias);

const getVenues = contextId => filter => RNMWZApi.getVenues(contextId, filter);

const search = contextId => searchParams => RNMWZApi.search(contextId, searchParams);

export default createApi;
//# sourceMappingURL=Api.js.map