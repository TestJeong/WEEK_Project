import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Switch,
} from 'react-native';
import {Calendar, CalendarTheme} from 'react-native-calendars';

import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {CLICK_DAY, CLICK_ENABLED} from '../../reducers/Catagory';
import DateTime_Picke from './DateTime_Picke';
import {getClickDay_Calendar} from '../../reducers/toolkit';

const Modal_Container = styled<any>(Modal)`
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
  padding: 10px 10px;
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
  font-family: 'NanumGothic';
`;

const Time_Value = styled.Text`
  font-size: 16px;
  font-family: 'NanumGothic';
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-family: 'NanumGothicBold';
`;

const calendarTheme: CalendarTheme = {
  todayTextColor: 'white',
  dotColor: '#00adf5',
  selectedDotColor: 'red',
  textDayFontFamily: 'NanumGothic',
  textMonthFontFamily: 'NanumGothicBold',
  textDayHeaderFontFamily: 'NanumGothicBold',
  /* todayBackgroundColor: '#347ee7', */ // 이부분이 에러남
};

type CalendarModalProps = {
  openModal(): boolean;
  closeModal(): boolean;
  InputData: any;
};

const CalendarModal = ({
  openModal,
  closeModal,
  InputData,
}: CalendarModalProps) => {
  const dispatch = useDispatch();
  const {onClickTime, onClickDay} = useSelector((state: any) => state.Catagory);

  const [calendar_String, setCalendar_String] = useState<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const SaveCalendar = (): void => {
    dispatch(getClickDay_Calendar(Number(calendar_String.replace(/-/g, ''))));
    dispatch({
      type: CLICK_DAY,
      data: Number(calendar_String.replace(/-/g, '')),
    });
    dispatch({type: CLICK_ENABLED, data: isEnabled});
    closeModal();
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () /* : void */ => {
    setDatePickerVisibility(false);
  };

  const Calendar_Mark = () => {
    const Mark = {
      [calendar_String]: {
        customStyles: {
          container: {
            backgroundColor: 'green',
          },
          text: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
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
      <ModalView style={{height: InputData ? 'auto' : 'auto'}}>
        <Calendar
          current={Date()}
          onDayPress={(day) => {
            setCalendar_String(day.dateString);
          }}
          monthFormat={'yyyy MM'}
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
          theme={{
            todayTextColor: 'white',
            dotColor: '#00adf5',
            selectedDotColor: 'red',

            textDayFontFamily: 'NanumGothic',
            textMonthFontFamily: 'NanumGothicBold',
            textDayHeaderFontFamily: 'NanumGothicBold',
          }}
        />
        {InputData ? (
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
        ) : null}
        {InputData ? (
          <Time_Input_Container onPress={showDatePicker}>
            <Time_Icon_Container>
              <Icon name="bells" size={23} color={'#b9cc95'} />
              <Time_Text>알람 설정</Time_Text>
            </Time_Icon_Container>
            <Time_Value>
              <Switch onValueChange={setIsEnabled} value={isEnabled} />
            </Time_Value>
          </Time_Input_Container>
        ) : null}

        <Button_View>
          <TouchableOpacity
            onPress={closeModal}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={calendar_String ? SaveCalendar : undefined}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>저장</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default CalendarModal;
