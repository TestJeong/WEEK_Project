import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';

import realm from '../../db';
import {AGENDA_TEST} from '../../reducers/Catagory';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = () => {
  const [items, setItems] = useState({});
  const dispatch = useDispatch();
  const {Agenda_TEST} = useSelector((state) => state.Catagory);

  useEffect(() => {
    const CategoryData = realm.objects('TodoDataList');
    dispatch({type: AGENDA_TEST, data: CategoryData});
  }, []);

  const loadItems = () => {
    setTimeout(() => {
      for (let el in Agenda_TEST) {
        const strTime = Agenda_TEST[el].listDay;
        if (!items[strTime]) {
          items[strTime] = [];

          items[strTime].push({
            name: 'Item for ' + Agenda_TEST[el].listContent + ' #',
          });
        } else {
          items[strTime].push({
            name: 'Item for ' + Agenda_TEST[el].listContent + ' #',
          });
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      console.log('object', Object.keys(items));
      console.log('items', items);
      console.log(
        'forEach',
        Object.keys(items).forEach((key) => {
          console.log('key', key);
        }),
      );
      setItems(newItems);
    }, 1000);
  };

  /* useEffect(() => {
    const CategoryData = realm.objects('TodoDataList');
    dispatch({type: AGENDA_TEST, data: CategoryData});

    for (let el in Agenda_TEST) {
      const date = Agenda_TEST[el].listDay;

      if (!items[date]) {
        items[date] = [];
        items[date].push({
          name: Agenda_TEST[el].listContent,
        }); //Agenda_TEST에 배열 값들이 하나도 없을때
      } else {
        const OPOP = {name: Agenda_TEST[el].listContent};
        items[date].push({...OPOP});
      } //Agenda_TEST에 배열 값들이 들어있을때
    }
  }, []); */

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            height: 80,
            borderRadius: 10,
            paddingLeft: 20,
          }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyData={() => {
          return (
            <View>
              <Text>apple</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Schedule;
