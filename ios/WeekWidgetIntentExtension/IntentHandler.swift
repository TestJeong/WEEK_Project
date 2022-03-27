//
//  IntentHandler.swift
//  WeekWidgetIntentExtension
//
//  Created by 정윤재 on 2022/03/20.
//

import Intents
import WeekWidgetExtension

class IntentHandler: INExtension {
  
  override func handler(for intent: INIntent) -> Any {
    // This is the default implementation.  If you want different objects to handle different intents,
    // you can override this and return the handler you want for that particular intent.
    
    return self
  }
  
}

extension IntentHandler: ConfigurationIntentHandling {
  func provideCategoryOptionsCollection(for intent: ConfigurationIntent, with completion: @escaping (INObjectCollection<Category>?, Error?) -> Void) {
    
    //        var items: Array<Category> = []
    //        var list: INObjectCollection<Category>? = INObjectCollection(items: items)
    //        guard let widgetData = WeekWidgetModule().getWidgetData() else {
    //          completion(list, nil)
    //          return
    //        }
    //        for provider in widgetData {
    //          let _provider = provider as? Dictionary<String, Any>
    //          let identifier = _provider!["providerId"] as? Int
    //          let display = _provider!["providerName"] as? String
    //
    //          print("asdfasdf -> \(identifier)")
    //
    //          items.append(
    //            Category(identifier: String(identifier!), display: display!)
    //          )
    //        }
    //        list = INObjectCollection(items: items)
    //        completion(list, nil)
    
    var hey: [String:Any] = [:]
    var items: Array<Category> = []
    var list: INObjectCollection<Category>? = INObjectCollection(items: items)
    guard let widgetData = WeekWidgetModule().getWidgetData() else {
      completion(list, nil)
      return
    }
    
    for provider in widgetData {
      let _provider = provider as? Dictionary<String, Any>
      let display = _provider!["title"] as? String
      let identifier = _provider!["createTime"] as? Int
      
      if let dates = _provider!["todoData"] as? [[String:Any]],
         let weather = dates.first {
        hey = weather
       // print("AS!@# \(weather[ as? [ToDoDataa])")

      }
      
     

//      if !dates!.isEmpty {
//        let hey = dates! as? [ToDoDataa]
//        print("asdfasdff ff \(hey)")
//
//      }
      
      print("!@# \(hey["createTime"])")
      items.append(
        Category(identifier: String(identifier!), display: display!)
      )
    }
    list = INObjectCollection(items: items)
    completion(list, nil)
    
  }
}

struct ToA:Codable, Equatable {
  let createTime : String
 
}
