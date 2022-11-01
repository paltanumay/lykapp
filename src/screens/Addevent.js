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

import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function Addevent() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={globalStyles.innerPagesContainerWhite}>
      <View style={styles.addPhotoWrap}>
        <TouchableOpacity style={styles.addPhotoBt}>
          <FIcon name="plus" size={22} color={COLORS.blue} />

          <Text style={styles.addPhotoBtText}>Add photo</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addEventFormWRap}>
        <View style={styles.formBox}>
          <TextInput
            placeholderTextColor="#AFAFAF"
            style={styles.input}
            placeholder="Event Name*"
            textContentType="username"
            underlineColorAndroid="transparent"
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
            />
          </View>

          <View style={[styles.formBox, styles.formBoxinner]}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              placeholder="End date*"
              textContentType="username"
              underlineColorAndroid="transparent"
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
            />
          </View>

          <View style={[styles.formBox, styles.formBoxinner]}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              placeholder="End time*"
              textContentType="username"
              underlineColorAndroid="transparent"
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
          />
        </View>

        <TouchableOpacity style={[globalStyles.gradBt, {width: '100%'}]}>
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
