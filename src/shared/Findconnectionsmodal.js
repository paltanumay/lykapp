import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import React, {Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

import OctIcon from 'react-native-vector-icons/Octicons';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useState} from 'react';

export default function Findconnectionsmodal() {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredViewInner}>
          <View style={styles.modalView}>
          <TouchableOpacity  style={styles.modalClose} onPress={() => setModalVisible(!modalVisible)}>
              <IonIcon name="md-close" size={23} color="#333" />

              </TouchableOpacity>
            <Text style={styles.modalText}>Find LYKMinded Connections</Text>
            <Text style={styles.modalBodyText}>
              LYK uploads your address book on LYK server securely to match
              those contacts who are using LYK and suggest meaningful
              connections on LYK Network. Your uploaded data is only used for
              matching contacts and won't be saved for other purposes.
            </Text>

            <View style={styles.learnmoreBtWrapmain}>
                <TouchableOpacity style={[styles.learnmoreBtWrap,{borderRightColor:'#ccc', borderRightWidth:1}]}>
                    <Text style={styles.learnmoreBtText}>Learn more</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.learnmoreBtWrap} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.learnmoreBtText}>Ok</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    margin: 20,
   paddingTop:25,
    backgroundColor: 'white',
    borderRadius: 15,
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
  modalBodyText:{
    fontFamily: 'SFpro-Regular',
    fontSize:14,
    paddingHorizontal:25,
    textAlign:'center',
    paddingVertical:15,
    paddingTop:0,
    color:'#333'

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
  modalText: {
    fontFamily: 'SFpro-Bold',
    color:'#000',
    fontSize:19,
    marginBottom: 15,
    textAlign: 'center',
   // paddingVertical:15
   paddingTop:15
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
    right: 15,
    top: 7,
    zIndex: 999,
  },
  learnmoreBtWrapmain:{
    alignItems:'center',
    flexDirection:'row',
  },
  learnmoreBtWrap:{
    width:'50%',
    alignItems:'center',
    borderTopWidth:1,
    borderTopColor:'#ccc',
    paddingVertical:10
  },
  learnmoreBtText:{
    color:COLORS.blue,
    fontFamily: 'SFpro-Medium',

  },
  modalClose: {
    position: 'absolute',
    right: 8,
    top: 10,
    zIndex: 999,
  }
});
