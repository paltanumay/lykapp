import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
export default function ChangePassword() {
  return (
    <>
       <Header isBack={true} />
  <View style={globalStyles.innerPagesContainerWhite}>
    <View style={styles.changePassWrap}>
      <View style={styles.formBox}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.input}
          placeholder="Current password"
          textContentType="username"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={20}
        />
      </View>

      <View style={styles.formBox}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.input}
          placeholder="New password"
          textContentType="username"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={20}
        />
      </View>
      <View style={styles.formBox}>
        <TextInput
          placeholderTextColor="#000"
          style={styles.input}

          placeholder="Retype New Password"
          textContentType="username"
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          maxLength={20}
        />
      </View>

      <TouchableOpacity style={[globalStyles.gradBt, {width:'100%'}]} onPress={() => navigation.push('SignUp')}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={[globalStyles.linearGradient, {height:42}]}>
                <Text style={globalStyles.buttonText}>Save CHanges</Text>
              </LinearGradient>
            </TouchableOpacity>
    </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  changePassWrap:{
    padding:50
  },
  formBox:{
   borderWidth:1,
   borderColor:'#ccc',
   marginBottom:15
  },
  input:{
    color:'#ccc',
    paddingHorizontal:15,
  
  }
});
