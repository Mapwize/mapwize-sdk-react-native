package com.mapwize;

import io.mapwize.mapwizesdk.api.MapwizeApi;
import io.mapwize.mapwizesdk.core.MapwizeConfiguration;

public class MapwizeContext {

  private final MapwizeConfiguration config;
  private final MapwizeApi api;

  public MapwizeContext(
    MapwizeConfiguration config,
    MapwizeApi mapwizeApi
  ) {
    this.config = config;
    this.api = mapwizeApi;
  }

  public MapwizeConfiguration getConfiguration() {
    return config;
  }

  public MapwizeApi getApi() {
    return api;
  }
}
