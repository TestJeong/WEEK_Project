//
//  WeekWidgeModule.swift
//  ToDoApp
//
//  Created by 정윤재 on 2022/01/12.
//

import Foundation
import WidgetKit

@objc(WeekWidgetModule)
class WeekWidgetModule: NSObject {
  static let GroupId = "group.com.week.ReactNativeWidget"
  
  @objc(setWidgetData:)
   func setWidgetData(widgetData: NSDictionary) -> Void {
     do {
       let fileManager = FileManager.default
       let directory = fileManager.containerURL(forSecurityApplicationGroupIdentifier: WeekWidgetModule.GroupId)
       guard let fileURL = directory?.appendingPathComponent("widgetData.json") else {
         return
       }
       try JSONSerialization.data(withJSONObject: widgetData)
         .write(to: fileURL)
     } catch {
     }
   }
   
  @objc(refreshAllWidgets)
   func refreshAllWidgets() {
     if #available(iOS 14.0, *) {
       WidgetCenter.shared.reloadAllTimelines()
     }
   }
 }

