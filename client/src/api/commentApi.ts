import { commentType } from 'shared/types';
import axiosClient from './index';

export const createCommentApi = async (id: string, data: any): Promise<commentType> =>
  axiosClient.post(`posts/${id}/comment`, data);

export const updateCommentApi = async (
  id: string,
  data: { content: string }
): Promise<commentType> => axiosClient.put(`posts/comment/${id}`, data);

export const getCommentsApi = async (
  id: string,
  params: { limit: number }
): Promise<commentType[]> => axiosClient.get(`posts/${id}/comments`, { params });
