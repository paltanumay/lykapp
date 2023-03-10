import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../global/globalColors';
import Footer from '../components/Footer';
import ChatList from './Chatlist';
import CallList from './CallList';
import Postlist from './Postlist';
import Header from '../components/Header';

const DATA = [
  {
    image: require('../assets/images/avatar.jpg'),
    title: 'Curabitur arcu',
    subtitle: 'Pellentesque in ipsum id orci porta',
    date: 'July 15',
  },
  {
    image: require('../assets/images/avatar.jpg'),
    title: 'Praesent sapien',
    subtitle: 'massa, convallis a pellentesque nec',
    date: 'July 15',
  },
  {
    image: require('../assets/images/avatar.jpg'),
    title: 'Quisque velit',
    subtitle: 'nisi, pretium ut lacinia in',
    date: 'July 15',
  },
  {
    image: require('../assets/images/avatar.jpg'),
    title: 'Curabitur',
    subtitle: 'aliquet quam id dui posuere',
    date: 'July 15',
  },
];

export default function Chatnpost() {
  const [activeTab, setActiveTab] = useState('a');
  return (
    <>
      <Header isBack={true} />
      <View style={styles.chatPostContainer}>
        <View style={styles.tabWrap}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'a' ? styles.tabActive : '']}
            onPress={() => setActiveTab('a')}>
            <Text
              style={
                activeTab === 'a' ? [styles.tabActiveText] : [styles.tabText]
              }>
              My Chats
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'b' ? styles.tabActive : '']}
            onPress={() => setActiveTab('b')}>
            <Text
              style={
                activeTab === 'b' ? [styles.tabActiveText] : [styles.tabText]
              }>
              My Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'c' ? styles.tabActive : '']}
            onPress={() => setActiveTab('c')}>
            <Text
              style={
                activeTab === 'c' ? [styles.tabActiveText] : [styles.tabText]
              }>
              My Calls
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabContentWrap}>
          {activeTab === 'a' ? (
            <View style={styles.myChatsWrap}>
              <ChatList />
            </View>
          ) : activeTab === 'b' ? (
            <View style={styles.myPostsWrap}>
              <Postlist />
            </View>
          ) : activeTab === 'c' ? (
            <View style={styles.myPostsWrap}>
              <CallList />
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  chatPostContainer: {
    // backgroundColor: '#e7ebf6',
    backgroundColor: '#fff',
    flex: 1,
  },
  tabWrap: {
    backgroundColor: '#f6f7fb',
    borderRadius: 100,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  tab: {
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '31%',
    borderRadius: 100,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tabText: {
    fontFamily: 'SFpro-Bold',
    color: '#333',
  },
  tabActiveText: {
    color: COLORS.blue,
    fontFamily: 'SFpro-Bold',
  },
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
});
