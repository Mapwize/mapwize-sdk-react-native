**mapwize-sdk-react-native**

> [README](../README.md) / [Globals](../globals.md) / OfflineManager

# Interface: OfflineManager

OfflineManager is the entry point to download Mapwize offline data.
It can be instantiated using createOfflineManager(mapwizeConfiguration:MapwizeConfiguration)

## Hierarchy

* **OfflineManager**

## Index

### Properties

* [checkForUpdate](offlinemanager.md#checkforupdate)
* [downloadData](offlinemanager.md#downloaddata)
* [getOfflineRegion](offlinemanager.md#getofflineregion)
* [getOfflineRegions](offlinemanager.md#getofflineregions)
* [hasOfflineRegion](offlinemanager.md#hasofflineregion)
* [removeData](offlinemanager.md#removedata)
* [updateData](offlinemanager.md#updatedata)

## Properties

### checkForUpdate

•  **checkForUpdate**: (offlineRegion: [OfflineRegion](../classes/offlineregion.md)) => Promise\<Boolean>

*Defined in [src/types.ts:160](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L160)*

check if there is an update for a given offline region

___

### downloadData

•  **downloadData**: (offlineRegion: [OfflineRegion](../classes/offlineregion.md),onProgress: (progress: number) => void) => Promise\<[OfflineRegion](../classes/offlineregion.md)>

*Defined in [src/types.ts:126](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L126)*

Download offline data for the given (venue, universe) pair

___

### getOfflineRegion

•  **getOfflineRegion**: (venue: [Venue](../classes/venue.md),universe: [Universe](../classes/universe.md)) => Promise\<[OfflineRegion](../classes/offlineregion.md)>

*Defined in [src/types.ts:148](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L148)*

Get an offline region using a (venue, universe) pair

**`param`** the venue to be downloaded.

**`param`** the universe to be downloaded.

___

### getOfflineRegions

•  **getOfflineRegions**: () => Promise\<[OfflineRegion](../classes/offlineregion.md)[]>

*Defined in [src/types.ts:152](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L152)*

Get all the offline regions

___

### hasOfflineRegion

•  **hasOfflineRegion**: (venue: [Venue](../classes/venue.md),universe: [Universe](../classes/universe.md)) => Promise\<boolean>

*Defined in [src/types.ts:142](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L142)*

Check if a pair of venue universe is accessible offline

**`param`** the venue to be downloaded.

**`param`** the universe to be downloaded.

___

### removeData

•  **removeData**: (offlineRegion: [OfflineRegion](../classes/offlineregion.md)) => Promise\<void>

*Defined in [src/types.ts:156](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L156)*

remove an offline region

___

### updateData

•  **updateData**: (offlineRegion: [OfflineRegion](../classes/offlineregion.md),onProgress: (progress: number) => void) => Promise\<[OfflineRegion](../classes/offlineregion.md)>

*Defined in [src/types.ts:133](https://github.com/Mapwize/mapwize-sdk-react-native/blob/18c4e52/src/types.ts#L133)*

Update the offline data for a given offline region if something has changed.
