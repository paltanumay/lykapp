import React from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {globalStyles} from '../../global/globalStyle';
const BlackBorderButton = ({handleSubmit, isSubmitting}) => {
  return (
    <TouchableOpacity
      style={[
        globalStyles.gradBt,
        {
          alignItems: 'center',
          borderWidth: 1,
          borderRadius: 100,
          borderColor: '#a8a49c',
          width: 250,
          height: 40,
          marginVertical: 10,
        },
      ]}
      onPress={handleSubmit}
      disabled={isSubmitting}>
      <Text style={styles.buttonText}>Cancel</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    padding: 10,
    fontSize: 15,
  },
});
export default BlackBorderButton;
