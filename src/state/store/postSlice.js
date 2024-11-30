// postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    addPostSuccess: (state, action) => {
      state.posts.push(action.payload);
      state.loading = false;
    },
    addPostFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { addPostSuccess, addPostFailure } = postSlice.actions;

export default postSlice.reducer;
