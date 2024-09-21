import React from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';
import { Link, useNavigate } from 'react-router-dom';
import { openModal } from '../state/store/modalSlice';
import { openMoreModal } from '../state/store/moreModal';
import OffcanvasSearch from './OffcanvasSearch';
import OffcanvasNotification from './OffcanvasNotification';

const Mobilenavbar = ({ onLogout }) => {
  // SVGs
  const { logo,  Home,  playstore,  mobileimage,  settings,  microsoft,  newmessage,  HomeActive,  playbtn,  treadsvisit,  reels,  threradrepost,  videocall,  useracount,  instalogin,  threadmobnotification,  notification,  pro,  treadshome,  toggledropdown,  threadscomment,  reelsActive,  sharereel,  pluspost,  threadspostshare,  threadsicon,  share,  searchindex,  searchActive2,  profile,  pintohome,  plussign,  notificationActive,  moretreads,  instalogo,  messageactive,  moreindex,  micmessage,  messageActive2,  following,  heartthreads,  messages,  heartreel,  heart_red,  favouritPost,  heart,  favouritpostwhite,  search,  searchActive,  Explor,  exploreactive,  dropdown,  favourite,  emoji,  More,  threads,  activenotification,  addphoto,  audio,  audiocall,  comment,  commentreel,  conversationinfo,  create,  createthreads,  cross,  crossoffinput,  dotbtn,  dragphotos } = useSelector(selectIcons);
  // Active section
  const dispatch = useDispatch();
  const activeSection = useSelector(selectActiveSection);
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); // Call the onLogout prop to update authentication state
    navigate('/login');
  };
  return (
    <>
      {/* <!-- ==============navbar for mobile devices start =================--> */}
      <div className="row-gap-5">
        <nav className="container-fluid navbar navbar-expand mob-t-nav d-none bg-body-dark " data-bs-theme="dark">
           {/* logo */}
          <Link className="navbar-brand" to="/"><img onclick={()=> handleSectionChange('home')} className="insta-name px-2"
            src={logo} alt="" srcset="" />
            <span className="dropdown p-0 ms-0 mt-0 ">
              <a className="btn" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img
                src={dropdown} alt="" />
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Follwing <img src={following} alt="" /></a>
                </li>
                <li><a className="dropdown-item" href="#">Favourit <img src={favourite} alt="" /></a>
                </li>
              </ul>
            </span>
          </Link>
          <ul className="navbar-nav d-flex flex-row justify-content-start search-m-e">
            <li className="nav-item" id="nav-item">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <img className="d-none search-m mb-0" src="assets/svg/searchindex.svg" alt="" srcset="" />
              </form>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link" aria-disabled="true"><img src="assets/svg/notification.svg" alt=""
                srcset="" /><span></span></a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-fluid mob-b-nav d-none">
        <ul className="navbar-nav d-flex flex-row justify-content-start">
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link active" aria-current="page" href="#"><img onclick="loadContent('home.html')"
              className="homeActive" src="assets/svg/homeNonActive.svg" alt="" srcset="" /><span className="i-d" id="i-d"></span></a>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link" href="#"><img className="exploreActive" onclick="loadContent('explore.html')" src="assets/svg/Explor.svg" alt=""
              srcset="" /><span className="i-d" id="i-d"></span></a>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link" aria-disabled="true"><img className="reelsActive" onclick="loadContent('reels.html')" src="assets/svg/reels.svg"
              alt="" srcset="" /><span className="i-d" id="i-d"></span></a>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link" aria-disabled="true"><img className="createActive" onclick="loadContent('create.html')" src="assets/svg/creat.svg"
              alt="" srcset="" /><span className="i-d" id="i-d"></span></a>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link" aria-disabled="true"><img className="messageActive" onclick="loadContent('messagebox.html')"
              src="assets/svg/messages.svg" alt="" srcset="" /><span className="i-d" id="i-d"></span></a>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <a className="nav-link" aria-disabled="true"><img className="pro-img" onclick="loadContent('profile.html')"
              src="assets/images/IMG-20240418-WA0007 (2).jpg" alt="" srcset="" /></a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Mobilenavbar
