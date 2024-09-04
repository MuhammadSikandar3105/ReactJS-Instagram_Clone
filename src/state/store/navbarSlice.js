import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSection: 'home', 
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = navbarSlice.actions;
export const selectActiveSection = (state) => state.navbar.activeSection;
export default navbarSlice.reducer;
