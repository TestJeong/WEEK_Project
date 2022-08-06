import React from 'react';
import {Platform, StyleSheet, Alert, View, Text, TouchableOpacity, Button, ViewStyle} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, LocaleConfig} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import realm from '@/db';
import Agenda_List from './Agenda_List';
import testIDs from '../../components/testIDs';
import {AGENDA_DATA_REQUEST} from './CalendarSlice';
import {MONDAY_OF_DAY, Today} from '../../utils/Day';
import {RootState} from '../../store/configureStore';
import {ItodoType, MarkedDate} from './CalendarType';
import {useCallback} from 'react';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const today = new Date().toISOString().split('T')[0];
const themeColor = '#00AAAF';
const leftArrowIcon = require('../../assets/img/previous.png');
const rightArrowIcon = require('../../assets/img/next.png');

const getTheme = () => {
  const disabledColor = 'grey';

  return {
    'stylesheet.calendar.header': {
      dayTextAtIndex5: {color: 'blue'},
      dayTextAtIndex6: {color: 'red'},
    },

    // arrows
    arrowColor: 'black',
    arrowStyle: {padding: 0},
    // month
    monthTextColor: 'black',
    textMonthFontSize: 16,
    textMonthFontFamily: 'HelveticaNeue',
    textMonthFontWeight: 'bold',
    // day names
    textSectionTitleColor: 'black',
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: 'HelveticaNeue',
    textDayHeaderFontWeight: 'normal',
    // dates
    dayTextColor: 'gray',
    textDayFontSize: 12,
    textDayFontFamily: 'HelveticaNeue',
    textDayFontWeight: '500',
    textDayStyle: {marginTop: Platform.OS === 'android' ? 6 : 8},
    // selected date
    selectedDayBackgroundColor: themeColor,
    selectedDayTextColor: 'white',
    // disabled date
    textDisabledColor: disabledColor,
    // dot (marked date)
    dotColor: themeColor,
    selectedDotColor: 'white',
    disabledDotColor: disabledColor,
    dotStyle: {marginTop: 2}, // -2
  };
};

const todays = new Date().toISOString().split('T')[0];
var paramDate = new Date(todays);
var day = paramDate.getDay();
var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
var tey = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

////////////////////////////////////////////////////////////////////////////////////////////////////

const ExpandableCalendarScreen = () => {
  const dispatch = useDispatch();
  const {Agenda_DATA} = useSelector((state: RootState) => state.CALENDAR_DATA);

  const getMarkedDates = () => {
    const TodoList_View = realm.objects('TodoDataList');
    const TodoList_View_Data = TodoList_View.filtered('listDay !=  $0', 0);
    const marked: MarkedDate = {};
    TodoList_View_Data.map((date: any) => {
      let ch = Today(date.listDay); // 20220204 형식을 2022-02-24 형식으로 변환
      marked[ch] = {marked: true};
    });

    return marked;
  };

  const marked = getMarkedDates();
  const theme: any = getTheme();

  const onDateChanged = (date: string) => {
    getMarkedDates();
    dispatch(AGENDA_DATA_REQUEST(MONDAY_OF_DAY(date)));
  };

  const renderItem = useCallback(
    ({item}: ItodoType) => {
      return <Agenda_List item={item} />;
    },
    [Agenda_DATA],
  );

  return (
    <CalendarProvider
      date={today}
      onDateChanged={onDateChanged}
      showTodayButton={false} // "오늘" 이라는 버튼 표시 여부
      disabledOpacity={0.6}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ExpandableCalendar
          allowShadow={false}
          testID={testIDs.expandableCalendar.CONTAINER}
          theme={theme}
          firstDay={1}
          markedDates={marked}
          enableSwipeMonths={false}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
        />

        <AgendaList
          theme={{calendarBackground: 'white'}}
          sections={Agenda_DATA}
          renderItem={renderItem}
          sectionStyle={styles.section}
          avoidDateUpdates={true} // 스크롤 해도 주간 달력이 변경이 안됨
        />
      </SafeAreaView>
    </CalendarProvider>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create<any>({
  section: {
    color: 'black',
    textTransform: 'capitalize',
  },
});

export default ExpandableCalendarScreen;
