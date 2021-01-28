#import "RNMWZMapManager.h"
#import "RNMWZMapView.h"
#import <React/RCTConvert.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>

@interface RNMWZMapManager ()

@property (nonatomic) RNMWZMapView* mapView;
@property (nonatomic, assign) BOOL compassEnabled;
@property (nonatomic) NSNumber* tilt;
@property (nonatomic) NSNumber* bearing;

@end

@implementation RNMWZMapManager

RCT_EXPORT_MODULE(RNMWZMap)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (UIView*) view {
    return [[RNMWZMapView alloc] init];
}

#pragma mark RNViewProperties

RCT_CUSTOM_VIEW_PROPERTY(mapwizeConfiguration, MWZMapwizeConfiguration, RNMWZMapView) {
    MWZMapwizeConfiguration* config = [MWZApiResponseParser parseMapwizeConfiguration:json];
    [view setMapwizeConfiguration:config];
    
}

RCT_CUSTOM_VIEW_PROPERTY(mapOptions, MWZOptions, RNMWZMapView) {
    MWZOptions* options = [MWZApiResponseParser parseMapOptions:json];
    [view setMapOptions:options];
    if (json[@"compassEnabled"]) {
        _compassEnabled = [json[@"compassEnabled"] boolValue];
    }
    if (json[@"tilt"]) {
        _tilt = json[@"tilt"];
    }
    if (json[@"bearing"]) {
        _bearing = json[@"bearing"];
    }

    
}

RCT_CUSTOM_VIEW_PROPERTY(mapDirection, NSDictionary, RNMWZMapView) {
    [view setDirection:json];
}

RCT_CUSTOM_VIEW_PROPERTY(mapNavigation, NSDictionary, RNMWZMapView) {
    [view setNavigation:json];
}

RCT_CUSTOM_VIEW_PROPERTY(markers, NSArray, RNMWZMapView) {
    [view setMarkers:json];
}

RCT_CUSTOM_VIEW_PROPERTY(placeStyles, NSArray, RNMWZMapView) {
    NSMutableDictionary<NSString*, MWZStyle*>* styles = [[NSMutableDictionary alloc] init];
    for (NSDictionary* placeStyle in json) {
        styles[placeStyle[@"placeId"]] = [MWZApiResponseParser parseCustomStyle:placeStyle[@"style"]];
    }
    [view setPlaceStyles:styles];
}

RCT_CUSTOM_VIEW_PROPERTY(promotedPlaces, NSArray, RNMWZMapView) {
    [view setPromotedPlaces:json];
}

RCT_CUSTOM_VIEW_PROPERTY(selectedPlace, NSDictionary, RNMWZMapView) {
    [view setSelectedPlace:json];
}

RCT_CUSTOM_VIEW_PROPERTY(userLocation, MWZLatLngFloor, RNMWZMapView) {
    MWZLatLngFloor* llf = [MWZApiResponseParser parseLatLngFloor:json];
    [view setUserLocation:llf];
}

RCT_EXPORT_VIEW_PROPERTY(onMapLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMapClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onMarkerClick, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVenueWillEnter, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVenueEnter, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVenueEnterError, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onVenueExit, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUniversesChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUniverseWillChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUniverseChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onUniverseChangeError, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorsChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorWillChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFloorChangeError, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onFollowUserModeChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onLanguageChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDirectionModesChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationWillStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationStart, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationStop, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationUpdate, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNavigationError, RCTBubblingEventBlock)

#pragma mark RNViewMethods

RCT_EXPORT_METHOD(componentDidMount:(nonnull NSNumber*) reactTag) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        RNMWZMapView* mv = (RNMWZMapView*)view;
        mv.tilt = self.tilt;
        mv.bearing = self.bearing;
        mv.mapView = [[MWZMapView alloc] initWithFrame:CGRectZero options:mv.mapOptions mapwizeConfiguration:mv.mapwizeConfiguration];
        mv.mapView.autoresizingMask = (UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight);
        mv.mapView.delegate = mv;
        mv.mapView.mapboxDelegate = mv;
        if (!self.compassEnabled) {
            mv.mapView.mapboxMapView.compassView.compassVisibility = MGLOrnamentVisibilityHidden;
        }
        [mv addSubview:mv.mapView];
        
        
    }];
}

RCT_EXPORT_METHOD(addImageToMap:(nonnull NSNumber*) reactTag name:(nonnull NSString*)name imageBase64:(nonnull NSString*)imageBase64) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        RNMWZMapView* mv = (RNMWZMapView*)view;
        NSRange range = [imageBase64 rangeOfString:@"base64,"];
        NSString *encodedImage = [imageBase64 substringFromIndex:range.location + 7];
        NSData *data =
        [[NSData alloc] initWithBase64EncodedString:encodedImage
                                            options:NSDataBase64DecodingIgnoreUnknownCharacters];
        UIImage *image = [UIImage imageWithData:data];
        mv.imageByName[name] = image;
        [mv.mapView addImageToMapWithName:name image:image];
    }];
}

RCT_EXPORT_METHOD(centerOnCoordinate:(nonnull NSNumber*) reactTag coordinate:(nonnull NSDictionary*)coordinate) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        MWZLatLngFloor* llf = [MWZApiResponseParser parseLatLngFloor:coordinate];
        [((RNMWZMapView*)view).mapView centerOnCoordinate:llf zoom:5 animated:YES];
    }];
}

RCT_EXPORT_METHOD(centerOn:(nonnull NSNumber*) reactTag position:(nonnull NSDictionary*)positionDic zoom:(nonnull NSNumber*) zoom animated:(BOOL) animated) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        RNMWZMapView* mv = (RNMWZMapView*)view;
        NSString* positionType = positionDic[@"objectClass"];
        if ([positionType isEqualToString:@"LatLngFloor"]) {
            MWZLatLngFloor* llf = [MWZApiResponseParser parseLatLngFloor:positionDic];
            [mv.mapView centerOnCoordinate:llf zoom:zoom.doubleValue animated:animated];
        }
        if ([positionType isEqualToString:@"Place"]) {
            MWZPlace* place = [MWZApiResponseParser parsePlace:positionDic];
            [mv.mapView centerOnPlace:place zoom:zoom.doubleValue animated:animated];
        }
        if ([positionType isEqualToString:@"PlacePreview"]) {
            MWZPlacePreview* placePreview = [MWZApiResponseParser parsePlacePreview:positionDic];
            [mv.mapView centerOnPlacePreview:placePreview zoom:zoom.doubleValue animated:YES];
        }
        if ([positionType isEqualToString:@"Venue"]) {
            MWZVenue* venue = [MWZApiResponseParser parseVenue:positionDic];
            [mv.mapView centerOnVenue:venue zoom:zoom.doubleValue animated:animated];
        }
        if ([positionType isEqualToString:@"VenuePreview"]) {
            MWZVenuePreview* venuePreview = [MWZApiResponseParser parseVenuePreview:positionDic];
            [mv.mapView centerOnVenuePreview:venuePreview zoom:zoom.doubleValue animated:animated];
        }
    }];
}

RCT_EXPORT_METHOD(getFloors:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeFloors:[mv.mapView getFloors]]);
    }];
}


RCT_EXPORT_METHOD(getFloor:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeFloor:[mv.mapView getFloor]]);
    }];
}

RCT_EXPORT_METHOD(setFloor:(nonnull NSNumber*) reactTag
                  floor:(nonnull NSNumber*) floor
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView setFloor:floor];
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(setPreferredLanguage:(nonnull NSNumber*) reactTag
                  language:(nonnull NSString*) language
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView setPreferredLanguage:language];
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(setLanguageForVenue:(nonnull NSNumber*) reactTag
                  language:(nonnull NSString*) language
                  venue:(nonnull NSDictionary*) venueDic
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView setLanguage:language forVenue:venue];
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(getLanguageForVenue:(nonnull NSNumber*) reactTag
                  venue:(nonnull NSDictionary*) venueDic
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
        RNMWZMapView* mv = (RNMWZMapView*)view;
        
        resolve([mv.mapView getLanguageForVenue:venue]);
    }];
}

RCT_EXPORT_METHOD(getLanguage:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([mv.mapView getLanguage]);
    }];
}

RCT_EXPORT_METHOD(setUniverseForVenue:(nonnull NSNumber*) reactTag
                  universe:(nonnull NSDictionary*) universeDic
                  venue:(nonnull NSDictionary*) venueDic
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        MWZUniverse* universe = [MWZApiResponseParser parseUniverse:universeDic];
        MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView setUniverse:universe forVenue:venue];
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(setUniverse:(nonnull NSNumber*) reactTag
                  universe:(nonnull NSDictionary*) universeDic
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        MWZUniverse* universe = [MWZApiResponseParser parseUniverse:universeDic];
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView setUniverse:universe];
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(getUniverse:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeUniverse:[mv.mapView getUniverse]]);
    }];
}

RCT_EXPORT_METHOD(getUniverses:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeUniverses:[mv.mapView getUniverses]]);
    }];
}

RCT_EXPORT_METHOD(getUniverseForVenue:(nonnull NSNumber*) reactTag
                  venue:(nonnull NSDictionary*) venueDic
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeUniverse:[mv.mapView getUniverseForVenue:venue]]);
    }];
}

RCT_EXPORT_METHOD(getDirectionModes:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeDirectionModes:[mv.mapView getDirectionModes]]);
    }];
}

RCT_EXPORT_METHOD(getFollowUserMode:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([MWZSerializer serializeFollowUserMode:[mv.mapView getFollowUserMode]]);
    }];
}

RCT_EXPORT_METHOD(setFollowUserMode:(nonnull NSNumber*) reactTag
                  followUserMode:(nonnull NSDictionary*) mode
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        if (mode[@"none"]) {
            [mv.mapView setFollowUserMode:MWZFollowUserModeNone];
        }
        if (mode[@"follow_user"]) {
            [mv.mapView setFollowUserMode:MWZFollowUserModeFollowUser];
        }
        if (mode[@"follow_user_and_heading"]) {
            [mv.mapView setFollowUserMode:MWZFollowUserModeFollowUserAndHeading];
        }
        
        resolve(@{});
    }];
}

RCT_EXPORT_METHOD(getZoom:(nonnull NSNumber*) reactTag
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        resolve([NSNumber numberWithDouble:mv.mapView.mapboxMapView.zoomLevel]);
        //resolve([MWZSerializer serializeFollowUserMode:[mv.mapView getFollowUserMode]]);
    }];
}

RCT_EXPORT_METHOD(zoomTo:(nonnull NSNumber*) reactTag
                  zoomLevel:(nonnull NSNumber*) zoomLevel
                  withResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        UIView *view = viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[RNMWZMapView class]]) {
            RCTLogError(@"Cannot find NativeView with tag #%@", reactTag);
            return;
        }
        
        RNMWZMapView* mv = (RNMWZMapView*)view;
        [mv.mapView.mapboxMapView setZoomLevel:zoomLevel.doubleValue animated:YES];
        
        resolve(@{});
    }];
}


@end
