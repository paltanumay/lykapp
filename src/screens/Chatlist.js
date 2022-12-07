import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';
import axios from 'axios';
import { SocketContext } from '../shared/socketContext';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const CHAT_LOG = `${API_URL}/gtsngchtmsgs`;
const CHAT_LOG_SHORT = "5S2rYn";
const offset = 0, limit = 1;


export default function ChatList() {
    const {typing, reload, typinguser, reconnect} = useContext(SocketContext);
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [logs, setLogs] = useState([]);
    const [refresh, setRefresh] = useState();
    useEffect(() => {
        async function getLogs() {
            let userDetails = await AsyncStorage.getItem('userId');
            userDetails = JSON.parse(userDetails);
            let token = await AsyncStorage.getItem("token") + "-" + CHAT_LOG_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
            let chtmsg = await AsyncStorage.getItem('chtmsg')
            chtmsg = JSON.parse(chtmsg)
            setLogs(chtmsg)
            if(chtmsg && chtmsg.length>0){
                chtmsg.forEach(ele=>
                    axios.post(CHAT_LOG, {
                        "userId": getEncUserId(userDetails.userId),
                        "chatId": ele._id,
                        "limit": limit,
                        "offset": offset,
                    }, {
                        headers: {
                        token: token
                        }
                    }).then(res => {
                        if(chatmsg.length<chtmsg.length)
                            chatmsg = [...chatmsg,...res.data.response.messages]
                            
                        setRefresh(!toggle)
                        toggle = !toggle
                    }).catch(()=>{})
                )
            }
            setUser(userDetails);
        }
        getLogs()
    }, [reload])
    return (
        <>
            <FlatList
                data={logs}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={()=>navigation.push('Chatdetails',{ chatId: item._id, toUserId: item.userList.filter(ele=>ele!=user?.userId)[0]})}> 
                        <View style={styles.listContainer}>
                            <Text style={styles.date}>{new Date(chatmsg.filter(ele=>ele.chatId === item._id)[0]?.msgTime).toDateString()}</Text>
                            <View style={styles.listImgWrap}>
                                <Image
                                    resizeMode="cover"
                                    source={require('../assets/images/avatar.jpg')}
                                    style={styles.listimg}
                                />
                            </View>

                            <View style={styles.listInfo}>
                                <Text style={styles.listInfoTitle}>{item.userDetails.filter(ele=>ele.userId!=user?.userId)[0].firstName}</Text>
                                <Text style={styles.listInfoSubTitle}>
                                    {typing && typinguser===item.userList.filter(ele=>ele!=user?.userId)[0] ? 'typing..' : chatmsg.filter(ele=>ele.chatId === item._id)[0]?.msgText}
                                </Text>
                            </View>
                        </View>
                        </TouchableOpacity>
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