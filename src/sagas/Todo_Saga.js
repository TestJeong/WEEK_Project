import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {
  TODO_LIST_DATA_ERROR,
  TODO_LIST_DATA_REQUEST,
  TODO_LIST_DATA_SUCCESS,
} from '../reducers/Catagory';
import {ToDoList_View_Delete} from './Todo_Delete';

function* search_Book_Data(action) {
  try {
    yield call(ToDoList_View_Delete, action.data);

    yield put({
      type: TODO_LIST_DATA_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: TODO_LIST_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* searchBook() {
  yield takeEvery(TODO_LIST_DATA_REQUEST, search_Book_Data);
}

export default function* apiSaga() {
  yield all([fork(searchBook)]);
}
