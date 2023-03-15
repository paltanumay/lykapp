/* eslint-disable react-native/no-inline-styles */
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import COLORS from '../global/globalColors';
import {INAPPROPRIATE_URL} from '../screens/Home';
import {setMarkAsInAppropriate} from '../services/homeFeed.service';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import WhiteButton from './buttons/whiteButton';

const INAPPROPRIATE_SHORT = 'rprIe';

const ThreeDotComponent = ({
  onClose,
  type,
  feedId,
  title,
  imageUrl,
  setFeeds,
  isHome,
}) => {
  const navigation = useNavigation();
  const handleCopyLink = async () => {
    Clipboard.setString(`https://www.lykapp.com/${type}/${feedId}`);
    onClose();
  };

  const handleInappropriate = async () => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    // console.log(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      INAPPROPRIATE_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    setMarkAsInAppropriate({
      URL: INAPPROPRIATE_URL,
      data: {
        itemId: feedId,
        userId: getEncUserId(userDetails.userId),
        itemType: type,
        title: title,
        imageUrl: imageUrl,
        reason: 'From Home Feed',
      },
      token,
    })
      .then(res => {
        console.log(res.data, 'api---->');
        type === 'news'
          ? setFeeds(prev =>
              prev.filter(data => data.details.newsId !== feedId),
            )
          : setFeeds(prev =>
              prev.filter(data => data.details.postId !== feedId),
            );
        onClose();
        !isHome && navigation.goBack();
      })
      .catch(err => console.log(err, 'err--->'));
  };

  const handleDelete = () => {
    console.log('dfd');
  };

  return (
    <TouchableOpacity style={styles.menuItemsWrap} onPress={onClose}>
      <WhiteButton
        buttonName={'copy link'}
        textColor={COLORS.primaryRed}
        onPress={handleCopyLink}
      />
      {type === 'post' ? (
        <WhiteButton
          buttonName={'delete'}
          textColor={COLORS.primaryRed}
          onPress={handleDelete}
        />
      ) : (
        <WhiteButton
          buttonName={'mark as inappropriate'}
          textColor={COLORS.primaryRed}
          onPress={handleInappropriate}
        />
      )}
      <WhiteButton
        buttonName={'cancel'}
        textColor={COLORS.blue}
        onPress={onClose}
        customStyle={{marginTop: '5'}}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItemsWrap: {
    display: 'flex',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
});
export default ThreeDotComponent;
