import React from 'react';
import type { MapwizeViewProps, Floor, MapwizeViewRef, Venue, VenuePreview, Place, PlacePreview, Universe, FollowUserMode, DirectionMode, LatLngFloor, MapwizeInternalEvent } from './types';
import Commands from './command';
declare class MapView extends React.Component<MapwizeViewProps> implements MapwizeViewRef {
    command: Commands;
    onMapwizeEvent: ({ nativeEvent }: {
        nativeEvent: MapwizeInternalEvent;
    }) => void;
    componentDidMount(): void;
    centerOn: (position: LatLngFloor | Place | PlacePreview | VenuePreview | Venue, zoom?: number, animated?: boolean) => Promise<any>;
    centerOnCoordinate: (latLngFloor: LatLngFloor) => Promise<any>;
    getFloor: () => Promise<Floor>;
    addImageToMap: (imageName: string, imageBase64: string) => Promise<any>;
    grantAccess: (accessKey: string) => Promise<void>;
    setFloor: (floorNumber: number) => Promise<any>;
    getFloors: () => Promise<Floor[]>;
    setPreferredLanguage: (language: string) => Promise<any>;
    getPreferredLanguage: () => Promise<string>;
    setLanguageForVenue: (language: string, venue: Venue) => Promise<any>;
    getLanguageForVenue: (venue: Venue) => Promise<string>;
    getLanguage: () => Promise<string>;
    setUniverse: (universe: Universe) => Promise<any>;
    setUniverseForVenue: (universe: Universe, venue: Venue) => Promise<any>;
    getUniverse: () => Promise<Universe>;
    getUniverseForVenue: (venue: Venue) => Promise<Universe>;
    getUniverses: () => Promise<Universe[]>;
    setFollowUserMode: (followUserMode: FollowUserMode) => Promise<any>;
    getFollowUserMode: () => Promise<FollowUserMode>;
    getDirectionModes: () => Promise<DirectionMode[]>;
    render(): JSX.Element;
}
export { MapView as default };
