import axiosClient from 'api';
import { messageType } from 'shared/types';

export const getMessagesApi = async (conversationId: string): Promise<messageType[]> =>
  axiosClient.get(`message/${conversationId}`);

export const createMessageApi = async (data: {
  conversationId: string;
  content?: string;
  asset?: { url: string; media_type: string };
}): Promise<messageType> => axiosClient.post('message', data);

export const deleteMessageApi = async (messageId: string, sender: string): Promise<messageType> =>
  axiosClient.put('message', { messageId, sender });
