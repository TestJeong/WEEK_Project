import {
  REQEUST_TODO_ITEM_DELETE,
  SUCCESS_TODO_ITEM_DELETE,
  ERROR_TODO_ITEM_DELETE,
  ERROR_TODO_ITEM_SAVE,
  SUCCESS_TODO_ITEM_SAVE,
  REQEUST_TODO_ITEM_SAVE,
  TODO_DATA,
  initType,
} from '@homeScreen/todo/todoSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {takeEvery, put, call, all, fork, select} from 'redux-saga/effects';
import {helperTodoItemDelete, helperTodoItemSave} from './todoSaga';

interface aa {
  data: {
    index: number;
    item: any;
  };
}

export interface aq {
  isEnableds: boolean;
  todoMemo: string;
  todoTitle: string;
  selectedCategory: any;
}

// ----------------------------------------------------------------------------------

function* todoItemDelete(action: PayloadAction<aa>) {
  try {
    yield call(helperTodoItemDelete, action.payload.data);
    yield put(SUCCESS_TODO_ITEM_DELETE());
  } catch (e) {
    console.error(e);
    yield put({type: ERROR_TODO_ITEM_DELETE, data: e, error: true});
  }
}

function* todoItemSave({payload}: PayloadAction<aq>) {
  const state: initType = yield select(({TODO_DATA}) => TODO_DATA);
  try {
    yield call(helperTodoItemSave, state, payload);
    yield put(SUCCESS_TODO_ITEM_SAVE());
  } catch (e) {
    console.error(e);
    yield put({type: ERROR_TODO_ITEM_SAVE, data: e, error: true});
  }
}

// ----------------------------------------------------------------------------------

function* requestTodoItemDelete() {
  yield takeEvery(REQEUST_TODO_ITEM_DELETE, todoItemDelete);
}

function* requestTodoItemSave() {
  yield takeEvery(REQEUST_TODO_ITEM_SAVE, todoItemSave);
}

// ----------------------------------------------------------------------------------

export default function* todoSaga() {
  yield all([fork(requestTodoItemDelete), fork(requestTodoItemSave)]);
}
