import {useIsFocused} from '@react-navigation/native';
import isEmpty from 'lodash/isEmpty';
import React, {useCallback, useEffect} from 'react';
import {Platform, StyleSheet, Alert, View, Text, TouchableOpacity, Button} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar, LocaleConfig} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Agenda_List from './Agenda_List';
import testIDs from '../testIDs';
import {AGENDA_DATA_REQUEST} from './CalendarSlice';
import {useState} from 'react';

LocaleConfig.locales['kr'] = {
  monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3); // 현재 시간 - 3
const futureDates = getFutureDates(9); // 현재 시간 + 9
const dates = [fastDate, today].concat(futureDates);
const themeColor = '#00AAAF';
const lightThemeColor = '#EBF9F9';

function getFutureDates(numberOfDays: number) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    const date = new Date(Date.now() + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000 현재일로 부터 다음날
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(numberOfDays: number) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

const ITEMS: any[] = [
  {
    title: '2022-01-01',
    data: [{hour: '12am', duration: '1h', title: 'First adsfasdf'}],
  },
  {
    title: dates[0],
    data: [{hour: '12am', duration: '1h', title: 'First Yoga'}],
  },
  {
    title: dates[1],
    data: [
      {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
      {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'},
    ],
  },
  {
    title: dates[2],
    data: [
      {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
      {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
      {hour: '3pm', duration: '1h', title: 'Private Yoga'},
    ],
  },
  {
    title: dates[3],
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}],
  },
  {
    title: dates[4],
    data: [{}],
  },
  {
    title: dates[5],
    data: [
      {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
      {hour: '10pm', duration: '1h', title: 'Ashtanga'},
      {hour: '11pm', duration: '1h', title: 'TRX'},
      {hour: '12pm', duration: '1h', title: 'Running Group'},
    ],
  },
  {
    title: dates[6],
    data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}],
  },
  {
    title: dates[7],
    data: [{}],
  },
];

type MarkedDate = {
  [key: string]: object;
};

function getMarkedDates(items: any[]) {
  const marked: MarkedDate = {};
  items.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = {marked: true};
    } else {
      //marked[item.title] = {disabled: true};
    }
  });
  return marked;
}

function getTheme() {
  const disabledColor = 'grey';

  return {
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
    dayTextColor: themeColor,
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
}

const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = () => {
  const dispatch = useDispatch();
  const [onPressDay, setonPressDay] = useState('');
  const {Agenda_DATA} = useSelector((state: any) => state.CALENDAR_DATA);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(AGENDA_DATA_REQUEST(onPressDay === '' ? today : onPressDay));
    }
  }, [isFocused]);

  const marked = getMarkedDates(Agenda_DATA);
  const theme: any = getTheme();
  const todayBtnTheme = {
    todayButtonTextColor: themeColor,
  };

  const onDateChanged = (date: any) => {
    var paramDate = new Date(date); // new Date('2021-06-08'): 화요일
    var day = paramDate.getDay();
    var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
    var tey = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

    setonPressDay(tey);
    dispatch(AGENDA_DATA_REQUEST(tey));
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const renderItem = ({item}: any) => {
    return <Agenda_List item={item} />;
    //return <AgendaItem item={item} />;
  };

  return (
    <CalendarProvider
      date={today}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton={false} // "오늘" 이라는 버튼 표시 여부
      disabledOpacity={0.6}
      // theme={this.todayBtnTheme}
      // todayBottomMargin={16}
    >
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ExpandableCalendar
          allowShadow={false}
          testID={testIDs.expandableCalendar.CONTAINER}
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={ExpandableCalendar.positions.OPEN}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
          theme={theme}
          // disableAllTouchEventsForDisabledDays
          firstDay={1}
          markedDates={marked}
          enableSwipeMonths={false}
          onPressArrowLeft={() => {
            console.log('!@#');
          }}
          leftArrowImageSource={leftArrowIcon}
          rightArrowImageSource={rightArrowIcon}
          // animateScroll
        />

        <AgendaList
          theme={{calendarBackground: 'white'}}
          sections={Agenda_DATA}
          renderItem={renderItem}
          sectionStyle={styles.section}
          // dayFormat={'YYYY-MM-d'}
        />
      </SafeAreaView>
    </CalendarProvider>
  );
};

interface ItemProps {
  item: any;
}

const AgendaItem = React.memo(function AgendaItem(props: ItemProps) {
  const {item} = props;

  const buttonPressed = useCallback(() => {
    Alert.alert('Show me more');
  }, []);

  const itemPressed = useCallback(() => {
    Alert.alert(item.title);
  }, []);

  console.log('?? item 입니다 -> ', item);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned Today</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={itemPressed} style={styles.item} testID={testIDs.agenda.ITEM}>
      <View>
        <Text style={styles.itemHourText}>{item.hour}</Text>
        <Text style={styles.itemDurationText}>{item.duration}</Text>
      </View>
      <Text style={styles.itemTitleText}>{item.title}</Text>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    color: 'black',
    textTransform: 'capitalize',
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
  },
  itemHourText: {
    color: 'black',
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },
});

export default ExpandableCalendarScreen;
