package com.mapwize;

public class LatLngFloorAsDouble {

    private final double latitude, longitude, floor;

    public LatLngFloorAsDouble(double latitude, double longitude, double floor) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.floor = floor;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public double getFloor() {
        return floor;
    }
}
