import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';

import TapNavigator from './src/Components/Navgation/TapNavigator';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import codePush from 'react-native-code-push';

const App = () => {
  codePushSync = () => {
    codePush.sync({
      updateDialog: {
        //업데이트 다이얼로그 설정
        title: '새로운 업데이트가 존재합니다.',
        optionalUpdateMessage: '지금 업데이트하시겠습니까?',
        optionalIgnoreButtonLabel: '나중에',
        optionalInstallButtonLabel: '업데이트',
      },
      installMode: codePush.InstallMode.IMMEDIATE, //즉시 업데이트
    });
  };
  useEffect(() => {
    //ComponentDidMount
    codePushSync();
    //앱이 켜졌을 때 마다 codePushSync() 실행해서 업데이트 체크한다.
    AppState.addEventListener('change', (state) => {
      state === 'active' && codePushSync();
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <TapNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
