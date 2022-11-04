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
import { useNavigation } from '@react-navigation/native';

export default function Footer() {
  const [display, setDisplay] = useState(false);
  const navigation = useNavigation();
    return (
      <>
        <View style={[styles.menuItemsWrap,{display:display?'flex':'none'}]}>
          <View style={styles.menuItemsInnerWrap}>
            <TouchableOpacity style={styles.menuItems}>
              {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
              <View style={styles.iconCont}>
                <IonIcon
                  name="chatbubble-outline"
                  size={25}
                  color={COLORS.blue}
                />
              </View>

              <Text style={[styles.createInnerText]}>Chat</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItems2}>
              <View style={styles.iconCont}>
                {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                <IonIcon name="people-outline" size={25} color={COLORS.blue} />
              </View>
              <Text style={[styles.createInnerText]}>Group</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItems3} onPress={()=>navigation.push('Createpost')}>
              {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
              <View style={styles.iconCont}>
                <IonIcon name="md-card-outline" size={25} color={COLORS.blue} />
              </View>
              <Text style={[styles.createInnerText]}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.footIconBox, {marginRight: 15}]} onPress={()=>navigation.push('Sidenav')} >
            {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
            <IonIcon name="ios-home" size={25} color={COLORS.blue} />

            <Text style={[styles.footIconText, styles.active]}>Footer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.footIconBox, {marginRight: 15}]}>
            {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}
            <IonIcon name="ios-people-outline" size={30} color={COLORS.blue} />

            <Text style={styles.footIconText}>Network</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footIconBoxCreate} onPress={()=>setDisplay(!display)} >
            {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}

            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={styles.createBt}>
              <FIcon name="plus" size={40} color="#fff" />
            </LinearGradient>

            <Text style={styles.footIconText}>Create</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footIconBox}>
            {/* <IonIcon name="ios-notifications" size={20} color={COLORS.blue} /> */}
            <IonIcon
              name="ios-notifications-outline"
              size={26}
              color={COLORS.blue}
            />

            <Text style={styles.footIconText}>Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.footIconBox}
            onPress={() => navigation.push('Chatnpost')}>
            {/* <IonIcon name="chatbubbles-sharp" size={20} color={COLORS.blue} /> */}
            <IonIcon name="chatbubbles-outline" size={26} color={COLORS.blue} />

            <Text style={styles.footIconText}>Chat & Post</Text>
          </TouchableOpacity>
        </View>
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
    position: 'relative',
    zIndex: 999,
  },
  footIconBox: {
    alignItems: 'center',
    // backgroundColor:'red',
    height: 50,
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
    width: 70,
    height: 70,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },
  active: {
    color: COLORS.blue,
  },

  menuItemsWrap: {
    position: 'absolute',
    marginBottom: 50,
    left: 0,
    top: 0,
    zIndex: 9,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    width: '100%',
    height: '100%',
    alignItems:'flex-end'
  },
  menuItemsInnerWrap: {
    position: 'absolute',
    bottom:170,
    left:'50%',
    marginLeft:-10
  },
  menuItems: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: -80,
    top: 28,
  },
  menuItems2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: -15,
    top: 0,
  },
  menuItems3: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -90,
    top: 28,
  },
  iconCont: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createInnerText: {
    color: '#fff',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
  },

  iconCont: {
    backgroundColor: '#fff',
    width: 40,
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createInnerText: {
    color: '#fff',
    fontFamily: 'SFpro-Regular',
    fontSize: 13,
  },
});
