import { createSlice } from '@reduxjs/toolkit';

const moreModalSlice = createSlice({
  name: 'modal',
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
export const selectIsMoreModalOpen = (state) => state.modal.isMoreModalOpen;
export default moreModalSlice.reducer;
