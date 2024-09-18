import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { closeModal, selectIsModalOpen } from '../state/store/modalSlice';
import '../styles/moreModal.css';

const More = () => {
  // SVGs
  const { settings } = useSelector(selectIcons);

  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);


  const handleClose = () => {
    dispatch(closeModal());
  };


  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <div className="setings d-flex align-items-center">
          <img src={settings} alt="" />
          <p>Settings</p>
        </div>
        <div className="logout">
          <p>Log out</p>
        </div>
      </div>
    </div>

  );
};

export default More;
