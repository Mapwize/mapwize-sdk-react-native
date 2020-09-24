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

All instaciated maps are independant. You can add multiple maps with different MapwizeConfiguration in your application.

## Using the remote api

You can access to the Mapwize remote api methods by creating an instance of the MapwizeApi.

```javascript
const mapConfig = new MapwizeConfiguration('YOUR_API_KEY')
const api: MapwizeApi = CreateMapwizeAPI(mapConfig1)
```

## Contributing

While this project is mainly maintained by the Mapwize team, all contribution are welcome. Do not hesitate to open an issue or create pull request on this project.

## Evolution and support

For any question or request, please contact us at <support@mapwize.io>.

## License

MIT