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
import {useDispatch, useSelector} from 'react-redux';

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

  const [onToggle, setOnToggle] = useState(item.listClear);

  useEffect(() => {
    setOnToggle(item.listClear);
  }, [item]);

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
              <Icon name="checkcircleo" size={30} color="black" />
            )}
          </TouchableOpacity>
          <ListText_View>
            <Text
              style={
                onToggle ? styles.strikeTitleText : styles.defaultTitleText
              }>
              {item.listContent}
            </Text>
            <Text style={onToggle ? styles.strikeText : styles.defaultText}>
              {item.categoryTitle}
            </Text>
          </ListText_View>
        </List_View>

        <Text style={onToggle ? styles.strikeText : styles.defaultText}>
          {item.listTime}
        </Text>
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
  strikeTitleText: {
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'NanumSquareB',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },

  defaultTitleText: {
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
    fontFamily: 'NanumSquareB',
  },
  defaultText: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'NanumSquareL',
  },

  strikeText: {
    fontSize: 13,
    fontFamily: 'NanumSquareL',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
});

export default Agenda_List;
