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
import {useEffect} from 'react';
import {useState} from 'react';
import Chatnpost from '../screens/Chatnpost';
import Events from '../screens/Events';
import SettingsScreen from '../screens/SettingsScreen';
import BusinessScreen from '../screens/SIdeBarScreens/BusinessScreen';
import MyReferral from '../screens/SIdeBarScreens/MyReferral';
import ChangePassword from '../screens/ChangePassword';
import ProfileEdit from '../screens/ProfileEdit';
import BlockedUser from '../screens/BlockedUser';
import Logoutmodal from '../shared/Logoutmodal';
import {MenuProvider} from 'react-native-popup-menu';
import HomeContextProvider from '../shared/homeFeedCotext';

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        style={{color: '#fff'}}
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

function EventCalendarScreen({navigation}) {
  return (
    <>
      <Events />
    </>
  );
}

function LykWalletScreen({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function BussinessScreen({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function FbussinessScreen({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}

function MyReferarral({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}
function Promotions({navigation}) {
  return (
    <>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <Text>Work in progress..</Text>
      </View>
    </>
  );
}
function Settings({navigation}) {
  return (
    <>
      <SettingsScreen />
    </>
  );
}
function Logout({navigation}) {
  return (
    <>
      <Logoutmodal />
    </>
  );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserDetails = async () =>
      setUser(JSON.parse(await AsyncStorage.getItem('userId')));
    getUserDetails();
  }, []);

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
        headerShown: false,
        drawerStyle: {
          backgroundColor: COLORS.blue,
          width: 290,
        },
        navigationOptions: {
          drawerIcon: (
            <Image
              style={{width: 24, height: 24}}
              source={require('../assets/images/logo.png')}
            />
          ),
        },
        headerStyle: {backgroundColor: COLORS.blue},
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitle: () => (
          <Image
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
            style={[styles.logoSmall]}
          />
        ),
        // headerLeft: () => (
        //   <TouchableOpacity style={styles.hambg}>
        //    <Image
        //     resizeMode="contain"
        //     source={require('../assets/images/ham.png')}
        //     style={[styles.hamIcon]}
        //   />

        //   </TouchableOpacity>
        // ),
        headerRight: () => (
          <TouchableOpacity style={styles.user}>
            {/* <Image
              resizeMode="contain"
              source={require('../assets/images/search.png')}
              style={[styles.searchIcon]}
            />
            <FIcon name="search" size={25} color="#fff" /> */}
            {/* <FIcon name="heart" size={25} color={COLORS.green} /> */}
          </TouchableOpacity>
        ),
      }}
      useLegacyImplementation
      initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        // component={Home}
        options={{
          title: 'Home',

          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },

          drawerIcon: ({focused, size}) => (
            <IonIcon
              name="home-outline"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}>
        {() => (
          <HomeContextProvider>
            <MenuProvider>
              <Home />
            </MenuProvider>
          </HomeContextProvider>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="Event Calendar"
        component={EventCalendarScreen}
        options={{
          title: 'Event Calendar',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/calendar-m.png')}
              style={[styles.searchIcon]}
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
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/wallet.png')}
              style={[styles.searchIcon]}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Bussiness Page"
        component={BusinessScreen}
        options={{
          title: 'Business Page',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/businessPage.png')}
              style={[styles.searchIcon]}
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
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/businessPage.png')}
              style={[styles.searchIcon]}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="My Referral"
        component={MyReferral}
        options={{
          title: 'My Referral',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/referral.png')}
              style={[styles.searchIcon]}
            />
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
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <Image
              resizeMode="contain"
              source={require('../assets/images/contests.png')}
              style={[styles.searchIcon]}
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
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
            <IonIcon
              name="ios-settings-outline"
              size={size}
              color={focused ? '#fff' : '#fff'}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="BlockedUser"
        component={BlockedUser}
        options={{
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: {display: 'none'},
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Sign Out',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#fff',
          drawerLabelStyle: {
            fontSize: 15,
            marginLeft: -10,
            fontFamily: 'SFpro-Medium',
          },
          drawerIcon: ({focused, size}) => (
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
  hambg: {
    position: 'absolute',
    left: 15,
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
    paddingTop: 80,
  },
  avatarImg: {
    width: '100%',
  },
  avatarText: {
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
  hamIcon: {
    width: 20,
    height: 25,
  },
});
