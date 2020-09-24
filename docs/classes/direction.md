**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / Direction

# Class: Direction

Direction that can be displayed on the map.
This object is provided by the Api.getDirection method. You should not instantiate it yourself

## Hierarchy

* **Direction**

## Index

### Constructors

* [constructor](direction.md#constructor)

### Properties

* [bounds](direction.md#bounds)
* [distance](direction.md#distance)
* [from](direction.md#from)
* [mode](direction.md#mode)
* [objectClass](direction.md#objectclass)
* [route](direction.md#route)
* [subdirections](direction.md#subdirections)
* [to](direction.md#to)
* [traveltime](direction.md#traveltime)
* [waypoints](direction.md#waypoints)

## Constructors

### constructor

\+ **new Direction**(`from`: [DirectionPointWrapper](directionpointwrapper.md), `to`: [DirectionPointWrapper](directionpointwrapper.md), `distance`: number, `traveltime`: number, `route`: Array\<[Route](route.md)>, `bounds`: [LatLngBounds](latlngbounds.md), `waypoints`: Array\<[DirectionPointWrapper](directionpointwrapper.md)>, `subdirections`: Array\<[Direction](direction.md)>, `mode`: [DirectionMode](directionmode.md)): [Direction](direction.md)

*Defined in [src/types.ts:654](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L654)*

#### Parameters:

Name | Type |
------ | ------ |
`from` | [DirectionPointWrapper](directionpointwrapper.md) |
`to` | [DirectionPointWrapper](directionpointwrapper.md) |
`distance` | number |
`traveltime` | number |
`route` | Array\<[Route](route.md)> |
`bounds` | [LatLngBounds](latlngbounds.md) |
`waypoints` | Array\<[DirectionPointWrapper](directionpointwrapper.md)> |
`subdirections` | Array\<[Direction](direction.md)> |
`mode` | [DirectionMode](directionmode.md) |

**Returns:** [Direction](direction.md)

## Properties

### bounds

•  **bounds**: [LatLngBounds](latlngbounds.md)

*Defined in [src/types.ts:651](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L651)*

___

### distance

•  **distance**: number

*Defined in [src/types.ts:648](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L648)*

___

### from

•  **from**: [DirectionPointWrapper](directionpointwrapper.md)

*Defined in [src/types.ts:646](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L646)*

___

### mode

•  **mode**: [DirectionMode](directionmode.md)

*Defined in [src/types.ts:654](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L654)*

___

### objectClass

•  **objectClass**: string = "Direction"

*Defined in [src/types.ts:645](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L645)*

___

### route

•  **route**: Array\<[Route](route.md)>

*Defined in [src/types.ts:650](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L650)*

___

### subdirections

•  **subdirections**: Array\<[Direction](direction.md)>

*Defined in [src/types.ts:653](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L653)*

___

### to

•  **to**: [DirectionPointWrapper](directionpointwrapper.md)

*Defined in [src/types.ts:647](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L647)*

___

### traveltime

•  **traveltime**: number

*Defined in [src/types.ts:649](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L649)*

___

### waypoints

•  **waypoints**: Array\<[DirectionPointWrapper](directionpointwrapper.md)>

*Defined in [src/types.ts:652](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L652)*
