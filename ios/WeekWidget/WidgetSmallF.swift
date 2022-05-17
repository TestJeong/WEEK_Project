//
//  WidgetSmallF.swift
//  WeekWidgetExtension
//
//  Created by 정윤재 on 2022/03/20.
//

import SwiftUI
import WidgetKit



struct WidgetSmallF: View {
  @State var entry: SimpleEntry
  
  
  var body: some View {
    VStack{
      HStack{
        Text(entry.title)
          .bold()
        Spacer()
      }
      .padding(EdgeInsets(top: 0, leading: 15, bottom: 0, trailing: 15))
      .frame(height:40)
      .background(Color(hex:entry.color))
      VStack{
        ForEach(entry.todoData as! [String], id: \.self) { todoTitle in
          HStack{
            Group{
              Circle()
                .foregroundColor(Color("red1"))
                .frame(width: 10, height: 10)
              Text(todoTitle)
            }
            
            Spacer()
          }
        }
        Spacer()
      }
      .padding(EdgeInsets(top: 0, leading: 15, bottom: 10, trailing: 15))
    }
  }
  
}

extension Color {
  init(hex: String) {
    let scanner = Scanner(string: hex)
    _ = scanner.scanString("#")
    
    var rgb: UInt64 = 0
    scanner.scanHexInt64(&rgb)
    
    let r = Double((rgb >> 16) & 0xFF) / 255.0
    let g = Double((rgb >>  8) & 0xFF) / 255.0
    let b = Double((rgb >>  0) & 0xFF) / 255.0
    self.init(red: r, green: g, blue: b)
  }
}


//if entry.todoData.count > 0 {
//  Text(entry.todoData[0] as! String)
//  Text(String(entry.todoData.count))
//}
