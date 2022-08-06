import {LIST_DAY_CHANGE_KO} from '@/utils/Day';
import {REQEUST_TODO_ITEM_CLEAR} from '@homeScreen/todo/ToDoSlice';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';

const ToDoItems = ({data}) => {
  const dispatch = useDispatch();
  const [monthAndDay, setMonthAndDay] = useState(null);

  useEffect(() => {
    if (data.listDay === null) {
      setMonthAndDay(null);
    } else {
      setMonthAndDay(LIST_DAY_CHANGE_KO(data.listDay));
    }
  }, []);

  const onPressToggleToDo = () => {
    dispatch(REQEUST_TODO_ITEM_CLEAR({data}));
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <TouchableOpacity hitSlop={{top: 25, bottom: 25, left: 25, right: 25}} onPress={onPressToggleToDo}>
          {data.listClear ? <Icon name="checkcircleo" size={30} color="#bbb" /> : <Icon name="checkcircleo" size={30} color="black" />}
        </TouchableOpacity>
        <View style={styles.titleContent}>
          <Text style={[styles.titleText, data.listClear ? styles.strikeText : styles.defaultText]} numberOfLines={1}>
            {data.listContent}
          </Text>
          {monthAndDay ? (
            <Text style={[styles.titleDate, data.listClear ? styles.strikeText : styles.defaultDayText]}>
              {monthAndDay}
              {data.listTime ? <Icon name="bells" size={12} color={'orange'} /> : null}
            </Text>
          ) : null}
        </View>
      </View>
      {StartComp(data.listPriority, true)}
    </View>
  );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

const StartComp = (listPriority, onToggle_List) => {
  switch (listPriority) {
    case 1:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
    case 2:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
    case 3:
      return (
        <View>
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
          <Icon name="star" size={12} color={onToggle_List ? '#bbb' : 'pink'} />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
  },
  titleContent: {
    marginLeft: 17,
    width: '100%',
  },
  titleText: {
    fontFamily: 'notoSansKR-Medium',
    fontSize: 16,
    width: '85%',
    lineHeight: 20,
  },
  titleDate: {
    fontFamily: 'notoSansKR-Medium',
    fontSize: 12,
    lineHeight: 13,
    paddingTop: 7,
  },

  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },

  defaultText: {
    color: 'black',
  },

  defaultDayText: {
    color: '#adb5bd',
  },
});

export default ToDoItems;
