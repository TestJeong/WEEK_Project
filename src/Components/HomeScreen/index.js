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
import Icon from 'react-native-vector-icons/AntDesign';

import Category_List_View from './Category_List_View';
import Category_Modal_View from './Category_Modal_View';

const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const CategoryTitleText = styled.Text`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 15px;
`;

const PlusText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
`;

const FlatListView = styled.FlatList`
  background-color: #bdbfa3;
  border-radius: 10px;
  padding: 0px 0px 0px 20px;
`;

const Main_Container = styled.View`
  height: 48%;
  justify-content: flex-end;
`;

const Column_View = styled.View`
  flex-direction: row;
  height: 30%;
  justify-content: space-between;
  margin-bottom: 35px;
`;

const Column_Btn = styled.TouchableOpacity`
  width: 45%;
  border-radius: 10px;
`;

const Plus_Category_Btn = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
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
    <SafeAreaView style={{flex: 1, margin: 10}}>
      <Category_Modal_View isOpen={isModalVisible} close={closeModal} />

      <Main_Container>
        <TitleText>안녕하세요 미리알림</TitleText>
        <Column_View>
          <Column_Btn style={{backgroundColor: '#FDE5E6'}}>
            <Text>11</Text>
          </Column_Btn>
          <Column_Btn style={{backgroundColor: '#F1F3FF'}}>
            <Text>22</Text>
          </Column_Btn>
        </Column_View>
        <Column_View>
          <Column_Btn style={{backgroundColor: '#D7EFE7'}}>
            <Text>33</Text>
          </Column_Btn>
          <Column_Btn style={{backgroundColor: '#F0DFCC'}}>
            <Text>44</Text>
          </Column_Btn>
        </Column_View>
      </Main_Container>
      <View style={styles.container}>
        <CategoryTitleText>CATEGORY</CategoryTitleText>
        <FlatListView
          keyExtractor={(item, index) => '#' + index}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          data={categoryList}
          renderItem={(item) => <Category_List_View data={item} />}
        />
        <Plus_Category_Btn onPress={opneModal}>
          <Icon name="pluscircleo" size={25} />
          <PlusText>카테고리 추가</PlusText>
        </Plus_Category_Btn>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '50%',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: 1,
  },
});

export default HomeScreen;
