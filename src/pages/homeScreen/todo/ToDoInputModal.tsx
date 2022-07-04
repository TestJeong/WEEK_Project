import React, {useState, useRef, useEffect, MutableRefObject} from 'react';
import {View, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput} from 'react-native';

import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

import realm, {CategoryType, ToDoType} from '../../../db';
import CalendarModal from '../../calendarScreen/CalendarModal';
import PriorityModal from './PriorityModal';
import {Day, IOS_Notif, IOS_today} from '../../../utils/Day';
import Category_Modal from '../category/Category_Modal';
import {Schedule_Notif} from '../../../utils/notificationHelper';
import {REQUEST_CATEGORY_DATA} from '../category/CategorySlice';
import {RESET_INPUT_DATA} from './ToDoSlice';
import {UpdateMode} from 'realm';
import {ItodoInputModalType} from './todoType';
import {AGENDA_DATA_REQUEST} from '../../calendarScreen/CalendarSlice';

const Modal_Container = styled(Modal as any)`
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

const ToDoInputModal = ({isOpen, close, categoryName, categoryTime, day}: ItodoInputModalType) => {
  const {onClickDay, twelve_HoursTime, onClickPriority, twenty_Four_HoursTime, isNotificationEnabled, inputCategoryData} = useSelector((state: any) => state.TODO_DATA);
  const dispatch = useDispatch();

  const inputRef = useRef<any>();

  const [todoContents, setTodoContents] = useState('');
  const [calendarModalVisible, setcalendarModalVisible] = useState(false);
  const [priorityModalVisible, setPriorityModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      Platform.OS === 'ios' ? inputRef.current.focus() : setTimeout(() => inputRef.current.focus(), 40);
    }
  }, [isOpen]);

  // 캘린더 모달창 open
  const opneModal = () => setcalendarModalVisible(!calendarModalVisible);

  // 캘린더 모달창 close
  const closeCalendarModal = () => setcalendarModalVisible(false);

  // 우선순위 모달창
  const likeOpen = () => {
    setPriorityModalVisible(!priorityModalVisible);
    setCategoryModalVisible(false);
  };

  // 카테고리 모달창
  const CategoryOpen = () => {
    setCategoryModalVisible(!categoryModalVisible);
    setPriorityModalVisible(false);
  };

  // todo modal창 backdrop 클릭시
  const ModalClose = () => {
    close();
    dispatch(RESET_INPUT_DATA());
    setPriorityModalVisible(false);
    setCategoryModalVisible(false);
  };

  // todo 추가
  const onPressEnter = async () => {
    const NotifID = Math.floor(Math.random() * 100000);
    const CategoryData = realm.objects('CategoryList');
    const SortCategoryDate = CategoryData.sorted('id');

    if (!inputCategoryData && !categoryName) {
      alert('카테고리를 설정 해주세요!');
    } else {
      await addToDoItem(NotifID);
      await addNotification(NotifID);

      //dispatch(REQUEST_CATEGORY_DATA(SortCategoryDate));
      dispatch(RESET_INPUT_DATA());
      setTodoContents('');
    }
  };

  // todo item 추가
  const addToDoItem = (notifID: number) => {
    realm.write(() => {
      let todoItem = realm.create<ToDoType>('TodoDataList', {
        createTime: Day(),
        categoryTitle: inputCategoryData ? inputCategoryData.title : categoryName,
        listContent: todoContents,
        listDay: onClickDay ? Number(onClickDay.replace(/-/g, '')) : day && Number(day.replace(/-/g, '')),
        listTime: twelve_HoursTime ? twelve_HoursTime : null,
        listTime_Data: twenty_Four_HoursTime ? twenty_Four_HoursTime : null,
        listPriority: onClickPriority ? onClickPriority : 4,
        id: notifID,
        listEnabled: isNotificationEnabled,
      });
      let categoryItem = realm.create<CategoryType>(
        'CategoryList',
        {
          createTime: inputCategoryData ? inputCategoryData.createTime : categoryTime,
        },
        UpdateMode.Modified,
      );
      categoryItem.todoData.unshift(todoItem);
    });
    dispatch(AGENDA_DATA_REQUEST(onClickDay ? onClickDay : day));
    console.log('addToDoItem =====>', onClickDay);
  };

  // notification 추가
  const addNotification = (notifID: number) => {
    const categoryTitle = inputCategoryData ? inputCategoryData.title : categoryName;
    const timeCheck = new Date(IOS_Notif(onClickDay, twenty_Four_HoursTime)) > new Date(IOS_today());

    if (onClickDay && twelve_HoursTime && timeCheck && isNotificationEnabled) {
      Schedule_Notif({onClickDay, timeString: twenty_Four_HoursTime, todoContents, NotifID: notifID, categoryTitle});
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
        {priorityModalVisible && Platform.OS === 'android' && <PriorityModal closeModal={() => setPriorityModalVisible(false)} />}
        {categoryModalVisible && Platform.OS === 'android' && <Category_Modal closeModal={() => setCategoryModalVisible(false)} />}

        <KeyboardAvoidingView style={{width: '100%'}} behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ModalView>
            <Text_Input_Container style={{includeFontPadding: false}} ref={inputRef} value={todoContents} onChangeText={setTodoContents} placeholder="할일 목록 입력하세요" />
            {priorityModalVisible && Platform.OS === 'ios' && <PriorityModal closeModal={() => setPriorityModalVisible(false)} />}
            {categoryModalVisible && Platform.OS === 'ios' && <Category_Modal closeModal={() => setCategoryModalVisible(false)} />}

            <Button_View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={opneModal} style={{marginRight: 30}}>
                  <Icon name="calendar" size={23} color={day || onClickDay ? '#75bde0' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={likeOpen} style={{marginRight: 30}}>
                  <Icon name="staro" size={23} color={onClickPriority ? '#e984a2' : 'black'} />
                </TouchableOpacity>

                <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={CategoryOpen} style={{marginRight: 30, flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="bars" size={23} color={inputCategoryData ? inputCategoryData.color : 'black'} />
                  <Category_Title style={{includeFontPadding: false}}>{inputCategoryData ? inputCategoryData.title : categoryName}</Category_Title>
                </TouchableOpacity>
              </View>
              <View>
                {todoContents ? (
                  <TouchableOpacity hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} onPress={onPressEnter}>
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

export default ToDoInputModal;
