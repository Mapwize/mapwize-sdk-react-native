import * as React from 'react';
import { MapwizeViewRef, Place, Placelist, Venue, Universe, PlacePreview, Floor, MarkerProp, DirectionProp, NavigationProp, NavigationInfo, LatLngFloor, PlaceStyleProp } from 'mapwize';
interface IState {
    promotedPlaces: (Place | PlacePreview | Placelist)[] | undefined;
    strongRef: MapwizeViewRef | undefined;
    tests: any;
    directionProp: DirectionProp | undefined;
    markersProp: MarkerProp[] | undefined;
    navigationProp: NavigationProp | undefined;
    userLocation: LatLngFloor | undefined;
    placeStyles: PlaceStyleProp[] | undefined;
    navigationEvent: string;
    navigationEventInfo: NavigationInfo;
    venueExit: Venue | undefined;
    venueEnter: Venue | undefined;
    universe: Universe | undefined;
    floor: Floor;
    language: string;
}
interface IProps {
}
export default class TestApi extends React.PureComponent<IProps, IState> {
    centerOnPlaceTest: (resolve: (data: any) => void, reject: () => void) => void;
    centerOnPlaceZoomTest: (resolve: (data: any) => void, reject: () => void) => void;
    centerOnPlaceZoomAnimateTest: (resolve: (data: any) => void, reject: () => void) => void;
    centerOnVenueTest: (resolve: (data: any) => void, reject: () => void) => void;
    centerOnVenueZoomOutTest: (resolve: (data: any) => void, reject: () => void) => void;
    centerOnVenueZoomAnimateTest: (resolve: (data: any) => void, reject: () => void) => void;
    setFloor0Test: (resolve: (data: any) => void) => void;
    setFloor1Test: (resolve: (data: any) => void) => void;
    setFloor2Test: (resolve: (data: any) => void) => void;
    setFloor3Test: (resolve: (data: any) => void) => void;
    setFloor_1Test: (resolve: (data: any) => void) => void;
    getFloorTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    setUniverse2Test: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    setUniverse1Test: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    setLanguageTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    addMarkerTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    removeMarkersTest: (resolve: (data: any) => void) => void;
    addPromotedPlaceTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    removePromotedPlacesTest: (resolve: (data: any) => void) => void;
    setDirectionTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    removeDirectionTest: (resolve: (data: any) => void) => void;
    setPlaceStylesTest: (resolve: (data: any) => void) => void;
    removePlaceStylesTest: (resolve: (data: any) => void) => void;
    startNavigationTest: (resolve: (data: any) => void, reject: (data: any) => void) => void;
    stopNavigationTest: (resolve: (data: any) => void) => void;
    removeUserLocationTest: (resolve: (data: any) => void) => void;
    getTests: () => {};
    runTests: () => void;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
