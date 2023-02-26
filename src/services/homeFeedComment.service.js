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
