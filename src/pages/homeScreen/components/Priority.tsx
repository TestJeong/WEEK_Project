import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

const List_Text_Value = styled.Text`
  font-family: 'NotoSansKR-Medium';
  font-size: 16px;
  align-items: center;
`;

const Priority = (onClickPriority: number) => {
  switch (onClickPriority) {
    case 1:
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="star" size={12} color={'pink'} />
        </View>
      );
    case 2:
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
        </View>
      );
    case 3:
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
          <Icon name="star" size={12} color={'pink'} />
        </View>
      );
    case 4:
      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <List_Text_Value style={{includeFontPadding: false}}>없음</List_Text_Value>
        </View>
      );

    default:
      break;
  }
};

export default Priority;
