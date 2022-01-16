import React, {useState, useLayoutEffect, useEffect, createRef} from 'react';
import {Text, View, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback, ScrollView, Button, Platform, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import ActionSheet from 'react-native-actions-sheet';

import realm from '../../../db';
import CalendarModal from '../../CalendarScreen/CalendarModal';
import DateTime_Picke from './DateTime_Picke';
import {CLICK_CATEGORY_INPUT, CLICK_DAY, CLICK_PRIORITY, CLICK_TIME, CLICK_TODO_LIST_DATA} from '../../../reducers/Catagory';
import Detail_Priorty from './Detail_Priority';
import Detail_Category from './Detail_Category';
import {Schedule_Notif} from './ToDo_Notification';
import {Today, ANDROID_Notif, Notif_Day, IOS_Notif} from '../../../Utils/Day';
import PushNotification from 'react-native-push-notification';

const Text_View = styled.View`
  background-color: white;
  min-height: 25%;
  max-height: 70%;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 30px;
`;

const Title_Text = styled.TextInput`
  border-bottom-width: 0.5px;
  border-bottom-color: #cad0d4;
  font-family: 'NanumGothic';
  min-height: 50px;
  max-height: 150px;
  font-size: 20px;
`;
const Memo_Text = styled.TextInput`
  font-family: 'NanumGothic';
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 130px;
  max-height: 200px;
  font-size: 16px;
`;

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

const List_Text = styled.Text`
  font-family: 'NanumGothic';
  margin-left: 15px;
  font-size: 16px;
`;

const List_Text_Value = styled.Text`
  font-family: 'NanumGothic';
  font-size: 16px;
`;

const actionSheetRef = createRef();
const Category_actionSheetRef = createRef();

const ToDoList_Detail = ({navigation}) => {
  let actionSheet;

  const dispatch = useDispatch();
  const {onClickToDoList, onClickTime, onClickDay, onClickPriority, clickCategory, onClickCategory, timeString} = useSelector((state) => state.Catagory);
  const [todoTitle, setToDoTitle] = useState(onClickToDoList.listContent);
  const [todoMemo, setToDoMemo] = useState(onClickToDoList.listMemo);
  const [isEnableds, setIsEnableds] = useState(onClickToDoList.listEnabled);

  const [calendarModalVisible, setcalendarModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [counter, setCounter] = useState(1);

  const openCalendar = () => {
    setcalendarModalVisible(!calendarModalVisible);
  };

  const closeCalendarModal = () => {
    setcalendarModalVisible(false);
  };

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications((notif) => {
      const notifData = notif.filter((data) => {
        return data.id === String(onClickToDoList.id);
      });
      notifData[0] && setCounter(notifData[0].number);
    });
  }, []);

  const SaveBtn = () => {
    const TodoList_View = realm.objects('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered('createTime == $0', onClickToDoList.createTime);

    const categoryTitle = onClickCategory ? onClickCategory.title : onClickToDoList.categoryTitle;

    const listContent = TodoList_View_Data[0].listContent;
    const listTime = timeString ? timeString : onClickToDoList.listTime_Data;
    const listDay = onClickDay ? onClickDay : onClickToDoList.listDay;

    realm.write(() => {
      let city = realm.create(
        'TodoDataList',
        {
          createTime: onClickToDoList.createTime,

          categoryTitle: onClickCategory ? onClickCategory.title : onClickToDoList.categoryTitle,

          listContent: todoTitle,
          listMemo: todoMemo,
          listEnabled: isEnableds,

          listTime: onClickTime ? onClickTime : onClickToDoList.listTime ? onClickToDoList.listTime : null,

          listDay: onClickDay ? onClickDay : onClickToDoList.listDay ? onClickToDoList.listDay : null,

          listPriority: onClickPriority ? onClickPriority : onClickToDoList.listPriority ? onClickToDoList.listPriority : null,

          listTime_Data: timeString ? timeString : onClickToDoList.listTime_Data ? onClickToDoList.listTime_Data : null,
        },
        true,
      );
      if (onClickCategory) {
        let user = realm.create('CategoryList', {createTime: onClickCategory ? onClickCategory.createTime : clickCategory.createTime}, true);

        let categorys = realm.create('CategoryList', {createTime: clickCategory.createTime}, true);

        const filterT = categorys.todoData.filter((data) => {
          return data.createTime !== onClickToDoList.createTime;
        });

        categorys.todoData = [];
        filterT.forEach((item) => {
          categorys.todoData.push(item);
        });

        user.todoData.unshift(city);
      }
    });

    if (timeString || onClickDay || onClickCategory || listContent !== todoTitle || isEnableds) {
      let hey = new Date(IOS_Notif(listDay, listTime)) > new Date();

      if (onClickToDoList.listDay && onClickToDoList.listTime_Data && Platform.OS === 'ios' && hey && isEnableds) {
        Schedule_Notif(listDay, listTime, todoTitle, onClickToDoList.id, categoryTitle, counter);
      } else if (
        onClickToDoList.listDay &&
        onClickToDoList.listTime_Data &&
        Platform.OS === 'android' &&
        new Date(ANDROID_Notif(listDay, listTime)).toLocaleString() > new Date(Notif_Day()).toLocaleString() &&
        isEnableds
      ) {
        Schedule_Notif(listDay, listTime, todoTitle, onClickToDoList.id, categoryTitle, counter);
      } else {
        console.log(' 왜 안돼?');
      }
    }

    const Notif_ID = onClickToDoList.id;
    const String_ID = String(Notif_ID);
    if (isEnableds === false) {
      PushNotification.cancelLocalNotification({id: String_ID});
    }

    dispatch({type: CLICK_TODO_LIST_DATA, data: TodoList_View_Data});
    dispatch({type: CLICK_CATEGORY_INPUT, data: null});

    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {marginRight: 20},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={SaveBtn} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
          <Icon name="save" size={23} />
        </TouchableOpacity>
      ),
    });
  }, [onClickDay, onClickTime, onClickPriority, todoTitle, todoMemo, onClickCategory, isEnableds]);

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
        {/* <ActionSheet ref={actionSheetRef}>
          <Detail_Priorty hideActionSheet={hideActionSheet} />
        </ActionSheet>

        <ActionSheet ref={Category_actionSheetRef}>
          <Detail_Category hideActionSheet={Category_hide_Action} />
        </ActionSheet> */}

        <DateTime_Picke hideDatePicker={hideDatePicker} isDatePickerVisible={isDatePickerVisible} />
        <CalendarModal openModal={calendarModalVisible} closeModal={closeCalendarModal} InputData={false} />
        <Text_View>
          <Title_Text value={todoTitle} onChangeText={setToDoTitle} />
          <Memo_Text value={todoMemo} onChangeText={setToDoMemo} multiline={true} textAlignVertical={'top'} placeholder="메모" />
        </Text_View>
        <View>
          <Time_Input_Container
            onPress={() => {
              Category_actionSheetRef.current?.setModalVisible();
            }}>
            <Time_Icon_Container>
              <Icon name="bars" size={23} color={'#be8bdc'} />
              <List_Text>카테고리</List_Text>
            </Time_Icon_Container>

            <List_Text_Value>
              {onClickCategory ? onClickCategory.title : onClickToDoList.categoryTitle}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </List_Text_Value>
          </Time_Input_Container>

          <Time_Input_Container onPress={openCalendar}>
            <Time_Icon_Container>
              <Icon name="calendar" size={23} color={'#75bde0'} />
              <List_Text>날짜</List_Text>
            </Time_Icon_Container>
            <List_Text_Value>
              {onClickDay ? Today(onClickDay) : onClickToDoList.listDay ? Today(onClickToDoList.listDay) : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </List_Text_Value>
          </Time_Input_Container>

          <Time_Input_Container onPress={showDatePicker}>
            <Time_Icon_Container>
              <Icon name="clockcircleo" size={23} color={'#b9cc95'} />
              <List_Text>시간</List_Text>
            </Time_Icon_Container>
            <List_Text_Value>
              {onClickTime ? onClickTime : onClickToDoList.listTime ? onClickToDoList.listTime : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </List_Text_Value>
          </Time_Input_Container>

          <Time_Input_Container
            onPress={() => {
              actionSheetRef.current?.setModalVisible();
            }}>
            <Time_Icon_Container>
              <Icon name="staro" size={23} color={'#f89b9b'} />
              <List_Text>우선순위</List_Text>
            </Time_Icon_Container>
            <List_Text_Value>
              {onClickPriority
                ? (function () {
                    if (onClickPriority === 1)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickPriority === 2)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickPriority === 3)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickPriority === 4)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <List_Text_Value>없음</List_Text_Value>
                        </View>
                      );
                  })()
                : onClickToDoList.listPriority
                ? (function () {
                    if (onClickToDoList.listPriority === 1)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickToDoList.listPriority === 2)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickToDoList.listPriority === 3)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                          <Icon name="star" size={12} color={'pink'} />
                        </View>
                      );
                    if (onClickToDoList.listPriority === 4)
                      return (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <List_Text_Value>없음</List_Text_Value>
                        </View>
                      );
                  })()
                : '없음'}
              &nbsp; &nbsp;
              <Icon name="right" size={15} />
            </List_Text_Value>
          </Time_Input_Container>

          <Time_Input_Container>
            <Time_Icon_Container>
              <Icon name="notification" size={23} color={'#ffa646'} />
              <List_Text>알람허용</List_Text>
            </Time_Icon_Container>
            <List_Text_Value>
              <Switch onValueChange={setIsEnableds} value={isEnableds} />
            </List_Text_Value>
          </Time_Input_Container>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ToDoList_Detail;
