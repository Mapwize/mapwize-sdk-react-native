**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / MapwizeViewRef

# Interface: MapwizeViewRef

## Hierarchy

* **MapwizeViewRef**

## Index

### Properties

* [addImageToMap](mapwizeviewref.md#addimagetomap)
* [centerOn](mapwizeviewref.md#centeron)
* [getDirectionModes](mapwizeviewref.md#getdirectionmodes)
* [getFloor](mapwizeviewref.md#getfloor)
* [getFloors](mapwizeviewref.md#getfloors)
* [getFollowUserMode](mapwizeviewref.md#getfollowusermode)
* [getLanguage](mapwizeviewref.md#getlanguage)
* [getLanguageForVenue](mapwizeviewref.md#getlanguageforvenue)
* [getPreferredLanguage](mapwizeviewref.md#getpreferredlanguage)
* [getUniverse](mapwizeviewref.md#getuniverse)
* [getUniverseForVenue](mapwizeviewref.md#getuniverseforvenue)
* [getUniverses](mapwizeviewref.md#getuniverses)
* [grantAccess](mapwizeviewref.md#grantaccess)
* [setFloor](mapwizeviewref.md#setfloor)
* [setFollowUserMode](mapwizeviewref.md#setfollowusermode)
* [setLanguageForVenue](mapwizeviewref.md#setlanguageforvenue)
* [setPreferredLanguage](mapwizeviewref.md#setpreferredlanguage)
* [setUniverse](mapwizeviewref.md#setuniverse)
* [setUniverseForVenue](mapwizeviewref.md#setuniverseforvenue)

## Properties

### addImageToMap

•  **addImageToMap**: (imageName: string,imageBase64: string) => void

*Defined in [src/types.ts:169](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L169)*

Add an image to the map in order to be able to use its name in other Mapwize method/props

___

### centerOn

•  **centerOn**: (position: [LatLngFloor](../classes/latlngfloor.md) \| [Place](../classes/place.md) \| [PlacePreview](../classes/placepreview.md) \| [VenuePreview](../classes/venuepreview.md) \| [Venue](../classes/venue.md),zoom?: undefined \| number,animated?: undefined \| false \| true) => void

*Defined in [src/types.ts:182](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L182)*

Center on a specific location.

**`param`** Can be a LatLngFloor, a Place, a PlacePreview, a Venue or a VenuePreview

**`param`** Optional the targeted camera zoom level. Default value is 18

**`param`** Optional If true, the camera movement will be animated. Default is true

___

### getDirectionModes

•  **getDirectionModes**: () => Promise\<[DirectionMode](../classes/directionmode.md)[]>

*Defined in [src/types.ts:257](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L257)*

Get the accessible direction mode for the venue / universe currently displayed

___

### getFloor

•  **getFloor**: () => Promise\<[Floor](../classes/floor.md)>

*Defined in [src/types.ts:196](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L196)*

Get the current displayed floor

___

### getFloors

•  **getFloors**: () => Promise\<[Floor](../classes/floor.md)[]>

*Defined in [src/types.ts:200](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L200)*

Get the current accessible floors regarding the venue/universe displayed

___

### getFollowUserMode

•  **getFollowUserMode**: () => Promise\<[FollowUserMode](../classes/followusermode.md)>

*Defined in [src/types.ts:253](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L253)*

Get the follow user mode

___

### getLanguage

•  **getLanguage**: () => Promise\<string>

*Defined in [src/types.ts:223](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L223)*

Get the current language.
If in a venue, it will return the language set for this venue.
Otherwise, it will return the preferred language.

___

### getLanguageForVenue

•  **getLanguageForVenue**: (venue: [Venue](../classes/venue.md)) => Promise\<string>

*Defined in [src/types.ts:217](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L217)*

Get the language for a specific venue

___

### getPreferredLanguage

•  **getPreferredLanguage**: () => Promise\<string>

*Defined in [src/types.ts:209](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L209)*

Get the preferred language that should be chosen if available when entering in a venue

___

### getUniverse

•  **getUniverse**: () => Promise\<[Universe](../classes/universe.md)>

*Defined in [src/types.ts:237](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L237)*

Get the current universe.

___

### getUniverseForVenue

•  **getUniverseForVenue**: (venue: [Venue](../classes/venue.md)) => Promise\<[Universe](../classes/universe.md)>

*Defined in [src/types.ts:241](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L241)*

Get the universe for a specific venue.

___

### getUniverses

•  **getUniverses**: () => Promise\<[Universe](../classes/universe.md)[]>

*Defined in [src/types.ts:245](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L245)*

Get the list of accessible universe.

___

### grantAccess

•  **grantAccess**: (accessKey: string) => Promise\<void>

*Defined in [src/types.ts:174](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L174)*

Gain access to private building using an access key

___

### setFloor

•  **setFloor**: (floorNumber: number) => void

*Defined in [src/types.ts:192](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L192)*

Set the current displayed floor

**`param`** that will be set

___

### setFollowUserMode

•  **setFollowUserMode**: (followUserMode: [FollowUserMode](../classes/followusermode.md)) => void

*Defined in [src/types.ts:249](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L249)*

Set the follow user mode

___

### setLanguageForVenue

•  **setLanguageForVenue**: (language: string,venue: [Venue](../classes/venue.md)) => void

*Defined in [src/types.ts:213](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L213)*

Set the language for a specific venue

___

### setPreferredLanguage

•  **setPreferredLanguage**: (language: string) => void

*Defined in [src/types.ts:205](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L205)*

Set the preferred language that should be chosen if available when entering in a venue

___

### setUniverse

•  **setUniverse**: (universe: [Universe](../classes/universe.md)) => void

*Defined in [src/types.ts:229](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L229)*

Set universe. If in a venue, it will set the universe for this venue.
Otherwise, it will set the universe for the next venue you enter in.

___

### setUniverseForVenue

•  **setUniverseForVenue**: (universe: [Universe](../classes/universe.md),venue: [Venue](../classes/venue.md)) => void

*Defined in [src/types.ts:233](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L233)*

Set universe for the specific venue.
