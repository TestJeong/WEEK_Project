import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import {Calendar} from 'react-native-calendars';

import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {CLICK_DAY, CLICK_TIME} from '../../reducers/Catagory';
import DateTime_Picke from './DateTime_Picke';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  flex-direction: column;

  /* 모달창 크기 조절 */
  width: 330px;
  height: 480px;
  border-radius: 10px;
  background-color: white;
  padding: 5px 5px;
`;

const Time_Input_Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 10px;
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

const Time_Text = styled.Text`
  font-size: 16px;
  margin-left: 15px;
  font-family: 'NanumSquareB';
`;

const Time_Value = styled.Text`
  font-size: 16px;
  font-family: 'NanumSquareR';
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-family: 'NanumSquareB';
`;

const CalendarModal = ({openModal, closeModal}) => {
  const dispatch = useDispatch();
  const {onClickTime, onClickDay} = useSelector((state) => state.Catagory);

  const [clickDay, setClickDay] = useState(null);
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const SaveCalendar = () => {
    dispatch({type: CLICK_DAY, data: Number(clickDay.replace(/-/g, ''))});
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
        selectedColor: '#2ad4af',
        disableTouchEvent: true,
      },
    };

    return Mark;
  };

  return (
    <Modal_Container
      useNativeDriverForBackdrop={true}
      isVisible={openModal}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}>
      <DateTime_Picke
        hideDatePicker={hideDatePicker}
        isDatePickerVisible={isDatePickerVisible}
      />
      <ModalView>
        <Calendar
          current={Date()}
          onDayPress={(day) => {
            setClickDay(day.dateString);
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
          hideExtraDays={true}
          disableMonthChange={true}
          firstDay={7}
          hideDayNames={false}
          showWeekNumbers={false}
          onPressArrowLeft={(substractMonth) => substractMonth()}
          onPressArrowRight={(addMonth) => addMonth()}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          markedDates={clickDay ? Calendar_Mark() : null}
          theme={{
            todayBackgroundColor: '#347ee7',
            todayTextColor: 'white',
            dotColor: '#00adf5',
            selectedDotColor: 'red',
            textDayFontFamily: 'NanumSquareR',
            textMonthFontFamily: 'NanumSquareB',
            textDayHeaderFontFamily: 'NanumSquareB',
          }}
        />

        <Time_Input_Container onPress={showDatePicker}>
          <Time_Icon_Container>
            <Icon name="clockcircleo" size={23} color={'#b9cc95'} />
            <Time_Text>시간</Time_Text>
          </Time_Icon_Container>
          <Time_Value>
            {onClickTime ? onClickTime : '없음'}&nbsp; &nbsp;
            <Icon name="right" size={15} />
          </Time_Value>
        </Time_Input_Container>

        <Time_Input_Container onPress={showDatePicker}>
          <Time_Icon_Container>
            <Icon name="bells" size={23} color={'#b9cc95'} />
            <Time_Text>알람 설정</Time_Text>
          </Time_Icon_Container>
          <Time_Value>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </Time_Value>
        </Time_Input_Container>

        <Button_View>
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clickDay ? SaveCalendar : null}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>저장</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default CalendarModal;
