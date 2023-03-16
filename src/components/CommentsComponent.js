import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, Text, Pressable} from 'react-native';
import avatarImg from '../assets/images/avatar.jpg';
import {generalApiCallPost} from '../services/homeFeed.service';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const COMMENT_REPLIES_URL = `${API_URL}/gtfdcmtrpls`;

const CommentComponents = ({
  commentDetails,
  type,
  details,
  isChield = false,
  setLike = () => {},
}) => {
  console.log('Comment count----------', commentDetails);
  const [commentReplies, setCommentReplies] = useState([]);
  const [expand, setExpand] = useState(false);
  const COMMENT_REPLY_SHORT = 'mS72Lc';

  const getFeedCommentReplies = async commentId => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      COMMENT_REPLY_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);

    generalApiCallPost({
      URL: COMMENT_REPLIES_URL,
      data: {
        userId: getEncUserId(userDetails.userId),
        feedId:
          type === 'news' ? parseInt(details.newsId) : parseInt(details.postId),
        feedType: type,
        commentId: commentId,
      },
      token: token,
    })
      .then(response => {
        console.log('Res---------------', response.data.response.comments);
        setCommentReplies([
          ...commentReplies,
          ...response.data.response.comments,
        ]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFeedCommentReplies(commentDetails?.commentId);
  }, []);

  console.log('Comment replies-------------', commentReplies);

  return (
    <>
      <View
        style={[
          styles.addCommentWrap,
          {backgroundColor: isChield ? '' : '#ffffff'},
        ]}>
        <View style={styles.addCommentImgWrap}>
          <Image
            resizeMode="stretch"
            //This source will work when imageUrl field have correct format of  image path
            //   source={
            //     commentDetails.commentor.imageUrl
            //       ? {uri: commentDetails.commentor.imageUrl}
            //       : avatarImg
            //   }
            source={avatarImg}
            style={[styles.addCommentImg]}
          />
        </View>
        <View style={styles.addCommentField}>
          <View style={styles.commentInfo}>
            <Text style={styles.userName}>
              {commentDetails?.commentor?.firstName}
            </Text>
            <Text style={styles.newsSubTitletext}>
              {/* {moment(new Date()).diff(
              moment(details.createdOn.replace(' ', 'T') + 'Z'),
              'days',
            ) < 1
              ? moment(details.createdOn.replace(' ', 'T') + 'Z').fromNow()
              : moment(details.createdOn.replace(' ', 'T') + 'Z').format(
                  'DD MMM YYYY, h:mm a',
                )} */}
              {'just now'}
            </Text>
            <Text style={styles.comment}>{commentDetails?.commentText}</Text>
            <View style={styles.socialInfo}>
              <Pressable
                onPress={() => {
                  setLike(
                    commentDetails.commentId,
                    commentDetails.commentor.userId,
                  );
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/images/liked.png')}
                  style={[styles.likeImg]}
                />
              </Pressable>
              <Text style={styles.like}>{'Like'}</Text>
              <Text style={styles.reply}>{'Reply'}</Text>
            </View>
          </View>
          {commentDetails.commentCount > 0 ? (
            expand ? null : (
              <Pressable
                onPress={() => {
                  setExpand(true);
                }}
                key={commentDetails.commentId}
                style={styles.moreReplies}>
                <Text style={styles.replyText}>
                  View {commentDetails.commentCount} more replies
                </Text>
              </Pressable>
            )
          ) : null}
        </View>
      </View>
      {commentDetails.commentCount > 0
        ? expand
          ? commentReplies.map((replies, inx) => {
              if (replies.parentId === commentDetails.commentId) {
                return (
                  <CommentComponents
                    commentDetails={replies}
                    // replyCall={getFeedCommentReplies}
                    details={details}
                    type={type}
                    isChield={true}
                    setLike={setLike}
                    key={inx}
                  />
                );
              }
            })
          : null
        : null}
    </>
  );
};

const styles = StyleSheet.create({
  addCommentImgWrap: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
  },
  addCommentImg: {
    width: 50,
    height: 50,
  },
  like: {
    paddingHorizontal: 3,
  },
  reply: {
    paddingLeft: 30,
  },
  socialInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCommentWrap: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // backgroundColor: 'ffffff',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
  },
  addCommentField: {
    // backgroundColor: '#e7ebf6',
    // borderRadius: 8,
    width: '88%',
    paddingHorizontal: 5,
  },
  commentInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  userName: {
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
  },
  comment: {
    color: '#333',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 2,
  },
  newsSubTitletext: {
    color: '#9e9c9c',
    fontSize: 12,
    fontFamily: 'SFpro-Regular',
  },
  likeImg: {
    width: 40,
    height: 40,
  },
  moreReplies: {
    width: '100%',
    height: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    // backgroundColor: '#ffffff',
  },
  replyText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
export default CommentComponents;
