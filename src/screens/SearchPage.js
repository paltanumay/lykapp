import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  Image,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import CommentHeader from '../components/commentHeader';
import COLORS from '../global/globalColors';
import Icon from 'react-native-vector-icons/AntDesign';
import Footer from '../components/Footer';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {search} from '../services/homeFeed.service';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import DeviceInfo from 'react-native-device-info';
import NewsCard from '../components/cards/newsCard/NewsCard';
import PostCard from '../components/cards/postCard/PostCard';
import moment from 'moment';
import {postLike, shareOnLyk, newsLike} from '../services/homeFeed.service';
import {HomeContext} from '../shared/homeFeedCotext';
import {logProfileData} from 'react-native-calendars/src/Profiler';

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

const {width, height} = Dimensions.get('window');

const SearchPage = () => {
  const navigation = useNavigation();
  const translateY = useSharedValue(0);
  const [tabs, setTabs] = useState('all');
  const [data, setData] = useState({});
  const SEARCH_SHORT = 'txsrh';
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

  const [shTag, setShTag] = useState('');

  const searchCall = async () => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    if (userDetails) {
      let token =
        (await AsyncStorage.getItem('token')) +
        '-' +
        SEARCH_SHORT +
        '-' +
        getEncTokenAnyUserId(userDetails.userId);
      search(
        {
          userId: getEncUserId(userDetails.userId),
          st: shTag,
          sn: 'hm',
          deviceType: Platform.OS === 'ios' ? 'ios' : 'android',
          deviceId: DeviceInfo.getDeviceId(),
          searchType: tabs,
        },
        token,
      )
        .then(response => {
          console.log('Search Response--------------', response.data.response);
          setData(response.data.response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const onPressThreeDot = ({type, feedId, title, imageUrl}) => {
    setThreeDotData({type, feedId, title, imageUrl});
    setThreeDot(true);
  };

  const onPressLike = async (postId, creatorId) => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    console.log(
      `postId: ${postId} creatorId: ${creatorId} likerName: ${userDetails.firstName} userId: ${userDetails.userId}`,
    );
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

  useEffect(() => {
    searchCall();
  }, [shTag, liked]);

  console.log('Data---------------', data.news);

  return (
    <>
      <CommentHeader name="Search" />
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/search.png')}
            style={[styles.searchIcon]}
          />
          <TextInput
            placeholder="Search here"
            style={styles.textInput}
            cursorColor="#ffffff"
            placeholderTextColor="#ffffff"
            onChangeText={e => {
              setShTag(e);
            }}
            value={shTag}
          />
        </View>
        <View style={styles.tab}>
          <Pressable
            onPress={() => {
              setTabs('all');
            }}
            style={[
              styles.tabs,
              {borderBottomColor: tabs === 'all' ? COLORS.blue : 'transparent'},
            ]}>
            <Text style={styles.tabText}>ALL</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTabs('post');
            }}
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  tabs === 'post' ? COLORS.blue : 'transparent',
              },
            ]}>
            <Text style={styles.tabText}>POST</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTabs('news');
            }}
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  tabs === 'news' ? COLORS.blue : 'transparent',
              },
            ]}>
            <Text style={styles.tabText}>NEWS</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTabs('users');
            }}
            style={[
              styles.tabs,
              {
                borderBottomColor:
                  tabs === 'users' ? COLORS.blue : 'transparent',
              },
            ]}>
            <Text style={styles.tabText}>PEOPLE</Text>
          </Pressable>
        </View>
      </View>
      {tabs === 'news' ? (
        <FlatList
          data={data.news}
          renderItem={({item}) => {
            return (
              <View style={styles.cardWrapperContainer}>
                <NewsCard
                  details={item}
                  onPressThreeDot={onPressThreeDot}
                  handleShare={handleShare}
                  handleShareOnLyk={handleShareOnLyk}
                  onNewsLike={onNewsLike}
                  type={tabs}
                />
              </View>
            );
          }}
          keyExtractor={item => item.typeId}
        />
      ) : tabs === 'post' ? (
        <FlatList
          data={data.posts}
          renderItem={({item}) => {
            return (
              <View style={styles.cardWrapperContainer}>
                <PostCard
                  details={item}
                  onPressThreeDot={onPressThreeDot}
                  handleShare={handleShare}
                  handleShareOnLyk={handleShareOnLyk}
                  onPressLike={onPressLike}
                  type={tabs}
                  userInfo={userInfo}
                />
              </View>
            );
          }}
          keyExtractor={item => item.typeId}
        />
      ) : null}

      <Footer style={actionBarStyle} navigation={navigation} />
    </>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  searchWrapper: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffffff',
  },
  searchBar: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.blue,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  textInput: {
    color: '#ffffff',
    padding: 0,
    height: 40,
    flex: 1,
    paddingLeft: 10,
  },
  tab: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 25,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
  },
  tabText: {
    color: COLORS.black,
    fontWeight: '500',
  },
  scrollList: {
    width: '100%',
    height: height,
    backgroundColor: '#ffffff',
  },
  cardWrapperContainer: {
    width: '100%',
    minHeight: 200,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
