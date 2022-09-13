import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';

export default class Header extends Component {
  render() {
    return (
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backIconWrap]}>
        {/* <FIcon name="arrow-left" size={25} color="#333" /> */}
        <FIcon name="menu" size={25} color="#fff" />
          {/* <Image
            resizeMode="stretch"
            source={require('../assets/images/back.png')}
            style={[styles.backIcon]}
          /> */}

          {/* <Image
            resizeMode="stretch"
            source={require('../assets/images/hamburger-menu.png')}
            style={[styles.backIcon]}
          /> */}



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
    );
  }
}
const styles = StyleSheet.create({
  backIconWrap: {
    position: 'absolute',
    left: 15,
    top: 25,
    //  backgroundColor:'red'
  },
  backIcon: {
    width: 17,
    height: 16,
  },
  headerTitle: {
    color:'#333',
    fontSize: 20,
    fontFamily:'Montserrat-SemiBold'
  },
  header: {
   
    backgroundColor:COLORS.blue,
    flex:1,
    alignItems:'center',
    color:'#fff',
    justifyContent:'center'
  },
  logoSmall:{
    width:40,
    height:36,
 
  },
  userIcon:{
    width:22,
    height:22
  },
  user:{
    position: 'absolute',
    right:15,
    top: 20,
  },
  cart:{
    position: 'absolute',
    right: 15,
    top: 20,
  }
});
