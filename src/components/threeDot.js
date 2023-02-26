/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import COLORS from '../global/globalColors';
import WhiteButton from './buttons/whiteButton';

const ThreeDotComponent = ({onClose}) => {
  return (
    <TouchableOpacity style={styles.menuItemsWrap} onPress={onClose}>
      <WhiteButton buttonName={'copy link'} textColor={COLORS.primaryRed} />
      <WhiteButton
        buttonName={'mark as inappropriate'}
        textColor={COLORS.primaryRed}
      />
      <WhiteButton
        buttonName={'cancel'}
        textColor={COLORS.blue}
        onPress={onClose}
        customStyle={{marginTop: '5'}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItemsWrap: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
export default ThreeDotComponent;
