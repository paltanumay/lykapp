import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native';
import {globalStyles} from '../../global/globalStyle';
const BlackBorderButton = ({
  handleSubmit,
  isSubmitting = false,
  isSelection,
  borderColor,
  selectedValue,
  textColor,
  btnText = 'Cancel',
  width = 250,
}) => {
  const [selected, setSelected] = useState(false);
  const selectedBtn = () => {
    setSelected(prev => !prev);
    handleSubmit();
  };
  return (
    <TouchableOpacity
      style={[
        globalStyles.gradBt,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderRadius: 100,
          borderColor: borderColor,
          width: width,
          height: 45,
          marginVertical: 14,
        },
        selectedValue === btnText && selected && {backgroundColor: '#c9e5fe'},
      ]}
      onPress={isSelection ? selectedBtn : handleSubmit}
      disabled={isSubmitting}>
      <Text style={[styles.buttonText, {color: textColor}]}>{btnText}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    padding: 5,
    fontSize: 15,
  },
});
export default BlackBorderButton;
