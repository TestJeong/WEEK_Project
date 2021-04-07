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
import {
  CLICK_DAY,
  CLICK_PRIORITY,
  CLICK_TIME,
  CLICK_TODO_LIST_DATA,
} from '../../reducers/Catagory';
import Detail_Priorty from './Detail_Priority';
import Detail_Category from './Detail_Category';
import {Schedule_Notif} from './ToDo_Notification';
import {Today, ANDROID_Notif, Notif_Day} from '../Day';

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
const Category_actionSheetRef = createRef();

const ToDoList_Detail = ({navigation}) => {
  let actionSheet;

  const dispatch = useDispatch();
  const {
    onClickToDoList,
    onClickTime,
    onClickDay,
    onClickPriority,
    clickCategory,
    onClickCategory,
    timeString,
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
    const TodoList_View = realm.objects('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered(
      'createTime == $0',
      onClickToDoList.createTime,
    );

    const categoryTitle = onClickCategory
      ? onClickCategory.title
      : onClickToDoList.categoryTitle;

    const listContent = TodoList_View_Data[0].listContent;
    const listTime = timeString ? timeString : onClickToDoList.listTime_Data;
    const listDay = onClickDay ? onClickDay : onClickToDoList.listDay;

    realm.write(() => {
      let city = realm.create(
        'TodoDataList',
        {
          createTime: onClickToDoList.createTime,

          categoryTitle: onClickCategory
            ? onClickCategory.title
            : onClickToDoList.categoryTitle,

          listContent: todoTitle,
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

          listTime_Data: timeString
            ? timeString
            : onClickToDoList.listTime_Data
            ? onClickToDoList.listTime_Data
            : null,
        },
        true,
      );
      let user = realm.create(
        'CategoryList',
        {
          createTime: onClickCategory
            ? onClickCategory.createTime
            : clickCategory.createTime,
        },
        true,
      );

      let categorys = realm.create(
        'CategoryList',
        {
          createTime: clickCategory.createTime,
        },
        true,
      );

      const filterT = categorys.todoData.filter((data) => {
        return data.createTime !== onClickToDoList.createTime;
      });

      categorys.todoData = [];
      filterT.forEach((item) => {
        categorys.todoData.push(item);
      });

      user.todoData.unshift(city);
    });

    if (
      timeString ||
      onClickDay ||
      onClickCategory ||
      listContent !== todoTitle
    ) {
      onClickToDoList.listDay &&
        onClickToDoList.listTime_Data &&
        new Date(ANDROID_Notif(listDay, listTime)) > new Date(Notif_Day()) &&
        Schedule_Notif(
          listDay,
          listTime,
          todoTitle,
          onClickToDoList.id,
          categoryTitle,
        );
    }

    dispatch({type: CLICK_TODO_LIST_DATA, data: TodoList_View_Data});

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {marginRight: 20},
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={SaveBtn}
          hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
          <Icon name="save" size={23} />
        </TouchableOpacity>
      ),
    });
  }, [
    onClickDay,
    onClickTime,
    onClickPriority,
    todoTitle,
    todoMemo,
    onClickCategory,
  ]);

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

  const Category_hide_Action = () => {
    Category_actionSheetRef.current.hide();
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

        <ActionSheet ref={Category_actionSheetRef}>
          <Detail_Category hideActionSheet={Category_hide_Action} />
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
          <Time_Input_Container
            onPress={() => {
              Category_actionSheetRef.current?.setModalVisible();
            }}>
            <Time_Icon_Container>
              <Icon name="bars" size={23} color={'#be8bdc'} />
              <Text style={{marginLeft: 15, fontSize: 16}}>카테고리</Text>
            </Time_Icon_Container>

            <Text style={{fontSize: 16}}>
              {onClickCategory
                ? onClickCategory.title
                : onClickToDoList.categoryTitle}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </Text>
          </Time_Input_Container>

          <Time_Input_Container onPress={openCalendar}>
            <Time_Icon_Container>
              <Icon name="calendar" size={23} color={'#75bde0'} />
              <Text style={{marginLeft: 15, fontSize: 16}}>날짜</Text>
            </Time_Icon_Container>
            <Text style={{fontSize: 16}}>
              {onClickDay
                ? Today(onClickDay)
                : onClickToDoList.listDay
                ? Today(onClickToDoList.listDay)
                : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </Text>
          </Time_Input_Container>

          <Time_Input_Container onPress={showDatePicker}>
            <Time_Icon_Container>
              <Icon name="clockcircleo" size={23} color={'#b9cc95'} />
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
              <Icon name="staro" size={23} color={'#f89b9b'} />
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
