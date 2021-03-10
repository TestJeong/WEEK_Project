import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {Agenda} from 'react-native-calendars';

const Schedule = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    /*  setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000); */
  };

  const hhi = '2021-03-13';

  const hello = {
    [hhi]: [{name: '마트 장보기', height: 80}],
    '2021-03-12': [{name: 'item12 - any js object', height: 80}],
  };

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
          }}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Agenda
        items={hello}
        /* loadItemsForMonth={loadItems} */
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
