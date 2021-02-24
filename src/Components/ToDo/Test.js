import React from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
} from 'react-native';

export const BBo = () => {
  return (
    <View style={{backgroundColor: 'green'}}>
      <Button title="apple" color="red" style={styles.buttonStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    color: 'red',
    marginTop: 20,
    padding: 20,
    backgroundColor: 'green',
  },
});
