import React from 'react'
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/story-sec.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';

const Story = () => {
   // svgs
   const {  pluspost, pro } = useSelector(selectIcons);
   // active section
   const dispatch = useDispatch();
   const activeSection = useSelector(selectActiveSection);
 
   const handleSectionChange = (section) => {
     dispatch(setActiveSection(section));
   };
  return (
    <>
      <div className=" stories d-flex">
        {/* <!-- add your story card --> */}
        <div className=" story-card">
          <div className="back-linear-not">
            <img src={pro} alt=""/>
              <div className="plus-icon-story">
                <img src={pluspost} alt=""/>
              </div>
          </div>
          <div className="name">
            <p>Mr.Malik5431</p>
          </div>
        </div>
        {/* <!-- card-4 --> */}
        <div className="story-card">
          <div className="back-linear">
            <img src={pro} alt=""/>
          </div>
          <div className="name">
            <p>Mr.Malik5431</p>
          </div>
        </div>
        {/* <!-- card-5 --> */}
        <div className=" story-card">
          <div className="back-linear">
            <img src={pro} alt=""/>
          </div>
          <div className="name">
            <p>Mr.Malik5431</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Story
