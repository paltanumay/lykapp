/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  StatusBar,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
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
import {getEncTokenAnyUserId, getEncUserId} from './src/shared/encryption';
import DeviceInfo from 'react-native-device-info';
import Audiocall from './src/screens/Audiocall';
import Videocall from './src/screens/Videocall';
import CallScreen from './src/screens/CallScreen';
import CommentsDetails from './src/screens/CommentsDetails';
import {addPlugin} from 'react-native-flipper';
import BusinessScreen from './src/screens/SIdeBarScreens/BusinessScreen';
import CreateBusinessPage from './src/screens/SIdeBarScreens/CreateBusinessPage';
import Network from './src/screens/Network';
import ProfileEdit from './src/screens/ProfileEdit';
import ChangePassword from './src/screens/ChangePassword';
import BlockedUser from './src/screens/BlockedUser';
import {MenuProvider} from 'react-native-popup-menu';
import HomeContextProvider from './src/shared/homeFeedCotext';
import SearchPage from './src/screens/SearchPage';

const API_URL =
  process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const INSERT_PUSH = `${API_URL}/LYKPush/insertPush`;
export const INSERT_PUSH_SHORT = 'isrPs';

if (__DEV__) {
  addPlugin({
    getId() {
      return 'sea-mammals';
    },
    onConnect(connection) {
      console.log('flipper connected');
    },
    onDisconnect() {},
  });
}

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
      if (userDetails) {
        setRoute('Sidenav');
        let token =
          (await AsyncStorage.getItem('token')) +
          '-' +
          INSERT_PUSH_SHORT +
          '-' +
          getEncTokenAnyUserId(userDetails.userId);
        if (requestUserPermission()) {
          messaging()
            .getToken()
            .then(FCMtoken => {
              console.log('token>>>>' + FCMtoken);
              axios
                .post(
                  INSERT_PUSH,
                  {
                    userId: getEncUserId(userDetails.userId),
                    pushKeyString: FCMtoken,
                    deviceType: 'android',
                    deviceId: DeviceInfo.getDeviceId(),
                  },
                  {
                    headers: {
                      token: token,
                    },
                  },
                )
                .then(() => {});
            });
        }
      } else setRoute('Intro');
    }
    userInfo();

    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
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

    /* const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });
  
      return unsubscribe; */
  }, []);

  return route ? (
    <>
      <StatusBar animated={true} backgroundColor="#0a89e2" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={route}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen options={{headerShown: false}} name="Search">
            {() => {
              return (
                <HomeContextProvider>
                  <SearchPage />
                </HomeContextProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="Intro"
            component={Intro}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Verification"
            component={Verification}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Country"
            component={Selectcountry}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="SignUp"
            component={Signup}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Audiocall"
            component={Audiocall}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Videocall"
            component={Videocall}
          />
          <Stack.Screen options={{headerShown: false}} name="Callscreen">
            {() => {
              return (
                <SocketProvider>
                  <CallScreen />
                </SocketProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name="Sidenav">
            {() => {
              return (
                <SocketProvider>
                  <Sidebar />
                </SocketProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="Creategroup"
            component={Creategroup}
          />
          <Stack.Screen options={{headerShown: false}} name="Chatnpost">
            {() => {
              return (
                <HomeContextProvider>
                  <SocketProvider>
                    <Chatnpost />
                  </SocketProvider>
                </HomeContextProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name="Createpost">
            {() => {
              return (
                <SocketProvider>
                  <Createpost />
                </SocketProvider>
              );
            }}
          </Stack.Screen>
          <Stack.Screen options={{headerShown: false}} name="Chatdetails">
            {() => {
              return (
                <SocketProvider>
                  <Chatdetails />
                </SocketProvider>
              );
            }}
          </Stack.Screen>

          <Stack.Screen options={{headerShown: false}} name="comments">
            {() => (
              <HomeContextProvider>
                <MenuProvider>
                  <CommentsDetails />
                </MenuProvider>
              </HomeContextProvider>
            )}
          </Stack.Screen>
          <Stack.Screen
            options={{headerShown: false}}
            name="CreateBusinessPage"
            component={CreateBusinessPage}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Addevent"
            component={Addevent}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Events"
            component={Events}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="EventsDetails"
            component={EventsDetails}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ProfileEdit"
            component={ProfileEdit}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ChangePassword"
            component={ChangePassword}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BlockedUser"
            component={BlockedUser}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="network"
            component={Network}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  ) : (
    <></>
  );
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
