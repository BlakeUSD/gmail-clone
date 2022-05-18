import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // using Redux, this will log the user in
    },
    logout: (state) => {
      state.user = null; // using Redux, this will log the user out
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;