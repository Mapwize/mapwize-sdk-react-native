#import "RNMWZMapView.h"

@implementation RNMWZMapView



- (instancetype) init {
    if (self = [super init]) {
        _imageByName = [[NSMutableDictionary alloc] init];
    }
    return self;
}

- (void) refreshProps {
    [self setDirection:_direction];
    [self setMarkers:_markers];
    [self setPromotedPlaces:_promotedPlaces];
    [self setPlaceStyles:_placeStyles];
    [self setUserLocation:_userLocation];
}

- (void) setMapwizeConfiguration:(MWZMapwizeConfiguration *)mapwizeConfiguration {
    _mapwizeConfiguration = mapwizeConfiguration;
}

- (void) setMapOptions:(MWZOptions *)mapOptions {
    _mapOptions = mapOptions;
}

- (void) setDirection:(NSDictionary *)directionDic {
    _direction = directionDic;
    if (directionDic) {
        MWZDirection* direction = [MWZApiResponseParser parseDirection:directionDic[@"direction"]];
        MWZDirectionOptions* options;
        NSDictionary* optionsDic = directionDic[@"directionOptions"];
        if (optionsDic && ![optionsDic isEqual:NSNull.null]) {
            options = [MWZApiResponseParser parseDirectionOptions:optionsDic];
            NSString* imageName = optionsDic[@"endMarkerIconName"];
            if (imageName && ![imageName isEqual:NSNull.null]) {
                options.endMarkerIcon = _imageByName[imageName];
            }
        }
        [_mapView setDirection:direction options:options];
    }
    else {
        [_mapView removeDirection];
    }
}

- (void) setNavigation:(NSDictionary *)navigationDic {
    _navigation = navigationDic;
    if (!navigationDic) {
        [_mapView stopNavigation];
        return;
    }
    id<MWZDirectionPoint> destination = [MWZApiResponseParser parseDirectionPointFromDictionary:navigationDic[@"destination"]];
    MWZDirectionMode* mode = [MWZApiResponseParser parseDirectionMode:navigationDic[@"directionMode"]];
    MWZDirectionOptions* options;
    NSDictionary* optionsDic = navigationDic[@"directionOptions"];
    if (optionsDic && ![optionsDic isEqual:NSNull.null]) {
        options = [MWZApiResponseParser parseDirectionOptions:optionsDic];
        NSString* imageName = optionsDic[@"endMarkerIconName"];
        if (imageName && ![imageName isEqual:NSNull.null]) {
            options.endMarkerIcon = _imageByName[imageName];
        }
    }
    
    [_mapView startNavigation:destination directionMode:mode options:options];
    
}

- (void) setMarkers:(NSArray *)markers {
    _markers = markers;
    [self.mapView removeMarkers];
    for (NSDictionary* object in markers) {
        NSDictionary* marker = object[@"position"];
        NSString* objectClass = marker[@"objectClass"];
        NSString* iconName = object[@"markerName"];
        if ([objectClass isEqualToString:@"LatLngFloor"]) {
            MWZLatLngFloor* latLngFloor = [MWZApiResponseParser parseLatLngFloor:marker];
            if (iconName) {
                [_mapView addMarkerOnCoordinate:latLngFloor image:_imageByName[iconName]];
            }
            else {
                [_mapView addMarkerOnCoordinate:latLngFloor];
            }
        }
        if ([objectClass isEqualToString:@"PlacePreview"]) {
            MWZPlacePreview* placePreview = [MWZApiResponseParser parsePlacePreview:marker];
            if (iconName) {
                [_mapView addMarkerOnPlacePreview:placePreview image:_imageByName[iconName]];
            }
            else {
                [_mapView addMarkerOnPlacePreview:placePreview];
            }
        }
        if ([objectClass isEqualToString:@"Place"]) {
            MWZPlace* place = [MWZApiResponseParser parsePlace:marker];
            if (iconName) {
                [_mapView addMarkerOnPlace:place image:_imageByName[iconName]];
            }
            else {
                [_mapView addMarkerOnPlace:place];
            }
        }
        if ([objectClass isEqualToString:@"Placelist"]) {
            MWZPlacelist* placelist = [MWZApiResponseParser parsePlacelist:marker];
            if (iconName) {
                [_mapView addMarkersOnPlacelist:placelist image:_imageByName[iconName] completionHandler:^(NSArray<MWZMapwizeAnnotation *> * _Nonnull annotations) {
                        
                }];
            }
            else {
                [_mapView addMarkersOnPlacelist:placelist completionHandler:^(NSArray<MWZMapwizeAnnotation *> * _Nonnull annotations) {
                    
                }];
            }
        }
    }
}

- (void) setPlaceStyles:(NSDictionary<NSString *,MWZStyle *> *)placeStyles {
    _placeStyles = placeStyles;
    [_mapView setPlaceStylesWithIds:placeStyles];
}

- (void) setPromotedPlaces:(NSArray*)promotedPlaces {
    _promotedPlaces = promotedPlaces;
    [_mapView removePromotedPlaces];
    for (NSDictionary* dic in promotedPlaces) {
        if ([dic[@"objectClass"] isEqualToString:@"Place"]) {
            MWZPlace* place = [MWZApiResponseParser parsePlace:dic];
            [_mapView addPromotedPlace:place];
        }
        if ([dic[@"objectClass"] isEqualToString:@"PlacePreview"]) {
            MWZPlacePreview* placePreview = [MWZApiResponseParser parsePlacePreview:dic];
            [_mapView addPromotedPlacePreview:placePreview];
        }
        if ([dic[@"objectClass"] isEqualToString:@"Placelist"]) {
            MWZPlacelist* placelist = [MWZApiResponseParser parsePlacelist:dic];
            [_mapView addPromotedPlacelist:placelist completionHandler:^(NSArray<MWZPlace *> * _Nonnull places) {
                
            }];
        }
    }
}

- (void) setSelectedPlace:(NSDictionary *)dic {
    _selectedPlace = dic;
    if (dic) {
        if ([dic[@"objectClass"] isEqualToString:@"Place"]) {
            MWZPlace* place = [MWZApiResponseParser parsePlace:dic];
            [_mapView selectPlace:place];
        }
        if ([dic[@"objectClass"] isEqualToString:@"PlacePreview"]) {
            MWZPlacePreview* placePreview = [MWZApiResponseParser parsePlacePreview:dic];
            [_mapView selectPlacePreview:placePreview];
        }
    }
    else {
        [_mapView unselectPlace];
    }
}

- (void) setUserLocation:(MWZLatLngFloor *)userLocation {
    _userLocation = userLocation;
    if (!_userLocation && _manualLocationProvider) {
        _manualLocationProvider = nil;
        [_mapView removeIndoorLocationProvider];
    }
    if (_userLocation && !_manualLocationProvider && _mapView) {
        _manualLocationProvider = [[ILManualIndoorLocationProvider alloc] init];
        [_manualLocationProvider start];
        [_mapView setIndoorLocationProvider:_manualLocationProvider];
    }
    ILIndoorLocation* il = [[ILIndoorLocation alloc] initWithProvider:_manualLocationProvider latitude:_userLocation.latitude longitude:_userLocation.longitude floor:_userLocation.floor];
    [_manualLocationProvider setIndoorLocation:il];
}

#pragma mark MWZMapViewDelegate

- (void) mapViewDidLoad:(MWZMapView *)mapView {
    if (!_manualLocationProvider) {
        _manualLocationProvider = [[ILManualIndoorLocationProvider alloc] init];
        [_manualLocationProvider start];
        [_mapView setIndoorLocationProvider:_manualLocationProvider];
    }
    [self refreshProps];
    if (!_onMapLoaded) {
        return;
    }
    self.onMapLoaded(@{});
}

- (void) mapView:(MWZMapView *)mapView venueWillEnter:(MWZVenue *)venue {
    if (!_onVenueWillEnter) {
        return;
    }
    self.onVenueWillEnter(@{@"value":[MWZSerializer serializeVenue:venue]});
}

- (void)mapView:(MWZMapView *)mapView venueDidEnter:(MWZVenue *)venue {
    if (!_onVenueEnter) {
        return;
    }
    self.onVenueEnter(@{@"value":[MWZSerializer serializeVenue:venue]});
}

- (void)mapView:(MWZMapView *)mapView venueDidExit:(MWZVenue *)venue {
    if (!_onVenueExit) {
        return;
    }
    self.onVenueExit(@{@"value":[MWZSerializer serializeVenue:venue]});
}

- (void) mapView:(MWZMapView *)mapView venueDidFailEntering:(MWZVenue *)venue withError:(NSError *)error {
    if (!_onVenueEnterError) {
        return;
    }
    self.onVenueEnterError(@{@"value": [NSString stringWithFormat:@"Error entering %@", venue.name]});
}

- (void)mapView:(MWZMapView *)mapView universesDidChange:(NSArray<MWZUniverse *> *)universes {
    if (!_onUniverseChange) {
        return;
    }
    self.onUniversesChange(@{@"value":[MWZSerializer serializeUniverses:universes]});
}

- (void)mapView:(MWZMapView *)mapView universeWillChange:(MWZUniverse *)universe {
    if (!_onUniverseWillChange) {
        return;
    }
    if (universe) {
        self.onUniverseWillChange(@{@"value":[MWZSerializer serializeUniverse:universe]});
    }
    else {
        self.onUniverseWillChange(@{@"value":NSNull.null});
    }
}

- (void)mapView:(MWZMapView *)mapView universeDidChange:(MWZUniverse *)universe {
    if (!_onUniverseChange) {
        return;
    }
    if (universe) {
        self.onUniverseChange(@{@"value":[MWZSerializer serializeUniverse:universe]});
    }
    else {
        self.onUniverseChange(@{@"value":NSNull.null});
    }
}

- (void)mapView:(MWZMapView *)mapView universeDidFailChanging:(MWZUniverse *)universe withError:(NSError *)error {
    if (!_onUniverseChangeError) {
        return;
    }
    self.onUniverseChangeError(@{@"value": [NSString stringWithFormat:@"Error changing universe %@", universe.name]});
}

- (void)mapView:(MWZMapView *)mapView floorsDidChange:(NSArray<MWZFloor *> *)floors {
    if (!_onFloorsChange) {
        return;
    }
    NSMutableArray* array = [[NSMutableArray alloc] init];
    for (MWZFloor* f in floors) {
        [array addObject:[MWZSerializer serializeFloor:f]];
    }
    self.onFloorsChange(@{@"value": array});
}

- (void)mapView:(MWZMapView *)mapView floorWillChange:(MWZFloor *)floor {
    if (!_onFloorWillChange) {
        return;
    }
    if (floor) {
        self.onFloorWillChange(@{@"value":[MWZSerializer serializeFloor:floor]});
    }
    else {
        self.onFloorWillChange(@{@"value":NSNull.null});
    }
}

- (void)mapView:(MWZMapView *)mapView floorDidChange:(MWZFloor *)floor {
    if (!_onFloorChange) {
        return;
    }
    if (floor) {
        self.onFloorChange(@{@"value":[MWZSerializer serializeFloor:floor]});
    }
    else {
        self.onFloorChange(@{@"value":NSNull.null});
    }
}

-(void)mapView:(MWZMapView *)mapView floorDidFailChanging:(MWZFloor *)floor withError:(NSError *)error {
    if (!_onFloorChangeError) {
        return;
    }
    self.onFloorChangeError(@{@"value": [NSString stringWithFormat:@"Error changing floor %@", floor.name]});
}

-(void)mapView:(MWZMapView *)mapView didTapOnMarker:(MWZMapwizeAnnotation *)marker {
    if (!_onMarkerClick) {
        return;
    }
    self.onMarkerClick(@{@"value":[MWZSerializer serializeMarker:marker]});
}

-(void)mapView:(MWZMapView *)mapView didTap:(MWZClickEvent *)clickEvent {
    if (!_onMapClick) {
        return;
    }
    self.onMapClick(@{@"value":[MWZSerializer serializeClickEvent:clickEvent]});
}

-(void)mapView:(MWZMapView *)mapView followUserModeDidChange:(MWZFollowUserMode)followUserMode {
    if (!_onFollowUserModeChange) {
        return;
    }
    self.onFollowUserModeChange(@{@"value":[MWZSerializer serializeFollowUserMode:followUserMode]});
}

-(void)mapView:(MWZMapView *)mapView languageDidChange:(NSString *)language {
    if (!_onLanguageChange) {
        return;
    }
    self.onLanguageChange(@{@"value": language});
}

-(void)mapView:(MWZMapView *)mapView languagesDidChange:(NSArray<NSString *> *)languages {
    if (!_onLanguageChange) {
        return;
    }
    self.onLanguagesChange(@{@"value": languages});
}

- (void)mapView:(MWZMapView *)mapView directionModesDidChange:(NSArray<MWZDirectionMode *> *)directionModes {
    if (!_onDirectionModesChange) {
        return;
    }
    NSMutableArray* modes = [[NSMutableArray alloc] init];
    for (MWZDirectionMode* mode in directionModes) {
        [modes addObject:[MWZSerializer serializeDirectionMode:mode]];
    }
    self.onDirectionModesChange(@{@"value": modes});
}

- (void)mapViewWillStartNavigation:(MWZMapView *)mapView {
    if (_onNavigationWillStart) {
        _onNavigationWillStart(@{@"value": @""});
    }
}

- (void) mapViewDidStartNavigation:(MWZMapView *)mapView forDirection:(MWZDirection *)direction {
    if (_onNavigationStart) {
        _onNavigationStart(@{@"value": @""});
    }
}

- (void) mapViewDidStopNavigation:(MWZMapView *)mapView {
    if (_onNavigationStop) {
        _onNavigationStop(@{@"value": @""});
    }
}

- (void) mapView:(MWZMapView *)mapView navigationFailedWithError:(NSError *)error {
    if (_onNavigationError) {
        _onNavigationError(@{@"value": error.localizedDescription});
    }
}

- (BOOL)mapView:(MWZMapView *_Nonnull) mapView shouldRecomputeNavigation:(MWZNavigationInfo* _Nonnull) navigationInfo {
    if (_onNavigationUpdate) {
        _onNavigationUpdate(@{
            @"value":[MWZSerializer serializeNavigationInfo:navigationInfo]
                            });
    }
    NSNumber* maxDistance = _navigation[@"maxDistanceBeforeRecompute"];
    if (!maxDistance) {
        return false;
    }
    double maxDistanceDouble = maxDistance.doubleValue;
    return navigationInfo.locationDelta > maxDistanceDouble;
}


- (void)mapViewDidFinishLoadingMap:(MGLMapView *)mapView {
    if (self.tilt && !self.bearing) {
        self.bearing = @0;
    }
    if (!self.tilt && self.bearing) {
        self.tilt = @0;
    }
    if (self.tilt && self.bearing) {
        MGLMapCamera* camera = [MGLMapCamera cameraLookingAtCenterCoordinate:self.mapView.mapboxMapView.centerCoordinate altitude:self.mapView.mapboxMapView.camera.altitude pitch:[self.tilt doubleValue] heading:[self.bearing doubleValue]];
        [self.mapView.mapboxMapView setCamera:camera animated:NO];
        self.tilt = nil;
        self.bearing = nil;
    }
}

- (void)mapView:(MGLMapView *)mapView regionDidChangeAnimated:(BOOL)animated {
    NSNumber* zoomLevel = [NSNumber numberWithDouble:mapView.zoomLevel];
    NSNumber* bearing = [NSNumber numberWithDouble:mapView.camera.heading];
    NSNumber* pitch = [NSNumber numberWithFloat:mapView.camera.pitch];
    NSMutableDictionary* coordinate = [[NSMutableDictionary alloc] init];
    coordinate[@"latitude"] = [NSNumber numberWithFloat:mapView.centerCoordinate.latitude];
    coordinate[@"longitude"] = [NSNumber numberWithFloat:mapView.centerCoordinate.longitude];
    if ([self.mapView getFloor]) {
        coordinate[@"floor"] = [self.mapView getFloorNumber];
    }
    NSDictionary* camera = @{
        @"zoomLevel": zoomLevel,
        @"bearing": bearing,
        @"tilt": pitch,
        @"center": coordinate
    };
    if (_onCameraChange) {
        _onCameraChange(@{@"value": camera});
    }
}

@end
