import {createSlice} from '@reduxjs/toolkit';

interface initType {
  Agenda_DATA: any;
  Agenda_DATA_Timestamp: string;
  Agenda_DATA_loading: boolean;
  Agenda_DATA_done: boolean;
  Agenda_DATA_error: any;
}

const initialState: initType = {
  Agenda_DATA: [],
  Agenda_DATA_Timestamp: '',
  Agenda_DATA_loading: false,
  Agenda_DATA_done: false,
  Agenda_DATA_error: null,
};

export const CalendarState = createSlice({
  name: 'CalendarState',
  initialState,
  reducers: {
    // 모든 카테고리와 투두에 관한 정보를 불러옴
    REQUEST_AGENDA_DATA: (state, action) => {
      state.Agenda_DATA = action.payload;
    },
    AGENDA_DATA_REQUEST: (state, action) => {
      state.Agenda_DATA_loading = true;
      state.Agenda_DATA_done = false;
      state.Agenda_DATA_error = null;
    },
    AGENDA_DATA_SUCCESS: (state, action) => {
      state.Agenda_DATA_loading = false;
      state.Agenda_DATA_done = true;
      state.Agenda_DATA_error = null;
      state.Agenda_DATA = action.payload;
    },
    AGENDA_DATA_ERROR: (state, action) => {
      state.Agenda_DATA_loading = false;
      state.Agenda_DATA_done = false;
      state.Agenda_DATA_error = action.payload;
    },
  },
});

export const {AGENDA_DATA_REQUEST, AGENDA_DATA_SUCCESS, AGENDA_DATA_ERROR, REQUEST_AGENDA_DATA} = CalendarState.actions;
export const CALENDAR_DATA = CalendarState.reducer;
