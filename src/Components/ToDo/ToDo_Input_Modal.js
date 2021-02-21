import React, {useState, useRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native';

import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
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
  height: 150px;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
`;

const Text_Input_Container = styled.TextInput`
  font-size: 17px;
  margin-top: 10px;
  height: 50px;
  width: 90%;

  border-radius: 8px;
`;

const Button_View = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Modal_Title = styled.Text`
  font-size: 17px;
  font-weight: 800;
`;

const ToDOInputModal = ({isOpen, close}) => {
  const [categoryTitle, setcategoryTitle] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      Platform.OS === 'ios'
        ? inputRef.current.focus()
        : setTimeout(() => inputRef.current.focus(), 20);
    }
  }, [isOpen]);

  return (
    <Modal_Container
      animationInTiming={Platform.OS === 'ios' ? 30 : 200}
      animationOutTiming={50}
      backdropOpacity={0.5}
      isVisible={isOpen}
      onBackdropPress={close}>
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
        </ModalView>
      </KeyboardAvoidingView>
    </Modal_Container>
  );
};

export default ToDOInputModal;
