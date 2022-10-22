import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';
import axios from 'axios';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const CALL_LOG = `${API_URL}/LYKCallHistory/getCallHistory`;
const CALL_LOG_SHORT = "gtclhtr";
const offset = 0, limit = 25;

export default function CallList() {
    const [logs, setLogs] = useState();
    useEffect(() => {
        async function getLogs() {
            let userDetails = await AsyncStorage.getItem('userId');
            userDetails = JSON.parse(userDetails);
            let token = await AsyncStorage.getItem("token") + "-" + CALL_LOG_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
            axios.post(CALL_LOG, {
                "userId": getEncUserId(userDetails.userId),
                "limit": limit,
                "offset": offset,
            }, {
                headers: {
                    token: token
                }
            }).then(res => {
                setLogs(res.data.response.callLogList)
            }, err => {
                alert(err + userDetails.userId + token)
            }
            )
        }
        getLogs()
    }, [])
    return (
        <>
            <FlatList
                data={logs}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.listContainer}>
                            <Text style={styles.date}>{item.callType}</Text>
                            <View style={styles.listImgWrap}>
                                <Image
                                    resizeMode="cover"
                                    source={require('../assets/images/avatar.jpg')}
                                    style={styles.listimg}
                                />
                            </View>

                            <View style={styles.listInfo}>
                                <Text style={styles.listInfoTitle}>{item.firstName}</Text>
                                <Text style={styles.listInfoSubTitle}>
                                    {item.mode}{item.timeStamp}
                                </Text>
                            </View>
                        </View>
                    );
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    listImgWrap: {
        width: 50,
        height: 50,
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listimg: {
        width: '100%',
        height: '100%',
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    listInfo: {
        marginLeft: 15,
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        paddingVertical: 15,
        width: '80%',
    },
    listInfoTitle: {
        fontSize: 16,
        fontFamily: 'SFpro-Bold',
        color: '#333436',
    },
    listInfoSubTitle: {
        color: '#878789',
        fontFamily: 'SFpro-Regular',
        marginTop: 5,
    },
    tabContentWrap: {
        margin: 15,
    },
    date: {
        position: 'absolute',
        right: 10,
        top: 15,
        textTransform: 'uppercase',
        color: '#959597',
    },
})