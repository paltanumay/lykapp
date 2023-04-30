import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  RefreshControl,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import moment from 'moment';
import COLORS from '../../../global/globalColors';
import EnIcon from 'react-native-vector-icons/Entypo';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import HomeComments from '../../HomeComments';
import OtherPostThreeDot from '../../otherPostThreeDot';
import {MenuProvider} from 'react-native-popup-menu';

const PostCard = ({
  details = {},
  onPressThreeDot = () => {},
  handleShare = () => {},
  handleShareOnLyk = () => {},
  onPressLike = () => {},
  setPopUpOpen = () => {},
  popUpOpen,
  type = '',
  userInfo = {},
}) => {
  // const navigation = useNavigation();
  const navigation = useNavigation();

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

  return (
    <MenuProvider>
      <Pressable
        style={styles.newsCard}
        key={details.postId ? details.postId : details.typeTitle}
        onPress={() => onRedirectCommentScreen({details, type})}>
        <View style={styles.cardTitle}>
          <View style={styles.cardProImg}>
            <Image
              resizeMode="contain"
              source={
                details.createdBy
                  ? details.createdBy.imageUrl
                    ? {uri: details.createdBy.imageUrl}
                    : require('../../../assets/images/avatar.jpg')
                  : details.typeCreatorDetails.imageUrl
                  ? {uri: details.typeCreatorDetails.imageUrl}
                  : require('../../../assets/images/avatar.jpg')
              }
              style={[styles.logoImg]}
            />
          </View>
          <View style={styles.newstext}>
            <Text style={styles.newsTitletext}>
              {details.createdBy
                ? details.createdBy.firstName
                : details.typeCreatorDetails.firstName}
            </Text>
            <Text style={styles.newsSubTitletext}>
              {moment(new Date()).diff(
                moment(
                  details.feedTime
                    ? details.feedTime.replace(' ', 'T') + 'Z'
                    : details.createdOn.replace(' ', 'T') + 'Z',
                ),
                'days',
              ) < 1
                ? moment(
                    details.feedTime
                      ? details.feedTime.replace(' ', 'T') + 'Z'
                      : details.createdOn.replace(' ', 'T') + 'Z',
                  ).fromNow('past')
                : moment(
                    details.feedTime
                      ? details.feedTime.replace(' ', 'T') + 'Z'
                      : details.createdOn.replace(' ', 'T') + 'Z',
                  ).format('DD MMM YYYY, h:mm a')}
            </Text>
          </View>
          {details?.createdBy &&
          details?.createdBy?.userId !== userInfo.userId ? (
            <>
              <Menu style={styles.options}>
                <MenuTrigger>
                  <EnIcon name="dots-three-horizontal" size={25} color="#333" />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptionsWrapper}>
                  <OtherPostThreeDot
                    details={details}
                    popUpOpen={popUpOpen}
                    setPopUpOpen={setPopUpOpen}
                  />
                </MenuOptions>
              </Menu>
            </>
          ) : (
            <TouchableOpacity
              style={styles.options}
              onPress={() =>
                onPressThreeDot({
                  type,
                  title: details.title ? details.title : details.typeTitle,
                  details: details,
                  feedId: details.postId ? details.postId : details.typeId,
                  imageUrl: details.imageUrl
                    ? details.imageUrl
                    : details.typeUrl,
                })
              }>
              <EnIcon name="dots-three-horizontal" size={25} color="#333" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.mainDesc}>
          {details.title ? details.title : details.typeTitle}
        </Text>
        {details.imageUrl ? (
          <View style={styles.newsCoverImg}>
            <Image
              resizeMode="stretch"
              source={{
                uri: `https://cdn.lykapp.com/newsImages/images/${
                  details.imageUrl ? details.imageUrl : details.typeUrl
                }`,
              }}
              style={styles.postImg}
            />
          </View>
        ) : null}
        <View style={styles.likeCommentShare}>
          <View style={styles.likeCommentShareBox}>
            <View style={styles.likeCommentShareIconWrap}>
              <TouchableOpacity
                onPress={() => {
                  onPressLike(
                    details.postId ? details.postId : details.typeId,
                    details.createdBy
                      ? details.createdBy.userId
                      : details.typeCreatorDetails.userId,
                  );
                }}
                style={styles.likeCommentShareIconWrap}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/liked.png')}
                  style={[styles.likeImg]}
                />
              </TouchableOpacity>

              <Text style={styles.iconText}>{details.likeCount} Like</Text>
            </View>
          </View>

          <View style={styles.likeCommentShareBox}>
            <TouchableOpacity
              onPress={() => onRedirectCommentScreen({details, type})}
              style={styles.likeCommentShareIconWrap}>
              {/* <TouchableOpacity style={styles.roundBase}>
                          <AntIcon name="message1" size={22} color="#c1cb99" />
                        </TouchableOpacity> */}
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/comment.png')}
                style={[styles.likeImg]}
              />

              <Text style={styles.iconText}>
                {details.commentCount} Comment
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.likeCommentShareBox}>
            <View style={styles.likeCommentShareIconWrap}>
              <Menu>
                <MenuTrigger>
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/share.png')}
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
                      source={require('../../../assets/images/share-on-lyk.png')}
                      style={[styles.likeShareImg, {width: 22, height: 18}]}
                    />
                    <Text style={styles.shareText}>Share on LYK</Text>
                  </MenuOption>
                  <MenuOption
                    value={2}
                    style={styles.shareWrapInner}
                    onSelect={handleShare}>
                    <Image
                      resizeMode="contain"
                      source={require('../../../assets/images/external-share.png')}
                      style={[styles.likeShareImg, {width: 18, height: 24}]}
                    />
                    <Text style={styles.shareText}>External share</Text>
                  </MenuOption>
                </MenuOptions>
              </Menu>

              <Text style={styles.iconText}>{details.shareCount} Share</Text>
            </View>
          </View>
        </View>
        {details.allComments?.map((comment, ind) => (
          <HomeComments commentDetails={comment} key={ind} />
        ))}
        <View style={styles.addCommentWrap}>
          <View style={styles.addCommentImgWrap}>
            <Image
              resizeMode="stretch"
              source={require('../../../assets/images/avatar.jpg')}
              style={[styles.addCommentImg]}
            />
          </View>
          <TouchableOpacity
            style={styles.addCommentField}
            onPress={() => onRedirectCommentScreen({details, type})}>
            <TextInput
              placeholder="Add comment"
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              editable={false}
              disableFullscreenUI={true}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    </MenuProvider>
  );
};

export default PostCard;

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
    borderRadius: 10,
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
    height: 350,
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
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 14},
});
