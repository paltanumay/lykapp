import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';
import CheckBox from '@react-native-community/checkbox';
import OctIcon from 'react-native-vector-icons/Octicons';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Agemodal() {
  const [modalVisible, setModalVisible] = useState(false);

  const [isSelected, setSelection] = useState(true);
  return (
    <>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>

          <View style={styles.centeredViewInner}>
            <View style={styles.modalView}>
            <TouchableOpacity  style={styles.modalClose} onPress={() => this.setModalVisible(!modalVisible)}>
              <IonIcon name="md-close" size={23} color="#333" />

              </TouchableOpacity>

              <Text style={styles.ageConfirmTitle}>
                I confirm to be 13 years of age or above and agree to LYK App’s
              </Text>
              <TouchableOpacity>
                <Text style={styles.privacyLinkText}>Terms of use and Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>
    </>
  );
}

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
  centeredViewInner: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalView: {
    paddingTop: 30,
    width: '100%',
    paddingHorizontal:55,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 32,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
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
  linearGradient: {
    padding: 35,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  mSignupBt: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 31,
    width: 114,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mSignupBttext: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    fontSize: 14,
    color: '#2e2e2e',
    marginBottom: 15,
  },
  modalOrText: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#fff',
    marginBottom: 15,
  },
  modalClose:{
    position: 'absolute',
    right:20,
    top:12,
    zIndex: 999,
  },
  resetPassTitle: {
    fontFamily: 'SFpro-Bold',
    color: COLORS.blue,
    fontSize: 29,
  },
  phoneInputWrap: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '60%',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  resendCode: {
    marginTop: 0,
  },
  resendCodetext: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Bold',
  },
  notYouText: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Bold',
    marginTop: 15,
  },
  reset1: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  reset2: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  reset3: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 25,
  },
  input: {
    textAlign: 'left',
    fontFamily: 'SFpro-Regular',
    width: '100%',
  },
  resetPassSuccessTitle: {
    fontFamily: 'SFpro-Bold',
    color: COLORS.blue,
    fontSize: 18,
    textAlign: 'center',
  },
  scText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'SFpro-Regular',
    marginTop: 5,
  },
  checkboxWrap: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 20,
  },
  ageConfirmTitle:{
    fontSize: 15,
    color: '#000',
    fontFamily: 'SFpro-Regular',
    textAlign:'center'
  },
  privacyLinkText:{
    fontFamily: 'SFpro-Medium',
color:COLORS.blue,
fontSize: 15,
  }

});
