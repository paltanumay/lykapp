import React from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function HeaderChat(props) {
  const navigation = useNavigation();
  return (
    <>
      {props.isBack ? (
        <View
          style={[
            styles.headerBack,
            {
              backgroundColor: props.isTransparent ? '#fff' : '#2A90CB',
              height: 40,
            },
          ]}>
          <TouchableOpacity
            style={[styles.backIconWrap]}
            onPress={() => navigation.goBack()}>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/back.png')}
              style={[styles.backIcon]}
            />
          </TouchableOpacity>
          <View style={styles.name}>
            <View style={styles.proImg}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/avatar.jpg')}
                style={[styles.proImgIcon]}
              />
            </View>
            <Text style={styles.nameText}>Srijan roy</Text>
          </View>

          <View style={styles.video}>
            <TouchableOpacity style={styles.vcd}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/call-new.png')}
                style={[styles.callIcon]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.vcd}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/video-new.png')}
                style={[styles.videoIcon]}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.vcd}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/dots.png')}
                style={[styles.dotsIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.hamIconWrap]}
            onPress={() => navigation.toggleDrawer()}>
            {/* <FIcon name="arrow-left" size={25} color="#333" /> */}
            {/* <FIcon name="menu" size={25} color="#fff" /> */}
            {/* <Image
            resizeMode="stretch"
            source={require('../assets/images/back.png')}
            style={[styles.backIcon]}
          /> */}

            <Image
              resizeMode="stretch"
              source={require('../assets/images/ham.png')}
              style={[styles.hamIcon]}
            />
          </TouchableOpacity>
          <View>
            <Image
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
              style={[styles.logoSmall]}
            />
          </View>
          {/* <Text style={styles.headerTitle}>Baby Care</Text> */}
          {/* <TouchableOpacity style={styles.cart}>
        <FIcon name="shopping-cart" size={25} color={COLORS.green} />
        
        </TouchableOpacity> */}

          <TouchableOpacity style={styles.user}>
            <FIcon name="search" size={25} color="#fff" />
            {/* <FIcon name="heart" size={25} color={COLORS.green} /> */}
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  backIconWrap: {
    position: 'absolute',
    left: 15,
    top: 17,
    zIndex:999
    //  backgroundColor:'red'
  },
  hamIconWrap: {
    position: 'absolute',
    left: 15,
    top: 15,
    //  backgroundColor:'red'
  },
  hamIcon: {
    width: 22,
    height: 18,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    color: '#333',
    fontSize: 20,
    fontFamily: 'Montserrat-SemiBold',
  },
  header: {
    backgroundColor: COLORS.blue,
    flex: 0.7,
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
  headerBack: {
    backgroundColor: COLORS.blue,
    flex: 0.7,
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logoSmall: {
    width: 40,
    height: 36,
  },
  userIcon: {
    width: 22,
    height: 22,
  },
  user: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  cart: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  pageTitle: {
    fontSize: 17,
    fontFamily: 'SFpro-Bold',
    color: '#fff',
  },
  proImg: {
    width: 32,
    height: 32,
    borderRadius: 80,
    overflow: 'hidden',
  },
  proImgIcon: {
    width: 32,
    height: 32,
    borderRadius: 80,
  },
  name: {
    flexDirection: 'row',
    paddingLeft: 50,
    alignItems: 'center',
  },
  nameText: {
    marginLeft: 12,
    fontFamily: 'SFpro-Medium',
    fontSize: 17,
  },
  video:{
    flexDirection: 'row',
    alignItems: 'center',

  },
  callIcon:{
    width: 18,
    height: 18,
  },
  videoIcon:{
    width: 18,
    height: 18,
  },
  dotsIcon:{
    width: 18,
    height: 4,
  },
  vcd:{
    marginHorizontal:8
  }
});
