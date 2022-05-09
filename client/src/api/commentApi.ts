import { commentType, notificationType } from 'shared/types';
import axiosClient from './index';

export const createCommentApi = async (
  id: string,
  data: any
): Promise<{ comment: commentType; notification: notificationType }> =>
  axiosClient.post(`posts/${id}/comment`, data);

export const updateCommentApi = async (
  id: string,
  data: { content: string }
): Promise<commentType> => axiosClient.put(`posts/comment/${id}`, data);

export const deleteCommentApi = async (id: string) => axiosClient.delete(`posts/comment/${id}`);

export const getCommentsApi = async (
  id: string,
  params: { limit: number }
): Promise<commentType[]> => axiosClient.get(`posts/${id}/comments`, { params });
