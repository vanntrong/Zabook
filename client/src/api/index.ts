import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode from 'jwt-decode';
import queryString from 'query-string';

const access_token = (localStorage.getItem('token') as string) || '';

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
    Authorization: `Bearer ${access_token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const currentDate = new Date();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken = jwt_decode<any>(access_token);
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      const refresh_token = localStorage.getItem('refresh_token');
      const newToken = await refreshAccessToken(refresh_token);
      if (config.headers === undefined) {
        config.headers = {};
      }
      config.headers['Authorization'] = 'Bearer ' + newToken;
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
