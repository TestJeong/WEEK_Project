import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {CLICK_DAY, CLICK_TIME} from '../../reducers/Catagory';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  flex-direction: column;

  /* 모달창 크기 조절 */
  width: 330px;
  height: 550px;
  border-radius: 10px;
  background-color: white;
  padding: 10px 5px;
`;

const Time_Input_Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 40px 10px;
`;

const Time_Icon_Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button_View = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const CalendarModal = ({openModal, closeModal}) => {
  const dispatch = useDispatch();
  const {onClickTime} = useSelector((state) => state.Catagory);

  const [clickDay, setClickDay] = useState(null);
  const [clickTime, setClickTime] = useState(null);

  const SaveCalendar = () => {
    dispatch({type: CLICK_DAY, data: clickDay});
    closeModal();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const DATE_TIME = date.toLocaleTimeString();
    const IOS_HOURS = (date.getHours() + 24) % 12 || 12;
    const IOS_TIMESHEET =
      IOS_HOURS < 10
        ? date.toLocaleTimeString().substring(0, 7)
        : date.toLocaleTimeString().substring(0, 8);

    const ANDROID_HOURS = ((date.getHours() + 11) % 12) + 1;
    const ANDROID_MINUNTES = date.getMinutes();
    const ANDROID_DAY =
      date.getHours() < 12 && date.getHours() >= 0 ? '오전' : '오후';
    const ANDROID_TIMESHEET =
      ANDROID_DAY +
      ' ' +
      ANDROID_HOURS +
      ':' +
      (ANDROID_MINUNTES > 10 ? ANDROID_MINUNTES : '0' + ANDROID_MINUNTES);

    dispatch({
      type: CLICK_TIME,
      data: DATE_TIME,
    });
    setClickTime(Platform.OS === 'ios' ? IOS_TIMESHEET : ANDROID_TIMESHEET);
    hideDatePicker();
  };

  return (
    <Modal_Container
      useNativeDriverForBackdrop={true}
      isVisible={openModal}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}>
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
      <ModalView>
        <Calendar
          current={Date()}
          onDayPress={(day) => {
            setClickDay(day.dateString);
            console.log('클릭', clickDay);
          }}
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          monthFormat={'yyyy MM'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          hideArrows={false}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Icon name="arrowleft" size={25} color="#4F8EF7" />
            ) : (
              <Icon name="arrowright" size={25} color="#4F8EF7" />
            )
          }
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={7}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(substractMonth) => substractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          /** Replace default month and year title with custom one. the function receive a date as parameter. */
          //renderHeader={(date) => {/*Return JSX*/}}
          markedDates={{
            [clickDay]: {
              selected: true,
              marked: false,
              selectedColor: '#477660',
            },
            /*    '2012-05-17': {marked: true},
            '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
            '2012-05-19': {disabled: true, disableTouchEvent: true} */
          }}
        />

        <Time_Input_Container onPress={showDatePicker}>
          <Time_Icon_Container>
            <Icon name="clockcircleo" size={23} />
            <Text style={{marginLeft: 15, fontSize: 16}}>시간</Text>
          </Time_Icon_Container>
          <Text style={{fontSize: 16}}>
            {onClickTime ? clickTime : '없음'}&nbsp; &nbsp;
            <Icon name="right" size={15} />
          </Text>
        </Time_Input_Container>

        <Button_View>
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={SaveCalendar}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>저장</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default CalendarModal;
