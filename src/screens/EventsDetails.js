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
import React, { Component, useState, useEffect } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import Gmodal from '../shared/Gmodal';
import LinearGradient from 'react-native-linear-gradient';

import FIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const MY_EVENT = `${API_URL}/LYKEvent/getMyEvent`;
export const OTHER_EVENT_DETAILS = `${API_URL}/LYKEvent/getEventDetails`;
const MY_EVENT_SHORT = "gtyvn";
const OTHER_EVENT_DETAILS_SHORT = "gtvnDties";
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

export default function EventsDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(0);
  var event = ['Public Event', 'Private Event'];
  const [eventDtls, setEventDtls] = useState();
  async function getEventDtls() {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token = await AsyncStorage.getItem("token") + "-" + OTHER_EVENT_DETAILS_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
    axios.post(OTHER_EVENT_DETAILS, {
      "userId": getEncUserId(userDetails.userId),
      "eventId": route.params.id
    }, {
      headers: {
        token: token
      }
    }).then(res => {
      setEventDtls(res.data.response.eventDetails)
    }, err => {
    }
    ).catch(err => { })
  }
  useEffect(() => {
    getEventDtls()
  }, [])
  return eventDtls ? (
    <View style={globalStyles.innerPagesContainerWhite}>
      <View style={styles.addPhotoWrap}>
        <Image
          style={styles.eventImg}
          source={{
            uri: 'https://cdn.lykapp.com/newsImages/images/' + eventDtls.imageUrl
          }}
        />
      </View>

      <View style={styles.eventWrap}>
        <View style={styles.eventDate}>
          <Text style={styles.eventDateText}>{monthNames[new Date(eventDtls.eventStartDate).getMonth()]}</Text>
          <Text style={styles.eventDateText}>{new Date(eventDtls.eventStartDate).getDate()}</Text>
        </View>
        <View style={styles.eventName}>
          <Text style={styles.eventNameText}>{eventDtls.eventSubject}</Text>
          <Text style={styles.eventDescription}>
            Hosted by {eventDtls.createdBy.firstName}
          </Text>
        </View>
      </View>

      <View style={styles.eventTimingDetails}>
        <View style={styles.eventTimingL}>
          <IonIcon name="time-outline" size={22} color="#8e9397" />
        </View>
        <View style={styles.eventTimingR}>
          <Text style={styles.eventDateMain}>{monthNames[new Date(eventDtls.eventStartDate).getMonth()]} {new Date(eventDtls.eventStartDate).getDate()} -
            {monthNames[new Date(eventDtls.eventStartDate).getMonth()]} {new Date(eventDtls.eventStartDate).getDate()}, 2022</Text>
          <Text style={styles.eventDateSub}>
            {new Date(eventDtls.eventStartDate).toDateString()} to {new Date(eventDtls.eventEndDate).toDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.eventTimingDetails}>
        <View style={styles.eventTimingL}>
          <IonIcon name="location-outline" size={22} color="#8e9397" />
        </View>
        <View style={styles.eventTimingR}>
          <Text style={styles.eventDateMain}>{eventDtls.eventLocation}</Text>
          <Text style={styles.eventDateSub}>
            Hosted by {eventDtls.createdBy.firstName}
          </Text>
        </View>
      </View>

      {route.params.route==='addevent'?
      (<>
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
                        /* onPress={() => {
                          setChecked(key);
                        }} */
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
          <TouchableOpacity style={[globalStyles.gradBt, { width: '90%' }]} onPress={()=>navigation.push('Events')}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#037ee5', '#15a2e0', '#28cad9']}
              style={globalStyles.linearGradient}>
              <Text style={globalStyles.buttonText}>Create Event</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </>):(
        <View style={styles.eventTimingDetails}>
        <View style={styles.eventTimingR}>
          <Text style={styles.eventDateMain}>Event Description</Text>
          <Text style={styles.eventDateSub}>
            {eventDtls.eventContent}
          </Text>
        </View>
      </View>
      )}

    </View>
  ) : (<></>);
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
    color: '#7f868e',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
  },
  eventTimingR: {
    width: '75%',
  },
  createEventWrap: {
    alignItems: 'center',
    marginTop: 50
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
  pEvent: {
    fontSize: 15,
    fontFamily: 'SFpro-Bold',
    color:'#333'

  }
});
