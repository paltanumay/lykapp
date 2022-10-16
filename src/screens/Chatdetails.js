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
import React, {Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

import OctIcon from 'react-native-vector-icons/Octicons';
import Footer from '../components/Footer';
import IonIcon from 'react-native-vector-icons/Ionicons';

import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Chatdetails extends Component {
  render() {
    return (
      <View style={globalStyles.innerPagesContainerWhite}>
        <View style={styles.chatBody}>
          <View style={styles.chatDateTop}>
            <Text style={styles.chatDateTopText}>July 15, 2022</Text>
          </View>
          <View style={styles.chatDetails}>
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
                  Proin eget tortor risus. Cras ultricies ligula
                </Text>

                <Text style={styles.chatInfoTime}>11:07 am</Text>
              </View>
            </View>

            <View style={styles.chatR}>
              <View style={[styles.chatInfoR]}>
                <Text style={styles.chatInfoTitle}>Proin eget tortor</Text>

                <Text style={styles.chatInfoTime}>11:07 am</Text>
              </View>
              <View style={styles.chatLImgMain}>
                <View style={styles.chatLImg}>
                  <Image
                    resizeMode="cover"
                    source={require('../assets/images/music.webp')}
                    style={[styles.chatLImgM]}
                  />
                </View>

                <IonIcon name="checkmark-done" size={22} color={COLORS.blue} />
              </View>
            </View>

            <View style={styles.chatL}>
              <View style={styles.chatLImg}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/images/avatar.jpg')}
                  style={[styles.chatLImgM]}
                />
              </View>

              <View style={styles.chatInfo}>
                <Text style={styles.chatInfoTitle}>Posuere !!</Text>

                <Text style={styles.chatInfoTime}>11:07 am</Text>
              </View>
            </View>

            <View style={styles.chatR}>
              <View style={[styles.chatInfoR]}>
                <Text style={styles.chatInfoTitle}>
                  Nulla quis lorem ut libero malesuada feugiat. Quisque velit
                  nisi, pretium ut lacinia in, elementum id enim.
                </Text>

                <Text style={styles.chatInfoTime}>11:07 am</Text>
              </View>

              <View style={styles.chatLImgMain}>
              <View style={styles.chatLImg}>
                <Image
                  resizeMode="cover"
                  source={require('../assets/images/music.webp')}
                  style={[styles.chatLImgM]}
                />
              </View>
              <IonIcon name="checkmark-done" size={22} color={COLORS.blue} />

              </View>
            </View>
          </View>
        </View>

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
            />

            <TouchableOpacity style={styles.chatTypeTool}>
              <MatIcon name="incognito" size={27} color="#8e8f91" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.chatSendBt}>
            <IonIcon name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
    flex: 10,
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
    flex: 1,
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
