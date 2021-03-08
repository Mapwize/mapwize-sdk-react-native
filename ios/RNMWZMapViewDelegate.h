#ifndef RNMWZMapViewDelegate_h
#define RNMWZMapViewDelegate_h

@import MapwizeSDK;

@class MWZClickEvent;
@class MWZFloor;
@class MWZMapView;
@class MWZMapwizeAnnotation;
@class MWZUniverse;
@class MWZUserLocationAnnotationView;
@class MWZVenue;
@class RNMWZMapView;

/**
 Delegate object for MWZMapView allowing to listen for the MWZMapView events
 */
@protocol RNMWZMapViewDelegate <NSObject>

@optional

/**
 Called when MWZMapView is loaded
 @param mapView the view that is loaded
 */
- (void)mapViewDidLoad:(RNMWZMapView *_Nonnull)mapView;

/**
 Called when MWZMapView fails to load
 @param mapView the view that tried to load
 @param message the error message
 */
- (void)mapViewDidFailLoading:(RNMWZMapView *_Nonnull)mapView withMessage:(NSString* _Nonnull) message;

/**
 Called when the follow user mode changed.
 @param mapView the view that triggered the event
 @param followUserMode the active followUserMode
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView
followUserModeDidChange:(MWZFollowUserMode)followUserMode;

/**
 Called when the user click on the map
 @param mapView the view that triggered the event
 @param clickEvent the click event produced by the click
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView didTap:(MWZClickEvent *_Nonnull)clickEvent;

/**
 Called when the MWZMapView starts to display a venue
 @param mapView the view that triggered the event
 @param venue that will be displayed
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView venueWillEnter:(MWZVenue *_Nonnull)venue;

/**
 Called when the MWZMapView finishes to display a venue
 @param mapView the view that triggered the event
 @param venue that is displayed
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView venueDidEnter:(MWZVenue *_Nonnull)venue;

/**
 Called when the MWZMapView hides a venue
 @param mapView the view that triggered the event
 @param venue that is hidden
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView venueDidExit:(MWZVenue *_Nonnull)venue;

/**
Called when the MWZMapView try to enter in a venue but fails
@param mapView the view that triggered the event
@param venue that failed to load
@param error the reason of failure
*/
- (void)mapView:(RNMWZMapView *_Nonnull)mapView venueDidFailEntering:(MWZVenue *_Nonnull)venue withError:(NSError* _Nonnull) error;

/**
 Called when the universe will change
 @param mapView the view that triggered the event
 @param universe that will be displayed
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView universeWillChange:(MWZUniverse *_Nonnull)universe;

/**
 Called when the universe did change
 @param mapView the view that triggered the event
 @param universe that is displayed
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView universeDidChange:(MWZUniverse *_Nonnull)universe;

/**
 Called when the universes available for the displayed venue changed. Triggered just after venueEnter or if new access are granted.
 @param mapView the view that triggered the event
 @param universes the available universes
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView universesDidChange:(NSArray<MWZUniverse *> *_Nonnull)universes;

/**
Called when the universes available for the displayed venue failed to change.
@param mapView the view that triggered the event
@param universe that failed to load
@param error the reason of failure
*/
- (void)mapView:(RNMWZMapView *_Nonnull)mapView universeDidFailChanging:(MWZUniverse *_Nonnull)universe withError:(NSError* _Nonnull) error;

/**
 Called when the available direction mode for the displayed venue changed. Triggered just after universeDidChange.
 @param mapView the view that triggered the event
 @param directionModes the available direction modes
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView directionModesDidChange:(NSArray<MWZDirectionMode *> *_Nonnull)directionModes;

/**
 Called when the MWZMapView will change the displayed floor
 @param mapView the view that triggered the event
 @param floor that will be displayed
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView floorWillChange:(MWZFloor *_Nullable)floor;

/**
 Called when the MWZMapView changes the displayed floor
 @param mapView the view that triggered the event
 @param floor the displayed floor
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView floorDidChange:(MWZFloor *_Nullable)floor;

/**
 Called when the MWZMapView changes the displayed floor
 @param mapView the view that triggered the event
 @param floor that failed to load
 @param error the reason of failure
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView floorDidFailChanging:(MWZFloor *_Nullable)floor withError:(NSError* _Nonnull) error;

/**
 Called when the MWZMapView changes the available floors for the displayed venue.
 Triggered just after venueDidEnter, universeDidChange and venueDidExit.
 Can also be triggered based on the map movements.
 @param mapView the mapwize view that triggered the event
 @param floors the available floors
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView floorsDidChange:(NSArray<MWZFloor *> *_Nonnull)floors;

/**
 Called when the language change for the displayed venue
 @param mapView the mapwize view that triggered the event
 @param language the current language
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView languageDidChange:(NSString* _Nonnull)language;

/**
 Called when the available languages change for the displayed venue
 @param mapView the mapwize view that triggered the event
 @param languages the available languages
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView languagesDidChange:(NSArray<NSString*>* _Nonnull)languages;

/**
 Called when the MWZMapView needs to display the user location. Use this method to display a custom
 user location view. Specifications about the MGLUserLocationAnnotationView can be found at https://docs.mapbox.com/ios/api/maps
 */
- (MWZUserLocationAnnotationView *_Nonnull)viewForUserLocationAnnotation;

/**
 Called when a marker is tapped
 @param mapView the view that triggered the event
 @param marker tapped
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView didTapOnMarker:(MWZMapwizeAnnotation *_Nonnull)marker;

/**
 Called when a navigation will start or will be recomputed
 */
- (void)mapViewWillStartNavigation:(RNMWZMapView *_Nonnull)mapView;

/**
 Called when a navigation is started or has been recompute
 */
- (void)mapViewDidStartNavigation:(RNMWZMapView *_Nonnull)mapView
                     forDirection:(MWZDirection* _Nonnull) direction;

/**
 Called when the navigation stopped
 */
- (void)mapViewDidStopNavigation:(RNMWZMapView *_Nonnull)mapView;

/**
 Called when the no direction have been found
 */
- (void)mapView:(RNMWZMapView *_Nonnull)mapView navigationFailedWithError:(NSError* _Nonnull) error;

/**
 Called during a navigation when the user location change.
 You should decide to recompute based on the navigation information (For exemple : return locationDelta > 10)
 */
- (BOOL)mapView:(RNMWZMapView *_Nonnull) mapView
shouldRecomputeNavigation:(MWZNavigationInfo* _Nonnull) navigationInfo;

- (BOOL)mapView:(RNMWZMapView *_Nonnull) mapView bearingDidChange:(NSNumber*)bearing;

@end

#endif
