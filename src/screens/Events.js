import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const MY_EVENT = `${API_URL}/LYKEvent/getMyEvent`;
export const OTHER_USER_EVENT = `${API_URL}/LYKEvent/getOtherEventsV_2`;
const MY_EVENT_SHORT = "gtyvn";
const OTHER_USER_EVENT_SHORT = "ohrvns";

export default function Events() {
  global.lastDate = 0;
  const navigation = useNavigation();
  const [tab, setTab] = useState();
  const [myEvents, setMyEvents] = useState();
  async function getMyEvent() {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token = await AsyncStorage.getItem("token") + "-" + MY_EVENT_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
    axios.post(MY_EVENT, {
        "userId": getEncUserId(userDetails.userId),
        "lastId": ""
    }, {
        headers: {
            token: token
        }
    }).then(res => {
        setMyEvents(res.data.response.events)
        //alert(JSON.stringify(res.data))
    }, err => {
    }
    ).catch(err=>{})
  }
  async function getOtherEvent() {
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let token = await AsyncStorage.getItem("token") + "-" + OTHER_USER_EVENT_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
    axios.post(OTHER_USER_EVENT, {
        "userId": getEncUserId(userDetails.userId),
        "lastId": ""
    }, {
        headers: {
            token: token
        }
    }).then(res => {
        setMyEvents(res.data.response.events)
        //alert(JSON.stringify(res.data))
    }, err => {
    }
    ).catch(err=>{})
  }
  useEffect(() => {
    getMyEvent()
}, [])
  return (
    <>
      <TouchableOpacity style={styles.floatingBt} onPress={()=>navigation.push('Addevent')}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#037ee5', '#15a2e0', '#28cad9']}
          style={styles.rBt}>
          <FaIcon name="calendar-plus-o" size={22} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      <View style={globalStyles.innerPagesContainerWhite}>
        <View style={styles.calendarWrap}>
          <Calendar
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            markedDates={{
              '2012-10-17': {marked: true},
            }}
            // Enable the option to swipe between months. Default = false
            //enableSwipeMonths={true}
            onDayPress={day=>{
              console.log('day'+JSON.stringify(day))
            }}
          />
        </View>

        <View style={styles.tabHeadContainer}>
          <Pressable style={styles.tabHead} onPress={()=>{setTab('my'),getMyEvent()}}>
            <Text style={tab==='my'? [styles.tabHeadText, styles.active]:styles.tabHeadText}>My Events</Text>
          </Pressable>
          <Pressable style={styles.tabHead} onPress={()=>{setTab('other'),getOtherEvent()}}>
            <Text style={tab==='other'? [styles.tabHeadText, styles.active]:styles.tabHeadText}>Other Events</Text>
          </Pressable>
        </View>

        {myEvents && myEvents.map((ele, i)=>
        <View key={i} style={styles.tabBodyContainer}>
          {(() => {
                if (new Date(lastDate).getDate() == new Date(ele.eventStartDate).getDate()) return null;
                else {
                  lastDate = ele.eventStartDate;
                  return (<View style={styles.dateWrap}>
                    <Text style={styles.dateText}>{new Date(ele.eventStartDate).toDateString()}</Text>
                  </View>)
                }
              })()}
          <View style={styles.eventsListBlock}>
            <View style={styles.eventsListBlockL}>
              <Text style={styles.eventTimeText}>{ele.startTime}</Text>
              <Text style={styles.eventTimeText}>{ele.endTime}</Text>
              <IonIcon name="earth-outline" size={22} color="#7e8790" />
            </View>

            <View style={styles.eventsListBlockR}>
              <Text style={styles.eventNameText}>{ele.eventSubject}</Text>
              <Text style={styles.eventNameTextSecondary}>
                {ele.eventContent}
              </Text>
            </View>
          </View>
        </View>)}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dateWrap: {
    backgroundColor: '#e7ebf6',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  eventsListBlock: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e7ebf4',
  },

  eventsListBlockR: {
    width: '70%',
  },
  eventTimeText: {
    color: '#5d6770',
    fontSize: 12,
    fontFamily: 'SFpro-Medium',
    marginBottom: 5,
  },
  eventNameText: {
    color: '#5d6770',
    fontSize: 13,
    fontFamily: 'SFpro-Bold',
    marginBottom: 5,
  },
  eventNameTextSecondary: {
    color: '#5d6770',
    fontSize: 13,
    fontFamily: 'SFpro-regular',
    textTransform: 'uppercase',
  },
  eventsListBlockL: {
    borderRightColor: COLORS.blue,
    borderRightWidth: 2,
    width: '23%',
    paddingRight: 25,
    marginRight: 25,
  },
  tabHeadContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderTopColor: '#fafafa',
    borderTopWidth: 1,
  },
  tabHeadText: {
    color: '#323b42',
    fontFamily: 'SFpro-Bold',
  },
  tabHead: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    flex: 1,
    width: '50%',
    alignItems: 'center',
  },
  active: {
    color: COLORS.blue,
  },
  floatingBt: {
    position: 'absolute',
    bottom: 50,
    right: 15,
    zIndex: 999,
    width: 50,
    height: 50,
  },
  rBt: {
    width: 50,
    height: 50,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
