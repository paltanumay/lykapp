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

export default class Createchat extends Component {
  render() {
    return (
      <>
        <FlatList
          data={DATA}
          renderItem={({item}) => {
            return (
              <View style={styles.listContainer}>
                <Text style={styles.date}>{item.date}</Text>
                <View style={styles.listImgWrap}>
                  <Image
                    resizeMode="cover"
                    source={item.image}
                    style={styles.listimg}
                  />
                </View>

                <View style={styles.listInfo}>
                  <Text style={styles.listInfoTitle}>{item.title}</Text>
                  <Text style={styles.listInfoSubTitle}>{item.subtitle}</Text>
                </View>
              </View>
            );
          }}
        />
      </>
    );
  }
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
});
