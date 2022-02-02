import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {CLICK_TIME} from '../../../reducers/Catagory';
import {SELECTED_TIME} from './ToDoSlice';

const DateTime_Picke = ({hideDatePicker, isDatePickerVisible}) => {
  const dispatch = useDispatch();

  const handleConfirm = (date) => {
    const DATE_TIME = date.toTimeString().split(' ')[0]; // 17:15:30

    const HOURS = ((date.getHours() + 11) % 12) + 1;
    const MINUNTES = date.getMinutes();
    const DAY = date.getHours() < 12 && date.getHours() >= 0 ? '오전' : '오후';
    const TIMESHEET = DAY + ' ' + HOURS + ':' + (MINUNTES > 10 ? MINUNTES : '0' + MINUNTES);

    dispatch({type: CLICK_TIME, data: TIMESHEET, hoho: DATE_TIME});
    dispatch(SELECTED_TIME({twelve_HoursTime: TIMESHEET, twenty_Four_HoursTime: DATE_TIME}));

    hideDatePicker();
  };

  return (
    <DateTimePickerModal
      locale="ko_KR"
      isVisible={isDatePickerVisible}
      mode="time"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      headerTextIOS="시간"
      confirmTextIOS="확인"
      cancelTextIOS="취소"
    />
  );
};

export default DateTime_Picke;
