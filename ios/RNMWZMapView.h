#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@import MapwizeSDK;
@import ManualIndoorLocationProvider;

#import "RNMWZMapViewDelegate.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNMWZMapView : RCTView <MWZMapViewDelegate, MGLMapViewDelegate>

@property (nonatomic) MWZMapView* mapView;
@property (nonatomic, weak) id<RNMWZMapViewDelegate> delegate;
@property (nonatomic) ILManualIndoorLocationProvider* manualLocationProvider;
@property (nonatomic) NSMutableDictionary<NSString*, UIImage*>* imageByName;

@property (nonatomic) MWZMapwizeConfiguration* mapwizeConfiguration;
@property (nonatomic) MWZOptions* mapOptions;

@property (nonatomic) NSDictionary* direction;
@property (nonatomic) NSDictionary* navigation;
@property (nonatomic) NSArray* markers;
@property (nonatomic) NSDictionary<NSString*, MWZStyle*>* placeStyles;
@property (nonatomic) NSDictionary* selectedPlace;
@property (nonatomic) NSArray* promotedPlaces;
@property (nonatomic) MWZLatLngFloor* userLocation;

@property (nonatomic) NSNumber* _Nullable tilt;
@property (nonatomic) NSNumber* _Nullable bearing;


@property (nonatomic, copy) RCTBubblingEventBlock onMapLoaded;

@property (nonatomic, copy) RCTBubblingEventBlock onMapClick;
@property (nonatomic, copy) RCTBubblingEventBlock onMarkerClick;

@property (nonatomic, copy) RCTBubblingEventBlock onVenueWillEnter;
@property (nonatomic, copy) RCTBubblingEventBlock onVenueEnter;
@property (nonatomic, copy) RCTBubblingEventBlock onVenueEnterError;
@property (nonatomic, copy) RCTBubblingEventBlock onVenueExit;

@property (nonatomic, copy) RCTBubblingEventBlock onUniversesChange;
@property (nonatomic, copy) RCTBubblingEventBlock onUniverseWillChange;
@property (nonatomic, copy) RCTBubblingEventBlock onUniverseChange;
@property (nonatomic, copy) RCTBubblingEventBlock onUniverseChangeError;

@property (nonatomic, copy) RCTBubblingEventBlock onFloorsChange;
@property (nonatomic, copy) RCTBubblingEventBlock onFloorWillChange;
@property (nonatomic, copy) RCTBubblingEventBlock onFloorChange;
@property (nonatomic, copy) RCTBubblingEventBlock onFloorChangeError;

@property (nonatomic, copy) RCTBubblingEventBlock onFollowUserModeChange;
@property (nonatomic, copy) RCTBubblingEventBlock onLanguageChange;
@property (nonatomic, copy) RCTBubblingEventBlock onDirectionModesChange;

@property (nonatomic, copy) RCTBubblingEventBlock onNavigationWillStart;
@property (nonatomic, copy) RCTBubblingEventBlock onNavigationStart;
@property (nonatomic, copy) RCTBubblingEventBlock onNavigationStop;
@property (nonatomic, copy) RCTBubblingEventBlock onNavigationUpdate;
@property (nonatomic, copy) RCTBubblingEventBlock onNavigationError;

- (void) refreshProps;

@end

NS_ASSUME_NONNULL_END
