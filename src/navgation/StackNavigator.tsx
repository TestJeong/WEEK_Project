import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ExpandableCalendarScreen from '../pages/calendarScreen';
import ToDo_List from '@homeScreen/todo/ToDoList';
import Category_ToDo_List from '@homeScreen/category/Category_ToDo_List';
import HomeScreen from '@homeScreen/index';
import ToDoItemDetail from '@homeScreen/todo/ToDoItemDetail';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  ToDoList: {categoryName: string; categoryTime: string};
  Category_ToDoList: {header_Name: string};
  TodoDataList: undefined;
  ToDoListDetail: {listName: boolean};
  Agenda: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const screenOptionStyle: any = {
  headerTitleAlign: 'center',
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
};

const ToDoStackNavigator = () => {
  const navigation = useNavigation<any>();
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />

      <Stack.Screen
        name="ToDoList"
        component={ToDo_List}
        options={{
          headerTitleStyle: {
            color: 'white',
            fontSize: 17,
            fontFamily: 'NotoSansKR-Bold',
          },
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
          headerTitleStyle: {
            color: 'black',
            fontSize: 17,
            fontFamily: 'NotoSansKR-Bold',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} style={{marginLeft: 20}}>
              <Icon name="left" size={20} />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ToDoListDetail"
        component={ToDoItemDetail}
        options={{
          headerTitle: '상세정보',
          headerTitleStyle: {
            color: 'black',
            fontSize: 17,
            fontFamily: 'NotoSansKR-Bold',
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
        component={ToDoItemDetail}
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
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="ToDoList" component={ToDo_List} />
    </Stack.Navigator>
  );
};
export {ToDoStackNavigator, CalendarStackNavigator, ModalView};
