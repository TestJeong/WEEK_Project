import React, {useLayoutEffect, useState, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import ToDoInputModal from './ToDoInputModal';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import ToDoItem from './ToDoItem';
import {Edit_Schedule_Notif} from '@/utils/notificationHelper';
import {Realm_TodoDataList} from '@/utils/realmHelper';
import {AGENDA_DATA_REQUEST} from '../../calendarScreen/CalendarSlice';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const Floating__Plus__Button = styled.TouchableOpacity`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 30px;
  bottom: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////

const ToDoList = () => {
  const router = useRoute<any>();
  const {categoryName, categoryTime} = router.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const FilterTodoDataList = Realm_TodoDataList.filtered('categoryTitle == $0', categoryName);
  const SortTodoList = FilterTodoDataList.sorted('createTime', true);

  const [isModalVisible, setModalVisible] = useState(false);
  const [todoDataItem, setTodoDataItem] = useState<any>([]);
  const {categoryList, selectedCategory} = useSelector((state: any) => state.CATEGORY_DATA);

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
    dispatch(AGENDA_DATA_REQUEST('2022-07-04'));
  }, [categoryList, todoDataItem]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryName,
      headerStyle: {
        backgroundColor: selectedCategory.color,
      },
    });
  }, [categoryName, selectedCategory]);

  const onPressAddTodoModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressCloseTodoModal = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  return (
    <>
      <ToDoInputModal isOpen={isModalVisible} close={onPressCloseTodoModal} categoryName={categoryName} categoryTime={categoryTime} />
      <View>
        <FlatListView keyExtractor={(item, index) => '#' + index} data={todoDataItem} renderItem={(item) => <ToDoItem data={item} listName={false} />} />
      </View>
      <Floating__Plus__Button hitSlop={{top: 5, bottom: 5, left: 5, right: 5}} activeOpacity={0.5} onPress={onPressAddTodoModal} style={[{backgroundColor: selectedCategory.color}]}>
        <Icon name="plus" color={'white'} size={30} />
      </Floating__Plus__Button>
    </>
  );
};

export default ToDoList;
