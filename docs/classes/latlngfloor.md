**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / LatLngFloor

# Class: LatLngFloor

LatLngFloor represent a geo coordinate with a floor in order to work inside building

## Hierarchy

* [LatLng](latlng.md)

  ↳ **LatLngFloor**

  ↳↳ [LatLngFloorInVenue](latlngfloorinvenue.md)

## Implements

* [DirectionPoint](../interfaces/directionpoint.md)

## Index

### Constructors

* [constructor](latlngfloor.md#constructor)

### Properties

* [floor](latlngfloor.md#floor)
* [latitude](latlngfloor.md#latitude)
* [longitude](latlngfloor.md#longitude)
* [objectClass](latlngfloor.md#objectclass)

## Constructors

### constructor

\+ **new LatLngFloor**(`latitude`: number, `longitude`: number, `floor`: number): [LatLngFloor](latlngfloor.md)

*Overrides [LatLng](latlng.md).[constructor](latlng.md#constructor)*

*Defined in [src/types.ts:845](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L845)*

#### Parameters:

Name | Type |
------ | ------ |
`latitude` | number |
`longitude` | number |
`floor` | number |

**Returns:** [LatLngFloor](latlngfloor.md)

## Properties

### floor

•  **floor**: number

*Defined in [src/types.ts:845](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L845)*

___

### latitude

•  **latitude**: number

*Inherited from [LatLng](latlng.md).[latitude](latlng.md#latitude)*

*Defined in [src/types.ts:832](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L832)*

___

### longitude

•  **longitude**: number

*Inherited from [LatLng](latlng.md).[longitude](latlng.md#longitude)*

*Defined in [src/types.ts:833](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L833)*

___

### objectClass

•  **objectClass**: string = "LatLngFloor"

*Overrides [LatLng](latlng.md).[objectClass](latlng.md#objectclass)*

*Defined in [src/types.ts:844](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L844)*
