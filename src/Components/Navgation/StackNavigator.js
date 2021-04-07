import React from 'react';

import {TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';

import ToDo_List from '../ToDo/ToDo_List';
import Home from '../HomeScreen';
import ToDoList_Detail from '../ToDo/ToDoList_Detail';
import Calendar_Agenda from '../Calendar/Calendar_Agenda';
import Category_ToDo_List from '../HomeScreen/Category_ToDo_List';

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
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              <Icon name="left" size={20} color={'white'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Category_ToDoList"
        component={Category_ToDo_List}
        options={{
          headerLeftContainerStyle: {marginLeft: 20},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              <Icon name="left" size={20} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ToDoListDetail"
        component={ToDoList_Detail}
        options={{
          headerTitle: '상세정보',
          headerLeftContainerStyle: {marginLeft: 20},
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
            <TouchableOpacity
              onPress={() => navigation.navigate('Agenda')}
              hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
              <Icon name="left" size={20} />
            </TouchableOpacity>
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
