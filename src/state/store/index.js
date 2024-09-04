import { configureStore } from '@reduxjs/toolkit';
import iconsReducer from '../store/iconSlice';
import navbarReducer from '../store/navbarSlice'

const store = configureStore({
  reducer: {
    icons: iconsReducer,
    navbar: navbarReducer,
  },
});

export default store;
