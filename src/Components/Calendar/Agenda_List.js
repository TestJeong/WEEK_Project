import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

import realm from '../../db';
import {CLICK_TODO_LIST_DATA} from '../../reducers/Catagory';

const Render_View = styled.View`
  flex-direction: row;
  background-color: white;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  padding: 15px;
  border-top-width: 7px;
  width: 100%;
`;

const Render_Text = styled.Text`
  font-size: 16px;
  margin-bottom: 15px;
`;

const Time_Text = styled.Text`
  font-size: 13px;
  color: #adb5bd;
`;

const List_View = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ListText_View = styled.View`
  margin-left: 17px;
`;
const Agenda_List = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const TodoList_View = realm.objects('TodoDataList');
  const TodoList_View_Data = TodoList_View.filtered(
    'createTime == $0',
    item.createTime,
  );

  const [onToggle, setOnToggle] = useState(item.listClear);

  useEffect(() => {
    setOnToggle(item.listClear);
  }, [item.listClear]);

  const goToList = () => {
    navigation.navigate('ToDoListDetail');
    dispatch({type: CLICK_TODO_LIST_DATA, data: item});
  };

  const Toggle = () => {
    setOnToggle(!onToggle);
    realm.write(() => {
      realm.create(
        'TodoDataList',
        {
          createTime: item.createTime,
          listClear: !onToggle,
        },
        true,
      );
    });
    dispatch({type: CLICK_TODO_LIST_DATA, data: item});
  };

  return (
    <TouchableOpacity
      onPress={goToList}
      style={{marginRight: 10, marginTop: 17}}>
      <Render_View
        style={
          (styles.container, {borderTopColor: onToggle ? '#ddd' : item.colors})
        }>
        <List_View>
          <TouchableOpacity onPress={Toggle}>
            {onToggle ? (
              <Icon name="checkcircleo" size={30} color="#bbb" />
            ) : (
              <Icon name="checkcircleo" size={30} />
            )}
          </TouchableOpacity>
          <ListText_View>
            <Render_Text style={onToggle ? styles.strikeText : null}>
              {item.listContent}
            </Render_Text>
            <Text style={onToggle ? styles.strikeText : null}>
              {item.categoryTitle}
            </Text>
          </ListText_View>
        </List_View>

        <Time_Text style={onToggle ? styles.strikeText : null}>
          {item.listTime}
        </Time_Text>
      </Render_View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.32,
    shadowRadius: 1.22,

    elevation: 3,
  },

  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
});

export default Agenda_List;
