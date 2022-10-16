import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';

import AntIcon from 'react-native-vector-icons/AntDesign';
import EnIcon from 'react-native-vector-icons/Entypo';
import Footer from '../components/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const HOME_FEED = `${API_URL}/TimelineNew/getFeed_V_2`;
const HOME_FEED_SHORT = "gttmln";
const offset = 0, limit = 25, feedPosition = -1, oddOffset = 0, evenOffset = 0, isStatic = 0, isEven = 0, birthdayStartPosition = 0, size = 0;
const pId = null, activityFriendOffsetCount = "0", nextPostId = "0", promoId = "0", nextNewsId = "0", postStatus = "0";
export default function Home({ navigation }) {
  const getEncUserId = (currentUserId) => {
    let encUserId = "";
    if (currentUserId != null) {
      let userId = parseInt(currentUserId);
      let digitEnc = "";
      while (userId > 0) {
        let remainder = userId % 10;
        let digit = (remainder > 0) ? remainder - 1 : 9;
        userId = parseInt(userId / 10);
        switch (digit) {
          case 0:
            digitEnc = "#";
            break;
          case 1:
            digitEnc = "K";
            break;
          case 2:
            digitEnc = "!";
            break;
          case 3:
            digitEnc = "A";
            break;
          case 4:
            digitEnc = "Z";
            break;
          case 5:
            digitEnc = "%";
            break;
          case 6:
            digitEnc = "M";
            break;
          case 7:
            digitEnc = "Y";
            break;
          case 8:
            digitEnc = "X";
            break;
          case 9:
            digitEnc = "$";
            break;
        }
        encUserId = digitEnc + encUserId;
      }
    }
    return encUserId;
  }
  useEffect(() => {
    async function getHomeFeed() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      let token = await AsyncStorage.getItem("token") + "-" + HOME_FEED_SHORT + "-" + getEncUserId(userDetails.userId);
      axios.post(HOME_FEED, {
        "userId": getEncUserId(userDetails.userId),
        "limit": limit,
        "country": userDetails.countryName,
        "offset": offset,
        "nextPostId": nextPostId,
        "pId": pId,
        "promoId": promoId,
        "deviceType": "android",
        "apiVersion": 2,
        "nextNewsId": nextNewsId,
        "postStatus": postStatus,
        "activityFriendOffsetCount": activityFriendOffsetCount,
      }, {
        headers: {
          token: token
        }
      }).then(res => {
        alert(JSON.stringify(res))
      }, err => {
        alert(err + userDetails.userId + token)
      }
      )
    }
    getHomeFeed()
  }, [])
  return (
    <>
      <View style={globalStyles.innerPagesContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.blueBar}></View>
          <View style={styles.postInvitedNetwork}>
            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../assets/images/create-post.png')}
                style={[styles.postImg]}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../assets/images/invited.png')}
                style={[styles.postImg]}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                resizeMode="contain"
                source={require('../assets/images/grow-network.png')}
                style={[styles.postImg]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.newsCardsWrap}>
            <View style={styles.newsCard}>
              <View style={styles.cardTitle}>
                <View style={styles.cardProImg}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/images/logo.png')}
                    style={[styles.logoImg]}
                  />
                </View>
                <View style={styles.newstext}>
                  <Text style={styles.newsTitletext}>News & Stories</Text>
                  <Text style={styles.newsSubTitletext}>5 mins ago</Text>
                </View>
                <TouchableOpacity style={styles.options}>
                  <EnIcon
                    name="dots-three-horizontal"
                    size={25}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.mainDesc}>
                Does controversy sell movie tickets? The cast of 'Don't Worry
                Darling' might find out
              </Text>

              <View style={styles.newsCoverImg}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/images/news.webp')}
                  style={[styles.postImg]}
                />
              </View>
              <Text style={styles.secDesc}>
                Gemma Chan (from left), Harry Styles, Sydney Chandler,
                director Olivia Wilde, Chris Pine, Florence Pugh and Nick
                Kroll pose for photographers upon arrival at the premiere of
                the film 'Don't Worry Darling' during the 79th edition of the
                Venice Film Festival.
              </Text>

              <View style={styles.likeCommentShare}>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="like2" size={22} color="#9c9d9f" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="message1" size={22} color="#c1cb99" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="sharealt" size={22} color="#f8767a" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>
              </View>

              <View style={styles.addCommentWrap}>
                <View style={styles.addCommentImgWrap}>
                  <Image
                    resizeMode="stretch"
                    source={require('../assets/images/avatar.jpg')}
                    style={[styles.addCommentImg]}
                  />
                </View>
                <View style={styles.addCommentField}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Add comment"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>

            <View style={styles.newsCard}>
              <View style={styles.cardTitle}>
                <View style={styles.cardProImg}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/images/logo.png')}
                    style={[styles.logoImg]}
                  />
                </View>
                <View style={styles.newstext}>
                  <Text style={styles.newsTitletext}>News & Stories</Text>
                  <Text style={styles.newsSubTitletext}>5 mins ago</Text>
                </View>
                <TouchableOpacity style={styles.options}>
                  <EnIcon
                    name="dots-three-horizontal"
                    size={25}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.mainDesc}>
                Does controversy sell movie tickets? The cast of 'Don't Worry
                Darling' might find out
              </Text>

              <View style={styles.newsCoverImg}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/images/news.webp')}
                  style={[styles.postImg]}
                />
              </View>
              <Text style={styles.secDesc}>
                Gemma Chan (from left), Harry Styles, Sydney Chandler,
                director Olivia Wilde, Chris Pine, Florence Pugh and Nick
                Kroll pose for photographers upon arrival at the premiere of
                the film 'Don't Worry Darling' during the 79th edition of the
                Venice Film Festival.
              </Text>

              <View style={styles.likeCommentShare}>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="like2" size={22} color="#9c9d9f" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="message1" size={22} color="#c1cb99" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="sharealt" size={22} color="#f8767a" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>
              </View>

              <View style={styles.addCommentWrap}>
                <View style={styles.addCommentImgWrap}>
                  <Image
                    resizeMode="stretch"
                    source={require('../assets/images/avatar.jpg')}
                    style={[styles.addCommentImg]}
                  />
                </View>
                <View style={styles.addCommentField}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Add comment"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
            <View style={styles.newsCard}>
              <View style={styles.cardTitle}>
                <View style={styles.cardProImg}>
                  <Image
                    resizeMode="contain"
                    source={require('../assets/images/logo.png')}
                    style={[styles.logoImg]}
                  />
                </View>
                <View style={styles.newstext}>
                  <Text style={styles.newsTitletext}>News & Stories</Text>
                  <Text style={styles.newsSubTitletext}>5 mins ago</Text>
                </View>
                <TouchableOpacity style={styles.options}>
                  <EnIcon
                    name="dots-three-horizontal"
                    size={25}
                    color="#333"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.mainDesc}>
                Does controversy sell movie tickets? The cast of 'Don't Worry
                Darling' might find out
              </Text>

              <View style={styles.newsCoverImg}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/images/news.webp')}
                  style={[styles.postImg]}
                />
              </View>
              <Text style={styles.secDesc}>
                Gemma Chan (from left), Harry Styles, Sydney Chandler,
                director Olivia Wilde, Chris Pine, Florence Pugh and Nick
                Kroll pose for photographers upon arrival at the premiere of
                the film 'Don't Worry Darling' during the 79th edition of the
                Venice Film Festival.
              </Text>

              <View style={styles.likeCommentShare}>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="like2" size={22} color="#9c9d9f" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="message1" size={22} color="#c1cb99" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity style={styles.roundBase}>
                      <AntIcon name="sharealt" size={22} color="#f8767a" />
                    </TouchableOpacity>

                    <Text style={styles.iconText}>0 Like</Text>
                  </View>
                </View>
              </View>

              <View style={styles.addCommentWrap}>
                <View style={styles.addCommentImgWrap}>
                  <Image
                    resizeMode="stretch"
                    source={require('../assets/images/avatar.jpg')}
                    style={[styles.addCommentImg]}
                  />
                </View>
                <View style={styles.addCommentField}>
                  <TextInput
                    placeholderTextColor="#AFAFAF"
                    style={styles.input}
                    placeholder="Add comment"
                    textContentType="username"
                    underlineColorAndroid="transparent"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} />

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
    paddingHorizontal: 15,
    marginTop: -35,
  },
  postImg: {
    width: '100%',
    height: 260,
  },
  newsCardsWrap: {
    padding: 15,
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
    width: 30,
    height: 30,
  },
  cardTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  newstext: {
    marginLeft: 15,
  },
  newsTitletext: {
    color: '#080d14',
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  newsSubTitletext: {
    color: '#9e9c9c',
  },
  options: {
    position: 'absolute',
    right: 15,
    top: 0,
  },
  newsCardsWrap: {
    padding: 15,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 20
  },
  mainDesc: {
    color: '#333',
    fontFamily: 'Lato-regular',
    fontSize: 16,
    paddingHorizontal: 15,
    lineHeight: 20,
  },
  secDesc: {
    color: '#333',
    fontFamily: 'Lato-regular',
    fontSize: 13,
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
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  likeCommentShareIconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: '#9c9d9f',
    marginLeft: 10,
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

  }
});
