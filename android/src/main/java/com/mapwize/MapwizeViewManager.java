package com.mapwize;

import android.util.Log;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.mapbox.mapboxsdk.geometry.LatLng;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import io.mapwize.mapwizesdk.api.ApiCallback;
import io.mapwize.mapwizesdk.api.Direction;
import io.mapwize.mapwizesdk.api.DirectionMode;
import io.mapwize.mapwizesdk.api.DirectionPoint;
import io.mapwize.mapwizesdk.api.LatLngFloor;
import io.mapwize.mapwizesdk.api.MapwizeApiFactory;
import io.mapwize.mapwizesdk.api.Place;
import io.mapwize.mapwizesdk.api.Style;
import io.mapwize.mapwizesdk.api.Universe;
import io.mapwize.mapwizesdk.api.Venue;
import io.mapwize.mapwizesdk.core.MapwizeConfiguration;
import io.mapwize.mapwizesdk.map.DirectionOptions;
import io.mapwize.mapwizesdk.map.FollowUserMode;
import io.mapwize.mapwizesdk.map.MapOptions;
import io.mapwize.mapwizesdk.map.Marker;

public class MapwizeViewManager extends SimpleViewManager<RNMapwizeView> {

  private static final String TAG = MapwizeViewManager.class.getSimpleName();
  public static final String REACT_CLASS = "RNMWZMap";
  protected static final String REGISTRATION_NAME = "registrationName";

  public static final String
    MAPWIZE_EVENT = "onMapwizeEvent",
    onMapLoaded_event = "onMapLoaded",
    onVenueExit_event = "onVenueExit",
    onVenueEnter_event = "onVenueEnter",
    onVenueWillEnter_event = "onVenueWillEnter",
    onVenueEnterError_event = "onVenueEnterError",
    onUniversesChange_event = "onUniversesChange",
    onUniverseWillChange_event = "onUniverseWillChange",
    onUniverseChange_event = "onUniverseChange",
    onUniverseChangeError_event = "onUniverseChangeError",
    onFloorWillChange_event = "onFloorWillChange",
    onFloorChange_event = "onFloorChange",
    onFloorChangeError_event = "onFloorChangeError",
    onFloorsChange_event = "onFloorsChange",
    onMarkerClick_event = "onMarkerClick",
    onClickEvent_event = "onMapClick",
    onLongClickEvent_event = "onLongClickEvent",
    onFollowUserModeChange_event = "onFollowUserModeChange",
    onLanguageChange_event = "onLanguageChange",
    onDirectionModesChange_event = "onDirectionModesChange",
//    onMapIdle_event = "onMapIdle",
    onNavigationWillStart_event = "onNavigationWillStart",
    onNavigationStart_event = "onNavigationStart",
    onNavigationUpdate_event = "onNavigationUpdate",
    onNavigationStop_event = "onNavigationStop",
    onNavigationError_event = "onNavigationError";
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected RNMapwizeView createViewInstance(ThemedReactContext reactContext) {
    return new RNMapwizeView(reactContext);
  }

  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    Map<String, Object> exportedEvents = new HashMap<>();
    exportedEvents.put(MAPWIZE_EVENT, MapBuilder.of(REGISTRATION_NAME, MAPWIZE_EVENT));
    exportedEvents.put(onMapLoaded_event, MapBuilder.of(REGISTRATION_NAME, onMapLoaded_event));
    exportedEvents.put(onVenueExit_event, MapBuilder.of(REGISTRATION_NAME, onVenueExit_event));
    exportedEvents.put(onVenueEnter_event, MapBuilder.of(REGISTRATION_NAME, onVenueEnter_event));
    exportedEvents.put(onVenueWillEnter_event, MapBuilder.of(REGISTRATION_NAME, onVenueWillEnter_event));
    exportedEvents.put(onVenueEnterError_event, MapBuilder.of(REGISTRATION_NAME, onVenueEnterError_event));
    exportedEvents.put(onUniversesChange_event, MapBuilder.of(REGISTRATION_NAME, onUniversesChange_event));
    exportedEvents.put(onUniverseWillChange_event, MapBuilder.of(REGISTRATION_NAME, onUniverseWillChange_event));
    exportedEvents.put(onUniverseChange_event, MapBuilder.of(REGISTRATION_NAME, onUniverseChange_event));
    exportedEvents.put(onUniverseChangeError_event, MapBuilder.of(REGISTRATION_NAME, onUniverseChangeError_event));
    exportedEvents.put(onFloorWillChange_event, MapBuilder.of(REGISTRATION_NAME, onFloorWillChange_event));
    exportedEvents.put(onFloorChange_event, MapBuilder.of(REGISTRATION_NAME, onFloorChange_event));
    exportedEvents.put(onFloorChangeError_event, MapBuilder.of(REGISTRATION_NAME, onFloorChangeError_event));
    exportedEvents.put(onFloorsChange_event, MapBuilder.of(REGISTRATION_NAME, onFloorsChange_event));
    exportedEvents.put(onMarkerClick_event, MapBuilder.of(REGISTRATION_NAME, onMarkerClick_event));
    exportedEvents.put(onClickEvent_event, MapBuilder.of(REGISTRATION_NAME, onClickEvent_event));
    exportedEvents.put(onLongClickEvent_event, MapBuilder.of(REGISTRATION_NAME, onLongClickEvent_event));
    exportedEvents.put(onFollowUserModeChange_event, MapBuilder.of(REGISTRATION_NAME, onFollowUserModeChange_event));
    exportedEvents.put(onLanguageChange_event, MapBuilder.of(REGISTRATION_NAME, onLanguageChange_event));
    exportedEvents.put(onDirectionModesChange_event, MapBuilder.of(REGISTRATION_NAME, onDirectionModesChange_event));
//    exportedEvents.put(onMapIdle_event, MapBuilder.of(REGISTRATION_NAME, onMapIdle_event));
    exportedEvents.put(onNavigationWillStart_event, MapBuilder.of(REGISTRATION_NAME, onNavigationWillStart_event));
    exportedEvents.put(onNavigationStart_event, MapBuilder.of(REGISTRATION_NAME, onNavigationStart_event));
    exportedEvents.put(onNavigationUpdate_event, MapBuilder.of(REGISTRATION_NAME, onNavigationUpdate_event));
    exportedEvents.put(onNavigationStop_event, MapBuilder.of(REGISTRATION_NAME, onNavigationStop_event));
    exportedEvents.put(onNavigationError_event, MapBuilder.of(REGISTRATION_NAME, onNavigationError_event));
    return exportedEvents;
  }


  @ReactProp(name = "mapwizeConfiguration")
  public void setMapwizeConfiguration(RNMapwizeView rnMapView, ReadableMap options) {
    MapwizeConfiguration mapwizeConfiguration = RNMapUtil.parseMapwizeConfiguration(options, rnMapView.getContext());

    if (mapwizeConfiguration.getApiKey().equals("")) {
      Log.e(TAG, "can't create MapwizeConfiguration without ApiKey");
      return;
    }
    MapwizeContext mapwizeContext = new MapwizeContext(mapwizeConfiguration, MapwizeApiFactory.getApi(mapwizeConfiguration));
    rnMapView.setMapwizeContext(mapwizeContext);
  }

  @ReactProp(name = "userLocation")
  public void setuserLocation(RNMapwizeView rnMapView, ReadableMap userLocationRN) {
    if (userLocationRN == null) {
      rnMapView.setUserLocation(null);
      return;
    }
    LatLngFloor userLocation = (LatLngFloor) RNMapUtil.objectFromRNMap(userLocationRN);
    rnMapView.setUserLocation(userLocation);
  }

  @ReactProp(name = "mapOptions")
  public void setMapOptions(RNMapwizeView rnMapView, ReadableMap options) {
    MapOptions mapOptions = (MapOptions) RNMapUtil.objectFromRNMap(options);
    Double tilt = null;
    if (options.hasKey("tilt")) {
      tilt = options.getDouble("tilt");
    }
    Double bearing = null;
    if (options.hasKey("bearing")) {
      bearing = options.getDouble("bearing");
    }
    boolean compassEnabled = true;
    if (options.hasKey("compassEnabled")) {
      compassEnabled = options.getBoolean("compassEnabled");
    }
    rnMapView.setMapOptions(mapOptions, tilt, bearing, compassEnabled);
  }

  @ReactProp(name = "mapDirection")
  public void setMapDirection(RNMapwizeView rnMapView, ReadableMap options) {
    if (options == null) {
      rnMapView.removeDirection();
      return;
    }
    Direction mapDirection = (Direction) RNMapUtil.objectFromRNMap(options.getMap("direction"));
    DirectionOptions directionOptions = null;
    if (options.hasKey("directionOptions")) {
      directionOptions = (DirectionOptions) RNMapUtil.objectFromRNMap(options.getMap("directionOptions"));
    }
    rnMapView.setDirection(mapDirection, directionOptions);
  }
  @ReactProp(name = "mapNavigation")
  public void setMapNavigation(RNMapwizeView rnMapView, ReadableMap options) {
    if (options == null) {
      rnMapView.stopNavigation();
      return;
    }
    HashMap<String, Object> navigationProps = new  HashMap<>();
    DirectionPoint destination = (DirectionPoint) RNMapUtil.objectFromRNMap(options.getMap("destination"));
    navigationProps.put("destination", destination);
    DirectionMode directionMode = (DirectionMode) RNMapUtil.objectFromRNMap(options.getMap("directionMode"));
    navigationProps.put("directionMode", directionMode);
    DirectionOptions directionOptions = (DirectionOptions) RNMapUtil.objectFromRNMap(options.getMap("directionOptions"));
    navigationProps.put("directionOptions", directionOptions);
    Double maxDistanceBeforeRecompute = null;
    if (options.hasKey("maxDistanceBeforeRecompute")) {
      maxDistanceBeforeRecompute = options.getDouble("maxDistanceBeforeRecompute");
      navigationProps.put("maxDistanceBeforeRecompute", maxDistanceBeforeRecompute);
    }
    rnMapView.setMapNavigation(navigationProps);
  }

  @ReactProp(name = "markers")
  public void setMarkers(RNMapwizeView rnMapView, ReadableArray options) {
    if (options == null) {
      rnMapView.removeMarkers();
      return;
    }
    List<HashMap<String, Object>> markers = RNMapUtil.parseMarkers(options);
    rnMapView.setMarkers(markers);
  }

  @ReactProp(name = "placeStyles")
  public void setPlaceStyles(RNMapwizeView rnMapView, ReadableArray options) {
    if (options == null) {
      rnMapView.removePlaceStyles();
      return;
    }
    HashMap<String, Style> styles = RNMapUtil.parsePlaceStyles(options);
    rnMapView.setPlaceStyles(styles);

  }

  @ReactProp(name = "promotedPlaces")
  public void setPromotedPlaces(RNMapwizeView rnMapView, ReadableArray options) {
    if (options == null) {
      rnMapView.removePromotedPlaces();
      return;
    }
    List<Object> promotedPlaces = new ArrayList<>(Arrays.asList(RNMapUtil.fromRNArray(options)));
    rnMapView.setPromotedPlaces(promotedPlaces);
  }


  @Override
  public void receiveCommand(@NonNull RNMapwizeView rnMapView, String commandId, @Nullable ReadableArray args) {
    int promiseId = args.getInt(0);
    try {
      switch (commandId) {
        case "componentDidMount": {
          rnMapView.load();
          break;
        }
        case "centerOn": {
          Object object = (Object) RNMapUtil.objectFromRNMap(args.getMap(1));
          Double zoom = 18.0;
          if (!args.isNull(2)) {
            zoom = args.getDouble(2);
          }
          Boolean animated = false;
          if (!args.isNull(3)) {
            animated = args.getBoolean(3);
          }
          rnMapView.centerOn(promiseId, object, zoom, animated);
          break;
        }
        case "setFloor" : {
          rnMapView.setFloor(promiseId, args.getDouble(1));
          break;
        }
        case "getFloor" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getFloor());
          break;
        }
        case "getFloors" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getFloors());
          break;
        }
        case "getDirectionModes" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getDirectionModes());
          break;
        }
        case "getUniverses" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getUniverses());
          break;
        }
        case "setUniverse" : {
          Universe universe = (Universe) RNMapUtil.objectFromRNMap(args.getMap(1));
          rnMapView.setUniverse(universe);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        case "getUniverse" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getUniverse());
          break;
        }
        case "setUniverseForVenue" : {
          Universe universe = (Universe) RNMapUtil.objectFromRNMap(args.getMap(1));
          Venue venue = (Venue) RNMapUtil.objectFromRNMap(args.getMap(2));
          rnMapView.setUniverseForVenue(universe, venue);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        case "getUniverseForVenue" : {
          Venue venue = (Venue) RNMapUtil.objectFromRNMap(args.getMap(1));
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getUniverseForVenue(venue));
          break;
        }
        case "getFollowUserMode" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getFollowUserMode());
          break;
        }
        case "setFollowUserMode" : {
          FollowUserMode followUserMode = (FollowUserMode) RNMapUtil.objectFromRNMap(args.getMap(1));
          rnMapView.setFollowUserMode(followUserMode);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        case "getLanguage" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getLanguage());
          break;
        }
        case "getLanguageForVenue" : {
          Venue venue = (Venue) RNMapUtil.objectFromRNMap(args.getMap(1));
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getLanguageForVenue(venue));
          break;
        }
        case "setLanguageForVenue" : {
          String language = args.getString(1);
          Venue venue = (Venue) RNMapUtil.objectFromRNMap(args.getMap(2));
          rnMapView.setLanguageForVenue(language, venue);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        case "getPreferredLanguage" : {
          rnMapView.sendPromiseResultToJS(promiseId, true, rnMapView.getPreferredLanguage());
          break;
        }
        case "setPreferredLanguage" : {
          String language = args.getString(1);
          rnMapView.setPreferredLanguage(language);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        case "grantAccess" : {
          String accessKey = args.getString(1);
          rnMapView.grantAccess(promiseId, accessKey);
          //answer is in grantAccess
          break;
        }
        case "addImageToMap" : {
          String imageName = args.getString(1);
          String imageBase64 = args.getString(2);
          rnMapView.addImageToMap(imageName, imageBase64);
          rnMapView.sendPromiseResultToJS(promiseId, true, null);
          break;
        }
        default: {
          throw new IllegalArgumentException("Unknown command : " + commandId);
        }
      }

    } catch (Throwable t) {
      rnMapView.sendPromiseResultToJS(promiseId, false, "Can't execute command: " + t.getMessage());
    }
  }
}

