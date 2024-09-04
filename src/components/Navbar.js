import React from 'react'
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';

const Navbar = () => {
  // svgs
  const { logo, Home, HomeActive, searchActive, search } = useSelector(selectIcons);
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
              <a className="nav-link navbar-item active" id="home" aria-current="page"
                to="#" onClick={() => handleSectionChange('home')}><img className="homeActive"  src={activeSection === 'home' ? HomeActive : Home} alt="" srcset="" /><span
                  className="i-d" >Home</span></a>
            </li>
            {/* offcanvas search */}
            <li className="nav-item" id="nav-item">
              <a className="nav-link navbar-item active" id="home" aria-current="page" to="#" onClick={() => handleSectionChange('search')}><img className="searchActive"  src={activeSection === 'search' ? searchActive : search}
                alt="" srcset="" /><span className="i-d">Search</span></a>
            </li>
            <div className="offcanva" id="offcanva">
              <div className="content">
                <h2 className="search-off"><span>Search</span></h2>
                <div className="input"><input className="input-inner" type="text" placeholder="Search" />
                  <div className="cancel-svg"><img src="assets/svg/crossoffinput.svg" alt="" /></div>
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
              <a className="nav-link navbar-item" onclick="loadContent('explore.html')" to="#"><img
                className="exploreActive" onclick="loadContent('explore.html')" src="assets/svg/Explor.svg" alt="" srcset="" /><span
                  className="i-d" id="i-d">Explore</span></a>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link navbar-item" onclick="loadContent('reels.html')" id="loadReels" aria-disabled="true"><img className="reelsActive reelBtn" onclick="loadContent('reels.html')" src="assets/svg/reels.svg" alt="" srcset="" /><span
                className="i-d" id="i-d">Reels</span></a>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link navbar-item" onclick="loadContent('messagebox.html')" aria-disabled="true"><img className="messageActive"
                onclick="loadContent('messagebox.html')" src="assets/svg/messages.svg" alt="" srcset="" /><span
                  className="i-d" id="i-d">Messages</span></a>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link navbar-item" id="notification" aria-disabled="true"><img className="notificationActive" src="assets/svg/notification.svg" alt=""
                srcset="" /><span className="i-d" id="i-d">Notifications</span></a>
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
              <a className="nav-link navbar-item" onclick="loadContent('create.html')" aria-disabled="true"><img className="createActive"
                onclick="loadContent('create.html')" src="assets/svg/creat.svg" alt="" srcset="" /><span
                  className="i-d" id="i-d">Create</span></a>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link  d-flex align-center" onclick="loadContent('profile.html')" aria-disabled="true"><img
                className="pro-img" onclick="loadContent('profile.html')" src="assets/images/IMG-20240418-WA0007 (2).jpg"
                alt="" srcset="" /><span className="i-d mt-1 ms-1" id="i-d">Profile</span></a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
            {/* <!-- last thread and more option --> */}
            <li className="nav-item" id="nav-item">
              <a className="nav-link thread navbar-item" target="_blank" to="threads.html" aria-disabled="true"><img
                src="assets/svg/Treads.svg" alt="" srcset="" /><span className="i-d" id="i-d">Threads</span></a>
            </li>
            <li className="nav-item" id="nav-item">
              <a className="nav-link navbar-item" aria-disabled="true"><img src="assets/svg/moreindex.svg" alt="" srcset="" /><span
                className="i-d ms-0 ps-0" id="i-d">More</span></a>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Navbar
