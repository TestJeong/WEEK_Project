export const Day = () => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day = year + '-' + month + '-' + date + '-' + hours + '-' + min + '-' + sec;

  return day;
};

export const Today = (days) => {
  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);

  const string_Local_Time = timezoneDate.toISOString().substring(0, 10);
  const int_Local_Time = Number(string_Local_Time.replace(/-/g, ''));

  const int_Time = days ? days : int_Local_Time;
  const change_string_Local_Time = String(int_Time);
  const years = change_string_Local_Time.substring(0, 4);
  const month = change_string_Local_Time.substring(4, 6);
  const day = change_string_Local_Time.substring(6, 8);

  const Today_Date = years + '-' + month + '-' + day;

  return Today_Date;
};

export const IOS_Notif = (onClickDay, timeString) => {
  const ClickTime = onClickDay;
  const Change_String = String(ClickTime);
  const years = Change_String.substring(0, 4);
  const month = Change_String.substring(5, 7); // 4, 6
  const day = Change_String.substring(8, 10); // 6, 8

  const allDay = years + '-' + month + '-' + day;
  console.log('IOS_Notif =>', allDay, onClickDay, timeString);
  const StringTime = timeString;
  const Alls = allDay + 'T' + StringTime;
  return Alls;
};

export const IOS_today = () => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day = year + '-' + month + '-' + date + 'T' + hours + ':' + min + ':' + sec;

  return day;
};

export const ANDROID_Notif = (onClickDay, timeString) => {
  const ClickTime = onClickDay;
  const Change_String = String(ClickTime);
  const years = Change_String.substring(0, 4); // 0,4
  const month = Change_String.substring(5, 7); // 5,7
  const day = Change_String.substring(8, 10); // 8,10

  const allDay = years + '/' + month + '/' + day;
  const StringTime = timeString;
  const Alls = allDay + ' ' + StringTime;

  console.log('ANDROID_Notif =>', allDay, onClickDay, timeString);

  return Alls;
};

export const Notif_Day = () => {
  var date = new Date().getDate(); //Current Date
  var month = new Date().getMonth() + 1; //Current Month
  var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  let day = year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec;

  return day;
};

export const LIST_DAY_CHANGE_KO = (day) => {
  const String_ListDay = String(day);
  const ListDay_Month = Number(String_ListDay.substring(4, 6)) >= 10 ? String_ListDay.substring(4, 6) : String_ListDay.substring(5, 6);
  const ListDay_Day = String_ListDay.substring(6, 8);
  const ListDay_Total = ListDay_Month + '월' + ' ' + ListDay_Day + '일 ';

  return ListDay_Total;
};

// 해당일의 주에서 월요일을 찾는다
export const MONDAY_OF_DAY = (date) => {
  const today = new Date().toISOString().split('T')[0];
  const paramDate = new Date(date || today); // new Date('2021-06-08'): 화요일
  const day = paramDate.getDay();
  const diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
  const mondayDate = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

  return mondayDate;
};
