import React, {useLayoutEffect, useState, useEffect, useCallback} from 'react';
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
import ToDoInputModal from '../ToDo/ToDo_Input_Modal.js';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import ToDo_List_View from '../ToDo/ToDo_List_View';
import {increment, testcode, loginAction} from '../../reducers/toolkit';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const Category_ToDo_List = ({route}) => {
  const navigation = useNavigation();

  const {header_Name} = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const {Click_Category_ToDo} = useSelector((state) => state.Catagory); //툴킷 예시
  /*  const {count} = useSelector((state) => state.counter); */ const dispatch = useDispatch();

  useEffect(() => {
    console.log(count);
    dispatch(increment(10));
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontWeight: '800',
            fontFamily: 'NanumGothicBold',
            fontSize: 17,
          }}>
          {header_Name}
        </Text>
      ),
    });
  }, []);

  const opneModal = useCallback(() => {
    setModalVisible(!isModalVisible);
  });

  const closeModal = useCallback(() => {
    setModalVisible(false);
    Keyboard.dismiss();
  });

  return (
    <>
      <ToDoInputModal isOpen={isModalVisible} close={closeModal} />
      <View>
        <FlatListView
          keyExtractor={(item, index) => '#' + index}
          data={Click_Category_ToDo}
          renderItem={(item) => <ToDo_List_View data={item} ListName={true} />}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={opneModal}
        style={[styles.touchableOpacityStyle, {backgroundColor: 'blue'}]}>
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

export default Category_ToDo_List;
