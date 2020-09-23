package com.mapwize;

import io.indoorlocation.core.IndoorLocation;
import io.indoorlocation.core.IndoorLocationProvider;

// cf https://github.com/IndoorLocation/manual-indoor-location-provider-android/blob/master/manuallocationprovider/src/main/java/io/indoorlocation/manual/ManualIndoorLocationProvider.java
public class ManualIndoorLocationProvider extends IndoorLocationProvider {

    private boolean started = false;

    public void setIndoorLocation(IndoorLocation indoorLocation) {
        dispatchIndoorLocationChange(indoorLocation);
    }

    @Override
    public boolean supportsFloor() {
        return true;
    }

    @Override
    public void start() {
        started=true;
    }

    @Override
    public void stop() {
        started=false;
        dispatchIndoorLocationChange(null);
    }

    @Override
    public boolean isStarted() {
        return started;
    }

}
