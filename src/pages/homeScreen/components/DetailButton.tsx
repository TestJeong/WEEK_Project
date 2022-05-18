import React from 'react';

import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

import {Today, ANDROID_Notif, Notif_Day, IOS_Notif} from '../../../utils/Day';

const Time_Input_Container = styled.TouchableOpacity`
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
`;

// 함수
// 아이콘
// 타이틀
// 내용
// 화살표 여부
const DetailButton = ({onPressBtn, title, iconName, isArrow = true, children}: any) => {
  const checkIcon = () => {
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
  return (
    <Time_Input_Container onPress={onPressBtn}>
      <Time_Icon_Container>
        {checkIcon()}
        <List_Text style={{includeFontPadding: false}}>{title}</List_Text>
      </Time_Icon_Container>
      <List_Text_Value style={{includeFontPadding: false}}>
        {children}
        {/* {onClickDay ? onClickDay : todoData.listDay ? Today(todoData.listDay) : '없음'} */}
        &nbsp; &nbsp;
        {isArrow && <Icon name="right" size={15} />}
      </List_Text_Value>
    </Time_Input_Container>
  );
};
export default DetailButton;
