#import "RNMWZOfflineManager.h"

@implementation RNMWZOfflineManager

RCT_EXPORT_MODULE(RNMWZOfflineManager)

- (instancetype) init {
    if (self = [super init]) {
        _configById = [[NSMutableDictionary alloc] init];
    }
    return self;
}

RCT_REMAP_METHOD(createOfflineManager,
                 createOfflineManagerWithMapwizeConfiguration:(NSDictionary *)configuration
                 configId:(NSString*) configId
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    _configById[configId] = [MWZApiResponseParser parseMapwizeConfiguration:configuration];
    resolve(configId);
}

RCT_REMAP_METHOD(downloadData,
                downloadDataWithConfigId:(NSString*) configId
                taskListenerId:(NSString*) listenerId
                options:(NSDictionary*) optionsDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    NSDictionary* venueDic = optionsDic[@"venue"];
    NSDictionary* universeDic = optionsDic[@"universe"];
    NSNumber* minZoom = optionsDic[@"minZoom"];
    NSNumber* maxZoom = optionsDic[@"maxZoom"];
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    MWZUniverse* universe = [MWZApiResponseParser parseUniverse:universeDic];
    [offlineManager downloadDataForVenue:venue universe:universe minZoom:minZoom maxZoom:maxZoom success:^(MWZOfflineRegion * _Nonnull offlineRegion) {
        resolve([self serializeOfflineRegion:offlineRegion]);
    } progress:^(int progress) {
        [self sendEventWithName:@"OfflineManagerEvent" body:@{
            @"downloadTaskListenerId": listenerId,
            @"contextId": configId,
            @"progress": [NSNumber numberWithInt:progress]
        }];
    } failure:^(NSError * _Nonnull error) {
        reject(@"OfflineManager", error.localizedDescription, nil);
    }];
}

RCT_REMAP_METHOD(updateData,
                updateDataWithConfigId:(NSString*) configId
                taskListenerId:(NSString*) listenerId
                offlineRegion:(NSDictionary*) offlineRegionDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZOfflineRegion* offlineRegion = [self parseOfflineRegion:offlineRegionDic];
    [offlineManager updateDataForOfflineRegion:offlineRegion success:^(MWZOfflineRegion * _Nonnull offlineRegion) {
        resolve([self serializeOfflineRegion:offlineRegion]);
    } progress:^(int progress) {
        [self sendEventWithName:@"OfflineManagerEvent" body:@{
            @"downloadTaskListenerId": listenerId,
            @"contextId": configId,
            @"progress": [NSNumber numberWithInt:progress]
        }];
    } failure:^(NSError * _Nonnull error) {
        reject(@"OfflineManager", error.localizedDescription, nil);
    }];
}

RCT_REMAP_METHOD(getOfflineRegion,
                 getOfflineRegionWithConfigId:(NSString*) configId
                venue:(NSDictionary*) venueDic
                universe:(NSDictionary*) universeDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    MWZUniverse* universe = [MWZApiResponseParser parseUniverse:universeDic];
    MWZOfflineRegion* region = [offlineManager getOfflineRegionForVenue:venue universe:universe];
    resolve([self serializeOfflineRegion:region]);
}

RCT_REMAP_METHOD(getOfflineRegions,
                 getOfflineRegionsWithConfigId:(NSString*) configId
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    NSArray<MWZOfflineRegion*>* regions = [offlineManager getOfflineRegions];
    NSMutableArray* regionsAsDic = [[NSMutableArray alloc] init];
    for (MWZOfflineRegion* region in regions) {
        [regionsAsDic addObject:[self serializeOfflineRegion:region]];
    }
    resolve(regionsAsDic);
}

RCT_REMAP_METHOD(hasOfflineRegion,
                 hasOfflineRegionWithConfigId:(NSString*) configId
                venue:(NSDictionary*) venueDic
                universe:(NSDictionary*) universeDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    MWZUniverse* universe = [MWZApiResponseParser parseUniverse:universeDic];
    BOOL hasOfflineRegion = [offlineManager hasOfflineRegionWithVenue:venue universe:universe];
    resolve([NSNumber numberWithBool:hasOfflineRegion]);
    
}

RCT_REMAP_METHOD(removeData,
                 removeOfflineRegionWithConfigId:(NSString*) configId
                offlineRegion:(NSDictionary*) offlineRegionDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZOfflineRegion* offlineRegion = [self parseOfflineRegion:offlineRegionDic];
    [offlineManager removeOfflineRegion:offlineRegion callback:^{
            resolve(@{});
    }];
}

RCT_REMAP_METHOD(checkForUpdate,
                 checkForUpdateForOfflineRegionWithConfigId:(NSString*) configId
                offlineRegion:(NSDictionary*) offlineRegionDic
                resolve:(RCTPromiseResolveBlock)resolve
                reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    MWZOfflineManager* offlineManager = [[MWZOfflineManager alloc] initWithMapwizeConfiguration:configuration];
    MWZOfflineRegion* offlineRegion = [self parseOfflineRegion:offlineRegionDic];
    [offlineManager checkForUpdateForOfflineRegion:offlineRegion callback:^(BOOL hasChanged) {
        resolve([NSNumber numberWithBool:hasChanged]);
    }];
}

- (NSDictionary*) serializeOfflineRegion:(MWZOfflineRegion*) region {
    return @{
        @"venue":[MWZSerializer serializeVenue:region.venue],
        @"universe":[MWZSerializer serializeUniverse:region.universe],
        @"minZoom":region.minZoom,
        @"maxZoom":region.maxZoom
    };
}

- (MWZOfflineRegion*) parseOfflineRegion:(NSDictionary*) offlineRegionDic {
    MWZVenue* venue = [MWZApiResponseParser parseVenue:offlineRegionDic[@"venue"]];
    MWZUniverse* universe = [MWZApiResponseParser parseUniverse:offlineRegionDic[@"universe"]];
    return [[MWZOfflineRegion alloc] initWithVenue:venue universe:universe minZoom:offlineRegionDic[@"minZoom"] maxZoom:offlineRegionDic[@"maxZoom"]];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"OfflineManagerEvent"];
}

@end
