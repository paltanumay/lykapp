import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Alert, TextInput, Button, Text, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import InCallManager from 'react-native-incall-manager';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const API_URL = process.env.API_URL || 'https://socket.lykapp.com:8443';
export const SEND_AUDIO_NOTIFICATION = `${API_URL}/sndaudntfy`;
export const UPLOAD_IMG =
  'https://api.lykapp.com/lykjwt/index.php?/Chatpost/uploadImage';
const SEND_AUDIO_NOTIFICATION_SHORT = 'fQtL21J';

export default function CallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  let name;
  let connectedUser;
  const [userId, setUserId] = useState('');
  const [socketActive, setSocketActive] = useState(false);
  const [calling, setCalling] = useState(false);
  // Video Scrs
  const [localStream, setLocalStream] = useState({toURL: () => null});
  const [remoteStream, setRemoteStream] = useState({toURL: () => null});
  //const [conn, setConn] = useState(new WebSocket('http://socket.lykapp.com:8443'));
  const [yourConn, setYourConn] = useState(
    //change the config as you need
    new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }),
  );

  const [offer, setOffer] = useState(null);

  const [callToUsername, setCallToUsername] = useState(route.params.toUserId);

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('userId').then(id => {
        //console.log(id);
        let userDetails = JSON.parse(id);
        if (id) {
          setUserId(userDetails.userId);
          socket.emit('mediaCallJoinRoom', userDetails.userId.toString());
        } else {
          setUserId('');
          navigation.push('Login');
        }
      });
    }, [userId]),
  );

  useEffect(() => {
    navigation.setOptions({
      title: 'Your ID - ' + userId,
      headerRight: () => (
        <Button
          mode="text"
          onPress={onLogout}
          style={{paddingRight: 10}}
          title="Logout"
        />
      ),
    });
  }, [userId]);

  /**
   * Calling Stuff
   */

  useEffect(() => {
    if (userId && userId.length > 0) {
      try {
        InCallManager.start({media: 'audio'});
        InCallManager.setForceSpeakerphoneOn(true);
        InCallManager.setSpeakerphoneOn(true);
      } catch (err) {
        console.log('InApp Caller ---------------------->', err);
      }

      console.log(InCallManager);

      send({
        type: 'login',
        name: userId,
      });
    }
  }, [userId]);

  const onLogin = () => {};

  //when we got a message from a signaling server
  const onmessage = msg => {
    let data;
    console.log('from socket' + msg);
    if (msg.data === 'Hello world') {
      data = {};
    } else {
      data = msg;
      console.log('Data --------------------->', data);
      switch (data.type) {
        case 'login':
          console.log('Login');
          break;
        //when somebody wants to call us
        case 'offer':
          handleOffer(data.offer, data.name);
          console.log('Offer');
          break;
        case 'answer':
          handleAnswer(data.answer);
          console.log('Answer');
          break;
        //when a remote peer sends an ice candidate to us
        case 'candidate':
          handleCandidate(data.candidate);
          console.log('Candidate');
          break;
        case 'leave':
          handleLeave();
          console.log('Leave');
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    /**
     *
     * Sockets Signalling
     */
    socket.on('mediaMessage', onmessage);

    /**
     * Socjket Signalling Ends
     */

    let isFront = false;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          // Got stream!
          setLocalStream(stream);

          // setup stream listening
          yourConn.addStream(stream);
        })
        .catch(error => {
          // Log error
        });
    });

    yourConn.onaddstream = event => {
      console.log('On Add Stream', event);
      setRemoteStream(event.stream);
    };

    // Setup ice handling
    yourConn.onicecandidate = event => {
      if (event.candidate) {
        send({
          type: 'candidate',
          candidate: event.candidate,
          toUserId: connectedUser ? connectedUser : route.params.toUserId,
        });
        console.log('candidate' + event + connectedUser);
        //handleCandidate(event.candidate);
      }
    };
    yourConn.onconnectionstatechange = event => {
      if (yourConn.connectionState === 'connected') {
        console.log('Successfully connected with other peer');
      }
    };
    yourConn.onSignalingState = state => {
      console.log('state changed' + state);
    };
  }, []);

  const send = message => {
    //attach the other peer username to our messages
    if (connectedUser) {
      message.name = userId;
      //console.log('Connected iser in end----------', message);
    }

    socket.emit('mediaMessage', message);
  };

  const onCall = async () => {
    setCalling(true);

    connectedUser = callToUsername;
    console.log('Caling to', callToUsername);
    let userDetails = await AsyncStorage.getItem('userId');
    userDetails = JSON.parse(userDetails);
    let isVideo = true;
    let token =
      (await AsyncStorage.getItem('token')) +
      '-' +
      SEND_AUDIO_NOTIFICATION_SHORT +
      '-' +
      getEncTokenAnyUserId(userDetails.userId);
    yourConn.createOffer().then(offer => {
      yourConn.setLocalDescription(offer).then(() => {
        axios
          .post(
            SEND_AUDIO_NOTIFICATION,
            {
              toUserId: getEncUserId(callToUsername),
              type: 'startcall',
              media: isVideo ? 'video' : 'audio',
              payload: offer,
              fromUserId: getEncUserId(userDetails.userId),
              incomingCallerName: userDetails.firstName,
              incomingCallerImage: userDetails.img,
            },
            {
              headers: {
                token: token,
              },
            },
          )
          .then(res => {
            // create an offer
            //console.log(JSON.stringify(res))
            console.log('Sending Ofer');
            //console.log(offer);
            // Send pc.localDescription to peer
          })
          .catch(err => {
            alert('error :' + err);
          });
        send({
          type: 'offer',
          offer: offer,
          toUserId: connectedUser,
        });
      });
    });
  };

  //when somebody sends us an offer
  const handleOffer = async (offer, name) => {
    console.log(name + ' is calling you.');

    console.log('Accepting Call===========>', offer);
    connectedUser = name;

    try {
      await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await yourConn.createAnswer();

      await yourConn.setLocalDescription(answer);
      send({
        type: 'answer',
        answer: answer,
        toUserId: connectedUser,
      });
    } catch (err) {
      console.log('Offerr Error', err);
    }
  };

  //when we got an answer from a remote user
  const handleAnswer = answer => {
    yourConn.setRemoteDescription(new RTCSessionDescription(answer));
  };

  //when we got an ice candidate from a remote user
  const handleCandidate = candidate => {
    setCalling(false);
    console.log('Candidate ----------------->', candidate);
    if (yourConn.localDescription)
      yourConn
        .addIceCandidate(new RTCIceCandidate(candidate))
        .catch(error => console.log(error));
  };

  //hang up
  const hangUp = () => {
    send({
      type: 'leave',
    });

    handleLeave();
  };

  const handleLeave = () => {
    connectedUser = null;
    setRemoteStream({toURL: () => null});

    yourConn.close();
    // yourConn.onicecandidate = null;
    // yourConn.onaddstream = null;
  };

  const onLogout = () => {
    // hangUp();

    AsyncStorage.removeItem('userId').then(res => {
      navigation.push('Login');
    });
  };

  const acceptCall = async () => {
    console.log('Accepting Call===========>', offer);
    connectedUser = offer.name;

    try {
      await yourConn.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await yourConn.createAnswer();

      await yourConn.setLocalDescription(answer);

      send({
        type: 'answer',
        answer: answer,
      });
    } catch (err) {
      console.log('Offerr Error', err);
    }
  };
  const rejectCall = async () => {
    send({
      type: 'leave',
    });
    ``;
    setOffer(null);

    handleLeave();
  };

  /**
   * Calling Stuff Ends
   */

  return (
    <View style={styles.root}>
      <View style={styles.topTitle}>
        <View style={styles.pro}>
          <Image
            style={styles.proIcon}
            source={require('../assets/images/avatar.jpg')}
          />
        </View>
        <View style={styles.topTitleInfo}>
          <Text style={styles.topTitleInfoText}>Srijan roy</Text>
          <Text style={styles.topTitleInfoText}>0:13</Text>
        </View>
      </View>
      <View style={styles.floatTools}>
        <TouchableOpacity style={styles.tools}>
          <MIcon name="videocam" size={22} color={COLORS.blue} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tools}>
          <FIcon name="microphone" size={22} color={COLORS.blue} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.tools}>
          <IonIcon
            name="camera-reverse-outline"
            size={22}
            color={COLORS.blue}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.redtools}>
          <IonIcon name="call" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.inputField}>
        <TextInput
          label="Enter Friends Id"
          mode="outlined"
          style={{marginBottom: 7}}
          onChangeText={text => setCallToUsername(text)}
        />
        <View style={{flex: 1, backgroundColor: 'green', flexDirection: 'row'}}>
          <Button
            mode="contained"
            onPress={onCall}
            loading={calling}
            //   style={styles.btn}
            contentStyle={styles.btnContent}
            title="Call"
          />

          <Button
            mode="contained"
            onPress={onCall}
            loading={calling}
            //   style={styles.btn}
            contentStyle={styles.btnContent}
            title="Call"
          />

          <Button
            mode="contained"
            onPress={onCall}
            loading={calling}
            //   style={styles.btn}
            contentStyle={styles.btnContent}
            title="Call"
          />

          <Button
            mode="contained"
            onPress={onCall}
            loading={calling}
            //   style={styles.btn}
            contentStyle={styles.btnContent}
            title="Call"
          />
        </View>
      </View> */}

      <View style={styles.videoContainer}>

      
        <View style={[styles.smallVideowrap]}>
          {/* <Text>Your Video</Text> */}
          <RTCView streamURL={localStream.toURL()} style={styles.smallVideo} />
        </View>


        <View style={[styles.remoteVideos]}>
          <TouchableOpacity>
            <RTCView
              streamURL={remoteStream.toURL()}
              style={styles.localVideo}
            />
          </TouchableOpacity>
          {/* <Text>Friends Video</Text> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: ' #ccc',
    flex: 1,
    position:'relative'
    // padding: 20,
  },
  inputField: {
    marginBottom: 10,
    flexDirection: 'column',
  },
  videoContainer: {
    flex: 1,
   // minHeight: 450,
    position: 'relative',
  },
  // videos: {
  //   width: '100%',
  //   flex: 1,
  //   position: 'relative',
  //   overflow: 'hidden',

  //   borderRadius: 6,
  // },
  // localVideos:{
  //   position: 'absolute',
  //   height: '100%',
  //   height: '100%',
  // },
  smallVideowrap:{
    position: 'absolute',
    width: 127,
    height: 165,
    bottom:200,
    right: 25,
  },
  smallVideo: {
    backgroundColor: 'red',
    position: 'absolute',
    width: 127,
    height: 165,
   
    zIndex: 9999,
  },
  remoteVideos: {
    height: '100%',
    height: '100%',
    // backgroundColor: '#ccc',
  },

  // remoteVideo: {
  //   backgroundColor: 'red',
  //   flex: 1,
  //   height: '100%',
  //   width: '100%',
  // },

  btnContent: {
    width: 40,
    height: 40,
    width: 40,
    borderRadius: 100,
    // position:'absolute'
  },
  floatTools: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 100,
    zIndex: 999,
  },
  tools: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  redtools: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  topTitle:{
    flexDirection:'row',
    alignItems:'center',
    padding:20,
    position:'absolute',
    left:0,
    top:0
  },
  proIcon:{
    width:40,
    height:40,
    borderRadius:100
  },
  pro:{
marginRight:10,

  },
  topTitleInfoText:{
    color:'#333'
  },
  remoteVideo:{
    height:'100%',
    width:'100%'
  }
});
