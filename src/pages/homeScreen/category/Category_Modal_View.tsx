import React, {useState, useCallback} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import realm, {CategoryType, ToDoType} from '../../../db';
import Category_Palette from './Category_Palette';
import {Category_Notif} from './Category_Notif';
import {UpdateMode} from 'realm';
import {REQUEST_CATEGORY_DATA} from './CategorySlice';
import {CategoryModalType} from './categoryType';
import {useEffect} from 'react';

const ModalView = styled.View`
  /* 모달창 크기 조절 */
  width: 100%;
  height: 93%;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
  font-family: 'NotoSansKR-Medium';
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
  line-height: 20px;
  font-family: 'NotoSansKR-Bold';
`;

const Modal_Title = styled.Text`
  font-size: 17px;
  line-height: 20px;
  font-family: 'NotoSansKR-Bold';
`;

const Hoper = styled.View`
  margin: 20px 0px;
  height: 80px;
  width: 80px;
  border-radius: 50px;
`;

const Category_Modal_View = ({isOpen, close, categoryItem}: CategoryModalType) => {
  const [categoryTitle, setcategoryTitle] = useState('');
  const [paletteColor, setPaletteColor] = useState('');

  useEffect(() => {
    setcategoryTitle(categoryItem ? categoryItem.title : '');
    setPaletteColor(categoryItem ? categoryItem.color : '#c2c8c5');
  }, [isOpen]);

  const dispatch = useDispatch();

  const handleSelect = (color: {item: string}) => {
    setPaletteColor(color.item);
  };

  const changeToDoItem = () => {
    if (categoryItem) {
      let ToDoItem = realm.create<CategoryType>('CategoryList', {createTime: categoryItem.createTime}, UpdateMode.Modified);

      ToDoItem.todoData.map((item: ToDoType) => {
        if (item.categoryTitle !== categoryTitle && item.listDay && item.listTime_Data) Category_Notif({item, categoryTitle});
        realm.create<ToDoType>('TodoDataList', {createTime: item.createTime, categoryTitle: categoryTitle}, UpdateMode.Modified);
      });
    }
  };

  const onPressSaveBtn = () => {
    const CategoryData = realm.objects('CategoryList');
    const date = categoryItem ? categoryItem.createTime : new Date().getTime();

    if (categoryTitle !== '') {
      realm.write(() => {
        realm.create<CategoryType>(
          'CategoryList',
          {
            createTime: date,
            title: categoryTitle,
            color: paletteColor,
            id: categoryItem ? categoryItem.id : CategoryData.length + 1,
          },
          UpdateMode.Modified,
        );
        changeToDoItem();
      });

      const SortCategoryDate = CategoryData.sorted('id');
      dispatch(REQUEST_CATEGORY_DATA(SortCategoryDate));
      close();
      // 카테고리를 만들고 다시 카테고리를 만들경우 색상이랑 타이틀이 남아있음
      categoryItem ? null : (setPaletteColor('#c2c8c5'), setcategoryTitle(''));
    } else {
      close();
    }
  };

  const onPressCloseBtn = useCallback(() => {
    close();
    categoryItem ? (setPaletteColor(categoryItem.color), setcategoryTitle(categoryItem.title)) : (setPaletteColor('#c2c8c5'), setcategoryTitle(''));
  }, []);

  return (
    <Modal style={styles.modalContainer} isVisible={isOpen} onBackdropPress={close}>
      <ModalView>
        <Button_View>
          <TouchableOpacity onPress={onPressCloseBtn} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>닫기</Text_Close>
          </TouchableOpacity>
          <Modal_Title style={{includeFontPadding: false}}>MY CATEGORY</Modal_Title>
          <TouchableOpacity onPress={onPressSaveBtn} hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}>
            <Text_Close style={{color: '#2653af'}}>완료</Text_Close>
          </TouchableOpacity>
        </Button_View>

        <Hoper style={{backgroundColor: paletteColor}} />

        <Text_Input_Container value={categoryTitle} onChangeText={setcategoryTitle} placeholder="카테고리 제목을 입력하세요" />

        <Category_Palette onSelect={handleSelect} />
      </ModalView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 0,
  },
});

export default Category_Modal_View;
