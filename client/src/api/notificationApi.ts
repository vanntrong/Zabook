import axiosClient from 'api';
import { notificationType } from 'shared/types';

export const getAllNotificationApi = async (): Promise<notificationType[]> =>
  axiosClient.get('notification');

// export const createNotificationApi = async() => axiosClient.post("/")

export const seenNotificationApi = async (id: string): Promise<notificationType> =>
  axiosClient.put('notification', { id });

export const seenAllNotification = async (): Promise<notificationType[]> =>
  axiosClient.put('notification/all');

export const deleteNotification = async (id: string) => axiosClient.delete(`notification/${id}`);
