import {ToDoType} from '@/db';

export interface InotifType {
  onClickDay?: number;
  timeString?: string;
  todoContents?: string;
  NotifID?: number;
  categoryTitle?: string;
  num?: number;
}

export interface IdateTimeType {
  hideDatePicker: () => void;
  isDatePickerVisible: boolean;
}

export interface ItodoInputModalType {
  isOpen: boolean;
  close: () => void;
  categoryName: string;
  categoryTime: string;
  day?: string;
}

export interface ItodoListType {
  data: TodoType;
  listName: boolean;
}

export interface TodoType extends ToDoType {
  separators: any;
}

export interface CustomTodoType extends ToDoType {
  colors?: string;
}
