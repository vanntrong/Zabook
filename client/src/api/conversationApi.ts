import axiosClient from 'api';
import { conversationType, messageType } from 'shared/types';

export const getConversationsApi = async (): Promise<conversationType[]> =>
  axiosClient.get(`conversation`);

export const createNewConversationApi = async (
  userId: string
): Promise<{ conversation: conversationType; isNew: boolean }> =>
  axiosClient.post(`conversation`, { userId });

export const changeNameConversationApi = async (
  groupId: string,
  newGroupName: string
): Promise<{ conversation: conversationType; message: messageType }> =>
  axiosClient.put('conversation/group/rename', { groupId, newGroupName });

export const changeAvatarConversationApi = async (
  groupId: string,
  avatar: string
): Promise<{ conversation: conversationType; message: messageType }> =>
  axiosClient.put('conversation/group/avatar', { groupId, avatar });

export const createGroupConversationApi = async (
  members: string[],
  chatName: string
): Promise<{ conversation: conversationType; message: messageType }> =>
  axiosClient.post('conversation/group', { members, chatName });

export const removeUserFromGroupConversationApi = async (
  memberId: string,
  groupId: string
): Promise<{ conversation: conversationType; message: messageType }> =>
  axiosClient.put('conversation/group/remove', { memberId, groupId });

export const addUserToGroupConversationApi = async (
  members: string[],
  groupId: string
): Promise<{ conversation: conversationType; message: messageType }> =>
  axiosClient.put('conversation/group/add', { members, groupId });
