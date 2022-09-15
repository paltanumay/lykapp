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

  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: ['', ''],
      checked: 0
    }
  }
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



          <View style={styles.welcomeWrap}>

            <View style={styles.radioMainWrap}>
              {this.state.radioBtnsData.map((data, key) => {
                return (
                  <View key={key}>
                    {this.state.checked == key ?
                      <TouchableOpacity style={styles.btn}>
                        <Image style={styles.img} source={require("../assets/images/rb_unselected.png")} />
                        <Text>{data}</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={() => { this.setState({ checked: key }) }} style={styles.btn}>
                        <Image style={styles.img} source={require("../assets/images/rb_selected.png")} />
                        <Text>{data}</Text>
                      </TouchableOpacity>
                    }
                  </View>
                )
              })}
            </View>

            {/* <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
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
            </ScrollView> */}



            <ScrollView contentContainerStyle={{ alignItems: 'center' }}>

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

              <View style={styles.chooseCategoriesWrap}>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/dance.jpg')}
                    />
                  </View>

                  <Text style={styles.catText}>Dance</Text>
                </View>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/music.webp')}
                    />
                  </View>

                  <Text style={styles.catText}>Music</Text>
                </View>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/politics.png')}
                    />
                  </View>

                  <Text style={styles.catText}>Politics</Text>
                </View>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/theatre.jpg')}
                    />
                  </View>

                  <Text style={styles.catText}>Theatre</Text>
                </View>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/gardening.webp')}
                    />
                  </View>

                  <Text style={styles.catText}>Gardening</Text>
                </View>

                <View style={styles.catBoxCont}>
                  <View style={styles.catBox}>
                    <Image
                      style={styles.catBoxImg}
                      resizeMode="cover"
                      source={require('../assets/images/pets.jpg')}
                    />
                  </View>

                  <Text style={styles.catText}>Pets</Text>
                </View>

              </View>

              <TouchableOpacity style={styles.pickInterest}>
                <Text style={styles.pickInterestText}>Pick atleast 3 interests</Text>
              </TouchableOpacity>
            </ScrollView>
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
    paddingTop: 50,
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
    marginTop: 15,
  },
  welcomeSubtextNew: {
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    marginTop: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  selectCountryTitile: {
    color: COLORS.blue,
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    marginTop: 25,
  },
  searchBox: {
    width: '80%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    height: 50,
    paddingHorizontal: 20,
    paddingRight: 45,
  },
  search: {
    position: 'absolute',
    right: 20,
    top: 12,
  },
  catBox: {
    width: 100,
    height: 100,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  catBoxImg: {
    width: 100,
    maxHeight: 100,
  },
  catBoxCont: {
    alignItems: 'center',
    width: '30%',
    marginTop: 20
  },
  chooseCategoriesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  catText: {
    fontFamily: 'Lato-Regular',
    color: '#333',
    marginTop: 8
  },
  pickInterest: {
    width: '60%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    height: 40,
    paddingHorizontal: 20,
    paddingRight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10


  },
  pickInterestText: {
    fontFamily: 'Lato-Bold',
    color: '#333'
  },
  img: {
    height: 25,
    width: 25
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 5
  },
  radioMainWrap: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  }
});
