import React from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function HeaderWithTitle(props) {
  const navigation = useNavigation();
  return (
    <>
      {props.isBack ? (
        <View
          style={[
            styles.headerBack,
            {backgroundColor: props.isTransparent ? '#fff' : '#2A90CB', height:40},
          ]}>
          <TouchableOpacity style={[styles.backIconWrap]} onPress={() => navigation.goBack()}>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/back.png')}
              style={[styles.backIcon]}
            />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Create Post</Text>

       
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
  headerBack:{
    backgroundColor: COLORS.blue,
    flex:0.7,
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
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
  pageTitle:{
    fontSize:17,
    fontFamily: 'Montserrat-Bold',
    color:'#fff'
    
  }
});
