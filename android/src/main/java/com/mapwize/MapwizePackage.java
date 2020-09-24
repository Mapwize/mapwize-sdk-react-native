package com.mapwize;

import android.app.Application;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.List;

public class MapwizePackage implements ReactPackage {

  private Application application;

  public MapwizePackage(Application application) {
    this.application = application;
  }

  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    return Arrays.<NativeModule>asList(
      new MapwizeModule(reactContext, application),
      new MapwizeOfflineModule(reactContext, application)
    );
  }

  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new MapwizeViewManager()
    );
  }
}
