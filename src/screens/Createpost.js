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

import FIcon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';

export default class Createpost extends Component {
  render() {
    return (
      <>
        <View style={styles.postBox}>
          <View style={styles.postBoxHead}>
            <View style={styles.postBoxImgWrap}>
              <Image
                resizeMode="cover"
                source={require('../assets/images/avatar.jpg')}
                style={[styles.postBoxImg]}
              />
            </View>

            <Text style={styles.listInfoTitle}>Shubham sarkar</Text>
          </View>

          <View style={styles.postBody}>
            <TextInput
              placeholderTextColor="#AFAFAF"
              style={styles.input}
              placeholder="Type your update here"
              textContentType="username"
              underlineColorAndroid="transparent"
              multiline={true}
              numberOfLines={10}
            />
          </View>
        </View>

        <View style={styles.postBoxOptions}>
          <View style={styles.postBoxShareOptions}>
            <TouchableOpacity style={styles.shareOptions}>
              <IonIcon name="ios-earth-outline" size={25} color="#abacb1" />
              <Text style={styles.shareOptionsText}>Public</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOptions}>
              <IonIcon name="ios-people-outline" size={25} color="#abacb1" />
              <Text style={styles.shareOptionsText}>My Connec..</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOptions}>
              <IonIcon name="ios-people-outline" size={25} color="#abacb1" />
              <Text style={styles.shareOptionsText}>My Family</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.morePostTools}>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <IonIcon name="image-outline" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <FIcon name="camera" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <FIcon name="video" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <FIcon name="map-pin" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <FIcon name="calendar" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <FIcon name="smile" size={25} color="#abacb1" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.morePostToolsItem}>
              <Text style={styles.goLiveText}>Go Live</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  postBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  postBoxImgWrap: {
    width: 50,
    height: 50,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postBoxHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  postBoxImg: {
    width: '100%',
    height: '100%',
  },
  listInfoTitle: {
    fontSize: 16,
    fontFamily: 'SFpro-Bold',
    color: '#333436',
    marginLeft: 15,
  },
  input: {
    //height:18
    textAlignVertical: 'top',
    alignItems: 'flex-start',
  },
  postBoxShareOptions: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postBoxOptions: {
    backgroundColor: '#fff',
    padding: 15,
  },
  shareOptions: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#f6f7f9',
    height: 44,
    borderRadius: 100,

    paddingHorizontal: 8,
  },
  shareOptionsText: {
    color: '#7f8289',
    fontFamily: 'SFpro-Regular',
    marginLeft: 5,
    fontSize: 13,
  },
  morePostToolsItem:{
    marginRight:15
  },
  morePostTools: {
    marginTop:30,
    alignItems: 'center',
    flexDirection: 'row',
    
  },
  goLiveText:{
    color:COLORS.blue,
    fontFamily: 'SFpro-Bold',
    textTransform:'uppercase'

  }
});
