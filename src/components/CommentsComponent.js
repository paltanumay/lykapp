import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {View, Image, Text, Pressable} from 'react-native';
import avatarImg from '../assets/images/avatar.jpg';

const CommentComponents = ({commentDetails, replyCall = () => {}}) => {
  console.log('Comment count----------', commentDetails);
  return (
    <View style={styles.addCommentWrap}>
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
            <Image
              resizeMode="contain"
              source={require('../assets/images/liked.png')}
              style={[styles.likeImg]}
            />
            <Text style={styles.like}>{'Like'}</Text>
            <Text style={styles.reply}>{'Reply'}</Text>
          </View>
        </View>
      </View>
    </View>
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
    backgroundColor: '#fff',
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
});
export default CommentComponents;
