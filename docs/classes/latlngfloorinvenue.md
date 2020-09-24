**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / LatLngFloorInVenue

# Class: LatLngFloorInVenue

LagLngFloorInVenue represent a geo coordinate with a floor and a specific venue. It may be useful with Api.getDirection and Api.getDistance

## Hierarchy

* [LatLngFloor](latlngfloor.md)

  ↳ **LatLngFloorInVenue**

## Implements

* [DirectionPoint](../interfaces/directionpoint.md)
* [DirectionPoint](../interfaces/directionpoint.md)

## Index

### Constructors

* [constructor](latlngfloorinvenue.md#constructor)

### Properties

* [floor](latlngfloorinvenue.md#floor)
* [latitude](latlngfloorinvenue.md#latitude)
* [longitude](latlngfloorinvenue.md#longitude)
* [objectClass](latlngfloorinvenue.md#objectclass)
* [venueId](latlngfloorinvenue.md#venueid)

## Constructors

### constructor

\+ **new LatLngFloorInVenue**(`venueId`: string, `latitude`: number, `longitude`: number, `floor`: number): [LatLngFloorInVenue](latlngfloorinvenue.md)

*Overrides [LatLngFloor](latlngfloor.md).[constructor](latlngfloor.md#constructor)*

*Defined in [src/types.ts:857](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L857)*

#### Parameters:

Name | Type |
------ | ------ |
`venueId` | string |
`latitude` | number |
`longitude` | number |
`floor` | number |

**Returns:** [LatLngFloorInVenue](latlngfloorinvenue.md)

## Properties

### floor

•  **floor**: number

*Inherited from [LatLngFloor](latlngfloor.md).[floor](latlngfloor.md#floor)*

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

•  **objectClass**: string = "LatLngFloorInVenue"

*Overrides [LatLngFloor](latlngfloor.md).[objectClass](latlngfloor.md#objectclass)*

*Defined in [src/types.ts:856](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L856)*

___

### venueId

•  **venueId**: string

*Defined in [src/types.ts:857](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L857)*
