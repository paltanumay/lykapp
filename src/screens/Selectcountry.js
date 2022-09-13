import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import { globalStyles } from '../global/globalStyle';
import LinearGradient from 'react-native-linear-gradient';

export default class Selectcountry extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#037ee5', '#15a2e0', '#28cad9']}
          style={styles.linearGradient}>
          <Text style={globalStyles.buttonText}>Log In</Text>
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
    flex: 1
  },
  linearGradient: {
    height: '100%'
  }
})