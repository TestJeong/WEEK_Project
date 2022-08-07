import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store, {RootState} from './src/store/configureStore';
import realm, {IsystemType} from './src/db';
import {UpdateMode} from 'realm';
import TapNavigator from '@/navgation/TapNavigator';
import {AGENDA_DATA_REQUEST} from './src/pages/calendarScreen/CalendarSlice';
import {MONDAY_OF_DAY} from '@/utils/Day';

const App = () => {
  const dispatch = useDispatch();
  const firstCheck = realm.objects('System');
  const {Agenda_ClickDay} = useSelector((state: RootState) => state.CALENDAR_DATA);

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f0f3f8',
    },
  };

  useEffect(() => {
    if (firstCheck.length <= 0) {
      realm.write(() => {
        realm.create<any>('CategoryList', {});
        realm.create<IsystemType>('System', {firstType: false}, UpdateMode.Modified);
      });
    }
    console.log('???', Agenda_ClickDay);
    dispatch(AGENDA_DATA_REQUEST(MONDAY_OF_DAY(Agenda_ClickDay)));
  }, []);

  return (
    <NavigationContainer theme={navTheme}>
      <TapNavigator />
    </NavigationContainer>
  );
};

export default codePush()(() => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
});
