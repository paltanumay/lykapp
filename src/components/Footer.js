import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import React, { useEffect, useState, Component } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import LinearGradient from 'react-native-linear-gradient';


import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default class Footer extends Component {
    render() {
        return (
            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footIconBox,{marginRight:15}]}>
                    {/* <IonIcon name="ios-home-outline" size={20} color={COLORS.blue} /> */}
                    <IonIcon name="ios-home" size={25} color={COLORS.blue} />

                    <Text style={[styles.footIconText, styles.active]}>Footer</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.footIconBox,{marginRight:15}]}>
                    {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}
                    <IonIcon name="ios-people-outline" size={30} color={COLORS.blue} />

                    <Text style={styles.footIconText}>Network</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footIconBoxCreate}>
                    {/* <IonIcon name="ios-people" size={20} color={COLORS.blue} /> */}
                    
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['#037ee5', '#15a2e0', '#28cad9']}
                            style={styles.createBt}>
                            <FIcon name="plus" size={40} color="#fff" />
                        </LinearGradient>

                   


                    <Text style={styles.footIconText}>Create</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.footIconBox}>
                    {/* <IonIcon name="ios-notifications" size={20} color={COLORS.blue} /> */}
                    <IonIcon name="ios-notifications-outline" size={26} color={COLORS.blue} />

                    <Text style={styles.footIconText}>Notification</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footIconBox} onPress={()=> this.props.navigation.navigate("Chatnpost")}>
                    {/* <IonIcon name="chatbubbles-sharp" size={20} color={COLORS.blue} /> */}
                    <IonIcon name="chatbubbles-outline" size={26} color={COLORS.blue} />

                    <Text style={styles.footIconText}>Chat & Post</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        paddingVertical:6,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'#fff'
    },
    footIconBox: {
        alignItems: 'center',
        // backgroundColor:'red',
        height: 50,
        justifyContent: 'space-between'
    },
    footIconText: {
        fontFamily: 'Lato-Regular',
        fontSize: 13,
        color:'#adadad'

    },
    footIconBoxCreate: {
        alignItems: 'center',
    },
    createBt: {
        width: 70,
        height: 70,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      marginTop:-35
    },
    active:{
        color:COLORS.blue
    }
})