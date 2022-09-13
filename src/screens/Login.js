import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import FIcon from 'react-native-vector-icons/Feather';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';

export default class login extends Component {
  render() {
    return (
      <View>
      <ScrollView contentContainerStyle={styles.scView}>
        <Text style={styles.loginText}>Log In</Text>
        <TouchableOpacity style={styles.gBt}>
          <Image
            style={styles.gBtIcon}
            source={require('../assets/images/google.png')}
          />
          <Text style={styles.gBtText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aBt}>
          <Image
            style={styles.gBtIcon}
            source={require('../assets/images/apple.png')}
          />
          <Text style={styles.aBtText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <View style={styles.phoneInputWrap}>
          <TextInput
            placeholderTextColor="#AFAFAF"
            style={styles.input}
            placeholder="Phone Number"
            textContentType="username"
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.phoneInputWrap}>
          <TextInput
            placeholderTextColor="#AFAFAF"
            style={styles.input}
            placeholder="Type your password"
            textContentType="username"
            underlineColorAndroid="transparent"
            keyboardType="password"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.passNShow}>
            <FIcon name="eye-off" size={20} color={COLORS.blue} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity><Text style={styles.rememberPassText}>Remember Password</Text></TouchableOpacity>

        <TouchableOpacity style={globalStyles.lineBt}>
          <Text style={globalStyles.lineBtText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity><Text style={styles.forgotPassText}>Forgot Password</Text></TouchableOpacity>

        <TouchableOpacity style={globalStyles.gradBt}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={globalStyles.linearGradient}>
            <Text style={globalStyles.buttonText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.gradBt}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   height:'100%',
   width:'100%',
   alignItems:'center'
  },
  scView:{
  backgroundColor:'#fff',
  width:'100%',
  alignItems:'center'

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
  rememberPassText:{
    color:'#333',
    marginBottom:15,
    fontFamily: 'Lato-Regular',

  },
  forgotPassText:{
    color:'#333',
    fontFamily: 'Lato-Bold',

    marginVertical:15
  }
});
