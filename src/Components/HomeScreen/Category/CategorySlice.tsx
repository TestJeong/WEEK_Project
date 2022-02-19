import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Category_List_View_Delete} from '../../../sagas/Todo_Delete';
import {categoryData, todoDataType} from '../Category/CategoryType';

interface initType {
  categoryList: categoryData[];
  selectedCategory: categoryData;
  mainCategoryData: todoDataType[];
  closeInputModal: any;
  categoryListData_loading: boolean;
  categoryListData_done: boolean;
  categoryListData_error: any;
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

  categoryListData_loading: true,
  categoryListData_done: false,
  categoryListData_error: null,
};

export const categoryDelete = createAsyncThunk(
  'CategoryState/deleteCategory', // 액션 이름을 정의해 주도록 합니다.
  async (todoId: any) => {
    console.log('썽크 데이터 -> ', todoId.data);
    const response = await Category_List_View_Delete(todoId.data);
    console.log('???asdf', response);
    return response;
  },
);

export const CategoryState = createSlice({
  name: 'CategoryState',
  initialState,
  reducers: {
    // 모든 카테고리와 투두에 관한 정보를 불러옴
    REQUEST_CATEGORY_DATA: (state, action) => {
      state.categoryList = action.payload;
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
        createTime: '', // 2022-1-25-22-48-51
        title: '',
        todoData: [],
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
  extraReducers: {
    [categoryDelete.pending.type]: (state, action) => {},
    [categoryDelete.fulfilled.type]: (state, action) => {},
    [categoryDelete.rejected.type]: (state, action) => {
      console.log('에러 남');
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
