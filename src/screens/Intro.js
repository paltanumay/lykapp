import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Private comments over public posts',
    text: 'Private comments give your social network more privacy! Privately comment on public posts',
    image: require('../assets/images/intro-1.webp'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Private comments over group chat conversation',
    text: 'Private comments give your social network more privacy! Privately comment on group chat',
    image: require('../assets/images/intro-2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'An app with invisible connections',
    text: 'Create invisible connections that no one else can see! Any activity between you and invisible connections is only seen by you',
    image: require('../assets/images/intro-3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Sharing disappearing messages with private chat',
    text: 'Use disappearing messages to control the privacy on your social network!',
    image: require('../assets/images/intro-4.png'),
    backgroundColor: '#22bcb5',
  },

  {
    key: 5,
    title: 'Get rewarded for your activities on LYK',
    text: 'Increase your engagement and earn rewards',
    image: require('../assets/images/intro-4.png'),
    backgroundColor: '#22bcb5',
  }

];

export default function Intro({ navigation }) {

  const _renderItem = ({ item }) => {
    return (
      <View style={{ backgroundColor: '#f8fcff', flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 20, }}>
          <View style={styles.slideBox}>
            <Text style={styles.slideMainText}>
              {item.title}
            </Text>
            <Text style={styles.slideSecText}>
              {item.text}
            </Text>


            <View style={styles.btWraps}>
              <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('SignUp')}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}> Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('Login')}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}>Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={[globalStyles.gradBt, styles.btcont]} onPress={() => navigation.push('Country')}>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}>Skip Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.loginImgWrap}>
              <Image
                resizeMode='contain'
                style={styles.loginImg}
                source={item.image}
              />
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
  return <AppIntroSlider renderItem={_renderItem} data={slides} activeDotStyle={styles.buttonCircle} />;
}

const styles = StyleSheet.create({
  slideBox: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingHorizontal:10
  },
  slideMainText: {
    fontSize: 29,
    textAlign: 'center',
    fontFamily: 'SFpro-Bold',
    color: COLORS.blue,
  },
  slideSecText: {
    textAlign: 'center',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'SFpro-Regular',
    color: COLORS.blue,
    marginTop:15
  },
  btWraps: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 45,
    width: '100%',

  },
  loginImgWrap: {
    alignItems: 'center'
  },
  btcont: {
    width: '70%'
  },
  buttonCircle: {
    width: 15,
    height: 10,
    backgroundColor: COLORS.blue,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImg: {
    height: 200
  }
});
