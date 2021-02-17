import produce from 'immer';

export const init = {
  categoryList: [],
};

export const MY_CATEGORY_DATA = 'MY_CATEGORY_DATA';

export const SERACH_BOOK_DATA_REQUEST = 'SERACH_BOOK_DATA_REQUEST';
export const SERACH_BOOK_DATA_SUCCESS = 'SERACH_BOOK_DATA_SUCCESS';
export const SERACH_BOOK_DATA_ERROR = 'SERACH_BOOK_DATA_ERROR';
export const SERACH_BOOK_DATA_RESET = 'SERACH_BOOK_DATA_RESET';

export const BOOK_MARK_DATA_REQUEST = 'BOOK_MARK_DATA_REQUEST';
export const BOOK_MARK_DATA_SUCCESS = 'BOOK_MARK_DATA_SUCCESS';
export const BOOK_MARK_DATA_ERROR = 'BOOK_MARK_DATA_ERROR';

export const REMOVE_BOOK_DATA_REQUEST = 'REMOVE_BOOK_DATA_REQUEST';
export const REMOVE_BOOK_DATA_SUCCESS = 'REMOVE_BOOK_DATA_SUCCESS';
export const REMOVE_BOOK_DATA_ERROR = 'REMOVE_BOOK_DATA_ERROR';

export const REMOVE_BASKET_REQUEST = 'REMOVE_BASKET_REQUEST';
export const REMOVE_BASKET_SUCCESS = 'REMOVE_BASKET_SUCCESS';
export const REMOVE_BASKET_ERROR = 'REMOVE_BASKET_ERROR';

export const MOVE_TO_BASKET_REQUEST = 'MOVE_TO_BASKET_REQUEST';
export const MOVE_TO_BASKET_SUCCESS = 'MOVE_TO_BASKET_SUCCESS';
export const MOVE_TO_BASKET_ERROR = 'MOVE_TO_BASKET_ERROR';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MY_CATEGORY_DATA:
        draft.categoryList = action.data;
        break;

      ////////////////////////////////////////////

      case SERACH_BOOK_DATA_REQUEST:
        draft.serach_book_data_loading = true;
        draft.serach_book_data_done = false;
        draft.serach_book_data_error = null;
        draft.serach_book_data = state.serach_book_data;
        break;
      case SERACH_BOOK_DATA_SUCCESS:
        draft.serach_book_data_loading = false;
        draft.serach_book_data_done = true;
        draft.serach_book_data_error = null;
        draft.serach_book_data = action.data;
        break;
      case SERACH_BOOK_DATA_ERROR:
        draft.serach_book_data_loading = false;
        draft.serach_book_data_done = false;
        draft.serach_book_data = [];
        draft.serach_book_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case BOOK_MARK_DATA_REQUEST:
        draft.book_mark_data_loading = true;
        draft.book_mark_data_done = false;
        draft.book_mark_data_error = null;
        draft.book_mark_data = [];
        break;
      case BOOK_MARK_DATA_SUCCESS:
        draft.book_mark_data_loading = false;
        draft.book_mark_data_done = true;
        draft.book_mark_data_error = null;
        draft.test_data = state.test_data;
        break;
      case BOOK_MARK_DATA_ERROR:
        draft.book_mark_data_loading = false;
        draft.book_mark_data_done = false;
        draft.book_mark_data = [];
        draft.book_mark_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case REMOVE_BOOK_DATA_REQUEST:
        draft.book_data_loading = true;
        draft.book_data_done = false;
        draft.book_data_error = null;

        break;
      case REMOVE_BOOK_DATA_SUCCESS:
        draft.book_data_loading = false;
        draft.book_data_done = true;
        draft.book_data_error = null;
        draft.test_data = [];
        break;
      case REMOVE_BOOK_DATA_ERROR:
        draft.book_data_loading = false;
        draft.book_data_done = false;
        draft.book_data = [];
        draft.book_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case REMOVE_BASKET_REQUEST:
        draft.basket_data_loading = true;
        draft.basket_data_done = false;
        draft.basket_data_error = null;

        break;
      case REMOVE_BASKET_SUCCESS:
        draft.basket_data_loading = false;
        draft.basket_data_done = true;
        draft.basket_data_error = null;
        draft.test_data = [];
        break;
      case REMOVE_BASKET_ERROR:
        draft.basket_data_loading = false;
        draft.basket_data_done = false;
        draft.basket_data = [];
        draft.basket_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case MOVE_TO_BASKET_REQUEST:
        draft.move_basket_data_loading = true;
        draft.move_basket_data_done = false;
        draft.move_basket_data_error = null;

        break;
      case MOVE_TO_BASKET_SUCCESS:
        draft.move_basket_data_loading = false;
        draft.move_basket_data_done = true;
        draft.move_basket_data_error = null;

        break;
      case MOVE_TO_BASKET_ERROR:
        draft.move_basket_data_loading = false;
        draft.move_basket_data_done = false;
        draft.move_basket_data = [];
        draft.move_basket_data_error = action.data;
        break;

      ////////////////////////////////////////////

      case SERACH_BOOK_DATA_RESET:
        draft.serach_book_data = [];

        break;

      default:
        return state;
    }
  });
};

export default reducer;
