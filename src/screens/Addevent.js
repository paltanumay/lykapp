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
import { Buffer } from 'buffer';

import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Formik } from 'formik';

export default function Addevent() {
  const navigation = useNavigation();
  const [imgUrl, setImgUrl] = useState();
  const uploadProgress = (ProgressEvent) => {
    console.log(ProgressEvent.total);
  };
  const handlePress = async () => {
    console.log('enter')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Access Storage',
          'message': 'Access Storage for the pictures'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use read from the storage")
      } else {
        console.log("Storage permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option'
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
  const uploadFile = (file) => {
    let formdata = new FormData();
    formdata.append('image', {
      name: "image",
      type: file.type,
      uri: file.uri
    });
    axios.post(UPLOAD_IMG, formdata, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: uploadProgress
    }).then(res => {
      //alert(JSON.stringify(res.data.response.imageUrl ))
      setImgUrl(res.data.response.imageUrl)
    }, err => {
      console.log(err)
    })
  };
  return (
    <Formik
        initialValues={{ 
          "eventSubject": "",
                "eventStartDate": "",
                "startTime": "",
                "eventEndDate": "",
                "endTime": "",

                "eventLocation": "",
                "eventContent": "", 
        }}
        onSubmit={async (values, { setSubmitting }) => {
          let userDetails = await AsyncStorage.getItem('userId');
          userDetails = JSON.parse(userDetails);
          let token = await AsyncStorage.getItem("token") + "-" + HOME_FEED_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
          axios.post(LOGIN_URL, { ...values, ...{
            "userId": userDetails.userId,
                "myName": userDetails.firstName,
                "ticketsURL": "",
                "deviceType": "android",
                "imageUrl": imgUrl,
                "deviceId": Buffer.from(Math.random().toString()).toString("base64").slice(1, 22),

                // public--1, my family--2, invite all-3
                "selectedType": "1",
                "userList": [],
          }},{
            headers: {
              token: token
            }
          }).then(res => {
            setSubmitting(false);
            navigation.push('EventDetails',{id: res.data.response.lastId})
          }, err => {
            let errors = {};
            errors.message = 'Invalid username or password!';
          }).catch(err => {
          })
        }}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldValue,
          isSubmitting
        }) => (
       
    <View style={globalStyles.innerPagesContainerWhite}>
      {imgUrl ? (<View style={styles.addPhotoWrap}>
        <Image
          style={styles.eventImg}
          source={{
            uri: 'https://cdn.lykapp.com/newsImages/images/' + imgUrl
          }}
        />
      </View>):
      (<View style={styles.addPhotoWrap} onPress={handlePress}>
        <TouchableOpacity style={styles.addPhotoBt}>
          <FIcon name="plus" size={22} color={COLORS.blue} />

          <Text style={styles.addPhotoBtText}>Add photo</Text>
        </TouchableOpacity>
      </View>)}

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
              onChangeText={handleChange('eventStartDate')}
            />
          </View>

          <View style={[styles.formBox, styles.formBoxinner]}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              placeholder="End date*"
              textContentType="username"
              underlineColorAndroid="transparent"
              onChangeText={handleChange('eventEndDate')}
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
              onChangeText={handleChange('startTime')}
            />
          </View>

          <View style={[styles.formBox, styles.formBoxinner]}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              placeholder="End time*"
              textContentType="username"
              underlineColorAndroid="transparent"
              onChangeText={handleChange('endTime')}
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

        <TouchableOpacity style={[globalStyles.gradBt, {width: '100%'}]} disabled={isSubmitting} onPress={handleSubmit}>
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
  );
}

const styles = StyleSheet.create({
  addPhotoWrap: {
    backgroundColor: '#dbe0e6',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
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
});
