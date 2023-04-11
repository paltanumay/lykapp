import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import {hidePost} from '../../services/homeFeed.service';
import {getEncTokenAnyUserId, getEncUserId} from '../../shared/encryption';
import {HomeContext} from '../../shared/homeFeedCotext';
import PopUpModalWrap from '../popUpModalWrap';

const HIDE_POST_SHORT = 'rprIe';

const HideModal = ({modalVisible, setModalVisible}) => {
  const {postDetails} = useContext(HomeContext);
  const handleClose = async () => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      HIDE_POST_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    hidePost(
      {
        itemId: postDetails.postId,
        userId: getEncUserId(userDetails.userId),
        itemType: 'post',
        title: postDetails.title,
        reason: 'From Home Feed',
      },
      token,
    )
      .then(res => {
        console.log(res, '========>');
        setModalVisible(prev => !prev);
      })
      .catch(error => {
        console.log(error, '=======>');
      });
  };
  return (
    <PopUpModalWrap modalVisible={modalVisible} setModalVisible={handleClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          You won't see this post in your feed
        </Text>
        <TouchableOpacity
          style={[globalStyles.gradBt, {alignItems: 'center'}]}
          onPress={() => setModalVisible(prev => !prev)}
          //   disabled={isSubmitting}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={[globalStyles.linearGradient, {width: 180, height: 42}]}>
            <Text style={globalStyles.buttonText}>Undo</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </PopUpModalWrap>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    width: '92%',
    height: 200,
    paddingHorizontal: 25,
    paddingBottom: 20,
    backgroundColor: 'white',
    // justifyContent: 'center',
    borderRadius: 12,
    // borderBottomStartRadius: 0,
    // borderBottomEndRadius: 0,
    overflow: 'hidden',
    // alignSelf: 'center',
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
  modalText: {
    color: '#000',
    fontSize: 16,
    paddingVertical: 20,
    lineHeight: 35,
    fontWeight: '400',
  },
  textSpan: {
    color: '#000',
  },
});
export default HideModal;
