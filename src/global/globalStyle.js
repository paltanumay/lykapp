import {StyleSheet, Platform} from 'react-native';
import COLORS from './globalColors';

export const globalStyles = StyleSheet.create({
  container: {
     backgroundColor:'red'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 100,
    height:45
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#fff',
    backgroundColor: 'transparent',
    fontFamily: 'Lato-Regular',

  },
  gradBt:{
    width:'60%',
    marginTop:11

  },
  lineBt:{
    borderRadius: 100,
    height:42,
    borderWidth:1,
    borderColor:COLORS.blue,
    alignItems:'center',
    justifyContent:'center',
    width:'30%'
  },
  lineBtText:{
    color:'#333'
  },

});
{
  /* 
<View style={styles.signInListwrapper}></View> 
*/
}
