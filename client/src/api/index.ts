import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import queryString from 'query-string';

const access_token = localStorage.getItem('token');

//axios no header used with login and register
export const axiosAuthClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
});

axiosAuthClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

//axios with header used with all other requests
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

if (access_token) {
  axiosClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
}

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const currentDate = new Date();
    try {
      if (access_token) {
        const decodedToken = jwt_decode<any>(access_token);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          const refresh_token = localStorage.getItem('refresh_token');
          const newToken = await refreshAccessToken(refresh_token);
          if (config.headers === undefined) {
            config.headers = {};
          }
          config.headers['Authorization'] = 'Bearer ' + newToken;
        }
      }
    } catch (error) {
      console.log(error);
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

const refreshAccessToken = async (refreshToken: string | null): Promise<AxiosResponse> => {
  const access_token = await axios.post(
    `${process.env.REACT_APP_API_URL}/token/${refreshToken}/refresh`
  );
  return access_token.data;
};

export default axiosClient;
