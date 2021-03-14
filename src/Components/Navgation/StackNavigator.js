import React from 'react';

import {Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import ToDo_List from '../ToDo/ToDo_List';
import Home from '../HomeScreen';

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTitleAlign: 'center',
  /*   headerTitleStyle: {fontWeight: 400}, */
};

const ToDoStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoList"
        component={ToDo_List}
        options={{
          headerLeftContainerStyle: {marginLeft: 20},
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('Home')}
              name="left"
              size={20}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const ModalView = () => {
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
export {ToDoStackNavigator, ModalView};
