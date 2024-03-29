import React, {useRef, useState, useEffect} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import E_Icon from 'react-native-vector-icons/Feather';
import PushNotification from 'react-native-push-notification';

import {
  CATEGORY_LIST_DATA_REQUEST,
  CLICK_CATEGORY,
} from '../../reducers/Catagory';
import Category_Modal_View from './Category_Modal_View';

const List_Item = styled.View`
  margin: 15px 35px 15px 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const List_Text = styled.Text`
  font-size: 17px;
  font-family: 'NanumGothic';
`;

const Category_View = ({data}) => {
  const swiper = useRef();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {categoryList} = useSelector((state) => state.Catagory);

  const [isModalVisible, setModalVisible] = useState(false);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications((notif) => {
      const notifData = notif.filter((i) => {
        return i.title === data.item.title;
      });

      setFilterData(notifData);
    });
  }, [categoryList]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const MoveTo_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const MoveToList = () => {
      setModalVisible(!isModalVisible);
      close();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          onPress={MoveToList}
          style={[styles.rightAction, {backgroundColor: color}]}>
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
      for (let j of filterData) {
        PushNotification.cancelLocalNotifications({id: j.id});
      }
      dispatch({type: CATEGORY_LIST_DATA_REQUEST, data: data});
      close();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
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
        width: 120,
        flexDirection: 'row',
      }}>
      {MoveTo_List_Action(
        <Icon name="edit" size={20} />,
        '#34558b',
        192,
        progress,
      )}
      {Delete_List_Action(
        <E_Icon name="trash-2" size={20} />,
        '#dd2c00',
        128,
        progress,
      )}
    </View>
  );

  const close = () => {
    swiper.current.close();
  };

  const goToList = () => {
    navigation.navigate('ToDoList', {
      categoryName: data.item.title,
      categoryTime: data.item.createTime,
    });
    dispatch({type: CLICK_CATEGORY, data: data.item});
  };

  return (
    <Swipeable
      ref={swiper}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <Category_Modal_View
        isOpen={isModalVisible}
        close={closeModal}
        data={data.item}
      />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={goToList}>
        <List_Item>
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 20,
              backgroundColor: data.item.color,
              marginRight: 15,
            }}
          />
          <List_Text>{data.item.title}</List_Text>
        </List_Item>

        <Icon name="right" size={15} style={{marginRight: 15}} />
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {marginBottom: 10},
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
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
});

export default Category_View;
