import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../Category/HomeScreen';

const Tab = createBottomTabNavigator();

const TapNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HOME" component={HomeScreen} />
      <Tab.Screen name="CALENDAR" component={HomeScreen} />
      <Tab.Screen name="SETTING" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TapNavigator;

//tabBarOptions={{showLabel: false}} 글씨 안보이게 하는 옵션
