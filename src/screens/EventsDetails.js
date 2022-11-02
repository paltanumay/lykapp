import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {Component, useState} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import Gmodal from '../shared/Gmodal';
import LinearGradient from 'react-native-linear-gradient';

import FIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

export default function EventsDetails() {
    const [checked, setChecked] = useState(0);
    var event = ['Public Event', 'Private Event'];
  return (
    <View style={globalStyles.innerPagesContainerWhite}>
      <View style={styles.addPhotoWrap}>
        <Image
          style={styles.eventImg}
          source={require('../assets/images/politics.png')}
        />
      </View>

      <View style={styles.eventWrap}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>Oct</Text>
          <Text style={styles.eventDateText}>16</Text>
        </View>
        <View style={styles.eventName}>
          <Text style={styles.eventNameText}>Curabitur aliquet quam</Text>
          <Text style={styles.eventDescription}>
            Vivamus magna justo, lacinia eget consectetur sed
          </Text>
        </View>
      </View>

      <View style={styles.eventTimingDetails}>
        <View style={styles.eventTimingL}>
          <IonIcon name="time-outline" size={22} color="#8e9397" />
        </View>
        <View style={styles.eventTimingR}>
          <Text style={styles.eventDateMain}>Oct 22 - Oct 27, 2022</Text>
          <Text style={styles.eventDateSub}>
            Oct 26 at 05:00 PM to Oct 27, 2022 at 06:00 PM
          </Text>
        </View>
      </View>

      <View style={styles.eventTimingDetails}>
        <View style={styles.eventTimingL}>
          <IonIcon name="location-outline" size={22} color="#8e9397" />
        </View>
        <View style={styles.eventTimingR}>
          <Text style={styles.eventDateMain}>Vivamus suscipit tortor eget</Text>
          <Text style={styles.eventDateSub}>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere 
          </Text>
        </View>
      </View>

<View style={styles.radioMainWrap}>


      <View>
      <View style={styles.btn}>
        {event.map((event, key) => {
          return (
            <View key={event}>
              {checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={require('../assets/images/rb_unselected.png')}
                  />
                  <Text style={styles.pEvent}>{event}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setChecked(key);
                  }}
                  style={styles.btn}>
                  <Image
                    style={styles.img}
                    source={require('../assets/images/rb_selected.png')}
                  />
                  <Text style={styles.pEvent}>{event}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
      {/* <Text>{gender[checked]}</Text> */}
    </View>
</View>
      <View style={styles.createEventWrap}>
      <TouchableOpacity style={[globalStyles.gradBt, {width:'90%'}]}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Create Event</Text>
              </LinearGradient>
            </TouchableOpacity>
            </View>

    </View>
  );
}

const styles = StyleSheet.create({
  addPhotoWrap: {
    backgroundColor: '#dbe0e6',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImg: {
    width: '100%',
    height: '100%',
  },
  eventWrap: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  eventDateText: {
    fontSize: 24,
    fontFamily: 'SFpro-Bold',
    color: COLORS.blue,
  },
  eventNameText: {
    color: '#333b41',
    fontFamily: 'SFpro-Bold',
    fontSize: 20,
  },
  eventDescription: {
    color: '#5e686f',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  eventDate: {
    width: '20%',
  },
  eventName: {
    width: '75%',
  },
  eventTimingL: {
    marginRight: 8,
  },
  eventTimingDetails: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventDateMain: {
    color: '#323b41',
    fontFamily: 'SFpro-Medium',
    fontSize: 16,
  },
  eventDateSub: {
    color: ' #7f868e',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
  },
  eventTimingR: {
    width: '75%',
  },
  createEventWrap:{
    alignItems:'center',
    marginTop:50
  },
  radioMainWrap: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    // backgroundColor:'red'
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  btntext: {
    fontSize: 16,
    fontFamily: 'SFpro-Regular',
  },
  img: {
    height: 25,
    width: 25,
    marginRight: 8,
   
  },
  pEvent:{
    fontSize:15,
    fontFamily: 'SFpro-Bold',

  }
});
