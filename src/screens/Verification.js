import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import { Formik } from 'formik';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { Buffer } from 'buffer';

export const OTP_URL = `https://api.lykapp.com/lykjwt/index.php?/LYKUser/verifyOtpCode`;
export const LOST_PASS = 'https://api.lykapp.com/lykjwt/index.php?/user/lostPassword';
export const SOCIAL_SIGNUP_URL = `https://api.lykapp.com/lykjwt/index.php?/user/socialRegister`;

export default function Verification({ navigation, route }) {
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
  const resend = () => {
    axios.post(LOST_PASS,
      {
        "identity": route.params.number, "type": "sms",
        "did": Buffer.from(Math.random().toString()).toString("base64").slice(1, 22), "dt": "android"
      }).then(res => {
      }, err => {
      }).catch(err => {
      })
  };
  return (
    <View style={{backgroundColor:'#fff'}}>
    <Formik
      initialValues={{ otp: '', userId: route.params.userId, type: 'phone' }}
      onSubmit={(values, { setSubmitting }) => {
        axios.post(OTP_URL, { ...values }, {
          Headers: {
            token: route.params.token + '_GTT4--' + route.params.userId
          }
        }).then(res => {
          setSubmitting(false);
          navigation.push('Country');
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
        <ScrollView contentContainerStyle={{alignItems:"center"}}>
        <View style={styles.container}>
     
        

          <Text style={styles.loginText}>Sign Up</Text>
          <TouchableOpacity  style={styles.backBtWrap}><Text>
           <Image
        resizeMode='contain'
              style={styles.backBt}
              source={require('../assets/images/google.png')}
            />
        </Text>
        </TouchableOpacity>
          <View style={styles.phoneInputWrap}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              multiline={true}
              placeholder={"Enter Verification Code sent to " + route.params.number}
              textContentType="username"
              underlineColorAndroid="transparent"
              onChangeText={handleChange('otp')}
            />
          </View>

          <TouchableOpacity style={[globalStyles.gradBt, { width: '50%', marginBottom: 10 }]} onPress={handleSubmit}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={[globalStyles.linearGradient, { height: 38, paddingTop: 0, paddingBottom: 0 }]}>
              <Text style={globalStyles.buttonText}>Next</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendCode} onPress={resend}>
            <Text style={styles.resendCodetext}>Resend the code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.resendCode, {marginTop:4}]}>
            <Text style={styles.resendCodetext}>Call with Verification Code</Text>
          </TouchableOpacity>

          <Text style={styles.probWithVcode}>Problem with {"\n"} your verification code?</Text>

          <Text style={styles.youCanText}>You can use one of the sign up{"\n"}
            options below instead


            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada. Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Cras ultricies ligula sed magna dictum porta.

Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Sed porttitor lectus nibh.

Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Cras ultricies ligula sed magna dictum porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies ligula sed magna dictum porta. Cras ultricies ligula sed magna dictum porta.

Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
            
           </Text>




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





          <TouchableOpacity style={[globalStyles.gradBt, {width:197, height:38, marginTop:30}]} onPress={() => navigation.push('Login')}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={globalStyles.linearGradient}>
              <Text style={globalStyles.buttonText}>Log In</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={[globalStyles.gradBt, {width:197, height:38,}]} onPress={() => navigation.push('Country')}>
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
              <Text style={styles.terms}>Terms of use and Privacy Policy </Text>
            </TouchableOpacity>
            {/* <Text style={styles.IagreeText}> and </Text>
            <TouchableOpacity>
              <Text style={styles.terms}>Privacy Policy.</Text>
            </TouchableOpacity> */}
          </View>

          <Image
            style={styles.lbimg}
            source={require('../assets/images/login-b-img.png')}
          />


        </View>
        </ScrollView>
      )}
    </Formik>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
 
    alignItems: 'center',
    backgroundColor: '#fff',
    
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
    width: 261,
    borderRadius: 100,
    height: 47,
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
    width: '70%',
    borderRadius: 100,
    height: 47,
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'center',
    width: 261,
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
    // marginTop: 10,
  },
  terms: {
    color: COLORS.blue,
  },

  phoneInputWrap: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    width: '60%',
    alignItems: 'center',
  },
  resendCodetext: {
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',

  },
  probWithVcode: {
    marginTop: 25,
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    textAlign: 'center'
  },
  youCanText: {
    marginBottom: 25,
    color: COLORS.blue,
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    textAlign: 'center'


  },
  lbimg:{
    width:150,
    height:150,
    marginTop:25
  },
  input:{
    color:'#333'
  },
  backBtWrap:{
    
    width:50,
    height:50,
    // position:'absolute',
    // left:25,
    // top:22,
    // zIndex:9999
  },
  backBt:{
    width:'100%',
    height:'100%',
  
  }
});
