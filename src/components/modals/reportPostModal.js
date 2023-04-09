import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import BlackBorderButton from '../buttons/blackBorderButton';
import PopUpModalWrap from '../popUpModalWrap';
import FaIcon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../../shared/encryption';
import {reportPost} from '../../services/homeFeed.service';
import {useContext} from 'react';
import {HomeContext} from '../../shared/homeFeedCotext';
import DeviceInfo from 'react-native-device-info';

const REPORT_POST_SHORT = 'bokotrao';

const ReportPostModal = ({modalVisible, setModalVisible}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const {postDetails} = useContext(HomeContext);
  console.log(postDetails.deviceType, '===========>');
  const handleSubmitingPost = async () => {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      REPORT_POST_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    reportPost(
      {
        userId: getEncUserId(userDetails.userId),
        feedId: postDetails.postId,
        feedType: 'post',
        reason: selectedValue,
        block: false,
        deviceId: DeviceInfo.getDeviceId(),
        deviceType: postDetails.deviceId,
        title: postDetails.title,
      },
      token,
    )
      .then(res => {
        console.log(res, '========>');
        setModalVisible(false);
      })
      .catch(error => {
        console.log(error, '=======>');
      });
  };
  return (
    <PopUpModalWrap
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      hasBackDropColor={true}>
      <View style={styles.modalView}>
        <View style={styles.modalTitle}>
          <Text style={styles.modalText}>Report Post</Text>
          <Pressable onPress={() => setModalVisible(false)}>
            <FaIcon style={styles.closeIcon} name="x" size={24} color="#000" />
          </Pressable>
        </View>
        <Text style={styles.modalInfo}>Help us understand the problem</Text>
        <View style={styles.formBtn}>
          <BlackBorderButton
            textColor={'#000'}
            selectedValue={selectedValue}
            isSelection={true}
            borderColor="#a8a49c"
            width={300}
            btnText="Adult Sexual Content"
            handleSubmit={() => setSelectedValue('Adult Sexual Content')}
          />
          <BlackBorderButton
            textColor={'#000'}
            selectedValue={selectedValue}
            borderColor="#a8a49c"
            width={300}
            btnText="Violence"
            isSelection={true}
            handleSubmit={() => setSelectedValue('Violence')}
          />
          <BlackBorderButton
            textColor={'#000'}
            borderColor="#a8a49c"
            selectedValue={selectedValue}
            width={300}
            btnText="Hate Speech"
            isSelection={true}
            handleSubmit={() => setSelectedValue('Hate Speech')}
          />
          <BlackBorderButton
            textColor={'#000'}
            selectedValue={selectedValue}
            borderColor="#a8a49c"
            width={300}
            btnText="Terrorism"
            isSelection={true}
            handleSubmit={() => setSelectedValue('Terrorism')}
          />
          <BlackBorderButton
            textColor={'#000'}
            borderColor="#a8a49c"
            selectedValue={selectedValue}
            width={300}
            btnText="Child Abuse"
            isSelection={true}
            handleSubmit={() => setSelectedValue('Child Abuse')}
          />
        </View>
        <TouchableOpacity
          style={[
            globalStyles.gradBt,
            {alignItems: 'center', marginBottom: 10},
          ]}
          onPress={handleSubmitingPost}
          //   disabled={isSubmitting}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={[globalStyles.linearGradient, {width: 300, height: 40}]}>
            <Text style={globalStyles.buttonText}>Submit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <BlackBorderButton
          textColor={'#000'}
          borderColor="#000"
          width={300}
          handleSubmit={() => setModalVisible(false)}
        />
      </View>
    </PopUpModalWrap>
  );
};

const styles = StyleSheet.create({
  modalView: {
    paddingTop: 20,
    width: '92%',
    // height: 200,
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
    textAlign: 'center',
    fontSize: 20,
    marginLeft: 80,
    paddingHorizontal: 30,
    lineHeight: 35,
    color: '#000',
    fontWeight: '600',
  },
  textSpan: {
    color: '#000',
  },
  modalTitle: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeIcon: {
    paddingLeft: 60,
  },
  modalInfo: {
    fontSize: 15,
    marginBottom: 10,
    marginVertical: 5,
  },
});
export default ReportPostModal;
