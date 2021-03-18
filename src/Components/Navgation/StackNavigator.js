import React from 'react';

import {Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import ToDo_List from '../ToDo/ToDo_List';
import Home from '../HomeScreen';
import ToDoList_Detail from '../ToDo/ToDoList_Detail';
import Calendar_Agenda from '../Calendar/Calendar_Agenda';

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
      <Stack.Screen
        name="ToDoListDetail"
        component={ToDoList_Detail}
        options={{
          headerTitle: '상세정보',
          headerLeftContainerStyle: {marginLeft: 20},
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('ToDoList')}
              name="left"
              size={20}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const CalendarStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Agenda"
        component={Calendar_Agenda}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ToDoListDetail"
        component={ToDoList_Detail}
        options={{
          headerTitle: '상세정보',
          headerLeftContainerStyle: {marginLeft: 20},
          headerLeft: () => (
            <Icon
              onPress={() => navigation.navigate('Agenda')}
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
export {ToDoStackNavigator, CalendarStackNavigator, ModalView};
