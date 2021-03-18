import React, {useState} from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import realm from '../../db';
import {Day} from '../Day';
import {MY_CATEGORY_DATA} from '../../reducers/Catagory';
import Category_Palette from './Category_Palette';

const Modal_Container = styled(Modal)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
`;

const ModalView = styled.View`
  /* 모달창 크기 조절 */
  width: 100%;
  height: 93%;
  align-items: center;
  border-radius: 10px;
  background-color: white;
`;

const Text_Input_Container = styled.TextInput`
  font-size: 17px;
  padding: 5px;
  height: 50px;
  width: 90%;
  margin-top: 15px;
  margin-bottom: 35px;
  border-radius: 8px;
  background-color: #cad0d4;
`;

const Button_View = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 20px;
`;

const Text_Close = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;

const Modal_Title = styled.Text`
  font-size: 17px;
  font-weight: 800;
`;

const Hoper = styled.View`
  margin: 20px 0px;
  height: 80px;
  width: 80px;

  border-radius: 50px;
`;

const Category_Modal_View = ({isOpen, close}) => {
  const [categoryTitle, setcategoryTitle] = useState('');
  const [paletteColor, setPaletteColor] = useState('#c2c8c5');

  const dispatch = useDispatch();

  const handleSelect = (color) => {
    setPaletteColor(color.item);
  };

  const SaveButton = () => {
    if (categoryTitle !== '') {
      realm.write(() => {
        realm.create(
          'CategoryList',
          {
            createTime: Day(),
            title: categoryTitle,
            color: paletteColor,
          },
          true,
        );
      });
      const CategoryData = realm.objects('CategoryList');
      const SortCategoryDate = CategoryData.sorted('createTime');
      dispatch({type: MY_CATEGORY_DATA, data: SortCategoryDate});
      close();
      setcategoryTitle('');
    } else {
      close();
      setPaletteColor('#c2c8c5');
    }
  };

  const CloseButton = () => {
    close();
    setPaletteColor('#c2c8c5');
  };

  return (
    <Modal_Container isVisible={isOpen} onBackdropPress={close}>
      <ModalView>
        <Button_View>
          <TouchableOpacity
            onPress={CloseButton}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <Modal_Title>카테고리 추가</Modal_Title>
          <TouchableOpacity
            onPress={SaveButton}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>완료</Text_Close>
          </TouchableOpacity>
        </Button_View>

        <Hoper style={{backgroundColor: paletteColor}} />

        <Text_Input_Container
          value={categoryTitle}
          onChangeText={setcategoryTitle}
          placeholder="카테고리 제목을 입력하세요"
        />
        <Category_Palette onSelect={handleSelect} />
      </ModalView>
    </Modal_Container>
  );
};

export default Category_Modal_View;
