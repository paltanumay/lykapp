/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import {StyleSheet, View} from 'react-native';
import COLORS from '../global/globalColors';
import {Text} from 'react-native';

const CommentHeader = ({name, isCreateBusiness, setCreateBusiness}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={[styles.backIconWrap]}
        onPress={() =>
          isCreateBusiness ? setCreateBusiness(false) : navigation.goBack()
        }>
        <Image
          resizeMode="stretch"
          source={require('../assets/images/back.png')}
          style={[styles.backIcon]}
        />
      </TouchableOpacity>
      <View>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.user}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/search.png')}
                style={[styles.searchIcon]}
              />
              {/* <FIcon name="heart" size={25} color={COLORS.green} /> */}
            </TouchableOpacity>
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
    fontSize: 17,
    fontFamily: 'SFpro-Regular',
  },
  user: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  searchIcon: {
    width: 19,
    height: 20,
  }
});

export default CommentHeader;
