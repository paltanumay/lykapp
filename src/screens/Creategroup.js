import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {globalStyles} from '../global/globalStyle';
import COLORS from '../global/globalColors';
import Header from '../components/Header';
import LinearGradient from 'react-native-linear-gradient';

import AntIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import HeaderWithTitle from '../components/HeaderWithTitle';

export default class Creategroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: ['My Family', 'Invite All'],
      checked: 0,
    };
  }
  render() {
    return (
        <>
         <HeaderWithTitle isBack= {true}/>
      <View style={globalStyles.innerPagesContainerWhite}>
        <View style={styles.addGroupNamewrap}>
          <View style={styles.addGroupImage}>
            <FIcon name="camera" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.addGroupNameInner}>
            <View style={styles.addGroupName}>
              <TextInput
                placeholderTextColor="#656a6e"
                style={styles.input}
                placeholder="Add group name"
                textContentType="username"
              />
            </View>
            <Text style={styles.addGroupNametext}>
              Add group name & optional group photo
            </Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <FIcon name="search" size={25} color="#ccc" />
          <TextInput
            placeholderTextColor="#ccc"
            style={styles.input}
            placeholder="Search"
            textContentType="username"
          />
        </View>

        <View style={styles.radioMainWrap}>
          {this.state.radioBtnsData.map((data, key) => {
            return (
              <View key={key}>
                {this.state.checked == key ? (
                  <TouchableOpacity style={styles.btn}>
                    <Image
                      style={styles.img}
                      source={require('../assets/images/rb_unselected.png')}
                    />
                    <Text style={styles.btntext}>{data}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({checked: key});
                    }}
                    style={styles.btn}>
                    <Image
                      style={styles.img}
                      source={require('../assets/images/rb_selected.png')}
                    />
                    <Text style={styles.btntext}>{data}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>
      <View style={styles.createGroupWrap}>
      <TouchableOpacity style={[globalStyles.gradBt, {width:'90%'}]} onPress={() => navigation.push('Country')}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={['#037ee5', '#15a2e0', '#28cad9']}
                style={globalStyles.linearGradient}>
                <Text style={globalStyles.buttonText}>Create Group</Text>
              </LinearGradient>
            </TouchableOpacity>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  addGroupNamewrap: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  addGroupImage: {
    backgroundColor: '#f6f7fb',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  addGroupName: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    width: '100%',
    height: 47,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  input: {
    fontFamily: 'SFpro-Regular',
    fontSize: 16,
    width: '100%',
  },
  addGroupNameInner: {
    width: '80%',
  },
  addGroupNametext: {
    color: '#9fa0a6',
    fontFamily: 'SFpro-Regular',
    marginTop: 8,
  },
  searchBar: {
    borderTopColor: '#e6e6e6',
    borderBottomColor: '#e6e6e6',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingRight: 25,
  },
  radioMainWrap: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 10,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    // backgroundColor:'red'
  },
  btn: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
  },
  btntext: {
    fontSize: 16,
    fontFamily: 'SFpro-Regular',
  },
  img: {
    height: 25,
    width: 25,
    marginRight: 8,
    tintColor: 'gray',
  },
  createGroupWrap:{
    backgroundColor:'#fff',
    alignItems:'center',
    flex:1
  }
});
