import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {getEncTokenAnyUserId, getEncUserId} from '../shared/encryption';

const API_URL =
  process.env.API_URL || 'https://api.lykapp.com/lykjwt/index.php?/';

export const saveCommentFeed = async ({URL, data, token}) => {
  const response = await axios.post(URL, data, {
    headers: {
      token: token,
    },
  });
  console.log(response.data, 'api');
  return response;
};

export const generalApiCallPost = async ({URL, data, token}) => {
  const response = await axios.post(URL, data, {
    headers: {
      token: token,
    },
  });
  console.log('API response---------', response.data);
  return response;
};

export const postLike = async (params, token) => {
  const config = {
    method: 'post',
    url: `${API_URL}Postchat/likePost`,
    data: params,
    headers: {
      token: token,
    },
  };
  return await axios(config);
};
