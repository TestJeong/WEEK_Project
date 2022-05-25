//////
//////  Host.swift
//////  Host
//////
//////  Created by 정윤재 on 2022/01/09.
//////
////
import WidgetKit
import SwiftUI
import Intents

extension Date {
  var zeroSeconds: Date? {
    let calendar = Calendar.current
    let dateComponents = calendar.dateComponents([.year, .month, .day, .hour, .minute, .second], from: self)
    return calendar.date(from: dateComponents)
  }}

struct WidgetData: Decodable {
  let today: Int
  let willToDo: Int
  let priorityToDo: Int
  let allToDo: Int
}

struct Provider: IntentTimelineProvider {
  func placeholder(in context: Context) -> SimpleEntry {
    SimpleEntry(date: Date(), configuration: ConfigurationIntent(),today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4, title:"예시1",color:"예시 컬러",todoData: [])
  }
  
  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date(), configuration: configuration,today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4, title:"예시1",color:"예시 컬러",todoData: [])
    completion(entry)
  }
  
  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
    let userDefaults = UserDefaults.init(suiteName: "group.com.week.ReactNativeWidget")
    let date = Date().zeroSeconds!
    var entries: [SimpleEntry] = []
    
    var titles: String = "테스트중입니다zzz"
    var todoData:[Any] = []
    var color: String = ""
    let providerId = configuration.Category?.identifier
    guard let widgetData = WeekWidgetModule().getWidgetData() else {
      return
    }
    if providerId != nil, widgetData != nil {
      for provider in widgetData {
        let _provider = provider as? Dictionary<String, Any>
        let display = _provider!["title"] as? String
        let identifier = _provider!["createTime"] as? Int
        let categoryColor = _provider!["color"] as? String
        
        
        if(identifier == Int(providerId!)) {
          
          if let dates = _provider!["todoData"] as? [[String:Any]],
            let _ = dates.first {
            let indexCount = [0,1,2,3,4]
            for index in indexCount {
              if(index >= dates.startIndex && index < dates.endIndex) {
                let clear = dates[index]["listClear"] as! Int
                if(clear == 0) {
                  todoData.append(dates[index]["listContent"])
                }
                
              }
            }
          }
          titles = display!
          color = categoryColor!
        }
      }
    }
    
    
    
    if userDefaults != nil {
      let entryDate = Date()
      if let savedData = userDefaults!.value(forKey: "widgetKey") as? String {
        let decoder = JSONDecoder()
        let data = savedData.data(using: .utf8)
        
        if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {
          
          for interval in 0 ..< 60 {
            let nextRefresh = Calendar.current.date(byAdding: .minute , value: interval, to: date)!
            
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: parsedData.today, willToDo: parsedData.willToDo, priorityToDo: parsedData.priorityToDo, allToDo: parsedData.allToDo, title: titles ,color: color,todoData: todoData)
            entries.append(entry)
          }
          
          let timeline = Timeline(entries: entries, policy: .atEnd)
          
          WidgetCenter.shared.reloadAllTimelines()
          completion(timeline)
        } else {
          print("Could not parse data")
        }
        
      } else {
        let nextRefresh = Calendar.current.date(byAdding: .minute, value: 5, to: date)!
        let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4,title:"예시1",color:"예시 컬러",todoData: [])
        let timeline = Timeline(entries: [entry], policy: .atEnd)
        completion(timeline)
      }
    }
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


struct SimpleEntry: TimelineEntry, Identifiable {
  let id = UUID()
  let date: Date
  let configuration: ConfigurationIntent
  let today: Int
  let willToDo: Int
  let priorityToDo: Int
  let allToDo: Int
  let title: String
  let color: String
  let todoData: [Any]
}

struct WeekWidgetEntryView : View {
  var entry: Provider.Entry
  @Environment(\.widgetFamily) var family
  
  @ViewBuilder
  var body: some View {
    
    switch family {
    case .systemSmall:
      WidgetSmallF(entry: entry)
    case .systemMedium:
      WidgetMedium(entry: entry)
    case .systemLarge:
      Text("Large")
    default:
      Text("Some other WidgetFamily in the future.")
    }
    
  }
}

@main
struct WeekWidget: Widget {
  let kind: String = "WeekWidget"
  
  var body: some WidgetConfiguration {
    IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
      WeekWidgetEntryView(entry: entry)
    }
    .supportedFamilies([.systemSmall,.systemMedium])
    .configurationDisplayName("My Widget")
    .description("This is an example widget.")
  }
}
