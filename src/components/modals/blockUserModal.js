/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import BlackBorderButton from '../buttons/blackBorderButton';
import PopUpModalWrap from '../popUpModalWrap';
import FaIcon from 'react-native-vector-icons/Feather';
import HarassmentModal from './harassmentModal';
import {useEffect} from 'react';
import {useContext} from 'react';
import {HomeContext} from '../../shared/homeFeedCotext';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../../shared/encryption';
import {blockUser} from '../../services/homeFeed.service';
import NudityModal from './nudityModal';
import ViolentThreatsModal from './violentThreats';

const BLOCK_USER_SHORT = 'boksrysr';

const BlockUSerModal = ({modalVisible, setModalVisible}) => {
  const [harassmentOpen, setHarassmentOpen] = useState(false);
  const [openNudity, setOpenNudity] = useState(false);
  const [violentOpen, setViolentOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const {postDetails} = useContext(HomeContext);

  const onPressHarassment = () => {
    setModalVisible(false);
    setHarassmentOpen(true);
  };
  const onPressNudity = () => {
    setModalVisible(false);
    setOpenNudity(true);
  };
  const onPressViolent = () => {
    setModalVisible(false);
    setViolentOpen(true);
  };
  useEffect(() => {
    const handleSubmit = async () => {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      let token =
        (await AsyncStorage.getItem('token')) +
        '-' +
        BLOCK_USER_SHORT +
        '-' +
        getEncTokenAnyUserId(userDetails.userId);
      blockUser(
        {
          userId: getEncUserId(userDetails.userId),
          blockUserId: getEncUserId(postDetails.createdBy.userId),
          reason: selectedValue,
          myName: postDetails.createdBy.firstName,
          block: true,
          reportUserId: postDetails.createdBy.userId,
        },
        token,
      )
        .then(res => {
          console.log(res, '========>');
          // setModalVisible(false);
          setViolentOpen(false);
          setHarassmentOpen(false);
          setOpenNudity(false);
        })
        .catch(error => {
          console.log(error, '=======>');
        });
    };
    handleSubmit();
  }, [selectedValue.length]);
  return (
    <>
      <HarassmentModal
        modalVisible={harassmentOpen}
        setSelectedValue={setSelectedValue}
        setModalVisible={() => setHarassmentOpen(false)}
      />
      <NudityModal
        modalVisible={openNudity}
        setSelectedValue={setSelectedValue}
        setModalVisible={() => setOpenNudity(false)}
      />
      <ViolentThreatsModal
        modalVisible={violentOpen}
        setSelectedValue={setSelectedValue}
        setModalVisible={() => setViolentOpen(false)}
      />
      <PopUpModalWrap
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        hasBackDropColor={true}>
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalText}>Block & Report User</Text>
            <Pressable onPress={() => setModalVisible(false)}>
              <FaIcon
                style={styles.closeIcon}
                name="x"
                size={24}
                color="#000"
              />
            </Pressable>
          </View>
          <Text style={styles.modalInfo}>Why are you reporting this user</Text>
          <View style={styles.formBtn}>
            <BlackBorderButton
              textColor={'#000'}
              borderColor="#a8a49c"
              width={300}
              btnText="Harassment"
              handleSubmit={onPressHarassment}
            />
            <BlackBorderButton
              textColor={'#000'}
              borderColor="#a8a49c"
              width={300}
              btnText="Nudity"
              handleSubmit={onPressNudity}
            />
            <BlackBorderButton
              textColor={'#000'}
              borderColor="#a8a49c"
              width={300}
              btnText="Violent Threat"
              handleSubmit={onPressViolent}
            />
          </View>
        </View>
      </PopUpModalWrap>
    </>
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
    marginLeft: 50,
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
  closeIcon: {},
  modalInfo: {
    fontSize: 15,
    marginBottom: 10,
    marginVertical: 5,
  },
});
export default BlockUSerModal;
