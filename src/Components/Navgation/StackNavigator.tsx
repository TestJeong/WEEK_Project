import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import ToDo_List from '../HomeScreen/ToDo/ToDo_List';
import Home from '../HomeScreen';
import ToDoList_Detail from '../HomeScreen/ToDo/ToDoList_Detail';
import Calendar_Agenda from '../CalendarScreen/Calendar_Agenda';
import Category_ToDo_List from '../HomeScreen/Category/Category_ToDo_List';
import {useNavigation} from '@react-navigation/native';
import ExpandableCalendarScreen from '../CalendarScreen';

export type RootStackParamList = {
  Home: undefined;
  ToDoList: {categoryName: string; categoryTime: string};
  Category_ToDoList: {header_Name: string};
  ToDoListDetail: undefined;
  Agenda: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptionStyle: any = {
  headerTitleAlign: 'center',
  /*   headerTitleStyle: {fontWeight: 400}, */
};

const ToDoStackNavigator = () => {
  const navigation = useNavigation<any>();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />

      <Stack.Screen
        name="ToDoList"
        component={ToDo_List}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginLeft: 20}}>
              <Icon name="left" size={20} color={'white'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Category_ToDoList"
        component={Category_ToDo_List}
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginLeft: 20}}>
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
          headerTitleStyle: {
            //letterSpacing: 0.5,
            color: 'black',
            fontSize: 17,
            // lineHeight: 20,
            fontFamily: 'NanumGothicExtraBold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const CalendarStackNavigator = () => {
  const navigation = useNavigation<any>();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Agenda" component={ExpandableCalendarScreen} options={{headerShown: false}} />
      <Stack.Screen
        name="ToDoListDetail"
        component={ToDoList_Detail}
        options={{
          headerTitle: '상세정보',
          //headerLeftContainerStyle: {marginLeft: 20},
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Agenda')} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
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
      <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
      <Stack.Screen name="ToDoList" component={ToDo_List} />
    </Stack.Navigator>
  );
};
export {ToDoStackNavigator, CalendarStackNavigator, ModalView};
