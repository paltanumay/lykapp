import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';

export default function Events() {
  return (
    <>
      <TouchableOpacity style={styles.floatingBt}>
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
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
        </View>

        <View style={styles.tabHeadContainer}>
          <Pressable style={styles.tabHead}>
            <Text style={[styles.tabHeadText, styles.active]}>My Events</Text>
          </Pressable>
          <Pressable style={styles.tabHead}>
            <Text style={styles.tabHeadText}>My Events</Text>
          </Pressable>
        </View>

        <View style={styles.tabBodyContainer}>
          <View style={styles.dateWrap}>
            <Text style={styles.dateText}>Oct 25 2022</Text>
          </View>
          <View style={styles.eventsListBlock}>
            <View style={styles.eventsListBlockL}>
              <Text style={styles.eventTimeText}>01.27 PM</Text>
              <Text style={styles.eventTimeText}>03.27 PM</Text>
              <IonIcon name="earth-outline" size={22} color="#7e8790" />
            </View>

            <View style={styles.eventsListBlockR}>
              <Text style={styles.eventNameText}>FootballMatch</Text>
              <Text style={styles.eventNameTextSecondary}>
                En 62, EN block, sector v..
              </Text>
            </View>
          </View>
          <View style={styles.eventsListBlock}>
            <View style={styles.eventsListBlockL}>
              <Text style={styles.eventTimeText}>01.27 PM</Text>
              <Text style={styles.eventTimeText}>03.27 PM</Text>
              <IonIcon name="earth-outline" size={22} color="#7e8790" />
            </View>

            <View style={styles.eventsListBlockR}>
              <Text style={styles.eventNameText}>FootballMatch</Text>
              <Text style={styles.eventNameTextSecondary}>
                En 62, EN block, sector v..
              </Text>
            </View>
          </View>

          <View style={styles.dateWrap}>
            <Text style={styles.dateText}>Oct 25 2022</Text>
          </View>
          <View style={styles.eventsListBlock}>
            <View style={styles.eventsListBlockL}>
              <Text style={styles.eventTimeText}>01.27 PM</Text>
              <Text style={styles.eventTimeText}>03.27 PM</Text>
              <IonIcon name="earth-outline" size={22} color="#7e8790" />
            </View>

            <View style={styles.eventsListBlockR}>
              <Text style={styles.eventNameText}>FootballMatch</Text>
              <Text style={styles.eventNameTextSecondary}>
                En 62, EN block, sector v..
              </Text>
            </View>
          </View>
        </View>
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
