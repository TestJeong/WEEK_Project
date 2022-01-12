//
//  Host.swift
//  Host
//
//  Created by 정윤재 on 2022/01/09.
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
   var text: String
}

struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), configuration: ConfigurationIntent(),text: "Placeholder")
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), configuration: configuration,text: "Data goes here")
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
            
          for interval in 0 ..< 50 {
                      let nextRefresh = Calendar.current.date(byAdding: .second , value: interval, to: date)!
                      let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: parsedData.text)
                      entries.append(entry)
                    }
              
          let timeline = Timeline(entries: entries, policy: .atEnd)
              
              WidgetCenter.shared.reloadAllTimelines()
              completion(timeline)
            } else {
                print("Could not parse data")
            }
          
        } else {
            let nextRefresh = Calendar.current.date(byAdding: .second, value: 5, to: date)!
            let entry = SimpleEntry(date: nextRefresh, configuration: configuration, text: "No data set")
            let timeline = Timeline(entries: [entry], policy: .atEnd)
          
            WidgetCenter.shared.reloadAllTimelines()
            completion(timeline)
        }
      }
  }

}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let configuration: ConfigurationIntent
    let text: String

}

struct WeekWidgetEntryView : View {
    var entry: Provider.Entry

    var body: some View {
      LinearGradient(gradient: Gradient(colors: [.red, .orange]), startPoint: .top, endPoint: .bottom)
           .edgesIgnoringSafeArea(.vertical)
           .overlay(
             VStack {
               Text(entry.text)
                 .bold()
                 .foregroundColor(.white)
                 .onChange(of: entry.text){ change in
                   print("ASDFASDF")
                   WidgetCenter.shared.reloadAllTimelines()
                 }
             }.padding(20)
           )
    }
}

@main
struct WeekWidget: Widget {
    let kind: String = "WeekWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
          WeekWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("My Widget")
        .description("This is an example widget.")
    }
}

struct Host_Previews: PreviewProvider {
    static var previews: some View {
      WeekWidgetEntryView(entry: SimpleEntry(date: Date(), configuration: ConfigurationIntent(),text: "Widget preview"))
            .previewContext(WidgetPreviewContext(family: .systemSmall))
    }
}
