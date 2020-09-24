#import <React/RCTEventEmitter.h>
@import MapwizeSDK;

NS_ASSUME_NONNULL_BEGIN

@interface RNMWZOfflineManager : RCTEventEmitter

@property (nonatomic) NSMutableDictionary<NSString*, MWZMapwizeConfiguration*>* configById;

@end

NS_ASSUME_NONNULL_END
