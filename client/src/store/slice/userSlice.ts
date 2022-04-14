/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { LoginFormData, SignUpFormData, User } from '../../shared/types';

export interface userState {
  currentUser: User | null;
  isLoggedIn: boolean;
  logging: boolean;
}

const initialState: userState = {
  currentUser: null,
  isLoggedIn: false,
  logging: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isLoggedIn = true;
      state.logging = false;
    },
    //login
    loginUserRequest: (state, action: PayloadAction<LoginFormData>) => {
      state.logging = true;
    },
    loginUserFailure: (state, action: PayloadAction<string>) => {
      state.logging = false;
    },
    //logout
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
  },
});

export const userAction = userSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectLogging = (state: RootState) => state.user.logging;

export default userSlice.reducer;
