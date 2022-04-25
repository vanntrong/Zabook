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
  userPost: {
    _id: string;
    fullName: string;
    avatar: string;
    username: string;
  };
  assets?: [assets];
  content: string;
  likes: [string];
  shares: [string];
  comments: [
    {
      _id: string;
      postId: string;
    }
  ];
  createdAt: Date;
}

export interface formPostData {
  userPost: string;
  content: string;
  // assets?: [any];
  assets?: any;
}

export interface assetsType {
  media_type?: string;
  url: string;
}

export interface commentType {
  _id: string;
  postId: string;
  userComment: {
    _id: string;
    fullName: string;
    avatar: string;
    username: string;
  };
  content: string;
  createdAt: Date;
}
