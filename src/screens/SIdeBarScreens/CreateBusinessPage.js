import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Pressable, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadioButton from '../../components/buttons/RadioButton';
import BusinessDetailsForm from '../../components/sideBarComponents/BusinessDetailsForm';
import COLORS from '../../global/globalColors';
import {globalStyles} from '../../global/globalStyle';

const CreateBusinessPage = () => {
  const [checked, setChecked] = useState(false);
  const [ischecked, setIsChecked] = useState(false);
  return (
    <>
      <View style={styles.bodyWrap}>
        <View style={styles.headingWrap}>
          <Text style={styles.mainHeading}>
            Are you an authorized representative of this business ?
          </Text>
        </View>
        <View style={styles.container}>
          <View style={styles.radioButtonWrap}>
            <View style={styles.radioButtonView}>
              <RadioButton
                onRadioButtonPress={() => setIsChecked(prev => !prev)}
                checked={checked}
                size={25}
              />

              <View style={styles.textWrap}>
                <Text
                  style={
                    checked
                      ? [styles.buttonText, {color: COLORS.blue}]
                      : styles.buttonText
                  }>
                  Yes,I am an authorized representative of this business
                </Text>
              </View>
            </View>

            {ischecked && (
              <View style={styles.fromContainer}>
                <BusinessDetailsForm />
              </View>
            )}
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.radioButtonWrap}>
            <View style={styles.radioButtonView}>
              <RadioButton
                onRadioButtonPress={() => setChecked(prev => !prev)}
                checked={checked}
                size={25}
              />

              <View style={styles.textWrap}>
                <Text
                  style={
                    checked
                      ? [styles.buttonText, {color: COLORS.blue}]
                      : styles.buttonText
                  }>
                  No i am helping to create Business page
                </Text>
              </View>
            </View>

            {checked && (
              <View style={styles.fromContainer}>
                <BusinessDetailsForm extraFieldName={'Business Owner Name'} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[globalStyles.gradBt, {width: '47%'}]}
            // onPress={() => navigation.push('Country')}
          >
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={[globalStyles.linearGradient, {height: 42}]}>
              <Text style={globalStyles.buttonText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.gradBt, {width: '47%'}]}
            // onPress={() => navigation.push('Country')}
          >
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={[globalStyles.linearGradient, {height: 42}]}>
              <Text style={globalStyles.buttonText}>Cancel</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  bodyWrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    paddingHorizontal: 15,
  },
  buttons: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    width: '100%',
    paddingVertical: 10,
  },
  headingWrap: {
    width: '75%',
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  textWrap: {
    display: 'flex',
    width: '85%',
  },
  mainHeading: {
    paddingTop: 20,
    fontFamily: 'SFpro-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
  },
  radioButtonWrap: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.lightBlue,

    borderColor: COLORS.gray,
    borderRadius: 5,
    // justifyContent: 'space-between',
    borderWidth: 1,
    paddingVertical: 15,
    paddingLeft: 15,
    paddingHorizontal: 5,
  },
  radioButtonView: {
    display: 'flex',
    flexDirection: 'row',
  },
  fromContainer: {
    marginTop: 20,
    display: 'flex',
    width: '83%',
  },
  buttonText: {
    width: '100%',
    fontFamily: 'SFpro-Regular',
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.black,
    paddingLeft: 15,
  },
});
export default CreateBusinessPage;
