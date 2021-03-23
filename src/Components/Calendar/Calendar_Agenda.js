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
import Agenda_List from './Agenda_List';

const Schedule = ({navigation}) => {
  const dispatch = useDispatch();
  const {Agenda_DATA} = useSelector((state) => state.Catagory);
  const [clickDay, setClickDay] = useState(null);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch({type: AGENDA_DATA_REQUEST});
    });
  }, [Agenda_DATA]);

  const renderItem = (item) => {
    return <Agenda_List item={item} />;
  };

  const render_ = () => {
    return <View style={styles.emptyDate} />;
  };

  const Calendar_Mark = () => {
    const Mark = {
      [clickDay]: {
        selected: true,
        marked: false,
        selectedColor: '#2ad4af',
      },
    };

    return Mark;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        onDayPress={(day) => {
          setClickDay(day.dateString);
        }}
        items={Agenda_DATA}
        renderItem={renderItem}
        renderEmptyDate={render_}
        theme={{
          selectedDayBackgroundColor: '#347ee7',
          todayTextColor: '#347ee7',

          textDayFontWeight: '600',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '700', //header 요일

          agendaTodayColor: '#347ee7',
          agendaKnobColor: '#3c4a6b',
        }}
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
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: '#cad0d4',
  },
});

export default Schedule;
