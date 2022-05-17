import React from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {GET_CATEGORY_DATA} from '../todo/todoSlice';

const Container = styled.View`
  border-radius: 10px;
  display: flex;
  position: absolute;
  bottom: 135px;
  background-color: white;
  height: 200px;
  width: 190px;
  align-items: flex-start;
  padding: 15px;
`;

const List_Item = styled.View`
  flex-direction: row;
`;

const List_Text = styled.Text`
  font-size: 15px;
  font-family: 'NotoSansKR-Bold';
`;

const Category_Modal = ({closeModal}: any) => {
  const {categoryList} = useSelector((state: any) => state.CATEGORY_DATA);

  const dispatch = useDispatch();

  const Category_Item = ({Category_Data}: any) => {
    const Category_Select = () => {
      dispatch(GET_CATEGORY_DATA(Category_Data.item));
      closeModal();
    };

    return (
      <TouchableOpacity onPress={Category_Select} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View style={{height: 20, width: 20, borderRadius: 20, backgroundColor: Category_Data.item.color, marginRight: 8}} />
        <List_Item>
          <List_Text>{Category_Data.item.title}</List_Text>
        </List_Item>
      </TouchableOpacity>
    );
  };

  return (
    <Container style={styles.container}>
      <FlatList
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
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.46,
    shadowRadius: 1.14,
    elevation: 16,
  },
});

export default Category_Modal;
