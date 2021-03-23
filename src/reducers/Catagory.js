import produce from 'immer';

export const init = {
  categoryList: [],

  clickCategory: null,
  Click_Category_ToDo: null,

  onClickDay: null,
  onClickTime: null,
  onClickToDoList: null,
  onClickPriority: null,
  onClickClear: null,

  todo_List_data_loading: false,
  todo_List_data_done: false,
  todo_List_data_error: null,

  category_List_data_loading: false,
  category_List_data_done: false,
  category_List_data_error: null,

  Agenda_DATA: null,
  Agenda_DATA_loading: false,
  Agenda_DATA_done: false,
  Agenda_DATA_error: null,
};

export const MY_CATEGORY_DATA = 'MY_CATEGORY_DATA';

export const CLICK_CATEGORY = 'CLICK_CATEGORY';
export const CLICK_CATEGORY_RESET = 'CLICK_CATEGORY_RESET';

export const CLICK_CATEGORY_TODO = 'CLICK_CATEGORY_TODO';

export const CLICK_TODO_LIST_DATA = 'CLICK_TODO_LIST_DATA';

export const CLICK_DAY = 'CLICK_DAY';
export const CLICK_TIME = 'CLICK_TIME';
export const CLICK_PRIORITY = 'CLICK_PRIORITY';
export const CLICK_CLEAR = 'CLICK_CLEAR';

export const AGENDA_DATA_REQUEST = 'AGENDA_DATA_REQUEST';
export const AGENDA_DATA_SUCCESS = 'AGENDA_DATA_SUCCESS';
export const AGENDA_DATA_ERROR = 'AGENDA_DATA_ERROR';

export const TODO_LIST_DATA_REQUEST = 'TODO_LIST_DATA_REQUEST';
export const TODO_LIST_DATA_SUCCESS = 'TODO_LIST_DATA_SUCCESS';
export const TODO_LIST_DATA_ERROR = 'TODO_LIST_DATA_ERROR';

export const CATEGORY_LIST_DATA_REQUEST = 'CATEGORY_LIST_DATA_REQUEST';
export const CATEGORY_LIST_DATA_SUCCESS = 'CATEGORY_LIST_DATA_SUCCESS';
export const CATEGORY_LIST_DATA_ERROR = 'CATEGORY_LIST_DATA_ERROR';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MY_CATEGORY_DATA:
        draft.categoryList = action.data;
        draft.onClickTime = null;
        draft.onClickDay = null;
        draft.onClickPriority = null;
        break;

      case CLICK_TODO_LIST_DATA:
        draft.onClickToDoList = action.data;
        break;

      case CLICK_CATEGORY_TODO:
        draft.Click_Category_ToDo = action.data;
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

      case CLICK_PRIORITY:
        draft.onClickPriority = action.data;
        break;

      case CLICK_CLEAR:
        draft.onClickClear = action.data;
        break;

      ///////////////////////////////////////////

      case AGENDA_DATA_REQUEST:
        draft.Agenda_DATA = null;
        draft.Agenda_DATA_loading = true;
        draft.Agenda_DATA_done = false;
        draft.Agenda_DATA_error = null;

        break;
      case AGENDA_DATA_SUCCESS:
        draft.Agenda_DATA = action.data;
        draft.Agenda_DATA_loading = false;
        draft.Agenda_DATA_done = true;
        draft.Agenda_DATA_error = null;

        break;
      case AGENDA_DATA_ERROR:
        draft.Agenda_DATA_loading = false;
        draft.Agenda_DATA_done = false;
        draft.Agenda_DATA_error = action.data;
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

        draft.onClickToDoList = null;

        break;
      case TODO_LIST_DATA_ERROR:
        draft.todo_List_data_loading = false;
        draft.todo_List_data_done = false;
        draft.todo_List_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case CATEGORY_LIST_DATA_REQUEST:
        draft.category_List_data_loading = true;
        draft.tcategory_List_data_done = false;
        draft.category_List_data_error = null;

        break;
      case CATEGORY_LIST_DATA_SUCCESS:
        draft.category_List_data_loading = false;
        draft.category_List_data_done = true;
        draft.category_List_data_error = null;
        draft.categoryList = state.categoryList;
        draft.clickCategory = null;
        draft.onClickToDoList = null;
        break;
      case CATEGORY_LIST_DATA_ERROR:
        draft.category_List_data_loading = false;
        draft.category_List_data_done = false;
        draft.category_List_data_error = action.data;
        break;

      ////////////////////////////////////////////

      default:
        return state;
    }
  });
};

export default reducer;
