/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
  RefreshControl,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';

import AntIcon from 'react-native-vector-icons/AntDesign';
import EnIcon from 'react-native-vector-icons/Entypo';
import Footer from '../components/Footer';
import {useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import {newsLike} from '../services/homeFeed.service';
import moment from 'moment';
import IonIcon from 'react-native-vector-icons/Ionicons';
import PostCard from '../components/cards/postCard/PostCard';
import Header from '../components/Header';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import HomeComments from '../components/HomeComments';

import ThreeDotComponent from '../components/threeDot';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useContext} from 'react';
import {HomeContext} from '../shared/homeFeedCotext';
import {useCallback} from 'react';
import {postLike, shareOnLyk} from '../services/homeFeed.service';
import OtherPostThreeDot from '../components/otherPostThreeDot';
import PopUpModalWrap from '../components/popUpModalWrap';
import PopUpModalContainer from '../components/popUpModalContainer';
import NewsCard from '../components/cards/newsCard/NewsCard';
const hobbies = ['Lyk World', 'My Connections', 'My Family', 'Selective Users'];
export const API_URL =
  process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const HOME_FEED = `${API_URL}/TimelineNew/getFeed_V_2`;
export const INSERT_PUSH = `${API_URL}/LYKPush/insertPush`;
export const INAPPROPRIATE_URL = `${API_URL}Analytical/reportItem`;
export const SHARE_URL = `${API_URL}/Analytical/shareFeed`;

export const INSERT_PUSH_SHORT = 'isrPs';
const HOME_FEED_SHORT = 'gttmln';
const LIKE_FEED_SHORT = 'lkPs';
const LIKE_NEWS_SHOT = 'lkFe';
const SHARE_FEED_SHORT = 'saeed';
const offset = 0,
  limit = 25,
  feedPosition = -1,
  oddOffset = 0,
  evenOffset = 0,
  isStatic = 0,
  isEven = 0,
  birthdayStartPosition = 0,
  size = 0;
const pId = null,
  activityFriendOffsetCount = '0',
  nextPostId = '0',
  promoId = '0',
  nextNewsId = '0',
  postStatus = '0';
export default function Home() {
  const navigation = useNavigation();
  const translateY = useSharedValue(0);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const [refresh, setRefresh] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isScrollDown, setScrollDown] = useState(false);
  const [threeDot, setThreeDot] = useState(false);
  const [threeDotData, setThreeDotData] = useState({});
  const {feeds, setFeeds, userInfo, setUserInfo} = useContext(HomeContext);
  const [user, setUser] = useState();
  // console.log(feeds);
  const [modalVisible, setModalVisible] = useState(false);
  const [shareModalData, setShareModalData] = useState({});
  const [popUpOpen, setPopUpOpen] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function getHomeFeed() {
        let userDetails = await AsyncStorage.getItem('userId');
        userDetails = JSON.parse(userDetails);
        setUserInfo(userDetails);
        // setUserDetailsInfo(userDetails);
        let token =
          (await AsyncStorage.getItem('token')) +
          '-' +
          HOME_FEED_SHORT +
          '-' +
          getEncTokenAnyUserId(userDetails.userId);
        axios
          .post(
            HOME_FEED,
            {
              userId: getEncUserId(userDetails.userId),
              limit: limit,
              country: userDetails.countryName,
              offset: offset,
              nextPostId: nextPostId,
              pId: pId,
              promoId: promoId,
              deviceType: 'android',
              apiVersion: 2,
              nextNewsId: nextNewsId,
              postStatus: postStatus,
              activityFriendOffsetCount: activityFriendOffsetCount,
            },
            {
              headers: {
                token: token,
              },
            },
          )
          .then(res => {
            //alert(JSON.stringify(res.data.response.feeds) + token + userDetails.userId)
            setFeeds(res.data.response.feeds);
            setRefresh(false);
          })
          .catch(err => console.log(err));
      }
      getHomeFeed();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        if (remoteMessage.data.type === 'startcall') {
          navigation.push('Callscreen', {
            toUserId: remoteMessage.data.fromUserId,
            userName: remoteMessage.data.incomingCallerName,
            isCalling: true,
          });
        }
      });

      return unsubscribe;
    }, [refresh, liked, shareModalData]),
  );
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(prev => !prev);
    // wait(2000).then(() => setRefresh(false));
  }, []);

  useEffect(() => {
    async function userInformation() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      if (userDetails) {
        let token =
          (await AsyncStorage.getItem('token')) +
          '-' +
          INSERT_PUSH_SHORT +
          '-' +
          getEncTokenAnyUserId(userDetails.userId);
        if (requestUserPermission()) {
          messaging()
            .getToken()
            .then(FCMtoken => {
              console.log('token>>>>' + FCMtoken);
              axios
                .post(
                  INSERT_PUSH,
                  {
                    userId: getEncUserId(userDetails.userId),
                    pushKeyString: FCMtoken,
                    deviceType: 'android',
                    deviceId: DeviceInfo.getDeviceId(),
                  },
                  {
                    headers: {
                      token: token,
                    },
                  },
                )
                .then(() => {});
            });
        }
      }
    }
    userInformation();

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    /* const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe; */
  }, []);

  const onNewsLike = async newsId => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      LIKE_NEWS_SHOT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    newsLike(
      {
        itemId: newsId,
        userId: getEncUserId(userDetails.userId),
        likerName: userDetails.firstName,
        type: 'news',
      },
      token,
    )
      .then(response => {
        // const newState = feeds.map(obj => {
        //   if (obj.postId === postId) {
        //     if (response.data.response?.liked === 0) {
        //       return {...obj, likeCount: 0};
        //     }
        //     return {...obj, likeCount: obj.likeCount + 1};
        //   }
        //   return obj;
        // });
        // setFeeds(newState);
        if (response.data.response?.success) {
          setLiked(!liked);
        }
      })
      .catch(error => {
        console.log('Error---------', error.response);
      });
  };

  const onPressLike = async (postId, creatorId) => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);

    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      LIKE_FEED_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    postLike(
      {
        postId: postId,
        userId: getEncUserId(userDetails.userId),
        likerName: userDetails.firstName,
        creatorId: getEncTokenAnyUserId(creatorId),
      },
      token,
    )
      .then(response => {
        // const newState = feeds.map(obj => {
        //   if (obj.postId === postId) {
        //     if (response.data.response?.liked === 0) {
        //       return {...obj, likeCount: 0};
        //     }
        //     return {...obj, likeCount: obj.likeCount + 1};
        //   }
        //   return obj;
        // });
        // setFeeds(newState);
        if (response.data.response?.success) {
          setLiked(!liked);
        }
      })
      .catch(error => {
        console.log('Error---------', error.response);
      });
  };

  const actionBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 750,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (
        lastContentOffset.value > event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 0;

        // console.log('scrolling up');
      } else if (
        lastContentOffset.value < event.contentOffset.y &&
        isScrolling.value
      ) {
        translateY.value = 100;
        // console.log('scrolling down');
      }
      lastContentOffset.value = event.contentOffset.y;
    },
    onBeginDrag: e => {
      isScrolling.value = true;
    },
    onEndDrag: e => {
      isScrolling.value = false;
    },
  });
  const onRedirectCommentScreen = ({details, type}) => {
    navigation.push('comments', {
      details: details,
      styles: styles,
      type: type,
    });
  };

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: 'a few seconds',
      ss: '%d seconds',
      m: 'a minute',
      mm: '%d minutes',
      h: '1 hrs ago',
      hh: '%d hrs ago',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });

  const onPressThreeDot = ({type, feedId, title, imageUrl}) => {
    setThreeDotData({type, feedId, title, imageUrl});
    setThreeDot(true);
  };

  const handleShare = async () => {
    console.log(shareModalData, 'sharea --------------------->');
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      SHARE_FEED_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    shareOnLyk(
      {
        userId: getEncUserId(userDetails.userId),
        myName: userDetails.firstName,

        feedId: shareModalData.newsId
          ? parseInt(shareModalData.newsId)
          : shareModalData.postId && parseInt(shareModalData.postId),
        feedType: shareModalData.type,
        country: userDetails.countryName,
        city: userDetails.city,
        userList: [],
        selectionType: 1,
      },
      token,
    )
      .then(res => {
        setShareModalData(res);
        setModalVisible(false);
      })
      .catch(err => {
        console.log(err, '===>');
      });
  };

  const handleShareOnLyk = (details, type) => {
    setModalVisible(true);
    setShareModalData({...details, type});
  };

  return (
    <>
      <Header onSetRefresh={setRefresh} />
      {threeDot && (
        <ThreeDotComponent
          onClose={() => setThreeDot(false)}
          type={threeDotData.type}
          feedId={threeDotData.feedId}
          imageUrl={threeDotData.imageUrl}
          details={threeDotData.details}
          title={threeDotData.title}
          setFeeds={setFeeds}
        />
      )}
      <View style={globalStyles.innerPagesContainer}>
        <PopUpModalContainer
          popUpOpen={popUpOpen}
          setPopUpOpen={setPopUpOpen}
        />
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(prev => !prev);
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPressOut={() => {
                setModalVisible(false);
              }}>
              <View style={styles.centeredViewInner}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>
                    Select from the people listed below with whom you can share
                    this post
                  </Text>

                  <View style={styles.dropBox}>
                    <SelectDropdown
                      data={hobbies}
                      defaultValue={hobbies[0]}
                      defaultButtonText={user?.interested.join(',')}
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <EvilIcons
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#0a89e2'}
                            size={30}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>

                  <View style={styles.searchBox}>
                    <Image
                      style={{
                        width: 22,
                        height: 22,
                        position: 'relative',
                        top: 12,
                      }}
                      source={require('../assets/images/icon-search-grey.png')}
                    />
                    <View style={styles.phoneInputWrap}>
                      <TextInput
                        placeholderTextColor="#000"
                        placeholder="Search"
                        style={styles.input}
                        textContentType="username"
                        underlineColorAndroid="transparent"
                      />
                    </View>
                  </View>

                  <Pressable
                    style={{width: '100%', position: 'absolute', bottom: 25}}
                    onPress={handleShare}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#037ee5', '#15a2e0', '#28cad9']}
                      style={[globalStyles.linearGradient, {height: 50}]}>
                      <Text style={globalStyles.buttonText}>
                        Share on timeline
                      </Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => onRefresh} />
          }
          bounces={false}
          onScroll={scrollHandler}>
          <View style={styles.blueBar} />
          <View style={styles.postInvitedNetwork}>
            {((userInfo && userInfo?.countryISO === 'IN') ||
              userInfo?.countryISO === 'US' ||
              userInfo?.countryISO === 'GB') && (
              <TouchableOpacity
              // onPress={() => {
              //   navigation.push('Createpost');
              // }}
              >
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/wallet_points.jpg')}
                  style={[styles.postImg]}
                />
              </TouchableOpacity>
            )}
            {feeds.map(({type, details}, ind) => {
              if (type === 'card' && details.metaType === 'lessPosts') {
                return (
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      navigation.push('Createpost');
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/create-post.png')}
                      style={[styles.postImg]}
                    />
                  </TouchableOpacity>
                );
              } else if (
                type === 'card' &&
                details.metaType === 'lessFriends'
              ) {
                return (
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      navigation.push('network');
                    }}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/grow-network.png')}
                      style={[styles.postImg]}
                    />
                  </TouchableOpacity>
                );
              } else if (
                type === 'card' &&
                details.metaType === 'lessPrivateCommentConversation'
              ) {
                return (
                  <TouchableOpacity key={ind}>
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/invited.png')}
                      style={[styles.postImg]}
                    />
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          <View style={styles.newsCardsWrap}>
            {feeds.map(({type, details}) =>
              type === 'sharenews' ? (
                <NewsCard
                  details={details}
                  onPressThreeDot={onPressThreeDot}
                  handleShare={handleShare}
                  handleShareOnLyk={handleShareOnLyk}
                  onNewsLike={onNewsLike}
                  type={type}
                />
              ) : type === 'news' ? (
                <NewsCard
                  details={details}
                  onPressThreeDot={onPressThreeDot}
                  handleShare={handleShare}
                  handleShareOnLyk={handleShareOnLyk}
                  onNewsLike={onNewsLike}
                  type={type}
                />
              ) : (
                type === 'post' && (
                  <PostCard
                    details={details}
                    onPressThreeDot={onPressThreeDot}
                    handleShare={handleShare}
                    handleShareOnLyk={handleShareOnLyk}
                    onPressLike={onPressLike}
                    type={type}
                    popUpOpen={popUpOpen}
                    setPopUpOpen={setPopUpOpen}
                    userInfo={userInfo}
                  />
                )
              ),
            )}
          </View>
        </Animated.ScrollView>
        <Footer style={actionBarStyle} navigation={navigation} />
      </View>

      {/* <Animated.View style={actionBarStyle}> */}
      {/* </Animated.View> */}
    </>
  );
}

const styles = StyleSheet.create({
  blueBar: {
    height: 40,
    width: '100%',
    backgroundColor: COLORS.blue,
  },
  postInvitedNetwork: {
    flex: 1,
    height: '100%',
    // backgroundColor: 'red',
    paddingHorizontal: 15,
    marginTop: -35,
  },
  postImg: {
    width: '100%',
    height: 260,
    marginBottom: 15,
  },
  newsCardsWrap: {
    padding: 15,
  },
  menuOptionsWrapper: {
    display: 'flex',
    padding: 10,
  },
  cardProImg: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: '100%',
    height: '100%',
  },
  cardTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  shareTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#00000020',
  },
  sharedText: {
    color: COLORS.blue,
  },
  newstext: {
    marginLeft: 15,
  },
  newsTitletext: {
    textTransform: 'capitalize',
    fontWeight: '500',
    color: '#323a42',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
  },
  newsSubTitletext: {
    color: '#9e9c9c',
    fontSize: 12,
    fontFamily: 'SFpro-Regular',
  },
  scrollView: {
    // flex: 1,
    // height: 'auto',
    position: 'relative',
    zIndex: 99,
  },
  options: {
    position: 'absolute',
    right: 15,
    top: 0,
  },
  // newsCardsWrap: {
  //   padding: 15,
  // },
  newsCard: {
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20,
  },
  mainDesc: {
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
    paddingHorizontal: 15,
    lineHeight: 20,
  },
  secDesc: {
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
    paddingHorizontal: 15,
    lineHeight: 18,
  },
  newsCoverImg: {
    maxHeight: 150,
    overflow: 'hidden',
    alignItems: 'center',
    borderTopColor: '#e7ebf6',
    borderTopWidth: 4,
    borderBottomColor: '#e7ebf6',
    borderBottomWidth: 4,
    marginBottom: 10,
    marginTop: 20,
  },
  likeCommentShare: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    paddingTop: 2,
    paddingBottom: 2,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  likeCommentShareIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#7e868f',
    // marginLeft: 10,
    fontFamily: 'SFpro-Regular',
    fontSize: 12,
    paddingLeft: 5,
  },

  roundBase: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#ebebeb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCommentImgWrap: {
    width: 30,
    height: 30,
    borderRadius: 100,
    overflow: 'hidden',
  },
  addCommentImg: {
    width: 30,
    height: 30,
  },
  addCommentWrap: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  addCommentField: {
    backgroundColor: '#e7ebf6',
    borderRadius: 8,
    width: '88%',
    paddingHorizontal: 10,
    position: 'relative',
    zIndex: -1,
  },
  likeImg: {
    width: 34,
    height: 34,
  },
  newsLink: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'center',
    right: 0,
    bottom: 0,
    height: 32,
    borderRadius: 30,
    backgroundColor: COLORS.blue,
  },
  newsTextSource: {
    color: '#fff',
    fontFamily: 'SFpro-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  likeShareImg: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  shareWrap: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    width: 150,
    padding: 10,
    position: 'absolute',
    bottom: -80,
    right: 25,
  },
  shareText: {
    color: '#b5b5b5',
    fontSize: 12,
  },
  shareWrapInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 9999,
  },
  centeredViewInner: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalView: {
    paddingTop: 30,
    width: '100%',
    height: 500,
    paddingHorizontal: 55,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderRadius: 32,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  linearGradient: {
    padding: 35,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  mSignupBt: {
    backgroundColor: '#fff',
    borderRadius: 100,
    height: 31,
    width: 114,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mSignupBttext: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    fontSize: 14,
  },
  modalText: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    fontSize: 14,
    color: '#2e2e2e',
    marginBottom: 15,
  },
  modalOrText: {
    fontFamily: 'SFpro-Regular',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#fff',
    marginBottom: 15,
  },
  modalClose: {
    position: 'absolute',
    right: 20,
    top: 12,
    zIndex: 999,
  },

  dropBox: {
    marginHorizontal: 15,
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
  },
  dropdown1BtnStyle: {
    width: '50%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#c1cad3',
  },
  dropdown1BtnTxtStyle: {color: COLORS.blue, textAlign: 'left', fontSize: 14},
  searchBox: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    width: '100%',
  },
  phoneInputWrap: {
    paddingLeft: 8,
  },
});
