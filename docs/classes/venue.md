**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / Venue

# Class: Venue

Venue are provided by the SDK and the API.
You should not instantiate it yourself.

## Hierarchy

* **Venue**

## Implements

* [MapwizeObject](../interfaces/mapwizeobject.md)

## Index

### Constructors

* [constructor](venue.md#constructor)

### Properties

* [\_id](venue.md#_id)
* [alias](venue.md#alias)
* [data](venue.md#data)
* [defaultBearing](venue.md#defaultbearing)
* [defaultCenter](venue.md#defaultcenter)
* [defaultFloor](venue.md#defaultfloor)
* [defaultLanguage](venue.md#defaultlanguage)
* [defaultPitch](venue.md#defaultpitch)
* [defaultZoom](venue.md#defaultzoom)
* [iconBase64](venue.md#iconbase64)
* [iconUrl](venue.md#iconurl)
* [markerCoordinate](venue.md#markercoordinate)
* [name](venue.md#name)
* [objectClass](venue.md#objectclass)
* [supportedLanguages](venue.md#supportedlanguages)
* [translation](venue.md#translation)
* [translations](venue.md#translations)
* [universes](venue.md#universes)

## Constructors

### constructor

\+ **new Venue**(`_id`: string, `name`: string, `alias`: string, `iconUrl`: string, `universes`: [Universe](universe.md)[], `translations`: [Translation](translation.md)[], `translation`: (language: string) => [Translation](translation.md), `defaultLanguage`: string, `supportedLanguages`: Array\<string>, `iconBase64`: string, `markerCoordinate`: [LatLng](latlng.md), `defaultCenter`: [LatLng](latlng.md), `defaultZoom?`: undefined \| number, `defaultFloor?`: undefined \| number, `defaultBearing?`: undefined \| number, `defaultPitch?`: undefined \| number): [Venue](venue.md)

*Defined in [src/types.ts:1108](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1108)*

#### Parameters:

Name | Type |
------ | ------ |
`_id` | string |
`name` | string |
`alias` | string |
`iconUrl` | string |
`universes` | [Universe](universe.md)[] |
`translations` | [Translation](translation.md)[] |
`translation` | (language: string) => [Translation](translation.md) |
`defaultLanguage` | string |
`supportedLanguages` | Array\<string> |
`iconBase64` | string |
`markerCoordinate` | [LatLng](latlng.md) |
`defaultCenter` | [LatLng](latlng.md) |
`defaultZoom?` | undefined \| number |
`defaultFloor?` | undefined \| number |
`defaultBearing?` | undefined \| number |
`defaultPitch?` | undefined \| number |

**Returns:** [Venue](venue.md)

## Properties

### \_id

•  **\_id**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[_id](../interfaces/mapwizeobject.md#_id)*

*Defined in [src/types.ts:1092](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1092)*

___

### alias

•  **alias**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[alias](../interfaces/mapwizeobject.md#alias)*

*Defined in [src/types.ts:1094](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1094)*

___

### data

• `Optional` **data**: Map\<string, any> \| undefined

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[data](../interfaces/mapwizeobject.md#data)*

*Defined in [src/types.ts:1108](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1108)*

___

### defaultBearing

• `Optional` **defaultBearing**: undefined \| number

*Defined in [src/types.ts:1106](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1106)*

___

### defaultCenter

•  **defaultCenter**: [LatLng](latlng.md)

*Defined in [src/types.ts:1103](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1103)*

___

### defaultFloor

• `Optional` **defaultFloor**: undefined \| number

*Defined in [src/types.ts:1105](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1105)*

___

### defaultLanguage

•  **defaultLanguage**: string

*Defined in [src/types.ts:1099](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1099)*

___

### defaultPitch

• `Optional` **defaultPitch**: undefined \| number

*Defined in [src/types.ts:1107](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1107)*

___

### defaultZoom

• `Optional` **defaultZoom**: undefined \| number

*Defined in [src/types.ts:1104](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1104)*

___

### iconBase64

•  **iconBase64**: string

*Defined in [src/types.ts:1101](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1101)*

___

### iconUrl

•  **iconUrl**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[iconUrl](../interfaces/mapwizeobject.md#iconurl)*

*Defined in [src/types.ts:1095](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1095)*

___

### markerCoordinate

•  **markerCoordinate**: [LatLng](latlng.md)

*Defined in [src/types.ts:1102](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1102)*

___

### name

•  **name**: string

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[name](../interfaces/mapwizeobject.md#name)*

*Defined in [src/types.ts:1093](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1093)*

___

### objectClass

•  **objectClass**: string = "Venue"

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[objectClass](../interfaces/mapwizeobject.md#objectclass)*

*Defined in [src/types.ts:1091](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1091)*

___

### supportedLanguages

•  **supportedLanguages**: Array\<string>

*Defined in [src/types.ts:1100](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1100)*

___

### translation

•  **translation**: (language: string) => [Translation](translation.md)

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translation](../interfaces/mapwizeobject.md#translation)*

*Defined in [src/types.ts:1098](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1098)*

___

### translations

•  **translations**: [Translation](translation.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[translations](../interfaces/mapwizeobject.md#translations)*

*Defined in [src/types.ts:1097](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1097)*

___

### universes

•  **universes**: [Universe](universe.md)[]

*Implementation of [MapwizeObject](../interfaces/mapwizeobject.md).[universes](../interfaces/mapwizeobject.md#universes)*

*Defined in [src/types.ts:1096](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1096)*
