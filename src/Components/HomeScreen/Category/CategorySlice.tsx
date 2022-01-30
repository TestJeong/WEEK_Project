import {createSlice} from '@reduxjs/toolkit';
import {categoryData, clickCategory} from '../../CalendarScreen/CalendarType';

interface initType {
  categoryList: categoryData[];
  clickCategory: categoryData;
}

const initialState: initType = {
  categoryList: [],
  clickCategory: {
    color: '',
    createTime: '', // 2022-1-25-22-48-51
    title: '',
    todoData: [],
  },
};
export const CategoryState = createSlice({
  name: 'MyPageState',
  initialState,
  reducers: {
    CLICK_CATEGORY: (state, action) => {
      // initialState.categoryList;
    },

    //   // 마이페이지 - 개인정보 수정에서 폰 번호 변경후 인증이 완료된 데이터
    //   conformChangePhoneNumber: (state, action) => {
    //     state.userChangePhoneNumber = action.payload
    //   },
  },
});

export const {CLICK_CATEGORY} = CategoryState.actions;
export const CATEGORY_DATA = CategoryState.reducer;
