# Mapwize-sdk-react-native

This react-native library allows developer to integrate Mapwize in their ReactNative application.

## Integration

### iOS

The minimum supported iOS version is 10.0.
MapwizeSDK > 3.2.1 is required

- Add the following lines to your Podfile in the iOS directory

```
pod 'mapwize-sdk-react-native'
```

- Run `pod install`

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
