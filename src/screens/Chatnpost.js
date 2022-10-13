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

import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import Createpost from '../screens/Createpost';
import Createchat from '../screens/Createchat';

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

export default class Chatnpost extends Component {
  render() {
    return (
      <>
        <View style={styles.chatPostContainer}>
          <View style={styles.tabWrap}>
            <TouchableOpacity style={[styles.tab, styles.tabActive]}>
              <Text style={[styles.tabText, styles.tabActiveText]}>
                My Chats
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
              <Text>My Posts</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab}>
              <Text>My Calls</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContentWrap}>
            {/* <View style={styles.myChatsWrap}>
              <Createchat />
            </View> */}

            <View style={styles.myPostsWrap}>
              <Createpost />
            </View>
          </View>
        </View>
        <Footer />
      </>
    );
  }
}

const styles = StyleSheet.create({
  chatPostContainer:{
    backgroundColor:'#e7ebf6',
    flex:10
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
    fontFamily: 'SFpro-Regular',
  },
  tabActiveText: {
    color: COLORS.blue,
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
