import React, {useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Category_View from './category_View';

const HomeScreen = () => {
  const category = [
    {
      title: '11번',
    },
    {
      title: '22번',
    },
    {
      title: '33번',
    },
    {
      title: '44번',
    },
  ];
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>나의 목록</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => '#' + index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={category}
          renderItem={(item) => <Category_View dataas={item} />}
        />
        <TouchableOpacity>
          <Text>새 목록 추가</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    backgroundColor: 'green',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 1,
  },
});

export default HomeScreen;
