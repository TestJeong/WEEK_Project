import React, {useState} from 'react';
import {TouchableOpacity, Platform, Switch, View} from 'react-native';

import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import DateTimePicke from '../homeScreen/todo/DateTimePicke';
import {GET_DAY, GET_NOTIFICATION_ENABLED, RESET_INPUT_DATA} from '../homeScreen/todo/ToDoSlice';
import {IcalendarModalType} from './calendarType';
import {useEffect} from 'react';
import {Today} from '@/utils/Day';

const Modal_Container = styled(Modal as any)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  flex-direction: column;
  /* 모달창 크기 조절 */
  width: 330px;
  border-radius: 10px;
  background-color: white;
  padding: 5px 5px;
`;

const Time_Input_Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const Time_Icon_Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Button_View = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
  margin: 10px 0px 20px 0px;
`;

const Time_Text = styled.Text`
  font-size: 16px;
  margin-left: 15px;
`;

const Time_Value = styled.Text`
  font-size: 16px;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-family: 'NotoSansKR-Medium';
`;

const CalendarModal = ({openModal, closeModal, InputData}: IcalendarModalType) => {
  const dispatch = useDispatch();
  const {twelve_HoursTime} = useSelector((state: any) => state.TODO_DATA);

  const [clickDay, setClickDay] = useState(Today());
  const [isEnabled, setIsEnabled] = useState(false);

  const SaveCalendar = () => {
    dispatch(GET_DAY(clickDay));
    dispatch(GET_NOTIFICATION_ENABLED(isEnabled));
    closeModal();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const Calendar_Mark = () => {
    const Mark = {
      [clickDay]: {
        selected: true,
        marked: false,
        selectedColor: '#00AAAF',
        disableTouchEvent: true,
      },
    };

    return Mark;
  };

  const onPressDeleteTime = () => {
    dispatch(RESET_INPUT_DATA());
  };

  return (
    <Modal_Container useNativeDriverForBackdrop={true} isVisible={openModal} onBackdropPress={closeModal} backdropOpacity={0.2}>
      <DateTimePicke hideDatePicker={hideDatePicker} isDatePickerVisible={isDatePickerVisible} />
      <ModalView style={{height: InputData ? 'auto' : 'auto'}}>
        <Calendar
          current={Date()}
          onDayPress={(day) => {
            setClickDay(day.dateString); // 2022-02-02
          }}
          monthFormat={'yyyy MM'}
          hideArrows={false}
          renderArrow={(direction) => (direction === 'left' ? <Icon name="arrowleft" size={25} color="#4F8EF7" /> : <Icon name="arrowright" size={25} color="#4F8EF7" />)}
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={7}
          pastScrollRange={50}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(substractMonth) => substractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          markedDates={clickDay ? Calendar_Mark() : null}
          theme={{
            textDayStyle: {marginTop: Platform.OS === 'android' ? -7 : 3},
            todayBackgroundColor: '#347ee7',
            todayTextColor: 'white',
            dotColor: '#00adf5',
            selectedDotColor: 'red',
            textDayFontFamily: 'NotoSansKR-Medium',
            textMonthFontFamily: 'NotoSansKR-Medium',
            textDayHeaderFontFamily: 'NotoSansKR-Bold',
            includeFontPadding: false,
          }}
        />
        {InputData ? (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
            <Time_Input_Container onPress={showDatePicker}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                <Time_Icon_Container>
                  <Icon name="clockcircleo" size={23} color={'#b9cc95'} />
                  <Time_Text style={{includeFontPadding: false}}>시간</Time_Text>
                </Time_Icon_Container>
                <Time_Value style={{includeFontPadding: false}}>{twelve_HoursTime ? twelve_HoursTime : '없음'}&nbsp; &nbsp;</Time_Value>
              </View>
            </Time_Input_Container>
            <TouchableOpacity onPress={onPressDeleteTime}>{twelve_HoursTime ? <Icon name="close" size={19} color="red" /> : <Icon name="right" size={15} />}</TouchableOpacity>
          </View>
        ) : null}
        {InputData ? (
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
            <Time_Input_Container onPress={showDatePicker}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
                <Time_Icon_Container>
                  <Icon name="bells" size={23} color={'#b9cc95'} />
                  <Time_Text style={{includeFontPadding: false}}>알람 설정</Time_Text>
                </Time_Icon_Container>
              </View>
              <Time_Value>
                <Switch onValueChange={setIsEnabled} value={isEnabled} />
              </Time_Value>
            </Time_Input_Container>
          </View>
        ) : null}

        <Button_View>
          <TouchableOpacity onPress={closeModal} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginLeft: 20}}>
            <Text_Close style={{includeFontPadding: false, color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <TouchableOpacity onPress={clickDay ? SaveCalendar : null} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginRight: 20}}>
            <Text_Close style={{includeFontPadding: false, color: '#2653af'}}>저장</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default CalendarModal;
