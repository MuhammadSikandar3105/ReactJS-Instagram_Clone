import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likes: 0,
  liked: false,
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    toggleLike: (state) => {
      if (state.liked) {
        state.likes -= 1;
      } else {
        state.likes += 1;
      }
      state.liked = !state.liked;
    },
  },
});

export const { toggleLike } = likeSlice.actions;
export const selectLikes = (state) => state.like.likes;
export const selectLiked = (state) => state.like.liked;
export default likeSlice.reducer;
