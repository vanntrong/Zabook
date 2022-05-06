import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface SocketState {
  socket: any;
}

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<any>) => {
      state.socket = action.payload;
    },
  },
});

export const socketAction = socketSlice.actions;
export const selectSocket = (state: RootState) => state.socket.socket;

export default socketSlice.reducer;
