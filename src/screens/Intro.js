import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
// import AppIntroSlider from 'react-native-app-intro-slider';

export default function Intro({ navigation }) {
  
  return (
    <View style={{ backgroundColor: '#f8fcff', flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, }}>
        <View style={styles.slideBox}>
          <Text style={styles.slideMainText}>
            Private comments over public posts
          </Text>
          <Text style={styles.slideSecText}>
            Private comments give your social network more privacy! Privately
            comment on public posts
          </Text>


          <View style={styles.btWraps}>
            <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('SignUp')}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}> Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('Login')}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Login</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('Country')}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Skip sign up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.loginImgWrap}>
            <Image
              resizeMode='contain'
              style={styles.loginImg}
              source={require('../assets/images/login-b-img.png')}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  slideBox: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 35
  },
  slideMainText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
    color: COLORS.blue,
  },
  slideSecText: {
    textAlign: 'center',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Lato-regular',
    color: COLORS.blue,
  },
  btWraps: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 45,
    width:'100%',
 
  },
  loginImgWrap: {
    alignItems: 'center'
  },
  btcont: {
    width: '70%'
  }

});
