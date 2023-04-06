import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import COLORS from '../../global/globalColors';
import FiICON from 'react-native-vector-icons/Feather';

const RadioButton = ({onRadioButtonPress, checked, size}) => {
  return (
    <TouchableOpacity onPress={onRadioButtonPress}>
      <View
        style={
          checked
            ? [styles.selectedRadioButton, {width: size, height: size}]
            : [styles.radioButton, {width: size, height: size}]
        }>
        {checked && <FiICON name="check" size={size - 8} color={'#FFF'} />}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  radioButton: {
    borderRadius: 50,
    borderColor: '#b7b7b7',
    borderWidth: 1,
    //backgroundColor: '#fff',
  },
  selectedRadioButton: {
    borderRadius: 50,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default RadioButton;
