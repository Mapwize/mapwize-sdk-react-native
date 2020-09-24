**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / MapwizeApi

# Interface: MapwizeApi

MapwizeApi is the entry point to retrieve Mapwize data from the Mapwize backend.
It can be instantiated using CreateMapwizeAPI(mapwizeConfiguration:MapwizeConfiguration)

## Hierarchy

* **MapwizeApi**

## Index

### Properties

* [getAccess](mapwizeapi.md#getaccess)
* [getAccessibleUniversesForVenue](mapwizeapi.md#getaccessibleuniversesforvenue)
* [getDirection](mapwizeapi.md#getdirection)
* [getDistances](mapwizeapi.md#getdistances)
* [getLayer](mapwizeapi.md#getlayer)
* [getLayerWithAlias](mapwizeapi.md#getlayerwithalias)
* [getLayerWithName](mapwizeapi.md#getlayerwithname)
* [getLayers](mapwizeapi.md#getlayers)
* [getMainFroms](mapwizeapi.md#getmainfroms)
* [getMainSearches](mapwizeapi.md#getmainsearches)
* [getPlace](mapwizeapi.md#getplace)
* [getPlaceWithAlias](mapwizeapi.md#getplacewithalias)
* [getPlaceWithName](mapwizeapi.md#getplacewithname)
* [getPlacelist](mapwizeapi.md#getplacelist)
* [getPlacelistWithAlias](mapwizeapi.md#getplacelistwithalias)
* [getPlacelistWithName](mapwizeapi.md#getplacelistwithname)
* [getPlacelists](mapwizeapi.md#getplacelists)
* [getPlaces](mapwizeapi.md#getplaces)
* [getPlacesForPlacelist](mapwizeapi.md#getplacesforplacelist)
* [getVenue](mapwizeapi.md#getvenue)
* [getVenueWithAlias](mapwizeapi.md#getvenuewithalias)
* [getVenueWithName](mapwizeapi.md#getvenuewithname)
* [getVenues](mapwizeapi.md#getvenues)
* [search](mapwizeapi.md#search)

## Properties

### getAccess

•  **getAccess**: (accessKey: string) => Promise\<boolean>

*Defined in [src/types.ts:11](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L11)*

Gain access to private building using an access key

___

### getAccessibleUniversesForVenue

•  **getAccessibleUniversesForVenue**: (venue: [Venue](../classes/venue.md)) => Promise\<[Universe](../classes/universe.md)[]>

*Defined in [src/types.ts:15](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L15)*

Get the list of universes that are accessible for this venue

___

### getDirection

•  **getDirection**: (from: [DirectionPoint](directionpoint.md),to: [DirectionPoint](directionpoint.md) \| [DirectionPoint](directionpoint.md)[],mode: [DirectionMode](../classes/directionmode.md),waypoints?: [DirectionPoint](directionpoint.md)[],waypointsOptimize?: undefined \| false \| true) => Promise\<[Direction](../classes/direction.md)>

*Defined in [src/types.ts:21](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L21)*

Get the direction between a starting point and a destination.
The destination can be one or multiple DirectionPoint
You can optionally add some waypoints

___

### getDistances

•  **getDistances**: (from: [DirectionPoint](directionpoint.md),to: [DirectionPoint](directionpoint.md)[],directionMode: [DirectionMode](../classes/directionmode.md),sortByTraveltime: boolean) => Promise\<[DistanceResponse](../classes/distanceresponse.md)>

*Defined in [src/types.ts:31](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L31)*

Get the distances between a starting point and a list of destination

___

### getLayer

•  **getLayer**: (id: string) => Promise\<[Layer](../classes/layer.md)>

*Defined in [src/types.ts:40](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L40)*

Get a layer using its id

___

### getLayerWithAlias

•  **getLayerWithAlias**: (alias: string,venue: [Venue](../classes/venue.md)) => Promise\<[Layer](../classes/layer.md)>

*Defined in [src/types.ts:48](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L48)*

Get a layer using its alias. As a layer alias is only unique in a specific venue, you have to pass this venue as parameter

___

### getLayerWithName

•  **getLayerWithName**: (name: string,venue: [Venue](../classes/venue.md)) => Promise\<[Layer](../classes/layer.md)>

*Defined in [src/types.ts:44](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L44)*

Get a layer using its name. As a layer name is only unique in a specific venue, you have to pass this venue as parameter

___

### getLayers

•  **getLayers**: (params: [ApiFilter](../classes/apifilter.md)) => Promise\<[Layer](../classes/layer.md)[]>

*Defined in [src/types.ts:52](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L52)*

Get all the layers that match the ApiFilter

___

### getMainFroms

•  **getMainFroms**: (venue: [Venue](../classes/venue.md)) => Promise\<[Place](../classes/place.md)[]>

*Defined in [src/types.ts:56](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L56)*

Get the main froms for the specific venue

___

### getMainSearches

•  **getMainSearches**: (venue: [Venue](../classes/venue.md)) => Promise\<[MapwizeObject](mapwizeobject.md)[]>

*Defined in [src/types.ts:60](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L60)*

Get the main searches for the specific venue

___

### getPlace

•  **getPlace**: (id: string) => Promise\<[Place](../classes/place.md)>

*Defined in [src/types.ts:64](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L64)*

Get a place using its id

___

### getPlaceWithAlias

•  **getPlaceWithAlias**: (alias: string,venue: [Venue](../classes/venue.md)) => Promise\<[Place](../classes/place.md)>

*Defined in [src/types.ts:72](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L72)*

Get a place using its alias. As a place alias is only unique in a specific venue, you have to pass this venue as parameter

___

### getPlaceWithName

•  **getPlaceWithName**: (name: string,venue: [Venue](../classes/venue.md)) => Promise\<[Place](../classes/place.md)>

*Defined in [src/types.ts:68](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L68)*

Get a place using its name. As a place name is only unique in a specific venue, you have to pass this venue as parameter

___

### getPlacelist

•  **getPlacelist**: (id: string) => Promise\<[Placelist](../classes/placelist.md)>

*Defined in [src/types.ts:84](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L84)*

Get a placelist using its id

___

### getPlacelistWithAlias

•  **getPlacelistWithAlias**: (alias: string,venue: [Venue](../classes/venue.md)) => Promise\<[Placelist](../classes/placelist.md)>

*Defined in [src/types.ts:92](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L92)*

Get a placelist using its alias. As a placelist alias is only unique in a specific venue, you have to pass this venue as parameter

___

### getPlacelistWithName

•  **getPlacelistWithName**: (name: string,venue: [Venue](../classes/venue.md)) => Promise\<[Placelist](../classes/placelist.md)>

*Defined in [src/types.ts:88](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L88)*

Get a placelist using its name. As a placelist name is only unique in a specific venue, you have to pass this venue as parameter

___

### getPlacelists

•  **getPlacelists**: (filter: [ApiFilter](../classes/apifilter.md)) => Promise\<[Placelist](../classes/placelist.md)[]>

*Defined in [src/types.ts:96](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L96)*

Get all the placelists that match the ApiFilter

___

### getPlaces

•  **getPlaces**: (params: [ApiFilter](../classes/apifilter.md)) => Promise\<[Place](../classes/place.md)[]>

*Defined in [src/types.ts:76](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L76)*

Get all the places that match the ApiFilter

___

### getPlacesForPlacelist

•  **getPlacesForPlacelist**: (placelist: [Placelist](../classes/placelist.md)) => Promise\<[Place](../classes/place.md)[]>

*Defined in [src/types.ts:80](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L80)*

Get all places contained in the placelist

___

### getVenue

•  **getVenue**: (id: string) => Promise\<[Venue](../classes/venue.md)>

*Defined in [src/types.ts:100](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L100)*

Get a venue using its id

___

### getVenueWithAlias

•  **getVenueWithAlias**: (alias: string) => Promise\<[Venue](../classes/venue.md)>

*Defined in [src/types.ts:108](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L108)*

Get a venue using its alias

___

### getVenueWithName

•  **getVenueWithName**: (name: string) => Promise\<[Venue](../classes/venue.md)>

*Defined in [src/types.ts:104](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L104)*

Get a venue using its name

___

### getVenues

•  **getVenues**: (filter: [ApiFilter](../classes/apifilter.md)) => Promise\<[Venue](../classes/venue.md)[]>

*Defined in [src/types.ts:112](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L112)*

Get all venue that match the ApiFilter

___

### search

•  **search**: (searchParams: [SearchParams](../classes/searchparams.md)) => Promise\<[MapwizeObject](mapwizeobject.md)[]>

*Defined in [src/types.ts:116](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L116)*

Get search result using the SearchParams
