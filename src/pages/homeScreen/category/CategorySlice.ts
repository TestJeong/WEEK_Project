import {createSlice} from '@reduxjs/toolkit';
import {CategoryItemType, TodoDataType} from './categoryType';

interface initWidget {
  color: string;
  title: string;
}

interface initType {
  categoryList: CategoryItemType[];
  widgetCategory: any;
  selectedCategory: CategoryItemType;
  mainCategoryData: TodoDataType[];
  closeInputModal: any;
  categoryListData_loading: boolean;
  categoryListData_done: boolean;
  categoryListData_error: any;
}

const initialState: initType = {
  categoryList: [],
  widgetCategory: [],
  selectedCategory: {
    color: '',
    createTime: 0, // 2022-1-25-22-48-51
    title: '',
    todoData: [],
    id: 0,
  },
  mainCategoryData: [],
  closeInputModal: [],

  categoryListData_loading: true,
  categoryListData_done: false,
  categoryListData_error: null,
};

export const CategoryState = createSlice({
  name: 'CategoryState',
  initialState,
  reducers: {
    // 모든 카테고리와 투두에 관한 정보를 불러옴
    REQUEST_CATEGORY_DATA: (state, action) => {
      state.categoryList = action.payload;
      action.payload.map((item: initWidget) => {
        state.widgetCategory = {...state.widgetCategory, color: item.color, title: item.title};
      });
    },
    // 카테고리 리스트에서 선택한 카테고리에 대한 정보 저장
    SELETED_CATEGORY_DATA: (state, action) => {
      state.selectedCategory = action.payload;
    },
    // 메인 화면에서 테마 카테고리 클릭한 정보를 저장
    SELETED_THEMA_CATEGORY_DATA: (state, action) => {
      state.mainCategoryData = action.payload;
    },
    // 카테고리 정보를 리셋
    RESET_CATEGORYT_DATA: (state) => {
      state.selectedCategory = {
        color: '',
        createTime: 0, // 2022-1-25-22-48-51
        title: '',
        todoData: [],
        id: 0,
      };
    },
    CATEGORY_DELETE_REQUEST: (state, action) => {
      state.categoryListData_loading = true;
      state.categoryListData_done = false;
      state.categoryListData_error = null;
    },
    CATEGORY_DELETE_SUCCESS: (state) => {
      state.categoryListData_loading = false;
      state.categoryListData_done = true;
      state.categoryListData_error = null;
    },
    CATEGORY_DELETE_ERROR: (state, action) => {
      state.categoryListData_loading = false;
      state.categoryListData_done = false;
      state.categoryListData_error = action.payload;
    },
  },
});

export const {
  SELETED_THEMA_CATEGORY_DATA,
  RESET_CATEGORYT_DATA,
  REQUEST_CATEGORY_DATA,
  SELETED_CATEGORY_DATA,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_ERROR,
} = CategoryState.actions;
export const CATEGORY_DATA = CategoryState.reducer;
