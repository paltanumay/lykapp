import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableOpacity} from "react-native";
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function Logoutmodal() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(true);
    const [user, setUser] = useState();
    useEffect(()=>{
      async function getUser(){
        let userDetails = await AsyncStorage.getItem('userId');
        userDetails = JSON.parse(userDetails);
        setUser(userDetails);
      }
      getUser()
    });
  return (
    <View>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredViewInner}>
          <View style={styles.modalView}>
            <View style={styles.logoutProPic}>
            <Image
                  style={styles.avatar}
                  source={require('../assets/images/avatar.jpg')}
                />
            </View>
            <Text style={styles.name}>{user && user.firstName}</Text>
            <Text style={styles.msg}>Are you sure you want to sign out?</Text>

            <TouchableOpacity 
              style={globalStyles.gradBt}  
              onPress={() =>{ 
                setModalVisible(!modalVisible);
                AsyncStorage.clear();
                navigation.push('Intro');
              }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Yes, I am sure</Text>
              </LinearGradient>
            </TouchableOpacity>


           
          </View>
        </View>
      </Modal>
    </View>
    </View>
  )
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
        justifyContent: 'flex-end',
      },
      modalView: {
        paddingTop: 30,
        width: '100%',
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
      resetPassTitle: {
        fontFamily: 'SFpro-Bold',
        color: COLORS.blue,
        fontSize: 29,
      },
      phoneInputWrap: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 20,
        width: '60%',
        alignItems: 'flex-start',
        marginTop: 15,
      },
      resendCode: {
        marginTop: 0,
      },
      resendCodetext: {
        color: COLORS.blue,
        fontFamily: 'SFpro-Bold',
      },
      notYouText: {
        color: COLORS.blue,
        fontFamily: 'SFpro-Bold',
        marginTop: 15,
      },
      reset1: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
      },
      reset2: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
      },
      reset3: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 25,
      },
      input: {
        textAlign: 'left',
        fontFamily: 'SFpro-Regular',
        width: '100%',
      },
      resetPassSuccessTitle: {
        fontFamily: 'SFpro-Bold',
        color: COLORS.blue,
        fontSize: 18,
        textAlign: 'center',
      },
      scText: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'SFpro-Regular',
        marginTop: 5,
      },
      checkboxWrap: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginVertical: 20,
      },
      ageConfirmTitle: {
        fontSize: 15,
        color: '#000',
        fontFamily: 'SFpro-Regular',
        textAlign: 'center'
      },
      privacyLinkText: {
        fontFamily: 'SFpro-Medium',
        color: COLORS.blue,
        fontSize: 15,
      },
      avatar:{
        width:80,
        height:80,
        overflow:'hidden',
        borderRadius:100
      },
      name:{
        fontSize: 18,
        color: '#000',
        fontFamily: 'SFpro-Bold',
        textAlign: 'center',
        marginVertical:13
      },
      msg:{
        fontSize: 15,
        fontFamily: 'SFpro-Regular',
        textAlign: 'center',
        marginBottom:25,
        color:'#333'
      }
})