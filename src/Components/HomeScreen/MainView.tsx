import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native';
import styled from 'styled-components/native';

const Column_View = styled.View`
  flex-direction: row;
  height: 30%;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const Column_Btn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 45%;
  border-radius: 10px;
`;

const Main_Title_Number = styled.View`
  justify-content: center;
`;

const Main_Title_Number_Text = styled.Text`
  font-size: 30px;

  font-family: 'NanumGothicBold';
`;

const Main_Title_View = styled.View`
  align-items: center;
`;

const Main_Title_Text = styled.Text`
  text-align: left;
  font-size: 20px;
  font-family: 'NanumGothicBold';
  padding-bottom: 10px;
`;

type MainViewType = {
  name1: string;
  name2: string;
  icons1: string;
  icons2: string;
  firstToDoData(): void;
  secondToDoData(): void;
  todoCount1: number;
  todoCount2: number;
  color1: string;
  color2: string;
};

function MainView({
  name1,
  name2,
  icons1,
  icons2,
  firstToDoData,
  secondToDoData,
  todoCount1,
  todoCount2,
  color1,
  color2,
}: MainViewType) {
  return (
    <Column_View>
      <Column_Btn onPress={firstToDoData} style={{backgroundColor: color1}}>
        <Main_Title_View>
          <Main_Title_Text>{name1}</Main_Title_Text>
          <Main_Title_Text>{icons1}</Main_Title_Text>
        </Main_Title_View>
        <Main_Title_Number>
          <Main_Title_Number_Text>{todoCount1}</Main_Title_Number_Text>
        </Main_Title_Number>
      </Column_Btn>
      <Column_Btn onPress={secondToDoData} style={{backgroundColor: color2}}>
        <Main_Title_View>
          <Main_Title_Text>{name2}</Main_Title_Text>
          <Main_Title_Text>{icons2}</Main_Title_Text>
        </Main_Title_View>
        <Main_Title_Number>
          <Main_Title_Number_Text>{todoCount2}</Main_Title_Number_Text>
        </Main_Title_Number>
      </Column_Btn>
    </Column_View>
  );
}

export default MainView;
