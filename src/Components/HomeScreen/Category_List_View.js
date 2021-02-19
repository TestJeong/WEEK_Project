import React, {useRef} from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const List_Item = styled.View`
  margin: 15px 35px 15px 5px;
  flex-direction: row;
  justify-content: space-between;
`;

const List_Text = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const Category_View = ({data}) => {
  const swiper = useRef();

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
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
        <RectButton
          onPress={MoveToList}
          style={[styles.rightAction, {backgroundColor: color}]}>
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
      <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
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

  return (
    <Swipeable
      ref={swiper}
      friction={2}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <List_Item>
        <List_Text>{data.item.title}</List_Text>
      </List_Item>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {marginBottom: 10},
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
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
});

export default Category_View;
