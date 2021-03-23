import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import styled from 'styled-components/native';

import realm from '../../db';
import CalendarModal from '../../Components/ToDo/CalendarModal';
import Priority_Modal from './ Priority';
import {Day} from '../Day';
import {
  MY_CATEGORY_DATA,
  CLICK_DAY,
  CLICK_PRIORITY,
} from '../../reducers/Catagory';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 0px;
`;

const ModalView = styled.View`
  /* 모달창 크기 조절 */
  width: 100%;
  height: 130px;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
`;

const Text_Input_Container = styled.TextInput`
  font-size: 17px;
  margin-top: 5px;
  height: 50px;
  width: 90%;

  border-radius: 8px;
`;

const Button_View = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
`;

const Input_Title = styled.Text`
  font-size: 16px;
  margin-right: 20px;
  font-weight: 600;
`;

const ToDOInputModal = ({isOpen, close, categoryName, categoryTime}) => {
  const [todoContents, setTodoContents] = useState('');

  const inputRef = useRef();

  const {onClickDay, onClickTime, onClickPriority} = useSelector(
    (state) => state.Catagory,
  );
  const dispatch = useDispatch();

  const [calendarModalVisible, setcalendarModalVisible] = useState(false);

  const [testBtn, setTestBtn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      Platform.OS === 'ios'
        ? inputRef.current.focus()
        : setTimeout(() => inputRef.current.focus(), 20);
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
  };

  const ModalClose = () => {
    close();
    dispatch({type: CLICK_DAY, data: null});
    dispatch({type: CLICK_PRIORITY, data: null});
    setTestBtn(false);
  };

  const ToDoInput_Enter = () => {
    const CategoryData = realm.objects('CategoryList');
    const SortCategoryDate = CategoryData.sorted('createTime');
    realm.write(() => {
      let city = realm.create(
        'TodoDataList',
        {
          createTime: Day(),
          categoryTitle: categoryName,
          listContent: todoContents,
          listDay: onClickDay ? onClickDay : null,
          listTime: onClickTime ? onClickTime : null,
          listPriority: onClickPriority ? onClickPriority : null,
        },
        true,
      );
      let user = realm.create(
        'CategoryList',
        {
          createTime: categoryTime,
        },
        true,
      );
      user.todoData.unshift(city);
    });
    dispatch({type: MY_CATEGORY_DATA, data: SortCategoryDate});

    setTodoContents('');
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
        <CalendarModal
          openModal={calendarModalVisible}
          closeModal={closeCalendarModal}
        />
        {testBtn && Platform.OS === 'android' && (
          <Priority_Modal closeModal={() => setTestBtn(false)} />
        )}

        <KeyboardAvoidingView
          style={{width: '100%'}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ModalView>
            <Text_Input_Container
              ref={inputRef}
              value={todoContents}
              onChangeText={setTodoContents}
              placeholder="할일 목록 입력하세요"
            />
            {testBtn && Platform.OS === 'ios' && (
              <Priority_Modal closeModal={() => setTestBtn(false)} />
            )}
            <Button_View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={opneModal} style={{marginRight: 30}}>
                  <Icon
                    name="calendar"
                    size={23}
                    color={onClickDay ? '#75bde0' : 'black'}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={likeOpen} style={{marginRight: 30}}>
                  <Icon
                    name="staro"
                    size={23}
                    color={onClickPriority ? '#e984a2' : 'black'}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
                  onPress={ToDoInput_Enter}>
                  <Icon name="enter" size={23} />
                </TouchableOpacity>
              </View>
            </Button_View>
          </ModalView>
        </KeyboardAvoidingView>
      </Modal_Container>
    </>
  );
};

export default ToDOInputModal;
