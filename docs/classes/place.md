**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / Place

# Class: Place

Place are provided by the SDK and the API.
You should not instantiate it yourself.

## Hierarchy

* **Place**

## Implements

* [MapwizeObject](../interfaces/mapwizeobject.md)

## Index

### Constructors

* [constructor](place.md#constructor)

### Properties

* [\_id](place.md#_id)
* [alias](place.md#alias)
* [data](place.md#data)
* [entranceCoordinate](place.md#entrancecoordinate)
* [fillColor](place.md#fillcolor)
* [fillOpacity](place.md#fillopacity)
* [floor](place.md#floor)
* [iconBase64](place.md#iconbase64)
* [iconUrl](place.md#iconurl)
* [isClickable](place.md#isclickable)
* [isSearchable](place.md#issearchable)
* [isVisible](place.md#isvisible)
* [markerCoordinate](place.md#markercoordinate)
* [markerDisplay](place.md#markerdisplay)
* [maxZoom](place.md#maxzoom)
* [minZoom](place.md#minzoom)
* [name](place.md#name)
* [objectClass](place.md#objectclass)
* [order](place.md#order)
* [placeTypeId](place.md#placetypeid)
* [strokeColor](place.md#strokecolor)
* [strokeOpacity](place.md#strokeopacity)
* [strokeWidth](place.md#strokewidth)
* [translation](place.md#translation)
* [translations](place.md#translations)
* [universes](place.md#universes)
* [venueId](place.md#venueid)

## Constructors

### constructor

\+ **new Place**(`_id`: string, `venueId`: string, `name`: string, `alias`: string, `iconUrl`: string, `universes`: [Universe](universe.md)[], `translations`: [Translation](translation.md)[], `translation`: (language: string) => [Translation](translation.md), `iconBase64`: string, `fillColor`: string, `fillOpacity`: number, `strokeColor`: string, `strokeOpacity`: number, `strokeWidth`: number, `markerDisplay`: boolean, `order`: number, `floor`: number, `isSearchable`: boolean, `isVisible`: boolean, `isClickable`: boolean, `markerCoordinate`: [LatLngFloor](latlngfloor.md), `entranceCoordinate`: [LatLngFloor](latlngfloor.md), `placeTypeId`: string, `minZoom`: number, `maxZoom`: number): [Place](place.md)

*Defined in [src/types.ts:1030](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1030)*

#### Parameters:

Name | Type |
------ | ------ |
`_id` | string |
`venueId` | string |
`name` | string |
`alias` | string |
`iconUrl` | string |
`universes` | [Universe](universe.md)[] |
`translations` | [Translation](translation.md)[] |
`translation` | (language: string) => [Translation](translation.md) |
`iconBase64` | string |
`fillColor` | string |
`fillOpacity` | number |
`strokeColor` | string |
`strokeOpacity` | number |
`strokeWidth` | number |
`markerDisplay` | boolean |
`order` | number |
`floor` | number |
`isSearchable` | boolean |
`isVisible` | boolean |
`isClickable` | boolean |
`markerCoordinate` | [LatLngFloor](latlngfloor.md) |
`entranceCoordinate` | [LatLngFloor](latlngfloor.md) |
`placeTypeId` | string |
`minZoom` | number |
`maxZoom` | number |

**Returns:** [Place](place.md)

## Properties

### \_id

•  **\_id**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[_id](../interfaces/mapwizeobject.md#_id)*

*Defined in [src/types.ts:1005](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1005)*

___

### alias

•  **alias**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[alias](../interfaces/mapwizeobject.md#alias)*

*Defined in [src/types.ts:1008](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1008)*

___

### data

• `Optional` **data**: Map\<string, any> \| undefined

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[data](../interfaces/mapwizeobject.md#data)*

*Defined in [src/types.ts:1030](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1030)*

___

### entranceCoordinate

•  **entranceCoordinate**: [LatLngFloor](latlngfloor.md)

*Defined in [src/types.ts:1026](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1026)*

___

### fillColor

•  **fillColor**: string

*Defined in [src/types.ts:1014](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1014)*

___

### fillOpacity

•  **fillOpacity**: number

*Defined in [src/types.ts:1015](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1015)*

___

### floor

•  **floor**: number

*Defined in [src/types.ts:1021](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1021)*

___

### iconBase64

•  **iconBase64**: string

*Defined in [src/types.ts:1013](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1013)*

___

### iconUrl

•  **iconUrl**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[iconUrl](../interfaces/mapwizeobject.md#iconurl)*

*Defined in [src/types.ts:1009](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1009)*

___

### isClickable

•  **isClickable**: boolean

*Defined in [src/types.ts:1024](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1024)*

___

### isSearchable

•  **isSearchable**: boolean

*Defined in [src/types.ts:1022](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1022)*

___

### isVisible

•  **isVisible**: boolean

*Defined in [src/types.ts:1023](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1023)*

___

### markerCoordinate

•  **markerCoordinate**: [LatLngFloor](latlngfloor.md)

*Defined in [src/types.ts:1025](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1025)*

___

### markerDisplay

•  **markerDisplay**: boolean

*Defined in [src/types.ts:1019](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1019)*

___

### maxZoom

•  **maxZoom**: number

*Defined in [src/types.ts:1029](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1029)*

___

### minZoom

•  **minZoom**: number

*Defined in [src/types.ts:1028](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1028)*

___

### name

•  **name**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[name](../interfaces/mapwizeobject.md#name)*

*Defined in [src/types.ts:1007](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1007)*

___

### objectClass

•  **objectClass**: string = "Place"

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[objectClass](../interfaces/mapwizeobject.md#objectclass)*

*Defined in [src/types.ts:1004](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1004)*

___

### order

•  **order**: number

*Defined in [src/types.ts:1020](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1020)*

___

### placeTypeId

•  **placeTypeId**: string

*Defined in [src/types.ts:1027](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1027)*

___

### strokeColor

•  **strokeColor**: string

*Defined in [src/types.ts:1016](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1016)*

___

### strokeOpacity

•  **strokeOpacity**: number

*Defined in [src/types.ts:1017](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1017)*

___

### strokeWidth

•  **strokeWidth**: number

*Defined in [src/types.ts:1018](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1018)*

___

### translation

•  **translation**: (language: string) => [Translation](translation.md)

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translation](../interfaces/mapwizeobject.md#translation)*

*Defined in [src/types.ts:1012](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1012)*

___

### translations

•  **translations**: [Translation](translation.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translations](../interfaces/mapwizeobject.md#translations)*

*Defined in [src/types.ts:1011](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1011)*

___

### universes

•  **universes**: [Universe](universe.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[universes](../interfaces/mapwizeobject.md#universes)*

*Defined in [src/types.ts:1010](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1010)*

___

### venueId

•  **venueId**: string

*Defined in [src/types.ts:1006](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1006)*
