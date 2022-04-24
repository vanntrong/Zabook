import { formPostData, PostType } from 'shared/types';
import axiosClient from './index';

export const getPostsApi = (id: string): Promise<[PostType]> =>
  axiosClient.get(`users/${id}/posts`);

export const createPostApi = (data: formPostData): Promise<PostType> =>
  axiosClient.post(`posts`, data);

export const updatePostApi = (payload: any): Promise<PostType> =>
  axiosClient.put(`posts/${payload.id}`, payload.data);

export const deletePostApi = (id: string): Promise<PostType> => axiosClient.delete(`posts/${id}`);

export const likePostApi = (payload: { data: string; id: string }) =>
  axiosClient.patch(`posts/${payload.id}/like`, { userId: payload.data });
