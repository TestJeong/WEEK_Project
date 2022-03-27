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
    Text("aaAAAA\(entry.title)")
    if entry.todoData["createTime"] != nil {
      Text(entry.todoData["listContent"] as! String)
             }
    
    
  }
  
}
