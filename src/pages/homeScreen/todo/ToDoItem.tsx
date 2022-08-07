import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import E_Icon from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navgation/StackNavigator';

import {LIST_DAY_CHANGE_KO} from '../../../utils/Day';
import {REQEUST_TODO_ITEM_CLEAR, REQEUST_TODO_ITEM_DELETE, SELECTED_TODOLIST_DATA} from './ToDoSlice';
import {ItodoListType} from './todoType';
import {widgetRefresh} from '@/utils/widgetHelper';
import ToDoItems from '@homeScreen/components/ToDoItem';

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

  const [monthAndDay, setMonthAndDay] = useState(null);

  useEffect(() => {
    widgetRefresh();

    if (data.listDay === null) {
      setMonthAndDay(null);
    } else {
      setMonthAndDay(LIST_DAY_CHANGE_KO(data.listDay));
    }
  }, [data]);

  const deleteListAction = (text: React.ReactNode, color: string, x: number, progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      dispatch(REQEUST_TODO_ITEM_DELETE({data}));
      swipeClose();
    };

    return (
      <Animated.View style={[styles.animatedView, {transform: [{translateX: trans}]}]}>
        <RectButton onPress={pressHandler} style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress: any) => <View style={styles.swipeRightView}>{deleteListAction(<E_Icon name="trash-2" size={25} />, '#dd2c00', 128, progress)}</View>;

  const swipeClose = () => {
    swiper.current.close();
  };

  const onPressDetail = () => {
    navigation.navigate('ToDoListDetail', {listName: listName});
    dispatch(SELECTED_TODOLIST_DATA(data));
  };

  return (
    <View style={styles.container}>
      <Swipeable ref={swiper} friction={2} rightThreshold={40} renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={onPressDetail}>
          <List_Item>
            <ToDoItems data={data} />
          </List_Item>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const styles = StyleSheet.create({
  swipeRightView: {
    width: 60,
    flexDirection: 'row',
  },
  animatedView: {
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flex: 1,
  },

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
