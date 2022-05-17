import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ToDoList_View_Delete} from '../../../sagas/Todo_Delete';
import {CategoryItemType, TodoDataType} from '../category/categoryType';

interface initType {
  onClickDay: string;
  onClickPriority: number;
  twelve_HoursTime: string;
  twenty_Four_HoursTime: string;
  todoData: TodoDataType;
  inputCategoryData: CategoryItemType;
  isNotificationEnabled: boolean;
  todo_List_data_loading: boolean;
  todo_List_data_done: boolean;
  todo_List_data_error: any;
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

  todo_List_data_loading: true,
  todo_List_data_done: false,
  todo_List_data_error: null,
};

export const fetchTodo = createAsyncThunk(
  'ToDoState/fetchTodo', // 액션 이름을 정의해 주도록 합니다.
  async (todoId: any) => {
    try {
      //console.log('?aaaaa', todoId.data);
      await ToDoList_View_Delete(todoId.data);
      console.log('11');
    } catch (error) {
      console.log('에러입니다 ㅁㄴㅇㄹㅁㄴㅇ', error);
    }
  },
);

export const ToDoState = createSlice({
  name: 'ToDoState',
  initialState,
  reducers: {
    TODO_LIST_DATA_REQUEST1: (state, action) => {
      state.todo_List_data_loading = true;
      state.todo_List_data_done = false;
      state.todo_List_data_error = null;
    },
    TODO_LIST_DATA_SUCCESS1: (state, action) => {
      state.todo_List_data_loading = false;
      state.todo_List_data_done = true;
      state.todo_List_data_error = null;
    },
    TODO_LIST_DATA_ERROR1: (state, action) => {
      state.todo_List_data_loading = false;
      state.todo_List_data_done = false;
      state.todo_List_data_error = action.payload;
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
    // 알림 선택 여부를 저장합니다
    GET_NOTIFICATION_ENABLED: (state, action) => {
      state.isNotificationEnabled = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.todo_List_data_loading = true;
      state.todo_List_data_done = false;
      state.todo_List_data_error = null;
    }),
      builder.addCase(fetchTodo.fulfilled, (state, action) => {
        state.todo_List_data_loading = false;
        state.todo_List_data_done = true;
        state.todo_List_data_error = null;
        //state.todoData = null;
      }),
      builder.addCase(fetchTodo.rejected, (state, action) => {
        state.todo_List_data_loading = false;
        state.todo_List_data_done = false;
        state.todo_List_data_error = action.payload;
      });
  },
});

export const {
  TODO_LIST_DATA_REQUEST1,
  TODO_LIST_DATA_SUCCESS1,
  TODO_LIST_DATA_ERROR1,
  RESET_INPUT_DATA,
  GET_DAY,
  SELECTED_TIME,
  SELECTED_TODOLIST_DATA,
  SELETCTED_PRIORITY,
  GET_CATEGORY_DATA,
  GET_NOTIFICATION_ENABLED,
} = ToDoState.actions;
export const TODO_DATA = ToDoState.reducer;
