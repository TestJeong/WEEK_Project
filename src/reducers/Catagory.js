import produce from 'immer';

export const init = {
  categoryList: [],

  testhoho: false,

  clickCategory: null,

  onClickDay: null,

  onClickTime: null,
};

export const MY_CATEGORY_DATA = 'MY_CATEGORY_DATA';

export const TEST_TT = 'TEST_TT';

export const CLICK_CATEGORY = 'CLICK_CATEGORY';
export const CLICK_CATEGORY_RESET = 'CLICK_CATEGORY_RESET';

export const CLICK_DAY = 'CLICK_DAY';
export const CLICK_TIME = 'CLICK_TIME';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case TEST_TT:
        draft.testhoho = true;
        break;

      case MY_CATEGORY_DATA:
        draft.categoryList = action.data;
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

      default:
        return state;
    }
  });
};

export default reducer;
