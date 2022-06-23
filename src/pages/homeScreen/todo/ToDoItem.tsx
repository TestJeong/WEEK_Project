import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import E_Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import {UpdateMode} from 'realm';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navgation/StackNavigator';

import {IOS_Notif, Notif_Day} from '../../../utils/Day';
import {REQEUST_TODO_ITEM_DELETE, SELECTED_TODOLIST_DATA} from './ToDoSlice';
import {ItodoListType} from './todoType';
import {widgetRefresh} from '@/utils/widgetHelper';
import {Realm_TodoDataList} from '@/utils/realmHelper';
import realm, {ToDoType} from '@/db';
import {Schedule_Notif} from '@/utils/notificationHelper';
import {helperTodoItemDelete} from '@/sagas/todo/todoSaga';

////////////////////////////////////////////////////////////////////////////////////////////////////

const List_Item = styled.View`
  height: 40px;
  border-radius: 10px;
  background-color: white;
  margin: 10px 10px 10px 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const List_Text = styled.Text`
  font-size: 16px;
  width: 85%;
  line-height: 20px;
  font-family: 'NotoSansKR-Medium';
`;

const List_Clock_Text = styled.Text`
  font-size: 12px;

  line-height: 13px;
  font-family: 'NotoSansKR-Medium';
  padding-top: 7px;
`;

const List_Title_View = styled.View`
  flex-direction: row;
  align-items: center;
  width: 95%;
`;

const List_Title_Content = styled.View`
  margin-left: 17px;
  width: 100%;
`;

////////////////////////////////////////////////////////////////////////////////////////////////////

const ToDoItem = ({data, listName}: ItodoListType) => {
  const swiper = useRef<Swipeable>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ToDoListDetail'>>();
  const dispatch = useDispatch();

  const [ListDay, setListDay] = useState(null);
  const [isToggle, setToggle] = useState(data.item.listClear);

  useEffect(() => {
    widgetRefresh();

    if (data.item.listDay === null) {
      setListDay(null);
    } else {
      const String_ListDay = String(data.item.listDay);
      const ListDay_Month = Number(String_ListDay.substring(4, 6)) >= 10 ? String_ListDay.substring(4, 6) : String_ListDay.substring(5, 6);
      const ListDay_Day = String_ListDay.substring(6, 8);
      const ListDay_Total = ListDay_Month + '월' + ' ' + ListDay_Day + '일 ';
      setListDay(ListDay_Total);
    }
  }, [data.item]);

  const Delete_List_Action = (text: React.ReactNode, color: string, x: number, progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      const Notif_ID = data.item.id;
      const Sring_ID = String(Notif_ID);
      PushNotification.cancelLocalNotification(Sring_ID); //{id: String_ID}
      helperTodoItemDelete(data);
      swipeClose();
    };

    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          flex: 1,
          transform: [{translateX: trans}],
        }}>
        <RectButton onPress={pressHandler} style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any) => (
    <View
      style={{
        width: 60,
        flexDirection: 'row',
      }}>
      {Delete_List_Action(<E_Icon name="trash-2" size={25} />, '#dd2c00', 128, progress)}
    </View>
  );

  const swipeClose = () => {
    swiper.current.close();
  };

  const onPressDetail = () => {
    navigation.navigate('ToDoListDetail', {listName: listName});
    dispatch(SELECTED_TODOLIST_DATA(data.item));
  };

  const onPressToggleToDo = () => {
    const Notif_ID = data.item.id;
    const String_ID = String(Notif_ID);

    setToggle(!data.item.listClear);

    realm.write(() => {
      realm.create<ToDoType>(
        'TodoDataList',
        {
          createTime: data.item.createTime,
          listClear: !data.item.listClear,
        },
        UpdateMode.Modified,
      );
    });
    // dispatch(SELECTED_TODOLIST_DATA(data.item));

    // if (data.item.listDay && data.item.listTime_Data && onToggle_List === false) {
    //   PushNotification.cancelLocalNotification(String_ID); //{id: String_ID}
    // } else if (
    //   data.item.listDay &&
    //   data.item.listTime_Data &&
    //   onToggle_List === true &&
    //   new Date(IOS_Notif(data.item.listDay, data.item.listTime_Data)).toLocaleString() > new Date(Notif_Day()).toLocaleString() &&
    //   data.item.listEnabled
    // ) {
    //   Schedule_Notif({onClickDay: data.item.listDay, timeString: data.item.listTime_Data, todoContents: data.item.listContent, NotifID: Number(String_ID), categoryTitle: data.item.categoryTitle});
    // }
  };

  return (
    <View style={styles.container}>
      <Swipeable ref={swiper} friction={2} rightThreshold={40} renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={onPressDetail}>
          <List_Item>
            <List_Title_View>
              <TouchableOpacity hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} onPress={onPressToggleToDo}>
                {data.item.listClear ? <Icon name="checkcircleo" size={30} color="#bbb" /> : <Icon name="checkcircleo" size={30} color="black" />}
              </TouchableOpacity>
              <List_Title_Content>
                <List_Text style={data.item.listClear ? styles.strikeText : styles.defaultText} numberOfLines={1}>
                  {data.item.listContent}
                </List_Text>
                {ListDay ? (
                  <List_Clock_Text style={data.item.listClear ? styles.strikeText : styles.defaultDayText}>
                    {ListDay}
                    {data.item.listTime ? <Icon name="bells" size={12} color={'orange'} /> : null}
                  </List_Clock_Text>
                ) : null}
              </List_Title_Content>
            </List_Title_View>
            {StartComp(data.item.listPriority, true)}
          </List_Item>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const StartComp = (listPriority, onToggle_List) => {
  switch (listPriority) {
    case 1:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
    case 2:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
    case 3:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },

  defaultText: {
    color: 'black',
  },

  defaultDayText: {
    color: '#adb5bd',
  },

  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  rightAction: {
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default ToDoItem;
