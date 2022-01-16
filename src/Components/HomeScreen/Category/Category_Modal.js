import React from 'react';
import {TextInput, View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {CLICK_CATEGORY_INPUT} from '../../../reducers/Catagory';

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
  font-family: 'NanumGothic';
`;

const Category_Modal = ({closeModal}) => {
  const {categoryList} = useSelector((state) => state.Catagory);

  const dispatch = useDispatch();

  const Category_Item = ({Category_Data}) => {
    const Category_Select = () => {
      dispatch({type: CLICK_CATEGORY_INPUT, data: Category_Data.item});
      closeModal();
    };

    return (
      <TouchableOpacity onPress={Category_Select} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View
          style={{
            height: 20,
            width: 20,
            borderRadius: 20,
            backgroundColor: Category_Data.item.color,
            marginRight: 8,
          }}
        />
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
