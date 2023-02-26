import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {globalStyles} from '../global/globalStyle';
import Header from '../components/Header';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../global/globalColors';

export default function BlockedUser() {
  return (
    <>
      <Header />

      <View style={globalStyles.innerPagesContainerWhite}>
        <View style={styles.blockList}>
          <View style={styles.blockListImg}>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/avatar.jpg')}
              style={[styles.blockedImg]}
            />
          </View>
          <View style={styles.blockListInfo}>
            <Text style={styles.blockedName}>Seth Norman</Text>
            <TouchableOpacity style={styles.unblockBt}>
              <Text style={styles.unblockText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.blockList}>
          <View style={styles.blockListImg}>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/avatar.jpg')}
              style={[styles.blockedImg]}
            />
          </View>
          <View style={styles.blockListInfo}>
            <Text style={styles.blockedName}>Seth Norman</Text>
            <TouchableOpacity style={styles.unblockBt}>
              <Text style={styles.unblockText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.blockList}>
          <View style={styles.blockListImg}>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/avatar.jpg')}
              style={[styles.blockedImg]}
            />
          </View>
          <View style={styles.blockListInfo}>
            <Text style={styles.blockedName}>Seth Norman</Text>
            <TouchableOpacity style={styles.unblockBt}>
              <Text style={styles.unblockText}>Unblock</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  blockedImg: {
    width: 44,
    height: 44,
    borderRadius: 100,
  },
  blockList: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
  unblockBt: {
    backgroundColor: '#f5f7fa',
    width: 72,
    height: 34,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockListInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '85%',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dae0e6',
    paddingBottom:12
  },
  blockedName: {
    color: '#323a42',
    fontFamily: 'SFpro-Regular',
    fontSize: 14,
  
  },
  unblockText: {
    color: '#1d80e2',
    fontSize: 12,
  },
});
