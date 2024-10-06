import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIcons } from '../state/store/iconSlice';
import { closeMoreModal, selectIsMoreModalOpen } from '../state/store/moreModal';
import '../styles/moreModal.css';

const More = () => {
  const { settings, report_problem, switch_appearence, saved, activity, } = useSelector(selectIcons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsMoreModalOpen);

  const modalRef = useRef(null);

  const handleClose = useCallback(() => {
    dispatch(closeMoreModal());
  }, [dispatch]);

  // Effect to handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If modal is open and the click target is not inside the modal content
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        handleClose();
      }
    };

    // Add event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount or when modal is closed
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, handleClose]);
  // Logout Handle
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleClose();
    navigate('/login');
  };
  if (!isModalOpen) return null;


  return (
    <div className="modal-overlay2">
      <div className="modal-content2" ref={modalRef}>
        <div className="d-flex flex-column justify-content-between align-item-center">
          {/* settings */}
          <div className="settings d-flex flex-row align-items-center my-3">
            <img src={settings} alt="" />
            <p style={{ margin: '4px 0px 0px 10px' }}>Settings</p>
          </div>
          {/* your activity */}
          <div className="settings d-flex flex-row align-items-center my-3">
            <img src={activity} alt="" />
            <p style={{ margin: '4px 0px 0px 10px' }}>Your Activity</p>
          </div>
          {/* saved */}
          <div className="settings d-flex flex-row align-items-center my-3">
            <img src={saved} alt="" />
            <p style={{ margin: '4px 0px 0px 10px' }}>Saved</p>
          </div>
          {/* switch appearence */}
          <div className="settings d-flex flex-row align-items-center my-3">
            <img src={switch_appearence} alt="" />
            <p style={{ margin: '4px 0px 0px 10px' }}>Switch Appearence</p>
          </div>
          {/* report a problem */}
          <div className="settings d-flex flex-row align-items-center my-3">
            <img src={report_problem} alt="" />
            <p style={{ margin: '4px 0px 0px 10px' }}>Report a Problem</p>
          </div>
          <hr style={{ border: '3px solid', display: 'block', width: '100%', flexGrow: 1 }} />
          {/* switch acounts */}
          <div className="settings d-flex flex-row align-items-center my-1">
            <p style={{ margin: '4px 0px 0px 0' }}>Switch Acounts</p>
          </div>
          <hr />
          <div className="logout" onClick={handleLogout} >
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default More;
