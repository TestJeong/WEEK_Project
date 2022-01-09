import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
  NativeModules,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Realms from 'realm';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import SharedGroupPreferences from 'react-native-shared-group-preferences';

import realm from '../../db';
import Category_List_View from './Category_List_View';
import Category_Modal_View from './Category_Modal_View';
import {CLICK_CATEGORY_TODO} from '../../reducers/Catagory';
import PushNotification from 'react-native-push-notification';
import {Edit_Schedule_Notif} from '../ToDo/ToDo_Notification';

const TitleText = styled.Text`
  font-family: 'NanumGothicExtraBold';
  font-size: 20px;

  margin-bottom: 25px;
`;

const CategoryTitleText = styled.Text`
  font-size: 20px;
  font-family: 'NanumGothicExtraBold';
  margin-bottom: 15px;
`;

const PlusText = styled.Text`
  font-size: 15px;
  font-family: 'NanumGothicBold';
  margin-left: 10px;
`;

const FlatListView = styled.FlatList`
  background-color: #f8e6cb;
  border-radius: 10px;
  padding: 0px 0px 0px 20px;
`;

const Main_Container = styled.View`
  height: 48%;
  justify-content: flex-end;
`;

const Column_View = styled.View`
  flex-direction: row;
  height: 30%;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const Column_Btn = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 45%;
  border-radius: 10px;
`;

const Plus_Category_Btn = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const Main_Title_Number = styled.View`
  justify-content: center;
`;

const Main_Title_Number_Text = styled.Text`
  font-size: 30px;

  font-family: 'NanumGothicBold';
`;

const Main_Title_View = styled.View`
  align-items: center;
`;

const Main_Title_Text = styled.Text`
  text-align: left;
  font-size: 20px;
  font-family: 'NanumGothicBold';
  padding-bottom: 10px;
`;

const group = 'group.com.week.ReactNativeWidget';
const SharedStorage = NativeModules.SharedStorage;

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [today_ToDo, setToday_ToDo] = useState(0);
  const [will_ToDo, setWill_ToDo] = useState(0);
  const [priority_ToDo, setPriority_ToDo] = useState(0);
  const [all_ToDo, setAll_ToDo] = useState(0);
  const {categoryList} = useSelector((state: any) => state.Catagory); // 수정 필요

  const timezoneOffset = new Date().getTimezoneOffset() * 60000;
  const timezoneDate = new Date(Date.now() - timezoneOffset);

  const string_Local_Time = timezoneDate.toISOString().substring(0, 10);
  const int_Local_Time = Number(string_Local_Time.replace(/-/g, ''));

  const TodoList_View = realm.objects('TodoDataList');

  const handleSubmit = async () => {
    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', 'widgetData', group);
    } catch (error) {
      console.log({error});
    }
    // Android
    SharedStorage.set(JSON.stringify('Asdf'));
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  useEffect(() => {
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });

    /* PushNotification.getScheduledLocalNotifications((notif) => {
      console.log('예약 알림', notif);
    }); */

    Edit_Schedule_Notif();

    /*  Realms.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path.toString());
    }); */

    const Today_List_View_Data = TodoList_View.filtered(
      'listDay == $0 AND listClear == $1',
      int_Local_Time,
      false,
    );

    const Will_List_View_Data = TodoList_View.filtered(
      'listDay > $0 AND listClear == $1',
      int_Local_Time,
      false,
    );

    const Priority_List_View_Data = TodoList_View.filtered(
      'listPriority != $0 AND listClear == $1',
      4,
      false,
    );

    const All_List_View_Data = TodoList_View.filtered(
      'listClear == $0',

      false,
    );

    setToday_ToDo(Today_List_View_Data.length);
    setWill_ToDo(Will_List_View_Data.length);
    setPriority_ToDo(Priority_List_View_Data.length);
    setAll_ToDo(All_List_View_Data.length);
  }, [TodoList_View, categoryList]);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const Today_ToDo_Data = useCallback(() => {
    const TodoList_View_Data = TodoList_View.filtered(
      'listDay == $0',
      int_Local_Time,
    );

    navigation.navigate('Category_ToDoList', {header_Name: '오늘의 일정'});
    dispatch({type: CLICK_CATEGORY_TODO, data: TodoList_View_Data});
  }, []);

  const will_ToDo_Data = useCallback(() => {
    const TodoList_View_Data = TodoList_View.filtered(
      'listDay >  $0',
      int_Local_Time,
    );

    const Sort_TodoList_View = TodoList_View_Data.sorted('listDay');

    navigation.navigate('Category_ToDoList', {header_Name: '예정된 일정'});
    dispatch({type: CLICK_CATEGORY_TODO, data: Sort_TodoList_View});
  }, []);

  const Priority_ToDo_Data = useCallback(() => {
    const TodoList_View_Data = TodoList_View.filtered('listPriority != $0', 4);

    navigation.navigate('Category_ToDoList', {header_Name: '중요한 일정'});
    dispatch({type: CLICK_CATEGORY_TODO, data: TodoList_View_Data});
  }, []);

  const All_ToDo_Data = useCallback(() => {
    const All_TodoList_View = realm.objects('TodoDataList');
    const Sort_All_TodoList_View = All_TodoList_View.sorted('listDay');

    navigation.navigate('Category_ToDoList', {
      header_Name: '전체 일정',
    });
    dispatch({type: CLICK_CATEGORY_TODO, data: Sort_All_TodoList_View});
  }, []);

  return (
    <SafeAreaView style={{flex: 1, margin: 10}}>
      <Category_Modal_View
        isOpen={isModalVisible}
        close={closeModal}
        data={null}
      />

      <Main_Container>
        <TitleText>MY WEEK</TitleText>

        <Column_View>
          <Column_Btn
            onPress={Today_ToDo_Data}
            style={{backgroundColor: '#fa897b'}}>
            <Main_Title_View>
              <Main_Title_Text>오늘</Main_Title_Text>
              <Main_Title_Text>⏰</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>{today_ToDo}</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
          <Column_Btn
            onPress={will_ToDo_Data}
            style={{backgroundColor: '#ccabd8'}}>
            <Main_Title_View>
              <Main_Title_Text>예정</Main_Title_Text>
              <Main_Title_Text>🛎</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>{will_ToDo}</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
        </Column_View>
        <Column_View>
          <Column_Btn
            onPress={Priority_ToDo_Data}
            style={{backgroundColor: '#d0e6a5'}}>
            <Main_Title_View>
              <Main_Title_Text>중요</Main_Title_Text>
              <Main_Title_Text>💡</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>{priority_ToDo}</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
          <Column_Btn
            onPress={All_ToDo_Data}
            style={{backgroundColor: '#a2b9ee'}}>
            <Main_Title_View>
              <Main_Title_Text>전체</Main_Title_Text>
              <Main_Title_Text>📅</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>{all_ToDo}</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
        </Column_View>
      </Main_Container>
      <View style={styles.container}>
        <CategoryTitleText>CATEGORY</CategoryTitleText>
        <FlatListView
          keyExtractor={(item, index) => '#' + index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={categoryList}
          renderItem={(item) => <Category_List_View data={item} />}
        />
        <Plus_Category_Btn onPress={opneModal}>
          <Icon name="pluscircleo" size={25} />
          <PlusText>카테고리 추가</PlusText>
        </Plus_Category_Btn>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  separator: {
    backgroundColor: 'white',
    height: 1,
  },
});

export default HomeScreen;
