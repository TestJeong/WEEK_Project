import {createSlice} from '@reduxjs/toolkit';

interface initType {
  Agenda_DATA: any;
  Agenda_DATA_Timestamp: string;
}

const initialState: initType = {
  Agenda_DATA: [],
  Agenda_DATA_Timestamp: '',
};

export const CalendarState = createSlice({
  name: 'CalendarState',
  initialState,
  reducers: {
    // 모든 카테고리와 투두에 관한 정보를 불러옴
    REQUEST_AGENDA_DATA: (state, action) => {
      state.Agenda_DATA = action.payload;
    },
  },
});

export const {REQUEST_AGENDA_DATA} = CalendarState.actions;
export const CALENDAR_DATA = CalendarState.reducer;
