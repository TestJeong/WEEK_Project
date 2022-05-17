import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {AGENDA_DATA_ERROR, AGENDA_DATA_REQUEST, AGENDA_DATA_SUCCESS} from '../pages/calendarScreen/CalendarSlice';
import {CATEGORY_DELETE_ERROR, CATEGORY_DELETE_REQUEST, CATEGORY_DELETE_SUCCESS} from '../pages/homeScreen/category/CategorySlice';
import {TODO_LIST_DATA_ERROR1, TODO_LIST_DATA_REQUEST1, TODO_LIST_DATA_SUCCESS1} from '../pages/homeScreen/todo/todoSlice';
import {CATEGORY_LIST_DATA_ERROR, CATEGORY_LIST_DATA_REQUEST, CATEGORY_LIST_DATA_SUCCESS} from '../reducers/Catagory';
import {ToDoList_View_Delete, Agenda_Call_Data, Category_List_View_Delete} from './Todo_Delete';

function* ToDoList_Delete(action) {
  try {
    yield call(ToDoList_View_Delete, action.payload.data);
    yield put(TODO_LIST_DATA_SUCCESS1());
  } catch (e) {
    console.error(e);
    yield put({type: TODO_LIST_DATA_ERROR1, data: e, error: true});
  }
}

function* Category_Delete(action) {
  try {
    yield call(Category_List_View_Delete, action.payload.data);
    yield put(CATEGORY_DELETE_SUCCESS());
  } catch (error) {
    console.error('카테고리 삭제 에러 -> ', error);
    yield put({type: CATEGORY_DELETE_ERROR, data: error, error: true});
  }
}

function* Agenda_DATA_ToDo(action) {
  try {
    const result = yield call(Agenda_Call_Data, action.payload);
    yield put(AGENDA_DATA_SUCCESS(result));
  } catch (e) {
    console.error(e);
    yield put(AGENDA_DATA_ERROR(e));
  }
}

function* ToDo_Delete() {
  yield takeEvery(TODO_LIST_DATA_REQUEST1, ToDoList_Delete);
}

function* Category_List_Delete() {
  yield takeEvery(CATEGORY_DELETE_REQUEST, Category_Delete);
}

function* Agenda_DATA_INF() {
  yield takeEvery(AGENDA_DATA_REQUEST, Agenda_DATA_ToDo);
}

export default function* apiSaga() {
  yield all([fork(ToDo_Delete), fork(Category_List_Delete), fork(Agenda_DATA_INF)]);
}
