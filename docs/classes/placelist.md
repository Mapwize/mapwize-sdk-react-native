**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / Placelist

# Class: Placelist

Placelist are provided by the SDK and the API.
You should not instantiate it yourself.

## Hierarchy

* **Placelist**

## Implements

* [MapwizeObject](../interfaces/mapwizeobject.md)

## Index

### Constructors

* [constructor](placelist.md#constructor)

### Properties

* [\_id](placelist.md#_id)
* [alias](placelist.md#alias)
* [data](placelist.md#data)
* [iconUrl](placelist.md#iconurl)
* [isSearchable](placelist.md#issearchable)
* [name](placelist.md#name)
* [objectClass](placelist.md#objectclass)
* [placeIds](placelist.md#placeids)
* [translation](placelist.md#translation)
* [translations](placelist.md#translations)
* [universes](placelist.md#universes)
* [venueId](placelist.md#venueid)

## Constructors

### constructor

\+ **new Placelist**(`_id`: string, `venueId`: string, `name`: string, `alias`: string, `iconUrl`: string, `universes`: [Universe](universe.md)[], `translations`: [Translation](translation.md)[], `translation`: (language: string) => [Translation](translation.md), `placeIds`: Array\<string>, `isSearchable`: boolean, `data?`: Map\<string, any> \| undefined): [Placelist](placelist.md)

*Defined in [src/types.ts:1162](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1162)*

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
`placeIds` | Array\<string> |
`isSearchable` | boolean |
`data?` | Map\<string, any> \| undefined |

**Returns:** [Placelist](placelist.md)

## Properties

### \_id

•  **\_id**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[_id](../interfaces/mapwizeobject.md#_id)*

*Defined in [src/types.ts:1152](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1152)*

___

### alias

•  **alias**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[alias](../interfaces/mapwizeobject.md#alias)*

*Defined in [src/types.ts:1155](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1155)*

___

### data

• `Optional` **data**: Map\<string, any> \| undefined

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[data](../interfaces/mapwizeobject.md#data)*

*Defined in [src/types.ts:1158](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1158)*

___

### iconUrl

•  **iconUrl**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[iconUrl](../interfaces/mapwizeobject.md#iconurl)*

*Defined in [src/types.ts:1156](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1156)*

___

### isSearchable

•  **isSearchable**: boolean

*Defined in [src/types.ts:1162](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1162)*

___

### name

•  **name**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[name](../interfaces/mapwizeobject.md#name)*

*Defined in [src/types.ts:1154](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1154)*

___

### objectClass

•  **objectClass**: string = "Placelist"

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[objectClass](../interfaces/mapwizeobject.md#objectclass)*

*Defined in [src/types.ts:1151](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1151)*

___

### placeIds

•  **placeIds**: Array\<string>

*Defined in [src/types.ts:1161](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1161)*

___

### translation

•  **translation**: (language: string) => [Translation](translation.md)

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translation](../interfaces/mapwizeobject.md#translation)*

*Defined in [src/types.ts:1160](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1160)*

___

### translations

•  **translations**: [Translation](translation.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translations](../interfaces/mapwizeobject.md#translations)*

*Defined in [src/types.ts:1159](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1159)*

___

### universes

•  **universes**: [Universe](universe.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[universes](../interfaces/mapwizeobject.md#universes)*

*Defined in [src/types.ts:1157](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1157)*

___

### venueId

•  **venueId**: string

*Defined in [src/types.ts:1153](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1153)*
