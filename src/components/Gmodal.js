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

export default class Gmodal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible} = this.state;
    return (
      <>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              this.setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredViewInner}>
              <View style={styles.modalView}>
              <TouchableOpacity  style={styles.modalClose} onPress={() => this.setModalVisible(!modalVisible)}>
              <IonIcon name="md-close" size={23} color="#fff" />

              </TouchableOpacity>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#0684E4', '#22BFDA', '#22BFDA']}
                  style={styles.linearGradient}>
                  <Text style={styles.modalText}>
                    Sorry, this number is not registered with us.
                  </Text>

                 

                  <Text style={styles.modalText}>Try login with another number.</Text>
                  <Text style={styles.modalOrText}>OR</Text>
                  <TouchableOpacity 
                  style={styles.mSignupBt} >
                    <Text style={styles.mSignupBttext}>Sign Up</Text>
                  </TouchableOpacity>
                  {/* <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>Sign Up</Text>
                  </Pressable> */}
                </LinearGradient>
              </View>
            </View>
          </Modal>
          {/* <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => this.setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable> */}
        </View>
      </>
    );
  }
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
  },
  modalView: {
    width:285,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 32,
   overflow: 'hidden',
   alignSelf:'center',
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
  linearGradient:{
    padding: 35,
    width:'100%'
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
    marginBottom: 15,
    textAlign: 'center',
  },
  mSignupBt:{
    backgroundColor:'#fff',
    borderRadius:100,
    height:31,
    width:114,
    alignSelf:'center',
    justifyContent:'center'
  },
  mSignupBttext:{
    fontFamily: 'SFpro-Regular',
    textAlign:'center',
    fontSize:14,

  },
  modalText:{
    fontFamily: 'SFpro-Regular',
    textAlign:'center',
    fontSize:14,
    color:'#fff',
    marginBottom:15
  },
  modalOrText:{
    fontFamily: 'SFpro-Regular',
    textAlign:'center',
    textTransform:'uppercase',
    fontSize:12,
    color:'#fff',
    marginBottom:15
  },
  modalClose:{
    position: 'absolute',
    right:15,
    top:7,
    zIndex: 999,
  }
});
