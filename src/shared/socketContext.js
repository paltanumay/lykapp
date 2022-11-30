import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useEffect, useState } from "react";
import socketIO from 'socket.io-client';

const SOCKET_URL = process.env.API_URL || 'https://socket.lykapp.com:8443/';
export const TEMP_ID_PREFIX = "9xxxxxxxxxxxxxxxxxxxxxxx";

export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [typing, setTypeing] = useState();
    const [reload, setReload] = useState();
    global.lastDate = 0;
    global.socket = socketIO(SOCKET_URL, { jsonp: false, transports: ['websocket'] });
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
    }
    const onChatMsgSync = async (data) => {
        if (data.msgs.length > 0)
            AsyncStorage.setItem('chats', JSON.stringify(data.msgs))
    }
    const onMessageReceived = (data, currentUserId) => {
        console.log('userid=='+currentUserId+"data=="+data.userId);
        if (data.toUserId === currentUserId) {
            setReload(!toggle);
            toggle = !toggle;
            console.log(data.msgTalk+'--'+data.msgText);
            let params = {
                "type": "single_chat_msg_recv",
                "msgId": data.msgId,
                "delivered": true,
                "chatId": data.chatId,
                "tempId": TEMP_ID_PREFIX + new Date().getTime(),
                "myName": data.firstName,
                "chatType": "solo",
                "userId": data.userId,
                "toUserId": data.toUserId,
                "msgText": data.msgText,
                "msgTalk": data.msgTalk,
                "msgTime": new Date().getTime(),
                "isReply": false,
                "isDisappearing": false,
                "enc": true,
                "replyToMsg":{"__rec":"single_chat_reply_message"},
                "sent": true,
            }
            socket.emit('singleChatDeliveryMessage', params);
            socket.emit('singleChatSeenMessage', {...params, seen: true, type: "single_chat_msg_read"});
        }
    }
    const initializeSocket = async () => {
        let userDetails = await AsyncStorage.getItem('userId');
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

            socket.on('singleChatUserTyping', (data)=>{
                console.log('onTyping');
                if(userDetails.userId===data.toUserId) setTypeing(true);
            });
            socket.on('singleChatDelMessage', ()=>console.log('singleMsgDelForAll'));
            socket.on('singleChatUserTypingStop', (data)=>{
                console.log('onStopTyping')
                if(userDetails.userId===data.toUserId) setTypeing(false);
            });


            socket.on('singleChatSeenMessage', (data) => {
                console.log('onReadMsg')
                if(userDetails.userId===data.toUserId) setReload(!reload);
            });
            socket.on('singleChatSentMessage', () => console.log('onMessageSent'));

            socket.on('singleChatReceiveMessage', (data) =>{ console.log('onMessageReceived'), onMessageReceived(data, userDetails.userId)});

            socket.on('singleChatDeliveryMessage', ()=>console.log('onMessageDelivered'+userDetails.userId))
        });
    }
    useEffect(() => {
        initializeSocket();
    }, [])
    return (
        <SocketContext.Provider value={{
            typing: typing,
            reload: reload,
            reconnect: () => {
                console.log('Reconnected!');
                initializeSocket();
            }
            }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;