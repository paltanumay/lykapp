import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
// import {AccordionList} from 'react-native-accordion-list-view';

// const data = [
//   {
//     id: 0,
//     title: 'Account',
//     // image: require('../assets/images/intro-5.png'),
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
//   {
//     id: 1,
//     title: 'Blocked Users',
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
//   {
//     id: 2,
//     title: 'Notification',
//     body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//   },
// ];

export default function SettingsScreen() {
  return (
    <>
      <Header />
      <View style={globalStyles.innerPagesContainerWhite}>
        <Collapse>
          <CollapseHeader>
            <View style={styles.titleWrap}>
              <Image
                resizeMode="cover"
                source={require('../assets/images/account.png')}
                style={[styles.accorImg]}
              />
              <Text style={styles.title}>Account</Text>
              <TouchableOpacity style={styles.backIcon}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/images/back-new.png')}
                  style={[styles.backNewImg]}
                />
              </TouchableOpacity>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.collapseContent}>
              <TouchableOpacity style={styles.collapseItems}>
                <Text>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.collapseItems}>
                <Text>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.collapseItems}>
                <Text>Manage Account</Text>
              </TouchableOpacity>
            </View>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.titleWrap}>
              <Image
                resizeMode="cover"
                source={require('../assets/images/notificationSettings.png')}
                style={[styles.accorImg]}
              />
              <Text style={styles.title}>Notifications</Text>

              <TouchableOpacity style={styles.backIcon}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/images/back-new.png')}
                  style={[styles.backNewImg]}
                />
              </TouchableOpacity>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.collapseContent}>
              <View style={styles.notiTitle}>
                <Text style={styles.notiTitleText}>Notifications</Text>
              </View>
              <View style={styles.snoozenotiWrapper}>
                <Text style={styles.snoozenotiTitleText}>
                  Snooze Notifications
                </Text>
                <View style={styles.snoozenotiList}>
                  <TouchableOpacity style={styles.snoozenotiBt}>
                    <Text style={styles.snoozenoti}>1 hour</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.snoozenotiBt}>
                    <Text style={styles.snoozenoti}>2 hours</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.snoozenotiBt}>
                    <Text style={styles.snoozenoti}>4 hours</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.snoozenotiBt}>
                    <Text style={styles.snoozenoti}>1 day</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.snoozenotiBt}>
                    <Text style={styles.snoozenoti}>1 week</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader>
            <View style={styles.titleWrap}>
              <Image
                resizeMode="cover"
                source={require('../assets/images/block.png')}
                style={[styles.accorImg]}
              />
              <Text style={styles.title}>Blocked Users</Text>
              <TouchableOpacity style={styles.backIcon}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/images/back-new.png')}
                  style={[styles.backNewImg]}
                />
              </TouchableOpacity>
            </View>
          </CollapseHeader>
          <CollapseBody></CollapseBody>
        </Collapse>
        {/* <View>
        <AccordionList
          data={data}
          customTitle={item => <Text style={styles.title}>{item.title}</Text>}
          customBody={item => <Text>{item.body}</Text>}
          animationDuration={400}
          expandMultiple={true}
          containerItemStyle={styles.cont}
        />
        </View> */}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: 'SFpro-Bold',
    fontSize: 16,
    color: '#000',
  },

  cont: {},
  titleWrap: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  collapseContent: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  collapseItems: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  accorImg: {
    width: 22,
    height: 22,
    marginRight: 8,
    tintColor: 'gray',
  },
  backIcon: {
    position: 'absolute',
    right: 15,
  },
  notiTitleText: {
    fontFamily: 'SFpro-Bold',
    fontSize: 16,
    color: '#000',
  },
  snoozenotiTitleText: {
    color: '#8d8f91',
    fontSize: 16,
    marginBottom: 15,
  },
  snoozenotiWrapper: {
    marginTop: 15,
  },
  snoozenotiText: {
    color: '#91969a',
  },
  snoozenotiList: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#f8f8f8',
    borderTopColor: '#f8f8f8',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  snoozenotiBt: {
    backgroundColor: '#f6f7fb',
    height: 40,
    paddingHorizontal: 15,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
});
