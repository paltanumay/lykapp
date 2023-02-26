import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native';
import {View} from 'react-native';
import FIIcon from 'react-native-vector-icons/Feather';

import COLORS from '../../global/globalColors';

const CreateBusinessButton = ({onRedirect}) => {
  return (
    <View style={styles.body}>
      <Pressable style={styles.createCardWrap} onPress={onRedirect}>
        <View>
          <FIIcon name="plus-square" size={50} color={COLORS.blue} />
        </View>
        <Text style={styles.cardName}>Create Business Page</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
  },
  createCardWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
    marginTop: 22,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#FFFF',
  },
  cardName: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'SFpro-Regular',
    color: COLORS.blue,
  },
});
export default CreateBusinessButton;
