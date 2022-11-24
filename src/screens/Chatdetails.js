import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, { Component, useEffect, useState, useRef, useContext } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import Gmodal from '../shared/Gmodal';
import LinearGradient from 'react-native-linear-gradient';

import OctIcon from 'react-native-vector-icons/Octicons';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { SocketContext } from '../shared/socketContext';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const CHAT_LOG = `${API_URL}/gtsngchtmsgs`;
const CHAT_LOG_SHORT = "5S2rYn";
export const TEMP_ID_PREFIX = "9xxxxxxxxxxxxxxxxxxxxxxx";
const offset = 0, limit = 25;

export default function Chatdetails() {
  const route = useRoute();
  const { typing, reload } = useContext(SocketContext);
  const scrollRef = useRef();
  const [user, setUser] = useState();
  const [logs, setLogs] = useState([]);
  const [sentMsg, setSentMsg] = useState();
  const [refresh, setRefresh] = useState();
  const sendMsg = () => {
    console.log(route.params.chatId + user.userId + route.params.toUserId + sentMsg)
    let params = {
      "type": "single_chat_msg_sent",
      "chatId": route.params.chatId,
      "tempId": TEMP_ID_PREFIX + new Date().getTime(),
      "myName": user.firstName,
      "chatType": "solo",
      "userId": user.userId,
      "toUserId": route.params.toUserId,
      "msgText": sentMsg,
      "msgTalk": "",
      "imageUrl": "",
      "videoUrl": "",
      "placeName": "",
      "msgTime": new Date().getTime(),
      "lat": "",
      "lng": "",
      "isReply": false,
      "isDisappearing": false,
      "enc": true,
    }
    socket.emit('singleChatMessage', params);
    setRefresh(true);
  }
  useEffect(() => {
    async function getLogs() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      setUser(userDetails);
      let data = {
        "type": "single_chat_msg_read",
        "replyToMsg": {
          "__rec": "single_chat_reply_message",
        },
        "seen": true,
      }
      socket.emit('singleChatSeenMessage', data);
      let token = await AsyncStorage.getItem("token") + "-" + CHAT_LOG_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
      axios.post(CHAT_LOG, {
        "userId": getEncUserId(userDetails.userId),
        "chatId": route.params.chatId,
        "limit": limit,
        "offset": offset,
      }, {
        headers: {
          token: token
        }
      }).then(res => {
        if(userDetails.userId===route.params.toUserId)
          setLogs(res.data.response.messages)
        else setLogs(res.data.response.messages.reverse())
      }, err => {
        alert(err + userDetails.userId + token)
      }
      )
    }
    getLogs()
  }, [refresh, reload])
  return (
    <>
      <Gmodal />

      <ScrollView ref={scrollRef} style={globalStyles.innerPagesContainerWhite} onContentSizeChange={() => scrollRef.current.scrollToEnd()}>
        <View style={styles.chatBody}>
          {logs && logs.map((ele, i) => (
            <View key={i}>
              {(() => {
                if (new Date(lastDate).getDate() == new Date(ele.msgTime).getDate()) return null;
                else {
                  lastDate = ele.msgTime;
                  return (<View style={styles.chatDateTop}>
                    <Text style={styles.chatDateTopText}>{new Date(ele.msgTime).toDateString()}</Text>
                  </View>)
                }
              })()}

              <View style={styles.chatDetails}>

                {ele.userId === user.userId ?
                  <View style={styles.chatR}>
                    <View style={[styles.chatInfoR]}>
                      <Text style={styles.chatInfoTxitle}>{ele.msgText}</Text>

                      <Text style={styles.chatInfoTime}>{new Date(ele.msgTime).toLocaleTimeString()}</Text>
                    </View>
                    <View style={styles.chatLImgMain}>
                      <View style={styles.chatLImg}>
                        <Image
                          resizeMode="cover"
                          source={require('../assets/images/music.webp')}
                          style={[styles.chatLImgM]}
                        />
                      </View>

                      <IonIcon name={ele.seen || ele.delivered ? "checkmark-done" : "checkmark-outline"} size={22} color={ele.seen ? COLORS.blue : null} />
                    </View>
                  </View>

                  : <View style={styles.chatL}>
                    <View style={styles.chatLImg}>
                      <Image
                        resizeMode="cover"
                        source={require('../assets/images/avatar.jpg')}
                        style={[styles.chatLImgM]}
                      />
                    </View>

                    <View style={styles.chatInfo}>
                      <Text style={styles.chatInfoTitle}>
                        {ele.msgText}{typing}
                      </Text>

                      <Text style={styles.chatInfoTime}>{new Date(ele.msgTime).toLocaleTimeString()}</Text>
                    </View>
                  </View>}

              </View>
            </View>))}
            {typing && <View style={styles.chatL}>
                    <View style={styles.chatLImg}>
                      <Image
                        resizeMode="cover"
                        source={require('../assets/images/avatar.jpg')}
                        style={[styles.chatLImgM]}
                      />
                    </View>

                    <View style={styles.chatInfo}>
                      <Text style={styles.chatInfoTitle}>
                        <OctIcon name="kebab-horizontal" size={30} color="#8e8f91" /> 
                      </Text>

                    </View>
                  </View>}
        </View>
      </ScrollView>


      <View style={styles.chatTypeBox}>
        <View style={styles.chatTypeInputWrap}>
          <TouchableOpacity style={styles.chatTypeTool}>
            <IonIcon name="add-circle-outline" size={34} color="#abacb1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatTypeTool}>
            <OctIcon name="smiley" size={27} color="#8e8f91" />
          </TouchableOpacity>

          <TextInput
            placeholderTextColor="#AFAFAF"
            style={styles.input}
            placeholder="Type your message"
            textContentType="username"
            underlineColorAndroid="transparent"
            multiline={true}
            numberOfLines={10}
            onBlur={()=>{
              socket.emit('singleChatUserTypingStop',{
                chatId: route.params.chatId,
                userId: user.userId,
                toUserId: route.params.toUserId,
              })
            }}
            onFocus={()=>{
              socket.emit('singleChatUserTyping',{
                chatId: route.params.chatId,
                userId: user.userId,
                toUserId: route.params.toUserId,
              })
            }}
            onChangeText={(e) => {setSentMsg(e)}}
          />

          <TouchableOpacity style={styles.chatTypeTool}>
            <MatIcon name="incognito" size={27} color="#8e8f91" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.chatSendBt} onPress={sendMsg}>
          <IonIcon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  chatDateTop: {
    backgroundColor: '#f6f7fb',
    alignItems: 'center',
    flexDirection: 'row',
    height: 44,
    borderRadius: 100,
    justifyContent: 'center',
    paddingHorizontal: 15,
    alignSelf: 'center',
    marginBottom: 25,
  },
  chatDateTopText: {
    fontFamily: 'SFpro-Medium',
    fontSize: 15,
    color: COLORS.blue,
  },
  chatBody: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flex: .9,
  },
  chatLImg: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    borderRadius: 100,
  },
  chatLImgM: {
    width: '100%',
    height: '100%',
  },
  chatL: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
  },
  chatR: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  chatInfo: {
    backgroundColor: '#e9edf6',
    borderRadius: 12,
    borderTopLeftRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 8,
    maxWidth: '60%',
  },
  chatInfoR: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#d6ebfe',
    borderRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 3,
    marginRight: 8,
    maxWidth: '60%',
  },
  chatInfoTitle: {
    fontFamily: 'SFpro-Medium',
    fontSize: 15,
    color: '#666a73',
  },
  chatInfoTime: {
    color: '#a3a4a9',
    fontFamily: 'SFpro-Regular',
    fontSize: 12,
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  chatTypeBox: {
    flex: .1,
    borderTopColor: '#b0b0b0',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  chatTypeInputWrap: {
    backgroundColor: '#f1f5f8',
    height: 48,
    borderRadius: 100,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
  },
  chatTypeTool: {
    marginRight: 8,
  },
  input: {
    width: '65%',
  },
  chatSendBt: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
