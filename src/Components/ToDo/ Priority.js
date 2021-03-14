import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

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
  font-size: 15px;
  font-weight: 600;
`;

const Priority_Modal = ({closeModal}) => {
  const Close_Modal = () => {
    closeModal();
  };
  return (
    <Container style={styles.container}>
      <Priority_Btn onPress={Close_Modal}>
        <Icon_View>
          <Icon name="star" size={12} color={'pink'} />
        </Icon_View>

        <Priority_Text>낮은 우선도</Priority_Text>
      </Priority_Btn>

      <Priority_Btn onPress={Close_Modal}>
        <Icon_View>
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
        </Icon_View>
        <Priority_Text>중간 우선도</Priority_Text>
      </Priority_Btn>

      <Priority_Btn onPress={Close_Modal}>
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
