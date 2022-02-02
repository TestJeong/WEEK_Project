import {createSlice} from '@reduxjs/toolkit';
import {categoryData, todoDataType} from '../Category/CategoryType';

interface initType {
  categoryList: categoryData[];
  selectedCategory: categoryData;
  mainCategoryData: todoDataType[];
  closeInputModal: any;
}

const initialState: initType = {
  categoryList: [],
  selectedCategory: {
    color: '',
    createTime: '', // 2022-1-25-22-48-51
    title: '',
    todoData: [],
  },
  mainCategoryData: [],
  closeInputModal: [],
};

export const CategoryState = createSlice({
  name: 'CategoryState',
  initialState,
  reducers: {
    REQUEST_CATEGORY_DATA: (state, action) => {
      state.categoryList = action.payload;
    },
  },
});

export const {REQUEST_CATEGORY_DATA} = CategoryState.actions;
export const CATEGORY_DATA = CategoryState.reducer;
