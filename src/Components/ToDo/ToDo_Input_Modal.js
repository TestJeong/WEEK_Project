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
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

import CalendarModal from '../../Components/ToDo/CalendarModal';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

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

const PPmodal = styled.View`
  display: ${(props) => (props.momo === true ? 'flex' : 'none')};
  position: ${(props) =>
    Platform.OS === 'android' ? 'relative' : 'absolute '};
  left: 50%;
  bottom: 100px;
  background-color: green;
  height: 180px;
  width: 150px;
  align-items: center;
  justify-content: center;
`;

const ToDOInputModal = ({isOpen, close}) => {
  const [categoryTitle, setcategoryTitle] = useState('');
  const inputRef = useRef();

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

  const menu = useRef();

  const hideMenu = () => menu.current.hide();

  const showMenu = () => menu.current.show();

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
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={opneModal} style={{marginRight: 30}}>
                  <Icon name="calendar" size={23} />
                </TouchableOpacity>

                <PPmodal momo={testBtn}>
                  <Text>Hell</Text>
                </PPmodal>
                <TouchableOpacity onPress={likeOpen} style={{marginRight: 30}}>
                  <Icon name="like2" size={23} />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Icon name="tago" size={23} />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    display: 'none',
    position: 'absolute',
    left: '50%',
    bottom: 100,
    backgroundColor: 'green',
    height: 180,
    width: 150,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToDOInputModal;
