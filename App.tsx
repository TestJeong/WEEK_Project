import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import {Provider, useDispatch} from 'react-redux';
import store from './src/store/configureStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import realm, {IsystemType} from './src/db';
import {UpdateMode} from 'realm';
import TapNavigator from '@/navgation/TapNavigator';
import {AGENDA_DATA_REQUEST} from './src/pages/calendarScreen/CalendarSlice';
import {SafeAreaView} from 'react-native';

const today = new Date().toISOString().split('T')[0];

// 해당일의 주에서 월요일을 계산
var paramDate = new Date(today); // new Date('2021-06-08'): 화요일
var day = paramDate.getDay();
var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
var tey = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

const App = () => {
  const dispatch = useDispatch();
  const firstCheck = realm.objects('System');

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  useEffect(() => {
    if (firstCheck.length <= 0) {
      realm.write(() => {
        realm.create<any>('CategoryList', {});
        realm.create<IsystemType>('System', {firstType: false}, UpdateMode.Modified);
      });
    }
    dispatch(AGENDA_DATA_REQUEST(tey));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer theme={navTheme}>
        <TapNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default codePush()(() => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
