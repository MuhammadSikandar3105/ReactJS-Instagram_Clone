import React, { useState } from 'react';
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
import Mobilenavbar from './Mobilenavbar';

const Navbar = () => {
  // SVGs
  const { logo, Home, HomeActive, reels, notification, reelsActive, notificationActive, messageActive2, messages, search, searchActive, Explor, exploreactive, More, threads, instalogo, create, pro } = useSelector(selectIcons);
  // Active section
  const dispatch = useDispatch();
  const activeSection = useSelector(selectActiveSection);
  const navigate = useNavigate();
  const [isOffcanvasSearchOpen, setIsOffcanvasSearchOpen] = useState(false);
  const [isOffcanvasNotificationOpen, setIsOffcanvasNotificationOpen] = useState(false);


  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));

    if (section === 'search') {
      toggleOffcanvasSearch();
    }
    else if (section === 'Notifications') {
      toggleOffcanvasNotification();
    }
    else if (section === 'Create') {
      console.log('Opening Create Modal');
      dispatch(openModal());
    }
    else if (section === 'More') {
      console.log('Opening More Modal');
      dispatch(openMoreModal());
    }

  };

  // Toggle offcanvas search function
  const toggleOffcanvasSearch = () => {
    setIsOffcanvasSearchOpen(!isOffcanvasSearchOpen);

    if (isOffcanvasSearchOpen) {
      dispatch(setActiveSection('home'));
    }
  };

  // Toggle offcanvas notification function
  const toggleOffcanvasNotification = () => {
    setIsOffcanvasNotificationOpen(!isOffcanvasNotificationOpen);

    if (isOffcanvasNotificationOpen) {
      dispatch(setActiveSection('home'));
    }
  };


  return (
    <section>
      <nav id="navbar-sec" className="navbar-sec navbar-expand bg-body-dark" data-bs-theme="dark">
        <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
          {/* logo */}
          <Link className="navbar-brand my-4 ms-0 px-3" to="/">
            <span id="insta-logo" className="insta-logo ms-3"></span>
            <img id="insta-name" className="insta-name" onClick={() => handleSectionChange('home')} src={(activeSection === 'search' || activeSection === 'Notifications') ? instalogo : logo} alt="" style={{ marginLeft: (activeSection === 'search' || 'Notifications') ? '-12px' : 'auto' }} />
          </Link>
          <li className="nav-item" id="nav-item">
            {/* Home */}
            <Link className="nav-link navbar-item active" id="home" aria-current="page"
              to="/" onClick={() => handleSectionChange('home')}>
              <img className="homeActive" src={activeSection === 'home' ? HomeActive : Home} alt="" />
              <span className="i-d">{activeSection === 'home' ? <strong>Home</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'home'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* Search */}
            <Link className="nav-link navbar-item active" id="home" aria-current="page"
              onClick={() => handleSectionChange('search')}>
              <img className={`searchActive ${activeSection === 'search' ? 'instaSearchActive' : ''}`} src={activeSection === 'search' ? searchActive : search} alt="" />
              <span className="i-d">{(activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Search'}</span>
            </Link>
          </li>
          {/* Other nav items */}
          <li className="nav-item" id="nav-item">
            {/* Explore */}
            <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Explore')} to="/Explore">
              <img className="exploreActive" src={activeSection === 'Explore' ? exploreactive : Explor} alt="" />
              <span className="i-d" id="i-d">{activeSection === 'Explore' ? <strong>Explore</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Explore'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* Reels */}
            <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Reels')} to="/Reels" id="loadReels" aria-disabled="true">
              <img className="reelsActive reelBtn" src={activeSection === 'Reels' ? reelsActive : reels} alt="" />
              <span className="i-d" id="i-d">{activeSection === 'Reels' ? <strong>Reels</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Reels'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* messages */}
            <Link className="nav-link navbar-item" to="/message" onClick={() => handleSectionChange('messages')} aria-disabled="true">
              <img className="messageActive" src={activeSection === 'messages' ? messageActive2 : messages} alt="" />
              <span className="i-d" id="i-d">{activeSection === 'messages' ? <strong>Messages</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Messages'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* notifications */}
            <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Notifications')} id="notification" aria-disabled="true">
              <img className={`notificationActive ${activeSection === 'Notifications' ? 'instaNotificationActive' : ''}`} src={activeSection === 'Notifications' ? notificationActive : notification} alt="" />
              <span className="i-d" id="i-d">{(activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Notifications'}</span>
            </Link>
          </li>
          {/* Other nav items */}
          <li className="nav-item" id="nav-item">
            {/* create */}
            <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Create')} aria-disabled="true">
              <img className="createActive" src={activeSection === 'Create' ? create : create} alt="" />
              <span className="i-d" id="i-d">{activeSection === 'Create' ? <strong>Create</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Create'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* profile */}
            <Link className="nav-link d-flex align-center" to="/profile" onClick={() => handleSectionChange('Profile')} aria-disabled="true">
              <img className="pro-img" src={pro} alt="" />
              <span className="i-d mt-1 ms-1" id="i-d">{activeSection === 'Profile' ? <strong>Profile</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Profile'}</span>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
          {/* Last thread and more option */}
          <li className="nav-item" id="nav-item">
            {/* treads */}
            <Link className="nav-link thread navbar-item" target="_blank" to="/" aria-disabled="true">
              <img src={threads} alt="" />
              <span className="i-d" id="i-d">{(activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'Threads'}</span>
            </Link>
          </li>
          <li className="nav-item" id="nav-item">
            {/* More */}
            <Link className="nav-link navbar-item" onClick={() => handleSectionChange('More')} aria-disabled="true">
              <img src={More} alt='img' />
              <span className="i-d ms-0 ps-0" id="i-d">{activeSection === 'More' ? <strong>More</strong> : (activeSection === 'search' || activeSection === 'Notifications') ? ' ' : 'More'}</span>
            </Link>
          </li>
        </ul>
      </nav>
      <Mobilenavbar />
      {/* Offcanvas Component */}
      <OffcanvasSearch isOpen={isOffcanvasSearchOpen} toggleOffcanvas={toggleOffcanvasSearch} />
      <OffcanvasNotification isOpen={isOffcanvasNotificationOpen} toggleOffcanvas={toggleOffcanvasNotification} />
    </section>
  );
};

export default Navbar;
