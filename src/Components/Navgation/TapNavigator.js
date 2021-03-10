import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';

import realm from '../../db';
import HomeScreen from '../HomeScreen';
import {MY_CATEGORY_DATA} from '../../reducers/Catagory';
import {ToDoStackNavigator} from '../../Components/Navgation/StackNavigator';
import Calendar_Agenda from '../Calendar/Calendar_Agenda';

const Tab = createBottomTabNavigator();

const TapNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const CategoryData = realm.objects('CategoryList');
    const SortCategoryDate = CategoryData.sorted('createTime');
    dispatch({type: MY_CATEGORY_DATA, data: SortCategoryDate});
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="HOME" component={ToDoStackNavigator} />
      <Tab.Screen name="CALENDAR" component={Calendar_Agenda} />
      <Tab.Screen name="SETTING" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default TapNavigator;

//tabBarOptions={{showLabel: false}} 글씨 안보이게 하는 옵션
