import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';

export default function Audiocall() {
  return (
    <View style={styles.audioMainCont}>
      <View style={styles.proImgwrap}>
        <Image
          style={styles.proimg}
          source={require('../assets/images/avatar.jpg')}
        />
        <Text  style={styles.callerName}>Srijan roy</Text>
      </View>

      <TouchableOpacity>
      <Image
          style={styles.rejectCall}
          source={require('../assets/images/reject-call.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    rejectCall:{
        width:70,
        height:70
    },
    audioMainCont:{
        flex:1,
        backgroundColor:'#000',
        justifyContent:'space-between',
        flexDirection:'column',
        alignItems:'center',
        paddingVertical:35
    },
    proImgwrap:{
        alignItems:'center',
        flexDirection:'column',
    },
    proimg:{
        width:120,
        height:120,
        borderRadius:80
    },
    callerName:{
        fontSize:16,
        marginTop:15,
        fontFamily: 'SFpro-Bold',
      
    }
});
