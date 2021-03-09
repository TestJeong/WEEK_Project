import produce from 'immer';

export const init = {
  categoryList: [],

  testhoho: false,

  clickCategory: null,

  onClickDay: null,

  onClickTime: null,

  todo_List_data_loading: false,
  todo_List_data_done: false,
  todo_List_data_error: null,
};

export const MY_CATEGORY_DATA = 'MY_CATEGORY_DATA';

export const TEST_TT = 'TEST_TT';

export const CLICK_CATEGORY = 'CLICK_CATEGORY';
export const CLICK_CATEGORY_RESET = 'CLICK_CATEGORY_RESET';

export const CLICK_DAY = 'CLICK_DAY';
export const CLICK_TIME = 'CLICK_TIME';

export const TODO_LIST_DATA_REQUEST = 'TODO_LIST_DATA_REQUEST';
export const TODO_LIST_DATA_SUCCESS = 'TODO_LIST_DATA_SUCCESS';
export const TODO_LIST_DATA_ERROR = 'TODO_LIST_DATA_ERROR';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TEST_TT:
        draft.testhoho = true;
        break;

      case MY_CATEGORY_DATA:
        draft.categoryList = action.data;
        draft.onClickTime = null;
        draft.onClickDay = null;
        break;

      case CLICK_CATEGORY:
        draft.clickCategory = action.data;
        break;

      case CLICK_CATEGORY_RESET:
        draft.clickCategory = [];
        break;

      case CLICK_DAY:
        draft.onClickDay = action.data;
        break;

      case CLICK_TIME:
        draft.onClickTime = action.data;
        break;

      ///////////////////////////////////////////

      case TODO_LIST_DATA_REQUEST:
        draft.todo_List_data_loading = true;
        draft.todo_List_data_done = false;
        draft.todo_List_data_error = null;

        break;
      case TODO_LIST_DATA_SUCCESS:
        draft.todo_List_data_loading = false;
        draft.todo_List_data_done = true;
        draft.todo_List_data_error = null;
        draft.clickCategory = state.clickCategory;
        break;
      case TODO_LIST_DATA_ERROR:
        draft.todo_List_data_loading = false;
        draft.todo_List_data_done = false;
        draft.todo_List_data_error = action.data;
        break;

      ////////////////////////////////////////////

      default:
        return state;
    }
  });
};

export default reducer;
