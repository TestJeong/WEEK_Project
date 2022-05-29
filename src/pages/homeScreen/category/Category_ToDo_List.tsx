import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView, Keyboard} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import ToDoInputModal from '../todo/ToDoInputModal';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';
import ToDoItem from '../todo/ToDoItem';
import {Today} from '@/utils/Day';
import {RootStackParamList} from '@/navgation/StackNavigator';
import {Edit_Schedule_Notif} from '@/utils/notificationHelper';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
  height: 100%;
`;

const Category_ToDo_List = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'Category_ToDoList'>>();

  const [isModalVisible, setModalVisible] = useState(false);
  const [today, setToday] = useState(null);
  const {mainCategoryData, categoryList} = useSelector((state: any) => state.CATEGORY_DATA);
  const {todoData} = useSelector((state: any) => state.TODO_DATA);

  useEffect(() => {
    Edit_Schedule_Notif();
  }, [categoryList, todoData]);

  useLayoutEffect(() => {
    navigation.setOptions({title: route.params.header_Name});
  }, []);

  const opneModal = useCallback(() => {
    setModalVisible(!isModalVisible);
    if (route.params.header_Name === '오늘의 일정') {
      setToday(Today());
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    Keyboard.dismiss();
  }, []);

  return (
    <>
      <ToDoInputModal isOpen={isModalVisible} close={closeModal} categoryName={null} categoryTime={null} day={today} />
      <View>
        <FlatListView keyExtractor={(item, index) => '#' + index} data={mainCategoryData} renderItem={(item) => <ToDoItem data={item} listName={true} />} />
      </View>
      <TouchableOpacity activeOpacity={0.5} onPress={opneModal} style={[styles.touchableOpacityStyle, {backgroundColor: 'blue'}]}>
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
