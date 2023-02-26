import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import avatarImg from '../assets/images/avatar.jpg';
const HomeComments = ({commentDetails}) => {
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
          <Text style={styles.comment}>{commentDetails?.commentText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    paddingVertical: 5,
  },
  addCommentField: {
    // backgroundColor: '#e7ebf6',
    // borderRadius: 8,
    width: '88%',
    paddingHorizontal: 5,
  },
  commentInfo: {
    flexDirection: 'row',
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
    paddingHorizontal: 5,
  },
});
export default HomeComments;
