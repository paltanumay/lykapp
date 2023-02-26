import React from 'react';
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import CommentHeader from '../../components/commentHeader';
import COLORS from '../../global/globalColors';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const MyReferral = () => {
  return (
    <>
      <CommentHeader name="My Referrals" />
      <ScrollView style={styles.background}>
        <View style={styles.placeHolder}>
          <View style={styles.connectionPlaceWrapper}>
            <Icon name="list-circle-outline" size={40} color={COLORS.blue} />
            <Text style={styles.conString}>More connections</Text>
            <Text style={styles.conPara}>
              You haven't made any connections yet. Connect with friends and
              LYKminded people to share what you want with privacy.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.customShareLink}>
        <View style={styles.linkHeading}>
          <Text style={styles.headingText}>Share your Referral Link</Text>
        </View>
        <View style={styles.copyLink}>
          <Text style={styles.link}>https://www.lykapp.com/ref/sidMIHD</Text>
          <Pressable>
            <Icon name="share-outline" size={20} color="#585858" />
          </Pressable>
        </View>
        <View style={styles.CustomCon}>
          <Text style={styles.customYourLink}>Customize Your Link</Text>
        </View>
      </View>
    </>
  );
};

export default MyReferral;

const styles = StyleSheet.create({
  customShareLink: {
    width: width,
    height: 130,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linkHeading: {
    width: '100%',
    height: 25,
    backgroundColor: COLORS.blue,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  headingText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  copyLink: {
    width: width - 20,
    height: 45,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.grayBorder,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  CustomCon: {
    width: '100%',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customYourLink: {
    fontSize: 16,
    color: COLORS.blue,
    fontWeight: '700',
  },
  link: {
    fontSize: 14,
  },
  placeHolder: {
    width: width,
    // height: height,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  connectionPlaceWrapper: {
    width: width - 50,
    minHeight: 100,
    marginTop: 150,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  conString: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '700',
  },
  conPara: {
    fontSize: 12,
    width: 250,
    textAlign: 'center',
    marginTop: 5,
  },
  background: {
    backgroundColor: '#e6f2ff',
  },
});
