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

export const newsLike = async (params, token) => {
  const config = {
    method: 'post',
    url: `${API_URL}HomeFeed/likeFeed`,
    data: params,
    headers: {
      token: token,
    },
  };
  return await axios(config);
};

export const shareOnLyk = async (params, token) => {
  const config = {
    method: 'post',
    url: `${API_URL}/Analytical/shareFeed`,
    data: params,
    headers: {
      token: token,
    },
  };
  return await axios(config);
};

export const search = async (params, token) => {
  const config = {
    method: 'post',
    url: `${API_URL}/LS_sa/AS_V2`,
    data: params,
    headers: {
      token: token,
    },
  };
  return await axios(config);
};

export const setMarkAsInAppropriate = async ({URL, data, token}) => {
  console.log(URL, token);
  try {
    const response = await axios.post(URL, data, {
      headers: {
        token: token,
      },
    });
    return response;
  } catch (e) {
    console.log(e, 'error');
  }
};
