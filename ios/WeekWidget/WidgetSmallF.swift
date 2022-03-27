//
//  WidgetSmallF.swift
//  WeekWidgetExtension
//
//  Created by 정윤재 on 2022/03/20.
//

import SwiftUI
import WidgetKit



struct WidgetSmallF: View {
  var entry: SimpleEntry

  
  var body: some View {
    Text(entry.title)
    if entry.todoData.count > 0 {
      Text(entry.todoData[0] as! String)
      Text(String(entry.todoData.count))
             }
    
    
  }
  
}
