import produce from 'immer';

export const init = {
  categoryList: [],

  onClickDay: null,
};

export const MY_CATEGORY_DATA = 'MY_CATEGORY_DATA';

export const CLICK_DAY = 'CLICK_DAY';

const reducer = (state = init, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case MY_CATEGORY_DATA:
        draft.categoryList = action.data;
        break;

      case CLICK_DAY:
        draft.onClickDay = action.data;
        break;

      default:
        return state;
    }
  });
};

export default reducer;
