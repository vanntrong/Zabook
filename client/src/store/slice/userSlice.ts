/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { LoginFormData, UserType } from '../../shared/types';

export interface userState {
  currentUser: UserType | null;
  logging: boolean;
  error: null | string;
}

const initialState: userState = {
  currentUser: null,
  logging: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.currentUser = action.payload;
      state.logging = false;
      state.error = null;
    },
    //login
    loginUserRequest: (state, action: PayloadAction<LoginFormData>) => {
      state.logging = true;
      state.error = null;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.logging = false;
      state.error = action.payload;
    },
    //logout
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const userAction = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectHistorySearch = (state: RootState) => state.user.currentUser!.historySearch;
export const selectLogging = (state: RootState) => state.user.logging;
export const selectLoginError = (state: RootState) => state.user.error;

export default userSlice.reducer;
