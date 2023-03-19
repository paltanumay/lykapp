/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import EnIcon from 'react-native-vector-icons/Entypo';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import HomeComments from '../components/HomeComments';
import CommentComponents from '../components/CommentsComponent';
import smileImg from '../assets/images/smile.png';
import sendImg from '../assets/images/send.png';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import axios from 'axios';
import {useState} from 'react';
import CommentHeader from '../components/commentHeader';
import ThreeDotComponent from '../components/threeDot';
import {
  generalApiCallPost,
  saveCommentFeed,
  shareOnLyk,
} from '../services/homeFeed.service';
import {useContext} from 'react';
import {HomeContext} from '../shared/homeFeedCotext';
import {newsLike, postLike} from '../services/homeFeed.service';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../global/globalStyle';
import {Modal} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const SHARE_FEED_SHORT = 'saeed';
const COMMENT_FEED_SHORT = 'bH3m8q';
const POST_COMMENT_SHORT = 'g4QyL';
const COMMENT_REPLY_SHORT = 'mS72Lc';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const COMMENT_URL = `${API_URL}/gtfdcmts`;
export const POST_COMMENT_URL = `${API_URL}/svcmt`;
export const COMMENT_REPLIES_URL = `${API_URL}/gtfdcmtrpls`;

export const COMMENT_LIKE_URL = `${API_URL}/HomeFeed/likeFeedComment`;
const LIKE_FEED_SHORT = 'lkPs';
const LIKE_NEWS_SHOT = 'lkFe';

const hobbies = ['Lyk World', 'My Connections', 'My Family', 'Selective Users'];

const CommentsDetails = () => {
  const route = useRoute();
  const [threeDot, setThreeDot] = useState(false);
  const details = route.params.details;
  const styles = route.params.styles;
  const type = route.params.type;
  const COMMENT_FEED_SHORT = 'bH3m8q';
  const POST_COMMENT_SHORT = 'g4QyL';
  const COMMENT_REPLY_SHORT = 'mS72Lc';
  const COMMENT_LIKE_SHORT = 'lkFeCmet';
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [likeresponse, setLikeResponse] = useState({});
  const [threeDotData, setThreeDotData] = useState();
  const {feeds, setFeeds} = useContext(HomeContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [shareModalData, setShareModalData] = useState({});
  const [user, setUser] = useState();

  const inputRef = useRef();
  const [isReply, setIsReply] = useState(false);
  const [whichComment, setWhichComment] = useState('');
  const [parentId, setParentId] = useState('');
  const [toUserId, setToUserId] = useState('');
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(details.likeCount);

  useEffect(() => {
    console.log('which Comment------', whichComment);
    console.log('what---------', inputRef.current.focus());
  }, [whichComment]);

  console.log('Details--------------------', details);

  useEffect(() => {
    const getAllComments = async () => {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      let token =
        (await AsyncStorage.getItem('token')) +
        '-' +
        COMMENT_FEED_SHORT +
        '-' +
        getEncTokenAnyUserId(userDetails.userId);

      const response = await axios.post(
        COMMENT_URL,
        {
          userId: getEncUserId(userDetails.userId),
          feedId:
            type === 'news'
              ? parseInt(details.newsId)
              : parseInt(details.postId),
          feedType: type,
          start: 0,
          limit: 25,
        },
        {
          headers: {
            token: token,
          },
        },
      );
      setComments(response.data.response.comments);
    };
    getAllComments();
  }, []);

  const onLikeComment = async (commentId, commentUserId) => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      COMMENT_LIKE_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);

    generalApiCallPost({
      URL: COMMENT_LIKE_URL,
      data: {
        userId: getEncUserId(userDetails.userId),
        likerName: userDetails.firstName,
        commentId: commentId,
        commentUserId: getEncTokenAnyUserId(commentUserId),
        feedId:
          type === 'news' ? parseInt(details.newsId) : parseInt(details.postId),
        feedType: type,
      },
      token: token,
    })
      .then(response => {
        setLikeResponse(response.data);
      })
      .catch(err => {
        console.log(err);
      });
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
          if (response.data.response?.like === 1) {
            setLikes(likes + 1);
          } else {
            setLikes(likes - 1);
          }
        }
      })
      .catch(error => {
        console.log('Error---------', error.response);
      });
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
          if (response.data.response?.liked === 1) {
            setLikes(likes + 1);
          } else {
            setLikes(likes - 1);
          }
        }
      })
      .catch(error => {
        console.log('Error---------', error.response);
      });
  };

  const onSubmitComment = async (
    replyTo,
    replyToName,
    createdBy,
    ownerName,
    parentId,
    toUserId,
  ) => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      POST_COMMENT_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);

    saveCommentFeed({
      URL: POST_COMMENT_URL,

      data: isReply
        ? type === 'news'
          ? {
              feedId:
                type === 'news'
                  ? parseInt(details.newsId)
                  : parseInt(details.postId),
              commentText: commentText,
              itemType: type,
              isReply: true,
              isPrivate: false,
              parentId: parentId,
              toUserId: getEncUserId(userDetails.userId),
              commentor: {
                userId: getEncUserId(userDetails.userId),
                firstName: userDetails.firstName,
                imageUrl: userDetails.imageUrl,
              },
              mentions: [],
              myName: userDetails.firstName,
              replyTo: getEncTokenAnyUserId(replyTo),
              replyToName: replyToName,
            }
          : {
              feedId:
                type === 'news'
                  ? parseInt(details.newsId)
                  : parseInt(details.postId),
              commentText: commentText,
              itemType: type,
              isReply: true,
              isPrivate: false,
              parentId: parentId,
              toUserId: getEncUserId(userDetails.userId),
              commentor: {
                userId: getEncUserId(userDetails.userId),
                firstName: userDetails.firstName,
                imageUrl: userDetails.imageUrl,
              },
              mentions: [],
              ownerName: ownerName,
              myName: userDetails.firstName,
              creatorId: getEncTokenAnyUserId(createdBy),
              replyTo: getEncTokenAnyUserId(replyTo),
              replyToName: replyToName,
            }
        : type === 'news'
        ? {
            feedId:
              type === 'news'
                ? parseInt(details.newsId)
                : parseInt(details.postId),
            commentText: commentText,
            itemType: type,
            isReply: false,
            isPrivate: false,
            commentor: {
              userId: getEncUserId(userDetails.userId),
              firstName: userDetails.firstName,
              imageUrl: userDetails.imageUrl,
            },
            mentions: [],
            myName: userDetails.firstName,
            replyTo: getEncTokenAnyUserId(replyTo),
            replyToName: replyToName,
          }
        : {
            feedId:
              type === 'news'
                ? parseInt(details.newsId)
                : parseInt(details.postId),
            commentText: commentText,
            itemType: type,
            isReply: false,
            isPrivate: false,
            commentor: {
              userId: getEncUserId(userDetails.userId),
              firstName: userDetails.firstName,
              imageUrl: userDetails.imageUrl,
            },
            mentions: [],
            ownerName: ownerName,
            myName: userDetails.firstName,
            creatorId: getEncTokenAnyUserId(createdBy),
            replyTo: getEncTokenAnyUserId(replyTo),
            replyToName: replyToName,
          },
      token: token,
    })
      .then(response => {
        setComments([...comments, response.data.response?.comment]);
        setCommentText('');
        setIsReply(false);
      })
      .catch(error => {
        console.log(error);
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
  // console.log('Comments------------------', commentReplies);
  console.log('Details----------', details);
  const handleOnClose = () => {
    setThreeDot(false);
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
        navigation.goBack();
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
      <CommentHeader name={'Comments'} />
      {threeDot && (
        <ThreeDotComponent
          onClose={handleOnClose}
          type={threeDotData.type}
          feedId={threeDotData.feedId}
          imageUrl={threeDotData.imageUrl}
          title={threeDotData.title}
          setFeeds={setFeeds}
          isHome={false}
        />
      )}

      {type === 'news' ? (
        <View style={globalStyles.innerPagesContainer}>
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
                      Select from the people listed below with whom you can
                      share this post
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
                            <FontAwesome
                              name={isOpened ? 'chevron-up' : 'chevron-down'}
                              color={'#444'}
                              size={18}
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
                    <Pressable
                      style={{width: '90%', marginTop: 150}}
                      onPress={handleShare}>
                      <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#037ee5', '#15a2e0', '#28cad9']}
                        style={[globalStyles.linearGradient, {height: 38}]}>
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
          <ScrollView
            style={mainStyles.postFeed}
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}>
            <View
              style={[styles.newsCard, {marginBottom: 0}]}
              key={details.newsId}>
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
                  <Text style={styles.newsSubTitletext}>
                    {moment(new Date()).diff(
                      moment(details.feedTime.replace(' ', 'T') + 'Z'),
                      'days',
                    ) < 1
                      ? moment(
                          details.feedTime.replace(' ', 'T') + 'Z',
                        ).fromNow('past')
                      : moment(details.feedTime.replace(' ', 'T') + 'Z').format(
                          'DD MMM YYYY, h:mm a',
                        )}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.options}
                  onPress={() =>
                    onPressThreeDot({
                      type,
                      feedId: details.newsId,
                      title: details.newsTitle,
                      imageUrl: details.newsImageUrl,
                    })
                  }>
                  <EnIcon name="dots-three-horizontal" size={25} color="#333" />
                </TouchableOpacity>
              </View>

              <Text style={styles.mainDesc}>{details.newsTitle}</Text>

              <View style={styles.newsCoverImg}>
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: details.newsImageUrl,
                  }}
                  style={[styles.postImg]}
                />
                <Pressable
                  style={styles.newsLink}
                  onPress={() => Linking.openURL(details.newsLink)}>
                  <Text style={styles.newsTextSource}>
                    Source : {details.newsSource}
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.secDesc}>{details.newsDescription}</Text>

              <View style={mainStyles.likeCommentShare}>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity
                      onPress={() => {
                        onNewsLike(details.newsId);
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/liked.png')}
                        style={[styles.likeImg]}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                      </TouchableOpacity> */}
                    <Text style={styles.iconText}>{likes} Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View
                    style={styles.likeCommentShareIconWrap}
                    // onPress={() => navigation.push('comments')}
                  >
                    {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name="message1" size={22} color="#c1cb99" />
                      </TouchableOpacity> */}
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/comment.png')}
                      style={[styles.likeImg]}
                    />

                    <Text style={styles.iconText}>
                      {details.commentCount} Comment
                    </Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <Menu>
                      <MenuTrigger>
                        <Image
                          resizeMode="contain"
                          source={require('../assets/images/share.png')}
                          style={[styles.likeImg]}
                        />
                      </MenuTrigger>
                      <MenuOptions style={styles.shareWrap}>
                        <MenuOption
                          value={1}
                          style={styles.shareWrapInner}
                          onSelect={() => handleShareOnLyk(details, type)}>
                          <Image
                            resizeMode="contain"
                            source={require('../assets/images/share-on-lyk.png')}
                            style={[
                              styles.likeShareImg,
                              {width: 22, height: 18},
                            ]}
                          />
                          <Text style={styles.shareText}>Share on LYK</Text>
                        </MenuOption>
                        <MenuOption
                          value={2}
                          style={styles.shareWrapInner}
                          onSelect={handleShare}>
                          <Image
                            resizeMode="contain"
                            source={require('../assets/images/external-share.png')}
                            style={[
                              styles.likeShareImg,
                              {width: 18, height: 24},
                            ]}
                          />
                          <Text style={styles.shareText}>External share</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>

                    <Text style={styles.iconText}>
                      {details.shareCount} Share
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            {comments > '0' &&
              comments?.map((comment, ind) => {
                return (
                  <>
                    <CommentComponents
                      commentDetails={comment}
                      // replyCall={getFeedCommentReplies}
                      type={type}
                      details={details}
                      isChield={comment.isReply}
                      setLike={onLikeComment}
                      key={ind}
                      pressEvent={() => {
                        inputRef.current.focus();
                        setIsReply(true);
                        setWhichComment(comment.commentId);
                      }}
                      isReply={isReply}
                      setIsReply={setIsReply}
                      parentId={parentId}
                      setParentId={setParentId}
                      toUserId={toUserId}
                      setToUserId={setToUserId}
                    />
                  </>
                );
              })}
          </ScrollView>
        </View>
      ) : (
        type === 'post' && (
          <ScrollView>
            <View
              style={[styles.newsCard, {marginBottom: 0}]}
              key={details.postId}>
              <View style={styles.cardTitle}>
                <View style={styles.cardProImg}>
                  <Image
                    resizeMode="cover"
                    source={require('../assets/images/avatar.jpg')}
                    style={[styles.logoImg]}
                  />
                </View>
                <View style={styles.newstext}>
                  <Text style={styles.newsTitletext}>
                    {details.createdBy.firstName}
                  </Text>
                  <Text style={styles.newsSubTitletext}>
                    {moment(new Date()).diff(
                      moment(details.feedTime.replace(' ', 'T') + 'Z'),
                      'days',
                    ) < 1
                      ? moment(
                          details.feedTime.replace(' ', 'T') + 'Z',
                        ).fromNow('past')
                      : moment(details.feedTime.replace(' ', 'T') + 'Z').format(
                          'DD MMM YYYY, h:mm a',
                        )}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.options}
                  onPress={() =>
                    onPressThreeDot({
                      type,
                      feedId: details.postId,
                      title: details.title,
                      imageUrl: details.imageUrl,
                    })
                  }>
                  <EnIcon name="dots-three-horizontal" size={25} color="#333" />
                </TouchableOpacity>
              </View>

              {/* <Text style={styles.mainDesc}>
                  {details.title}
                </Text> */}

              {details.imageUrl && (
                <View style={styles.newsCoverImg}>
                  <Image
                    resizeMode="cover"
                    source={{
                      uri:
                        'https://cdn.lykapp.com/newsImages/images/' +
                        details.imageUrl,
                    }}
                    style={[styles.postImg]}
                  />
                </View>
              )}
              <Text style={styles.secDesc}>{details.title}</Text>

              <View style={[mainStyles.likeCommentShare]}>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <TouchableOpacity
                      onPress={() => {
                        onPressLike(details.postId, details.createdBy.userId);
                      }}>
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/liked.png')}
                        style={[styles.likeImg]}
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.roundBase}>
                          <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                        </TouchableOpacity> */}
                    <Text style={styles.iconText}>{likes} Like</Text>
                  </View>
                </View>

                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    {/* <TouchableOpacity style={styles.roundBase}>
                          <AntIcon name="message1" size={22} color="#c1cb99" />
                        </TouchableOpacity> */}
                    <Image
                      resizeMode="contain"
                      source={require('../assets/images/comment.png')}
                      style={[styles.likeImg]}
                    />

                    <Text style={styles.iconText}>
                      {details.commentCount} Comment
                    </Text>
                  </View>
                </View>
                <View style={styles.likeCommentShareBox}>
                  <View style={styles.likeCommentShareIconWrap}>
                    <Menu>
                      <MenuTrigger>
                        <Image
                          resizeMode="contain"
                          source={require('../assets/images/share.png')}
                          style={[styles.likeImg]}
                        />
                      </MenuTrigger>
                      <MenuOptions style={styles.shareWrap}>
                        <MenuOption
                          value={1}
                          style={styles.shareWrapInner}
                          onSelect={() => handleShareOnLyk(details, type)}>
                          <Image
                            resizeMode="contain"
                            source={require('../assets/images/share-on-lyk.png')}
                            style={[
                              styles.likeShareImg,
                              {width: 22, height: 18},
                            ]}
                          />
                          <Text style={styles.shareText}>Share on LYK</Text>
                        </MenuOption>
                        <MenuOption
                          value={2}
                          style={styles.shareWrapInner}
                          onSelect={handleShare}>
                          <Image
                            resizeMode="contain"
                            source={require('../assets/images/external-share.png')}
                            style={[
                              styles.likeShareImg,
                              {width: 18, height: 24},
                            ]}
                          />
                          <Text style={styles.shareText}>External share</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>

                    <Text style={styles.iconText}>
                      {details.shareCount} Share
                    </Text>
                  </View>
                </View>
              </View>
              {/* {details.commentCount > '0' &&
                details.allComments?.map((comment, ind) => (
                  <CommentComponents commentDetails={comment} key={ind} />
                ))} */}
            </View>
            {comments > '0' &&
              comments?.map((comment, ind) => {
                return (
                  <>
                    <CommentComponents
                      commentDetails={comment}
                      // replyCall={getFeedCommentReplies}
                      type={type}
                      details={details}
                      isChield={comment.isReply}
                      key={ind}
                      pressEvent={() => {
                        inputRef.current.focus();
                        setIsReply(true);
                        setWhichComment(comment.commentId);
                      }}
                      isReply={isReply}
                      setIsReply={setIsReply}
                      parentId={parentId}
                      setParentId={setParentId}
                      toUserId={toUserId}
                      setToUserId={setToUserId}
                    />
                  </>
                );
              })}
            {/* {details.commentCount === '0' && (
              <View style={mainStyles.messageWrapper}>
                <Text style={mainStyles.message}>Still no comments!</Text>
              </View>
            )} */}
          </ScrollView>
        )
      )}
      <View style={mainStyles.gap}></View>
      <View style={mainStyles.commentInputBox}>
        <TouchableOpacity onPress={() => inputRef.current.focus}>
          <Image source={smileImg} style={mainStyles.smile} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          onChangeText={text => setCommentText(text)}
          value={commentText}
          style={mainStyles.commentInput}
          placeholder="Type your comment here"
          placeholderTextColor="#9e9c9c"
        />
        <TouchableOpacity
          onPress={() => {
            onSubmitComment(
              isReply ? whichComment : '',
              isReply
                ? comments.find(val => val?.commentId === whichComment)
                    .commentor?.firstName
                : '',
              type === 'news' ? '' : details.createdBy.userId,
              type === 'news' ? '' : details.createdBy.firstName,
              isReply
                ? comments.find(val => val?.commentId === whichComment)._id
                : '',
              isReply
                ? comments.find(val => val?.commentId === whichComment).toUserId
                : '',
            );
          }}>
          <Image source={sendImg} style={mainStyles.send} />
        </TouchableOpacity>
      </View>
    </>
  );
};
const mainStyles = StyleSheet.create({
  commentInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    height: 60,
    backgroundColor: '#fff',
    bottom: 0,
    borderTopColor: '#d8d8d8',
    borderTopWidth: 1,
    paddingHorizontal: 5,
  },
  smile: {
    width: 32,
    height: 32,
  },
  postFeed: {
    // top: 60,
    height: 1100,
    // backgroundColor: 'red',
  },
  message: {
    fontSize: 15,
    color: '#000',
    fontWeight: '700',
    fontFamily: 'SFpro-Regular',
  },
  commentInput: {
    width: '75%',
    height: '100%',
    // backgroundColor: 'red',
  },
  messageWrapper: {
    backgroundColor: '#f2f5f7',
  },
  likeCommentShare: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingTop: 2,
    paddingBottom: 2,
  },
  gap: {
    width: '100%',
    height: 60,
  },
  moreReplies: {
    width: '100%',
    height: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingLeft: 65,
  },
  replyText: {
    fontSize: 12,
    fontWeight: '700',
  },
  newsCoverImg: {
    height: 550,
    width: '100%',
  },
  postImg: {
    height: '100%',
    width: '100%',
  },
  messageWrapper: {
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    //  bottom:'50%',
  },
  message: {
    color: '#000',
    fontWeight: '700',
    fontFamily: 'SFpro-Bold',
  },
  send: {
    width: 50,
    height: 50,
  },
});
export default CommentsDetails;
