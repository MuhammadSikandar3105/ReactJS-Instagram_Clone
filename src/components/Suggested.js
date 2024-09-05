import React from 'react'
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/sugestion.css';

import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';

const Suggested = () => {
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
      <div className="container suggested-sec d-flex">
        <div className="d-flex justify-content-end m-auto flex-column mt-5">
          <div className="head-sugg">
            <h4><span className="sugg">Suggestions for you</span></h4>
            <h4><span className="see">See all</span></h4>
          </div>
          <div className="main-scroll-div">
            <div className="cover-sugg-ca">
              <div>
                <button onclick="scrollr()" className="icon-caro icon-l"><i
                  className="fas fa-angle-left angle-ic"></i></button>
              </div>
              <div className="scroll-images">
                <div className="child">
                  <div className="child-image card-suggestion">
                    <img className="cross-ic" src="assets/svg/cross.svg" alt="img" />
                    <div className="item d-flex flex-column justify-content-center">
                      <div><img className="profile-su-img" src="assets/images/IMG-20240418-WA0007 (2).jpg" alt="" />
                      </div>
                      <h6 className="name">abdullah</h6>
                      <p><span className="para-1">Followed by</span><span className="para-2">mohsinkahn1345
                        and...</span>
                      </p>
                      <span className="followed-imgs">
                        <img className="followed-img-1" src="assets/images/IMG_4326.jpg" alt="img" />
                        <img className="followed-img-2" src="assets/images/IMG_4310.jpg" alt="" />
                      </span>
                    </div>
                    <div className="item-2">
                      <a className="follow-end" href="">Follow</a>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button onclick="scrolll()" className="icon-caro icon-r"><i
                  className="fas fa-angle-right angle-ic"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Suggested
