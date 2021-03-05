import React, {useLayoutEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ToDoInputModal from '../ToDo/ToDo_Input_Modal';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import ToDo_List_View from './ToDo_List_View';

const FlatListView = styled.FlatList`
  padding: 5px 0px 20px 0px;
`;

const ToDoList = ({route}) => {
  const {categoryName} = route.params;
  const navigation = useNavigation();

  const [isModalVisible, setModalVisible] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text>{categoryName}</Text>,
    });
  }, [categoryName]);

  const opneModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(false);
    Keyboard.dismiss();
  };

  const dda = [
    {name: '아침먹기'},
    {name: '내일 갈만 한 카페 찾아보기'},
    {name: 3},
    {name: 4},
    {name: 5},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
    {name: 6},
  ];

  return (
    <>
      <ToDoInputModal isOpen={isModalVisible} close={closeModal} />
      <View>
        <FlatListView
          keyExtractor={(item, index) => '#' + index}
          data={dda}
          renderItem={(item) => <ToDo_List_View data={item} />}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={opneModal}
        style={styles.touchableOpacityStyle}>
        <Image
          // FAB using TouchableOpacity with an image
          // For online image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
          }}
          // For local image
          //source={require('./images/float-add-icon.png')}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});

export default ToDoList;
