import React, {useRef} from 'react';
import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';

const List_Item = styled.View`
  height: 50px;
  border-radius: 10px;
  background-color: white;
  margin: 10px 10px 10px 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const List_Text = styled.Text`
  font-size: 17px;
  font-weight: 500;
  padding-bottom: 7px;
`;

const List_Clock_Text = styled.Text`
  font-size: 13px;
  color: #adb5bd;
`;

const List_Title_View = styled.View`
  flex-direction: row;
  align-items: center;
`;

const List_Title_Content = styled.View`
  margin-left: 40px;
`;

const List_Icon_View = styled.View``;

const ToDo_List_View = ({data}) => {
  const swiper = useRef();
  const navigation = useNavigation();

  const MoveTo_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const MoveToList = () => {
      dispatch({type: MOVE_TO_BASKET_REQUEST, data: bookData});
      close();
    };

    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          flex: 1,
          transform: [{translateX: trans}],
        }}>
        <RectButton
          onPress={MoveToList}
          style={[styles.leftAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const Delete_List_Action = (text, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
      extrapolate: 'clamp',
    });

    const pressHandler = () => {
      dispatch({type: REMOVE_BASKET_REQUEST, data: bookData});
      close();
    };

    return (
      <Animated.View
        style={{
          overflow: 'hidden',
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          flex: 1,
          transform: [{translateX: trans}],
        }}>
        <RectButton
          onPress={pressHandler}
          style={[styles.rightAction, {backgroundColor: color}]}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions = (progress) => (
    <View
      style={{
        width: 133,
        flexDirection: 'row',
      }}>
      {MoveTo_List_Action(<Text>세부사항</Text>, '#2fc4b2', 192, progress)}
      {Delete_List_Action(<Text>삭제</Text>, '#dd2c00', 128, progress)}
    </View>
  );

  const close = () => {
    swiper.current.close();
  };

  const goToList = () => {
    navigation.navigate('ToDoList', {categoryName: data.item.title});
  };

  return (
    <View style={styles.container}>
      <Swipeable
        ref={swiper}
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightActions}>
        <TouchableOpacity onPress={goToList}>
          <List_Item>
            <List_Title_View>
              <TouchableOpacity>
                <Icon name="checkcircleo" size={35} />
              </TouchableOpacity>

              <List_Title_Content>
                <List_Text>{data.item.name}</List_Text>
                <List_Clock_Text>오전 08:30</List_Clock_Text>
              </List_Title_Content>
            </List_Title_View>

            <List_Icon_View>
              <Icon name="bells" size={20} />
            </List_Icon_View>
          </List_Item>
        </TouchableOpacity>
      </Swipeable>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {marginBottom: 10},
  leftAction: {
    borderTopRightRadius: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default ToDo_List_View;
