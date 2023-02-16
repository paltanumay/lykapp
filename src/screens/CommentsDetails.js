/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, {useEffect, useRef} from 'react';
import {ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import EnIcon from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import HomeComments from '../components/HomeComments';
import CommentComponents from '../components/CommentsComponent';
import smileImg from '../assets/images/smile.png';
import sendImg from '../assets/images/send.png';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import axios from 'axios';
import {useState} from 'react';
import {saveCommentFeed} from '../services/homeFeedComment.service';
import CommentHeader from '../components/commentHeader';
import ThreeDotComponent from '../components/threeDot';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const COMMENT_URL = `${API_URL}/gtfdcmts`;
export const POST_COMMENT_URL = `${API_URL}/svcmt`;

const CommentsDetails = () => {
  const route = useRoute();
  const [threeDot, setThreeDot] = useState(false);
  const details = route.params.details;
  const styles = route.params.styles;
  const type = route.params.type;
  const COMMENT_FEED_SHORT = 'bH3m8q';
  const POST_COMMENT_SHORT = 'g4QyL';
  // console.log(details, type);
  const [comments, setComments] = useState('');
  // console.log(comments);

  const inputRef = useRef();
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
      console.log(token);

      const response = await axios.post(
        COMMENT_URL,
        {
          userId: getEncUserId(userDetails.userId),
          feedId: type === 'news' ? details.newsId : details.postId,
          feedType: type,
          start: 0,
          limit: 25,
        },
        // {
        //   userId: getEncUserId(userDetails.userId),
        //   feedId: 360246,
        //   feedType: 'post',
        //   start: 0,
        //   limit: 25,
        // },
        {
          headers: {
            token: token,
          },
        },
      );
      console.log(response.data, 'res');
      console.log({
        userId: getEncUserId(userDetails.userId),
        feedId: type === 'news' ? details.newsId : details.postId,
        feedType: type,
        start: 0,
        limit: 25,
      });
    };
    getAllComments();
  }, []);

  const onSubmitComment = async () => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      POST_COMMENT_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);

    const res = saveCommentFeed({
      URL: POST_COMMENT_URL,

      data: {
        feedId:
          type === 'news' ? parseInt(details.newsId) : parseInt(details.postId),
        commentText: comments,
        itemType: type,
        isReply: false,
        isPrivate: false,
        toUserId: '',
        commentor: {
          userId: getEncUserId(userDetails.userId),
          firstName: userDetails.firstName,
          imageUrl: userDetails.imageUrl,
        },
        ownerName: userDetails.firstName,
        myName: userDetails.firstName,
        creatorId: getEncUserId(userDetails.userId),
        replyTo: '',
        replyToName: '',
      },
      token: token,
    });

    // console.log(res, 'responsdf');
  };
  // console.log(details.allComments);
  return (
    <>
      <CommentHeader />
      {threeDot && <ThreeDotComponent onClose={() => setThreeDot(false)} />}
      <View>
        {type === 'news' ? (
          <>
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
                          ).fromNow()
                        : moment(
                            details.feedTime.replace(' ', 'T') + 'Z',
                          ).format('DD MMM YYYY, h:mm a')}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.options}
                    onPress={() => setThreeDot(prev => !prev)}>
                    <EnIcon
                      name="dots-three-horizontal"
                      size={25}
                      color="#333"
                    />
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
                </View>
                <Text style={styles.secDesc}>{details.newsDescription}</Text>

                <View style={mainStyles.likeCommentShare}>
                  <View style={styles.likeCommentShareBox}>
                    <View style={styles.likeCommentShareIconWrap}>
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/liked.png')}
                        style={[styles.likeImg]}
                      />
                      {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                      </TouchableOpacity> */}

                      <Text style={styles.iconText}>
                        {details.likeCount} Like
                      </Text>
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
                      {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name="sharealt" size={22} color="#f8767a" />
                      </TouchableOpacity> */}
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/share.png')}
                        style={[styles.likeImg]}
                      />

                      <Text style={styles.iconText}>
                        {details.shareCount} Share
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {details.commentCount > '0' &&
                details.allComments?.map((comment, ind) => (
                  <CommentComponents commentDetails={comment} key={ind} />
                ))}
            </ScrollView>
          </>
        ) : (
          type === 'post' && (
            <ScrollView>
              <View
                style={[styles.newsCard, {marginBottom: 0}]}
                key={details.postId}>
                <View style={styles.cardTitle}>
                  <View style={styles.cardProImg}>
                    <Image
                      resizeMode="contain"
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
                        moment(details.createdOn.replace(' ', 'T') + 'Z'),
                        'days',
                      ) < 1
                        ? moment(
                            details.createdOn.replace(' ', 'T') + 'Z',
                          ).fromNow()
                        : moment(
                            details.createdOn.replace(' ', 'T') + 'Z',
                          ).format('DD MMM YYYY, h:mm a')}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.options}>
                    <EnIcon
                      name="dots-three-horizontal"
                      size={25}
                      color="#333"
                    />
                  </TouchableOpacity>
                </View>

                {/* <Text style={styles.mainDesc}>
                  {details.title}
                </Text> */}

                {details.imageUrl && (
                  <View style={styles.newsCoverImg}>
                    <Image
                      resizeMode="stretch"
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
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/liked.png')}
                        style={[styles.likeImg]}
                      />

                      {/* <TouchableOpacity style={styles.roundBase}>
                          <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                        </TouchableOpacity> */}

                      <Text style={styles.iconText}>
                        {details.likeCount} Like
                      </Text>
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
                      {/* <TouchableOpacity style={styles.roundBase}>
                          <AntIcon name="sharealt" size={22} color="#f8767a" />
                        </TouchableOpacity> */}
                      <Image
                        resizeMode="contain"
                        source={require('../assets/images/share.png')}
                        style={[styles.likeImg]}
                      />

                      <Text style={styles.iconText}>
                        {details.shareCount} Share
                      </Text>
                    </View>
                  </View>
                </View>
                {details.commentCount > '0' &&
                  details.allComments?.map((comment, ind) => (
                    <CommentComponents commentDetails={comment} key={ind} />
                  ))}
              </View>
              {details.commentCount === '0' && (
                <View style={styles.messageWrapper}>
                  <Text style={mainStyles.message}>Still no Comments!</Text>
                </View>
              )}
            </ScrollView>
          )
        )}
      </View>
      <View style={mainStyles.commentInputBox}>
        <TouchableOpacity onPress={() => inputRef.current.focus}>
          <Image source={smileImg} style={mainStyles.smile} />
        </TouchableOpacity>
        <TextInput
          ref={inputRef}
          onChangeText={text => setComments(text)}
          style={mainStyles.commentInput}
          placeholder="Type your comment here"
          placeholderTextColor="#9e9c9c"
        />
        <TouchableOpacity onPress={onSubmitComment}>
          <Image source={sendImg} />
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
});
export default CommentsDetails;
