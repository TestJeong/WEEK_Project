import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import Modal from 'react-native-modal';
import styled from 'styled-components/native';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;

const ModalView = styled.View`
  /* 모달창 크기 조절 */
  width: 100%;
  height: 90%;

  border-radius: 10px;
  background-color: white;
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
  align-items: center;
  justify-content: space-around;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 800;
`;

const Category_Modal_View = ({isOpen, close}) => {
  return (
    <Modal_Container isVisible={isOpen} onBackdropPress={close}>
      <ModalView>
        <Button_View>
          <TouchableOpacity
            onPress={close}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
        </Button_View>
      </ModalView>
    </Modal_Container>
  );
};

export default Category_Modal_View;
