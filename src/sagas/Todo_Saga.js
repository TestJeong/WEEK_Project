import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {
  AGENDA_DATA_ERROR,
  AGENDA_DATA_REQUEST,
  AGENDA_DATA_SUCCESS,
  CATEGORY_LIST_DATA_ERROR,
  CATEGORY_LIST_DATA_REQUEST,
  CATEGORY_LIST_DATA_SUCCESS,
  TODO_LIST_DATA_ERROR,
  TODO_LIST_DATA_REQUEST,
  TODO_LIST_DATA_SUCCESS,
} from '../reducers/Catagory';
import {
  ToDoList_View_Delete,
  Agenda_Call_Data,
  Category_List_View_Delete,
} from './Todo_Delete';

function* ToDoList_Delete(action) {
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

function* Category_Delete(action) {
  try {
    yield call(Category_List_View_Delete, action.data);

    yield put({
      type: CATEGORY_LIST_DATA_SUCCESS,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CATEGORY_LIST_DATA_ERROR,
      data: e,
      error: true,
    });
  }
}

function* Agenda_DATA_ToDo(action) {
  try {
    const result = yield call(Agenda_Call_Data, action.data);

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

function* ToDo_Delete() {
  yield takeEvery(TODO_LIST_DATA_REQUEST, ToDoList_Delete);
}

function* Category_List_Delete() {
  yield takeEvery(CATEGORY_LIST_DATA_REQUEST, Category_Delete);
}

function* Agenda_DATA_INF() {
  yield takeEvery(AGENDA_DATA_REQUEST, Agenda_DATA_ToDo);
}

export default function* apiSaga() {
  yield all([
    fork(ToDo_Delete),
    fork(Category_List_Delete),
    fork(Agenda_DATA_INF),
  ]);
}
