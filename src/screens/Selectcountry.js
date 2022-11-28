import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {globalStyles} from '../global/globalStyle';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import CountryPicker, {
  DEFAULT_THEME,
  Flag,
} from 'react-native-country-picker-modal';
import axios from 'axios';

const interests = [
  {
    text: 'Dance',
    image: require('../assets/images/dance.jpg'),
  },
  {
    text: 'Music',
    image: require('../assets/images/music.webp'),
  },
  {
    text: 'Politics',
    image: require('../assets/images/politics.png'),
  },
  {
    text: 'Theatre',
    image: require('../assets/images/theatre.jpg'),
  },
  {
    text: 'Gardening',
    image: require('../assets/images/gardening.webp'),
  },
  {
    text: 'Pets',
    image: require('../assets/images/pets.jpg'),
  },
];

export default function Selectcountry({navigation}) {
  const [search, setSearch] = useState();
  const [checked, setChecked] = useState(0);
  const [interest, setInterest] = useState([]);
  const [radioBtnsData, setradioBtnData] = useState(['', '']);
  const [countryCode, setcountryCode] = useState('IN');
  const [country, setCountry] = useState('India');
  const [modalVisible, setModalVisible] = useState(false);
  const renderFlagButton = () => {
    const layout = 'first',
      flagSize = 24;
    if (layout === 'first') {
      return (
        <View style={styles.row}>
          <Flag
            countryCode={countryCode}
            flagSize={flagSize ? flagSize : DEFAULT_THEME.flagSize}
          />
          <Text style={styles.country}>{country}</Text>
        </View>
      );
    }
    return <View />;
  };
  const onSelect = country => {
    setCountry(country.name);
    setcountryCode(country.cca2);
  };
  const saveInterests = () => {
    navigation.push('Sidenav');
    axios
      .post(
        'https://api.lykapp.com/lykjwt/index.php?/LYKUser/saveUserInterests',
        {userId: '720405', interests: ['1', '2'], isRegister: false},
        {
          headers: {
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkX2F0IjoxNjYzNDM0MjIxLCJ2YWxpZF9mb3IiOjg2NDAwfQ.23eSh6qOKk_cjyAZrXHb3fE0DATVGfuN95WgChPDO4Y-svsrneet-720405',
          },
        },
      )
      .then(
        res => {},
        err => {
        },
      )
      .catch(err =>{});
  };
  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#037ee5', '#15a2e0', '#28cad9']}
        style={styles.linearGradient}>
        <View style={styles.logoWrap}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
          <Text style={styles.swp}>Social network {"\n"} with privacy</Text>
        </View>

        <View style={styles.welcomeWrap}>
          <View style={styles.radioMainWrap}>
            {radioBtnsData.map((data, key) => {
              return (
                <View key={key}>
                  {checked == key ? (
                    <TouchableOpacity style={styles.btn}>
                      <Image
                        style={styles.img}
                        source={require('../assets/images/rb_unselected.png')}
                      />
                      <Text>{data}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setChecked(key);
                      }}
                      style={styles.btn}>
                      <Image
                        style={styles.img}
                        source={require('../assets/images/rb_selected.png')}
                      />
                      <Text>{data}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>

          {!checked ? (
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
              {/* <Text style={styles.welcomeTitle}>Welcome Ayan</Text>
              <Text style={styles.welcomeSubtext}>
                Please help us answer the next few questions about yourself to
                make your experience enjoyable
              </Text> */}

              <Text style={styles.selectCountryTitile}>
                Select your Country
              </Text>
              <TouchableOpacity
                style={[styles.flagButtonView]}
                onPress={() => setModalVisible(true)}>
                <View style={styles.caretDown}>
                  <IonIcon
                    name="ios-caret-down"
                    size={7}
                    color={COLORS.blue}
                  />
                </View>

                <CountryPicker
                  onSelect={onSelect}
                  withEmoji
                  withFilter
                  withFlag
                  countryCode={countryCode}
                  withCallingCode
                  visible={modalVisible}
                  theme={DEFAULT_THEME}
                  renderFlagButton={renderFlagButton}
                  onClose={() => setModalVisible(false)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[globalStyles.gradBt, {width:'80%'}]}
                onPress={() => setChecked(1)}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#037ee5', '#15a2e0', '#28cad9']}
                  style={[globalStyles.linearGradient, {height:40}]}>
                  <Text style={globalStyles.buttonText}>Next</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
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
                  onChangeText={(e)=>setSearch(e)}
                />
                <TouchableOpacity style={styles.search}>
                  <FIcon name="search" size={22} color="#ccc" />
                </TouchableOpacity>
              </View>

              <View style={styles.chooseCategoriesWrap}>
                {interests
                .filter(o=>!search || o.text.toLowerCase().includes(search))
                .map(
                  (item, key) =>
                    interest.indexOf(key.toString()) < 0 ? (
                      <TouchableOpacity
                        style={styles.catBoxCont}
                        key={key}
                        onPress={() =>
                          setInterest(oldArray => [...oldArray, key.toString()])
                        }>

                        <View style={styles.catBox}>
                          <Image
                            style={styles.catBoxImg}
                            resizeMode="cover"
                            source={item.image}
                          />
                        </View>

                        <Text style={styles.catText}>{item.text}</Text>
                      </TouchableOpacity>
                    ):(
                      <TouchableOpacity
                        style={styles.catBoxCont}
                        key={key}
                        onPress={() =>
                          setInterest(interest.filter(o=>o!=key.toString()))
                        }>
                        <View style={styles.catBoxActive}>
                          <FIcon name="check" size={28} color="#fff" />
                        </View>

                        <View style={styles.catBox}>
                          <Image
                            style={styles.catBoxImg}
                            resizeMode="cover"
                            source={item.image}
                          />
                        </View>

                        <Text style={styles.catText}>{item.text}</Text>
                      </TouchableOpacity>
                    ),
                )}
              </View>

              {interest.length < 3 ? (
                <TouchableOpacity style={styles.pickInterest}>
                  <Text style={styles.pickInterestText}>
                    Pick atleast 3 interests
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={globalStyles.gradBt}
                  onPress={saveInterests}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#037ee5', '#15a2e0', '#28cad9']}
                    style={globalStyles.linearGradient}>
                    <Text style={globalStyles.buttonText}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </ScrollView>
          )}
        </View>
      </LinearGradient>
    </View>
  );
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
    width: 60,
    height: 60,
  },
  swp:{
    fontSize:16,
    color:'#fff',
    textAlign:'center',
    marginTop:12
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
    marginTop: 20,
    position: 'relative',
  },
  chooseCategoriesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  catText: {
    fontFamily: 'Lato-Regular',
    color: '#333',
    marginTop: 8,
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
    marginBottom: 10,
  },
  pickInterestText: {
    fontFamily: 'Lato-Bold',
    color: '#333',
  },
  img: {
    height: 25,
    width: 25,
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  radioMainWrap: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  flagButtonView: {
    // borderRadius:100,
    // borderWidth:1,
    // borderColor:COLORS.blue,
    // width:150,
    // alignItems:'center',
    // height:40,
    // justifyContent:'center',
    // marginVertical:15
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 20,
    paddingRight: 30,
    paddingLeft: 20,
    marginVertical: 20,
  },
  country: {
    marginTop: 7,
  },
  caretDown: {
    position: 'absolute',
    right: 10,
    top: 35,
  },
  catBoxActive: {
    position: 'absolute',
    top: 0,

    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
