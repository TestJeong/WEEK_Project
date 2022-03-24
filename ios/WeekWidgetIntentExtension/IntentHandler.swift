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
    
    
    
    
    //    var items: Array<Category> = []
    //    var list: INObjectCollection<Category>? = INObjectCollection(items: items)
    //    let widgetData = WeekWidgetModule().test
    ////
    //    let menus: [Category] = widgetData.map { menu in
    //      items.append(Category(identifier: menu as! String, display: menu as! String))
    //
    //    }
    //    completion(INObjectCollection(items: items), nil)
    
    
    //    let catIdentifiers: [NSString] = [
    //               "ネコノヒー",
    //               "ムギ",
    //               "アズキ",
    //               WeekWidgetModule().testData(),
    //               "안녕하세요"
    //           ]
    //           let allCatIdentifiers = INObjectCollection(items: catIdentifiers)
    //           completion(allCatIdentifiers, nil)
    
    var items: Array<Category> = []
    var list: INObjectCollection<Category>? = INObjectCollection(items: items)
    guard let widgetData = WeekWidgetModule().getWidgetData() else {
      completion(list, nil)
      return
    }
    for provider in widgetData {
      let _provider = provider as? Dictionary<String, Any>
      let identifier = _provider!["title"] as? String
      let test = _provider!["todoData"] as? [ToDoData]
      let testa = _provider!["todoData"]
      
      print("asdf \(test)")
      print("asdfoij;oi \(testa!)")
      
      let hoho =  Category(identifier: identifier!, display: identifier!)
    
      items.append(hoho)
    }
    list = INObjectCollection(items: items)
    completion(list, nil)
    
  }
}

struct ToDoData:Codable, Identifiable, Equatable  {
  let categoryTitle: String
  let createTime: String
  let id: Int
  let listClear: Int
  let listContent: String
  let listDay: String
  let listEnabled: Int
  let listMemo: String
  let listPriority: Int
  let listTime: String
  let listTime_Data: String
}


