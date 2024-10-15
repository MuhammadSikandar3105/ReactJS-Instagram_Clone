import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeStoryModal, selectIsStoryModalOpen } from '../state/store/storymodal';
import { addPostSuccess, addPostFailure } from '../state/store/postSlice'; // update action creators if needed
import '../styles/storymodal.css';

const Storymodal = () => {
  const dispatch = useDispatch();
  const isStoryModalOpen = useSelector(selectIsStoryModalOpen);


  const [media, setMedia] = useState(null); // Handle both image and video in one state
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(closeStoryModal());
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    const fileType = file.type.split('/')[0];

    if (fileType === 'image' || fileType === 'video') {
      setMedia(file);
    } else {
      alert('Only images and videos are allowed for stories.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!media) {
      alert('Please select an image or video for your story.');
      return;
    }

    const formData = new FormData();
    formData.append('file', media); // Updated to 'file' as required by the story endpoint
    formData.append('caption', caption);

    try {
      setLoading(true);

      // Include the auth token in the request headers
      const response = await axios.post('/api/story/addstory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token'), // Ensure the token is being fetched from localStorage
        },
      });
      const newStory = response.data;

      if (newStory) {
        dispatch(addPostSuccess(newStory)); // Dispatch success action
      } else {
        throw new Error('New story data is not defined');
      }
      window.location.reload();
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error, "error in sending story");
      const errorMessage = error.response ? error.response.data : 'An unexpected error occurred';
      dispatch(addPostFailure(errorMessage)); // Dispatch failure action
    } finally {
      setLoading(false);
    }
  };

  if (!isStoryModalOpen) return false;

  return (
    <div className="modal-overlay">
      <div className="modal-content2">
        <div className="modal-header">
          <h2>Add New Story</h2>
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group media-upload">
            <label htmlFor="media-upload" className="media-upload-label">
              Choose File
            </label>
            <input
              type="file"
              id="media-upload"
              accept="image/*, video/*"
              onChange={handleMediaChange}
              className="media-input"
            />
            {media && media.type.startsWith('image') && (
              <img src={URL.createObjectURL(media)} alt="Selected preview" className="image-preview" />
            )}
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
              placeholder="Write a caption..."
            ></textarea>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Storymodal;
