# Mapwize SDK for React Native

This library allows developers to integrate Mapwize Indoor Maps & Wayfinding in their React Native mobile application.

## Integration

Run the following commands in your project directory

`yarn add mapwize-sdk-react-native`

`yarn install`

### iOS

The minimum supported iOS version is 10.0.
The minimum supported `MapwizeSDK` version is `3.2.1`.

- MapwizeSDK requires that you add use_frameworks! in your Podfile.

- Run `pod install` in your `ios` directory

- Add the `MGLMapboxMetricsEnabledSettingShownInApp` key in your info.plist and set it to `YES`

### Android

The minimum supported Android sdk version is 21.
The minimum supported `mapwize-sdk-android` version is `3.4.2`.

in your Project `build.gradle` file, you have to add :

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://www.jitpack.io' }
        maven { url 'https://maven.mapwize.io'}
    }
}
```

## Mapwize API Key

You'll need a Mapwize API key to load the Map and allow API requests.

To get your own Mapwize API key, sign up for a free account at [mapwize.io](https://www.mapwize.io). Then within the [Mapwize Studio](https://studio.mapwize.io), navigate to "API Keys" on the side menu.

## Creating your first map

The `MapwizeMap` component requires at least a MapwizeConfiguration props. The MapwizeConfiguration contains your Mapwize api key that will be used to display data on the map.

```jsx
const mapConfig = new MapwizeConfiguration('YOUR_API_KEY');
render() {
    return <MapwizeMap
        mapwizeConfiguration={mapConfig}/>
}

```

All instantiated maps are independent. You can add multiple maps with different MapwizeConfiguration in your application.

<!-- You can find all the available props in [MapwizeViewProps](###The-MapwizeMap-props). -->

## Using the map methods

You can use the `MapwizeViewRef` returned by the `onMapLoaded` property to run any map related method.

```jsx
const mapConfig = new MapwizeConfiguration('YOUR_API_KEY');
render() {
    return <MapwizeMap
        mapwizeConfiguration={mapConfig}
        onMapLoaded={(mapwizeMap: MapwizeViewRef) => mapwizeMap.setFloor(3)}
      />
}
```

<!-- You can find all the available methods in [MapwizeViewRef](###The-MapwizeViewRef-methods). -->

## Using the remote api

You can access to the Mapwize remote api methods using `CreateMapwizeAPI` to create an instance of MapwizeApi.

```typescript
const mapConfig = new MapwizeConfiguration('YOUR_API_KEY')
const api: MapwizeApi = CreateMapwizeAPI(mapConfig)
```

<!-- You can find all the available methods in [MapwizeApi](###The-MapwizeApi-methods). -->

## Using the offline manager

You can access the Mapwize offline Manger methods using `CreateOfflineManager` to create an instance of OfflineManager.

```typescript
const mapConfig = new MapwizeConfiguration('YOUR_API_KEY')
const offlineManager: OfflineManager = CreateOfflineManager(mapConfig)
```

<!-- You can find all the available methods in [OfflineManager](###The-OfflineManager-methods). -->

## Documentation

Here you can find the [Documentation](docs/globals.md)

## Contributing

While this project is mainly maintained by the Mapwize team, all contributions are welcome. Do not hesitate to open an issue or create a pull request on this project.

## Evolution and support

For any question or request, please contact us at <support@mapwize.io>.

## License

[MIT](LICENSE)
