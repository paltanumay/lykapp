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
import FIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Acalreadyexitmodal() {
  const [modalVisible, setModalVisible] = useState(false);

  const [isSelected, setSelection] = useState(true);
  const [checked, setChecked] = useState(0);
  var gender = ['', ''];
 

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
              {/* step -1 */}

              <View style={[styles.reset1]}>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => this.setModalVisible(!modalVisible)}>
                  <IonIcon name="close" size={27} color="#333" />
                </TouchableOpacity>

                <Text style={styles.resetPassTitle}>Account already</Text>
                <Text style={styles.resetPassTitle}>exists</Text>

                <Text style={styles.lookLikeText}>
                  Looks like you already have an account. Please log in instead.
                </Text>

                <Text style={styles.lookLikePhText}>
                +91 9869222738
                </Text>

                <View style={styles.phoneInputWrap}>
              <TextInput
                placeholderTextColor="#000"
                style={styles.input}
                placeholder="Password"
                textContentType="username"
                underlineColorAndroid="transparent"
               
              />
              <TouchableOpacity style={styles.passNShow}>
                <FIcon name="eye-off" size={20} color={COLORS.blue} />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity>
              <View style={styles.radioMainWrap}>
                {this.state.radioBtnsData.map((data, key) => {
                  return (
                    <View key={key}>
                      {this.state.checked == key ?
                        <TouchableOpacity style={styles.btn}>
                          <Image style={styles.img} source={require("../assets/images/rb_unselected.png")} />
                          <Text>{data}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={styles.btn}>
                          <Image style={styles.img} source={require("../assets/images/rb_selected.png")} />
                          <Text>{data}</Text>
                        </TouchableOpacity>
                      }
                    </View>
                  )
                })}
              </View>

              <Text style={styles.rememberPassText}>Remember Password</Text>
              </TouchableOpacity> */}
              <Text style={styles.rememberPassText}>Remember Password</Text>




                <TouchableOpacity style={globalStyles.gradBt}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#037ee5', '#15a2e0', '#28cad9']}
                    style={globalStyles.linearGradient}>
                    <Text style={globalStyles.buttonText}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity><Text style={styles.forgotPassText}>Forgot Password</Text></TouchableOpacity>

                <View style={styles.Iagree}>
              <Text style={styles.IagreeText}>
                By signing in you confirm that you are 13 years of age or above and
                agree to our
              </Text>

              <TouchableOpacity style={styles.termsW}>
                <Text style={styles.terms}>Terms of use </Text>
              </TouchableOpacity>
              <Text style={styles.IagreeText}> and </Text>
              <TouchableOpacity>
                <Text style={styles.terms}>Privacy Policy.</Text>
              </TouchableOpacity>
            </View>
              </View>

              {/* <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => this.setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Sign Up</Text>
                    </Pressable> */}
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
    paddingTop: 50,
    width: '100%',
    paddingBottom: 10,
    backgroundColor: 'white',
    borderRadius: 32,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
  modalClose: {
    position: 'absolute',
    right: 15,
    top: -28,
    zIndex: 999,
  },
  resetPassTitle: {
    fontFamily: 'SFpro-Bold',
    color: COLORS.blue,
    fontSize: 19,
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
  lookLikeText:{
    fontSize: 14,
    color: '#000',
    fontFamily: 'SFpro-Regular',
    textAlign:'center',
    paddingHorizontal:50,
    paddingVertical:15
  },
  lookLikePhText:{
    color:COLORS.blue,
    fontFamily: 'SFpro-Bold',

  },
  passNShow: {
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  radio: {
    flexDirection: 'row',
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotPassText: {
    color: '#333',
    fontFamily: 'SFpro-Bold',
    marginVertical: 15,
    fontSize:11
  },
  rememberPassText: {
    color: '#333',
    marginBottom:4,
    fontSize:11,
    fontFamily: 'Lato-Regular',

  },
  Iagree: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    marginTop: 15,
  },
  IagreeText: {
    textAlign: 'center',
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize:10
  },
  termsW: {
    position: 'relative',
    marginTop: 10,
  },
  terms: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Regular',
    fontSize:10
  },
});
