import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { formPostData, PostType } from 'shared/types';
import { RootState } from '../../store/store';

interface postsState {
  currentUserPosts: PostType[];
  pending: boolean;
  error: null | string;
}

const initialState: postsState = {
  currentUserPosts: [],
  pending: false,
  error: null,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setUserPosts: (state, action: PayloadAction<PostType[]>) => {
      state.currentUserPosts = action.payload;
      state.pending = false;
      state.error = null;
    },
    //get user posts
    getCurrentUserPostsRequest: (state, action: PayloadAction<string>) => {
      state.pending = true;
    },
    getCurrentUserPostsFailure: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },

    //create post
    createNewPostRequest: (state, action: PayloadAction<formPostData>) => {
      state.pending = true;
    },
    createNewPostFailure: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },
    createNewPostSuccess: (state, action: PayloadAction<PostType>) => {
      state.currentUserPosts.unshift(action.payload);
      state.pending = false;
      state.error = null;
    },

    //update post
    updatePostRequest: (state, action: PayloadAction<{ data: formPostData; id: string }>) => {
      state.pending = true;
    },
    updatePostFailure: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },
    updatePostSuccess: (state, action: PayloadAction<PostType>) => {
      const index = state.currentUserPosts.findIndex((post) => post._id === action.payload._id);
      state.currentUserPosts[index] = action.payload;
      state.pending = false;
      state.error = null;
    },

    //delete post
    deletePostRequest: (state) => {
      state.pending = true;
    },
    deletePostFailure: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },
    deletePostSuccess: (state, action: PayloadAction<string>) => {
      state.currentUserPosts.filter((post) => post._id !== action.payload);
      state.pending = false;
    },
  },
});

export const postAction = postSlice.actions;

export const selectPosts = (state: RootState) => state.post.currentUserPosts;
export const selectPostsPending = (state: RootState) => state.post.pending;
export const selectPostsError = (state: RootState) => state.post.error;

export default postSlice.reducer;
