import * as React from 'react';
import 'react-native-gesture-handler';
import { Button, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import COLORS from '../global/globalColors';
import FIcon from 'react-native-vector-icons/Feather';

function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

const Drawer = createDrawerNavigator();

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
        </Drawer.Navigator>
    );
}

const styles = StyleSheet.create({
    logoSmall: {
        width: 40,
        height: 36,

    },
    user: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
});

