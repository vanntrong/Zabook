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
  avatar: string;
  dateOfBirth: string;
  email: string;
  username: string;
  password?: string;
  city?: string;
  relationship?: 'Single' | 'Date' | 'Married';
  gender: 'Male' | 'Female' | 'Other';
  work?: string;
  school?: string;
  posts: [string];
  friends: [string];
  createdAt: Date;
}

export interface PostType {
  _id: string;
  userPost: string;
  assets?: [string];
  content: string;
  likes?: [string];
  shares?: [string];
  comments?: [string];
  createdAt: Date;
}
