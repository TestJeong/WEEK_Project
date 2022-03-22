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
  
  var test: Dictionary<String, Any>? = nil
  var apple: NSString = "ㅁ"
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
//  @objc(getWidgetData:)
//  func getWidgetData(widgetData: NSString) {
//
//    if #available(iOS 14.0, *) {
//      print("asdfasdf안녕 -> \(widgetData)")
//      apple = "widgetData"
//
//
//
//    }
//  }
  
  func getWidgetData() -> Array<Any>? {
    var dictionary:  Array<Any>? = nil
    do {
      let fileManager = FileManager.default
      let directory = fileManager.containerURL(forSecurityApplicationGroupIdentifier: WeekWidgetModule.GroupId)
      guard let fileURL = directory?.appendingPathComponent("widgetData.json") else {
        return dictionary
      }
      
      let data = try Data(contentsOf: fileURL)
      let json = try JSONSerialization.jsonObject(with: data)
      guard let _dictionary = json as?  Array<Any> else {
        return dictionary
      }
      dictionary = _dictionary
    } catch {
    }
    print("1231231 rㅕㄹ과 -> \(dictionary)")
    return dictionary
  }

  
  func testData() -> NSString {
    let userDefaults = UserDefaults.init(suiteName: "group.com.week.ReactNativeWidget")
    var hoho = userDefaults!.value(forKey: "cate")
    
    return "hoho as! NSString"
  }
  
  
  
  
  @objc(setWidgetData:)
    func setWidgetData(widgetData: NSArray) -> Void {
      print("asdfasdf23 -> \(widgetData)")
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
