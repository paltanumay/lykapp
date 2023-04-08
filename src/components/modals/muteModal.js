import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import AuthButtons from '../buttons/AuthButtons';
import PopUpModalWrap from '../popUpModalWrap';

const MuteModal = ({modalVisible, setModalVisible}) => {
  return (
    <PopUpModalWrap
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          Pooja has been muted.You won't be able to see any post further from
          this user
        </Text>
        <TouchableOpacity
          style={[globalStyles.gradBt, {width: '40%'}]}
          //   onPress={handleSubmit}
          //   disabled={isSubmitting}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={[globalStyles.linearGradient, {height: 38}]}>
            <Text style={globalStyles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </PopUpModalWrap>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 30,
    width: '92%',
    height: 300,
    paddingHorizontal: 55,
    paddingBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 12,
    // borderBottomStartRadius: 0,
    // borderBottomEndRadius: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default MuteModal;
