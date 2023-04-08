import React from 'react';
import {Pressable, TextInput} from 'react-native';
import {Image} from 'react-native';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LinearGradient} from 'react-native-svg';
import {globalStyles} from '../global/globalStyle';

const PopUpModalWrap = ({modalVisible, setModalVisible, children}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(prev => !prev);
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}>
          <View style={styles.centeredViewInner}>{children}</View>
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
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
  },
  centeredViewInner: {
    // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    marginTop: 60,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
});
export default PopUpModalWrap;
