**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / MapwizeViewProps

# Interface: MapwizeViewProps

## Hierarchy

* **MapwizeViewProps**

## Index

### Properties

* [mapDirection](mapwizeviewprops.md#mapdirection)
* [mapNavigation](mapwizeviewprops.md#mapnavigation)
* [mapOptions](mapwizeviewprops.md#mapoptions)
* [mapwizeConfiguration](mapwizeviewprops.md#mapwizeconfiguration)
* [markers](mapwizeviewprops.md#markers)
* [onDirectionModesChange](mapwizeviewprops.md#ondirectionmodeschange)
* [onFloorChange](mapwizeviewprops.md#onfloorchange)
* [onFloorChangeError](mapwizeviewprops.md#onfloorchangeerror)
* [onFloorWillChange](mapwizeviewprops.md#onfloorwillchange)
* [onFloorsChange](mapwizeviewprops.md#onfloorschange)
* [onFollowUserModeChange](mapwizeviewprops.md#onfollowusermodechange)
* [onLanguageChange](mapwizeviewprops.md#onlanguagechange)
* [onMapClick](mapwizeviewprops.md#onmapclick)
* [onMapLoaded](mapwizeviewprops.md#onmaploaded)
* [onMarkerClick](mapwizeviewprops.md#onmarkerclick)
* [onNavigationError](mapwizeviewprops.md#onnavigationerror)
* [onNavigationStart](mapwizeviewprops.md#onnavigationstart)
* [onNavigationStop](mapwizeviewprops.md#onnavigationstop)
* [onNavigationUpdate](mapwizeviewprops.md#onnavigationupdate)
* [onNavigationWillStart](mapwizeviewprops.md#onnavigationwillstart)
* [onUniverseChange](mapwizeviewprops.md#onuniversechange)
* [onUniverseChangeError](mapwizeviewprops.md#onuniversechangeerror)
* [onUniverseWillChange](mapwizeviewprops.md#onuniversewillchange)
* [onUniversesChange](mapwizeviewprops.md#onuniverseschange)
* [onVenueEnter](mapwizeviewprops.md#onvenueenter)
* [onVenueEnterError](mapwizeviewprops.md#onvenueentererror)
* [onVenueExit](mapwizeviewprops.md#onvenueexit)
* [onVenueWillEnter](mapwizeviewprops.md#onvenuewillenter)
* [placeStyles](mapwizeviewprops.md#placestyles)
* [promotedPlaces](mapwizeviewprops.md#promotedplaces)
* [ref](mapwizeviewprops.md#ref)
* [style](mapwizeviewprops.md#style)
* [userLocation](mapwizeviewprops.md#userlocation)

## Properties

### mapDirection

• `Optional` **mapDirection**: [DirectionProp](../classes/directionprop.md) \| undefined

*Defined in [src/types.ts:293](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L293)*

Direction that is currentrly displayed on the map

___

### mapNavigation

• `Optional` **mapNavigation**: [NavigationProp](../classes/navigationprop.md) \| undefined

*Defined in [src/types.ts:297](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L297)*

Navigation that is currentrly displayed on the map

___

### mapOptions

• `Optional` **mapOptions**: [MapOptions](../classes/mapoptions.md)

*Defined in [src/types.ts:273](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L273)*

The map options that will be used to initialized this instance of MapwizeView

___

### mapwizeConfiguration

•  **mapwizeConfiguration**: [MapwizeConfiguration](../classes/mapwizeconfiguration.md)

*Defined in [src/types.ts:269](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L269)*

The mapwize configuration that will be used for this instance of MapwizeView

___

### markers

• `Optional` **markers**: [MarkerProp](../classes/markerprop.md)[] \| undefined

*Defined in [src/types.ts:281](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L281)*

Markers that are currently displayed on the map.

___

### onDirectionModesChange

• `Optional` **onDirectionModesChange**: undefined \| (directionModes: [DirectionMode](../classes/directionmode.md)[]) => void

*Defined in [src/types.ts:372](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L372)*

Called when the accessible direction mode changed

___

### onFloorChange

• `Optional` **onFloorChange**: undefined \| (floor: [Floor](../classes/floor.md)) => void

*Defined in [src/types.ts:348](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L348)*

Called when a floor is loaded

___

### onFloorChangeError

• `Optional` **onFloorChangeError**: undefined \| (floor: [Floor](../classes/floor.md),error: Error) => void

*Defined in [src/types.ts:352](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L352)*

Called when something goes wrong trying to load a floor

___

### onFloorWillChange

• `Optional` **onFloorWillChange**: undefined \| (floor: [Floor](../classes/floor.md)) => void

*Defined in [src/types.ts:344](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L344)*

Called when a floor is going to be loaded

___

### onFloorsChange

• `Optional` **onFloorsChange**: undefined \| (floors: [Floor](../classes/floor.md)[]) => void

*Defined in [src/types.ts:340](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L340)*

Called when the accessible floors changed

___

### onFollowUserModeChange

• `Optional` **onFollowUserModeChange**: undefined \| (followUserMode: [FollowUserMode](../classes/followusermode.md)) => void

*Defined in [src/types.ts:364](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L364)*

Called when the follow user mode changed

___

### onLanguageChange

• `Optional` **onLanguageChange**: undefined \| (language: string) => void

*Defined in [src/types.ts:368](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L368)*

Called when the current language changed

___

### onMapClick

• `Optional` **onMapClick**: undefined \| (clickEvent: [ClickEvent](../classes/clickevent.md)) => void

*Defined in [src/types.ts:360](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L360)*

Called when the user click on the map

___

### onMapLoaded

• `Optional` **onMapLoaded**: undefined \| (ref: [MapwizeViewRef](mapwizeviewref.md)) => void

*Defined in [src/types.ts:302](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L302)*

Called when the MapwizeMap component is fully load and ready to be used.
You can use this method to get the MapwizeViewRef

___

### onMarkerClick

• `Optional` **onMarkerClick**: undefined \| (marker: [Marker](../classes/marker.md)) => void

*Defined in [src/types.ts:356](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L356)*

Called when the user click on a marker

___

### onNavigationError

• `Optional` **onNavigationError**: undefined \| (message: string) => void

*Defined in [src/types.ts:392](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L392)*

Called when something goes wrong with a navigation

___

### onNavigationStart

• `Optional` **onNavigationStart**: undefined \| () => void

*Defined in [src/types.ts:380](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L380)*

Called when a navigation started

___

### onNavigationStop

• `Optional` **onNavigationStop**: undefined \| () => void

*Defined in [src/types.ts:388](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L388)*

Called when a navigation stopped

___

### onNavigationUpdate

• `Optional` **onNavigationUpdate**: undefined \| (navigationInfo: [NavigationInfo](../classes/navigationinfo.md)) => void

*Defined in [src/types.ts:384](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L384)*

Called when a navigation update is avaible

___

### onNavigationWillStart

• `Optional` **onNavigationWillStart**: undefined \| () => void

*Defined in [src/types.ts:376](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L376)*

Called when a navigation is about to start

___

### onUniverseChange

• `Optional` **onUniverseChange**: undefined \| (universe: [Universe](../classes/universe.md)) => void

*Defined in [src/types.ts:332](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L332)*

Called when a universe is loaded

___

### onUniverseChangeError

• `Optional` **onUniverseChangeError**: undefined \| (universe: [Universe](../classes/universe.md),error: Error) => void

*Defined in [src/types.ts:336](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L336)*

Called when something goes wrong  trying to load a universe

___

### onUniverseWillChange

• `Optional` **onUniverseWillChange**: undefined \| (universe: [Universe](../classes/universe.md)) => void

*Defined in [src/types.ts:328](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L328)*

Called when a universe is going to be loaded

___

### onUniversesChange

• `Optional` **onUniversesChange**: undefined \| (universes: [Universe](../classes/universe.md)[]) => void

*Defined in [src/types.ts:324](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L324)*

Called when the accessible universes changed

___

### onVenueEnter

• `Optional` **onVenueEnter**: undefined \| (venue: [Venue](../classes/venue.md)) => void

*Defined in [src/types.ts:311](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L311)*

Called when a venue is loaded

___

### onVenueEnterError

• `Optional` **onVenueEnterError**: undefined \| (venue: [Venue](../classes/venue.md),error: Error) => void

*Defined in [src/types.ts:315](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L315)*

Called when something goes wrong trying to enter in a venue

___

### onVenueExit

• `Optional` **onVenueExit**: undefined \| (venue: [Venue](../classes/venue.md)) => void

*Defined in [src/types.ts:319](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L319)*

Called when a venue is exit

___

### onVenueWillEnter

• `Optional` **onVenueWillEnter**: undefined \| (venue: [Venue](../classes/venue.md)) => void

*Defined in [src/types.ts:307](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L307)*

Called when a venue start loading

___

### placeStyles

• `Optional` **placeStyles**: [PlaceStyleProp](../classes/placestyleprop.md)[] \| undefined

*Defined in [src/types.ts:289](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L289)*

Custom place styles

___

### promotedPlaces

• `Optional` **promotedPlaces**: ([Place](../classes/place.md) \| [PlacePreview](../classes/placepreview.md) \| [Placelist](../classes/placelist.md))[] \| undefined

*Defined in [src/types.ts:285](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L285)*

Places that are currently promoted on the map

___

### ref

• `Optional` **ref**: React.RefObject\<[MapwizeViewRef](mapwizeviewref.md)>

*Defined in [src/types.ts:265](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L265)*

___

### style

• `Optional` **style**: StyleProp\<ViewStyle>

*Defined in [src/types.ts:264](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L264)*

___

### userLocation

• `Optional` **userLocation**: [LatLngFloor](../classes/latlngfloor.md) \| undefined

*Defined in [src/types.ts:277](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L277)*

The user current location
