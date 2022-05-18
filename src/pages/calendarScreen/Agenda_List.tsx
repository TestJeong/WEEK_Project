import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

import realm, {CategoryType, ToDoType} from '../../db';
import {SELECTED_TODOLIST_DATA} from '../homeScreen/todo/todoSlice';
import {isEmpty} from 'lodash';
import {UpdateMode} from 'realm';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navgation/StackNavigator';

interface Props {
  color: string;
}

const Render_View = styled.View<Props>`
  flex-direction: row;
  background-color: white;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 15px;
  border-top-width: 7px;
  width: 100%;
  border-top-color: ${(props) => props.color};
`;

const List_View = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListText_View = styled.View`
  margin-left: 17px;
`;
const Agenda_List = ({item}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ToDoListDetail'>>();
  const [onToggle, setOnToggle] = useState(item.listClear);

  useEffect(() => {
    setOnToggle(item.listClear);
  }, [item]);

  const goToList = () => {
    navigation.navigate('ToDoListDetail');
    dispatch(SELECTED_TODOLIST_DATA(item));
  };

  const Toggle = () => {
    setOnToggle(!onToggle);
    realm.write(() => {
      realm.create<ToDoType>(
        'TodoDataList',
        {
          createTime: item.createTime,
          listClear: !onToggle,
        },
        UpdateMode.Modified,
      );
    });
    dispatch(SELECTED_TODOLIST_DATA(item));
  };

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>일정이 없습니다.</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={goToList} style={{marginLeft: 20, marginRight: 20, marginTop: 5, paddingBottom: 10}}>
      <View style={{marginTop: 12, marginBottom: 0}}>
        <Render_View style={styles.container} color={item.colors}>
          <List_View>
            <TouchableOpacity onPress={Toggle}>{onToggle ? <Icon name="checkcircleo" size={30} color="#bbb" /> : <Icon name="checkcircleo" size={30} color="black" />}</TouchableOpacity>
            <ListText_View>
              <Text style={onToggle ? styles.strikeTitleText : styles.defaultTitleText}>{item.listContent}</Text>
              <Text style={onToggle ? styles.strikeText : styles.defaultText}>{item.categoryTitle}</Text>
            </ListText_View>
          </List_View>
          <Text style={onToggle ? styles.strikeText : styles.defaultText}>{item.listTime}</Text>
        </Render_View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#555',
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  strikeTitleText: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'NotoSansKR-Bold',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14,
  },

  defaultTitleText: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
    fontFamily: 'NotoSansKR-Bold',
  },
  defaultText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'NotoSansKR-Bold',
  },

  strikeText: {
    fontSize: 13,
    fontFamily: 'NotoSansKR-Bold',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
});

export default Agenda_List;
