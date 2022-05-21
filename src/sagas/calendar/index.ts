import {AGENDA_DATA_SUCCESS, AGENDA_DATA_ERROR, AGENDA_DATA_REQUEST} from '@/pages/calendarScreen/CalendarSlice';
import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {Agenda_Call_Data} from './calendarSaga';

function* Agenda_DATA_ToDo(action: any) {
  try {
    const result: {title: string; data: any} = yield call(Agenda_Call_Data, action.payload);
    yield put(AGENDA_DATA_SUCCESS(result));
  } catch (e) {
    console.error(e);
    yield put(AGENDA_DATA_ERROR(e));
  }
}

function* Agenda_DATA_INF() {
  yield takeEvery(AGENDA_DATA_REQUEST, Agenda_DATA_ToDo);
}

export default function* calendarSaga() {
  yield all([fork(Agenda_DATA_INF)]);
}
