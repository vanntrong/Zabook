import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storyType } from 'shared/types';
import { RootState } from '../../store/store';

interface storiesState {
  currentStories: storyType[];
  pending: boolean;
  error: null | string;
}

const initialState: storiesState = {
  currentStories: [],
  pending: false,
  error: null,
};

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {
    setStories: (state, action: PayloadAction<storyType[]>) => {
      state.currentStories = action.payload;
      state.pending = false;
      state.error = null;
    },
  },
});

export const storiesAction = storiesSlice.actions;

export const selectStories = (state: RootState) => state.stories.currentStories;
export const selectStoriesPending = (state: RootState) => state.stories.pending;
export const selectStoriesError = (state: RootState) => state.stories.error;

export default storiesSlice.reducer;
