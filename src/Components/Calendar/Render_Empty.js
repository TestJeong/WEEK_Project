import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const View_Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Main_Text = styled.Text`
  font-size: 17px;
  margin-top: 40px;
  margin-bottom: 14px;
`;

const Sub_Text = styled.Text`
  font-size: 14px;
  color: #b0b0b2;
`;

const Touch = () => {
  alert('hello');
};

const Render_Empty = () => {
  return (
    <View_Container>
      <TouchableOpacity onPress={Touch}>
        <Icon name="addfile" size={110} color={'#999b84'} />
      </TouchableOpacity>

      <Main_Text>오늘 정말 할일이 없나요?</Main_Text>
      <Sub_Text>하고 싶은게 있다면 추가하세요!</Sub_Text>
    </View_Container>
  );
};

export default Render_Empty;
