import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import COLORS from '../../../global/globalColors';

const {width, height} = Dimensions.get('window');

const PeopleCard = ({name = 'name', img = ''}) => {
  return (
    <View style={styles.PeopleCardWrapper}>
      <View style={styles.avtar}>
        <Image resizeMode="contain" source={{uri: img}} style={[styles.img]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.connect}>
        <Text style={styles.btnText}>Connect</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PeopleCardWrapper: {
    width: '100%',
    height: 80,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avtar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'red',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.black,
    margin: 0,
  },
  connect: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    borderRadius: 20,
  },
  btnText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.black,
    margin: 0,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default PeopleCard;
