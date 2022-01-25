import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import codePush from 'react-native-code-push';
import TapNavigator from './src/Components/Navgation/TapNavigator';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
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
