import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useEffect, useState } from "react";
import socketIO from 'socket.io-client';

const SOCKET_URL = process.env.API_URL || 'https://socket.lykapp.com:8443/';

const SocketContext = createContext(null);

const SocketProvider = ({children}) => {
    const [user, setUser] = useState();
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
        if(data.msgs.length>0)
            AsyncStorage.setItem('chats', JSON.stringify(data.msgs))
    }
    const onMessageReceived = (data, currentUserId) => {
      if(data.toUserId.localeCompare(currentUserId)){
        console.log(data.toUserId);
        let params = {
          "type": "single_chat_msg_recv",
          "msgId": data.msgId,
          "delivered": true,
          "sent": true,
        }
        socket.emit('singleChatDeliveryMessage', params);
      }
    }
    useEffect(()=>{
        async function initializeSocket() {
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

          socket.on('singleChatSeenMessage', ()=>console.log('onReadMsg'));
          socket.on('singleChatSentMessage', ()=>console.log('onMessageSent'));

          socket.on('singleChatReceiveMessage', (data)=>onMessageReceived(data, userDetails.userId));
      });
    }
    initializeSocket();
    },[])
    return (
        <SocketContext.Provider value={user}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider;