import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Realm from 'realm';
import {useSelector} from 'react-redux';

import Category_List_View from './Category_List_View';
import Category_Modal_View from './Category_Modal_View';

const TitleText = styled.Text`
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 15px;
`;

const PlusText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: blue;
  margin-top: 15px;
`;

const FlatListView = styled.FlatList`
  background-color: #bdbfa3;
  border-radius: 15px;
  padding: 0px 20px;
`;

const HomeScreen = () => {
  useEffect(() => {
    Realm.open({}).then((realm) => {
      console.log('Realm is located at: ' + realm.path.toString());
    });
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);
  const {categoryList} = useSelector((state) => state.Catagory);

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView>
      <Category_Modal_View isOpen={isModalVisible} close={closeModal} />
      <View style={styles.container}>
        <TitleText>나의 목록</TitleText>
        <FlatListView
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => '#' + index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={categoryList}
          renderItem={(item) => <Category_List_View data={item} />}
        />
        <TouchableOpacity onPress={opneModal}>
          <PlusText>카테고리 추가</PlusText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 1,
  },
});

export default HomeScreen;
