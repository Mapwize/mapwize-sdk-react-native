#import "Mapwize.h"

@implementation Mapwize

RCT_EXPORT_MODULE(RNMWZApi)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

- (instancetype) init {
    if (self = [super init]) {
        _configById = [[NSMutableDictionary alloc] init];
    }
    return self;
}

RCT_REMAP_METHOD(createMapwizeApi,
                 mapwizeConfiguration:(NSDictionary *)configuration
                 configId:(NSString*) configId
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    _configById[configId] = [MWZApiResponseParser parseMapwizeConfiguration:configuration];
    resolve(configId);
}

RCT_REMAP_METHOD(getAccess,
                  getAccessWithConfigId:(NSString*) configId
                  accessKey:(NSString*) accessKey
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getAccessWithAccessKey:accessKey success:^{
        resolve(@{});
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get access", nil);
    }];
}


RCT_REMAP_METHOD(getPlaces,
                  configId:(NSString*) configId
                  apiFilter:(NSDictionary*) apiFilter
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZApiFilter* filter = [MWZApiResponseParser parseApiFilter:apiFilter];
    [api getPlacesWithFilter:filter success:^(NSArray<MWZPlace *> * _Nonnull places) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZPlace* place in places) {
            [arr addObject:[MWZSerializer serializePlace:place]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(getPlace,
                  configId:(NSString*) configId
                  identifier:(NSString*) identifier
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getPlaceWithIdentifier:identifier success:^(MWZPlace * _Nonnull place) {
        resolve([MWZSerializer serializePlace:place]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(getPlaceWithName,
                  configId:(NSString*) configId
                 name:(NSString*) name
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getPlaceWithName:name venue:venue success:^(MWZPlace * _Nonnull place) {
        resolve([MWZSerializer serializePlace:place]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(getPlaceWithAlias,
                  configId:(NSString*) configId
                 alias:(NSString*) alias
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getPlaceWithAlias:alias venue:venue success:^(MWZPlace * _Nonnull place) {
        resolve([MWZSerializer serializePlace:place]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(getAccessibleUniversesForVenue,
                  configId:(NSString*) configId
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getAccessibleUniversesWithVenue:venue success:^(NSArray<MWZUniverse *> * _Nonnull universes) {
        resolve([MWZSerializer serializeUniverses:universes]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get accessible universes", nil);
    }];
}

RCT_REMAP_METHOD(getDirection,
                  configId:(NSString*) configId
                  from:(NSDictionary*) fromDic
                  to:(id) toAny
                  mode:(NSDictionary*) modeDic
                  waypoints:(NSArray<id<MWZDirectionPoint>>*) waypointsArr
                  waypointOptimize:(BOOL) waypointOptimize
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    id<MWZDirectionPoint> from = [MWZApiResponseParser parseDirectionPointFromDictionary:fromDic];
    MWZDirectionMode* mode = [MWZApiResponseParser parseDirectionMode:modeDic];
    if ([toAny isKindOfClass:NSDictionary.class]) {
        id<MWZDirectionPoint> to = [MWZApiResponseParser parseDirectionPointFromDictionary:toAny];
        if (waypointsArr) {
            NSArray<id<MWZDirectionPoint>>* waypoints = [MWZApiResponseParser parseDirectionPointsFromArray:waypointsArr];
            [api getDirectionWithFrom:from to:to waypoints:waypoints directionMode:mode success:^(MWZDirection * _Nonnull direction) {
                resolve([MWZSerializer serializeDirection:direction]);
            } failure:^(NSError * _Nonnull error) {
                reject(@"MapwizeModule", @"Unable to find direction", nil);
            }];
        }
        else {
            [api getDirectionWithFrom:from to:to directionMode:mode success:^(MWZDirection * _Nonnull direction) {
                resolve([MWZSerializer serializeDirection:direction]);
            } failure:^(NSError * _Nonnull error) {
                reject(@"MapwizeModule", @"Unable to find direction", nil);
            }];
        }
    }
    
    if ([toAny isKindOfClass:NSArray.class]) {
        NSArray<id<MWZDirectionPoint>>* to = [MWZApiResponseParser parseDirectionPointsFromArray:toAny];
        if (waypointsArr) {
            NSArray<id<MWZDirectionPoint>>* waypoints = [MWZApiResponseParser parseDirectionPointsFromArray:waypointsArr];
            [api getDirectionWithFrom:from tos:to waypoints:waypoints directionMode:mode success:^(MWZDirection * _Nonnull direction) {
                resolve([MWZSerializer serializeDirection:direction]);
            } failure:^(NSError * _Nonnull error) {
                reject(@"MapwizeModule", @"Unable to find direction", nil);
            }];
        }
        else {
            [api getDirectionWithFrom:from tos:to directionMode:mode success:^(MWZDirection * _Nonnull direction) {
                resolve([MWZSerializer serializeDirection:direction]);
            } failure:^(NSError * _Nonnull error) {
                reject(@"MapwizeModule", @"Unable to find direction", nil);
            }];
        }
    }
}

RCT_REMAP_METHOD(getDistances,
                 configId:(NSString*) configId
                 from:(NSDictionary*) fromDic
                 to:(NSArray<id<MWZDirectionPoint>>*) toDic
                 mode:(NSDictionary*) modeDic
                 sortByTraveltime:(BOOL) sortByTraveltime
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    id<MWZDirectionPoint> from = [MWZApiResponseParser parseDirectionPointFromDictionary:fromDic];
    NSArray<id<MWZDirectionPoint>>* to = [MWZApiResponseParser parseDirectionPointsFromArray:toDic];
    MWZDirectionMode* mode = [MWZApiResponseParser parseDirectionMode:modeDic];
    [api getDistancesWithFrom:from tos:to directionMode:mode sortByTravelTime:sortByTraveltime success:^(MWZDistanceResponse * _Nonnull distance) {
        resolve([MWZSerializer serializeDistanceResponse:distance]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to compute distance", nil);
    }];
    
}

RCT_REMAP_METHOD(getLayers,
                  getLayersWithConfigId:(NSString*) configId
                  apiFilter:(NSDictionary*) apiFilter
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZApiFilter* filter = [MWZApiResponseParser parseApiFilter:apiFilter];
    [api getLayersWithFilter:filter success:^(NSArray<MWZLayer *> * _Nonnull layers) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZLayer* layer in layers) {
            [arr addObject:[MWZSerializer serializeLayer:layer]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get layers", nil);
    }];
}

RCT_REMAP_METHOD(getLayer,
                 getLayerWithConfigId:(NSString*) configId
                 identifier:(NSString*) identifier
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getLayerWithIdentifier:identifier success:^(MWZLayer * _Nonnull layer) {
        resolve([MWZSerializer serializeLayer:layer]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get layer", nil);
    }];
}

RCT_REMAP_METHOD(getLayerWithName,
                 getLayerWithNameWithConfigId:(NSString*) configId
                 name:(NSString*) name
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getLayerWithName:name venue:venue success:^(MWZLayer * _Nonnull layer) {
        resolve([MWZSerializer serializeLayer:layer]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get layer", nil);
    }];
}

RCT_REMAP_METHOD(getLayerWithAlias,
                 getLayerWithAliasWithConfigId:(NSString*) configId
                 alias:(NSString*) alias
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    MWZApiFilter* filter = [[MWZApiFilter alloc] init];
    filter.venueId = venue.identifier;
    filter.alias = alias;
    [api getLayersWithFilter:filter success:^(NSArray<MWZLayer*>* _Nonnull layers) {
        if (layers.count == 0) {
            reject(@"MapwizeModule", @"Unable to get layer", nil);
        }
        else {
            resolve([MWZSerializer serializeLayer:layers[0]]);
        }
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get layer", nil);
    }];
}

RCT_REMAP_METHOD(getMainFroms,
                 getMainFromsWithConfigId:(NSString*) configId
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getMainFromsWithVenue:venue success:^(NSArray<MWZPlace *> * _Nonnull places) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZPlace* place in places) {
            [arr addObject:[MWZSerializer serializePlace:place]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get main froms", nil);
    }];
}

RCT_REMAP_METHOD(getMainSearches,
                 getMainSearchesWithConfigId:(NSString*) configId
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getMainSearchesWithVenue:venue success:^(NSArray<id<MWZObject>> * _Nonnull mainSearches) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (id<MWZObject> mainSearch in mainSearches) {
            [arr addObject:[MWZSerializer serializeMapwizeObject:mainSearch]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get main searches", nil);
    }];
}

RCT_REMAP_METHOD(getVenues,
                  getVenuesWithConfigId:(NSString*) configId
                  apiFilter:(NSDictionary*) apiFilter
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZApiFilter* filter = [MWZApiResponseParser parseApiFilter:apiFilter];
    [api getVenuesWithFilter:filter success:^(NSArray<MWZVenue *> * _Nonnull venues) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZVenue* venue in venues) {
            [arr addObject:[MWZSerializer serializeVenue:venue]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get venues", nil);
    }];
}

RCT_REMAP_METHOD(getVenue,
                  getVenueWithIdentifierWithConfigId:(NSString*) configId
                  identifier:(NSString*) identifier
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getVenueWithIdentifier:identifier success:^(MWZVenue * _Nonnull venue) {
        resolve([MWZSerializer serializeVenue:venue]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get venue", nil);
    }];
}

RCT_REMAP_METHOD(getVenueWithName,
                  getVenueWithNameWithConfigId:(NSString*) configId
                 name:(NSString*) name
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getVenueWithName:name success:^(MWZVenue * _Nonnull venue) {
        resolve([MWZSerializer serializeVenue:venue]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get venue", nil);
    }];
}

RCT_REMAP_METHOD(getVenueWithAlias,
                  getVenueWithAliasWithConfigId:(NSString*) configId
                 alias:(NSString*) alias
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getVenueWithAlias:alias success:^(MWZVenue * _Nonnull venue) {
        resolve([MWZSerializer serializeVenue:venue]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(getPlacelists,
                 getPlacelistsWithConfigId:(NSString*) configId
                 apiFilter:(NSDictionary*) apiFilter
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZApiFilter* filter = [MWZApiResponseParser parseApiFilter:apiFilter];
    [api getPlacelistsWithFilter:filter success:^(NSArray<MWZPlacelist *> * _Nonnull placelists) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZPlacelist* placelist in placelists) {
            [arr addObject:[MWZSerializer serializePlacelist:placelist]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get placelists", nil);
    }];
}

RCT_REMAP_METHOD(getPlacelist,
                 getPlacelistWithIdentifierWithconfigId:(NSString*) configId
                 identifier:(NSString*) identifier
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    [api getPlacelistWithIdentifier:identifier success:^(MWZPlacelist * _Nonnull placelist) {
        resolve([MWZSerializer serializePlacelist:placelist]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get placelist", nil);
    }];
}

RCT_REMAP_METHOD(getPlacelistWithName,
                 getPlacelistWithNameWithConfigId:(NSString*) configId
                 name:(NSString*) name
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getPlacelistWithName:name venue:venue success:^(MWZPlacelist * _Nonnull placelist) {
        resolve([MWZSerializer serializePlacelist:placelist]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get placelist", nil);
    }];
}

RCT_REMAP_METHOD(getPlacelistWithAlias,
                 getPlacelistWithAliasWithConfigId:(NSString*) configId
                 alias:(NSString*) alias
                 venue:(NSDictionary*) venueDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZVenue* venue = [MWZApiResponseParser parseVenue:venueDic];
    [api getPlacelistWithAlias:alias venue:venue success:^(MWZPlacelist * _Nonnull placelist) {
        resolve([MWZSerializer serializePlacelist:placelist]);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get placelist", nil);
    }];
}

RCT_REMAP_METHOD(getPlacesForPlacelist,
                 configId:(NSString*) configId
                 placelist:(NSDictionary*) placelistDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZPlacelist* placelist = [MWZApiResponseParser parsePlacelist:placelistDic];
    [api getPlacesForPlacelistWithIdentifier:placelist.identifier success:^(NSArray<MWZPlace *> * _Nonnull places) {
        NSMutableArray* arr = [[NSMutableArray alloc] init];
        for (MWZPlace* place in places) {
            [arr addObject:[MWZSerializer serializePlace:place]];
        }
        resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to get places", nil);
    }];
}

RCT_REMAP_METHOD(search,
                 searchWithConfigId:(NSString*) configId
                 searchParams:(NSDictionary*) searchParamsDic
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject) {
    MWZMapwizeConfiguration* configuration = _configById[configId];
    id<MWZMapwizeApi> api = [MWZMapwizeApiFactory getApiWithMapwizeConfiguration:configuration];
    MWZSearchParams* searchParams = [MWZApiResponseParser parseSearchParamsWithDictionary:searchParamsDic];
    
    [api searchWithSearchParams:searchParams success:^(NSArray<id<MWZObject>> * _Nonnull searchResponse) {
       NSMutableArray* arr = [[NSMutableArray alloc] init];
       for (id<MWZObject> mapwizeObject in searchResponse) {
           [arr addObject:[MWZSerializer serializeMapwizeObject:mapwizeObject]];
       }
       resolve(arr);
    } failure:^(NSError * _Nonnull error) {
        reject(@"MapwizeModule", @"Unable to perform search", nil);
    }];
}


@end

