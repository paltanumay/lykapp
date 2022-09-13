import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';

const API_URL = process.env.API_URL || 'https://newapi.lykapp.com/LYKAPI/index.php?';
export const LOGIN_URL = `${API_URL}/V0/LU/signIn`;

export default function login() {
  const [userInfo, setuserInfo] = useState();
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1095347807692-ut8j0g8sqltl0srjk1h5klhb6ril5ord.apps.googleusercontent.com',
    });
  }, [])
  const onAppleButtonPress = async () => {
    try {
      // Generate secure, random values for state and nonce
      const rawNonce = '123e4567-e89b-12d3-a456-426614174000';
      const state = '123e4567-e89b-12d3-a456-426614174000';

      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.lykapp.lyk',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://lykapp.com',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,

        // Random nonce value that will be SHA256 hashed before sending to Apple.
        nonce: rawNonce,

        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        state,
      });

      // Open the browser window for user sign in
      const { user } = await appleAuthAndroid.signIn();
      setLoggedIn(true);
      setuserInfo(user);
      // Send the authorization code to your backend for verification
    }
    catch (error) {
    }
  }
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      setLoggedIn(true);
      setuserInfo(user);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
        setLoggedIn(false);
      } else {
        // some other error
        setLoggedIn(false);
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      setuserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Formik
        initialValues={{ identity: '', password: '', countryCode: '+91', countryISO: 'in' }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post(LOGIN_URL, { ...values, type: 'mobile' },{
              headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
              }
            }).then(res => {
              setSubmitting(false);
              alert(res.data);
            }, err => {
              let errors = {};
              errors.message = 'Invalid username or password!';
              alert(err);
            }).catch(err=>{
            })
        }}
      >
        {({
          handleChange,
          handleSubmit,
        }) => (
          <ScrollView contentContainerStyle={styles.scView}>
            <Text style={styles.loginText}>Log In</Text>
            <TouchableOpacity style={styles.gBt} onPress={_signIn}>
              <Image
                style={styles.gBtIcon}
                source={require('../assets/images/google.png')}
              />
              <Text style={styles.gBtText}>Continue with Google</Text>
            </TouchableOpacity>

            {appleAuthAndroid.isSupported && (
              <TouchableOpacity style={styles.aBt} onPress={onAppleButtonPress}>
                <Image
                  style={styles.gBtIcon}
                  source={require('../assets/images/apple.png')}
                />
                <Text style={styles.aBtText}>Continue with Apple</Text>
              </TouchableOpacity>
            )}

            <Text style={styles.orText}>OR</Text>

            <View style={styles.phoneInputWrap}>
              <PhoneInput
                defaultCode="IN"
                layout="second"
                onChangeText={handleChange('identity')}
                onChangeCountry={handleChange('countryCode')}
                textInputStyle={styles.input}
                autoFocus
              />
            </View>

            <View style={styles.phoneInputWrap}>
              <TextInput
                placeholderTextColor="#AFAFAF"
                style={styles.input}
                placeholder="Type your password"
                textContentType="username"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={handleChange('password')}
              />
              <TouchableOpacity style={styles.passNShow}>
                <FIcon name="eye-off" size={20} color={COLORS.blue} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity><Text style={styles.rememberPassText}>Remember Password</Text></TouchableOpacity>

            <TouchableOpacity style={globalStyles.gradBt} onPress={handleSubmit}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity><Text style={styles.forgotPassText}>Forgot Password</Text></TouchableOpacity>

            <TouchableOpacity style={globalStyles.gradBt}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={globalStyles.gradBt}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Skip Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

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

            <Image
              style={styles.lbimg}
              source={require('../assets/images/login-b-img.png')}
            />


          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center'
  },
  scView: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center'

  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    color: COLORS.blue,
    marginBottom: 25,
  },
  gBt: {
    flexDirection: 'row',
    backgroundColor: '#ecf2fe',
    borderWidth: 1,
    borderColor: '#488bb4',
    width: '55%',
    borderRadius: 100,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginBottom: 15,
  },
  aBt: {
    flexDirection: 'row',
    backgroundColor: '#434343',
    borderWidth: 1,
    borderColor: '#434343',
    width: '55%',
    borderRadius: 100,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  gBtIcon: {
    width: 30,
    height: 30,
  },
  gBtText: {
    color: '#080d14',
    fontFamily: 'Lato-Regular',
    marginLeft: 10,
  },
  aBtText: {
    color: '#fff',
    fontFamily: 'Lato-Regular',
    marginLeft: 10,
  },
  orText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#080d14',
    fontFamily: 'Lato-Bold',
    marginVertical: 25,
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
    fontFamily: 'Lato-Regular',
  },
  termsW: {
    position: 'relative',
    marginTop: 10,
  },
  terms: {
    color: COLORS.blue,
  },

  phoneInputWrap: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '60%',
  },
  passNShow: {
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  rememberPassText: {
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Lato-Regular',

  },
  forgotPassText: {
    color: '#333',
    fontFamily: 'Lato-Bold',

    marginVertical: 15
  }
});
