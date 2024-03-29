import React, {useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {CLICK_PRIORITY} from '../../reducers/Catagory';

const Container = styled.View`
  border-radius: 10px;
  display: flex;
  position: absolute;
  bottom: 135px;
  background-color: white;
  height: 180px;
  width: 150px;
  align-items: center;
  justify-content: space-around;
`;

const Priority_Btn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px 15px;
`;

const Icon_View = styled.View`
  flex-direction: row;

  justify-content: center;
  width: 35%;
`;

const Priority_Text = styled.Text`
  font-size: 14px;
  font-family: 'NanumGothicBold';
`;

const Priority_Modal = ({closeModal}) => {
  const dispatch = useDispatch();

  const Highest_Priority = useCallback(() => {
    dispatch({type: CLICK_PRIORITY, data: 3});
    closeModal();
  });

  const Medium_Priority = useCallback(() => {
    dispatch({type: CLICK_PRIORITY, data: 2});
    closeModal();
  });

  const Low_Priority = useCallback(() => {
    dispatch({type: CLICK_PRIORITY, data: 1});
    closeModal();
  });

  const Never_Priority = useCallback(() => {
    dispatch({type: CLICK_PRIORITY, data: 4});
    closeModal();
  });

  return (
    <Container style={styles.container}>
      <Priority_Btn onPress={Never_Priority}>
        <Icon_View></Icon_View>

        <Priority_Text>우선도 없음</Priority_Text>
      </Priority_Btn>

      <Priority_Btn onPress={Low_Priority}>
        <Icon_View>
          <Icon name="star" size={12} color={'pink'} />
        </Icon_View>

        <Priority_Text>낮은 우선도</Priority_Text>
      </Priority_Btn>

      <Priority_Btn onPress={Medium_Priority}>
        <Icon_View>
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
        </Icon_View>
        <Priority_Text>중간 우선도</Priority_Text>
      </Priority_Btn>

      <Priority_Btn onPress={Highest_Priority}>
        <Icon_View>
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
        </Icon_View>
        <Priority_Text>높은 우선도</Priority_Text>
      </Priority_Btn>
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

export default Priority_Modal;
