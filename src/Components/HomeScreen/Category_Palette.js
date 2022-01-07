import React from 'react';
import {View, Dimensions, FlatList} from 'react-native';
import styled from 'styled-components/native';

const Palettes = styled.View`
  width: 100%;
`;

const Colors = styled.View`
  width: 100%;
  padding: 0px 0px 300px 0px;
  align-items: center;
`;

const Items = styled.TouchableOpacity`
  border-radius: 10px;
  margin: 10px;
  width: 35px;
  height: 35px;
`;

const colors = [
  '#c84557',
  '#ff953f',
  '#ffc325',
  '#bad252',
  '#1e94be',
  '#5e869c',
  '#b191bd',
  '#0077ff',
  '#688f4e',
  '#fe8078',
  '#2c373d',
  '#3e54d3',
  '#4f80e2',
  '#15cdca',
  '#7339ab',
  '#a0586b',
  '#e84575',
  '#f76cae',
  '#4f766f',
  '#7dabd0',
  '#7cb3ac',
  '#264d59',
  '#cbe54e',
  '#E5d817',
];

const PaletteItem = ({color, active, onClick}) => {
  return <Items style={{backgroundColor: color.item}} onPress={onClick} />;
};

const Category_Palette = ({selected, onSelect}) => {
  const ITEM_WIDTH = Math.floor(Dimensions.get('window').width);
  const numColumn = Math.floor(ITEM_WIDTH / 60);

  return (
    <Palettes>
      <Colors>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{height: '100%'}}
          keyboardShouldPersistTaps="handled"
          keyExtractor={(item, index) => '#' + index}
          numColumns={numColumn}
          data={colors}
          renderItem={(item) => (
            <PaletteItem onClick={() => onSelect(item)} color={item} />
          )}
        />
      </Colors>
    </Palettes>
  );
};

export default Category_Palette;
