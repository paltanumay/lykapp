/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Pressable,
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
import SubInterestTag from '../components/subInterestTag';

const interests = [
  {
    text: 'Dance',
    image: require('../assets/images/dance.jpg'),
    subInterest: [
      {
        id: '1',
        text: 'salsa',
      },
      {
        id: '2',
        text: 'kathak',
      },
    ],
  },
  {
    text: 'Music',
    image: require('../assets/images/music.webp'),
    subInterest: [
      {id: '1', text: 'classical'},
      {id: '2', text: 'rock'},
      {id: '3', text: 'pop'},
    ],
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
  const [hasSubInterest, setHasSubInterest] = useState(false);
  const [selectedSubInterest, setSelectedSubInterest] = useState([]);
  const [subInterestList, setSubInterestList] = useState([]);
  const [checked, setChecked] = useState(0);
  const [interest, setInterest] = useState([]);
  const [radioBtnsData, setradioBtnData] = useState(['', '']);
  const [countryCode, setcountryCode] = useState('IN');
  const [country, setCountry] = useState('India');
  const [modalVisible, setModalVisible] = useState(false);
  console.log(selectedSubInterest, 'subInterest list ');
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
        err => {},
      )
      .catch(err => {});
  };
  const onPressPlusIcon = subInterest => {
    setHasSubInterest(true);
    setSubInterestList(subInterest);
    console.log(hasSubInterest);
  };

  const onSelectSubInterest = ({id, text}) => {
    const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

    console.log(beasts.indexOf('duck'), beasts);
    console.log(selectedSubInterest.indexOf({id, text}));
    if (selectedSubInterest && selectedSubInterest.indexOf({id, text}) === -1) {
      setSelectedSubInterest(prev => [...prev, {id, text}]);
    } else if (
      selectedSubInterest &&
      selectedSubInterest.indexOf(prev => prev.id === id) !== -1
    ) {
      const deletedSubInterest = selectedSubInterest.filter(
        prev => prev.id !== id,
      );
      console.log(deletedSubInterest, 'del');
      setSelectedSubInterest(deletedSubInterest);
    }
  };
  return (
    <>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#037ee5', '#15a2e0', '#28cad9']}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor={'transparent'}
        />
      </LinearGradient>
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
            <Text style={styles.swp}>Social network {'\n'} with privacy</Text>
          </View>

          <View style={styles.welcomeWrap}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={() => setChecked(prev => prev - 1)}>
              <Image
                style={styles.aleft}
                source={require('../assets/images/arrow-simple-left.png')}
              />
            </TouchableOpacity>
            <View style={styles.radioMainWrap}>
              {radioBtnsData.map((data, key) => {
                return (
                  <View key={key}>
                    {checked == key ? (
                      <TouchableOpacity style={styles.btn}>
                        <Image
                          resizeMode="stretch"
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
                          resizeMode="stretch"
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
                  Select your country
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
                  style={[globalStyles.gradBt, {width: '90%'}]}
                  onPress={() => setChecked(1)}>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#037ee5', '#15a2e0', '#28cad9']}
                    style={[globalStyles.linearGradient, {height: 40}]}>
                    <Text style={globalStyles.buttonText}>Next</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ScrollView>
            ) : (
              <View style={{alignItems: 'center', width: '100%'}}>
                <Text style={styles.welcomeSubtextNew}>
                  Let us know what you are {'\n'} interested in
                </Text>

                <View style={styles.searchBox}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Search for more interests"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                    onChangeText={e => setSearch(e)}
                  />
                  <TouchableOpacity style={styles.search}>
                    <FIcon name="search" size={19} color="#ccc" />
                  </TouchableOpacity>
                </View>
                <View style={styles.interestList}>
                  {!hasSubInterest ? (
                    <ScrollView
                      contentContainerStyle={styles.chooseCategoriesWrap}>
                      {interests
                        .filter(
                          o => !search || o.text.toLowerCase().includes(search),
                        )
                        .map((item, key) =>
                          interest.indexOf(key.toString()) < 0 ? (
                            <TouchableOpacity
                              style={styles.catBoxCont}
                              key={key}
                              onPress={() =>
                                setInterest(oldArray => [
                                  ...oldArray,
                                  key.toString(),
                                ])
                              }>
                              <View style={styles.catBox}>
                                <Image
                                  style={styles.catBoxImg}
                                  resizeMode="cover"
                                  source={item.image}
                                />
                                {item.subInterest && (
                                  <Pressable
                                    style={styles.plus}
                                    onPress={() =>
                                      onPressPlusIcon(item.subInterest)
                                    }>
                                    <FIcon name="plus" size={15} color="#fff" />
                                  </Pressable>
                                )}
                              </View>

                              <Text style={styles.catText}>{item.text}</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              style={styles.catBoxCont}
                              key={key}
                              onPress={() =>
                                setInterest(
                                  interest.filter(o => o !== key.toString()),
                                )
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
                    </ScrollView>
                  ) : (
                    <View style={styles.subInterestList}>
                      <Pressable
                        style={styles.close}
                        onPress={() => setHasSubInterest(false)}>
                        <FIcon name="x" size={18} color="#011" />
                      </Pressable>
                      <View style={styles.subInterestTags}>
                        {subInterestList &&
                          subInterestList.map(({id, text}) => {
                            return (
                              <SubInterestTag
                                key={id}
                                setSelectedSubInterest={setSelectedSubInterest}
                                onSelectSubInterest={onSelectSubInterest}
                                text={text}
                                id={id}
                                selectedSubInterest={selectedSubInterest}
                              />
                            );
                          })}
                      </View>
                    </View>
                  )}
                </View>

                {!hasSubInterest && interest.length < 3 ? (
                  <TouchableOpacity style={styles.pickInterest}>
                    <Text style={styles.pickInterestText}>
                      Pick atleast 3 interests
                    </Text>
                  </TouchableOpacity>
                ) : (
                  !hasSubInterest && (
                    <TouchableOpacity
                      style={[globalStyles.gradBt, {width: 200}]}
                      onPress={saveInterests}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#037ee5', '#15a2e0', '#28cad9']}
                        style={[globalStyles.linearGradient, {height: 40}]}>
                        <Text style={globalStyles.buttonText}>Next</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'red',
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
    width: 80,
    height: 80,
  },
  swp: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 12,
  },
  welcomeWrap: {
    backgroundColor: '#fff',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    padding: 15,
    alignItems: 'center',
    flex: 6,
    paddingTop: 20,
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
    fontFamily: 'SFpro-Bold',
    fontSize: 18,
    marginTop: 17,
    textAlign: 'center',
    marginBottom: 20,
  },
  selectCountryTitile: {
    color: '#006dd2',
    fontFamily: 'SFpro-Bold',
    fontSize: 25,
    marginTop: 25,
    // fontSize: 18,
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    height: 40,
    paddingTop: 0,
    paddingHorizontal: 15,
    // paddingRight: 45,
  },
  search: {
    position: 'absolute',
    right: 15,
    // top: 6,
  },
  catBox: {
    width: 77,
    height: 77,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    // marginRight: -60,
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
    // backgroundColor: 'red',
  },
  close: {
    display: 'flex',
    width: 100,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  chooseCategoriesWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '80%',
    alignItems: 'flex-start',
  },
  catText: {
    fontFamily: 'SFpro-Regular',
    fontSize: 10,
    letterSpacing: 0.29,
    color: '#333',
    marginTop: 8,
  },
  subInterestList: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
  plusIcon: {
    paddingLeft: 5,
  },
  subInterestTags: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 15,
    // width: '100%',
  },
  suBInterestTag: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginRight: 10,
  },
  subInterest: {
    color: '#AFAFAF',
    paddingLeft: 5,
    paddingRight: 5,
  },
  pickInterest: {
    width: '60%',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    height: 40,
    paddingHorizontal: 20,
    // paddingRight: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  pickInterestText: {
    fontFamily: 'SFpro-Regular',
    color: '#333',
    fontSize: 14,
  },
  img: {
    height: 25,
    width: 22,
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

    width: 76,
    height: 76,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  interestList: {
    width: '100%',
    alignItems: 'center',
    height: 270,
    marginTop: 15,
    marginBottom: 15,
  },
  input: {
    color: '#333',
    // height: 38,
    fontSize: 12.8,
    fontWeight: '500',
    fontFamily: 'SFpro-Regular',
    width: '100%',
  },
  plus: {
    position: 'absolute',
    right: 3,
    top: 3,
  },
  backIcon: {
    position: 'absolute',
    left: 25,
    top: 25,
  },
  aleft: {
    width: 10,
    height: 17,
  },
});
