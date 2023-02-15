import {StyleSheet, Platform} from 'react-native';
import COLORS from './globalColors';

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    height:38,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    fontSize: 14,
  //  fontFamily: 'Gill Sans',
   textAlign: 'center',
   margin: 10,
   position:'relative',
   top:-2,
   color: '#fff',
   backgroundColor: 'transparent',
   fontFamily: 'SFpro-Regular',
  },
  gradBt: {
    width: '60%',
    marginTop: 11,
  },
  lineBt: {
    borderRadius: 100,
    height: 42,
    borderWidth: 1,
    borderColor: COLORS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  lineBtText: {
    color: '#333',
  },
  innerPagesContainer: {
    flex: 10,
    backgroundColor: '#e7ebf6',
  },
  innerPagesContainerWhite: {
    backgroundColor: '#fff',
    flex: 10,
  },
});
