import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

interface themeState {
  isDarkMode: boolean;
}

const initialState: themeState = {
  isDarkMode: Boolean(localStorage.getItem('isDarkMode')) || false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const themeActions = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.isDarkMode;

export default themeSlice.reducer;
