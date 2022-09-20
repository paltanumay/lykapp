import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { Buffer } from 'buffer';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/LYKUser';
export const SIGNUP_URL = `https://api.lykapp.com/lykjwt/index.php?/user/newUserRegister_V2`;
export const LOST_PASS = 'https://api.lykapp.com/lykjwt/index.php?/user/lostPassword';
export const SOCIAL_SIGNUP_URL = `https://api.lykapp.com/lykjwt/index.php?/user/socialRegister`;

export default function Signup({ navigation }) {
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
      axios.post(SOCIAL_SIGNUP_URL, { email: user.email, displayName: user.name.firstName + ' ' + user.name.lastName, socialMedia: 'apple' }).then(res => {
        if (res.data.response.respCode === 11) navigation.push('Sidenav');
        else navigation.push('Country');
      }, err => {
        let errors = {};
        errors.message = 'Invalid username or password!';
      }).catch(err => {
      })
      // Send the authorization code to your backend for verification
    }
    catch (error) {
      navigation.push('Sidenav');
    }
  }
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { user } = await GoogleSignin.signIn();
      setLoggedIn(true);
      setuserInfo(user);
      axios.post(SOCIAL_SIGNUP_URL, { googlePlusUserId: user.id, displayName: user.name, email: user.email, identity: user.id, socialMedia: 'googleplus' }).then(res => {
        if (res.data.response.respCode === 11) navigation.push('Sidenav');
        else navigation.push('Country');
      }, err => {
        let errors = {};
        errors.message = 'Invalid username or password!';
      }).catch(err => {
      })
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

  const getCurrentUserInfo = async () => {
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setLoggedIn(false);
      setuserInfo(null); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  const getEncUserId = (currentUserId) => {
    let encUserId = "";
    if (currentUserId != null) {
      let userId = parseInt(currentUserId);
      let digitEnc = "";
      while (userId > 0) {
        let remainder = userId % 10;
        let digit = (remainder > 0) ? remainder - 1 : 9;
        userId = parseInt(userId / 10);
        switch (digit) {
          case 0:
            digitEnc = "#";
            break;
          case 1:
            digitEnc = "K";
            break;
          case 2:
            digitEnc = "!";
            break;
          case 3:
            digitEnc = "A";
            break;
          case 4:
            digitEnc = "Z";
            break;
          case 5:
            digitEnc = "%";
            break;
          case 6:
            digitEnc = "M";
            break;
          case 7:
            digitEnc = "Y";
            break;
          case 8:
            digitEnc = "X";
            break;
          case 9:
            digitEnc = "$";
            break;
        }
        encUserId = digitEnc + encUserId;
      }
    }
    return encUserId;
  }
  const xorWithKey = (a, key) => {
    let out = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      out[i] = (a[i] ^ key[i % key.length]);
    }
    return out;
  }
  return (
    <Formik
      initialValues={{
        contactNo: '', countryName: "India", countryISO: 'IN', countryCode: '+91', orgISO: 'IN',
        "forceReg": true, "did": Buffer.from(Math.random().toString()).toString("base64").slice(1, 22)
        , "dt": "android", "dc": 4405, "referJson": {}, "ct": "DA0CAwwDAQ0CBkxJSFJaRF5wfHlYZVtyDENcQ1NkZwEEAkM="
      }}
      onSubmit={(values, { setSubmitting }) => {
        const s = (x) => { return x.charCodeAt() };
        let enc = Buffer.from(xorWithKey(JSON.stringify(values).split('').map(s), "x09c22f5".split('').map(s)), 'utf-8').toString('base64');
        axios.post(SIGNUP_URL, { url: enc }).then(res => {
          navigation.push('Verification', { number: values.countryCode + ' ' + values.contactNo, token: res.data.response.token, userId: getEncUserId(res.data.response.userId) });
        }, err => {
          axios.post(LOST_PASS,
            {
              "identity": values.countryCode + values.contactNo, "type": "sms",
              "did": Buffer.from(Math.random().toString()).toString("base64").slice(1, 22), "dt": "android"
            }).then(res => {
              setSubmitting(false);
              navigation.push('Verification', { number: values.countryCode + ' ' + values.contactNo, token: res.data.response.token, userId: getEncUserId(res.data.response.userId) });
            }, err => {
            }).catch(err => {
            })
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
        <View style={styles.container}>
          <Text style={styles.loginText}>Sign Up</Text>
          <TouchableOpacity style={styles.gBt} onPress={_signIn}>
            <Image
              style={styles.gBtIcon}
              source={require('../assets/images/google.png')}
            />
            <Text style={styles.gBtText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.aBt} onPress={onAppleButtonPress}>
            <Image
              style={styles.gBtIcon}
              source={require('../assets/images/apple.png')}
            />
            <Text style={styles.aBtText}>Continue with Apple</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <View style={styles.phoneInputWrap}>
            <PhoneInput
              containerStyle={{ width: '100%', height: 50, padding: 0, }}
              textContainerStyle={{ paddingVertical: 0, paddingHorizontal: 0, margin: 0, backgroundColor: '#fff' }}
              defaultCode="IN"
              layout="second"
              onChangeText={handleChange('contactNo')}
              onChangeCountry={e => { setFieldValue('countryISO', e.cca2), setFieldValue('countryCode', e.callingCode[0]), setFieldValue('orgISO', e.cca2) }}
              textInputStyle={styles.input}
              autoFocus
            />
          </View>

          <TouchableOpacity style={globalStyles.lineBt} onPress={handleSubmit} disabled={isSubmitting}>
            <Text style={globalStyles.lineBtText}>Next</Text>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.gradBt} onPress={() => navigation.push('Login')}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={globalStyles.linearGradient}>
              <Text style={globalStyles.buttonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={globalStyles.gradBt} onPress={() => navigation.push('Country')}>
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
              agree to our</Text>

            <TouchableOpacity style={styles.termsW}><Text style={styles.terms}>Terms of use </Text></TouchableOpacity><Text style={styles.IagreeText}> and </Text><TouchableOpacity><Text style={styles.terms}>Privacy Policy.</Text></TouchableOpacity>

          </View>

          <Image
            style={styles.lbimg}
            source={require('../assets/images/login-b-img.png')}
          />

        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({


  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#fff'
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
    marginTop: 15
  },
  IagreeText: {
    textAlign: 'center',
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  termsW: {
    position: 'relative',
    marginTop: 10
  },
  terms: {
    color: COLORS.blue
  },

  phoneInputWrap: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '60%',
    alignItems: 'center'
  }
})