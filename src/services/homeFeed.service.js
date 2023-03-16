import axios from 'axios';

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
