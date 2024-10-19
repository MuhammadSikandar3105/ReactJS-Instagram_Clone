import { configureStore } from '@reduxjs/toolkit';
import iconsReducer from '../store/iconSlice';
import navbarReducer from '../store/navbarSlice';
import likeReducer from './likeSlice';
import favouriteReducer from './favouriteSlice';
import modalReducer from './modalSlice';
import postReducer from './postSlice'
import moreModalReducer from './moreModal';
import storyModalReducer from './storymodal';
import storyRetrieveModalReducer from './storyRetrieveModal';
import profilePicModalReducer from './profilepicSlice';
import  reelsModalReducer  from './reelsSlice';


const store = configureStore({
  reducer: {
    icons: iconsReducer,
    navbar: navbarReducer,
    like: likeReducer,
    fav: favouriteReducer,
    modal: modalReducer,
    posts: postReducer,
    moreModal: moreModalReducer,
    storyModal: storyModalReducer,
    storyRetrieveModal: storyRetrieveModalReducer,
    profilePicModal: profilePicModalReducer,
    reelsModal: reelsModalReducer,

  },
});

export default store;
