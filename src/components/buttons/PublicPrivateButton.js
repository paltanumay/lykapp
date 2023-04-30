import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import COLORS from '../../global/globalColors';

const PublicPrivateButton = ({
  Icon,
  iconName,
  iconSize,
  btnText,
  active = false,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={mainStyles.publicBtns}>
      <Icon
        name={iconName}
        size={iconSize}
        color={active ? COLORS.blue : COLORS.gray}
        // color={COLORS.blue}
      />
      <Text
        style={
          !active
            ? mainStyles.publicBtnText
            : [mainStyles.publicBtnText, {color: COLORS.blue}]
        }>
        {btnText}
      </Text>
    </Pressable>
  );
};

const mainStyles = StyleSheet.create({
  active: {
    color: COLORS.blue,
  },
  publicBtnText: {
    paddingLeft: 5,
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'SFpro-Regular',
  },
  publicBtns: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightBlue,
    color: COLORS.blue,
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
});
export default PublicPrivateButton;
