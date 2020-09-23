import * as React from 'react';
interface IState {
    tests: any;
    progress1: number;
    progress2: number;
    offlineMangerState1: string;
    offlineMangerState2: string;
}
interface IProps {
}
export default class TestApi extends React.PureComponent<IProps, IState> {
    downloadDataUniverse1Test: (resolve: () => void, reject: () => void) => void;
    downloadDataUniverse2Test: (resolve: () => void, reject: (reason: string) => void) => void;
    updateDataTest: (resolve: () => void, reject: (reason: string) => void) => void;
    getOfflineRegionsTest: (resolve: () => void, reject: (reason: string) => void) => void;
    removeFirstOfflineRegionTest: (resolve: () => void, reject: (reason: string) => void) => void;
    removeSecondOfflineRegionTest: (resolve: () => void, reject: (reason: string) => void) => void;
    hasOfflineRegionTest: (resolve: () => void, reject: (reason: string) => void) => void;
    checkForUpdateTest: (resolve: () => void, reject: (reason: string) => void) => void;
    getTests: () => {};
    runTests: () => void;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
