import { createSlice } from '@reduxjs/toolkit';

const storyModalSlice = createSlice({
  name: 'storyModal', // Changed for clarity
  initialState: {
    isStoryModalOpen: false,
  },
  reducers: {
    openStoryModal: (state) => {
      state.isStoryModalOpen = true;
    },
    closeStoryModal: (state) => {
      state.isStoryModalOpen = false;
    },
  },
});

export const { openStoryModal, closeStoryModal } = storyModalSlice.actions;

export const selectIsStoryModalOpen = (state) => state.storyModal.isStoryModalOpen;

export default storyModalSlice.reducer;
