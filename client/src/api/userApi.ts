import axiosClient from './index';
import { axiosAuthClient } from './index';

import { LoginFormData, SignUpFormData, UserType, PostType } from '../shared/types';

interface loginResponse {
  token: string;
  user: UserType;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = (data: SignUpFormData): Promise<any> =>
  axiosAuthClient.post('users/register', data);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loginUser = (data: LoginFormData): Promise<loginResponse> =>
  axiosAuthClient.post('users/login', data);

export const updateUserApi = (user: UserType, id: string): Promise<UserType> =>
  axiosClient.put(`users/${id}`, user);

export const getProfileApi = (): Promise<UserType> => axiosClient.get('users');

export const getProfileFriendApi = (username: string): Promise<UserType> =>
  axiosClient.get(`users/${username}`);

export const getPostsApi = (id: string): Promise<[PostType]> =>
  axiosClient.get(`users/${id}/posts`);
