import React from 'react';
import {View} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {useSelector, useDispatch} from 'react-redux';

import styled from 'styled-components/native';
import {CategoryListType} from '../category/categoryType';
import {GET_CATEGORY_DATA} from './todoSlice';

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
  font-family: 'NotoSansKR-Medium';
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

// 투두 디테일 페이지에서 카테고리 리스트
// boolean 하니 ToDoItemDetail 타입위반
const ThemeCategoryList = ({hideActionSheet}: {hideActionSheet: () => void}) => {
  const {categoryList} = useSelector((state: any) => state.CATEGORY_DATA);
  const dispatch = useDispatch();

  const Category_Item = ({Category_Data}: CategoryListType) => {
    const Category_Select = () => {
      dispatch(GET_CATEGORY_DATA(Category_Data.item));
      hideActionSheet();
    };

    return (
      <List_Btn onPress={Category_Select}>
        <View style={{height: 20, width: 20, borderRadius: 20, backgroundColor: Category_Data.item.color, marginRight: 20}} />
        <List_Item>
          <List_Text style={{includeFontPadding: false}}>{Category_Data.item.title}</List_Text>
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

export default ThemeCategoryList;
