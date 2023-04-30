import React from 'react';
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
import {MenuProvider} from 'react-native-popup-menu';
import {useContext} from 'react';
import {HomeContext} from '../../../shared/homeFeedCotext';

const NewsCard = ({
  details = {},
  // onRedirectCommentScreen = () => {},
  onPressThreeDot = () => {},
  handleShare = () => {},
  handleShareOnLyk = () => {},
  onNewsLike = () => {},
  type = '',
}) => {
  const navigation = useNavigation();

  const onRedirectCommentScreen = ({details, type}) => {
    navigation.push('comments', {
      details: details,
      styles: styles,
      type: type,
    });
  };
  // const navigation = useNavigation();
  const {setFeeds} = useContext(HomeContext);

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
    <Pressable
      style={styles.newsCard}
      key={details.newsId ? details.newsId : details.typeId}
      onPress={() => onRedirectCommentScreen({details, type})}>
      {type === 'sharenews' ? (
        <View style={styles.shareTitle}>
          <View style={styles.cardProImg}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/logo.png')}
              style={[styles.logoImg]}
            />
          </View>
          <View style={styles.newstext}>
            <Text style={styles.newsTitletext}>
              <Text style={styles.sharedText}>
                {details.sharedByUser.firstName}
              </Text>{' '}
              shared
            </Text>
            <Text style={styles.newsSubTitletext}>
              {moment(new Date()).diff(
                moment(
                  details.sharedByUser.lastUpdatedTime.replace(' ', 'T') + 'Z',
                ),
                'days',
              ) < 1
                ? moment(
                    details.sharedByUser.lastUpdatedTime.replace(' ', 'T') +
                      'Z',
                  ).fromNow('past')
                : moment(
                    details.sharedByUser.lastUpdatedTime.replace(' ', 'T') +
                      'Z',
                  ).format('DD MMM YYYY, h:mm a')}
            </Text>
          </View>
          {/* <TouchableOpacity
                      style={styles.options}
                      onPress={() =>
                        onPressThreeDot({
                          type,
                          feedId: details.newsId,
                          title: details.newsTitle,
                          imageUrl: details.newsImageUrl,
                          setFeeds: setFeeds,
                        })
                      }>
                      <EnIcon
                        name="dots-three-horizontal"
                        size={25}
                        color="#333"
                      />
                    </TouchableOpacity> */}
        </View>
      ) : null}

      <View style={styles.cardTitle}>
        <View style={styles.cardProImg}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/logo.png')}
            style={[styles.logoImg]}
          />
        </View>
        <View style={styles.newstext}>
          <Text style={styles.newsTitletext}>News & Stories</Text>
          <Text style={styles.newsSubTitletext}>
            {moment(new Date()).diff(
              moment(
                details.feedTime
                  ? details.feedTime.replace(' ', 'T') + 'Z'
                  : details.addedOn.replace(' ', 'T') + 'Z',
              ),
              'days',
            ) < 1
              ? moment(
                  details.feedTime
                    ? details.feedTime.replace(' ', 'T') + 'Z'
                    : details.addedOn.replace(' ', 'T') + 'Z',
                ).fromNow('past')
              : moment(
                  details.feedTime
                    ? details.feedTime.replace(' ', 'T') + 'Z'
                    : details.addedOn.replace(' ', 'T') + 'Z',
                ).format('DD MMM YYYY, h:mm a')}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.options}
          onPress={() =>
            onPressThreeDot({
              type,
              feedId: details.newsId ? details.newsId : details.typeId,
              title: details.newsTitle ? details.newsTitle : details.typeTitle,
              imageUrl: details.newsImageUrl
                ? details.newsImageUrl
                : details.typeImageURL,
              setFeeds: setFeeds,
            })
          }>
          <EnIcon name="dots-three-horizontal" size={25} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.mainDesc}>
        {details.newsTitle ? details.newsTitle : details.typeTitle}
      </Text>

      <Pressable
        style={styles.newsCoverImg}
        onPress={() =>
          Linking.openURL(details.newsLink ? details.newsLink : details.typeUrl)
        }>
        <Image
          resizeMode="stretch"
          source={{
            uri: details.newsImageUrl
              ? details.newsImageUrl
              : details.typeImageURL,
          }}
          style={[styles.postImg]}
        />

        <View style={styles.newsLink}>
          <Text style={styles.newsTextSource}>
            Source :{' '}
            {details.newsSource ? details.newsSource : details.typeSource}
          </Text>
        </View>
      </Pressable>
      <Text style={styles.secDesc}>{details.newsDescription}</Text>

      <View style={styles.likeCommentShare}>
        <View style={styles.likeCommentShareBox}>
          <View style={styles.likeCommentShareIconWrap}>
            <TouchableOpacity
              style={styles.likeCommentShareIconWrap}
              onPress={() => {
                console.log('Details------------------', details);
                onNewsLike(details.newsId ? details.newsId : details.typeId);
              }}>
              <Image
                resizeMode="contain"
                source={require('../../../assets/images/liked.png')}
                style={[styles.likeImg]}
              />
              {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                      </TouchableOpacity> */}
            </TouchableOpacity>
            <Text style={styles.iconText}>{details.likeCount} Like</Text>
          </View>
        </View>

        <View style={styles.likeCommentShareBox}>
          <TouchableOpacity
            style={styles.likeCommentShareIconWrap}
            onPress={() => onRedirectCommentScreen({details, type})}>
            {/* <TouchableOpacity style={styles.roundBase}>
                        <AntIcon name="message1" size={22} color="#c1cb99" />
                      </TouchableOpacity> */}
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/comment.png')}
              style={[styles.likeImg]}
            />

            <Text style={styles.iconText}>{details.commentCount} Comment</Text>
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
          onPress={() => onRedirectCommentScreen({type, details})}>
          <TextInput
            placeholderTextColor="#AFAFAF"
            style={styles.input}
            editable={false}
            placeholder="Add comment"
            textContentType="username"
            underlineColorAndroid="transparent"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default NewsCard;

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
