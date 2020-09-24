**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / ClickEvent

# Class: ClickEvent

ClickEvent are provided by the SDK and the API.
You should not instantiate it yourself.

## Hierarchy

* **ClickEvent**

## Index

### Constructors

* [constructor](clickevent.md#constructor)

### Properties

* [eventType](clickevent.md#eventtype)
* [latLngFloor](clickevent.md#latlngfloor)
* [objectClass](clickevent.md#objectclass)
* [placePreview](clickevent.md#placepreview)
* [venuePreview](clickevent.md#venuepreview)

## Constructors

### constructor

\+ **new ClickEvent**(`eventType`: \"map\_click\" \| \"place\_click\" \| \"venue\_click\", `latLngFloor`: [LatLngFloor](latlngfloor.md), `placePreview?`: [PlacePreview](placepreview.md), `venuePreview?`: [VenuePreview](venuepreview.md)): [ClickEvent](clickevent.md)

*Defined in [src/types.ts:1256](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1256)*

#### Parameters:

Name | Type |
------ | ------ |
`eventType` | \"map\_click\" \| \"place\_click\" \| \"venue\_click\" |
`latLngFloor` | [LatLngFloor](latlngfloor.md) |
`placePreview?` | [PlacePreview](placepreview.md) |
`venuePreview?` | [VenuePreview](venuepreview.md) |

**Returns:** [ClickEvent](clickevent.md)

## Properties

### eventType

•  **eventType**: \"map\_click\" \| \"place\_click\" \| \"venue\_click\"

*Defined in [src/types.ts:1253](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1253)*

___

### latLngFloor

•  **latLngFloor**: [LatLngFloor](latlngfloor.md)

*Defined in [src/types.ts:1254](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1254)*

___

### objectClass

•  **objectClass**: string = "ClickEvent"

*Defined in [src/types.ts:1252](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1252)*

___

### placePreview

• `Optional` **placePreview**: [PlacePreview](placepreview.md)

*Defined in [src/types.ts:1255](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1255)*

___

### venuePreview

• `Optional` **venuePreview**: [VenuePreview](venuepreview.md)

*Defined in [src/types.ts:1256](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L1256)*
