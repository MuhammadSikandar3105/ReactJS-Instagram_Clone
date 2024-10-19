import { createSlice } from '@reduxjs/toolkit';

const reelsModalSlice = createSlice({
  name: 'reelsModal', // Changed for clarity
  initialState: {
    isReelsModalOpen: false,
  },
  reducers: {
    openReelsModal: (state) => {
      state.isReelsModalOpen = true;
    },
    closeReelsModal: (state) => {
      state.isReelsModalOpen = false;
    },
  },
});

export const { openReelsModal, closeReelsModal } = reelsModalSlice.actions;

export const selectIsReelsModalOpen = (state) => state.reelsModal.isReelsModalOpen;

export default reelsModalSlice.reducer;
