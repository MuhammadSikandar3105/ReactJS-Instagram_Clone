import { createSlice } from '@reduxjs/toolkit';

const profilePicModalSlice = createSlice({
  name: 'profilePicModal', // Changed for clarity
  initialState: {
    isProfilePicModalOpen: false,
  },
  reducers: {
    openProfilePicModal: (state) => {
      state.isProfilePicModalOpen = true;
    },
    closeProfilePicModal: (state) => {
      state.isProfilePicModalOpen = false;
    },
  },
});

export const { openProfilePicModal, closeProfilePicModal } = profilePicModalSlice.actions;

export const selectIsProfilePicModalOpen = (state) => state.profilePicModal.isProfilePicModalOpen;

export default profilePicModalSlice.reducer;
