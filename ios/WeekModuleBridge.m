//
//  WeekModuleBridge.m
//  ToDoApp
//
//  Created by 정윤재 on 2022/01/12.
//
//
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(WeekWidgetModule, NSObject)

RCT_EXTERN_METHOD(setWidgetData:(NSDictionary *))
RCT_EXTERN_METHOD(refreshAllWidgets)

@end
