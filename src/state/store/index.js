import { configureStore } from '@reduxjs/toolkit';
import iconsReducer from '../store/iconSlice';
import navbarReducer from '../store/navbarSlice';
import likeReducer from './likeSlice';
import favouriteReducer from './favouriteSlice';

const store = configureStore({
  reducer: {
    icons: iconsReducer,
    navbar: navbarReducer,
    like: likeReducer,
    fav: favouriteReducer,
  },
});

export default store;
