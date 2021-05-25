package com.mapwize;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.modules.network.OkHttpClientProvider;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import androidx.annotation.Nullable;
import io.mapwize.mapwizesdk.api.ApiCallback;
import io.mapwize.mapwizesdk.api.ApiFilter;
import io.mapwize.mapwizesdk.api.Direction;
import io.mapwize.mapwizesdk.api.DirectionMode;
import io.mapwize.mapwizesdk.api.DirectionPoint;
import io.mapwize.mapwizesdk.api.DistanceResponse;
import io.mapwize.mapwizesdk.api.Layer;
import io.mapwize.mapwizesdk.api.MapwizeApiFactory;
import io.mapwize.mapwizesdk.api.MapwizeObject;
import io.mapwize.mapwizesdk.api.Place;
import io.mapwize.mapwizesdk.api.PlaceDetails;
import io.mapwize.mapwizesdk.api.Placelist;
import io.mapwize.mapwizesdk.api.SearchParams;
import io.mapwize.mapwizesdk.api.Universe;
import io.mapwize.mapwizesdk.api.Venue;
import io.mapwize.mapwizesdk.core.MapwizeConfiguration;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.HttpUrl;

public class MapwizeModule extends ReactContextBaseJavaModule {

  private static final String TAG = "MapwizeModule";
  private final Context context;
  Map<String, MapwizeContext> map = new HashMap<>();

  public MapwizeModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  @Override
  public String getName() {
    return "RNMWZApi";
  }

  @ReactMethod
  public void createMapwizeApi(ReadableMap options, String currentContextId, Promise promise) {
    try {
      MapwizeConfiguration mapwizeConfiguration = RNMapUtil.parseMapwizeConfiguration(options, context);

      if (mapwizeConfiguration.getApiKey().equals("")) {
        rejectPromise(promise, new Exception("Unable to create context with missing ApiKey"));
        return;
      }
      MapwizeContext mapwizeContext = new MapwizeContext(mapwizeConfiguration, MapwizeApiFactory.getApi(mapwizeConfiguration));

      map.put(currentContextId, mapwizeContext);
      promise.resolve(currentContextId);
    } catch (Throwable t) {
      promise.reject("Can't create context", t);
    }
  }
  @ReactMethod
  public void shareMapwizeCookies(String contextId, Boolean useCookies, Promise promise) {
    MapwizeContext context = getContext(contextId);
    try {
      shareCookies(context.getConfiguration(), useCookies, promise);
    }catch (Throwable throwable) {
      rejectPromise(promise, throwable);
    }
  }

  private void shareCookies(MapwizeConfiguration mapwizeConfiguration, boolean use, Promise promise) {

    OkHttpClientProvider.setOkHttpClientFactory(() -> {
      if (use) {
        CookieJar cookieJar = MapwizeApiFactory.getOkHttpclient(mapwizeConfiguration).cookieJar();
        CookieJar cookieJar1 = new CookieJar() {
          @Override
          public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
            Log.d("JARCOOKIES", "creating new cookies" + url.toString());
            cookieJar.saveFromResponse(url, cookies);
          }

          @Override
          public List<Cookie> loadForRequest(HttpUrl url) {
            Log.d("JARCOOKIES", "Give me my list of cookies" + url.toString());
            List<Cookie> cookieList = cookieJar.loadForRequest(url);
            return cookieList;
          }
        };
        CookieJarContainer reactCookieJarContainer = new CookieJarContainer(cookieJar1);
        Log.d("JARCOOKIES", "creating new Client");
        acceptPromise(promise,use);
        return OkHttpClientProvider.createClientBuilder()
          .cookieJar(reactCookieJarContainer)
          .build();
      } else {
        acceptPromise(promise,use);
        return OkHttpClientProvider.createClientBuilder().build();
      }
    });
  }

  private MapwizeContext getContext(String contextId) {
    if (map.containsKey(contextId)) {
      return map.get(contextId);
    }
    throw new IllegalStateException("Unable to get the current Api Context");
  }

  @ReactMethod
  public void getAccess(String contextId, String accessKey, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getAccess(accessKey, new ApiCallback<Boolean>() {
      @Override
      public void onSuccess(@Nullable Boolean success) {
        acceptPromise(promise, RNMapUtil.toRNMap(success));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getAccessibleUniversesForVenue(String contextId,  ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getAccessibleUniversesForVenue(venue.getId(), new ApiCallback<List<Universe>>() {
      @Override
      public void onSuccess(@Nullable List<Universe> success) {
        acceptPromise(promise, RNMapUtil.toRNArray(success));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getDirection(String contextId, ReadableMap from, ReadableMap to, ReadableMap mode, ReadableArray waypointsRN, Boolean waypointsOptimize, Promise promise) {
    MapwizeContext context = getContext(contextId);
    DirectionPoint directionPointFrom = (DirectionPoint) RNMapUtil.objectFromRNMap(from);
    DirectionMode directionMode = (DirectionMode) RNMapUtil.objectFromRNMap(mode);
      DirectionPoint directionPointTo = (DirectionPoint) RNMapUtil.objectFromRNMap((ReadableMap)to);
      if (waypointsRN == null) {
        context.getApi().getDirection(directionPointFrom, directionPointTo, directionMode, new ApiCallback<Direction>() {
          @Override
          public void onSuccess(@Nullable Direction direction) {
            acceptPromise(promise, RNMapUtil.toRNMap(direction));
          }
          @Override
          public void onFailure(@Nullable Throwable throwable) {
            rejectPromise(promise, throwable);
          }
        });
      } else {
        Object[] waypointsObject = RNMapUtil.fromRNArray(waypointsRN);
        DirectionPoint[] waypointsObjectTo = Arrays.copyOf(waypointsObject, waypointsObject.length, DirectionPoint[].class);
        List<DirectionPoint> waypoints = new ArrayList<>(Arrays.asList(waypointsObjectTo));
        context.getApi().getDirection(directionPointFrom, directionPointTo, waypoints, directionMode ,waypointsOptimize, new ApiCallback<Direction>() {
          @Override
          public void onSuccess(@Nullable Direction direction) {
            acceptPromise(promise, RNMapUtil.toRNMap(direction));
          }
          @Override
          public void onFailure(@Nullable Throwable throwable) {
            rejectPromise(promise, throwable);
          }
        });
      }
  }

  @ReactMethod
  public void getDirectionToMultiple(String contextId, ReadableMap from, ReadableArray to, ReadableMap mode, ReadableArray waypointsRN, Boolean waypointsOptimize, Promise promise) {
    MapwizeContext context = getContext(contextId);
    DirectionPoint directionPointFrom = (DirectionPoint) RNMapUtil.objectFromRNMap(from);
    DirectionMode directionMode = (DirectionMode) RNMapUtil.objectFromRNMap(mode);
    Object[] objects = RNMapUtil.fromRNArray((ReadableArray)to);
    DirectionPoint[] directionPointsTo = Arrays.copyOf(objects, objects.length, DirectionPoint[].class);
    List<DirectionPoint> list = new ArrayList<>(Arrays.asList(directionPointsTo));
      if (waypointsRN == null) {
        context.getApi().getDirection(directionPointFrom, list, directionMode, new ApiCallback<Direction>() {
          @Override
          public void onSuccess(@Nullable Direction direction) {
            acceptPromise(promise, RNMapUtil.toRNMap(direction));
          }

          @Override
          public void onFailure(@Nullable Throwable throwable) {
            rejectPromise(promise, throwable);
          }
        });
      } else {
        Object[] waypointsObject = RNMapUtil.fromRNArray(waypointsRN);
        DirectionPoint[] waypointsObjectTo = Arrays.copyOf(waypointsObject, waypointsObject.length, DirectionPoint[].class);
        List<DirectionPoint> waypoints = new ArrayList<>(Arrays.asList(waypointsObjectTo));
        context.getApi().getDirection(directionPointFrom, list, waypoints, directionMode, waypointsOptimize, new ApiCallback<Direction>() {
          @Override
          public void onSuccess(@Nullable Direction direction) {
            acceptPromise(promise, RNMapUtil.toRNMap(direction));
          }

          @Override
          public void onFailure(@Nullable Throwable throwable) {
            rejectPromise(promise, throwable);
          }
        });
      }


  }
  @ReactMethod
  public void getDistances(String contextId, ReadableMap from, ReadableArray to, ReadableMap mode, Boolean sortByTraveltime, Promise promise) {
    MapwizeContext context = getContext(contextId);
    DirectionPoint directionPointFrom = (DirectionPoint) RNMapUtil.objectFromRNMap(from);
    Object[] objects = RNMapUtil.fromRNArray((ReadableArray)to);
    DirectionPoint[] directionPointsTo = Arrays.copyOf(objects, objects.length, DirectionPoint[].class);
    List<DirectionPoint> list = new ArrayList<>(Arrays.asList(directionPointsTo));
    DirectionMode directionMode = (DirectionMode) RNMapUtil.objectFromRNMap(mode);
    context.getApi().getDistances(directionPointFrom, list, directionMode, sortByTraveltime, new ApiCallback<DistanceResponse>() {
      @Override
      public void onSuccess(@Nullable DistanceResponse distanceResponse) {
        acceptPromise(promise, RNMapUtil.toRNMap(distanceResponse));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getLayer(String contextId, String layerId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getLayer(layerId, new ApiCallback<Layer>() {
      @Override
      public void onSuccess(@Nullable Layer layer) {
        acceptPromise(promise, RNMapUtil.toRNMap(layer));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getLayerWithName(String contextId, String name, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getLayerWithName(name, venue, new ApiCallback<Layer>() {
      @Override
      public void onSuccess(@Nullable Layer layer) {
        acceptPromise(promise, RNMapUtil.toRNMap(layer));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getLayerWithAlias(String contextId, String alias, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getLayerWithAlias(alias, venue, new ApiCallback<Layer>() {
      @Override
      public void onSuccess(@Nullable Layer layer) {
        acceptPromise(promise, RNMapUtil.toRNMap(layer));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getLayers(String contextId, ReadableMap apiFilterRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    ApiFilter apiFilter = (ApiFilter) RNMapUtil.objectFromRNMap(apiFilterRN);
    context.getApi().getLayers(apiFilter, new ApiCallback<List<Layer>>() {
      @Override
      public void onSuccess(@Nullable List<Layer> layers) {
        acceptPromise(promise, RNMapUtil.toRNArray(layers));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getMainFroms(String contextId, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getMainFromsForVenue(venue.getId(), new ApiCallback<List<Place>>() {
      @Override
      public void onSuccess(@Nullable List<Place> places) {
        acceptPromise(promise, RNMapUtil.toRNArray(places));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getMainSearches(String contextId, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getMainSearchesForVenue(venue.getId(), new ApiCallback<List<MapwizeObject>>() {
      @Override
      public void onSuccess(@Nullable List<MapwizeObject> mapwizeObjects) {
        acceptPromise(promise, RNMapUtil.toRNArray(mapwizeObjects));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlace(String contextId, String placeId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getPlace(placeId, new ApiCallback<Place>() {
      @Override
      public void onSuccess(@Nullable Place place) {
        acceptPromise(promise, RNMapUtil.toRNMap(place));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlaceDetails(String contextId, String placeId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getPlaceDetails(placeId, new ApiCallback<PlaceDetails>() {
      @Override
      public void onSuccess(@Nullable PlaceDetails placeDetails) {
        acceptPromise(promise, RNMapUtil.toRNMap(placeDetails));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlaceWithName(String contextId, String name, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getPlaceWithName(name, venue, new ApiCallback<Place>() {
      @Override
      public void onSuccess(@Nullable Place place) {
        acceptPromise(promise, RNMapUtil.toRNMap(place));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlaceWithAlias(String contextId, String alias, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getPlaceWithAlias(alias, venue, new ApiCallback<Place>() {
      @Override
      public void onSuccess(@Nullable Place place) {
        acceptPromise(promise, RNMapUtil.toRNMap(place));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlaces(String contextId, ReadableMap apiFilterRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    ApiFilter apiFilter = (ApiFilter) RNMapUtil.objectFromRNMap(apiFilterRN);
    context.getApi().getPlaces(apiFilter, new ApiCallback<List<Place>>() {
      @Override
      public void onSuccess(@Nullable List<Place> places) {
        acceptPromise(promise, RNMapUtil.toRNArray(places));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlacesForPlacelist(String contextId, ReadableMap placelistId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Placelist placelist = (Placelist) RNMapUtil.objectFromRNMap(placelistId);
    context.getApi().getPlacesForPlacelist(placelist.getId(), new ApiCallback<List<Place>>() {
      @Override
      public void onSuccess(@Nullable List<Place> places) {
        acceptPromise(promise, RNMapUtil.toRNArray(places));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlacelist(String contextId, String placelistId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getPlacelist(placelistId, new ApiCallback<Placelist>() {
      @Override
      public void onSuccess(@Nullable Placelist placelist) {
        acceptPromise(promise, RNMapUtil.toRNMap(placelist));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlacelistWithName(String contextId, String name, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getPlacelistWithName(name, venue, new ApiCallback<Placelist>() {
      @Override
      public void onSuccess(@Nullable Placelist placelist) {
        acceptPromise(promise, RNMapUtil.toRNMap(placelist));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlacelistWithAlias(String contextId, String alias, ReadableMap venueRN, Promise promise) {
    MapwizeContext context = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    context.getApi().getPlacelistWithAlias(alias, venue, new ApiCallback<Placelist>() {
      @Override
      public void onSuccess(@Nullable Placelist placelist) {
        acceptPromise(promise, RNMapUtil.toRNMap(placelist));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getPlacelists(String contextId, ReadableMap apiFilterRNMap, Promise promise) {
    MapwizeContext context = getContext(contextId);
    ApiFilter apiFilter = (ApiFilter) RNMapUtil.objectFromRNMap(apiFilterRNMap);
    context.getApi().getPlacelists(apiFilter, new ApiCallback<List<Placelist>>() {
      @Override
      public void onSuccess(@Nullable List<Placelist> places) {
        acceptPromise(promise, RNMapUtil.toRNArray(places));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getVenue(String contextId, String venueId, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getVenue(venueId, new ApiCallback<Venue>() {
      @Override
      public void onSuccess(@Nullable Venue venue) {
        acceptPromise(promise, RNMapUtil.toRNMap(venue));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getVenueWithName(String contextId, String name, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getVenueWithName(name, new ApiCallback<Venue>() {
      @Override
      public void onSuccess(@Nullable Venue venue) {
        acceptPromise(promise, RNMapUtil.toRNMap(venue));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getVenueWithAlias(String contextId, String alias, Promise promise) {
    MapwizeContext context = getContext(contextId);
    context.getApi().getVenueWithAlias(alias, new ApiCallback<Venue>() {
      @Override
      public void onSuccess(@Nullable Venue venue) {
        acceptPromise(promise, RNMapUtil.toRNMap(venue));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void getVenues(String contextId, ReadableMap apiFilterRNMap, Promise promise) {
    MapwizeContext context = getContext(contextId);
    ApiFilter apiFilter = (ApiFilter) RNMapUtil.objectFromRNMap(apiFilterRNMap);
    context.getApi().getVenues(apiFilter, new ApiCallback<List<Venue>>() {
      @Override
      public void onSuccess(@Nullable List<Venue> venues) {
        acceptPromise(promise, RNMapUtil.toRNArray(venues));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  @ReactMethod
  public void search(String contextId, ReadableMap apiFilterRNMap, Promise promise) {
    MapwizeContext context = getContext(contextId);
    SearchParams searchParams = (SearchParams) RNMapUtil.objectFromRNMap(apiFilterRNMap);
    context.getApi().search(searchParams, new ApiCallback<List<MapwizeObject>>() {
      @Override
      public void onSuccess(@Nullable List<MapwizeObject> mapwizeObject) {
        acceptPromise(promise, RNMapUtil.toRNArray(mapwizeObject));
      }

      @Override
      public void onFailure(@Nullable Throwable throwable) {
        rejectPromise(promise, throwable);
      }
    });
  }

  private void acceptPromise(Promise p, Object object) {
    p.resolve(object);
  }

  private void rejectPromise(Promise p, Throwable t) {
    p.reject(t);
  }
}
