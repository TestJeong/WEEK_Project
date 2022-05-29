import React, {useState, useLayoutEffect, useEffect, createRef} from 'react';
import {Text, View, TouchableOpacity, Keyboard, TextInput, TouchableWithoutFeedback, ScrollView, Button, Platform, Switch} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import ActionSheet from 'react-native-actions-sheet';

import realm, {CategoryType, ToDoType} from '../../../db';
import CalendarModal from '../../calendarScreen/CalendarModal';
import DateTimePicke from './DateTimePicke';
import Detail_Priorty from './Detail_Priority';
import ThemeCategoryList from './ThemeCategoryList';
import {Schedule_Notif} from '../../../utils/notificationHelper';
import {Today, Notif_Day, IOS_Notif} from '../../../utils/Day';
import PushNotification from 'react-native-push-notification';
import {GET_DAY, REQEUST_TODO_ITEM_SAVE, RESET_INPUT_DATA, SELECTED_TIME, SELECTED_TODOLIST_DATA} from './todoSlice';
import Priority from '@homeScreen/components/Priority';
import {DetailButton, DetailTimeButton} from '@homeScreen/components/DetailButton';
import {useNavigation} from '@react-navigation/native';
import {UpdateMode} from 'realm';

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
  font-family: 'NotoSansKR-Medium';
  min-height: 50px;
  max-height: 150px;
  font-size: 20px;
`;
const Memo_Text = styled.TextInput`
  font-family: 'NotoSansKR-Medium';
  margin-top: 10px;
  margin-bottom: 10px;
  min-height: 130px;
  max-height: 200px;
  font-size: 16px;
`;

const actionSheetRef = createRef<any>();
const Category_actionSheetRef = createRef<any>();
const BookMarkD = realm.objects('TodoDataList');

const ToDoItemDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {todoData, twelve_HoursTime, onClickDay, onClickPriority, twenty_Four_HoursTime, inputCategoryData} = useSelector((state: any) => state.TODO_DATA);
  const {selectedCategory} = useSelector((state: any) => state.CATEGORY_DATA);

  const [todoTitle, setToDoTitle] = useState(todoData.listContent);
  const [todoMemo, setToDoMemo] = useState(todoData.listMemo);
  const [isEnableds, setIsEnableds] = useState(todoData.listEnabled);

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
        return data.id === String(todoData.id);
      });
      notifData[0] && setCounter(notifData[0].number);
    });
  }, []);

  const SaveBtn = () => {
    const TodoList_View = realm.objects<any>('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered('createTime == $0', todoData.createTime);

    const categoryTitle = inputCategoryData ? inputCategoryData.title : todoData.categoryTitle;
    const listContent = TodoList_View_Data[0].listContent;
    const listTime = twenty_Four_HoursTime ? twenty_Four_HoursTime : todoData.listTime_Data;
    const listDay = onClickDay ? onClickDay : Today(todoData.listDay);
    dispatch(REQEUST_TODO_ITEM_SAVE({todoTitle, todoMemo, isEnableds, selectedCategory}));

    if (twenty_Four_HoursTime || onClickDay || inputCategoryData || listContent !== todoTitle || isEnableds) {
      let CompareDateIos = new Date(IOS_Notif(listDay, listTime)) > new Date();

      if (todoData.listDay && todoData.listTime_Data && CompareDateIos && isEnableds) {
        Schedule_Notif({onClickDay: listDay, timeString: listTime, todoContents: todoTitle, NotifID: todoData.id, categoryTitle: categoryTitle, num: counter});
      } else {
        console.warn('[ToDoList_Detail.js] => 디테일 부분 수정에서 아무 조건식에 걸리지 않음');
      }
    }

    const Notif_ID = todoData.id;
    const String_ID = String(Notif_ID);
    if (isEnableds === false) {
      PushNotification.cancelLocalNotification(String_ID);
    }
    dispatch(SELECTED_TODOLIST_DATA(TodoList_View_Data));
    dispatch(RESET_INPUT_DATA());
    navigation.goBack();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '상세정보',
      headerRightContainerStyle: {marginRight: 10},
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginLeft: 20}}>
          <Icon name="left" size={20} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={SaveBtn} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginRight: 20}}>
          <Icon name="save" size={23} />
        </TouchableOpacity>
      ),
    });
  }, [onClickDay, twelve_HoursTime, onClickPriority, todoTitle, todoMemo, inputCategoryData, isEnableds]);

  const unsubscribe = () => {
    navigation.addListener('blur', () => {
      dispatch(RESET_INPUT_DATA());
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
  const IsCheckDay = onClickDay ? true : todoData.listDay ? true : false;
  const deleteClickDay = () => {
    realm.write(() => {
      const TodoItem = realm.create<ToDoType>(
        'TodoDataList',
        {
          createTime: todoData.createTime,
          listDay: 0,
        },
        UpdateMode.Modified,
      );

      dispatch(SELECTED_TODOLIST_DATA(TodoItem));
    });
    dispatch(GET_DAY(''));
  };

  const IsCheckTime = twelve_HoursTime ? true : todoData.listTime ? true : false;
  const deleteClickTime = () => {
    dispatch(SELECTED_TIME({twelve_HoursTime: '', twenty_Four_HoursTime: ''}));
    realm.write(() => {
      const TodoItem = realm.create<ToDoType>(
        'TodoDataList',
        {
          createTime: todoData.createTime,
          listTime: '',
          listTime_Data: '',
        },
        UpdateMode.Modified,
      );
      dispatch(SELECTED_TODOLIST_DATA(TodoItem));
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{padding: 15}}>
        <ActionSheet ref={actionSheetRef}>
          <Detail_Priorty hideActionSheet={hideActionSheet} />
        </ActionSheet>

        <ActionSheet ref={Category_actionSheetRef}>
          <ThemeCategoryList hideActionSheet={Category_hide_Action} />
        </ActionSheet>

        <DateTimePicke hideDatePicker={hideDatePicker} isDatePickerVisible={isDatePickerVisible} />
        <CalendarModal openModal={calendarModalVisible} closeModal={closeCalendarModal} InputData={false} />
        <Text_View>
          <Title_Text style={{includeFontPadding: false}} value={todoTitle} onChangeText={setToDoTitle} />
          <Memo_Text style={{includeFontPadding: false}} value={todoMemo} onChangeText={setToDoMemo} multiline={true} textAlignVertical={'top'} placeholder="메모" />
        </Text_View>
        <View>
          <DetailButton
            onPressBtn={() => {
              Category_actionSheetRef.current?.setModalVisible();
            }}
            title={'카테고리'}
            iconName={'bars'}>
            {inputCategoryData ? inputCategoryData.title : todoData.categoryTitle}
          </DetailButton>

          <DetailTimeButton onPressBtn={openCalendar} title={'날짜'} iconName={'calendar'} timeSheet={IsCheckDay} deleteFunc={deleteClickDay}>
            {onClickDay ? onClickDay : todoData.listDay ? Today(todoData.listDay) : '없음'}
          </DetailTimeButton>

          <DetailTimeButton onPressBtn={showDatePicker} title={'시간'} iconName={'clockcircleo'} timeSheet={IsCheckTime} deleteFunc={deleteClickTime}>
            {twelve_HoursTime ? twelve_HoursTime : todoData.listTime ? todoData.listTime : '없음'}
          </DetailTimeButton>

          <DetailButton
            onPressBtn={() => {
              actionSheetRef.current?.setModalVisible();
            }}
            isArrow={true}
            title={'우선순위'}
            iconName={'staro'}>
            {onClickPriority ? Priority(onClickPriority) : todoData.listPriority ? Priority(todoData.listPriority) : '없음'}
          </DetailButton>

          <DetailButton title={'알람허용'} iconName={'notification'} isArrow={false}>
            <Switch onValueChange={setIsEnableds} value={isEnableds} />
          </DetailButton>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ToDoItemDetail;
