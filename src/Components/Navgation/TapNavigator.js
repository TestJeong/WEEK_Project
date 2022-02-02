import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import realm from '../../db';
import {MY_CATEGORY_DATA} from '../../reducers/Catagory';
import {ToDoStackNavigator, CalendarStackNavigator} from '../../Components/Navgation/StackNavigator';
import {REQUEST_CATEGORY_DATA} from '../HomeScreen/Category/CategorySlice';
import iap from '../Settings';

const Tab = createBottomTabNavigator();

const TapNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const CategoryData = realm.objects('CategoryList');
    const SortCategoryDate = CategoryData.sorted('createTime');
    dispatch(REQUEST_CATEGORY_DATA(SortCategoryDate));
    dispatch({type: MY_CATEGORY_DATA, data: SortCategoryDate});
  }, []);

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="HOME" component={ToDoStackNavigator} options={{tabBarIcon: ({color, size}) => <Icon name="home" size={size} color={color} />}} />
      <Tab.Screen name="CALENDAR" component={CalendarStackNavigator} options={{tabBarIcon: ({color, size}) => <Icon name="calendar" size={size} color={color} />}} />
      <Tab.Screen
        name="SETTING"
        component={iap}
        options={{
          cardStyle: {
            backgroundColor: 'red',
          },
          tabBarIcon: ({color, size}) => <Icon name="setting" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TapNavigator;

//tabBarOptions={{showLabel: false}} 글씨 안보이게 하는 옵션
