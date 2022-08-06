import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

const Header__Container = styled.View`
  width: 100%;
  height: 50px;
  padding: 0px 10px;
  background-color: ${(props) => props.color};
`;

const Header__Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Arrow__Button__Container = styled.TouchableOpacity``;

const Title__Text = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const Header = ({title, color, saveIcon = false}: any) => {
  const navigation = useNavigation();
  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: color}} />
      <SafeAreaView>
        <Header__Container color={color}>
          <Header__Content>
            <Arrow__Button__Container onPress={onPressBack}>
              <Icon name="left" size={20} />
            </Arrow__Button__Container>
            <Title__Text>{title}</Title__Text>
            <Arrow__Button__Container>
              <Icon name="save" size={24} color={saveIcon ? 'black' : 'transparent'} />
            </Arrow__Button__Container>
          </Header__Content>
        </Header__Container>
      </SafeAreaView>
    </>
  );
};

export default Header;
