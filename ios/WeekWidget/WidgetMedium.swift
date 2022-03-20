//
//  WidgetMedium.swift
//  WeekWidgetExtension
//
//  Created by 정윤재 on 2022/03/20.
//

import WidgetKit
import SwiftUI



struct WidgetMedium: View {
  var entry: SimpleEntry
  var body: some View {
    GeometryReader { geometry in
      HStack{
        Spacer()
        VStack {
          Spacer()
          VStack {
            Text("오늘 ⏰")
              .font(.system(size: 14, weight: .semibold))
            Spacer()
            Text(String(entry.today))
              .bold()
          }
          .padding(EdgeInsets(top: 20, leading: 0, bottom: 20, trailing: 0))
          .frame(width: (geometry.size.width / 2) - 20, height: (geometry.size.height / 2) - 20)
          .background(Color("red1"))
          .cornerRadius(10)
          VStack {
            Text("중요 💡")
              .font(.system(size: 14, weight: .semibold))
            Spacer()
            Text(String(entry.priorityToDo))
              .bold()
          }
          .padding(EdgeInsets(top: 20, leading: 0, bottom: 20, trailing: 0))
          .frame(width: (geometry.size.width / 2) - 20, height: (geometry.size.height / 2) - 20)
          .background(Color("puple1"))
          .cornerRadius(10)
          Spacer()
        }
        VStack{
          Spacer()
          VStack {
            Text("예정 🛎")
              .font(.system(size: 14, weight: .semibold))
            Spacer()
            Text(String(entry.willToDo))
              .bold()
          }
          .padding(EdgeInsets(top: 20, leading: 0, bottom: 20, trailing: 0))

          .frame(width: (geometry.size.width / 2) - 20, height: (geometry.size.height / 2) - 20)
          .background(Color("green1"))
          .cornerRadius(10)
          VStack {
            Text("전체 📅")
              .font(.system(size: 14, weight: .semibold))
            Spacer()
            Text(String(entry.allToDo))
              .bold()
          }
          .padding(EdgeInsets(top: 20, leading: 0, bottom: 20, trailing: 0))
          .frame(width: (geometry.size.width / 2) - 20, height: (geometry.size.height / 2) - 20)
          .background(Color("blue1"))
          .cornerRadius(10)
          Spacer()
        }
        Spacer()
      }
    }
  }
}



//struct WidgetMedium_Previews: PreviewProvider {
//    static var previews: some View {
//        WidgetMedium()
//    }
//}
