package com.mapwize;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.mapbox.mapboxsdk.Mapbox;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import io.mapwize.mapwizesdk.api.OfflineException;
import io.mapwize.mapwizesdk.api.OfflineManager;
import io.mapwize.mapwizesdk.api.OfflineRegion;
import io.mapwize.mapwizesdk.api.Universe;
import io.mapwize.mapwizesdk.api.Venue;
import io.mapwize.mapwizesdk.core.MapwizeConfiguration;

public class MapwizeOfflineModule extends ReactContextBaseJavaModule {

  private static final String TAG = "MapwizeOfflineModule";
  private final Context context;
  Map<String, OfflineManager> map = new HashMap<>();

  public MapwizeOfflineModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  @Override
  public String getName() {
    return "RNMWZOfflineManager";
  }

  @ReactMethod
  public void createOfflineManager(ReadableMap options, String currentContextId, Promise promise) {
    try {
      MapwizeConfiguration mapwizeConfiguration = RNMapUtil.parseMapwizeConfiguration(options, context);

      if (mapwizeConfiguration.getApiKey().equals("")) {
        rejectPromise(promise, new Exception("Unable to create context with missing ApiKey"));
        return;
      }
      if (!RNMapwizeView.mapboxInitialised) {
        getCurrentActivity().runOnUiThread(()->{
          Mapbox.getInstance(getReactApplicationContext(), "pk.mapwize");
        RNMapwizeView.mapboxInitialised = true;
        });

      }
      OfflineManager offlineManager = new OfflineManager(mapwizeConfiguration);

      map.put(currentContextId, offlineManager);
      promise.resolve(currentContextId);
    } catch (Throwable t) {
      rejectPromise(promise, t);
    }
  }

  private OfflineManager getContext(String contextId) {
    if (map.containsKey(contextId)) {
      return map.get(contextId);
    }
    throw new IllegalStateException("Unable to get the current Api Context");
  }

  @ReactMethod
  public void downloadData(String contextId, String downloadTaskListenerId, ReadableMap offlineRegionRN, Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("venue"));
    Universe universe = (Universe) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("universe"));
    int minZoom = offlineRegionRN.getInt("minZoom");
    int maxZoom = offlineRegionRN.getInt("maxZoom");
    offlineManager.downloadData(venue, universe, minZoom, maxZoom, new OfflineManager.DownloadTaskListener() {
      @Override
      public void onSuccess(OfflineRegion offlineRegion) {
        acceptPromise(promise, RNMapUtil.serialize(offlineRegion));
      }

      @Override
      public void onProgress(OfflineRegion offlineRegion, int progress) {
        sendToReact(contextId, downloadTaskListenerId, progress);
      }

      @Override
      public void onFailure(OfflineRegion offlineRegion, OfflineException e) {
        rejectPromise(promise, e);
      }
    });
  }

  @ReactMethod
  public void updateData(String contextId, String downloadTaskListenerId, ReadableMap offlineRegionRN,Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("venue"));
    Universe universe = (Universe) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("universe"));
    int minZoom = offlineRegionRN.getInt("minZoom");
    int maxZoom = offlineRegionRN.getInt("maxZoom");
    offlineManager.downloadData(venue, universe, minZoom, maxZoom, new OfflineManager.DownloadTaskListener() {
      @Override
      public void onSuccess(OfflineRegion offlineRegion) {
        acceptPromise(promise, RNMapUtil.serialize(offlineRegion));
      }

      @Override
      public void onProgress(OfflineRegion offlineRegion, int progress) {
        sendToReact(contextId, downloadTaskListenerId, progress);
      }

      @Override
      public void onFailure(OfflineRegion offlineRegion, OfflineException e) {
        rejectPromise(promise, e);
      }
    });
  }
  @ReactMethod
  public void getOfflineRegions(String contextId, Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    try {
      List<OfflineRegion> offlineRegions = offlineManager.getOfflineRegions();
      WritableArray writableArray = Arguments.createArray();
      for (OfflineRegion offlineRegion:offlineRegions) {
        writableArray.pushMap(RNMapUtil.serialize(offlineRegion));
      }
      acceptPromise(promise,writableArray );
    } catch (Throwable t) {
      rejectPromise(promise, t);
    }
  }
  @ReactMethod
  public void removeData(String contextId, ReadableMap offlineRegionRN, Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    try {
      Venue venue = (Venue) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("venue"));
      Universe universe = (Universe) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("universe"));
      OfflineRegion offlineRegion = offlineManager.getOfflineRegion(venue, universe);
      if (offlineRegion == null) {
        rejectPromise(promise, new Throwable("The passed offlineRegion does not exist"));
        return;
      }
      offlineManager.removeData(offlineRegion, () -> acceptPromise(promise, null));
    } catch (Throwable t) {
      rejectPromise(promise, t);
    }

  }

  @ReactMethod
  public void checkForUpdate(String contextId, ReadableMap offlineRegionRN, Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    try {
      Venue venue = (Venue) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("venue"));
      Universe universe = (Universe) RNMapUtil.objectFromRNMap(offlineRegionRN.getMap("universe"));
      OfflineRegion offlineRegion = offlineManager.getOfflineRegion(venue, universe);
      if (offlineRegion == null) {
        rejectPromise(promise, new Throwable("The passed offlineRegion does not exist"));
        return;
      }
      offlineManager.checkForUpdate(offlineRegion, b -> {
        acceptPromise(promise, b);
      });
    } catch (Throwable t) {
      rejectPromise(promise, t);
    }

  }
  @ReactMethod
  public void hasOfflineRegion(String contextId, ReadableMap venueRN, ReadableMap universeRN, Promise promise) {
    OfflineManager offlineManager = getContext(contextId);
    Venue venue = (Venue) RNMapUtil.objectFromRNMap(venueRN);
    Universe universe = (Universe) RNMapUtil.objectFromRNMap(universeRN);
    try {
      acceptPromise(promise, offlineManager.hasOfflineRegion(venue, universe));
    } catch( Throwable t) {
      rejectPromise(promise, t);
    }
  }

  public void sendToReact(String contextId, String downloadTaskListenerId, int value) {
    try {
      WritableMap params = Arguments.createMap();
      params.putString("contextId", contextId);
      params.putString("downloadTaskListenerId", downloadTaskListenerId);
      params.putInt("progress", value);
      getReactApplicationContext()
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("OfflineManagerEvent", params);
    } catch (Exception e) {
      Log.e(TAG, "trying to emit to finished React APP");
    }
  }

  private void acceptPromise(Promise p, Object object) {
    p.resolve(object);
  }

  private void rejectPromise(Promise p, Throwable t) {
    p.reject(t);
  }
}
