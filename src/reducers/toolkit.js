import {createSlice} from '@reduxjs/toolkit';

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

export const {increment, decrement, incrementByAmount} = counterSlice.actions;
export default counterSlice.reducer;
