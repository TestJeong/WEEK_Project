import React, {useRef, useEffect, useState, useLayoutEffect} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import realm from '../../db';

import {
  TODO_LIST_DATA_REQUEST,
  CLICK_TODO_LIST_DATA,
  CLICK_CATEGORY,
} from '../../reducers/Catagory';

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
`;

const List_Clock_Text = styled.Text`
  font-size: 13px;
  padding-top: 7px;
  color: #adb5bd;
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

const ToDo_List_View = ({data}) => {
  const swiper = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const TodoList_View = realm.objects('TodoDataList');
  const TodoList_View_Data = TodoList_View.filtered(
    'createTime == $0',
    data.item.createTime,
  );

  const [ListDay, setListDay] = useState(null);
  const [onToggle_List, setOnToggle_List] = useState(
    TodoList_View_Data[0].listClear,
  );
  const {clickCategory} = useSelector((state) => state.Catagory);

  useLayoutEffect(() => {
    setOnToggle_List(data.item.listClear);
  }, [data.item.listClear]);

  useEffect(() => {
    if (data.item.listDay === null) {
      setListDay(null);
    } else {
      const ListDay_Month =
        data.item.listDay.substring(5, 7) >= 10
          ? data.item.listDay.substring(5, 7)
          : data.item.listDay.substring(6, 7);
      const ListDay_Day = data.item.listDay.substring(8, 10);
      const ListDay_Total = ListDay_Month + '월' + ListDay_Day + '일 ';
      setListDay(ListDay_Total);
    }
  }, [data.item]);

  const MoveTo_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const MoveToList = () => {
      dispatch({type: MOVE_TO_BASKET_REQUEST, data: data});
      close();
    };

    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flex: 1,
          transform: [{translateX: trans}],
        }}>
        <RectButton
          onPress={MoveToList}
          style={[styles.leftAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const Delete_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      dispatch({type: TODO_LIST_DATA_REQUEST, data: data});
      close();
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
        <RectButton
          onPress={pressHandler}
          style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View
      style={{
        width: 133,
        flexDirection: 'row',
      }}>
      {MoveTo_List_Action(<Text>세부사항</Text>, '#2fc4b2', 192, progress)}
      {Delete_List_Action(<Text>삭제</Text>, '#dd2c00', 128, progress)}
    </View>
  );

  const close = () => {
    swiper.current.close();
  };

  const goToList = () => {
    navigation.navigate('ToDoListDetail');
    dispatch({type: CLICK_TODO_LIST_DATA, data: data.item});
  };

  const Toggle = () => {
    setOnToggle_List(!onToggle_List);
    realm.write(() => {
      realm.create(
        'TodoDataList',
        {
          createTime: data.item.createTime,
          listClear: !onToggle_List,
        },
        true,
      );
    });
    dispatch({type: CLICK_TODO_LIST_DATA, data: data.item});
  };

  return (
    <View style={styles.container}>
      <Swipeable
        ref={swiper}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={goToList}>
          <List_Item>
            <List_Title_View>
              <TouchableOpacity onPress={Toggle}>
                {onToggle_List ? (
                  <Icon name="checkcircleo" size={30} color="#bbb" />
                ) : (
                  <Icon name="checkcircleo" size={30} />
                )}
              </TouchableOpacity>

              <List_Title_Content>
                <List_Text
                  style={onToggle_List ? styles.strikeText : null}
                  numberOfLines={1}>
                  {data.item.listContent}
                </List_Text>
                {ListDay ? (
                  <List_Clock_Text
                    style={onToggle_List ? styles.strikeText : null}>
                    {ListDay}
                    {data.item.listTime ? (
                      <Icon name="bells" size={12} color={'orange'} />
                    ) : null}
                  </List_Clock_Text>
                ) : null}
              </List_Title_Content>
            </List_Title_View>

            {(function () {
              if (data.item.listPriority === 1)
                return (
                  <View>
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                  </View>
                );
              if (data.item.listPriority === 2)
                return (
                  <View>
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                  </View>
                );
              if (data.item.listPriority === 3)
                return (
                  <View>
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                    <Icon
                      name="star"
                      size={12}
                      color={onToggle_List ? '#bbb' : 'pink'}
                    />
                  </View>
                );
            })()}
          </List_Item>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },

  leftAction: {
    borderTopRightRadius: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  rightAction: {
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

export default ToDo_List_View;
