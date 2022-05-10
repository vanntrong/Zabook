import { formPostData, notificationType, PostType } from 'shared/types';
import axiosClient from './index';

export const getPostsApi = (
  id: string,
  params: { page: number; limit: number }
): Promise<PostType[]> => axiosClient.get(`users/${id}/posts`, { params });

export const getOnePostApi = (id: string): Promise<PostType> => axiosClient.get(`posts/${id}`);

export const createPostApi = (data: formPostData): Promise<PostType> =>
  axiosClient.post(`posts`, data);

export const updatePostApi = (payload: any): Promise<PostType> =>
  axiosClient.put(`posts/${payload.id}`, payload.data);

export const deletePostApi = (id: string): Promise<PostType> => axiosClient.delete(`posts/${id}`);

export const likePostApi = (payload: {
  data: string;
  id: string;
}): Promise<{ post: PostType; notification?: notificationType }> =>
  axiosClient.patch(`posts/${payload.id}/like`, { userId: payload.data });

export const updateAudienceApi = (id: string, audience: string): Promise<PostType> =>
  axiosClient.put(`posts/${id}/audience`, { audience });

export const getFriendsPostsApi = (userId: string, params: { page: number }): Promise<PostType[]> =>
  axiosClient.get(`users/${userId}/friends/posts`, { params });
