import { formPostData, PostType } from 'shared/types';
import axiosClient from './index';

export const getPostsApi = (id: string): Promise<[PostType]> =>
  axiosClient.get(`users/${id}/posts`);

export const createPostApi = (data: formPostData): Promise<PostType> =>
  axiosClient.post(`posts`, data);

export const updatePostApi = (payload: any): Promise<PostType> =>
  axiosClient.put(`posts/${payload.id}`, payload.data);
