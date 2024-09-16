import { createSlice } from '@reduxjs/toolkit';
import logo from '../assets/svg/logo.svg';
import Home from '../assets/svg/homeNonActive.svg';
import HomeActive from '../assets/svg/home.svg';
import search from '../assets/svg/search.svg';
import searchActive from '../assets/svg/searchActive2.svg';
import Explor from '../assets/svg/Explor.svg';
import threads from '../assets/svg/Treads.svg';
import activenotification from '../assets/svg/activenotification.svg';
import addphoto from '../assets/svg/addphoto.svg';
import audio from '../assets/svg/audio.svg';
import audiocall from '../assets/svg/audiocall.svg';
import comment from '../assets/svg/comment.svg';
import commentreel from '../assets/svg/commentreel.svg';
import conversationinfo from '../assets/svg/conversationinfo.svg';
import create from '../assets/svg/creat.svg';
import createthreads from '../assets/svg/createthreads.svg';
import cross from '../assets/svg/cross.svg';
import crossoffinput from '../assets/svg/crossoffinput.svg';
import dotbtn from '../assets/svg/dotbtn.svg';
import dragphotos from '../assets/svg/dragphotos.svg';
import dropdown from '../assets/svg/dropdown.svg';
import emoji from '../assets/svg/emoji.svg';
import exploreactive from '../assets/svg/exploreactive.svg';
import favourite from '../assets/svg/favourit.svg';
import instalogin from '../assets/svg/instalogin.svg';
import favouritPost from '../assets/svg/favouritPost.svg';
import favouritpostwhite from '../assets/svg/favouritpostwhite.svg';
import following from '../assets/svg/following .svg';
import heart from '../assets/svg/heart.svg';
import heart_red from '../assets/svg/heart_red.svg';
import heartreel from '../assets/svg/heartreel.svg';
import heartthreads from '../assets/svg/heartthreads.svg';
import instalogo from '../assets/svg/instalogo.svg';
import messageActive2 from '../assets/svg/messageActive2.svg';
import messageactive from '../assets/svg/messageactive.svg';
import messages from '../assets/svg/messages.svg';
import micmessage from '../assets/svg/micmessage.svg';
import moreindex from '../assets/svg/moreindex.svg';
import moretreads from '../assets/svg/moretreads.svg';
import newmessage from '../assets/svg/newmessage.svg';
import notification from '../assets/svg/notification.svg';
import notificationActive from '../assets/svg/notificationActive.svg';
import pintohome from '../assets/svg/pintohome.svg';
import playbtn from '../assets/svg/playbtn.svg';
import pluspost from '../assets/svg/pluspost.svg';
import plussign from '../assets/svg/plussign.svg';
import profile from '../assets/svg/profile.svg';
import reels from '../assets/svg/reels.svg';
import reelsActive from '../assets/svg/reelsActive.svg';
import searchActive2 from '../assets/svg/searchActive2.svg';
import searchindex from '../assets/svg/searchindex.svg';
import share from '../assets/svg/share.svg';
import sharereel from '../assets/svg/sharereel.svg';
import threadmobnotification from '../assets/svg/threadmobnotification.svg';
import threadscomment from '../assets/svg/threadscomment.svg';
import threadsicon from '../assets/svg/threadsicon.svg';
import threadspostshare from '../assets/svg/threadspostshare.svg';
import threradrepost from '../assets/svg/threradrepost.svg';
import toggledropdown from '../assets/svg/toggledropdown.svg';
import treadshome from '../assets/svg/treadshome.svg';
import treadsvisit from '../assets/svg/treadsvisit.svg';
import useracount from '../assets/svg/useracount.svg';
import videocall from '../assets/svg/videocall.svg';
import More from '../assets/svg/More.svg';
import pro from '../assets/images/pro.JPG';
import playstore from '../assets/images/playstore.png';
import mobileimage from '../assets/images/mobileimg.png';
import microsoft from '../assets/images/Microsoft image.PNG';

const iconsSlice = createSlice({
  name: 'icons',
  initialState: {
    logo,
    Home,
    playstore,
    mobileimage,
    microsoft,
    newmessage,
    HomeActive,
    playbtn,
    treadsvisit,
    reels,
    threradrepost,
    videocall,
    useracount,
    instalogin,
    threadmobnotification,
    notification,
    pro,
    treadshome,
    toggledropdown,
    threadscomment,
    reelsActive,
    sharereel,
    pluspost,
    threadspostshare,
    threadsicon,
    share,
    searchindex,
    searchActive2,
    profile,
    pintohome,
    plussign,
    notificationActive,
    moretreads,
    instalogo,
    messageactive,
    moreindex,
    micmessage,
    messageActive2,
    following,
    heartthreads,
    messages,
    heartreel,
    heart_red,
    favouritPost,
    heart,
    favouritpostwhite,
    search,
    searchActive,
    Explor,
    exploreactive,
    dropdown,
    favourite,
    emoji,
    More,
    threads,
    activenotification,
    addphoto,
    audio,
    audiocall,
    comment,
    commentreel,
    conversationinfo,
    create,
    createthreads,
    cross,
    crossoffinput,
    dotbtn,
    dragphotos,


  },
  reducers: {},
});

export const selectIcons = (state) => state.icons;
export default iconsSlice.reducer;
