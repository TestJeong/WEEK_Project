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
    SimpleEntry(date: Date(), configuration: ConfigurationIntent(),today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4, title:"예시1",color:"예시 컬러",todoData: [:])
  }
  
  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
    let entry = SimpleEntry(date: Date(), configuration: configuration,today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4, title:"예시1",color:"예시 컬러",todoData: [:])
    completion(entry)
  }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
    let userDefaults = UserDefaults.init(suiteName: "group.com.week.ReactNativeWidget")
    let date = Date().zeroSeconds!
    var entries: [SimpleEntry] = []
    
    var titles: String = "테스트중입니다zzz"
    var todoData:[String : Any] = [:]
    let providerId = configuration.Category?.identifier
    guard let widgetData = WeekWidgetModule().getWidgetData() else {
      return
    }
    
    if providerId != nil, widgetData != nil {
      for provider in widgetData {
        let _provider = provider as? Dictionary<String, Any>
        let display = _provider!["title"] as? String
        let identifier = _provider!["createTime"] as? Int
       
        
        if(identifier == Int(providerId!)) {
          if let dates = _provider!["todoData"] as? [[String:Any]],
             let weather = dates.first {
            todoData = weather
            
          }
          titles = display!
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
            
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: parsedData.today, willToDo: parsedData.willToDo, priorityToDo: parsedData.priorityToDo, allToDo: parsedData.allToDo, title: titles ,color:"진짜 컬러",todoData: todoData)
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
        let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4,title:"예시1",color:"예시 컬러",todoData: [:])
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


struct SimpleEntry: TimelineEntry {
  let date: Date
  let configuration: ConfigurationIntent
  let today: Int
  let willToDo: Int
  let priorityToDo: Int
  let allToDo: Int
  let title: String
  let color: String
  let todoData: [String: Any]
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
////
////struct Host_Previews: PreviewProvider {
////    static var previews: some View {
////      WeekWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(),text: "Widget preview"))
////            .previewContext(WidgetPreviewContext(family: .systemSmall))
////    }
////}

//
//  WeatherWidget.swift
//  WeatherWidget
//
//  Created by Rimnesh Fernandez on 06/11/20.
//
//
//import WidgetKit
//import SwiftUI
//import Intents
//
//let label: String = "Humidity"
//struct Provider: IntentTimelineProvider {
//  func placeholder(in context: Context) -> SimpleEntry {
//    SimpleEntry(
//      date: Date(),
//      provider: "",
//      label: label,
//      value: "",
//      configuration: ConfigurationIntent())
//  }
//
//  func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
//    let entry = SimpleEntry(
//      date: Date(),
//      provider: "",
//      label: label,
//      value: "",
//      configuration: configuration)
//    completion(entry)
//  }
//
//  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
//    var entries: [SimpleEntry] = []
//    var value: String = ""
//    var providerName: String = ""
//    let providerId = configuration.Category?.identifier
//    let widgetData = WeekWidgetModule().getWidgetData()
//    if providerId != nil, widgetData != nil {
//      let provider =  widgetData![providerId!] as? Dictionary<String, Any>
//      let values = provider!["values"]! as? Dictionary<String, Any>
//      let units = provider!["units"]! as? Dictionary<String, Any>
//      providerName = (provider!["providerName"]! as? String)!
//      value = "\((values!["humidity"] as? String)!) \((units!["humidity"] as? String)!)"
//    }
//
//    // Generate a timeline consisting of five entries an hour apart, starting from the current date.
//    let currentDate = Date()
//    for hourOffset in 0 ..< 5 {
//      let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
//      let entry = SimpleEntry(
//        date: entryDate,
//        provider: providerName,
//        label: label,
//        value: value,
//        configuration: configuration
//      )
//      entries.append(entry)
//    }
//
//    let timeline = Timeline(entries: entries, policy: .atEnd)
//    completion(timeline)
//  }
//}
//
//struct SimpleEntry: TimelineEntry {
//  var date: Date
//  var provider: String
//  var label: String
//  var value: String
//  let configuration: ConfigurationIntent
//}
//
//struct WeatherWidgetEntryView : View {
//  var entry: Provider.Entry
//
//  var body: some View {
//    VStack {
//      Text(entry.provider).font(.headline).multilineTextAlignment(.center)
//      Text(entry.label).font(.caption).multilineTextAlignment(.center)
//      Text(entry.value)
//    }
//  }
//}
//
//@main
//struct WeatherWidget: Widget {
//  let kind: String = "WeatherWidget"
//
//  var body: some WidgetConfiguration {
//    IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
//      WeatherWidgetEntryView(entry: entry)
//    }
//    .configurationDisplayName("My Widget")
//    .description("This is an example widget.")
//  }
//}
