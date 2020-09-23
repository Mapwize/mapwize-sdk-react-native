#import <React/RCTBridgeModule.h>

@import MapwizeSDK;

@interface Mapwize : NSObject <RCTBridgeModule>

@property (nonatomic) NSMutableDictionary<NSString*, MWZMapwizeConfiguration*>* configById;

@end
