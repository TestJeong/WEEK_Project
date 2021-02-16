import {all, takeEvery} from 'redux-saga/effects';
import apiSaga from '../sagas/Todo_Saga';

export default function* rootSaga() {
  yield all([apiSaga()]);
}
