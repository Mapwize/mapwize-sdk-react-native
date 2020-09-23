import type { MapwizeInternalEvent } from './types';
declare type AcceptReject = (val?: any) => void;
declare class Command {
    promisesMap: {
        [key: string]: {
            accept: AcceptReject;
            reject: AcceptReject;
        };
    };
    nextPromiseId: number;
    constructor();
    dispatch: (methodName: string, nativeRef: any, args: any[]) => Promise<any>;
    handlePromise: (event: MapwizeInternalEvent) => void;
}
export default Command;
