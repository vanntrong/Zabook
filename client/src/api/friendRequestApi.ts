import axiosClient from 'api';
import { friendRequestType } from 'shared/types';

export const sendFriendRequestApi = async (data: { requester: string; receiver: string }) =>
  axiosClient.post(`friend/request`, data);

export const acceptFriendRequestApi = async (id: string) => axiosClient.put(`friend/accept/${id}`);

export const declineFriendRequestApi = async (id: string) =>
  axiosClient.put(`friend/decline/${id}`);

export const deleteFriendRequestApi = async (params: { requester: string; receiver: string }) =>
  axiosClient.delete(`friend`, { params });

export const getFriendRequestApi = async (params: {
  requester: string;
  receiver: string;
}): Promise<{ status: string }> => axiosClient.get(`friend/request`, { params });

export const getAllFriendRequestApi = async (params: {
  page: number;
}): Promise<friendRequestType[]> => axiosClient.get(`friend/request/all`, { params });
