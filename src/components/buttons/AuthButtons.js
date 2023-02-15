import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const AuthButtons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.authButtonWrap}>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.push('Login')}>
        <Text style={[styles.btnText, {color: '#fff'}]}>log in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => navigation.push('SignUp')}>
        <Text style={styles.btnText}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  authButtonWrap: {
    display: 'flex',
    width: 130,
    height: 25,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  loginBtn: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 5,
  },
  signupBtn: {
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'SFpro-Regular',
  },
});
export default AuthButtons;
