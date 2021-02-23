import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

import CalendarModal from '../../Components/ToDo/CalendarModal';
import styled from 'styled-components/native';

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
  padding: 15px 20px;
`;

const Input_Title = styled.Text`
  font-size: 16px;
  margin-right: 20px;
  font-weight: 600;
`;

const ToDOInputModal = ({isOpen, close}) => {
  const [categoryTitle, setcategoryTitle] = useState('');
  const inputRef = useRef();

  const [calendarModalVisible, setcalendarModalVisible] = useState(false);

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

  return (
    <>
      <Modal_Container
        style={{opacity: calendarModalVisible ? 0 : 1}}
        useNativeDriverForBackdrop={true}
        animationInTiming={Platform.OS === 'ios' ? 30 : 200}
        animationOutTiming={50}
        backdropOpacity={0.2}
        isVisible={isOpen}
        onBackdropPress={close}>
        <CalendarModal
          openModal={calendarModalVisible}
          closeModal={closeCalendarModal}
        />
        <KeyboardAvoidingView
          style={{width: '100%'}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <ModalView>
            <Text_Input_Container
              ref={inputRef}
              value={categoryTitle}
              onChangeText={setcategoryTitle}
              placeholder="카테고리 제목을 입력하세요"
            />
            <Button_View>
              <TouchableOpacity onPress={opneModal}>
                <Input_Title>캘린더</Input_Title>
              </TouchableOpacity>
              <TouchableOpacity>
                <Input_Title>라벨</Input_Title>
              </TouchableOpacity>
              <TouchableOpacity>
                <Input_Title>우선순위</Input_Title>
              </TouchableOpacity>
            </Button_View>
          </ModalView>
        </KeyboardAvoidingView>
      </Modal_Container>
    </>
  );
};

export default ToDOInputModal;
