/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
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

const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen options={{headerShown: false}} name="Sidenav" component={Sidebar} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Intro" component={Intro} />
        <Stack.Screen options={{headerShown: false}} name="Verification" component={Verification} />
        <Stack.Screen options={{headerShown: false}} name="Country" component={Selectcountry} />
        <Stack.Screen options={{headerShown: false}} name="SignUp" component={Signup} />
        <Stack.Screen options={{headerShown: true}} name="Creategroup" component={Creategroup} />
        <Stack.Screen options={{headerShown: false}} name="Chatnpost" component={Chatnpost} />
        <Stack.Screen options={{headerShown: true}} name="Createpost" component={Createpost} />
        <Stack.Screen options={{headerShown: true}} name="Chatdetails" component={Chatdetails} />
        <Stack.Screen options={{headerShown: true}} name="Addevent" component={Addevent} />
        <Stack.Screen options={{headerShown: true}} name="Events" component={Events} />
        <Stack.Screen options={{headerShown: true}} name="EventsDetails" component={EventsDetails} />
      </Stack.Navigator>
    </NavigationContainer>
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
