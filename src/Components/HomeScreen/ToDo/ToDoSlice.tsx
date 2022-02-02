import {createSlice} from '@reduxjs/toolkit';
import {categoryData, todoDataType} from '../Category/CategoryType';

interface initType {
  onClickDay: string;
  onClickPriority: number;
  twelve_HoursTime: string;
  twenty_Four_HoursTime: string;
  todoData: todoDataType;
  inputCategoryData: categoryData;
  isNotificationEnabled: boolean;
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
  inputCategoryData: {
    color: '',
    createTime: '',
    title: '',
    todoData: [],
  },
  isNotificationEnabled: false,
};

export const ToDoState = createSlice({
  name: 'ToDoState',
  initialState,
  reducers: {
    // 시간을 선택할 경우 12시간제(표시용) 와 24시간제(로컬알림용)를 저장합니다
    SELECTED_TIME: (state, action) => {
      const {twelve_HoursTime, twenty_Four_HoursTime} = action.payload;
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
  },
});

export const {GET_DAY, SELECTED_TIME, SELECTED_TODOLIST_DATA, SELETCTED_PRIORITY} = ToDoState.actions;
export const TODO_DATA = ToDoState.reducer;