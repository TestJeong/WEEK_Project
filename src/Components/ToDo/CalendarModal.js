import React, {useState} from 'react';
import {TextInput, View, Text, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';

import Modal from 'react-native-modal';

import styled from 'styled-components/native';

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

const Text_Input_Container = styled.TextInput`
  font-size: 17px;
  line-height: 30px;
  padding: 5px;
  height: 120px;
  width: 90%;
  border: 0.7px solid #b4baba;
`;

const Button_View = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-around;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const CalendarModal = ({openModal, closeModal}) => {
  const [clickDay, setClickDay] = useState('');
  return (
    <Modal_Container
      useNativeDriverForBackdrop={true}
      isVisible={openModal}
      onBackdropPress={closeModal}
      backdropOpacity={0.2}>
      <ModalView>
        <Calendar
          // Initially visible month. Default = Date()
          current={Date()}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

          onDayPress={(day) => {
            setClickDay(day.dateString);
            console.log('클릭', clickDay);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log('selected day', day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) =>
            direction === 'left' ? (
              <View>
                <Text>A</Text>
              </View>
            ) : (
              <View>
                <Text>B</Text>
              </View>
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
        <Button_View>
          <TouchableOpacity
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default CalendarModal;
