import {createSlice, PayloadAction} from '@reduxjs/toolkit';

/* const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    loginAction(state, action) {
      state.isLoggedIn = '안녕하세요';
    },
  },
});

// 리듀서 & 액션 리턴
const {reducer, actions} = userSlice;
export const {loginAction} = actions;
export default reducer;
 */
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

const myList = createSlice({
  name: 'CategoryList',
  initialState: {
    mainList: [],
  },
  reducers: {
    testcode: (state) => {
      state.nums += 5;
    },
  },
});

export const inputToDoData = createSlice({
  name: 'InputData',
  initialState: {
    onClickTime: null,
    timeString: null,

    onCalendar_Day_Number: 0,
    onClickPriority: null,
    onClickNotif_Enabled: false,
  },
  reducers: {
    getClickDay_Calendar: (state, action: PayloadAction<number>) => {
      state.onCalendar_Day_Number = action.payload;
    },
  },
});

export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export const {getClickDay_Calendar} = inputToDoData.actions;
export const myInputData = inputToDoData.reducer;

/* export const {testcode} = test.actions; */

export const h1 = counterSlice.reducer;
