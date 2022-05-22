import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CategoryItemType, TodoDataType} from '../category/categoryType';

export interface initType {
  onClickDay: string;
  onClickPriority: number;
  twelve_HoursTime: string;
  twenty_Four_HoursTime: string;
  todoData: TodoDataType;
  inputCategoryData: CategoryItemType;
  isNotificationEnabled: boolean;

  todoItemDeleteLoading: boolean;
  todoItemDeleteDone: boolean;
  todoItemDeleteError: any;

  todoItemSaveLoading: boolean;
  todoItemSaveDone: boolean;
  todoItemSaveError: Error;
}

const initialState: initType = {
  onClickDay: '', // 2022-01-01
  onClickPriority: 0, // 1,2,3,4
  twelve_HoursTime: '', // 오전 6:43
  twenty_Four_HoursTime: '', // 17:15:30
  todoData: {
    categoryTitle: '',
    createTime: '', // "2022-1-25-22-49-2"
    id: 0,
    listClear: false,
    listContent: '',
    listDay: 0, //20220125
    listEnabled: false,
    listMemo: '',
    listPriority: 0,
    listTime: '',
    listTime_Data: '',
  },
  inputCategoryData: null,
  isNotificationEnabled: false,

  todoItemDeleteLoading: true,
  todoItemDeleteDone: false,
  todoItemDeleteError: null,

  todoItemSaveLoading: true,
  todoItemSaveDone: false,
  todoItemSaveError: null,
};

export const ToDoState = createSlice({
  name: 'ToDoState',
  initialState,
  reducers: {
    // todo 디테일 페이지에서 저장버튼
    REQEUST_TODO_ITEM_SAVE: (state, _action) => {
      state.todoItemSaveLoading = true;
      state.todoItemSaveDone = false;
      state.todoItemSaveError = null;
    },
    SUCCESS_TODO_ITEM_SAVE: (state) => {
      state.todoItemSaveLoading = false;
      state.todoItemSaveDone = true;
      state.todoItemSaveError = null;
    },
    ERROR_TODO_ITEM_SAVE: (state, action) => {
      state.todoItemSaveLoading = false;
      state.todoItemSaveDone = false;
      state.todoItemSaveError = action.payload;
    },
    // todo item 삭제
    REQEUST_TODO_ITEM_DELETE: (state, _action) => {
      state.todoItemDeleteLoading = true;
      state.todoItemDeleteDone = false;
      state.todoItemDeleteError = null;
    },
    SUCCESS_TODO_ITEM_DELETE: (state) => {
      state.todoItemDeleteLoading = false;
      state.todoItemDeleteDone = true;
      state.todoItemDeleteError = null;
    },
    ERROR_TODO_ITEM_DELETE: (state, action) => {
      state.todoItemDeleteLoading = false;
      state.todoItemDeleteDone = false;
      state.todoItemDeleteError = action.payload;
    },
    RESET_INPUT_DATA: (state) => {
      state.onClickDay = '';
      state.onClickPriority = 0;
      state.twelve_HoursTime = '';
      state.twenty_Four_HoursTime = '';
      state.inputCategoryData = null;
    },
    // 인풋 및 투두 디테일에서 선택한 카테고리에 대한 정보를 저장
    GET_CATEGORY_DATA: (state, action) => {
      state.inputCategoryData = action.payload;
    },
    // 시간을 선택할 경우 12시간제(표시용) 와 24시간제(로컬알림용)를 저장합니다
    SELECTED_TIME: (state, {payload}: PayloadAction<{twelve_HoursTime: string; twenty_Four_HoursTime: string}>) => {
      const {twelve_HoursTime, twenty_Four_HoursTime} = payload;
      state.twelve_HoursTime = twelve_HoursTime;
      state.twenty_Four_HoursTime = twenty_Four_HoursTime;
    },
    // 우선순위 데이터를 저장합니다.
    SELETCTED_PRIORITY: (state, action) => {
      state.onClickPriority = action.payload;
    },
    // 해당 투두에 관한 상세 정보를 저장합니다( 알림이있는지 날짜, 시간, 우선순위 등)
    SELECTED_TODOLIST_DATA: (state, action) => {
      state.todoData = action.payload;
    },
    // 날짜를 누르면 저장합니다
    GET_DAY: (state, action) => {
      state.onClickDay = action.payload;
    },
    // 알림 선택 여부를 저장합니다
    GET_NOTIFICATION_ENABLED: (state, action) => {
      state.isNotificationEnabled = action.payload;
    },
  },
});

export const {
  REQEUST_TODO_ITEM_SAVE,
  SUCCESS_TODO_ITEM_SAVE,
  ERROR_TODO_ITEM_SAVE,
  REQEUST_TODO_ITEM_DELETE,
  SUCCESS_TODO_ITEM_DELETE,
  ERROR_TODO_ITEM_DELETE,
  RESET_INPUT_DATA,
  GET_DAY,
  SELECTED_TIME,
  SELECTED_TODOLIST_DATA,
  SELETCTED_PRIORITY,
  GET_CATEGORY_DATA,
  GET_NOTIFICATION_ENABLED,
} = ToDoState.actions;
export const TODO_DATA = ToDoState.reducer;
