import axiosClient from './index';
import { axiosAuthClient } from './index';

import { LoginFormData, SignUpFormData, UserType, updateUserFormType } from '../shared/types';

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
