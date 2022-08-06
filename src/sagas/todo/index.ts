import {
  REQEUST_TODO_ITEM_DELETE,
  SUCCESS_TODO_ITEM_DELETE,
  ERROR_TODO_ITEM_DELETE,
  ERROR_TODO_ITEM_SAVE,
  SUCCESS_TODO_ITEM_SAVE,
  REQEUST_TODO_ITEM_SAVE,
  initType,
  REQEUST_TODO_ITEM_ADD,
  ERROR_TODO_ITEM_ADD,
  SUCCESS_TODO_ITEM_ADD,
  REQEUST_TODO_ITEM_CLEAR,
  SUCCESS_TODO_ITEM_CLEAR,
  ERROR_TODO_ITEM_CLEAR,
} from '../../pages/homeScreen/todo/ToDoSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {takeEvery, put, call, all, fork, select} from 'redux-saga/effects';
import {helperTodoClear, helperTodoItemDelete, helperTodoItemSave} from './todoSaga';

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
// 투두 아이템 삭제
function* todoItemDelete(action) {
  try {
    yield call(helperTodoItemDelete, action.payload.data);
    yield put(SUCCESS_TODO_ITEM_DELETE());
  } catch (e) {
    console.error(e);
    yield put({type: ERROR_TODO_ITEM_DELETE, data: e, error: true});
  }
}
// 투두 아이템 저장
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
//투두 아이템 생성
function* todoItemAdd() {
  try {
    yield put(SUCCESS_TODO_ITEM_ADD());
  } catch (error) {
    yield put({type: ERROR_TODO_ITEM_ADD, data: error, error: true});
  }
}
// 투두 아이템 토글 변경
function* todoClearToggle(action) {
  try {
    yield call(helperTodoClear, action.payload.data);
    yield put(SUCCESS_TODO_ITEM_CLEAR());
  } catch (error) {
    yield put({type: ERROR_TODO_ITEM_CLEAR, data: error, error: true});
  }
}

// ----------------------------------------------------------------------------------

function* requestTodoItemDelete() {
  yield takeEvery(REQEUST_TODO_ITEM_DELETE, todoItemDelete);
}

function* requestTodoItemSave() {
  yield takeEvery(REQEUST_TODO_ITEM_SAVE, todoItemSave);
}

function* requestTodoItemAdd() {
  yield takeEvery(REQEUST_TODO_ITEM_ADD, todoItemAdd);
}

function* requestTodoClearToggle() {
  yield takeEvery(REQEUST_TODO_ITEM_CLEAR, todoClearToggle);
}

// ----------------------------------------------------------------------------------

export default function* todoSaga() {
  yield all([fork(requestTodoItemDelete), fork(requestTodoItemSave), fork(requestTodoItemAdd), fork(requestTodoClearToggle)]);
}
