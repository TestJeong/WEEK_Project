import React, {useState, useRef, useEffect} from 'react';
import {TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

import realm from '../../../db';
import CalendarModal from '../../CalendarScreen/CalendarModal';
import Priority_Modal from './ Priority';
import {Day, IOS_Notif, IOS_today} from '../../../Utils/Day';
import {MY_CATEGORY_DATA, CLICK_DAY, CLICK_PRIORITY, CLICK_CATEGORY_INPUT, CLICK_TIME} from '../../../reducers/Catagory';
import Category_Modal from '../Category/Category_Modal';
import {Schedule_Notif} from './ToDo_Notification';
import {ANDROID_Notif, Notif_Day} from '../../../Utils/Day';
import {REQUEST_CATEGORY_DATA} from '../Category/CategorySlice';
import {RESET_INPUT_DATA} from './ToDoSlice';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 0px;
`;

const ModalView = styled.View`
  /* 모달창 크기 조절 */
  width: 100%;
  height: 105px;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
`;

const Text_Input_Container = styled.TextInput`
  font-family: 'NotoSansKR-Medium';
  font-size: 17px;
  margin-top: 2px;
  height: 50px;
  width: 100%;
  padding: 0px 20px;

  border-radius: 8px;
`;

const Button_View = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 20px;
`;

const Category_Title = styled.Text`
  font-family: 'NotoSansKR-Medium';
  margin-left: 15px;
`;

const ToDOInputModal = ({isOpen, close, categoryName, categoryTime, day}) => {
  const [todoContents, setTodoContents] = useState('');

  const inputRef = useRef();

  const {onClickDay, twelve_HoursTime, onClickPriority, twenty_Four_HoursTime, isNotificationEnabled, inputCategoryData} = useSelector((state) => state.TODO_DATA);
  //const {inputCategoryData} = useSelector((state) => state.CATEGORY_DATA);

  const dispatch = useDispatch();

  const [calendarModalVisible, setcalendarModalVisible] = useState(false);

  const [testBtn, setTestBtn] = useState(false);
  const [categoryBtn, setCategoryBtn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      console.log('!!!!', day);
      Platform.OS === 'ios' ? inputRef.current.focus() : setTimeout(() => inputRef.current.focus(), 40);
    }
  }, [isOpen]);

  const opneModal = () => {
    setcalendarModalVisible(!calendarModalVisible);
  };

  const closeCalendarModal = () => {
    setcalendarModalVisible(false);
  };

  const likeOpen = () => {
    setTestBtn(!testBtn);
    setCategoryBtn(false);
  };

  const CategoryOpen = () => {
    setCategoryBtn(!categoryBtn);
    setTestBtn(false);
  };

  const ModalClose = () => {
    close();
    dispatch(RESET_INPUT_DATA());
    setTestBtn(false);
    setCategoryBtn(false);
  };

  const ToDoInput_Enter = () => {
    const NotifID = Math.floor(Math.random() * 100000);
    const CategoryData = realm.objects('CategoryList');
    const SortCategoryDate = CategoryData.sorted('createTime');

    if (!inputCategoryData && !categoryName) {
      alert('카테고리를 설정 해주세요!');
    } else {
      realm.write(() => {
        let city = realm.create('TodoDataList', {
          createTime: Day(),
          categoryTitle: inputCategoryData ? inputCategoryData.title : categoryName,
          listContent: todoContents,
          listDay: onClickDay ? Number(onClickDay.replace(/-/g, '')) : day && Number(day.replace(/-/g, '')),
          listTime: twelve_HoursTime ? twelve_HoursTime : null,
          listTime_Data: twenty_Four_HoursTime ? twenty_Four_HoursTime : null,
          listPriority: onClickPriority ? onClickPriority : 4,
          id: NotifID,
          listEnabled: isNotificationEnabled,
        });
        let user = realm.create(
          'CategoryList',
          {
            createTime: inputCategoryData ? inputCategoryData.createTime : categoryTime,
          },
          'modified',
        );
        user.todoData.unshift(city);
      });
      const categoryTitle = inputCategoryData ? inputCategoryData.title : categoryName;

      if (onClickDay && twelve_HoursTime && Platform.OS === 'ios' && new Date(IOS_Notif(onClickDay, twenty_Four_HoursTime)) > new Date(IOS_today()) && isNotificationEnabled) {
        Schedule_Notif(onClickDay, twenty_Four_HoursTime, todoContents, NotifID, categoryTitle);
      } else if (
        onClickDay &&
        twelve_HoursTime &&
        Platform.OS === 'android' &&
        new Date(ANDROID_Notif(onClickDay, twenty_Four_HoursTime)).toLocaleString() > new Date(Notif_Day()).toLocaleString() &&
        isNotificationEnabled
      ) {
        Schedule_Notif(onClickDay, twenty_Four_HoursTime, todoContents, NotifID, categoryTitle);
      }
      dispatch({type: MY_CATEGORY_DATA, data: SortCategoryDate});
      dispatch(REQUEST_CATEGORY_DATA(SortCategoryDate));
      setTodoContents('');
    }
  };

  return (
    <>
      <Modal_Container
        style={{opacity: calendarModalVisible ? 0 : 1}}
        useNativeDriverForBackdrop={true}
        animationInTiming={Platform.OS === 'ios' ? 30 : 200}
        animationOutTiming={50}
        backdropOpacity={0.1}
        isVisible={isOpen}
        onBackdropPress={ModalClose}>
        <CalendarModal openModal={calendarModalVisible} closeModal={closeCalendarModal} InputData />
        {testBtn && Platform.OS === 'android' && <Priority_Modal closeModal={() => setTestBtn(false)} />}

        {categoryBtn && Platform.OS === 'android' && <Category_Modal closeModal={() => setCategoryBtn(false)} />}

        <KeyboardAvoidingView style={{width: '100%'}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ModalView>
            <Text_Input_Container style={{includeFontPadding: false}} ref={inputRef} value={todoContents} onChangeText={setTodoContents} placeholder="할일 목록 입력하세요" />
            {testBtn && Platform.OS === 'ios' && <Priority_Modal closeModal={() => setTestBtn(false)} />}

            {categoryBtn && Platform.OS === 'ios' && <Category_Modal closeModal={() => setCategoryBtn(false)} />}

            <Button_View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={opneModal} style={{marginRight: 30}}>
                  <Icon name="calendar" size={23} color={day || onClickDay ? '#75bde0' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={likeOpen} style={{marginRight: 30}}>
                  <Icon name="staro" size={23} color={onClickPriority ? '#e984a2' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={CategoryOpen}
                  style={{
                    marginRight: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Icon name="bars" size={23} color={inputCategoryData ? inputCategoryData.color : 'black'} />
                  <Category_Title style={{includeFontPadding: false}}>{inputCategoryData ? inputCategoryData.title : categoryName}</Category_Title>
                </TouchableOpacity>
              </View>
              <View>
                {todoContents ? (
                  <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={ToDoInput_Enter}>
                    <Icon name="enter" size={23} color={'black'} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
                    <Icon name="enter" size={23} color="gray" />
                  </TouchableOpacity>
                )}
              </View>
            </Button_View>
          </ModalView>
        </KeyboardAvoidingView>
      </Modal_Container>
    </>
  );
};

export default ToDOInputModal;
