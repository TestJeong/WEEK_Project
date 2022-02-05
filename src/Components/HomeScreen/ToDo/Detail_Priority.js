import React from 'react';
import {TextInput, View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {CLICK_PRIORITY} from '../../../reducers/Catagory';
import {SELETCTED_PRIORITY} from './ToDoSlice';

const Container = styled.View`
  border-radius: 10px;
  padding: 30px 10px;
  display: flex;
  bottom: 0px;
  background-color: white;
  height: 300px;
  width: 100%;
  align-items: center;
  justify-content: space-around;
`;

const Priority_Btn = styled.TouchableOpacity`
  border: 1px solid #cad0d4;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const Icon_View = styled.View`
  flex-direction: row;
  justify-content: center;

  width: 25%;
`;

const Detail_Priorty = ({hideActionSheet}) => {
  const dispatch = useDispatch();

  const Highest_Priority = () => {
    //  dispatch({type: CLICK_PRIORITY, data: 3});
    dispatch(SELETCTED_PRIORITY(3));
    hideActionSheet();
  };

  const Medium_Priority = () => {
    // dispatch({type: CLICK_PRIORITY, data: 2});
    dispatch(SELETCTED_PRIORITY(2));
    hideActionSheet();
  };

  const Low_Priority = () => {
    //  dispatch({type: CLICK_PRIORITY, data: 1});
    dispatch(SELETCTED_PRIORITY(1));
    hideActionSheet();
  };

  const Never_Priority = () => {
    // dispatch({type: CLICK_PRIORITY, data: 4});
    dispatch(SELETCTED_PRIORITY(4));
    hideActionSheet();
  };

  return (
    <Container>
      <Priority_Btn onPress={Never_Priority}>
        <Icon name="staro" size={20} color={'pink'} />
        {/* <Priority_Text>우선도 없음</Priority_Text> */}
      </Priority_Btn>

      <Priority_Btn onPress={Low_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>

        {/* <Priority_Text>낮은 우선도</Priority_Text> */}
      </Priority_Btn>

      <Priority_Btn onPress={Medium_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>
        {/* <Priority_Text>중간 우선도</Priority_Text> */}
      </Priority_Btn>

      <Priority_Btn onPress={Highest_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>
        {/*  <Priority_Text>높은 우선도</Priority_Text> */}
      </Priority_Btn>
    </Container>
  );
};

export default Detail_Priorty;
