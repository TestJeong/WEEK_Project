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

import Category_Modal_View from './Category_Modal_View';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {CATEGORY_DELETE_REQUEST, SELETED_CATEGORY_DATA} from '@homeScreen/category/CategorySlice';
import {RootStackParamList} from '@/navgation/StackNavigator';

const List_Item = styled.View`
  margin: 15px 35px 15px 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const List_Text = styled.Text`
  font-size: 17px;
  font-family: 'NotoSansKR-Medium';
`;

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'ToDoList'>;

const Category_List_View = ({data, drag}: any) => {
  const swiper = useRef<any>();
  const navigation = useNavigation<homeScreenProp>();

  const dispatch = useDispatch();
  const {categoryList} = useSelector((state: any) => state.CATEGORY_DATA);

  const [isModalVisible, setModalVisible] = useState(false);
  const [filterData, setFilterData] = useState<any>([]);

  useEffect(() => {
    //console.log('dddddd => ', data);
  }, []);

  useEffect(() => {
    PushNotification.getScheduledLocalNotifications((notif) => {
      const notifData = notif.filter((i) => {
        return i.title === data.title;
      });
      setFilterData(notifData);
    });
  }, [categoryList]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const Edit_List_Action = (text: React.ReactNode, color: string, x: number, progress: any) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const onPressBtn = () => {
      setModalVisible(!isModalVisible);
      swiper.current.close();
    };

    return (
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton onPress={onPressBtn} style={[styles.rightAction, {backgroundColor: color}]}>
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
      swiper.current.close();
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
      {Edit_List_Action(<Icon name="edit" size={20} />, '#34558b', 192, progress)}
      {Delete_List_Action(<E_Icon name="trash-2" size={20} />, '#dd2c00', 128, progress)}
    </View>
  );

  const goToList = () => {
    navigation.navigate('ToDoList', {
      categoryName: data.title,
      categoryTime: data.createTime,
    });
    dispatch(SELETED_CATEGORY_DATA(data));
  };
  return (
    <Swipeable ref={swiper} friction={2} rightThreshold={40} renderRightActions={renderRightActions}>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} onPress={goToList} onLongPress={drag}>
        <List_Item>
          <View style={{height: 20, width: 20, borderRadius: 20, backgroundColor: data.color, marginRight: 15}} />
          <List_Text style={{includeFontPadding: false}}>{data.title}</List_Text>
          <List_Text style={{includeFontPadding: false}}>{data.id}</List_Text>
        </List_Item>

        <Icon name="right" size={15} style={{marginRight: 15}} />
      </TouchableOpacity>
      <Category_Modal_View isOpen={isModalVisible} close={closeModal} categoryItem={data} />
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

export default Category_List_View;
