import axiosClient from './index';
import { axiosAuthClient } from './index';

import { LoginFormData, SignUpFormData, UserType, PostType } from '../shared/types';

interface loginResponse {
  token: string;
  user: UserType;
}

export const registerUser = (data: SignUpFormData): Promise<any> =>
  axiosAuthClient.post('auth/register', data);

export const loginUser = (data: LoginFormData): Promise<loginResponse> =>
  axiosAuthClient.post('auth/login', data);

//get profile of current user
export const getProfileApi = (): Promise<UserType> => axiosClient.get('auth');

//get profile of other user
export const getProfileOtherApi = (username: string): Promise<UserType> =>
  axiosClient.get(`users/${username}`);

export const updateUserApi = (user: UserType, id: string): Promise<UserType> =>
  axiosClient.put(`users/${id}`, user);

export const deleteUserApi = (id: string): Promise<any> => axiosClient.delete(`users/${id}`);

export const searchUserApi = (searchQuery: string): Promise<any[]> =>
  axiosClient.get('search', { params: { q: searchQuery } });
