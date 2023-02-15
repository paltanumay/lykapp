/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import COLORS from '../global/globalColors';
import {Text} from 'react-native';

const CommentHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.backIconWrap]}
        onPress={() => navigation.goBack()}>
        <Image
          resizeMode="stretch"
          source={require('../assets/images/back.png')}
          style={[styles.backIcon]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>{'comments'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: COLORS.blue,
  },
  backIconWrap: {
    position: 'absolute',
    left: 15,
    // top: 10,
    // backgroundColor: 'red',
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
});

export default CommentHeader;
