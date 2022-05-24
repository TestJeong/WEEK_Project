import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {SELETCTED_PRIORITY} from './todoSlice';

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
// boolean 하니 ToDoItemDeail 타입 위반
const Detail_Priorty = ({hideActionSheet}: {hideActionSheet: () => void}) => {
  const dispatch = useDispatch();

  const Highest_Priority = () => {
    dispatch(SELETCTED_PRIORITY(3));
    hideActionSheet();
  };

  const Medium_Priority = () => {
    dispatch(SELETCTED_PRIORITY(2));
    hideActionSheet();
  };

  const Low_Priority = () => {
    dispatch(SELETCTED_PRIORITY(1));
    hideActionSheet();
  };

  const Never_Priority = () => {
    dispatch(SELETCTED_PRIORITY(4));
    hideActionSheet();
  };

  return (
    <Container>
      <Priority_Btn onPress={Never_Priority}>
        <Icon name="staro" size={20} color={'pink'} />
      </Priority_Btn>

      <Priority_Btn onPress={Low_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>
      </Priority_Btn>

      <Priority_Btn onPress={Medium_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>
      </Priority_Btn>

      <Priority_Btn onPress={Highest_Priority}>
        <Icon_View>
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
          <Icon name="star" size={20} color={'pink'} />
        </Icon_View>
      </Priority_Btn>
    </Container>
  );
};

export default Detail_Priorty;
