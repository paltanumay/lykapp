import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';

import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Animated from 'react-native-reanimated';

export default function Footer({style}) {
  const [display, setDisplay] = useState(false);
  const navigation = useNavigation();
  return (
    <>
      <View
        style={[styles.menuItemsWrap, {display: display ? 'flex' : 'none'}]}>
        <View style={styles.menuItemsInnerWrap}>
          <TouchableOpacity style={styles.menuItems}>
            {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
            <View style={styles.iconCont}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/chat-n.png')}
                style={[styles.createIcon]}
              />
              {/* <IonIcon
                name="chatbubble-outline"
                size={25}
                color={COLORS.blue}
              /> */}
            </View>

            <Text style={[styles.createInnerText]}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItems2}
            onPress={() => navigation.push('Creategroup')}>
            <View style={styles.iconCont}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/group.png')}
                style={[styles.createIcon]}
              />
              {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
              {/* <IonIcon name="people-outline" size={25} color={COLORS.blue} /> */}
            </View>
            <Text style={[styles.createInnerText]}>Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItems3}
            onPress={() => navigation.push('Createpost')}>
            {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
            <View style={styles.iconCont}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/post.png')}
                style={[styles.createIcon]}
              />
              {/* <IonIcon name="md-card-outline" size={25} color={COLORS.blue} /> */}
            </View>
            <Text style={[styles.createInnerText]}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View style={[styles.footer, style]}>
        <TouchableOpacity
          style={[styles.footIconBox, {marginRight: 15}]}
          onPress={() => navigation.push('Sidenav')}>
          {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
          {/* <IonIcon name="ios-home" size={25} color={COLORS.blue} /> */}
          {/* <Image
            resizeMode="stretch"
            source={require('../assets/images/home.png')}
            style={[styles.homeIcon]}/> */}

          <Image
            resizeMode="stretch"
            source={require('../assets/images/home-active.png')}
            style={[styles.homeIcon]}
          />

          <Text style={[styles.footIconText, styles.active]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footIconBox, {marginRight: 15}]}>
          {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}
          {/* <IonIcon name="ios-people-outline" size={30} color={COLORS.blue} /> */}
          <Image
            resizeMode="stretch"
            source={require('../assets/images/network.png')}
            style={[styles.networkIcon]}
          />
          <Text style={styles.footIconText}>Network</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footIconBoxCreate}
          onPress={() => setDisplay(!display)}>
          {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#037ee5', '#15a2e0', '#28cad9']}
            style={styles.createBt}>
            {!display ? (
              <FIcon name="plus" size={35} color="#fff" />
            ) : (
              <FIcon name="x" size={35} color="#fff" />
            )}
          </LinearGradient>

          <Text style={styles.footIconText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footIconBox}>
          {/* <IonIcon name="ios-notifications" size={20} color={COLORS.blue} /> */}
          {/* <IonIcon
              name="ios-notifications-outline"
              size={26}
              color={COLORS.blue}
            /> */}

          <Image
            resizeMode="stretch"
            source={require('../assets/images/notification.png')}
            style={[styles.notIcon]}
          />

          <Text style={styles.footIconText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footIconBox}
          onPress={() => navigation.push('Chatnpost')}>
          {/* <IonIcon name="chatbubbles-sharp" size={20} color={COLORS.blue} /> */}
          {/* <IonIcon name="chatbubbles-outline" size={26} color={COLORS.blue} /> */}
          <Image
            resizeMode="stretch"
            source={require('../assets/images/chat.png')}
            style={[styles.chatIcon]}
          />

          <Text style={styles.footIconText}>Chat & Post</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 999,
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  footIconBox: {
    alignItems: 'center',
    // backgroundColor:'red',
    height: 45,
    justifyContent: 'space-between',
  },
  footIconText: {
    fontFamily: 'Lato-Regular',
    fontSize: 13,
    color: '#adadad',
  },
  footIconBoxCreate: {
    alignItems: 'center',
  },
  createBt: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
  },
  active: {
    color: COLORS.blue,
  },

  menuItemsWrap: {
    position: 'absolute',
    marginBottom: 50,
    left: 0,
    top: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
  menuItemsInnerWrap: {
    position: 'absolute',
    bottom: 170,
    left: '50%',
    marginLeft: -10,
  },
  menuItems: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: -100,
    top: 28,
  },
  menuItems2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: -30,
    top: -15,
  },
  menuItems3: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -100,
    top: 28,
  },
  iconCont: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  createInnerText: {
    color: '#fff',
    fontFamily: 'SFpro-Regular',
    fontSize: 13,
    position: 'relative',
    top: -8,
  },

  // iconCont: {
  //   backgroundColor: '#fff',
  //   width: 40,
  //   height: 40,
  //   borderRadius: 100,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // createInnerText: {
  //   color: '#fff',
  //   fontFamily: 'SFpro-Regular',
  //   fontSize: 13,
  // },
  homeIcon: {
    width: 26,
    height: 24,
  },
  chatIcon: {
    width: 32,
    height: 20,
  },
  notIcon: {
    width: 23,
    height: 25,
  },
  networkIcon: {
    width: 26,
    height: 24,
  },
  createIcon: {
    width: 59,
    height: 59,
  },
});
