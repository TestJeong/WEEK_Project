import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components/native';

import {AGENDA_DATA_REQUEST} from '../../reducers/Catagory';
import Render_Empty from './Render_Empty';

const Render_View = styled.View`
  flex-direction: row;
  background-color: white;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 15px;
  border-top-color: red;
  border-top-width: 7px;
`;

const Render_Text = styled.Text`
  font-size: 16px;
  margin-bottom: 15px;
`;

const Time_Text = styled.Text`
  font-size: 13px;
  color: #adb5bd;
`;

const List_View = styled.View``;

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = ({navigation}) => {
  const dispatch = useDispatch();
  const {Agenda_DATA} = useSelector((state) => state.Catagory);
  const [items, setItems] = useState({});
  const [testt, setTestt] = useState({});

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch({type: AGENDA_DATA_REQUEST});
    });
  }, [Agenda_DATA]);

  const loadItems = (day) => {
    console.log('Aa', new Date());

    /* let day_Date = {};

    for (let i = -15; i < 85; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = timeToString(time);

      if (Agenda_DATA[strTime] === undefined) {
        day_Date[strTime] = [];
        console.log(' null 입니다', strTime);
      } else {
        day_Date[strTime] = [];
        day_Date[strTime].push(Agenda_DATA[strTime]);
      }
    }

    setItems(day_Date); */
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Render_View style={(styles.container, {borderTopColor: item.colors})}>
          <List_View>
            <Render_Text>{item.name}</Render_Text>
            <Text>Hello!</Text>
          </List_View>
          <Time_Text>오전 09:20</Time_Text>
        </Render_View>
      </TouchableOpacity>
    );
  };

  const render_ = () => {
    return (
      <View style={{backgroundColor: 'red'}}>
        <Text> Ejj</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={Agenda_DATA}
        renderItem={renderItem}
        /* loadItemsForMonth={loadItems} */
        renderEmptyDat={render_}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 1.22,

    elevation: 3,
  },
});

export default Schedule;
