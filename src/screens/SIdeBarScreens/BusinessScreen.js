/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import CommentHeader from '../../components/commentHeader';
import COLORS from '../../global/globalColors';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import CreateBusinessPage from './CreateBusinessPage';
import CreateBusinessButton from '../../components/sideBarComponents/CreateBusinessButton';
const BusinessScreen = () => {
  const [isCreateBusiness, setCreateBusiness] = useState(false);
  const navigation = useNavigation();
  const onRedirect = () => {
    setCreateBusiness(true);
  };
  return (
    <>
      <CommentHeader
        name={isCreateBusiness ? 'Create business page' : 'Business Pages'}
        isCreateBusiness={isCreateBusiness}
        setCreateBusiness={setCreateBusiness}
      />
      <View>
        {!isCreateBusiness ? (
          <CreateBusinessButton onRedirect={onRedirect} />
        ) : (
          <CreateBusinessPage />
        )}
      </View>
    </>
  );
};

export default BusinessScreen;
