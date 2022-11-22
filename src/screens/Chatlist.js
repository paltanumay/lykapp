import {
    Text,
    View,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443/';
export const CHAT_LOG = `${API_URL}/gtmchts`;
const CHAT_LOG_SHORT = "ebc3DeR";
const offset = 0, limit = 25;


export default function ChatList() {
    const navigation = useNavigation();
    const [user, setUser] = useState();
    const [logs, setLogs] = useState();
    const syncChatThreads = (currentUserId, socket) => {
        try {
            let syncObj = {
                "userId": currentUserId,
                "type": "all",
                "lastSync": 1666974570594
            };
            socket.emit('myChats', syncObj);
            socket.emit('myMsgs', syncObj);
        } catch (e) {
            console.log(e);
        }
    }
    const onChatThreadSync = (data) => {
        //console.log(JSON.stringify(data));
        //setLogs(data.chats);
    }
    const onChatMsgSync = async (data) => {
        /* console.log(JSON.stringify(data));
        let chats = await AsyncStorage.getItem('chats');
        chats = chats?new Map(JSON.parse(chats)):new Map();
        let msgs = data.msgs.reverse();
        if (msgs.length > 0) {
            for (let i = 0; i < msgs.length; i++) {
                let message = chats.get(msgs[i].chatId);
                if (!message) {
                    message = [msgs[i]];
                }
                else {
                    if(message.map(o=>o.msgId).indexOf(msgs[i].msgId)>0) ;
                    else message.push(msgs[i]);
                }
                chats.set(msgs[i].chatId, message);
            }
        }
        console.log('here:'+JSON.stringify([...chats])) */
        if(data.msgs.length>0)
            AsyncStorage.setItem('chats', JSON.stringify(data.msgs))
    }
    useEffect(() => {
        async function getLogs() {
            let userDetails = await AsyncStorage.getItem('userId');
            let chats = await AsyncStorage.getItem('chats');
            chats = JSON.parse(chats);
            let a = [];
            if(chats && chats.length>0){
                chats.reverse().forEach((e,i,arr)=>{
                    if(arr.map(o=>o.chatId).indexOf(e.chatId)===i) a.push(e);
                })
            }
            setLogs(a);
            userDetails = JSON.parse(userDetails);
            setUser(userDetails);
            // Add a connect listener
            socket.on('connect_error', function (error) {
                console.log(error)
            })
            socket.on('connect', async function (e) {
                console.log('Connected!');
                await socket.emit('userRoomJoin', userDetails.userId.toString());
                socket.on('erlangStatus', (data) => console.log('type' + data.type));
                socket.on('userRoomJoin', (e) => {
                    console.log('joinroom' + e.userId)
                    if (userDetails.userId.toString().localeCompare(e.userId) === 0) {
                        console.log('inside --->')
                        syncChatThreads(e.userId, socket);
                    }
                });
                socket.on('myChats', onChatThreadSync);
                console.log("XXXXXXX", "emmit on");

                socket.on('myMsgs', onChatMsgSync);

                console.log("XXXXXXX", "emmit on last");
            });
        }
        getLogs()
    }, [])
    return (
        <>
            <FlatList
                data={logs}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={()=>navigation.push('Chatdetails',{ chatId: item.chatId, toUserId: user.userId===item.toUserId?item.userId:item.toUserId})}> 
                        <View style={styles.listContainer}>
                            <Text style={styles.date}>{new Date(item.msgTime).toDateString()}</Text>
                            <View style={styles.listImgWrap}>
                                <Image
                                    resizeMode="cover"
                                    source={require('../assets/images/avatar.jpg')}
                                    style={styles.listimg}
                                />
                            </View>

                            <View style={styles.listInfo}>
                                <Text style={styles.listInfoTitle}>{item.myName}</Text>
                                <Text style={styles.listInfoSubTitle}>
                                    {item.msgText}
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