import React, {useState, useLayoutEffect, useEffect, createRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import ActionSheet from 'react-native-actions-sheet';

import realm from '../../db';
import CalendarModal from './CalendarModal';
import DateTime_Picke from './DateTime_Picke';
import {CLICK_DAY, CLICK_PRIORITY, CLICK_TIME} from '../../reducers/Catagory';
import Detail_Priorty from './Detail_Priority';

const Time_Input_Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: white;
  margin-bottom: 30px;
  border-radius: 20px;
`;

const Time_Icon_Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const actionSheetRef = createRef();

const ToDoList_Detail = ({navigation}) => {
  let actionSheet;

  const dispatch = useDispatch();
  const {
    onClickToDoList,
    onClickTime,
    onClickDay,
    onClickPriority,
  } = useSelector((state) => state.Catagory);
  const [todoTitle, setToDoTitle] = useState(onClickToDoList.listContent);
  const [todoMemo, setToDoMemo] = useState(onClickToDoList.listMemo);

  const [calendarModalVisible, setcalendarModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const openCalendar = () => {
    setcalendarModalVisible(!calendarModalVisible);
  };

  const closeCalendarModal = () => {
    setcalendarModalVisible(false);
  };

  const SaveBtn = () => {
    realm.write(() => {
      realm.create(
        'TodoDataList',
        {
          createTime: onClickToDoList.createTime,
          listMemo: todoMemo,

          listTime: onClickTime
            ? onClickTime
            : onClickToDoList.listTime
            ? onClickToDoList.listTime
            : null,

          listDay: onClickDay
            ? onClickDay
            : onClickToDoList.listDay
            ? onClickToDoList.listDay
            : null,

          listPriority: onClickPriority
            ? onClickPriority
            : onClickToDoList.listPriority
            ? onClickToDoList.listPriority
            : null,
        },
        true,
      );
    });
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {marginRight: 20},
      headerRight: () => <Icon onPress={SaveBtn} name="save" size={23} />,
    });
  }, [onClickDay || onClickTime || onClickPriority || todoMemo]);

  const unsubscribe = () => {
    navigation.addListener('blur', () => {
      dispatch({type: CLICK_TIME, data: null});
      dispatch({type: CLICK_DAY, data: null});
      dispatch({type: CLICK_PRIORITY, data: null});
    });
  };

  useEffect(() => {
    unsubscribe();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideActionSheet = () => {
    actionSheetRef.current.hide();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={{
          padding: 15,
        }}>
        <ActionSheet ref={actionSheetRef}>
          <Detail_Priorty hideActionSheet={hideActionSheet} />
        </ActionSheet>
        <DateTime_Picke
          hideDatePicker={hideDatePicker}
          isDatePickerVisible={isDatePickerVisible}
        />
        <CalendarModal
          openModal={calendarModalVisible}
          closeModal={closeCalendarModal}
        />
        <View
          style={{
            backgroundColor: 'white',
            minHeight: '25%',
            maxHeight: '70%',
            padding: 10,
            borderRadius: 20,
            marginBottom: 30,
          }}>
          <TextInput
            value={todoTitle}
            onChangeText={setToDoTitle}
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: '#cad0d4',
              minHeight: 50,
              maxHeight: 150,

              fontSize: 20,
            }}
          />
          <TextInput
            value={todoMemo}
            onChangeText={setToDoMemo}
            multiline={true}
            textAlignVertical={'top'}
            placeholder="메모"
            style={{
              marginTop: 10,
              marginBottom: 10,
              minHeight: 130,
              maxHeight: 200,
              fontSize: 16,
            }}
          />
        </View>
        <View>
          <Time_Input_Container onPress={openCalendar}>
            <Time_Icon_Container>
              <Icon name="calendar" size={23} />
              <Text style={{marginLeft: 15, fontSize: 16}}>날짜</Text>
            </Time_Icon_Container>
            <Text style={{fontSize: 16}}>
              {onClickDay
                ? onClickDay
                : onClickToDoList.listDay
                ? onClickToDoList.listDay
                : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </Text>
          </Time_Input_Container>

          <Time_Input_Container onPress={showDatePicker}>
            <Time_Icon_Container>
              <Icon name="clockcircleo" size={23} />
              <Text style={{marginLeft: 15, fontSize: 16}}>시간</Text>
            </Time_Icon_Container>
            <Text style={{fontSize: 16}}>
              {onClickTime
                ? onClickTime
                : onClickToDoList.listTime
                ? onClickToDoList.listTime
                : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </Text>
          </Time_Input_Container>

          <Time_Input_Container
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}>
            <Time_Icon_Container>
              <Icon name="clockcircleo" size={23} />
              <Text style={{marginLeft: 15, fontSize: 16}}>우선순위</Text>
            </Time_Icon_Container>
            <Text style={{fontSize: 16}}>
              {onClickPriority
                ? (function () {
                    if (onClickPriority === 1)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickPriority === 2)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickPriority === 3)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                  })()
                : onClickToDoList.listPriority
                ? (function () {
                    if (onClickToDoList.listPriority === 1)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickToDoList.listPriority === 2)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickToDoList.listPriority === 3)
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                  })()
                : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </Text>
          </Time_Input_Container>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ToDoList_Detail;
