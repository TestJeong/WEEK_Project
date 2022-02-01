import {createSlice} from '@reduxjs/toolkit';
import {categoryData, todoDataType} from '../Category/CategoryType';

interface initType {
  onClickDay: string;
  onClickPriority: number;
  onClickTime: string;
  twenty_Four_HoursTIme: string;
}

const initialState: initType = {
  onClickDay: '', // 2022-01-01
  onClickPriority: 0, // 1,2,3,4
  onClickTime: '', // 오전 6:43
  twenty_Four_HoursTIme: '', // 17:15:30
};

export const ToDoState = createSlice({
  name: 'MyPageState',
  initialState,
  reducers: {
    GET_DAY: (state, action) => {
      state.onClickDay = action.payload;
    },

    //   // 마이페이지 - 개인정보 수정에서 폰 번호 변경후 인증이 완료된 데이터
    //   conformChangePhoneNumber: (state, action) => {
    //     state.userChangePhoneNumber = action.payload
    //   },
  },
});

export const {GET_DAY} = ToDoState.actions;
export const TODO_DATA = ToDoState.reducer;
