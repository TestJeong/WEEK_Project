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

import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {CATEGORY_DELETE_REQUEST, SELETED_CATEGORY_DATA} from '@homeScreen/category/CategorySlice';
import {RootStackParamList} from '@/navgation/StackNavigator';

const MoveTo_List_Action = (text: React.ReactNode, color: string, x: number, progress: any) => {
  const [isModalVisible, setModalVisible] = useState(false);
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
      <RectButton onPress={MoveToList} style={[styles.rightAction, {backgroundColor: color}]}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const Delete_List_Action = (text: React.ReactNode, color: string, x: number, progress: any) => {
  const trans = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [x, 0],
    extrapolate: 'clamp',
  });

  const pressHandler = () => {
    for (let j of filterData) {
      PushNotification.cancelLocalNotification(j.id);
    }
    dispatch(CATEGORY_DELETE_REQUEST({data}));
    close();
  };

  return (
    <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
      <RectButton onPress={pressHandler} style={[styles.rightAction, {backgroundColor: color}]}>
        <Text style={styles.actionText}>{text}</Text>
      </RectButton>
    </Animated.View>
  );
};

const renderRightActions = (progress: any) => (
  <View style={{width: 120, flexDirection: 'row'}}>
    {MoveTo_List_Action(<Icon name="edit" size={20} />, '#34558b', 192, progress)}
    {Delete_List_Action(<E_Icon name="trash-2" size={20} />, '#dd2c00', 128, progress)}
  </View>
);
