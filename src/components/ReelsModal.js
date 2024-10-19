import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeReelsModal, selectIsReelsModalOpen } from '../state/store/reelsSlice'; // Updated modal slice for reels
// import { addReelSuccess, addReelFailure } from '../state/store/reelsSlice'; // Updated action creators for reels
import '../styles/reelsModal.css'; // Ensure a separate or updated CSS file for reels modal

const ReelsModal = () => {
  const dispatch = useDispatch();
  const isReelsModalOpen = useSelector(selectIsReelsModalOpen); // Updated selector for reels modal

  const [media, setMedia] = useState(null); // Handle both image and video in one state
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(closeReelsModal()); // Close reels modal
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split('/')[0];

    if (fileType === 'video') {
      setMedia(file); // Reels should only be video files
    } else {
      alert('Only videos are allowed for reels.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media) {
      alert('Please select a video for your reel.');
      return;
    }
console.log(media);
    const formData = new FormData();
    formData.append('file', media); // Updated to 'file' as required by the reels endpoint
    formData.append('caption', caption);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);  // Check that file and caption are included correctly
    }

    try {
      setLoading(true);

      // Include the auth token in the request headers
      const response = await axios.post('/api/reel/addreel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token'), // Ensure the token is being fetched from localStorage
        },
      });
      const newReel = response.data;

      if (newReel) {
      } else {
        throw new Error('New reel data is not defined');
      }
      window.location.reload(); // Reload the page to reflect the new reel
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error, "error in sending reel");
      const errorMessage = error.response ? error.response.data : 'An unexpected error occurred';
    } finally {
      setLoading(false);
    }
  };

  if (!isReelsModalOpen) return null; // Return null if modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Reel</h2>
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group media-upload">
            <label htmlFor="media-upload" className="media-upload-label">
              Choose Video
            </label>
            <input
              type="file"
              id="media-upload"
              accept="video/*"
              onChange={handleMediaChange}
              className="media-input"
            />
            {media && media.type.startsWith('video') && (
              <video src={URL.createObjectURL(media)} controls className="video-preview" />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="caption">Caption</label>
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              placeholder="Write a caption for your reel..."
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post Reel'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReelsModal;
