import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, Profiler} from 'react';
import codePush from 'react-native-code-push';
import TapNavigator from './src/Components/Navgation/TapNavigator';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';

const App = () => {
  const logMeasurement = async (id, phase, actualDuration, baseDuration) => {
    // see output during DEV
    if (__DEV__) console.log({id, phase, actualDuration, baseDuration});
  };
  return (
    <Profiler id="asdfff323" onRender={logMeasurement}>
      <Provider store={store}>
        <NavigationContainer>
          <TapNavigator />
        </NavigationContainer>
      </Provider>
    </Profiler>
  );
};

export default codePush(App);
