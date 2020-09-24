**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / Layer

# Class: Layer

Layer reprensent a floor plan. Layers are provided by the SDK and Api.
You should instantiate it yourself.

## Hierarchy

* **Layer**

## Index

### Constructors

* [constructor](layer.md#constructor)

### Properties

* [\_id](layer.md#_id)
* [bounds](layer.md#bounds)
* [floor](layer.md#floor)
* [maxZoom](layer.md#maxzoom)
* [minZoom](layer.md#minzoom)
* [name](layer.md#name)
* [objectClass](layer.md#objectclass)
* [order](layer.md#order)
* [type](layer.md#type)
* [universes](layer.md#universes)
* [venueId](layer.md#venueid)

## Constructors

### constructor

\+ **new Layer**(`_id`: string, `name`: string, `floor`: number, `type`: string, `venueId`: string, `universes`: Array\<[Universe](universe.md)>, `order`: number, `bounds`: [LatLngBounds](latlngbounds.md), `minZoom`: number, `maxZoom`: number): [Layer](layer.md)

*Defined in [src/types.ts:897](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L897)*

#### Parameters:

Name | Type |
------ | ------ |
`_id` | string |
`name` | string |
`floor` | number |
`type` | string |
`venueId` | string |
`universes` | Array\<[Universe](universe.md)> |
`order` | number |
`bounds` | [LatLngBounds](latlngbounds.md) |
`minZoom` | number |
`maxZoom` | number |

**Returns:** [Layer](layer.md)

## Properties

### \_id

•  **\_id**: string

*Defined in [src/types.ts:888](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L888)*

___

### bounds

•  **bounds**: [LatLngBounds](latlngbounds.md)

*Defined in [src/types.ts:895](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L895)*

___

### floor

•  **floor**: number

*Defined in [src/types.ts:890](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L890)*

___

### maxZoom

•  **maxZoom**: number

*Defined in [src/types.ts:897](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L897)*

___

### minZoom

•  **minZoom**: number

*Defined in [src/types.ts:896](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L896)*

___

### name

•  **name**: string

*Defined in [src/types.ts:889](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L889)*

___

### objectClass

•  **objectClass**: string = "Layer"

*Defined in [src/types.ts:887](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L887)*

___

### order

•  **order**: number

*Defined in [src/types.ts:894](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L894)*

___

### type

•  **type**: string

*Defined in [src/types.ts:891](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L891)*

___

### universes

•  **universes**: Array\<[Universe](universe.md)>

*Defined in [src/types.ts:893](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L893)*

___

### venueId

•  **venueId**: string

*Defined in [src/types.ts:892](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L892)*
