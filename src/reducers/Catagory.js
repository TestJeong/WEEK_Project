import produce from 'immer';

export const init = {
  user_book_data_done: false,
  user_book_data: [],

  user_bokk_basket_done: false,
  user_book_basket: [],

  user_book_load_data: [],

  selected_Book_Data: [],

  test_data: [],
  test_remove: false,

  new_test: [],

  bookMarkColor: null,

  book_mark_data_loading: false,
  book_mark_data_done: false,
  book_mark_data_error: null,

  book_data_loading: false,
  book_data_done: false,
  book_data_error: null,

  basket_data_loading: false,
  basket_data_done: false,
  basket_data_error: null,

  move_basket_data_loading: false,
  move_basket_data_done: false,
  move_basket_data_error: null,

  serach_book_data_loading: false,
  serach_book_data_done: false,
  serach_book_data_error: null,
  serach_book_data: [],
};

export const MY_BOOKLIST_DATA = 'MY_BOOKLIST_DATA';

export const MY_BOOKBASKET_DATA = 'MY_BOOKBASKET_DATA';

export const TEST_DATA_TEST = 'TEST_DATA_TEST';
export const BOOK_MARK_DATA = 'BOOK_MARK_DATA';
export const TEST_DATA_TEST_RESET = 'TEST_DATA_TEST_RESET';

export const MY_BOOKLIST_DATA_ADD = 'MY_BOOKLIST_DATA_ADD';

export const SELECT_BOOK_DATA = 'SELECT_BOOK_DATA';

export const BOOK_MARK_COLOR = 'BOOK_MARK_COLOR';

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
      case BOOK_MARK_COLOR:
        draft.bookMarkColor = action.data;
        break;

      case TEST_DATA_TEST:
        draft.test_data = action.data;
        break;

      case TEST_DATA_TEST_RESET:
        draft.test_data = [];
        break;

      case SELECT_BOOK_DATA:
        draft.selected_Book_Data = action.data;
        break;

      case MY_BOOKLIST_DATA:
        draft.user_book_data_done = true;
        draft.user_book_data = action.data;

        break;

      case MY_BOOKBASKET_DATA:
        draft.user_book_basket_done = true;
        draft.user_book_basket = action.data;

        break;

      case MY_BOOKLIST_DATA_ADD:
        draft.user_book_load_data = action.data;

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
