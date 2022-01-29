import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  categoryList: [],
};

export const mypageState = createSlice({
  name: 'MyPageState',
  initialState,
  reducers: {
    userChangeDataReset: () => {
      initialState.categoryList;
    },

    //   // 마이페이지 - 개인정보 수정에서 폰 번호 변경후 인증이 완료된 데이터
    //   conformChangePhoneNumber: (state, action) => {
    //     state.userChangePhoneNumber = action.payload
    //   },
  },
});

export const {userChangeDataReset} = mypageState.actions;
export const MYPAGE_DATA = mypageState.reducer;
