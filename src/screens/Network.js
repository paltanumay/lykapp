import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import CommentHeader from '../components/commentHeader';
import COLORS from '../global/globalColors';
import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');

const Network = () => {
  const [activeTab, setActiveTab] = useState('a');
  const [activeRequestTab, setActiveRequestTab] = useState('a');

  const getRequests = () => {
    return (
      <>
        <View style={styles.requestTabContainer}>
          <Pressable
            onPress={() => {
              setActiveRequestTab('a');
            }}
            style={
              activeRequestTab === 'a'
                ? styles.requestTabSelect
                : styles.requestTab
            }>
            <Text style={styles.tabtext}>Recived request(1)</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setActiveRequestTab('b');
            }}
            style={
              activeRequestTab === 'b'
                ? styles.requestTabSelect
                : styles.requestTab
            }>
            <Text style={styles.tabtext}>Sent request(1)</Text>
          </Pressable>
        </View>
        <ScrollView style={styles.reqList}>
          <View style={styles.reqCard}>
            <View style={styles.imgHolder}>
              <View style={styles.reqImg}></View>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>Ayan Das</Text>
              <View style={styles.action}>
                <View style={styles.actionbtn}>
                  <Icon name="check" size={15} color={COLORS.blue} />
                </View>
                <View style={styles.actionbtn}>
                  <Icon name="delete" size={15} color={COLORS.red} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  return (
    <>
      <CommentHeader name="Network" />
      <View style={styles.invite}>
        <Pressable style={styles.rewords}>
          <View style={styles.icons}></View>
          <View>
            <Text style={styles.btnText}>Invite & Earn Rewords</Text>
          </View>
          <View style={styles.icons}>
            <Icon name="right" size={20} color="#ffffff" />
          </View>
        </Pressable>
      </View>
      <View style={styles.people}>
        <Text style={styles.peopleText}>
          People you may like to connect with
        </Text>
      </View>
      <View style={styles.suggestations}>
        <View style={styles.placeholder}>
          <View style={styles.avetar}></View>
          <Text style={styles.placeholderText}>
            No suggestation found for now
          </Text>
        </View>
        {/* <ScrollView
          style={styles.horScroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}></ScrollView> */}
      </View>
      <View style={styles.toggleButton}>
        <View style={styles.tabWrap}>
          <Pressable
            style={[styles.tab, activeTab === 'a' ? styles.tabActive : '']}
            onPress={() => setActiveTab('a')}>
            <Text
              style={
                activeTab === 'a' ? [styles.tabActiveText] : [styles.tabText]
              }>
              Requests
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === 'b' ? styles.tabActive : '']}
            onPress={() => setActiveTab('b')}>
            <Text
              style={
                activeTab === 'b' ? [styles.tabActiveText] : [styles.tabText]
              }>
              My Connections
            </Text>
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === 'c' ? styles.tabActive : '']}
            onPress={() => setActiveTab('c')}>
            <Text
              style={
                activeTab === 'c' ? [styles.tabActiveText] : [styles.tabText]
              }>
              LYK Favorites
            </Text>
          </Pressable>
        </View>
      </View>
      {getRequests()}
    </>
  );
};

export default Network;

const styles = StyleSheet.create({
  invite: {
    width: '100%',
    height: 60,
    borderBottomColor: '#888888',
    borderBottomWidth: 0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  rewords: {
    width: width - 10,
    height: '70%',
    backgroundColor: COLORS.blue,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  icons: {
    width: 50,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#ffffff',
  },
  people: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    backgroundColor: '#ffffff',
  },
  peopleText: {
    fontSize: 16,
    fontWeight: '500',
  },
  suggestations: {
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  horScroll: {
    backgroundColor: '#f2f2f2',
  },
  placeholder: {
    height: '90%',
    width: 180,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avetar: {
    width: 50,
    height: 50,
    backgroundColor: '#ffdb4d',
    borderRadius: 50,
  },
  placeholderText: {
    fontSize: 11,
    textAlign: 'center',
    width: '70%',
    marginTop: 10,
    color: COLORS.blue,
  },
  toggleButton: {
    width: '100%',
    height: 60,
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabWrap: {
    backgroundColor: '#f6f7fb',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    height: 35,
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
    fontSize: 10,
    fontFamily: 'SFpro-Regular',
    color: '#333',
  },
  tabActiveText: {
    fontSize: 10,
    color: COLORS.blue,
  },
  requestTabContainer: {
    width: '100%',
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    backgroundColor: '#ffffff',
  },
  requestTab: {
    height: 30,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
  },
  requestTabSelect: {
    height: 30,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#0066ff',
    borderBottomWidth: 2,
  },
  tabtext: {
    color: '#595959',
    fontSize: 12,
    fontWeight: '600',
  },
  reqList: {
    backgroundColor: '#ffffff',
  },
  reqCard: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgHolder: {
    height: '100%',
    width: 70,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  reqImg: {
    width: '70%',
    height: '70%',
    borderRadius: 50,
    backgroundColor: COLORS.blue,
  },
  info: {
    height: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#88888820',
    borderBottomWidth: 1,
  },
  name: {
    color: '##595959',
    fontWeight: '600',
  },
  action: {
    marginRight: 20,
    width: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionbtn: {
    width: 30,
    height: 30,
    borderRadius: 50,
    elevation: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
