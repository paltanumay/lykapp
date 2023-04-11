import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles} from '../../global/globalStyle';
import {HomeContext} from '../../shared/homeFeedCotext';
import BlackBorderButton from '../buttons/blackBorderButton';
import PopUpModalWrap from '../popUpModalWrap';

const UnfriendModal = ({modalVisible, setModalVisible}) => {
  const {postDetails} = useContext(HomeContext);
  return (
    <PopUpModalWrap
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>
          Are you sure you want to unfriend
          <Text style={styles.textSpan}>
            {postDetails?.createdBy?.firstName}
          </Text>
          as your friend
        </Text>
        <TouchableOpacity
          style={[
            globalStyles.gradBt,
            {alignItems: 'center', marginBottom: 10},
          ]}
          //   onPress={handleSubmit}
          //   disabled={isSubmitting}
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={[globalStyles.linearGradient, {width: 250, height: 40}]}>
            <Text style={globalStyles.buttonText}>Confirm</Text>
          </LinearGradient>
        </TouchableOpacity>
        <BlackBorderButton borderColor="#a8a49c" />
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
    fontSize: 16,
    paddingHorizontal: 30,
    paddingVertical: 20,
    lineHeight: 35,
    fontWeight: '400',
  },
  textSpan: {
    color: '#000',
  },
});
export default UnfriendModal;
