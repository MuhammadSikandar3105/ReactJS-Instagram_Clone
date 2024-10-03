import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIcons } from '../state/store/iconSlice';
import { closeMoreModal, selectIsMoreModalOpen } from '../state/store/moreModal';
import '../styles/moreModal.css';

const More = () => {
  const { settings } = useSelector(selectIcons);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsMoreModalOpen);

  const modalRef = useRef(null);

  const handleClose = () => {
    dispatch(closeMoreModal());
  };

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
  }, [isModalOpen]);
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
        <div className="modal-header2">
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <div className="setings d-flex align-items-center">
          <img src={settings} alt="" />
          <p>Settings</p>
        </div>
        <div className="logout" onClick={handleLogout} >
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
};

export default More;
