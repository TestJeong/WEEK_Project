import {TODO_LIST_DATA_ERROR1, TODO_LIST_DATA_REQUEST1, TODO_LIST_DATA_SUCCESS1} from '@homeScreen/todo/todoSlice';
import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {ToDoList_View_Delete} from './todoSaga';

function* todoItemDelete(action: any) {
  try {
    yield call(ToDoList_View_Delete, action.payload.data);
    yield put(TODO_LIST_DATA_SUCCESS1());
  } catch (e) {
    console.error(e);
    yield put({type: TODO_LIST_DATA_ERROR1, data: e, error: true});
  }
}

function* ToDo_Delete() {
  yield takeEvery(TODO_LIST_DATA_REQUEST1, todoItemDelete);
}

export default function* todoSaga() {
  yield all([fork(ToDo_Delete)]); // fork(Agenda_DATA_INF)
}
