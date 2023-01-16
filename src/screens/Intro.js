import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    title: 'Get rewarded for\n your activities\n on LYK',
    text: 'Increase your engagement\n and earn rewards',
    image: require('../assets/images/intro-5.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 2,
    title: 'An app with\n invisible\n connections',
    text: 'Create invisible connections\n that no one else can see!\n Any activity between you and\n invisible connections is only\n seen by you',
    image: require('../assets/images/intro-3.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 3,
    title: 'Sharing\n disappearing\n messages with\n private chat',
    text: 'Use disappearing messages to\n control the privacy on your\n social network!',
    image: require('../assets/images/intro-4.png'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 4,
    title: 'Private comments\n over group chat\n conversation',
    text: 'Private comments give\n your social network\n more privacy!\n Privately comment on\n group chat',
    image: require('../assets/images/intro-2.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 5,
    title: 'Private comments\n over\n public posts',
    text: 'Private comments give\n your social network\n more privacy!\n Privately comment on\n public posts',
    image: require('../assets/images/intro-1.png'),
    backgroundColor: '#59b2ab',
  },
];

export default function Intro({navigation}) {
  const _renderItem = ({item}) => {
    return (
      <View style={{backgroundColor: '#f8fcff', flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View style={styles.slideBox}>
            <Text style={styles.slideMainText}>{item.title}</Text>
            <Text style={styles.slideSecText}>{item.text}</Text>

            <View style={styles.btWraps}>
              <TouchableOpacity
                style={[globalStyles.gradBt, styles.btcont]}
                onPress={() => navigation.push('SignUp')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}> Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={[globalStyles.gradBt, styles.btcont]}
                onPress={() => navigation.push('Login')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}>Log In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[globalStyles.gradBt, styles.btcont]}
                onPress={() => navigation.push('Country')}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#0a89e2', '#17A8DD', '#27cbd8']}
                  style={globalStyles.linearGradient}>
                  <Text style={globalStyles.buttonText}>Skip Sign Up</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={styles.loginImgWrap}>
              <Image
                resizeMode="contain"
                style={styles.loginImg}
                source={item.image}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      activeDotStyle={styles.buttonCircle}
    />
  );
}

const styles = StyleSheet.create({
  slideBox: {
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingHorizontal: 10,
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
    // textAlign: 'center',
    fontFamily: 'SFpro-Regular',
    color: COLORS.blue,
    marginTop: 15,
  },
  btWraps: {
    alignItems: 'center',
    marginTop: 35,
    marginBottom: 45,
    width: '100%',
  },
  loginImgWrap: {
    alignItems: 'center',
  },
  btcont: {
    width: '50%',
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
    height: 200,
  },
});
