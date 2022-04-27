import axiosClient from './index';
import { axiosAuthClient } from './index';

import {
  LoginFormData,
  SignUpFormData,
  UserType,
  updateUserFormType,
  friendType,
} from '../shared/types';
import { FriendInfoProps } from 'pages/friends/FriendsPage';

interface loginResponse {
  token: string;
  user: UserType;
}

interface searchUserParams {
  q: string;
  page?: number;
  limit?: number;
}

export const registerUser = (data: SignUpFormData): Promise<any> =>
  axiosAuthClient.post('auth/register', data);

export const loginUser = (data: LoginFormData): Promise<loginResponse> =>
  axiosAuthClient.post('auth/login', data);

//get profile of current user
export const getProfileApi = (): Promise<UserType> => axiosClient.get('auth');

//get profile of other user
export const getProfileOtherApi = (username: string): Promise<UserType> =>
  axiosClient.get(`users/${username}/profile`);

export const updateUserApi = (payload: any): Promise<UserType> =>
  axiosClient.put(`users/${payload.id}`, payload.userUpdated);

export const deleteUserApi = (id: string): Promise<any> => axiosClient.delete(`users/${id}`);

export const searchUserApi = (params: searchUserParams): Promise<any[]> =>
  axiosClient.get('search', { params });

export const addHistoryApi = (payload: { id: string; historyId: string }): Promise<[string]> =>
  axiosClient.put(`users/${payload.id}/searchHistory`, { searchId: payload.historyId });

export const getHistoryInfoApi = (id: string): Promise<any> =>
  axiosClient.get(`users/${id}/searchHistory`);

export const deleteHistoryApi = (payload: { id: string; historyId: string }): Promise<[string]> =>
  axiosClient.delete(`users/${payload.id}/searchHistory/${payload.historyId}`);

export const getFriendListApi = (id: string, params: { page: number }): Promise<friendType[]> =>
  axiosClient.get(`users/${id}/friends`, { params });
