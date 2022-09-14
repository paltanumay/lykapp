import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { Component } from 'react';
import { globalStyles } from '../global/globalStyle';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';


export default class Selectcountry extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#037ee5', '#15a2e0', '#28cad9']}
          style={styles.linearGradient}>

          <View style={styles.logoWrap}>
            <Image
              style={styles.logo}
              source={require('../assets/images/logo.png')}
            />
          </View>


          {/* First slide */}
          {/* 
          <View style={styles.welcomeWrap}>
            <Text style={styles.welcomeTitle}>Welcome Ayan</Text>
            <Text style={styles.welcomeSubtext}>
              Please help us answer the next few questions about yourself to
              make your experience enjoyable
            </Text>

            <Text style={styles.selectCountryTitile}>Select your Country</Text>
            <TouchableOpacity style={globalStyles.gradBt}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}

          {/* Second slide */}

          <View style={styles.welcomeWrap}>
            {/* <Text style={styles.welcomeTitle}>Welcome Ayan</Text> */}
            <Text style={styles.welcomeSubtextNew}>
              Let us know what you are interested in
            </Text>

            <View style={styles.searchBox}>
              <TextInput
                placeholderTextColor="#AFAFAF"
                style={styles.input}
                placeholder="Search for more interests"
                textContentType="username"
                underlineColorAndroid="transparent"
                autoCapitalize="none"

              />
              <TouchableOpacity style={styles.search}>
                <FIcon name="search" size={22} color="#ccc" />
                </TouchableOpacity>

            </View>

            <Text style={styles.selectCountryTitile}>Select your Country</Text>
            <TouchableOpacity style={globalStyles.gradBt}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Next</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    flex: 1,
  },
  linearGradient: {
    height: '100%',
  },
  logoWrap: {
    alignItems: 'center',
    flex: 3,
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
  welcomeWrap: {
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 15,
    alignItems: 'center',
    flex: 6,
    paddingTop: 50
  },
  welcomeTitle: {
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 35,
  },
  welcomeSubtext: {
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    paddingHorizontal: 50,
    marginTop: 15
  },
  welcomeSubtextNew:{
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    marginTop: 25,
    textAlign:'center',
    marginBottom:20
  },
  selectCountryTitile: {
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    marginTop: 25
  },
  searchBox: {
    width: '80%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    height: 50,
    paddingHorizontal: 20,
    paddingRight:45
  },
  search:{
    position: 'absolute',
    right:20,
    top:12
  }
});
