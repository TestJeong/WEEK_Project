import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {isEmpty} from 'lodash';

import {SELECTED_TODOLIST_DATA} from '../homeScreen/todo/ToDoSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/navgation/StackNavigator';
import {useCallback} from 'react';
import {CustomTodoType} from '@homeScreen/todo/todoType';
import ToDoItems from '@homeScreen/components/ToDoItem';

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

////////////////////////////////////////////////////////////////////////////////////////////////////

const Agenda_List = ({item}: {item: CustomTodoType}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'ToDoListDetail'>>();

  const onPressDetail = useCallback(() => {
    dispatch(SELECTED_TODOLIST_DATA(item));
    navigation.navigate('ToDoListDetail');
  }, []);

  if (isEmpty(item)) {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>일정이 없습니다.</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPressDetail} style={{marginLeft: 20, marginRight: 20, marginTop: 5, paddingBottom: 10}}>
      <View style={{marginTop: 12, marginBottom: 0}}>
        <Render_View style={styles.container} color={item.colors}>
          <ToDoItems data={item} />
        </Render_View>
      </View>
    </TouchableOpacity>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

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
