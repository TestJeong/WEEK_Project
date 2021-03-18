import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacitym,
  Dimensions,
  FlatList,
} from 'react-native';
import styled from 'styled-components/native';

const Palettes = styled.View`
  width: 100%;

  align-items: center;
  justify-content: center;
`;

const Colors = styled.View`
  width: 100%;
  padding: 0px 0px;
  align-items: center;
`;

const Items = styled.TouchableOpacity`
  border-radius: 10px;
  border-color: blue;

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
  '#8d8c88',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
  'red',
  'green',
  'blue',
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
