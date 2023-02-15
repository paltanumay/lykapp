import {
    Text,
    View,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import EnIcon from 'react-native-vector-icons/Entypo';
import AntIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { getEncTokenAnyUserId, getEncUserId } from '../shared/encryption';
import moment from 'moment';

const API_URL = process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';
export const MY_FEED = `${API_URL}/HomeFeed/getMyPostFeed`;
const MY_FEED_SHORT = "gtyoted";
const offset = 0, limit = 25;

export default function Postlist() {
    const [feeds, setFeeds] = useState([]);
    useEffect(() => {
        async function getMyFeed() {
            let userDetails = await AsyncStorage.getItem('userId');
            userDetails = JSON.parse(userDetails);
            let token = await AsyncStorage.getItem("token") + "-" + MY_FEED_SHORT + "-" + getEncTokenAnyUserId(userDetails.userId);
            axios.post(MY_FEED, {
                "userId": getEncUserId(userDetails.userId),
                "limit": limit,
                "offset": offset,
            }, {
                headers: {
                    token: token
                }
            }).then(res => {
                setFeeds(res.data.response.feeds)
            }, err => {
                alert(err + userDetails.userId + token)
            }
            )
        }
        getMyFeed()
    }, [])
    return (
        <>
            <View style={styles.newsCardsWrap}>
                {feeds.map(({ type, details }) => type === 'post' && (
                    <View style={styles.newsCard} key={details.postId}>
                        <View style={styles.cardTitle}>
                            <View style={styles.cardProImg}>
                                <Image
                                    resizeMode="contain"
                                    source={require('../assets/images/avatar.jpg')}
                                    style={[styles.logoImg]}
                                />
                            </View>
                            <View style={styles.newstext}>
                                <Text style={styles.newsTitletext}>{details.createdBy.firstName}</Text>
                                <Text style={styles.newsSubTitletext}>{moment(new Date()).diff(moment(details.createdOn.replace(' ','T')+'Z'), 'days') < 1 ? moment(details.createdOn.replace(' ','T')+'Z').fromNow():moment(details.createdOn.replace(' ','T')+'Z').format("DD MMM YYYY, h:mm a")}</Text>
                            </View>
                            <TouchableOpacity style={styles.options}>
                                <EnIcon
                                    name="dots-three-horizontal"
                                    size={25}
                                    color="#333"
                                />
                            </TouchableOpacity>
                        </View>

                        {/* <Text style={styles.mainDesc}>
                  {details.title}
                </Text> */}

                        <View style={styles.newsCoverImg}>
                            <Image
                                resizeMode="stretch"
                                source={{
                                    uri: 'https://cdn.lykapp.com/newsImages/images/' + details.imageUrl
                                }}
                                style={[styles.postImg]}
                            />
                        </View>
                        <Text style={styles.secDesc}>
                            {details.title}
                        </Text>

                        <View style={styles.likeCommentShare}>
                            <View style={styles.likeCommentShareBox}>
                                <View style={styles.likeCommentShareIconWrap}>
                                    <TouchableOpacity style={styles.roundBase}>
                                        <AntIcon name={details.myLike ? "like1" : "like2"} size={22} color="#9c9d9f" />
                                    </TouchableOpacity>

                                    <Text style={styles.iconText}>{details.likeCount} Like</Text>
                                </View>
                            </View>

                            <View style={styles.likeCommentShareBox}>
                                <View style={styles.likeCommentShareIconWrap}>
                                    <TouchableOpacity style={styles.roundBase}>
                                        <AntIcon name="message1" size={22} color="#c1cb99" />
                                    </TouchableOpacity>

                                    <Text style={styles.iconText}>{details.commentCount} Comment</Text>
                                </View>
                            </View>

                            <View style={styles.likeCommentShareBox}>
                                <View style={styles.likeCommentShareIconWrap}>
                                    <TouchableOpacity style={styles.roundBase}>
                                        <AntIcon name="sharealt" size={22} color="#f8767a" />
                                    </TouchableOpacity>

                                    <Text style={styles.iconText}>{details.shareCount} Share</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.addCommentWrap}>
                            <View style={styles.addCommentImgWrap}>
                                <Image
                                    resizeMode="stretch"
                                    source={require('../assets/images/avatar.jpg')}
                                    style={[styles.addCommentImg]}
                                />
                            </View>
                            <View style={styles.addCommentField}>
                                <TextInput
                                    placeholderTextColor="#AFAFAF"
                                    style={styles.input}
                                    placeholder="Add comment"
                                    textContentType="username"
                                    underlineColorAndroid="transparent"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </>
    )
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
    newsCardsWrap: {
        padding: 15,
    },
    cardProImg: {
        width: 50,
        height: 50,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoImg: {
        width: 30,
        height: 30,
    },
    cardTitle: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    newstext: {
        marginLeft: 15,
    },
    newsTitletext: {
        color: '#080d14',
        fontFamily: 'Lato-Bold',
        fontSize: 16,
    },
    newsSubTitletext: {
        color: '#9e9c9c',
    },
    options: {
        position: 'absolute',
        right: 15,
        top: 0,
    },
    newsCardsWrap: {
        padding: 15,
    },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        marginBottom: 20
    },
    mainDesc: {
        color: '#333',
        fontFamily: 'Lato-regular',
        fontSize: 16,
        paddingHorizontal: 15,
        lineHeight: 20,
    },
    secDesc: {
        color: '#333',
        fontFamily: 'Lato-regular',
        fontSize: 13,
        paddingHorizontal: 15,
        lineHeight: 18,
    },
    newsCoverImg: {
        maxHeight: 150,
        overflow: 'hidden',
        alignItems: 'center',
        borderTopColor: '#e7ebf6',
        borderTopWidth: 4,
        borderBottomColor: '#e7ebf6',
        borderBottomWidth: 4,
        marginBottom: 10,
        marginTop: 20,
    },
    likeCommentShare: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 25,
        borderTopColor: '#f0f0f0',
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
    },
    likeCommentShareIconWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        color: '#9c9d9f',
        marginLeft: 10,
    },

    roundBase: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    addCommentImgWrap: {
        width: 30,
        height: 30,
        borderRadius: 100,
        overflow: 'hidden',
    },
    addCommentImg: {
        width: 30,
        height: 30,
    },
    addCommentWrap: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,

    },
    addCommentField: {
        backgroundColor: '#e7ebf6',
        borderRadius: 8,
        width: '88%',
        paddingHorizontal: 10,

    },
    postImg: {
        width:150,
        height: 150
    }
})