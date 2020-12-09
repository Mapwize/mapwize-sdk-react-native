package com.mapwize;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.util.Log;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.mapbox.mapboxsdk.Mapbox;
import com.mapbox.mapboxsdk.camera.CameraPosition;
import com.mapbox.mapboxsdk.geometry.LatLng;
import com.mapbox.mapboxsdk.maps.MapboxMap;

import java.util.HashMap;
import java.util.List;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import io.indoorlocation.core.IndoorLocation;
import io.mapwize.mapwizesdk.api.ApiCallback;
import io.mapwize.mapwizesdk.api.Direction;
import io.mapwize.mapwizesdk.api.DirectionMode;
import io.mapwize.mapwizesdk.api.DirectionPoint;
import io.mapwize.mapwizesdk.api.Floor;
import io.mapwize.mapwizesdk.api.LatLngFloor;
import io.mapwize.mapwizesdk.api.Place;
import io.mapwize.mapwizesdk.api.Placelist;
import io.mapwize.mapwizesdk.api.Style;
import io.mapwize.mapwizesdk.api.Universe;
import io.mapwize.mapwizesdk.api.Venue;
import io.mapwize.mapwizesdk.map.DirectionOptions;
import io.mapwize.mapwizesdk.map.FollowUserMode;
import io.mapwize.mapwizesdk.map.MapOptions;
import io.mapwize.mapwizesdk.map.MapwizeMap;
import io.mapwize.mapwizesdk.map.MapwizeView;
import io.mapwize.mapwizesdk.map.NavigationException;
import io.mapwize.mapwizesdk.map.NavigationInfo;
import io.mapwize.mapwizesdk.map.OnNavigationUpdateListener;
import io.mapwize.mapwizesdk.map.PlacePreview;
import io.mapwize.mapwizesdk.map.VenuePreview;

import static com.mapwize.MapwizeViewManager.MAPWIZE_EVENT;
import static com.mapwize.MapwizeViewManager.onClickEvent_event;
import static com.mapwize.MapwizeViewManager.onDirectionModesChange_event;
import static com.mapwize.MapwizeViewManager.onFloorChangeError_event;
import static com.mapwize.MapwizeViewManager.onFloorChange_event;
import static com.mapwize.MapwizeViewManager.onFloorWillChange_event;
import static com.mapwize.MapwizeViewManager.onFloorsChange_event;
import static com.mapwize.MapwizeViewManager.onFollowUserModeChange_event;
import static com.mapwize.MapwizeViewManager.onLanguageChange_event;
import static com.mapwize.MapwizeViewManager.onLongClickEvent_event;
import static com.mapwize.MapwizeViewManager.onMapLoaded_event;
import static com.mapwize.MapwizeViewManager.onMarkerClick_event;
import static com.mapwize.MapwizeViewManager.onNavigationError_event;
import static com.mapwize.MapwizeViewManager.onNavigationStart_event;
import static com.mapwize.MapwizeViewManager.onNavigationStop_event;
import static com.mapwize.MapwizeViewManager.onNavigationUpdate_event;
import static com.mapwize.MapwizeViewManager.onNavigationWillStart_event;
import static com.mapwize.MapwizeViewManager.onUniverseChangeError_event;
import static com.mapwize.MapwizeViewManager.onUniverseChange_event;
import static com.mapwize.MapwizeViewManager.onUniverseWillChange_event;
import static com.mapwize.MapwizeViewManager.onUniversesChange_event;
import static com.mapwize.MapwizeViewManager.onVenueEnterError_event;
import static com.mapwize.MapwizeViewManager.onVenueEnter_event;
import static com.mapwize.MapwizeViewManager.onVenueExit_event;
import static com.mapwize.MapwizeViewManager.onVenueWillEnter_event;

/**
 * Quelques notes :
 * <p>
 * - Les fonctions qui prennent en paramètre un promiseId sont "Imperatives" (cad ref.setXXX). Les fonctions qui n'en prennent pas sont déclaratives <Map xxx={}/>
 */

public class RNMapwizeView extends FrameLayout {

  private final static String TAG = "MapwizeView";

  private static final int
    LIFECYCLESTEP_NOT_STARTED = 0,
    LIFECYCLESTEP_RESUMED = 1,
    LIFECYCLESTEP_PAUSED = 2,
    LIFECYCLESTEP_DESTROYED = 3;

  private MapwizeView mapwizeView;
  private MapboxMap mapboxMap;
  private MapwizeMap mapwizeMap;
  private ManualIndoorLocationProvider locationProvider;
  private Double initialFloor = null;
  private List<LatLng> initialPoints = null;
  private MapOptions mapOptions = null;
  private Double tilt = null;
  private Double bearing = null;
  private boolean compassEnabled =  true;

  private int viewLifecycleStep = LIFECYCLESTEP_NOT_STARTED, mapviewLifecycleStep;
  private HashMap<String, Style> placesStyles;
  private List<Object> promotedPlaces;
  private LatLngFloor userLocation;
  private List<HashMap<String, Object>> markers;
  private HashMap<String, Object> navigationProps;

  public RNMapwizeView(@NonNull ThemedReactContext context) {
    super(context);
    context.addLifecycleEventListener(new LifecycleEventListener() {
      @Override
      public void onHostResume() {
        viewLifecycleStep = LIFECYCLESTEP_RESUMED;
        mapviewLifecycleStep = syncMapviewLifecycle(mapwizeView, viewLifecycleStep, mapviewLifecycleStep);
      }

      @Override
      public void onHostPause() {
        viewLifecycleStep = LIFECYCLESTEP_PAUSED;
        mapviewLifecycleStep = syncMapviewLifecycle(mapwizeView, viewLifecycleStep, mapviewLifecycleStep);
      }

      @Override
      public void onHostDestroy() {
        viewLifecycleStep = LIFECYCLESTEP_DESTROYED;
        mapviewLifecycleStep = syncMapviewLifecycle(mapwizeView, viewLifecycleStep, mapviewLifecycleStep);
      }
    });
  }

  // static : to be sure the function is pure and does not use state
  private static int syncMapviewLifecycle(MapwizeView mapView, int viewLifecycleStep, int mapviewLifecycleStep) {
    if (mapView != null) {
      switch (viewLifecycleStep) {
        case LIFECYCLESTEP_NOT_STARTED:
          break;
        case LIFECYCLESTEP_RESUMED: {
          if (mapviewLifecycleStep == LIFECYCLESTEP_NOT_STARTED) {
            mapView.onStart();
            mapView.onResume();
          } else if (mapviewLifecycleStep == LIFECYCLESTEP_PAUSED) {
            mapView.onResume();
          }
          mapviewLifecycleStep = LIFECYCLESTEP_RESUMED;
          break;
        }
        case LIFECYCLESTEP_PAUSED: {
          if (mapviewLifecycleStep == LIFECYCLESTEP_RESUMED) {
            mapView.onPause();
          }
          mapviewLifecycleStep = LIFECYCLESTEP_PAUSED;
          break;
        }
        case LIFECYCLESTEP_DESTROYED: {
          if (mapviewLifecycleStep == LIFECYCLESTEP_RESUMED) {
            mapView.onPause();
            mapView.onStop();
            mapView.onDestroy();
          } else if (mapviewLifecycleStep == LIFECYCLESTEP_PAUSED) {
            mapView.onStop();
            mapView.onDestroy();
          }
          mapviewLifecycleStep = LIFECYCLESTEP_DESTROYED;
          break;
        }

      }
    }

    return mapviewLifecycleStep;
  }

  private void sendEventToJS(String event, Object data) {
    WritableMap dataRN = Arguments.createMap();
    RNMapUtil.append(dataRN, "value", data);
    ((ReactContext) getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
      getId(),
      event,
      dataRN
    );
  }

  public void sendPromiseResultToJS(int promiseId, boolean success, Object data) {
    WritableMap event = Arguments.createMap();
    event.putInt("promiseId", promiseId);
    event.putBoolean("success", success);
    RNMapUtil.append(event, "value", data);

    ((ReactContext) getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
      getId(),
      MAPWIZE_EVENT,
      event
    );
  }

  // Fix react-native : cf https://github.com/facebook/react-native/issues/4990
  private final Runnable measureAndLayout = () -> {
    measure(
      MeasureSpec.makeMeasureSpec(getWidth(), MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(getHeight(), MeasureSpec.EXACTLY)
    );
    layout(getLeft(), getTop(), getRight(), getBottom());
  };

  @Override
  public void requestLayout() {
    super.requestLayout();
    post(measureAndLayout);
  }


  private MapwizeContext mapwizeContext;

  protected void setMapwizeContext(MapwizeContext mapwizeContext) {
    this.mapwizeContext = mapwizeContext;
  }

  protected void setMapOptions(MapOptions mapOptions, Double tilt, Double bearing, boolean compassEnabled) {
    this.mapOptions = mapOptions;
    this.tilt = tilt;
    this.bearing = bearing;
    this.compassEnabled = compassEnabled;
  }

  static boolean mapboxInitialised = false;

  protected void load() {
    if (mapwizeContext == null) {
      return;
    }
    post(() -> {

      if (mapwizeView != null) {
        removeAllViews();
        mapwizeView.onDestroy();
        syncMapviewLifecycle(mapwizeView, LIFECYCLESTEP_DESTROYED, mapviewLifecycleStep);
        mapwizeView = null;
        mapwizeMap = null;
      }

      if (!mapboxInitialised) {
        Mapbox.getInstance(getContext(), "pk.mapwize");
        mapboxInitialised = true;
      }

      FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT);

      MapOptions mapOptions = this.mapOptions;
      if (mapOptions == null) {
        mapOptions = new MapOptions.Builder().build();
      }
      mapwizeView = new MapwizeView(getContext(), mapwizeContext.getConfiguration(), mapOptions);//TODO check the mapwizeConfiguration context
      addView(mapwizeView, params);

      mapwizeView.onCreate(new Bundle());
      mapwizeView.getMapAsync((_mapwizeMap) -> {
        mapwizeMap = _mapwizeMap;

        if (!this.compassEnabled) {
          mapwizeMap.getMapboxMap().getUiSettings().setCompassEnabled(false);
        }

        if (this.tilt != null || this.bearing != null) {
          CameraPosition cameraPosition = mapwizeMap.getMapboxMap().getCameraPosition();
          CameraPosition.Builder builder = new CameraPosition.Builder(cameraPosition);
          if (this.tilt != null) {
            builder.tilt(tilt);
          }
          if (this.bearing != null) {
            builder.bearing(bearing);
          }
          mapwizeMap.getMapboxMap().setCameraPosition(builder.build());
        }


        mapwizeMap.addOnClickListener(clickEvent -> sendEventToJS(onClickEvent_event, clickEvent));
        mapwizeMap.addOnLongClickListener(clickEvent -> sendEventToJS(onLongClickEvent_event, clickEvent));
        mapwizeMap.addOnMarkerClickListener(marker -> sendEventToJS(onMarkerClick_event, marker));

        mapwizeMap.addOnFloorChangeListener(new MapwizeMap.OnFloorChangeListener() {
          @Override
          public void onFloorWillChange(@Nullable Floor floor) {
            if (floor != null) {
              sendEventToJS(onFloorWillChange_event, floor);
            }
          }

          @Override
          public void onFloorChange(@Nullable Floor floor) {
            if (floor != null) {
              sendEventToJS(onFloorChange_event, floor);
            }
          }

          @Override
          public void onFloorChangeError(@Nullable Floor floor, @NonNull Throwable error) {
            if (floor != null) {
              sendEventToJS(onFloorChangeError_event, floor);
            }
            Log.e(TAG, "Unable to change floor ", error);
          }
        });
        mapwizeMap.addOnFloorsChangeListener(floors -> {
          if (floors != null) {
            sendEventToJS(onFloorsChange_event, floors);
          }
        });

        mapwizeMap.addOnUniverseChangeListener(new MapwizeMap.OnUniverseChangeListener() {
          @Override
          public void onUniversesChange(@NonNull List<Universe> list) {
            sendEventToJS(onUniversesChange_event, list);
          }

          @Override
          public void onUniverseWillChange(@NonNull Universe universe) {
            sendEventToJS(onUniverseWillChange_event, universe);
          }

          @Override
          public void onUniverseChange(@Nullable Universe universe) {
            sendEventToJS(onUniverseChange_event, universe);
          }

          @Override
          public void onUniverseChangeError(@NonNull Universe universe, @NonNull Throwable throwable) {
            sendEventToJS(onUniverseChangeError_event, universe);
            Log.e(TAG, "Unable to change universe ", throwable);
          }
        });

        mapwizeMap.addOnVenueEnterListener(new MapwizeMap.OnVenueEnterListener() {
          @Override
          public void onVenueEnter(@NonNull Venue venue) {
            sendEventToJS(onVenueEnter_event, venue);
          }

          @Override
          public void onVenueWillEnter(@NonNull Venue venue) {
            sendEventToJS(onVenueWillEnter_event, venue);
          }

          @Override
          public void onVenueEnterError(@NonNull Venue venue, @NonNull Throwable throwable) {
            sendEventToJS(onVenueEnterError_event, venue);
            Log.e(TAG, "Unable to enter venue ", throwable);
          }
        });
        mapwizeMap.addOnVenueExitListener(venue -> sendEventToJS(onVenueExit_event, venue));

        mapwizeMap.addOnFollowUserModeChangeListener(followUserMode -> sendEventToJS(onFollowUserModeChange_event, followUserMode));
        mapwizeMap.addOnLanguageChangeListener(language -> sendEventToJS(onLanguageChange_event, language));
        mapwizeMap.addOnDirectionModesChangeListener(directionModes -> sendEventToJS(onDirectionModesChange_event, directionModes));
        mapboxMap = mapwizeMap.getMapboxMap();
//        mapboxMap.addOnCameraIdleListener(() -> sendEventToJS(onMapIdle_event, "mapIdle"));


        onReady();
        sendEventToJS(onMapLoaded_event, null);

      });

      mapviewLifecycleStep = syncMapviewLifecycle(mapwizeView, viewLifecycleStep, LIFECYCLESTEP_NOT_STARTED);
    });
  }

  private void onReady() {
    // Initialise here all that might have been delayed because Mapwize was not ready
    if (locationProvider != null) {
      mapwizeMap.setIndoorLocationProvider(locationProvider);
    }
    if (initialFloor != null) {
      mapwizeMap.setFloor(initialFloor);
    }
    if (placesStyles != null) {
      setPlaceStyles(placesStyles);
    }
    if (promotedPlaces != null) {
      setPromotedPlaces(promotedPlaces);
    }
    if (userLocation != null) {
      setUserLocation(userLocation);
    }
    if (markers != null) {
      setMarkers(this.markers);
    }
    if (navigationProps != null) {
      setMapNavigation(navigationProps);
    }
  }

  public void setFloor(int promiseId, double floor) {
    if (mapwizeView == null) {
      initialFloor = floor;
      sendPromiseResultToJS(promiseId, true, null);
      return;
    }
    mapwizeView.post(() -> {
      mapwizeMap.setFloor(floor);
      sendPromiseResultToJS(promiseId, true, null);
    });
  }

  public Floor getFloor() {
    return mapwizeMap.getFloor();
  }
  public Double getZoom() {
    return mapwizeMap.getMapboxMap().getCameraPosition().zoom;
  }

  @SuppressLint("MissingPermission")
  public void setUserLocation(LatLngFloor userLocation) {
    this.userLocation = userLocation;
    if (mapwizeMap == null) return;
    if (userLocation == null) {
      if (locationProvider != null) {
        locationProvider.stop();
        if (mapwizeMap != null) {
          mapwizeMap.removeIndoorLocationProvider();
          mapboxMap.getLocationComponent().setLocationComponentEnabled(false);
        }
      }
    } else {
      double longitude = userLocation.getLongitude();
      double latitude = userLocation.getLatitude();
      Double floor = userLocation.getFloor();
      if (locationProvider == null) {
        locationProvider = new ManualIndoorLocationProvider();
      }
      locationProvider.setIndoorLocation(new IndoorLocation("manual", latitude, longitude, floor, System.currentTimeMillis()));
      if (mapwizeMap != null) {
        mapwizeMap.setIndoorLocationProvider(locationProvider);
      }
    }

  }
  public void zoomTo(int promiseId, Double zoom) {
    mapwizeView.post(() -> {
      CameraPosition cameraPosition = new CameraPosition.Builder(mapwizeMap.getMapboxMap().getCameraPosition())
        .zoom(zoom)
        .build();
      mapwizeMap.getMapboxMap().setCameraPosition(cameraPosition);
      sendPromiseResultToJS(promiseId, true, null);
    });
  }

  public void centerOn(int promiseId, Object object, Double zoom, Boolean animated) {
    int animationDuration = animated ? 500 : 0;
    mapwizeView.post(() -> {
      if (object instanceof  LatLngFloor) {
        mapwizeMap.centerOnCoordinate((LatLngFloor) object, zoom, animationDuration);
      }else
      if  (object instanceof  Place){
        mapwizeMap.centerOnPlace((Place) object, zoom, animationDuration);
      }else
      if  (object instanceof  PlacePreview){
        mapwizeMap.centerOnPlace((PlacePreview) object, zoom, animationDuration);
      }else
      if  (object instanceof  Venue){
        mapwizeMap.centerOnVenue((Venue) object, zoom, animationDuration);
      }else
      if  (object instanceof VenuePreview){
        mapwizeMap.centerOnVenue((VenuePreview) object, zoom, animationDuration);
      }
      sendPromiseResultToJS(promiseId, true, null);
    });
  }

  public void setDirection(Direction mapDirection, @Nullable DirectionOptions directionOptions) {
    mapwizeView.post(() -> {
      if (directionOptions != null) {
        mapwizeMap.setDirection(mapDirection, directionOptions);
      } else {
        mapwizeMap.setDirection(mapDirection);
      }
    });
  }

  public void setMarkers(List<HashMap<String, Object>> markers) {
    this.markers = markers;
    if (mapwizeView == null) return;
    mapwizeView.post(() -> {
      mapwizeMap.removeMarkers();
      for (HashMap<String, Object> marker : markers) {
          Object object = marker.get("position");
          if (object instanceof Place) {
            if (marker.containsKey("markerName")) {
              mapwizeMap.addMarker((Place) object, (String) marker.get("markerName"));
            } else {
              mapwizeMap.addMarker((Place) object);
            }
          }
        if (object instanceof Placelist) {
          if (marker.containsKey("markerName")) {
            mapwizeMap.addMarker((Placelist) object, (String) marker.get("markerName"), list -> {});//TODO handle callback
          } else {
            mapwizeMap.addMarkers((Placelist) object, list -> {});//TODO handle callback
          }
        }
        if (object instanceof PlacePreview) {
          if (marker.containsKey("markerName")) {
            mapwizeMap.addMarker((PlacePreview) object, (String) marker.get("markerName"));
          } else {
            mapwizeMap.addMarker((PlacePreview) object);
          }
        }
        if (object instanceof LatLngFloor) {
          if (marker.containsKey("markerName")) {
            mapwizeMap.addMarker((LatLngFloor) object, (String) marker.get("markerName"));
          } else {
            mapwizeMap.addMarker((LatLngFloor) object);
          }
        }
      }
    });
  }

  public void setPlaceStyles(HashMap<String, Style> styles) {
    this.placesStyles = styles;
    if (this.mapwizeView == null) return;
      mapwizeView.post(() -> {
        mapwizeMap.removePlaceStyles();
        mapwizeMap.setPlaceStylesWithId(styles);
      }
    );
  }

  public void setPromotedPlaces(List<Object> promotedPlaces) {
    this.promotedPlaces = promotedPlaces;
    if (this.mapwizeView == null) return;
    mapwizeView.post(() -> {
      mapwizeMap.removePromotedPlaces();
      for (Object object : promotedPlaces) {
        if (object instanceof  Place) {
          mapwizeMap.addPromotedPlace((Place) object);
        } else
        if (object instanceof  PlacePreview) {
          mapwizeMap.addPromotedPlace((PlacePreview) object);
        } else
        if (object instanceof  Placelist) {
          mapwizeMap.addPromotedPlaces((Placelist) object, list -> {});
        }
      }
    });
  }

  public List getFloors() {
    return mapwizeMap.getFloors();
  }

  public List getDirectionModes() {
    return mapwizeMap.getDirectionModes();
  }

  public List getUniverses() {
    return mapwizeMap.getUniverses();
  }

  public void setUniverse(Universe universe) {
    mapwizeView.post(()-> mapwizeMap.setUniverse(universe));
  }

  public Object getUniverse() {
    return mapwizeMap.getUniverse();
  }

  public void setUniverseForVenue(Universe universe, Venue venue) {
    mapwizeView.post(()-> mapwizeMap.setUniverseForVenue(universe, venue));
  }

  public Object getUniverseForVenue(Venue venue) {
    return mapwizeMap.getUniverseForVenue(venue);
  }

  public Object getFollowUserMode() {
    return mapwizeMap.getFollowUserMode();
  }

  public void setFollowUserMode(FollowUserMode followUserMode) {
    mapwizeView.post(()-> mapwizeMap.setFollowUserMode(followUserMode));
  }

  public Object getLanguage() {
    return mapwizeMap.getLanguage();
  }

  public Object getLanguageForVenue(Venue venue) {
    return mapwizeMap.getLanguageForVenue(venue);
  }

  public void setLanguageForVenue(String language, Venue venue) {
    mapwizeView.post(()-> mapwizeMap.setLanguageForVenue(language, venue));
  }

  public Object getPreferredLanguage() {
    return mapwizeMap.getPreferredLanguage();
  }

  public void setPreferredLanguage(String language) {
    mapwizeView.post(()-> mapwizeMap.setPreferredLanguage(language));
  }

  public void grantAccess(int promiseId, String accessKey) {
    mapwizeView.post(()-> mapwizeMap.grantAccess(accessKey, new ApiCallback<Boolean>() {
      @Override
      public void onSuccess(@NonNull Boolean aBoolean) {
        sendPromiseResultToJS(promiseId, true, aBoolean);
      }

      @Override
      public void onFailure(@NonNull Throwable throwable) {
        sendPromiseResultToJS(promiseId, false, "can't grant Access : " + throwable.getMessage());
      }
    }));
  }

  public void addImageToMap(String imageName, String imageBase64) {
    mapwizeView.post(()-> mapwizeMap.addImageToMap(imageName, RNMapUtil.parseBitmap(imageBase64)));
  }

  public void setMapNavigation(HashMap<String, Object> navigationProps) {
    this.navigationProps = navigationProps;
    if (mapwizeView == null) return;

    DirectionPoint destination = (DirectionPoint) navigationProps.get("destination");
    navigationProps.put("destination", destination);
    DirectionMode directionMode = (DirectionMode) navigationProps.get("directionMode");
    navigationProps.put("directionMode", directionMode);
    DirectionOptions directionOptions = (DirectionOptions) navigationProps.get("directionOptions");
    Double maxDistanceBeforeRecompute = null;
    if (navigationProps.containsKey("maxDistanceBeforeRecompute")) {
      maxDistanceBeforeRecompute = (Double) navigationProps.get("maxDistanceBeforeRecompute");
    }
    Double finalMaxDistanceBeforeRecompute = maxDistanceBeforeRecompute;
    mapwizeView.post(() -> {
      try {
        mapwizeMap.startNavigation(destination, directionMode, directionOptions, new OnNavigationUpdateListener() {
          @Override
          public boolean shouldRecomputeNavigation(@NonNull NavigationInfo navigationInfo) {
            sendEventToJS(onNavigationUpdate_event, navigationInfo);
            if (navigationInfo != null && finalMaxDistanceBeforeRecompute !=null) {
              return navigationInfo.getLocationDelta() > finalMaxDistanceBeforeRecompute;
//              return false;
            }
            return false;
          }

          @Override
          public void navigationWillStart() {
            sendEventToJS(onNavigationWillStart_event, null);

          }

          @Override
          public void navigationDidStart() {
            sendEventToJS(onNavigationStart_event, null);
          }

          @Override
          public void navigationDidFail(Throwable throwable) {
            sendEventToJS(onNavigationError_event, throwable.getMessage());
          }

          @Override
          public void navigationDidStop() {
            sendEventToJS(onNavigationStop_event, null);
          }
        });
      } catch (NavigationException e) {
        e.printStackTrace();
        sendEventToJS(onNavigationError_event, e.getMessage());
      }
    });

  }

  public void removeDirection() {
    mapwizeView.post(() -> mapwizeMap.removeDirection());
  }

  public void stopNavigation() {
    mapwizeView.post(() -> mapwizeMap.stopNavigation());
  }

  public void removeMarkers() {
    mapwizeView.post(() -> mapwizeMap.removeMarkers());
  }

  public void removePromotedPlaces() {
    mapwizeView.post(() -> mapwizeMap.removePromotedPlaces());
  }


  public void removePlaceStyles() {
    mapwizeView.post(() -> mapwizeMap.removePlaceStyles());
  }
}
