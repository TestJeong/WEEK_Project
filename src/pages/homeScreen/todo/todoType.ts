export interface InotifType {
  onClickDay?: number;
  timeString?: string;
  todoContents?: string;
  NotifID?: number;
  categoryTitle?: string;
  num?: string;
}

export interface IdateTimeType {
  hideDatePicker: () => boolean;
  isDatePickerVisible: boolean;
}
