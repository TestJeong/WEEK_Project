import {CATEGORY_DELETE_ERROR, CATEGORY_DELETE_SUCCESS, CATEGORY_DELETE_REQUEST} from '@/pages/homeScreen/category/CategorySlice';
import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {Category_List_View_Delete} from './categorySaga';

function* Category_Delete(action: any) {
  try {
    yield call(Category_List_View_Delete, action.payload.data);
    yield put(CATEGORY_DELETE_SUCCESS());
  } catch (error) {
    console.error('카테고리 삭제 에러 -> ', error);
    yield put({type: CATEGORY_DELETE_ERROR, data: error, error: true});
  }
}

function* Category_List_Delete() {
  yield takeEvery(CATEGORY_DELETE_REQUEST, Category_Delete);
}

export default function* categorySaga() {
  yield all([fork(Category_List_Delete)]); // fork(Agenda_DATA_INF)
}
