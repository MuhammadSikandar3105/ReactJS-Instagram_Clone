import { createSlice } from '@reduxjs/toolkit';

const storyRetrieveModalSlice = createSlice({
  name: 'storyRetrieveModal', // Changed for clarity
  initialState: {
    isStoryRetrieveModalOpen: false,
    currentUser: null, // New property to store the clicked user's data
  },
  reducers: {
    openStoryRetrieveModal: (state, action) => {
      state.isStoryRetrieveModalOpen = true;
      state.currentUser = action.payload; // Set the clicked user's data
    },
    closeStoryRetrieveModal: (state) => {
      state.isStoryRetrieveModalOpen = false;
      state.currentUser = null; // Reset the current user data when closing
    },
  },
});

export const { openStoryRetrieveModal, closeStoryRetrieveModal } = storyRetrieveModalSlice.actions;

// Selector to get the modal open state
export const selectIsStoryRetrieveModalOpen = (state) => state.storyRetrieveModal.isStoryRetrieveModalOpen;

// Selector to get the current user data
export const selectCurrentUser = (state) => state.storyRetrieveModal.currentUser;

export default storyRetrieveModalSlice.reducer;
