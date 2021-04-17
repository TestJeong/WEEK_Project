import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';

import {AGENDA_DATA_REQUEST} from '../../reducers/Catagory';
import {Today} from '../Day';

import Agenda_List from './Agenda_List';

const Schedule = ({navigation}) => {
  const dispatch = useDispatch();
  const {Agenda_DATA, Agenda_DATA_timestamp} = useSelector(
    (state) => state.Catagory,
  );

  useEffect(() => {
    console.log(Today());
    navigation.addListener('focus', () => {
      dispatch({type: AGENDA_DATA_REQUEST, data: Agenda_DATA_timestamp});
    });
  }, []);

  const renderItem = (item) => {
    return <Agenda_List item={item} />;
  };

  const render_ = () => {
    return <View style={styles.emptyDate} />;
  };

  const default_Day = Today();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={Agenda_DATA}
        onDayPress={(day) => {
          dispatch({type: AGENDA_DATA_REQUEST, data: day.timestamp});
        }}
        renderItem={renderItem}
        selected={default_Day}
        renderEmptyDate={render_}
        theme={{
          selectedDayBackgroundColor: '#347ee7',
          todayTextColor: '#347ee7',
          agendaTodayColor: '#347ee7',
          agendaKnobColor: '#3c4a6b',
          textDayFontFamily: 'NanumSquareB',
          textMonthFontFamily: 'NanumSquareB',
          textDayHeaderFontFamily: 'NanumSquareB',
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
