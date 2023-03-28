import React, {useState} from 'react';
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
import {useEffect} from 'react';
import NewsCard from '../components/cards/newsCard/NewsCard';

const {width, height} = Dimensions.get('window');

const SearchPage = () => {
  const navigation = useNavigation();
  const translateY = useSharedValue(0);
  const [tabs, setTabs] = useState('all');
  const [data, setData] = useState({});
  const SEARCH_SHORT = 'txsrh';
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

  useEffect(() => {
    searchCall();
  }, [shTag]);

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
      <ScrollView>
        <View style={styles.scrollList}>
          {/* {tabs === 'news'
            ? data.news.map((news, index) => {
                return <NewsCard details={news} key={index} />;
              })
            : null} */}
        </View>
      </ScrollView>
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
});
