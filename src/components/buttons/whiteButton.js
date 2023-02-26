import React from 'react';
import {TouchableOpacity} from 'react-native';
import {StyleSheet, Text, Touchable, View} from 'react-native';

const WhiteButton = ({buttonName, onPress, textColor}) => {
  return (
    <TouchableOpacity style={style.buttonWrap} onPress={onPress}>
      <Text style={[style.buttonText, {color: textColor}]}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  buttonWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#ffff',
    marginBottom: 5,
  },
  buttonText: {
    fontFamily: 'SFpro-Regular',
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
});
export default WhiteButton;
