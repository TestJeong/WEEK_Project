import React, {useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import CalendarModal from './CalendarModal';

const ToDoList_Detail = ({navigation}) => {
  const {onClickToDoList} = useSelector((state) => state.Catagory);
  const [todoTitle, setToDoTitle] = useState(onClickToDoList.listContent);
  const [calendarModalVisible, setcalendarModalVisible] = useState(false);

  const openCalendar = () => {
    setcalendarModalVisible(!calendarModalVisible);
  };

  const closeCalendarModal = () => {
    setcalendarModalVisible(false);
  };

  const SaveBtn = () => {
    alert('TT');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {marginRight: 20},
      headerRight: () => <Icon onPress={SaveBtn} name="save" size={23} />,
    });
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{padding: 15, height: '100%'}}>
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
          <TouchableOpacity onPress={openCalendar}>
            <Text>afdsfsdf</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ToDoList_Detail;
