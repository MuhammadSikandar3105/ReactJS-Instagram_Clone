// OffcanvasSearch.js
import React from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';

const OffcanvasSearch = ({ isOpen, toggleOffcanvas }) => {
  return (
    <>
      <div className={`offcanva ${isOpen ? 'showContent' : ''}`} id="offcanva">
        <div className="content">
          <h2 className="search-off"><span>Search</span></h2>
          <div className="input">
            <input className="input-inner" type="text" placeholder="Search" />
            <div className="cancel-svg" onClick={toggleOffcanvas}>
              <img src="assets/svg/crossoffinput.svg" alt="cancel" />
            </div>
          </div>
          <hr className="off-hr" />
          <div className="recent"><span>Recent</span></div>
          <div className="recent-search-result">
            <div className="result"><span></span></div>
          </div>
        </div>
      </div>
      <div className={`overlay ${isOpen ? 'showContent' : ''}`} id="overlay" onClick={toggleOffcanvas}></div>
    </>
  );
};

export default OffcanvasSearch;
