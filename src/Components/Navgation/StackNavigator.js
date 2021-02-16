import React from 'react';

import {Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
};

const BookStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Books"
        component={BookContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export {BookStackNavigator, MovieStackNavigator};
