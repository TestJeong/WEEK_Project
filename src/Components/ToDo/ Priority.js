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

const Priority_Modal = ({closeModal}) => {
  const Close_Modal = () => {
    closeModal();
  };
  return (
    <Container style={styles.container}>
      <TouchableOpacity onPress={Close_Modal}>
        <Text style={{color: 'red'}}>!!! 높은 우선도</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Close_Modal}>
        <Text style={{color: 'blue'}}>!! 중간 우선도</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Close_Modal}>
        <Text style={{color: 'green'}}>! 낮은 우선도</Text>
      </TouchableOpacity>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
  },
});

export default Priority_Modal;
