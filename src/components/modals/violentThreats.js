/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import BlackBorderButton from '../buttons/blackBorderButton';
import PopUpModalWrap from '../popUpModalWrap';
import FaIcon from 'react-native-vector-icons/Feather';

const ViolentThreatsModal = ({
  modalVisible,
  setModalVisible,
  setSelectedValue,
}) => {
  return (
    <PopUpModalWrap
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackDropColor={true}>
      <View style={styles.modalView}>
        <View style={styles.modalTitle}>
          <Text style={styles.modalText}>Violent Threats</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <FaIcon style={styles.closeIcon} name="x" size={24} color="#000" />
          </Pressable>
        </View>
        <View style={styles.modalInfo}>
          <Text style={styles.commonText}>
            We maintain a safe and successful online community by only allowing
            contain that follows our Terms of Service and privacy. we don't
            allow thing such as
          </Text>
          <Text style={styles.textPoints}>
            • Targeting or impersonating & mention of specific weapon
          </Text>
          <Text style={styles.textPoints}>
            • Any acts of Terrorism, mention or reference of any criminal
            organization
          </Text>
          <Text style={styles.textPoints}>
            {' '}
            • Graphics of extreme violence or glorifying violence.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            globalStyles.gradBt,
            {alignItems: 'center', marginBottom: 10},
          ]}
          onPress={() => setSelectedValue('Violent Threats')}
          //   disabled={isSubmitting}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={[globalStyles.linearGradient, {width: 250, height: 40}]}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <BlackBorderButton
          borderColor="#a8a49c"
          handleSubmit={() => setModalVisible(false)}
        />
      </View>
    </PopUpModalWrap>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    width: '92%',
    // height: 200,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    // justifyContent: 'center',
    borderRadius: 12,
    // borderBottomStartRadius: 0,
    // borderBottomEndRadius: 0,
    overflow: 'hidden',
    // alignSelf: 'center',
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
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    // marginLeft: 80,
    // paddingHorizontal: 30,
    lineHeight: 35,
    color: '#000',
    fontWeight: '600',
  },
  textSpan: {
    color: '#000',
  },
  modalTitle: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIcon: {
    paddingLeft: 60,
  },
  modalInfo: {
    fontSize: 15,
    marginBottom: 10,
    marginVertical: 5,
  },
  textPoints: {
    paddingVertical: 10,
    color: '#353535',
    fontSize: 15,
    fontWeight: '500',
  },
  commonText: {
    color: '#000',
    lineHeight: 20,
  },
});
export default ViolentThreatsModal;
