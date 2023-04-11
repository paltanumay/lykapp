import React from 'react';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {HomeContext} from '../shared/homeFeedCotext';

const OtherPostThreeDot = ({popUpOpen, setPopUpOpen, details}) => {
  const {setPostDetails} = useContext(HomeContext);
  return (
    <>
      {details?.createdBy?.isFriend ? (
        <MenuOption
          value={1}
          style={styles.shareWrapInner}
          onSelect={() => setPopUpOpen('unfriend')}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/unfriend.png')}
            style={styles.likeShareImg}
          />
          <Text style={styles.shareText}>Unfriend</Text>
        </MenuOption>
      ) : (
        <MenuOption
          value={1}
          style={styles.shareWrapInner}
          onSelect={() => {
            setPopUpOpen('connect');
            setPostDetails(details);
          }}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/connect.png')}
            style={styles.likeShareImg}
          />
          <Text style={styles.shareText}>Connect</Text>
        </MenuOption>
      )}
      <MenuOption
        value={2}
        style={styles.shareWrapInner}
        onSelect={() => {
          setPopUpOpen('mute');
          setPostDetails(details);
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/mute.png')}
          style={styles.likeShareImg}
        />
        <Text style={styles.shareText}>Mute</Text>
      </MenuOption>
      <MenuOption
        value={2}
        style={styles.shareWrapInner}
        onSelect={() => {
          setPopUpOpen('hide');
          setPostDetails(details);
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/hide.png')}
          style={styles.likeShareImg}
        />
        <Text style={styles.shareText}>Hide</Text>
      </MenuOption>
      <MenuOption
        value={2}
        style={styles.shareWrapInner}
        onSelect={() => {
          setPopUpOpen('block');
          setPostDetails(details);
        }}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/block_user.png')}
          style={styles.likeShareImg}
        />
        <Text style={styles.shareText}>Block & Report User</Text>
      </MenuOption>
      <MenuOption
        value={2}
        style={styles.shareWrapInner}
        onSelect={() => setPopUpOpen('report')}>
        <Image
          resizeMode="contain"
          source={require('../assets/images/report.png')}
          style={styles.likeShareImg}
        />
        <Text style={styles.shareText}>Report Post</Text>
      </MenuOption>
      <MenuOption
        value={2}
        style={styles.shareWrapInner}
        // onSelect={handleShare}
      >
        <Image
          resizeMode="contain"
          source={require('../assets/images/cancel.png')}
          style={[styles.likeShareImg]}
        />
        <Text style={styles.shareText}>Cancel</Text>
      </MenuOption>
    </>
  );
};

const styles = StyleSheet.create({
  shareWrapInner: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  likeShareImg: {
    width: 26,
    height: 26,
  },
  shareWrap: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    backgroundColor: '#fff',
    width: 150,
    padding: 10,
    position: 'absolute',
    bottom: -80,
    right: 25,
  },
  shareText: {
    color: '#000',
    fontSize: 15,
    paddingLeft: 10,
  },
});

export default OtherPostThreeDot;
