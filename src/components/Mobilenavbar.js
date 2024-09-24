import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';
import { Link } from 'react-router-dom';

const Mobilenavbar = () => {
  // SVGs
  const { logo, Home, HomeActive, reels, notification, pro, reelsActive, searchindex, messageActive2, following, messages, Explor, exploreactive, dropdown, favourite, create } = useSelector(selectIcons);
  // Active section
  const dispatch = useDispatch();
  const activeSection = useSelector(selectActiveSection);
  const handleSectionChange = (section) => {
    dispatch(setActiveSection(section));

    if (section === 'home') {
      console.log('home section is active')
    }
  };

  return (
    <>
      {/* <!-- ==============navbar for mobile devices start =================--> */}
      <div className="row-gap-5">
        <nav className="container-fluid navbar navbar-expand mob-t-nav d-none bg-body-dark " data-bs-theme="dark">
          {/* logo */}
          <Link className="navbar-brand" to="/"><img onClick={() => handleSectionChange('home')} className="insta-name px-2"
            src={logo} alt=""  />
            <span className="dropdown p-0 ms-0 mt-0 ">
              <Link className="btn" role="button" data-bs-toggle="dropdown" aria-expanded="false"><img
                src={dropdown} alt="" />
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" >Follwing <img src={following} alt="" /></Link>
                </li>
                <li><Link className="dropdown-item" >Favourit <img src={favourite} alt="" /></Link>
                </li>
              </ul>
            </span>
          </Link>
          <ul className="navbar-nav d-flex flex-row justify-content-start search-m-e">
            <li className="nav-item" id="nav-item">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <img className="d-none search-m mb-0" src={searchindex} onClick={() => handleSectionChange('Search')} alt="" />
              </form>
            </li>
            <li className="nav-item" id="nav-item">
              <Link className="nav-link" aria-disabled="true"><img src={notification} onClick={() => handleSectionChange('notification')} alt=""
                 /><span></span></Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-fluid mob-b-nav d-none">
        <ul className="navbar-nav d-flex flex-row justify-content-start">
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link active" aria-current="page" to="/"><img
              className="homeActive" onClick={() => handleSectionChange('home')} src={activeSection === 'home' ? HomeActive : Home}  alt=""  /><span className="i-d" id="i-d"></span></Link>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link" to="/explore"><img className="exploreActive" onClick={() => handleSectionChange('explore')} src={activeSection === 'explore' ? exploreactive : Explor} alt=""
               /><span className="i-d" id="i-d"></span></Link>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link" to="/reels" aria-disabled="true"><img className="reelsActive" onClick={() => handleSectionChange('reels')} src={activeSection === 'reels' ? reelsActive : reels}
              alt="" /><span className="i-d" id="i-d"></span></Link>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link" aria-disabled="true"><img className="createActive" onClick={() => handleSectionChange('create')} src={create}
              alt=""  /><span className="i-d" id="i-d"></span></Link>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link" to="/messages" aria-disabled="true"><img className="messageActive" onClick={() => handleSectionChange('mesages')}
              src={activeSection === 'mesages' ? messageActive2 : messages} alt=""  /><span className="i-d" id="i-d"></span></Link>
          </li>
          <li className="nav-item mob-i-m" id="nav-item">
            <Link className="nav-link" to="/profile" aria-disabled="true"><img className="pro-img" onClick={() => handleSectionChange('profile')}
              src={pro} alt="" /></Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Mobilenavbar;
