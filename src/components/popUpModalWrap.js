import React from 'react';
import {Pressable, TextInput} from 'react-native';
import {Image} from 'react-native';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'react-native-svg';
import {globalStyles} from '../global/globalStyle';

const PopUpModalWrap = ({
  modalVisible,
  setModalVisible,
  children,
  hasBackDropColor,
}) => {
  return (
    <View
      style={
        !hasBackDropColor
          ? styles.centeredView
          : [styles.centeredView, styles.backDropColor]
      }>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={setModalVisible}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View
            style={
              !hasBackDropColor
                ? styles.centeredViewInner
                : [
                    styles.centeredViewInner,
                    {backgroundColor: 'rgba(0, 0, 0, 0.8)'},
                  ]
            }>
            {children}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',

    zIndex: 9999,
  },
  backDropColor: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  centeredViewInner: {
    paddingTop: 60,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
export default PopUpModalWrap;
