import { createSlice } from '@reduxjs/toolkit';

const moreModalSlice = createSlice({
  name: 'moreModal', // Changed for clarity
  initialState: {
    isMoreModalOpen: false,
  },
  reducers: {
    openMoreModal: (state) => {
      state.isMoreModalOpen = true;
    },
    closeMoreModal: (state) => {
      state.isMoreModalOpen = false;
    },
  },
});

export const { openMoreModal, closeMoreModal } = moreModalSlice.actions;

export const selectIsMoreModalOpen = (state) => state.moreModal.isMoreModalOpen;

export default moreModalSlice.reducer;
