import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {Component, useState} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import Gmodal from '../shared/Gmodal';
import LinearGradient from 'react-native-linear-gradient';

import FIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Buffer} from 'buffer';

import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Formik} from 'formik';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const API_URL =
  process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const UPLOAD_IMG = `${API_URL}/Chatpost/uploadImage`;
export const CREATE_EVENT = `${API_URL}/LYKEvent/createEvent`;
export const CREATE_EVENT_SHORT = 'cetevnt';

export default function Addevent() {
  const [modalVisible, setModalVisible] = useState(true);

  const [mydate, setMyDate] = useState(new Date());
  const navigation = useNavigation();
  const [imgUrl, setImgUrl] = useState();
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [eventStartDate, seteventStartDate] = useState('');
  const [eventEndDate, seteventEndDate] = useState('');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [display, setDiplay] = useState('');
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const setDate = (event, date) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
    console.log(date);
    setShow(false);
    setMyDate(new Date(date));
    if (mode == 'date') {
      if (display === 'eventStartDate')
        seteventStartDate(new Date(date).toISOString().split('T')[0]);
      else seteventEndDate(new Date(date).toISOString().split('T')[0]);
    } else {
      if (display === 'startTime')
        setstartTime(new Date(date).toLocaleTimeString());
      else setendTime(new Date(date).toLocaleTimeString());
    }
  };
  const uploadProgress = ProgressEvent => {
    console.log(ProgressEvent.total);
  };
  const handlePress = async () => {
    console.log('enter');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Access Storage',
          message: 'Access Storage for the pictures',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use read from the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        console.log('response', JSON.stringify(res));
        uploadFile(res.assets[0]);
      }
    });
  };
  const uploadFile = file => {
    let formdata = new FormData();
    formdata.append('image', {
      name: 'image',
      type: file.type,
      uri: file.uri,
    });
    axios
      .post(UPLOAD_IMG, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgress,
      })
      .then(
        res => {
          //alert(JSON.stringify(res.data.response.imageUrl ))
          setImgUrl(res.data.response.imageUrl);
        },
        err => {
          console.log(err);
        },
      );
  };
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
              {/* <TouchableOpacity  style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
              <IonIcon name="md-close" size={23} color="#333" />

              </TouchableOpacity> */}
              <Text style={styles.modalText}>Add Image</Text>
              <TouchableOpacity>
                <Text style={styles.modalBodyText}>Open Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.modalBodyText}>Choose Image from Gallery</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.modalBodyText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable> */}
      </View>

      <Formik
        initialValues={{
          eventSubject: '',
          eventLocation: '',
          eventContent: '',
        }}
        onSubmit={async (values, {setSubmitting}) => {
          let userDetails = await AsyncStorage.getItem('userId');
          userDetails = JSON.parse(userDetails);
          let token =
            (await AsyncStorage.getItem('token')) +
            '-' +
            CREATE_EVENT_SHORT +
            '-' +
            getEncTokenAnyUserId(userDetails.userId);
          axios
            .post(
              CREATE_EVENT,
              {
                ...values,
                ...{
                  userId: getEncUserId(userDetails.userId),
                  myName: userDetails.firstName,
                  eventStartDate: eventStartDate,
                  startTime: startTime,
                  eventEndDate: eventEndDate,
                  endTime: endTime,
                  ticketsURL: '',
                  deviceType: 'android',
                  imageUrl: imgUrl,
                  deviceId: Buffer.from(Math.random().toString())
                    .toString('base64')
                    .slice(1, 22),

                  // public--1, my family--2, invite all-3
                  selectedType: '1',
                  userList: [],
                },
              },
              {
                headers: {
                  token: token,
                },
              },
            )
            .then(
              res => {
                setSubmitting(false);
                navigation.push('EventsDetails', {
                  id: res.data.response.eventId,
                  route: 'addevent',
                });
              },
              err => {
                let errors = {};
                errors.message = 'Invalid username or password!';
                console.log(err);
              },
            )
            .catch(err => {});
        }}>
        {({handleChange, handleSubmit, setFieldValue, isSubmitting}) => (
          <View style={globalStyles.innerPagesContainerWhite}>
            {imgUrl ? (
              <View style={styles.addPhotoWrap}>
                <Image
                  style={styles.eventImg}
                  source={{
                    uri: 'https://cdn.lykapp.com/newsImages/images/' + imgUrl,
                  }}
                />
              </View>
            ) : (
              <View style={styles.addPhotoWrap}>
                <TouchableOpacity
                  style={styles.addPhotoBt}
                  // onPress={handlePress}
                  onPress={() => setModalVisible(true)}
                  >
                  <FIcon name="plus" size={22} color={COLORS.blue} />

                  <Text style={styles.addPhotoBtText}>Add photo</Text>
                </TouchableOpacity>
              </View>
            )}

            {show && (
              <RNDateTimePicker
                value={mydate}
                onChange={setDate}
                display={'default'}
                mode={mode}
              />
            )}

            <View style={styles.addEventFormWRap}>
              <View style={styles.formBox}>
                <TextInput
                  placeholderTextColor="#AFAFAF"
                  style={styles.input}
                  placeholder="Event Name*"
                  textContentType="username"
                  underlineColorAndroid="transparent"
                  onChangeText={handleChange('eventSubject')}
                />
              </View>
              <View style={styles.startDate}>
                <View style={[styles.formBox, styles.formBoxinner]}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Start date*"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    onTouchStart={() => {
                      showMode('date'), setDiplay('eventStartDate');
                    }}
                    value={eventStartDate}
                  />
                </View>

                <View style={[styles.formBox, styles.formBoxinner]}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="End date"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    onTouchStart={() => {
                      showMode('date'), setDiplay('eventEndDate');
                    }}
                    value={eventEndDate}
                  />
                </View>
              </View>

              <View style={styles.startDate}>
                <View style={[styles.formBox, styles.formBoxinner]}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Start time*"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    onTouchStart={() => {
                      showMode('time'), setDiplay('startTime');
                    }}
                    value={startTime}
                  />
                </View>

                <View style={[styles.formBox, styles.formBoxinner]}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="End time"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    onTouchStart={() => {
                      showMode('time'), setDiplay('endTime');
                    }}
                    value={endTime}
                  />
                </View>
              </View>

              <View style={styles.formBox}>
                <TextInput
                  placeholderTextColor="#AFAFAF"
                  style={styles.input}
                  placeholder="Location*"
                  textContentType="username"
                  underlineColorAndroid="transparent"
                  onChangeText={handleChange('eventLocation')}
                />
              </View>

              <View style={styles.formBox}>
                <TextInput
                  placeholderTextColor="#AFAFAF"
                  style={[styles.input, {textAlignVertical: 'top'}]}
                  placeholder="Type your message"
                  textContentType="username"
                  underlineColorAndroid="transparent"
                  multiline={true}
                  numberOfLines={7}
                  onChangeText={handleChange('eventContent')}
                />
              </View>

              <TouchableOpacity
                style={[globalStyles.gradBt, {width: '100%'}]}
                disabled={isSubmitting}
                onPress={handleSubmit}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#037ee5', '#15a2e0', '#28cad9']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}>Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </>
  );
}

const styles = StyleSheet.create({
  addPhotoWrap: {
    backgroundColor: '#dbe0e6',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImg: {
    width: '100%',
    height: '100%',
  },
  addPhotoBt: {
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.blue,
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  addPhotoBtText: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Medium',
  },
  input: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  addEventFormWRap: {
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  formBox: {
    borderWidth: 1,
    borderColor: '#9d9d9d',
    borderRadius: 7,
    paddingHorizontal: 8,
    flexDirection: 'row',
    marginBottom: 15,
  },
  startDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formBoxinner: {
    width: '48%',
  },
  // Modal
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    margin: 20,
    paddingTop: 25,
    backgroundColor: 'white',
    borderRadius: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBodyText: {
    fontFamily: 'SFpro-Regular',
    fontSize: 16,
    paddingHorizontal: 25,
    textAlign: 'center',
    paddingVertical: 15,
    paddingTop: 0,
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
  modalText: {
    fontFamily: 'SFpro-Bold',
    color: '#000',
    fontSize: 19,
    marginBottom: 15,
    textAlign: 'center',
    // paddingVertical:15

    paddingLeft:25
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
    top: 7,
    zIndex: 999,
  },
  learnmoreBtWrapmain: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  learnmoreBtWrap: {
    width: '50%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingVertical: 10,
  },
  learnmoreBtText: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Medium',
  },
  modalClose: {
    position: 'absolute',
    right: 8,
    top: 10,
    zIndex: 999,
  },
});
