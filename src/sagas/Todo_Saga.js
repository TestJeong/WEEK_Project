import {takeEvery, put, call, all, fork} from 'redux-saga/effects';

function* search_Book_Data(action) {
  try {
    const response = yield call(KaKao_Book_API, action.data);

    yield put({
      type: SERACH_BOOK_DATA_SUCCESS,
      data: response,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: SERACH_BOOK_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

export default function* apiSaga() {
  yield all([]);
}
