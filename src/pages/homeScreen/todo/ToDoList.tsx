import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import ToDoInputModal from './ToDoInputModal';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import ToDoItem from './ToDoItem';
import realm from '@/db';
import {Edit_Schedule_Notif} from '@/utils/notificationHelper';
import {useCallback} from 'react';
import {Realm_TodoDataList} from '@/utils/realmHelper';
import {firebase_db} from '@/../service/firebaseConfig';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const ToDoList = ({route}: any) => {
  const {categoryName, categoryTime} = route.params;
  const IsFocuse = useIsFocused();

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [todoDataItem, setTodoDataItem] = useState<any>([]);
  const {categoryList, selectedCategory} = useSelector((state: any) => state.CATEGORY_DATA);
  const {todoData} = useSelector((state: any) => state.TODO_DATA);

  useEffect(() => {
    firebase_db
      .ref('/hey')
      .once('value')
      .then((snapshot) => {
        console.log('User data: ', snapshot.val());
      });

    if (IsFocuse) {
      const FilterTodoDataList = Realm_TodoDataList.filtered('categoryTitle == $0', categoryName);
      const SortTodoList = FilterTodoDataList.sorted('createTime', true);
      setTodoDataItem(SortTodoList);
      console.log('??1121', IsFocuse);
    }
  }, [IsFocuse, categoryList]);

  useEffect(() => {
    Edit_Schedule_Notif();
  }, [categoryList, todoData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerStyle: {
        backgroundColor: selectedCategory.color,
      },
    });
  }, [categoryName, selectedCategory]);

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <ToDoInputModal isOpen={isModalVisible} close={closeModal} categoryName={categoryName} categoryTime={categoryTime} />
      <View>
        <FlatListView keyExtractor={(item, index) => '#' + index} data={todoDataItem} renderItem={(item) => <ToDoItem data={item} listName={false} />} />
      </View>
      <TouchableOpacity hitSlop={{top: 5, bottom: 5, left: 5, right: 5}} activeOpacity={0.5} onPress={opneModal} style={[styles.touchableOpacityStyle, {backgroundColor: selectedCategory.color}]}>
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
