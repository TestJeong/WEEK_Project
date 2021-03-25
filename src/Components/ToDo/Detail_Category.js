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
import {CLICK_CATEGORY_INPUT} from '../../reducers/Catagory';

import styled from 'styled-components/native';

const Container = styled.View`
  border-radius: 10px;
  padding: 30px 30px;
  display: flex;
  bottom: 0px;
  background-color: white;
  height: 300px;
  width: 100%;
  align-items: flex-start;
  justify-content: space-around;
`;

const List_Item = styled.View`
  flex-direction: row;
`;

const List_Text = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const List_Btn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid #cad0d4;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const Detail_Category = ({hideActionSheet}) => {
  const {categoryList} = useSelector((state) => state.Catagory);
  const dispatch = useDispatch();

  const Category_Item = ({Category_Data}) => {
    const Category_Select = () => {
      dispatch({type: CLICK_CATEGORY_INPUT, data: Category_Data.item});
      hideActionSheet();
    };

    return (
      <List_Btn onPress={Category_Select}>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: Category_Data.item.color,
            marginRight: 20,
          }}
        />
        <List_Item>
          <List_Text>{Category_Data.item.title}</List_Text>
        </List_Item>
      </List_Btn>
    );
  };

  return (
    <Container>
      <FlatList
        style={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item, index) => '#' + index}
        data={categoryList}
        renderItem={(item) => <Category_Item Category_Data={item} />}
      />
    </Container>
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

export default Detail_Category;
