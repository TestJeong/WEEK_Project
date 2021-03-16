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

const Schedule = ({navigation}) => {
  const dispatch = useDispatch();
  const {Agenda_DATA} = useSelector((state) => state.Catagory);

  useEffect(() => {
    navigation.addListener('focus', () => {
      dispatch({type: AGENDA_DATA_REQUEST});
    });
  }, [Agenda_DATA]);

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <Render_View style={(styles.container, {borderTopColor: item.colors})}>
          <List_View>
            <Render_Text>{item.name}</Render_Text>
            <Text>{item.title}</Text>
          </List_View>
          <Time_Text>{item.time}</Time_Text>
        </Render_View>
      </TouchableOpacity>
    );
  };

  const render_ = () => {
    return <View style={styles.emptyDate} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={Agenda_DATA}
        renderItem={renderItem}
        renderEmptyDate={render_}
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
