import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {globalStyles} from '../global/globalStyle';
import Header from '../components/Header';
import React, {useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../global/globalColors';
const countries = ['Art', 'Bussiness', 'Sports', 'Pets'];
const lang = ['English', 'Spanish', 'Hindi', 'Urdu'];
const hobbies = ['Reading', 'Music', 'Watching movies', 'Singing'];

export default function ProfileEdit() {
  const [checked, setChecked] = useState(0);
  const [checked1, setChecked1] = useState(0);
  var gender = ['Male', 'Female', 'Shemale'];
  var ethnicity = ['US', 'UK', 'INDIA'];
  return (
    <>
      <Header />

      <View style={globalStyles.innerPagesContainerWhite}>
        <ScrollView>
          <View style={styles.bannerSection}>
          <TouchableOpacity style={{position:'absolute', zIndex:99, bottom:0, left:0}}>
            <Image
                  resizeMode="stretch"
                  source={require('../assets/images/cam.png')}
                  style={[styles.camImg]}
                />
                </TouchableOpacity>
            <Image
              resizeMode="stretch"
              source={require('../assets/images/editProfileBanner.png')}
              style={[styles.editBanner]}
            />
          </View>
          <View style={styles.profileInfoWrapper}>
            <View style={styles.profilePicContainer}>

            <TouchableOpacity style={styles.saveWrap}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/floppyDisk.png')}
                        style={[styles.privacyIcon]}
                      />

                      <Text>Save</Text>
                     
                    </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute', zIndex:11, top:-55, left:'50%'}}>
            <Image
                  resizeMode="stretch"
                  source={require('../assets/images/cam.png')}
                  style={[styles.camImg]}
                />
                </TouchableOpacity>
              <View style={styles.profilePic}>
                <Image
                  resizeMode="stretch"
                  source={require('../assets/images/avatar.jpg')}
                  style={[styles.profilePicImg]}
                />
              </View>
              <View style={styles.profileNameCont}>
                <Text style={styles.profileName}>Vestibulum ante</Text>
                <TouchableOpacity>
                  <Text style={styles.photosEdit}>Tap to photos edit</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.profileForm}>
                <View style={styles.profileFormInner}>
                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>BIRTH DATE</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>BIRTH YEAR</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                      <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>EMAIL</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>PHONE NUMBER</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity style={styles.verifyPh}>
                    <Text style={styles.verifyPhText}>
                      Verify your phone number
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.radioMainWrap}>
                    <Text style={styles.genderText}>Gender</Text>

                    <View>
                      <View style={styles.btn}>
                        {gender.map((gender, key) => {
                          return (
                            <View key={gender}>
                              {checked == key ? (
                                <TouchableOpacity style={styles.btn}>
                                  <Image
                                    style={styles.img}
                                    source={require('../assets/images/on.png')}
                                  />
                                  <Text>{gender}</Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    setChecked(key);
                                  }}
                                  style={styles.btn}>
                                  <Image
                                    style={styles.img}
                                    source={require('../assets/images/off.png')}
                                  />
                                  <Text>{gender}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        })}
                      </View>
                      {/* <Text>{gender[checked]}</Text> */}
                    </View>
                  </View>

                  <View style={styles.dropBox}>
                    <Text style={styles.dropLabelText}>My Interests</Text>
                    <SelectDropdown
                      data={countries}
                      defaultButtonText="Art, Business, Sports, Pets.."
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>

                  <View style={styles.dropBox}>
                    <Text style={styles.dropLabelText}>Faith</Text>
                    <SelectDropdown
                      data={countries}
                      defaultButtonText=""
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>

                  <View style={styles.radioMainWrap}>
                    <Text style={styles.genderText}>Ethnicity</Text>

                    <View>
                      <View style={styles.btn}>
                        {ethnicity.map((ethnicity, key) => {
                          return (
                            <View key={ethnicity}>
                              {checked1 == key ? (
                                <TouchableOpacity style={styles.btn}>
                                  <Image
                                    style={styles.img}
                                    source={require('../assets/images/on.png')}
                                  />
                                  <Text>{ethnicity}</Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  onPress={() => {
                                    setChecked1(key);
                                  }}
                                  style={styles.btn}>
                                  <Image
                                    style={styles.img}
                                    source={require('../assets/images/off.png')}
                                  />
                                  <Text>{ethnicity}</Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        })}
                      </View>
                      {/* <Text>{gender[checked]}</Text> */}
                    </View>
                  </View>

                  <View style={styles.dropBox}>
                    <SelectDropdown
                      data={countries}
                      defaultButtonText=""
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                  <View style={styles.dropBox}>
                    <Text style={styles.dropLabelText}>Language Spoken</Text>
                    <SelectDropdown
                      data={lang}
                      defaultButtonText=""
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                  <TouchableOpacity style={styles.addMore}>
                    <Text style={styles.verifyPhText}>+ Add more</Text>
                  </TouchableOpacity>

                  <View style={styles.dropBox}>
                    <Text style={styles.dropLabelText}>Hobbies</Text>
                    <SelectDropdown
                      data={hobbies}
                      defaultButtonText=""
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>COUNTRY OF BIRTH</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                      
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>CITY OF BIRTH</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>COUNTRY YOU LIVE</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>CITY YOU LIVE</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>MARITAL STATUS</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.inputBoxWithPrivacy}>
                    <View style={styles.birth}>
                      <Text>ANNYVERSARY DATE</Text>
                    </View>
                    <View style={styles.inputBox}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder=""
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <TouchableOpacity style={styles.privacyBox}>
                    <Image
                        resizeMode="stretch"
                        source={require('../assets/images/privacy.png')}
                        style={[styles.privacyIcon]}
                      />
                       <Image
                        resizeMode="stretch"
                        source={require('../assets/images/drop.png')}
                        style={[styles.dropIcon]}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.dropBox}>
                    <Text style={styles.dropLabelText}>Profession</Text>
                    <SelectDropdown
                      data={hobbies}
                      defaultButtonText=""
                      buttonStyle={styles.dropdown1BtnStyle}
                      buttonTextStyle={styles.dropdown1BtnTxtStyle}
                      renderDropdownIcon={isOpened => {
                        return (
                          <FontAwesome
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            color={'#444'}
                            size={18}
                          />
                        );
                      }}
                      dropdownIconPosition={'right'}
                      dropdownStyle={styles.dropdown1DropdownStyle}
                      rowStyle={styles.dropdown1RowStyle}
                      rowTextStyle={styles.dropdown1RowTxtStyle}
                      onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem;
                      }}
                      rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item;
                      }}
                    />
                  </View>
                </View>
                <Text style={styles.educationText}>Education</Text>
                <View style={styles.profileFormInner}>
                  <Text style={styles.highSchool}>High School</Text>

                  <View style={styles.highSchoolInfo}>
                    <Text style={styles.labelSchool}>School</Text>
                    <View style={styles.inputBoxFullIWidth}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder="Which school did you attend?"
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <Text style={styles.labelSchool}>Year</Text>
                    <View style={styles.fromToCal}>
                      <View style={styles.dateBox}>
                        <TextInput
                          placeholderTextColor="#000"
                          style={styles.input}
                          placeholder="From"
                          textContentType="username"
                          maxLength={20}
                        />
                      </View>
                      <View style={styles.dateBox}>
                        <TextInput
                          placeholderTextColor="#000"
                          style={styles.input}
                          placeholder="To"
                          textContentType="username"
                          maxLength={20}
                        />
                      </View>
                    </View>
                  </View>
                  <Text style={styles.highSchool}>College</Text>
                  <View style={styles.highSchoolInfo}>
                    <Text style={styles.labelSchool}>College</Text>
                    <View style={styles.inputBoxFullIWidth}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder="Which College did you attend?"
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <Text style={styles.labelSchool}>Major</Text>
                    <View style={styles.inputBoxFullIWidth}>
                      <TextInput
                        placeholderTextColor="#000"
                        style={styles.input}
                        placeholder="What did you major in?"
                        textContentType="username"
                        maxLength={20}
                      />
                    </View>
                    <Text style={styles.labelSchool}>Year</Text>
                    <View style={styles.fromToCal}>
                      <View style={styles.dateBox}>
                        <TextInput
                          placeholderTextColor="#000"
                          style={styles.input}
                          placeholder="From"
                          textContentType="username"
                          maxLength={20}
                        />
                      </View>
                      <View style={styles.dateBox}>
                        <TextInput
                          placeholderTextColor="#000"
                          style={styles.input}
                          placeholder="To"
                          textContentType="username"
                          maxLength={20}
                        />
                      </View>
                    </View>
                  </View>


                  <Text style={styles.highSchool}>University</Text>
                  <View style={styles.highSchoolInfo}>
                  <View style={styles.addUInfo}>
                  <TouchableOpacity style={styles.uniIconBox}>
                      <Image
                        resizeMode="stretch"
                        source={require('../assets/images/addUniversity.png')}
                        style={[styles.uniIcon]}
                      />
                    </TouchableOpacity>

                    <Text style={styles.addU}>Add University</Text>
                    </View>
                  </View>
                </View>

                <Text style={styles.educationText}>NOTES</Text>
                <View style={styles.profileFormInner}>
                

                 
                  


                
              
                  <View style={[styles.addUInfo, {paddingTop:15}]}>
                  <TouchableOpacity style={styles.uniIconBox}>
                      <Image
                        resizeMode="stretch"
                        source={require('../assets/images/addUniversity.png')}
                        style={[styles.uniIcon]}
                      />
                    </TouchableOpacity>

                    <Text style={styles.addU}>Add more about yourself</Text>
                    </View>
               
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  bannerSection: {
    width: '100%',
    height: 125,
    flex: 1,
  },
  editBanner: {
    width: '100%',
    height: 125,
    flex: 2,
  },
  profilePicContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: -15,
    position:'relative'
  },
  profileInfoWrapper: {
    backgroundColor: '#fff',
    flex: 6,

  },
  profilePic: {
    width: 100,
    height: 100,
    marginTop: -35,
    // marginLeft: 25,
    overflow:'hidden',
    borderRadius: 100,
  },
  profilePicImg: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  profileNameCont: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    
  },
  profileName: {
    fontSize: 20,
    color: '#000',
    fontFamily: 'SFpro-Bold',
    textAlign:'center'
  },
  photosEdit: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  inputBox: {
    borderColor: '#c1cad3',
    borderWidth: 1,
    marginBottom: 10,
    width: '75%',
  },
  input: {
    fontSize: 14,
    fontFamily: 'SFpro-Regular',
    color: '#333',
    textAlign: 'left',
    paddingLeft: 15,
  },
  profileForm: {
    backgroundColor: '#e6ebf5',
    width: '100%',
    padding: 25,
  },
  profileFormInner: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    paddingTop: 30,
  },
  privacyIcon: {
    width: 21,
    height: 21,
  },
  inputBoxWithPrivacy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    justifyContent: 'center',
  },
  privacyBox: {
    flexDirection:'row',
    backgroundColor: '#fff',
    width: 58,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginTop: -15,
  },
  dropIcon:{
    marginLeft:8
  },
  birth: {
    position: 'absolute',
    top: -10,
    left: 25,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  verifyPhText: {
    color: '#1d80e2',
    position: 'relative',
    top: -17,
    left: 15,
  },
  dropLabelText: {
    color: '#323a42',
    fontSize: 14,
    fontFamily: 'SFpro-Regular',
    marginBottom: 8,
  },
  dropdown1BtnStyle: {
    width: '93%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c1cad3',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left', fontSize: 14},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropBox: {
    marginHorizontal: 15,
    width: '100%',
    marginBottom: 15,
  },
  addMore: {
    // marginTop: 8,
    color: COLORS.blue,
  },
  camImg:{
    width:38,
    height:38
  },
  radioMainWrap: {
    flexDirection: 'column',

    marginHorizontal: 15,
    // justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 15,

    // backgroundColor:'red'
  },
  btn: {
    flexDirection: 'row',
    marginRight: 10,
    alignItems: 'center',
  },
  btntext: {
    fontSize: 16,
    fontFamily: 'SFpro-Regular',
  },
  img: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  genderText: {
    marginBottom: 10,
    fontFamily: 'SFpro-Regular',
  },
  educationText: {
    color: '#323a42',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
    marginVertical: 25,
    textTransform: 'uppercase',
  },
  highSchool: {
    color: '#323a42',
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
    marginVertical: 15,
  },
  highSchoolInfo: {
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingTop: 15,
  },
  profileFormInner: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 15,
    paddingTop: 35,
    borderRadius:15
  },
  inputBoxFullIWidth: {
    width: '100%',
    borderColor: '#c1cad3',
    borderWidth: 1,
    marginBottom: 10,
    marginBottom: 15,
    borderRadius: 4,
  },
  labelSchool: {
    marginBottom: 8,
    color: '#323a42',
    fontSize: 14,
    fontFamily: 'SFpro-Regular',
  },
  fromToCal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateBox: {
    width: '45%',
    borderColor: '#c1cad3',
    borderWidth: 1,
    marginBottom: 10,
    marginBottom: 15,
    borderRadius: 4,
  },
  uniIcon:{
    width:40,
    height:40
  },
  addUInfo:{
    display:'flex',
    alignItems:'center',
    flexDirection:'row',
    paddingBottom:25
  },
  addU:{
    color: COLORS.blue,
    fontFamily: 'SFpro-Medium',
    fontSize: 14,
    marginLeft:10
  },
  saveWrap:{
    position:'absolute',
    right:25,
    top:40,
    flexDirection:'row',
   backgroundColor: '#fff',
   width: 75,
   height: 36,
   alignItems: 'center',
   justifyContent: 'space-around',
   borderRadius: 100,
   marginLeft: 15,
   shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
});
