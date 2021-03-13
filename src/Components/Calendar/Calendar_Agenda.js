import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView, Button} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';

import realm from '../../db';
import {AGENDA_DATA_REQUEST} from '../../reducers/Catagory';

const Schedule = ({navigation}) => {
  const [items, setItems] = useState({});
  const dispatch = useDispatch();
  const {Agenda_DATA} = useSelector((state) => state.Catagory);

  useEffect(() => {
    navigation.addListener('focus', () => {
      /* for (let el in Agenda_TEST) {
        const strTime = Agenda_TEST[el].listDay;
        items[strTime] = [];
        const BookMarkaa = AgendaData.filtered('listDay == $0', strTime);

        BookMarkaa.map((date) => items[strTime].push({name: date.listContent})); */

      dispatch({type: AGENDA_DATA_REQUEST});
    });
  }, [Agenda_DATA]);

  /* useEffect(() => {
    const CategoryData = realm.objects('TodoDataList');
    dispatch({type: AGENDA_TEST, data: CategoryData});

    for (let el in Agenda_TEST) {
      const strTime = Agenda_TEST[el].listDay;
      console.log('aapple', Agenda_TEST[el].listContent);

      if (!items[strTime]) {
        items[strTime] = [];

        const BookMarkaa = CategoryData.filtered('listDay == $0', strTime);

        BookMarkaa.map((date) => items[strTime].push({name: date.listContent}));
        console.log('if');
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }
  }, []); */

  /* useEffect(() => {
    const CategoryData = realm.objects('TodoDataList');
    dispatch({type: AGENDA_TEST, data: CategoryData});
  }, []);

  const loadItems = () => {
    for (let el in Agenda_TEST) {
      const strTime = Agenda_TEST[el].listDay;

      if (!items[strTime]) {
        items[strTime] = [];
        const CategoryData = realm.objects('TodoDataList');
        const BookMarkaa = CategoryData.filtered('listDay == $0', strTime);

        BookMarkaa.map((date) => items[strTime].push({name: date.listContent}));
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }
  }; */

  /* const loadItems = () => {
    const CategoryData = realm.objects('TodoDataList');
    for (let el in Agenda_TEST) {
      const strTime = Agenda_TEST[el].listDay;

      items[strTime] = [];

      const BookMarkaa = CategoryData.filtered('listDay == $0', strTime);
      BookMarkaa.map((date) => items[strTime].push({name: date.listContent}));
    }
  }; */

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

  const _rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
        items={Agenda_DATA}
        /*     loadItemsForMonth={loadItems} */
        renderItem={renderItem}
        rowHasChanged={_rowHasChanged}
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
