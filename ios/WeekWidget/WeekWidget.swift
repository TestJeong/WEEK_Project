////
////  Host.swift
////  Host
////
////  Created by 정윤재 on 2022/01/09.
////
//
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
        SimpleEntry(date: Date(), configuration: ConfigurationIntent(),today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4)
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), configuration: configuration,today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4)
        completion(entry)
    }

  func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
      let userDefaults = UserDefaults.init(suiteName: "group.com.week.ReactNativeWidget")
      let date = Date().zeroSeconds!
      var entries: [SimpleEntry] = []

      if userDefaults != nil {
        let entryDate = Date()
        if let savedData = userDefaults!.value(forKey: "widgetKey") as? String {
            let decoder = JSONDecoder()
            let data = savedData.data(using: .utf8)

          if let parsedData = try? decoder.decode(WidgetData.self, from: data!) {

          for interval in 0 ..< 60 {
            let nextRefresh = Calendar.current.date(byAdding: .minute , value: interval, to: date)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: parsedData.today, willToDo: parsedData.willToDo, priorityToDo: parsedData.priorityToDo, allToDo: parsedData.allToDo)
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
             let entry = SimpleEntry(date: nextRefresh, configuration: configuration, today: 1, willToDo: 2, priorityToDo: 3, allToDo: 4)
             let timeline = Timeline(entries: [entry], policy: .atEnd)
              completion(timeline)
        }
      }
  }

}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let today: Int
    let willToDo: Int
    let priorityToDo: Int
    let allToDo: Int
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
//
//struct Host_Previews: PreviewProvider {
//    static var previews: some View {
//      WeekWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(),text: "Widget preview"))
//            .previewContext(WidgetPreviewContext(family: .systemSmall))
//    }
//}
