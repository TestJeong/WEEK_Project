import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Linking,
  Button,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';

const Cir = styled.View`
  width: 20px;
  height: 20px;
  background-color: #ffc259;
  border-radius: 50px;

  margin-right: 20px;
`;

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-top: 25px;
`;

const BtnText = styled.Text`
  color: #1c85e8;

  font-size: 20px;
  font-family: 'NanumGothic';
`;

const Setting = () => {
  const LinkEmail = () => {
    Linking.openURL('mailto:jyunj3015@gmail.com');
  };
  return (
    <SafeAreaView style={{flex: 1, margin: 10}}>
      <Container>
        <Btn onPress={LinkEmail}>
          <Cir />
          <BtnText>문의사항</BtnText>
        </Btn>
      </Container>
    </SafeAreaView>
  );
};

export default Setting;
