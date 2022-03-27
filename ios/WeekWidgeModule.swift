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
    print("겟 입니다 -> \(dictionary)")
     
    return dictionary
  }
  

  @objc(setWidgetData:)
  func setWidgetData(widgetData: NSArray) -> Void {
    do {
      let fileManager = FileManager.default
      let directory = fileManager.containerURL(forSecurityApplicationGroupIdentifier: WeekWidgetModule.GroupId)
      guard let fileURL = directory?.appendingPathComponent("widgetData.json") else {
        return
      }
      print("ASDF\(widgetData)")
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

struct ToDoDataa:Codable, Equatable {
  let categoryTitle : String
  let createTime : String
  let id : Int
  let listClear : Int
  let listContent : String
  let listDay : String
  let listEnabled : Int
  let listMemo : String
  let listPriority : Int
  let listTime : String
  let listTime_Data : String
  
}

struct Happle:Codable, Equatable {
  let color: String
  let createTime: Int
  let id: Int
  let title: String
  let todoData: [ToDoDataa]
}
