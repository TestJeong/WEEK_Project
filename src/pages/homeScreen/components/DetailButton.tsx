import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

const Time_Input_Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: white;
  margin-bottom: 30px;
  border-radius: 20px;
`;

const Time_Input_Containera = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  background-color: white;
  margin-bottom: 30px;
  border-radius: 20px;
`;

const Time_Icon_Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const List_Text = styled.Text`
  font-family: 'NotoSansKR-Medium';
  margin-left: 15px;
  font-size: 16px;
`;

const List_Text_Value = styled.Text`
  font-family: 'NotoSansKR-Medium';
  font-size: 16px;
  align-items: center;
  padding: 0;
`;

// 함수
// 아이콘
// 타이틀
// 내용
// 화살표 여부

const checkIcon = (iconName: string) => {
  switch (iconName) {
    case 'bars':
      return <Icon name="bars" size={23} color={'#be8bdc'} />;
    case 'calendar':
      return <Icon name="calendar" size={23} color={'#75bde0'} />;
    case 'clockcircleo':
      return <Icon name="clockcircleo" size={23} color={'#b9cc95'} />;
    case 'staro':
      return <Icon name="staro" size={23} color={'#f89b9b'} />;
    case 'notification':
      return <Icon name="notification" size={23} color={'#ffa646'} />;

    default:
      break;
  }
};

export const DetailButton = ({onPressBtn, title, iconName, isArrow = true, children}: any) => {
  return (
    <Time_Input_Containera>
      <TouchableOpacity style={{flexDirection: 'row', flex: 1, alignItems: 'center', height: '100%'}} onPress={onPressBtn}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
          <Time_Icon_Container>
            {checkIcon(iconName)}
            <List_Text style={{includeFontPadding: false}}>{title}</List_Text>
          </Time_Icon_Container>
          <List_Text_Value style={{includeFontPadding: false}}> {children} &nbsp;</List_Text_Value>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="right" size={15} />
      </TouchableOpacity>
    </Time_Input_Containera>
  );
};

export const DetailTimeButton = ({onPressBtn, title, iconName, children, timeSheet, deleteFunc}: any) => {
  return (
    <Time_Input_Containera>
      <TouchableOpacity style={{flexDirection: 'row', flex: 1, alignItems: 'center', height: '100%'}} onPress={onPressBtn}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
          <Time_Icon_Container>
            {checkIcon(iconName)}
            <List_Text style={{includeFontPadding: false}}>{title}</List_Text>
          </Time_Icon_Container>
          <List_Text_Value style={{includeFontPadding: false}}> {children} &nbsp;</List_Text_Value>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteFunc}>{timeSheet ? <Icon name="close" size={19} color="red" /> : <Icon name="right" size={15} />}</TouchableOpacity>
    </Time_Input_Containera>
  );
};
