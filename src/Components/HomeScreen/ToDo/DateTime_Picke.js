import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch} from 'react-redux';
import {CLICK_TIME} from '../../../reducers/Catagory';

const DateTime_Picke = ({hideDatePicker, isDatePickerVisible}) => {
  const dispatch = useDispatch();

  const handleConfirm = (date) => {
    const DATE_TIME = date.toTimeString().split(' ')[0];

    const IOS_HOURS = (date.getHours() + 24) % 12 || 12;

    const IOS_TIMESHEET = IOS_HOURS < 10 ? date.toLocaleTimeString().substring(0, 7) : date.toLocaleTimeString().substring(0, 8);

    const ANDROID_HOURS = ((date.getHours() + 11) % 12) + 1;
    const ANDROID_MINUNTES = date.getMinutes();
    const ANDROID_DAY = date.getHours() < 12 && date.getHours() >= 0 ? '오전' : '오후';

    const ANDROID_TIMESHEET = ANDROID_DAY + ' ' + ANDROID_HOURS + ':' + (ANDROID_MINUNTES > 10 ? ANDROID_MINUNTES : '0' + ANDROID_MINUNTES);

    dispatch({
      type: CLICK_TIME,
      data: Platform.OS === 'ios' ? IOS_TIMESHEET : ANDROID_TIMESHEET,
      hoho: DATE_TIME,
    });

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
