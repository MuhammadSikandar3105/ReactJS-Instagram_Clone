import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourite : false
};

const favouritSlice = createSlice({
    name : 'fav',
    initialState,
    reducers: {
        toggleFavourite : (state) => {
            state.favourite = !state.favourite
        }
    }
});

export const  {toggleFavourite} = favouritSlice.actions;
export const  selectFavourite = (state) => state.fav.favourite;
export default favouritSlice.reducer;