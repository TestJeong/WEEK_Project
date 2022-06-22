import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ToDoInputModal from './ToDoInputModal';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import ToDoItem from './ToDoItem';
import {Edit_Schedule_Notif} from '@/utils/notificationHelper';
import {Realm_TodoDataList} from '@/utils/realmHelper';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const ToDoList = ({route}: any) => {
  const {categoryName, categoryTime} = route.params;

  const FilterTodoDataList = Realm_TodoDataList.filtered('categoryTitle == $0', categoryName);
  const SortTodoList = FilterTodoDataList.sorted('createTime', true);

  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [todoDataItem, setTodoDataItem] = useState<any>([]);
  const {categoryList, selectedCategory} = useSelector((state: any) => state.CATEGORY_DATA);
  const {todoData} = useSelector((state: any) => state.TODO_DATA);

  useEffect(() => {
    SortTodoList.addListener(() => {
      setTodoDataItem([...SortTodoList]);
    });

    return () => {
      SortTodoList.removeAllListeners();
    };
  }, []);

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
