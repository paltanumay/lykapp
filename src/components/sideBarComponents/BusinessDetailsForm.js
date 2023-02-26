/* eslint-disable react-native/no-inline-styles */

import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import COLORS from '../../global/globalColors';
import CountryPicker from 'react-native-country-picker-modal';
import EiIcons from 'react-native-vector-icons/EvilIcons';

const BusinessDetailsForm = ({extraFieldName}) => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState('91');

  const handleOnSelect = country => {
    setCountryCode(country.cca2);
    setCountry(country.callingCode[0]);
    console.log(country);
  };
  return (
    <View style={styles.businessDetailsWrap}>
      <View style={styles.inputWrap}>
        <TextInput
          placeholder="Business Email"
          placeholderTextColor={'#cac8c3'}
          style={{
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 49,
          }}
        />
      </View>
      {extraFieldName && (
        <View style={styles.inputWrap}>
          <TextInput
            placeholder={extraFieldName}
            placeholderTextColor={'#cac8c3'}
            style={{
              padding: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              height: 49,
            }}
          />
        </View>
      )}
      <View style={styles.inputTextWrap}>
        <Text style={styles.inputText}>Business Phone</Text>
      </View>
      <View style={[styles.inputWrap, styles.phoneInputWrap]}>
        <View style={styles.countryWrap}>
          <CountryPicker
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              //   withCountryNameButton,
              //   withAlphaFilter,
              withCallingCode: true,
              //   withEmoji,
              onSelect: handleOnSelect,
            }}
          />
          <EiIcons name="chevron-down" size={20} color={'#000'} />
          <TextInput
            placeholder="Business Email"
            placeholderTextColor={'#cac8c3'}
            style={{
              padding: 10,
              backgroundColor: '#fff',
              width: '79.9%',
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              height: 49,
              borderLeftColor: COLORS.gray,
              borderLeftWidth: 1,
            }}
            value={'+' + country}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrap: {
    marginVertical: 12,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 9,
  },
  businessDetailsWrap: {
    display: 'flex',
    width: '100%',
  },
  phoneInputWrap: {
    position: 'relative',
  },
  countryWrap: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 49,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputTextWrap: {
    top: 22,
    position: 'relative',
    zIndex: 99999,
  },
  inputText: {
    textTransform: 'uppercase',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 14,
    alignSelf: 'center',
  },
});
export default BusinessDetailsForm;
