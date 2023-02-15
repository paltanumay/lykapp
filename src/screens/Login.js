import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Findconnectionsmodal from '../shared/Findconnectionsmodal';

import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {Formik} from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-community/async-storage';

const API_URL =
  process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/LYKUser';
export const LOGIN_URL = `${API_URL}/SignIn_2_0`;
export const SOCIAL_LOGIN_URL = `https://api.lykapp.com/lykjwt/index.php?/user/socialLogin`;

export default function Login({navigation}) {
  const [checked, setChecked] = useState(false);
  const [userInfo, setuserInfo] = useState();
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1095347807692-ut8j0g8sqltl0srjk1h5klhb6ril5ord.apps.googleusercontent.com',
    });
  }, []);
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
      const {user} = await appleAuthAndroid.signIn();
      setLoggedIn(true);
      setuserInfo(user);
      axios
        .post(SOCIAL_LOGIN_URL, {email: user.email, socialMedia: 'apple'})
        .then(
          res => {
            AsyncStorage.setItem(
              'userId',
              JSON.stringify(res.data.response.userDetails),
            );
            AsyncStorage.setItem('token', res.data.response.token);
            navigation.push('Sidenav');
          },
          err => {
            let errors = {};
            errors.message = 'Invalid username or password!';
          },
        )
        .catch(err => {});
      // Send the authorization code to your backend for verification
    } catch (error) {
      navigation.push('Sidenav');
    }
  };
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      setLoggedIn(true);
      setuserInfo(user);
      axios
        .post(SOCIAL_LOGIN_URL, {
          email: user.email,
          identity: user.id,
          socialMedia: 'googleplus',
        })
        .then(
          res => {
            AsyncStorage.setItem(
              'userId',
              JSON.stringify(res.data.response.userDetails),
            );
            AsyncStorage.setItem('token', res.data.response.token);
            navigation.push('Sidenav');
          },
          err => {
            let errors = {};
            errors.message = 'Invalid username or password!';
          },
        )
        .catch(err => {});
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
      this.setState({userInfo});
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

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     radioBtnsData: ['Item1', 'Item2'],
  //     checked: 0
  //   }
  // };
  return (
    <View>
      <Formik
        initialValues={{
          identity: '',
          password: '',
          countryCode: '+91',
          countryISO: 'in',
        }}
        onSubmit={(values, {setSubmitting}) => {
          axios
            .post(LOGIN_URL, {...values, type: 'mobile'})
            .then(
              res => {
                setSubmitting(false);
                AsyncStorage.setItem(
                  'userId',
                  JSON.stringify(res.data.response.userDetails),
                );
                AsyncStorage.setItem('token', res.data.response.token);
                if (res.data.response.userDetails) navigation.push('Sidenav');
                else
                  alert(
                    'Sorry, this number is not registered with us. Try login with the correct number or Signup.',
                  );
              },
              err => {
                let errors = {};
                errors.message = 'Invalid username or password!';
              },
            )
            .catch(err => {});
        }}>
        {({handleChange, handleSubmit, setFieldValue, isSubmitting}) => (
          <ScrollView contentContainerStyle={styles.scView}>
            <Text style={styles.loginText}>Log In</Text>
            <Findconnectionsmodal />
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
                containerStyle={{
                  width: '100%',
                  height: 50,
                  padding: 0,
                  marginLeft: -24,
                  fontSize: 14,
                }}
                textContainerStyle={{
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  margin: 0,
                  backgroundColor: '#fff',
                }}
                defaultCode="IN"
                layout="second"
                onChangeText={handleChange('identity')}
                onChangeCountry={e => {
                  setFieldValue('countryCode', '+' + e.callingCode[0]),
                    setFieldValue('countryISO', e.cca2);
                }}
                textInputStyle={styles.input}
                autoFocus
              />
            </View>

            <View style={styles.phoneInputWrap}>
              <TextInput
                placeholderTextColor="#000"
                style={styles.input}
                placeholder="Password"
                textContentType="username"
                underlineColorAndroid="transparent"
                autoCapitalize="none"
                onChangeText={handleChange('password')}
                maxLength={20}
              />
              <TouchableOpacity style={styles.passNShow}>
                {/* <IonIcon name="eye-outline" size={20} color={COLORS.blue} /> */}
                <IonIcon
                  name="ios-eye-off-outline"
                  size={20}
                  color={COLORS.blue}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity>
              <View style={styles.radioMainWrap}>
                <View>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => setChecked(!checked)}>
                    <Image
                      style={styles.img}
                      source={
                        checked
                          ? require('../assets/images/rb_unselected.png')
                          : require('../assets/images/rb_selected.png')
                      }
                    />
                    <Text style={styles.rememberPassText}>
                      Remember Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.gradBt, {width: '40%'}]}
              onPress={handleSubmit}
              disabled={isSubmitting}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={[globalStyles.linearGradient, {height: 38}]}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={styles.forgotPassText}
                onPress={() => this.setModalVisible(true)}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.gradBt, {width: '47%'}]}
              onPress={() => navigation.push('SignUp')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={[globalStyles.linearGradient, {height: 42}]}>
                <Text style={globalStyles.buttonText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={[globalStyles.gradBt, {width: '47%'}]}
              onPress={() => navigation.push('Country')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={[globalStyles.linearGradient, {height: 42}]}>
                <Text style={globalStyles.buttonText}>Skip Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.Iagree}>
              <Text style={styles.IagreeText}>
                By signing in you confirm that you are 13 {'\n'} years of age or
                above and agree to our
              </Text>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={styles.termsW}>
                  <Text style={styles.terms}>Terms of use </Text>
                </TouchableOpacity>
                <Text style={styles.IagreeText}> and </Text>
                <TouchableOpacity>
                  <Text style={styles.terms}>Privacy Policy.</Text>
                </TouchableOpacity>
              </View>
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
    alignItems: 'center',
  },
  scView: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    height: '100%',
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
    fontFamily: 'SFpro-Bold',
    fontSize: 29,
    color: COLORS.blue,
    marginBottom: 25,
  },
  gBt: {
    flexDirection: 'row',
    backgroundColor: '#ecf2fe',
    borderWidth: 1,
    borderColor: '#488bb4',
    width: 220,
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
    width: 220,
    borderRadius: 100,
    height: 45,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  gBtIcon: {
    width: 24,
    height: 24,
  },
  gBtText: {
    color: '#080d14',
    fontFamily: 'SFpro-Regular',
    marginLeft: 10,
    fontSize: 14,
  },
  aBtText: {
    color: '#fff',
    fontFamily: 'SFpro-Regular',
    marginLeft: 10,
    fontSize: 14,
  },
  orText: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: '#080d14',
    fontFamily: 'SFpro-Bold',
    marginVertical: 25,
    marginBottom: 10,
  },
  Iagree: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    // flexWrap: 'wrap',
    width: '80%',
    marginTop: 15,
    flexDirection: 'column',
    paddingLeft: 50,
  },
  IagreeText: {
    textAlign: 'left',
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize: 10,
  },
  termsW: {
    position: 'relative',
    //marginTop: 10,
  },
  terms: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Regular',
    fontSize: 10,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    textAlign: 'left',
  },

  phoneInputWrap: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 10,
    width: '50%',
  },
  passNShow: {
    position: 'absolute',
    right: 0,
    bottom: 15,
  },
  rememberPassText: {
    color: '#333',
    fontSize: 11,
    //marginBottom: 15,
    fontFamily: 'Lato-Regular',
    marginLeft: 8,
  },
  forgotPassText: {
    color: '#333',
    fontFamily: 'Lato-Semibold',
    fontSize: 11,

    marginVertical: 15,
  },
  input: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    color: '#333',
    textAlign: 'left',
  },
  lbimg: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  img: {
    height: 22,
    width: 22,
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
});
