import React from 'react';

import {Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import ToDo_List from '../ToDo/ToDo_List';
import Home from '../HomeScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
};

const ToDoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ToDoList" component={ToDo_List} />
    </Stack.Navigator>
  );
};
export default ToDoStackNavigator;
