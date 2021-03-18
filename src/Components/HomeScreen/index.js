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
  background-color: #ffdd94;
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
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  width: 45%;
  border-radius: 10px;
`;

const Plus_Category_Btn = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
`;

const Main_Title_Number = styled.View`
  justify-content: center;
`;

const Main_Title_Number_Text = styled.Text`
  font-size: 30px;
  font-weight: 500;
`;

const Main_Title_View = styled.View`
  align-items: center;
`;

const Main_Title_Text = styled.Text`
  text-align: left;
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 10px;
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
        <TitleText>WEEK</TitleText>
        <Column_View>
          <Column_Btn style={{backgroundColor: '#fa897b'}}>
            <Main_Title_View>
              <Main_Title_Text>오늘</Main_Title_Text>
              <Main_Title_Text>⏰</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>10</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
          <Column_Btn style={{backgroundColor: '#ccabd8'}}>
            <Main_Title_View>
              <Main_Title_Text>예정</Main_Title_Text>
              <Main_Title_Text>🛎</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>3</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
        </Column_View>
        <Column_View>
          <Column_Btn style={{backgroundColor: '#d0e6a5'}}>
            <Main_Title_View>
              <Main_Title_Text>중요</Main_Title_Text>
              <Main_Title_Text>💡</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>8</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
          <Column_Btn style={{backgroundColor: '#86e3ce'}}>
            <Main_Title_View>
              <Main_Title_Text>전체</Main_Title_Text>
              <Main_Title_Text>📅</Main_Title_Text>
            </Main_Title_View>
            <Main_Title_Number>
              <Main_Title_Number_Text>19</Main_Title_Number_Text>
            </Main_Title_Number>
          </Column_Btn>
        </Column_View>
      </Main_Container>
      <View style={styles.container}>
        <CategoryTitleText>Category</CategoryTitleText>
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
    backgroundColor: 'white',
    height: 1,
  },
});

export default HomeScreen;
