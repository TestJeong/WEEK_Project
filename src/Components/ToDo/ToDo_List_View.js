import React, {useRef, useEffect} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

import {useSelector, useDispatch} from 'react-redux';
import {TODO_LIST_DATA_REQUEST} from '../../reducers/Catagory';
import {useState} from 'react/cjs/react.development';

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

const List_Icon_View = styled.View``;

const ToDo_List_View = ({data}) => {
  const swiper = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [ListDay, setListDay] = useState(null);

  useEffect(() => {
    if (data.item.listDay) {
      const ListDay_Month =
        data.item.listDay.substring(5, 7) > 10
          ? data.item.listDay.substring(5, 7)
          : data.item.listDay.substring(6, 7);
      const ListDay_Day = data.item.listDay.substring(8, 10);
      const ListDay_Total = ListDay_Month + '월' + ListDay_Day + '일 ';
      setListDay(ListDay_Total);
    }
  }, [data.item.listDay]);

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
    navigation.navigate('ToDoList', {categoryName: data.item.title});
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
              <TouchableOpacity>
                <Icon name="checkcircleo" size={30} />
              </TouchableOpacity>

              <List_Title_Content>
                <List_Text numberOfLines={1}>{data.item.listContent}</List_Text>
                {data.item.listDay ? (
                  <List_Clock_Text>
                    {ListDay}
                    <Icon name="bells" size={12} color={'orange'} />
                  </List_Clock_Text>
                ) : null}
              </List_Title_Content>
            </List_Title_View>

            <List_Icon_View>
              <Icon name="star" size={12} color={'pink'} />
              <Icon name="star" size={12} color={'pink'} />
            </List_Icon_View>
          </List_Item>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {marginBottom: 10},
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
