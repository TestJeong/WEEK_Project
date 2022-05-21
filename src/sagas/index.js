import {all} from 'redux-saga/effects';
import calendarSaga from './calendar';
import categorySaga from './category';
import todoSaga from './todo';

export default function* rootSaga() {
  yield all([calendarSaga(), categorySaga(), todoSaga()]);
}
