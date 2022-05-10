export type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
  gender: string;
};

export type LoginFormData = {
  emailOrUsername: string;
  password: string;
};

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  dateOfBirth: string;
  email: string;
  username: string;
  bio?: string;
  password?: string;
  city?: string;
  relationship?: 'Single' | 'Date' | 'Married';
  gender: 'Male' | 'Female' | 'Other';
  work?: string;
  school?: string;
  posts: [string];
  friends: [string];
  historySearch: [string];
  createdAt: Date;
}

export interface DifferentUserType {
  _id: string;
  fullName: string;
  avatar: string;
  username: string;
}

export interface updateUserFormType {
  avatar?: string | ArrayBuffer | null;
  firstName?: string;
  lastName?: string;
  bio?: string;
  dateOfBirth?: string;
  city?: string;
  relationship?: string;
  gender?: string;
  school?: string;
  work?: string;
}

interface assets {
  media_type: string;
  url: string;
}

export interface PostType {
  _id: string;
  userPost: DifferentUserType;
  assets?: [assets];
  content: string;
  tagsPeople: [
    {
      _id: string;
      fullName: string;
      username: string;
    }
  ];
  likes: [string];
  shares: [string];
  comments: [
    {
      _id: string;
      postId: string;
    }
  ];
  audience: 'public' | 'friends' | 'private';
  createdAt: Date;
}

export interface formPostData {
  userPost: string;
  content: string;
  // assets?: [any];
  assets?: any;
  audience: 'public' | 'friends' | 'private';
  tagsPeople: string[];
}

export interface assetsType {
  media_type?: string;
  url: string;
}

export interface commentType {
  _id: string;
  postId: string;
  userComment: DifferentUserType;
  content: string;
  createdAt: Date;
}

export interface friendRequestType {
  _id: string;
  requester: DifferentUserType;
  receiver: string;
  status: number;
  createdAt: Date;

  id: string;
}

export interface friendType {
  avatar: string;
  email: string;
  fullName: string;
  id?: string;
  username: string;
  _id: string;
}

export interface storyType {
  _id: string;
  userPost: DifferentUserType;
  asset: {
    media_type: string;
    url: string;
  };
  count: number;
  timing: number;
  views: [string];
  createdAt: string;
  id: string;
}

export interface conversationType {
  chatName: string;
  createdAt: Date;
  groupAdmin: string[];
  isGroupChat: true;
  members: DifferentUserType[];
  messageCount: Number;
  updatedAt: Date;
  _id: string;
  lastMessage?: messageType;
  avatar: string;
}

export interface messageType {
  type: 'message' | 'asset' | 'audio' | 'file' | 'notification';
  content?: string;
  asset?: { url: string; media_type: string };
  conversation: string;
  createdAt: string;
  isDeleted: boolean;
  sender: DifferentUserType;
  updatedAt: Date;
  _id: string;
}

export interface notificationType {
  _id: string;
  type: 'like' | 'comment' | 'friendRequest' | 'friendAccepted' | 'story';
  content: string;
  from: DifferentUserType;
  to: [DifferentUserType];
  link: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}
