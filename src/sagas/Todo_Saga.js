import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {
  AGENDA_DATA_ERROR,
  AGENDA_DATA_REQUEST,
  AGENDA_DATA_SUCCESS,
  TODO_LIST_DATA_ERROR,
  TODO_LIST_DATA_REQUEST,
  TODO_LIST_DATA_SUCCESS,
} from '../reducers/Catagory';
import {ToDoList_View_Delete, Agenda_Call_Data} from './Todo_Delete';

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

function* Agenda_DATA_ToDo() {
  try {
    const result = yield call(Agenda_Call_Data);
    console.log('res', result);

    yield put({
      type: AGENDA_DATA_SUCCESS,
      data: result,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: AGENDA_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* searchBook() {
  yield takeEvery(TODO_LIST_DATA_REQUEST, search_Book_Data);
}

function* Agenda_DATA_INF() {
  yield takeEvery(AGENDA_DATA_REQUEST, Agenda_DATA_ToDo);
}

export default function* apiSaga() {
  yield all([fork(searchBook), fork(Agenda_DATA_INF)]);
}
