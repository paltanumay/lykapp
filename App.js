/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import Sidebar from './src/components/Sidebar';
import Addevent from './src/screens/Addevent';
import Chatdetails from './src/screens/Chatdetails';
import Chatnpost from './src/screens/Chatnpost';
import Creategroup from './src/screens/Creategroup';
import Createpost from './src/screens/Createpost';
import Intro from './src/screens/Intro';
import Login from './src/screens/Login';
import Selectcountry from './src/screens/Selectcountry';
import Signup from './src/screens/Signup';
import Verification from './src/screens/Verification';
import Events from './src/screens/Events';
import EventsDetails from './src/screens/EventsDetails';
import SocketProvider from './src/shared/socketContext';
import axios from 'axios';
import { getEncTokenAnyUserId, getEncUserId } from './src/shared/encryption';
import DeviceInfo from 'react-native-device-info';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const INSERT_PUSH = `${API_URL}/LYKPush/insertPush`;
export const INSERT_PUSH_SHORT = "isrPs";

const App = () => {
  const [route, setRoute] = useState();
  const isDarkMode = useColorScheme() === 'dark';
  global.toggle = false;
  global.chatmsg = [];

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    async function userInfo() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      if(userDetails) {
        setRoute('Sidenav');
        let token = await AsyncStorage.getItem("token") + "-" + INSERT_PUSH_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
        if(requestUserPermission()){
          messaging().getToken().then(FCMtoken=>{
            console.log('token>>>>'+FCMtoken)
            axios.post(INSERT_PUSH, {
              "userId": getEncUserId(userDetails.userId),
              "pushKeyString": FCMtoken,
              "deviceType": "android",
              "deviceId": DeviceInfo.getDeviceId(),
            },
            {
              headers:{
                token: token
              }
            }
          ).then(()=>{})
        })
        }
      }
      else setRoute('Intro');

    }
    userInfo();

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
      

      // Register background handler
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
      });


      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe;
  }, [])

  return route ? (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={route}>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }} name="Intro" component={Intro} />
          <Stack.Screen options={{ headerShown: false }} name="Verification" component={Verification} />
          <Stack.Screen options={{ headerShown: false }} name="Country" component={Selectcountry} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={Signup} />
          <Stack.Screen options={{ headerShown: false }} name="Sidenav">
            {() => {
              return (
                <SocketProvider>
                  <Sidebar />
                </SocketProvider>)
            }}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: true }} name="Creategroup" component={Creategroup} />
          <Stack.Screen options={{ headerShown: false }} name="Chatnpost">
            {() => {
              return (
                <SocketProvider>
                  <Chatnpost />
                </SocketProvider>)
            }}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: true }} name="Createpost">
          {() => {
              return (
                <SocketProvider>
                  <Createpost />
                </SocketProvider>)
            }}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: true }} name="Chatdetails">
            {() => {
              return (
                <SocketProvider>
                  <Chatdetails />
                </SocketProvider>)
            }}
          </Stack.Screen>
          <Stack.Screen options={{ headerShown: true }} name="Addevent" component={Addevent} />
          <Stack.Screen options={{ headerShown: true }} name="Events" component={Events} />
          <Stack.Screen options={{ headerShown: true }} name="EventsDetails" component={EventsDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  ):(<></>);
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
