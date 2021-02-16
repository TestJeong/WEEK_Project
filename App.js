import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import TapNavigator from './src/Components/Navgation/TapNavigator';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <TapNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
