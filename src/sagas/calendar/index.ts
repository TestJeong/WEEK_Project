import {AGENDA_DATA_SUCCESS, AGENDA_DATA_ERROR, AGENDA_DATA_REQUEST} from '@/pages/calendarScreen/CalendarSlice';
import {PayloadAction} from '@reduxjs/toolkit';
import {takeEvery, put, call, all, fork} from 'redux-saga/effects';
import {helperAgendaRequest} from './calendarSaga';

interface DateType {
  payload: string; // 2022-05-23 해당 주의 월요일
}

function* agendaData(action: PayloadAction<DateType>) {
  try {
    const {payload} = action;
    const result: {title: string; data: any} = yield call(helperAgendaRequest, payload);
    yield put(AGENDA_DATA_SUCCESS(result));
  } catch (e) {
    console.error(e);
    yield put(AGENDA_DATA_ERROR(e));
  }
}

function* requestAgendaData() {
  yield takeEvery(AGENDA_DATA_REQUEST, agendaData);
}

export default function* calendarSaga() {
  yield all([fork(requestAgendaData)]);
}
