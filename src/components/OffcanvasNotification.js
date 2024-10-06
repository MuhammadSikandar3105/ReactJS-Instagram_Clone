// OffcanvasSearch.js
import React from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';

const OffcanvasNotification = ({ isOpen, toggleOffcanvas }) => {

    // SVGs
    const { pro } = useSelector(selectIcons);
    return (
        <>
            <div className={`offcanva ${isOpen ? 'showContent' : ''}`} id="offcanva">
                <div className="content">
                    <h2 className="search-off"><span><strong>Notifications</strong></span></h2>
                    <div className="recent"><span><strong>New</strong></span></div>

                    <hr className="off-hr" />

                    <div className="recent"><span><strong>Earlier</strong></span></div>

                    <div className="recent-search-result my-2">
                        <div className="first-user d-flex flex-row">
                            <div className="first-user-image"><img src={pro} alt="profile" /></div>
                            <div className="first-user-name d-flex ">
                                <div className="first-user-name-name">SK Malik</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className={`overlay ${isOpen ? 'showContent' : ''}`} id="overlay" onClick={toggleOffcanvas}></div>
        </>
    );
};

export default OffcanvasNotification;
