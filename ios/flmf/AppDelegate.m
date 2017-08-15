/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import "MTA.h"
#import "MTAConfig.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTLinkingManager.h>

#import "JPUSHService.h"
#import <AdSupport/AdSupport.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

@interface AppDelegate ()<JPUSHRegisterDelegate>

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

//  
#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
    // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif
// //  jsCodeLocation = [NSURL URLWithString:@"http://192.168.1.210:8081/index.ios.bundle?platform=ios&dev=true"];
//   // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"bundle/index.ios" withExtension:@"jsbundle"];
  // jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"flmf"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [MTA startWithAppkey:appKeyMTA];
  
  // 3.0.0及以后版本注册可以这样写，也可以继续用旧的注册方式
  JPUSHRegisterEntity * entity = [[JPUSHRegisterEntity alloc] init];
  entity.types = JPAuthorizationOptionAlert|JPAuthorizationOptionBadge|JPAuthorizationOptionSound;
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    //可以添加自定义categories
    if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
      NSSet<UNNotificationCategory *> *categories;
      entity.categories = categories;
    }
    else {
      NSSet<UIUserNotificationCategory *> *categories;
      entity.categories = categories;
    }
  }
  [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  
  //如不需要使用IDFA，advertisingIdentifier 可为nil
  [JPUSHService setupWithOption:launchOptions appKey:appKeyJpush
                        channel:nil
               apsForProduction:true
          advertisingIdentifier:nil];
  
  
  
  
  return YES;
}

// 极光推送注册
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}

// 极光推送清角标
- (void)applicationWillEnterForeground:(UIApplication *)application {
  [[UIApplication sharedApplication] setApplicationIconBadgeNumber:0];
  application.applicationIconBadgeNumber = 0;
  [JPUSHService setBadge:0];
}

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  return [RCTLinkingManager application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}


@end

