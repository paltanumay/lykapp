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
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import AsyncStorage from '@react-native-community/async-storage';
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

const App = () => {
  const [user, setUser] = useState();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function userInfo() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      setUser(userDetails);
    }
    userInfo();
  }, [])

  return (
    <>
      {user && (
        <NavigationContainer>
          <Stack.Navigator initialRouteName={user?"Sidenav":"Intro"}>
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
            <Stack.Screen options={{ headerShown: true }} name="Createpost" component={Createpost} />
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
      )}
    </>
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
