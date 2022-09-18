import * as React from 'react';
import 'react-native-gesture-handler';
import { Button, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Home from '../screens/Home';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button style={{ color: '#fff' }} onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

function EventCalendarScreen({ navigation }) {
    return (
        <>
            <TouchableOpacity>
                <FIcon name="calendar" size={25} color="#fff" />
                <Text>event calendar</Text>
            </TouchableOpacity>
        </>
    );
}

function lykWalletScreen({ navigation }) {
    return (
        <>
            <TouchableOpacity>
                <FIcon name="calendar" size={25} color="#fff" />
                <Text>LYK wallet</Text>
            </TouchableOpacity>
        </>
    );
}

function bussinessScreen({ navigation }) {
    return (
        <>
            <TouchableOpacity>
                <FIcon name="Bussiness Page" size={25} color="#fff" />
                <Text>Bussiness Page</Text>
            </TouchableOpacity>
        </>
    );
}

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
    return <DrawerContentScrollView>
        <TouchableOpacity style={styles.navProfile}>
            <View style={styles.avatarImgWrap}><Image
                resizeMode="cover"
                source={require('../assets/images/avatar.jpg')}
                style={[styles.avatarImg]}
            /></View>
            <Text style={styles.avatarText}>Ayan pramanik</Text>
        </TouchableOpacity>
        <DrawerItemList {...props} />
    </DrawerContentScrollView>
}

export default function Sidebar() {
    return (
        <Drawer.Navigator screenOptions={{
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
            )
        }} useLegacyImplementation initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notifications" component={NotificationsScreen} />

            <Drawer.Screen name="Event Calendar" component={EventCalendarScreen}

options={{
    title: 'Event Calendar',
    activeTintColor: '#fff',
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
<Drawer.Screen name="LYK wallet" component={lykWalletScreen}

options={{
    title: 'LYK Wallet',
    activeTintColor: '#fff',
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

<Drawer.Screen name="Bussiness Page" component={bussinessScreen}

options={{
    title: 'Bussiness Page',
    activeTintColor: '#fff',
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
        borderRadius: 100
    },
    navProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    avatarImg: {
        width: '100%'
    },
    avatarText: {
        color: '#fff',
        marginLeft: 25,
        fontFamily: 'Lato-Regular',
        fontSize: 20

    }
});

