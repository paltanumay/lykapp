import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  Pressable,
  PermissionsAndroid,
} from 'react-native';
import React, { Component, useEffect, useState, useRef, useContext } from 'react';
import { globalStyles } from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import Gmodal from '../shared/Gmodal';
import { Buffer } from 'buffer';
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
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import HeaderChat from '../components/HeaderChat';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const CHAT_LOG = `${API_URL}/gtsngchtmsgs`;
export const UPLOAD_IMG = 'https://api.lykapp.com/lykjwt/index.php?/Chatpost/uploadImage';
const CHAT_LOG_SHORT = '5S2rYn';
export const TEMP_ID_PREFIX = '9xxxxxxxxxxxxxxxxxxxxxxx';
const offset = 0,
  limit = 25;

  // const EmojiPicker = require('react-native-emoji-picker');

export default function Chatdetails() {
  const [imgUrl, setImgUrl] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { typing, reload, reconnect } = useContext(SocketContext);
  const scrollRef = useRef();
  const [user, setUser] = useState();
  const [logs, setLogs] = useState([]);
  const [sentMsg, setSentMsg] = useState();
  const [refresh, setRefresh] = useState();
  const xorWithKey = (a, key) => {
    let out = new Array(a.length);
    for (let i = 0; i < a.length; i++) {
      out[i] = a[i] ^ key[i % key.length];
    }
    return out;
  };
  const sendMsg = () => {
    console.log(
      route.params.chatId + user.userId + route.params.toUserId + sentMsg,
    );
    encMsg = route.params.chatId + '<->' + sentMsg;
    const s = x => {
      return x.charCodeAt();
    };
    let currentUserId = getEncUserId(route.params.toUserId);
    let enc = Buffer.from(
      xorWithKey(encMsg.split('').map(s), currentUserId.split('').map(s)),
      'utf-8',
    ).toString('base64');
    console.log('enc msg=>' + enc);
    let params = {
      type: 'single_chat_msg_sent',
      chatId: route.params.chatId,
      tempId: TEMP_ID_PREFIX + new Date().getTime(),
      myName: user.firstName,
      chatType: 'solo',
      userId: user.userId,
      toUserId: route.params.toUserId,
      msgText: sentMsg,
      msgTalk: enc,
      msgTime: new Date().getTime(),
      isReply: false,
      isDisappearing: false,
      enc: true,
      replyToMsg: { __rec: 'single_chat_reply_message' },
    };
    if (imgUrl) params = { ...params, imageUrl: imgUrl };
    socket.emit('singleChatMessage', params);
    //reconnect();
    socket.emit('singleChatUserTypingStop', {
      chatId: route.params.chatId,
      userId: user.userId,
      toUserId: route.params.toUserId,
    });
    setRefresh(!refresh);
    setModalVisible(false);
    setImgUrl();
  };
  useEffect(() => {
    async function getLogs() {
      let userDetails = await AsyncStorage.getItem('userId');
      userDetails = JSON.parse(userDetails);
      setUser(userDetails);
      let token =
        (await AsyncStorage.getItem('token')) +
        '-' +
        CHAT_LOG_SHORT +
        '-' +
        getEncTokenAnyUserId(userDetails.userId);
      axios
        .post(
          CHAT_LOG,
          {
            userId: getEncUserId(userDetails.userId),
            chatId: route.params.chatId,
            limit: limit,
            offset: offset,
          },
          {
            headers: {
              token: token,
            },
          },
        )
        .then(
          res => {
            if (userDetails.userId === route.params.toUserId)
              setLogs(res.data.response.messages);
            else setLogs(res.data.response.messages.reverse());
            res.data.response.messages
              ?.filter(o => !o.seen)
              .forEach(ele => {
                let params = {
                  type: 'single_chat_msg_read',
                  msgId: ele.msgId,
                  delivered: true,
                  chatId: ele.chatId,
                  tempId: TEMP_ID_PREFIX + new Date().getTime(),
                  myName: ele.firstName,
                  chatType: 'solo',
                  userId: ele.userId,
                  toUserId: ele.toUserId,
                  msgText: ele.msgText,
                  msgTalk: ele.msgTalk,
                  msgTime: new Date().getTime(),
                  isReply: false,
                  isDisappearing: false,
                  enc: true,
                  replyToMsg: { __rec: 'single_chat_reply_message' },
                  sent: true,
                  seen: true,
                };
                socket.emit('singleChatSeenMessage', params);
              });
          },
          err => {
            alert(err + userDetails.userId + token);
          },
        );
    }
    getLogs();
  }, [refresh, reload]);
  const uploadProgress = ProgressEvent => {
    console.log(ProgressEvent.total);
  };
  const handlePress = async () => {
    setModalVisible(false);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Access Storage',
          message: 'Access Storage for the pictures',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use read from the storage');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        console.log('response', JSON.stringify(res));
        uploadFile(res.assets[0]);
      }
    });
  };
  const handleCameraRoll = () => {
    setModalVisible(false);
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        uploadFile(res.assets[0]);
      }
    });
  };
  const uploadFile = file => {
    let formdata = new FormData();
    formdata.append('image', {
      name: 'image',
      type: file.type,
      uri: file.uri,
    });
    axios
      .post(UPLOAD_IMG, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: uploadProgress,
      })
      .then(
        res => {
          //alert(JSON.stringify(res.data.response.imageUrl ))
          setImgUrl(res.data.response.imageUrl);
          setModalVisible(true);
        },
        err => {
          console.log(err);
        },
      );
  };
  return (
    <View style={{flex:1}}>
    <HeaderChat isBack = {true}/>
      <Gmodal />
<View style={{flex:10}}>
      <ScrollView
        ref={scrollRef}
        style={[globalStyles.innerPagesContainerWhite]}
        onContentSizeChange={() => scrollRef.current.scrollToEnd()}>


        <View style={styles.chatBody}>
          {logs &&
            logs.map((ele, i) => (
              <View key={i}>
                {(() => {
                  if (
                    new Date(lastDate).getDate() ==
                    new Date(ele.msgTime).getDate()
                  )
                    return null;
                  else {
                    lastDate = ele.msgTime;
                    return (
                      <View style={styles.chatDateTop}>
                        <Text style={styles.chatDateTopText}>
                          {new Date(ele.msgTime).toDateString()}
                        </Text>
                      </View>
                    );
                  }
                })()}

                <View style={styles.chatDetails}>
                  {ele.userId === user.userId ? (
                    <View style={styles.chatR}>
                      <View style={[styles.chatInfoR]}>
                        <Text style={styles.chatInfoTxitle}>{ele.msgText}
                          {ele.imageUrl && <View style={styles.addPhotoWrap}>
                            <Image
                              style={styles.eventImg}
                              source={{
                                uri: 'https://cdn.lykapp.com/newsImages/images/' + ele.imageUrl,
                              }}
                            />
                          </View>}
                        </Text>


                        <Text style={styles.chatInfoTime}>
                          {new Date(ele.msgTime).toLocaleTimeString()}
                        </Text>
                      </View>
                      <View style={styles.chatLImgMain}>
                        <View style={styles.chatLImg}>
                          <Image
                            resizeMode="cover"
                            source={require('../assets/images/music.webp')}
                            style={[styles.chatLImgM]}
                          />
                        </View>

                        <IonIcon
                          name={
                            ele.seen || ele.delivered
                              ? 'checkmark-done'
                              : 'checkmark-outline'
                          }
                          size={22}
                          color={ele.seen ? COLORS.blue : null}
                        />
                      </View>
                    </View>
                  ) : (
                    <View style={styles.chatL}>
                      <View style={styles.chatLImg}>
                        <Image
                          resizeMode="cover"
                          source={require('../assets/images/avatar.jpg')}
                          style={[styles.chatLImgM]}
                        />
                      </View>

                      <View style={styles.chatInfo}>
                        <Text style={styles.chatInfoTitle}>
                          {ele.msgText}
                          {typing}
                          {ele.imageUrl && <View style={styles.addPhotoWrap}>
                            <Image
                              style={styles.eventImg}
                              source={{
                                uri: 'https://cdn.lykapp.com/newsImages/images/' + ele.imageUrl,
                              }}
                            />
                          </View>}
                        </Text>

                        <Text style={styles.chatInfoTime}>
                          {new Date(ele.msgTime).toLocaleTimeString()}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ))}
          {typing && (
            <View style={styles.chatL}>
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
            </View>
          )}
        </View>
      </ScrollView>
</View>
      <View style={styles.chatTypeBox}>
        <View style={styles.chatTypeInputWrap}>
          <TouchableOpacity
            style={styles.chatTypeTool}
            onPress={() => setModalVisible(true)}>
            <IonIcon name="add-circle-outline" size={34} color="#abacb1" />
          </TouchableOpacity>

{/*           
          <View style={styles.container}>
        <EmojiPicker 
          style={styles.emojiPicker} 
          onEmojiSelected={this._emojiSelected}/>
      </View> */}

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
            onBlur={() => {
              socket.emit('singleChatUserTypingStop', {
                chatId: route.params.chatId,
                userId: user.userId,
                toUserId: route.params.toUserId,
              });
            }}
            onFocus={() => {
              socket.emit('singleChatUserTyping', {
                chatId: route.params.chatId,
                userId: user.userId,
                toUserId: route.params.toUserId,
              });
            }}
            onChangeText={e => {
              setSentMsg(e);
            }}
          />

          <TouchableOpacity style={styles.chatTypeTool}>
            <MatIcon name="incognito" size={27} color="#8e8f91" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.chatSendBt} onPress={sendMsg}>
          <IonIcon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      
      {modalVisible && 
          <View style={styles.centeredView}>
          
              <TouchableOpacity
                style={styles.centeredViewInner}
                activeOpacity={1}
                onPressOut={() => { setModalVisible(false) }}
              >
                <View style={styles.modalView}>
                <View style={styles.lcgWrap}>
                  <TouchableOpacity style={styles.addMod}>
                    <Image
                      resizeMode="cover"
                      source={require('../assets/images/location.png')}
                      style={[styles.locationIcon]}
                    />
                    <Text style={styles.locationTxt}>Location</Text>
                  </TouchableOpacity>

                  <View style={styles.addMod}>
                    <TouchableOpacity onPress={handleCameraRoll}>
                      <Image
                        resizeMode="cover"
                        source={require('../assets/images/camera-new.png')}
                        style={[styles.locationIcon]}
                      />
                      <Text style={styles.locationTxt}>Camera</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.addMod}>
                    <TouchableOpacity onPress={handlePress}>
                      <Image
                        resizeMode="cover"
                        source={require('../assets/images/gallery.png')}
                        style={[styles.locationIcon]}
                      />
                      <Text style={styles.locationTxt}>Gallery</Text>
                    </TouchableOpacity>
                  </View>
</View>

                  {imgUrl && <View style={styles.addPhotoWrapNew}>
                    <Image
                      style={styles.eventImg}
                      source={{
                        uri: 'https://cdn.lykapp.com/newsImages/images/' + imgUrl,
                      }}
                    />
                  </View>}
                </View>
              </TouchableOpacity>
            
            {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
          </View>
          }

    </View>
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
    flex: 0.7,
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
    color: '#333',
  },
  chatSendBt: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInfoTxitle: {
    color: '#5d6770',
  },
  // Modal

  centeredView: {
    flex: 1,
    height:'90%',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 9999,
  },
  centeredViewInner: {
   // backgroundColor: 'rgba(0, 0, 0, 0.8)',
    height: '100%',
    justifyContent: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 8,
    width:'94%'
  },
  modalView: {
   // paddingTop: 30,
    width: '100%',
    flexDirection: 'column',
    
    // paddingBottom: 20,

    backgroundColor: 'white',
    borderRadius:13,


    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  lcgWrap:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 55,
    paddingVertical:20,
  },
  addPhotoWrapNew:{
    width:'100%',
    height:150
  },
  linearGradient: {
    padding: 35,
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationIcon: {
    width: 44,
    height: 44,
  },
  locationTxt: {
    color: '#5d6770',
    fontFamily: 'SFpro-Medium',
  },
  addMod: {
    marginHorizontal: 15
  },
  addPhotoWrap: {
    backgroundColor: '#dbe0e6',
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventImg: {
    width: '100%',
    height: '100%',
  },
});
