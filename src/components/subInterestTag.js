import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import FIcon from 'react-native-vector-icons/Feather';
import COLORS from '../global/globalColors';

const SubInterestTag = ({
  text,
  id,
  onSelectSubInterest,
  setSelectedSubInterest,
  selectedSubInterest,
}) => {
  const [interest, setInterest] = useState(false);
  let subInterest = [];

  const onPressSubInterest = () => {
    onSelectSubInterest({id, text});
    setInterest(prev => !prev);
  };
  return (
    <TouchableOpacity
      style={
        !interest
          ? styles.suBInterestTag
          : [styles.suBInterestTag, styles.selectedSubInterestTag]
      }
      key={id}
      onPress={onPressSubInterest}>
      <FIcon
        style={styles.plusIcon}
        name={interest ? 'x' : 'plus'}
        size={15}
        color={interest ? '#000' : '#AFAFAF'}
      />
      <Text
        style={
          interest ? [styles.subInterest, styles.active] : styles.subInterest
        }>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  plusIcon: {
    paddingLeft: 5,
  },
  subInterestTags: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',

    // width: '100%',
  },
  suBInterestTag: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.blue,
    texAlign: 'center',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedSubInterestTag: {
    borderColor: '#e8f3fb',
    backgroundColor: '#e8f3fb',
  },
  subInterest: {
    color: '#AFAFAF',
    paddingLeft: 7,
    paddingRight: 7,
    fontSize: 13,
    fontFamily: 'SFpro-Regular',
    textTransform: 'capitalize',
  },
  active: {
    color: '#000',
  },
});
export default SubInterestTag;
