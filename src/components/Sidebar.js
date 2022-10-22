import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Home from '../screens/Home';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';
import Chatnpost from '../screens/Chatnpost';

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        style={{ color: '#fff' }}
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

function EventCalendarScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function LykWalletScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function BussinessScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function FbussinessScreen({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function MyReferarral({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}
function Promotions({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}
function Settings({ navigation }) {
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}
function Logout({ navigation }) {
  useEffect(() => {
    navigation.push('Intro');
  }, [])
  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserDetails = async () => setUser(JSON.parse(await AsyncStorage.getItem('userId')));
    getUserDetails();
  }, [])

  return (
    <DrawerContentScrollView>
      <TouchableOpacity style={styles.navProfile}>
        <View style={styles.avatarImgWrap}>
          <Image
            resizeMode="cover"
            source={require('../assets/images/avatar.jpg')}
            style={[styles.avatarImg]}
          />
        </View>
        <Text style={styles.avatarText}>{user && user.firstName}</Text>
      </TouchableOpacity>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function Sidebar() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      /* drawerContentOptions={{
        activeBackgroundColor: '#5cbbff',
        activeTintColor: '#ffffff',
      }} */
      screenOptions={{
        drawerStyle: {
          backgroundColor: COLORS.blue,
          width: 290,
        },
        headerStyle: { backgroundColor: COLORS.blue },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitle: () => (
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={[styles.logoSmall]}
          />
        ),
        headerRight: () => (
          <TouchableOpacity style={styles.user}>
            <FIcon name="search" size={25} color="#fff" />
            {/* <FIcon name="heart" size={25} color={COLORS.green} /> */}
          </TouchableOpacity>
        ),
      }}
      useLegacyImplementation
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',

          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          labelStyle: {
            color: 'red',
          },
          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="home-outline"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
       name="Chatnpost" 
       component={Chatnpost}
       options={{
        drawerItemStyle:{
          display: 'none'
        }
       }} 
      />

      <Drawer.Screen
        name="Event Calendar"
        component={EventCalendarScreen}
        options={{
          title: 'Event Calendar',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          labelStyle: {
            color: 'red',
          },
          drawerIcon: ({ focused, size }) => (
            <FIcon
              name="calendar"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="LYK wallet"
        component={LykWalletScreen}
        options={{
          title: 'LYK Wallet',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="wallet-outline"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Bussiness Page"
        component={BussinessScreen}
        options={{
          title: 'Bussiness Page',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <FIcon
              name="briefcase"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Followed Bussiness Page"
        component={FbussinessScreen}
        options={{
          title: 'Followed Bussiness Page',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <FIcon
              name="briefcase"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="My Referral"
        component={MyReferarral}
        options={{
          title: 'My Referral',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <FIcon name="users" size={size} color={focused ? '#fff' : '#fff'} />
          ),
        }}
      />

      <Drawer.Screen
        name="Promotions"
        component={Promotions}
        options={{
          title: 'Promotions',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <FIcon
              name="volume-2"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <IonIcon
              name="ios-settings-outline"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',

          drawerIcon: ({ focused, size }) => (
            <FIcon
              name="log-out"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoSmall: {
    width: 55,
    height: 36,
  },
  user: {
    position: 'absolute',
    right: 15,
    top: 20,
  },
  avatarImgWrap: {
    width: 60,
    height: 60,
    overflow: 'hidden',
    borderRadius: 100,
  },
  navProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  avatarImg: {
    width: '100%',
  },
  avatarText: {
    color: '#fff',
    marginLeft: 25,
    fontFamily: 'Lato-Regular',
    fontSize: 20,
  },
});
