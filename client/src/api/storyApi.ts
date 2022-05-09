import axiosClient from 'api';
import { formSubmitStoryType } from 'pages/stories/create/CreateStoryPage';
import { notificationType, storyType } from 'shared/types';

export const createStoryApi = (
  data: formSubmitStoryType
): Promise<{ story: storyType; notification: notificationType }> => axiosClient.post('story', data);

export const getStoriesApi = (params: { page: number }): Promise<storyType[]> =>
  axiosClient.get('story/all', { params });

export const getAllStoriesOfOneUserApi = (params: { userPost: string }): Promise<storyType[]> =>
  axiosClient.get('/story', { params });

export const viewStoryApi = (id: string): Promise<storyType> => axiosClient.patch(`story/${id}`);

export const deleteStoryApi = (id: string): Promise<storyType> => axiosClient.delete(`story/${id}`);
