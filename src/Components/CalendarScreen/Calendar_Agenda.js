import React, {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';

import {AGENDA_DATA_REQUEST, AGENDA_DATA_TIMESTAMP} from '../../reducers/Catagory';
import {Today} from '../../Utils/Day';
import Agenda_List from './Agenda_List';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const Schedule = () => {
  const dispatch = useDispatch();
  const {Agenda_DATA, Agenda_DATA_timestamp} = useSelector((state) => state.Catagory);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      console.log('기존 캘린더', Agenda_DATA);
      // dispatch({type: AGENDA_DATA_REQUEST, data: Agenda_DATA_timestamp});
    }
  }, [isFocused]);

  const renderItem = (item) => {
    return <Agenda_List item={item} />;
  };

  const render_ = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const default_Day = Today();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Agenda
        items={Agenda_DATA}
        onDayPress={(day) => {
          // dispatch({type: AGENDA_DATA_REQUEST, data: day.timestamp});
          //dispatch({type: AGENDA_DATA_TIMESTAMP, data: day.timestamp});
        }}
        pastScrollRange={10}
        renderItem={renderItem}
        selected={default_Day}
        renderEmptyDate={render_}
        showClosingKnob={true}
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        // refreshing={false}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        theme={{
          selectedDayBackgroundColor: '#347ee7',
          todayTextColor: '#347ee7',
          agendaTodayColor: '#347ee7',
          agendaKnobColor: '#3c4a6b',
          textDayFontFamily: 'NanumGothic',
          textMonthFontFamily: 'NanumGothicBold',
          textDayHeaderFontFamily: 'NanumGothicBold',
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
