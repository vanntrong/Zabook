import axiosClient from 'api';
import { formSubmitStoryType } from 'pages/stories/create/CreateStoryPage';
import { storyType } from 'shared/types';

export const createStoryApi = (data: formSubmitStoryType) => axiosClient.post('story', data);

export const getStoriesApi = (params: { page: number }): Promise<storyType[]> =>
  axiosClient.get('story/all', { params });

export const getAllStoriesOfOneUserApi = (params: { userPost: string }): Promise<storyType[]> =>
  axiosClient.get('/story', { params });
