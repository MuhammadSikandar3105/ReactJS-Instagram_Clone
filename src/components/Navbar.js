import React from 'react'
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // svgs
  const { logo, Home, HomeActive, reels, notification, reelsActive, notificationActive, messageActive2,  messages, search, searchActive, Explor, exploreactive,  More, threads, create, cross, pro } = useSelector(selectIcons);
  // active section
  const dispatch = useDispatch();
  const activeSection = useSelector(selectActiveSection);

  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));
  };
  return (
    <>
      <section>
        <nav id="navbar-sec" className=" navbar-sec navbar-expand bg-body-dark " data-bs-theme="dark">
          <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
            <a className="navbar-brand my-4 ms-0 px-3" to="#" ><span id="insta-logo" className="insta-logo ms-3"></span><img id="insta-name" className="insta-name"
              src={logo} alt="" srcset="" /></a>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item active" id="home" aria-current="page"
                to="/" onClick={() => handleSectionChange('home')}><img className="homeActive" src={activeSection === 'home' ? HomeActive : Home} alt="" srcset="" /><span
                  className="i-d" >Home</span></Link>
            </li>
            {/* offcanvas search */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item active" id="home" aria-current="page" onClick={() => handleSectionChange('search')}><img className="searchActive" src={activeSection === 'search' ? searchActive : search}
                alt="" srcset="" /><span className="i-d">Search</span></Link>
            </li>
            <div className="offcanva" id="offcanva">
              <div className="content">
                <h2 className="search-off"><span>Search</span></h2>
                <div className="input"><input className="input-inner" type="text" placeholder="Search" />
                  <div className="cancel-svg"><img src={cross} alt="" /></div>
                </div>
                <hr className="off-hr" />
                <div className="recent"><span>Recent</span></div>
                <div className="recent-search-result">
                  <div className="result"><span></span></div>
                </div>
              </div>
            </div>
            <div className="overlay" id="overlay"></div>
            {/* <!-- offcanvas serach end --> */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Explore')} to="/Explore"><img
                className="exploreActive" src={activeSection === 'Explore' ? exploreactive : Explor} alt="" srcset="" /><span
                  className="i-d" id="i-d">Explore</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Reels')} id="loadReels" aria-disabled="true"><img className="reelsActive reelBtn" src={activeSection === 'Reels' ? reelsActive : reels} alt="" srcset="" /><span
                className="i-d" id="i-d">Reels</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('messages')} aria-disabled="true"><img className="messageActive"
                src={activeSection === 'messages' ? messageActive2 : messages} alt="" srcset="" /><span
                  className="i-d" id="i-d">Messages</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Notifications')} id="notification" aria-disabled="true"><img className="notificationActive" src={activeSection === 'Notifications' ? notificationActive : notification} alt=""
                srcset="" /><span className="i-d" id="i-d">Notifications</span></Link>
            </li>
            {/* <!-- offcanvas notification --> */}
            <div className="offcanva" id="offcanva">
              <div className="content">
                <h2 className="search-off"><span>Notifications</span></h2>
                <hr className="off-hr" />
                <div className="recent"><span>Recent</span></div>
                <div className="recent-search-result">
                  <div className="result"><span></span></div>
                </div>
              </div>
            </div>
            <div className="overlay" id="overlay"></div>
            {/* <!-- offcanva end --> */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Create')} aria-disabled="true"><img className="createActive"
                src={activeSection === 'Create' ? create : create} alt="" srcset="" /><span
                  className="i-d" id="i-d">Create</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link  d-flex align-center" onClick={() => handleSectionChange('Profile')} aria-disabled="true"><img
                className="pro-img" src={pro}
                alt="" srcset="" /><span className="i-d mt-1 ms-1" id="i-d">Profile</span></Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
            {/* <!-- last thread and more option --> */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link thread navbar-item" target="_blank" to="/" aria-disabled="true"><img
                src={threads} alt="" srcset="" /><span className="i-d" id="i-d">Threads</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('More')} aria-disabled="true"><img src={More} srcset="" /><span
                className="i-d ms-0 ps-0" id="i-d">More</span></Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Navbar
