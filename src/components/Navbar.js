import React from 'react'
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';
import { Link, useNavigate } from 'react-router-dom';
import { openModal } from '../state/store/modalSlice';

const Navbar = () => {
  // svgs
  const { logo, Home, HomeActive, reels, notification, reelsActive, notificationActive, messageActive2, messages, search, searchActive, Explor, exploreactive, More, threads, create, cross, pro } = useSelector(selectIcons);
  // active section
  const dispatch = useDispatch();
  const activeSection = useSelector(selectActiveSection);

  const handleSectionChange2 = (section) => {
    if (section === 'Create') {
      dispatch(openModal());
      dispatch(setActiveSection(section));
    }
  };
  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));
  }

  const modalState = useSelector((state) => state.modal.isOpen);
  console.log(modalState);

let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login')
  }

  return (
    <>
      <section>
        <nav id="navbar-sec" className=" navbar-sec navbar-expand bg-body-dark " data-bs-theme="dark">
          <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
            <Link className="navbar-brand my-4 ms-0 px-3" to="/" ><span id="insta-logo" className="insta-logo ms-3"></span><img id="insta-name" className="insta-name"
              src={logo} alt="" /></Link>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item active" id="home" aria-current="page"
                to="/" onClick={() => handleSectionChange('home')}><img className="homeActive" src={activeSection === 'home' ? HomeActive : Home} alt="" srcset="" /><span
                  className="i-d" >{activeSection === 'home' ? <strong>Home</strong> : 'Home'}</span></Link>
            </li>
            {/* offcanvas search */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item active" id="home" aria-current="page" onClick={() => handleSectionChange('search')}><img className="searchActive" src={activeSection === 'search' ? searchActive : search}
                alt="" srcset="" /><span className="i-d">{activeSection === 'search' ? <strong>Search</strong> : 'Search'}</span></Link>
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
                  className="i-d" id="i-d">{activeSection === 'Explore' ? <strong>Explore</strong> : 'Explore'}</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Reels')} id="loadReels" aria-disabled="true"><img className="reelsActive reelBtn" src={activeSection === 'Reels' ? reelsActive : reels} alt="" srcset="" /><span
                className="i-d" id="i-d">{activeSection === 'Reels' ? <strong>Reels</strong> : 'Reels'}</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('messages')} aria-disabled="true"><img className="messageActive"
                src={activeSection === 'messages' ? messageActive2 : messages} alt="" srcset="" /><span
                  className="i-d" id="i-d">{activeSection === 'messages' ? <strong>Messages</strong> : 'Messages'}</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={() => handleSectionChange('Notifications')} id="notification" aria-disabled="true"><img className="notificationActive" src={activeSection === 'Notifications' ? notificationActive : notification} alt=""
                srcset="" /><span className="i-d" id="i-d">{activeSection === 'Notifications' ? <strong>Notifications</strong> : 'Notifications'}</span></Link>
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
              <Link className="nav-link navbar-item" onClick={() => { handleSectionChange2('Create') }} aria-disabled="true" ><img className="createActive"
                src={activeSection === 'Create' ? create : create} alt="" srcset="" /><span
                  className="i-d" id="i-d">{activeSection === 'Create' ? <strong>Create</strong> : 'Create'}</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link  d-flex align-center" onClick={() => handleSectionChange('Profile')} aria-disabled="true"><img
                className="pro-img" src={pro}
                alt="" srcset="" /><span className="i-d mt-1 ms-1" id="i-d">{activeSection === 'Profile' ? <strong>Profile</strong> : 'Profile'}</span></Link>
            </li>
          </ul>
          <ul className="navbar-nav d-flex flex-column nav-main justify-content-start">
            {/* <!-- last thread and more option --> */}
            <li className="nav-item" id="nav-item">
              <Link className="nav-link thread navbar-item" target="_blank" to="/" aria-disabled="true"><img
                src={threads} alt="" srcset="" /><span className="i-d" id="i-d">Threads</span></Link>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link navbar-item" onClick={handleLogout} aria-disabled="true"><img src={More} alt='img' /><span
                className="i-d ms-0 ps-0" id="i-d">{activeSection === 'More' ? <strong>More</strong> : 'More'}</span></Link>
            </li>
          </ul>
        </nav>
      </section>
    </>
  )
}

export default Navbar
