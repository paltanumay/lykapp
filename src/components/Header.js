/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {useState} from 'react';
import AuthButtons from './buttons/AuthButtons';

export default function Header(props) {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState('');
  console.log(userInfo);
  useEffect(() => {
    (async () => {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      setUserInfo(userDetails);
    })();
  }, []);
  return (
    <>
      {props.isBack ? (
        <View
          style={[
            styles.headerBack,
            {
              backgroundColor: props.isTransparent ? '#fff' : '#2A90CB',
              height: 60,
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
          {props.type === 'comment' ? (
            <View>
              <Text style={styles.headerTitle}>{'comments'}</Text>
            </View>
          ) : (
            <Pressable onPress={() => props.onSetRefresh(prev => !prev)}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/logo.png')}
                style={[styles.logoSmall]}
              />
            </Pressable>
          )}
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
          <TouchableOpacity onPress={() => props.onSetRefresh(true)}>
            <Image
              resizeMode="contain"
              source={require('../assets/images/logo.png')}
              style={[styles.logoSmall]}
            />
          </TouchableOpacity>
          {/* <Text style={styles.headerTitle}>Baby Care</Text> */}
          {/* <TouchableOpacity style={styles.cart}>
        <FIcon name="shopping-cart" size={25} color={COLORS.green} />
        
        </TouchableOpacity> */}

          {userInfo === null ? (
            <TouchableOpacity style={styles.user}>
              <AuthButtons />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.user}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/search.png')}
                style={[styles.searchIcon]}
              />
              {/* <FIcon name="heart" size={25} color={COLORS.green} /> */}
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  backIconWrap: {
    position: 'absolute',
    left: 15,
    // top: 10,
    // backgroundColor: 'red',
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
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'Montserrat-SemiBold',
  },
  header: {
    backgroundColor: COLORS.blue,
    flex: 0.7,
    height: 50,
    alignItems: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
  headerBack: {
    backgroundColor: COLORS.blue,
    flex: 0.078,
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
  searchIcon: {
    width: 19,
    height: 20,
  },
});
