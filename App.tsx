import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import TapNavigator from './src/Components/Navgation/TapNavigator';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import realm, {IsystemType} from './src/db';
import {UpdateMode} from 'realm';

const App = () => {
  const firstCheck = realm.objects('System');

  useEffect(() => {
    if (firstCheck.length <= 0) {
      realm.write(() => {
        realm.create<any>('CategoryList', {});
        realm.create<IsystemType>('System', {firstType: false}, UpdateMode.Modified);
      });
    }
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <TapNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default codePush(App);
