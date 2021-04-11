import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ToDoInputModal from '../ToDo/ToDo_Input_Modal';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import ToDo_List_View from './ToDo_List_View';
import {MY_CATEGORY_DATA} from '../../reducers/Catagory';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const ToDoList = ({route}) => {
  const {categoryName, categoryTime} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isModalVisible, setModalVisible] = useState(false);
  const {clickCategory} = useSelector((state) => state.Catagory);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            letterSpacing: 1.5,
            color: 'white',
            fontSize: 17,
            fontFamily: 'NanumSquareEB',
            lineHeight: 20,
          }}>
          {categoryName}
        </Text>
      ),
      headerStyle: {
        backgroundColor: clickCategory.color,
      },
    });
  }, [categoryName, clickCategory]);

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <ToDoInputModal
        isOpen={isModalVisible}
        close={closeModal}
        categoryName={categoryName}
        categoryTime={categoryTime}
      />
      <View>
        <FlatListView
          keyExtractor={(item, index) => '#' + index}
          data={clickCategory.todoData}
          renderItem={(item) => <ToDo_List_View data={item} ListName={false} />}
        />
      </View>
      <TouchableOpacity
        hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
        activeOpacity={0.5}
        onPress={opneModal}
        style={[
          styles.touchableOpacityStyle,
          {backgroundColor: clickCategory.color},
        ]}>
        <Icon name="plus" color={'white'} size={30} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,

    borderRadius: 100,
  },
});

export default ToDoList;
