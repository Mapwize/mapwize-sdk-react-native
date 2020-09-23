import * as React from 'react';
interface IState {
    tests: any;
}
interface IProps {
}
export default class TestApi extends React.PureComponent<IProps, IState> {
    search1Test: (resolve: () => void, reject: () => void) => void;
    search2Test: (resolve: () => void, reject: () => void) => void;
    mapConfigsDummyApiKeyTest: (resolve: () => void, reject: () => void) => void;
    getAccessTest: (resolve: () => void, reject: () => void) => void;
    getAccessDummyKeyTest: (resolve: () => void, reject: () => void) => void;
    twoConfigsApiKeyTest: (resolve: () => void, reject: () => void) => void;
    getDirectionMultipleToWaypointsTest: (resolve: () => void, reject: () => void) => void;
    getDirectionWaypointTest: (resolve: () => void, reject: () => void) => void;
    getDirectionToManyTest: (resolve: () => void, reject: () => void) => void;
    getDirectionTest: (resolve: () => void, reject: () => void) => void;
    getPlaceName: (id: string) => Promise<string>;
    getDistancesTest: (resolve: () => void, reject: () => void) => void;
    getMainFromsTest: (resolve: () => void, reject: () => void) => void;
    getMainSearchesTest: (resolve: () => void, reject: () => void) => void;
    getLayersTest: (resolve: () => void, reject: () => void) => void;
    getLayerTest: (resolve: () => void, reject: () => void) => void;
    getLayerWithNameTest: (resolve: () => void, reject: () => void) => void;
    getLayerWithAliasTest: (resolve: () => void, reject: () => void) => void;
    getPlacesTest: (resolve: () => void, reject: () => void) => void;
    getPlaceTest: (resolve: () => void, reject: () => void) => void;
    getPlaceWithNameTest: (resolve: () => void, reject: () => void) => void;
    getPlaceWithAliasTest: (resolve: () => void, reject: () => void) => void;
    getPlacelistsTest: (resolve: () => void, reject: () => void) => void;
    getPlacelistTest: (resolve: () => void, reject: () => void) => void;
    getPlacelistWithNameTest: (resolve: () => void, reject: () => void) => void;
    getPlacelistWithAliasTest: (resolve: () => void, reject: () => void) => void;
    getVenuesTest: (resolve: () => void, reject: () => void) => void;
    getVenueTest: (resolve: () => void, reject: () => void) => void;
    getVenueWithNameTest: (resolve: () => void, reject: () => void) => void;
    getVenueWithAliasTest: (resolve: () => void, reject: () => void) => void;
    getTests: () => {};
    runTests: () => void;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
