import { createSlice } from '@reduxjs/toolkit';
import logo from '../assets/svg/logo.svg';
import Home from '../assets/svg/homeNonActive.svg';
import HomeActive from '../assets/svg/home.svg';
import search from '../assets/svg/search.svg';
import searchActive from '../assets/svg/searchActive2.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';
// import logo from '../assets/svg/logo.svg';

const iconsSlice = createSlice({
  name: 'icons',
  initialState: {
    logo,
    Home,
    HomeActive,
    search,
    searchActive,

  },
  reducers: {},
});

export const selectIcons = (state) => state.icons;
export default iconsSlice.reducer;
