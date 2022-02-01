import {createSlice} from '@reduxjs/toolkit';
import {categoryData, todoDataType} from '../Category/CategoryType';

interface initType {
  categoryList: categoryData[];
  clickCategory: categoryData;
  mainCategoryData: todoDataType[];
  closeInputModal: any;
  onClickDay: string;
}

const initialState: initType = {
  categoryList: [],
  clickCategory: {
    color: '',
    createTime: '', // 2022-1-25-22-48-51
    title: '',
    todoData: [],
  },
  mainCategoryData: [],
  closeInputModal: [],
  onClickDay: '', // 2022-01-01
};

export const CategoryState = createSlice({
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

export const {GET_DAY} = CategoryState.actions;
export const CATEGORY_DATA = CategoryState.reducer;
