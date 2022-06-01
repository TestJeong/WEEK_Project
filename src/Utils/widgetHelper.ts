import realm from '@/db';
import {NativeModules} from 'react-native';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

const WeekWidgetModule = NativeModules.WeekWidgetModule;

const CategoryList = realm.objects('CategoryList');
const TodoList = realm.objects('TodoDataList');

const group = 'group.com.week.ReactNativeWidget';

const TimezoneOffset = new Date().getTimezoneOffset() * 60000;
const TimezoneDate = new Date(Date.now() - TimezoneOffset);
const String_LocalTime = TimezoneDate.toISOString().substring(0, 10);
const Int_LocalTime = Number(String_LocalTime.replace(/-/g, ''));

export const Today_ListData = TodoList.filtered('listDay == $0 AND listClear == $1', Int_LocalTime, false);
export const Will_ListData = TodoList.filtered('listDay > $0 AND listClear == $1', Int_LocalTime, false);
export const Priority_ListData = TodoList.filtered('listPriority != $0 AND listClear == $1', 4, false);
export const All_ListData = TodoList.filtered('listClear == $0', false);

export const widgetRefresh = async () => {
  const widgetData = {
    today: Today_ListData.length,
    willToDo: Will_ListData.length,
    priorityToDo: Priority_ListData.length,
    allToDo: All_ListData.length,
  };

  const CategoryListJSON = JSON.stringify(CategoryList);
  try {
    await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    WeekWidgetModule.refreshAllWidgets();
    WeekWidgetModule.setWidgetData(JSON.parse(CategoryListJSON));
    WeekWidgetModule.testget();
  } catch (error) {}
};
