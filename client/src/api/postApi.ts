import { PostType } from 'shared/types';
import axiosClient from './index';

export const getPostsApi = (id: string): Promise<[PostType]> =>
  axiosClient.get(`users/${id}/posts`);
