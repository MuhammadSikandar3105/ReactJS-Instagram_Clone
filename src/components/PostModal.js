import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectIsModalOpen } from '../state/store/modalSlice';
import { addPostSuccess, addPostFailure } from '../state/store/postSlice'; // update action creators if needed
import '../styles/postModal.css';

const PostModal = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the actual file, not the data URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', image);
    formData.append('caption', caption);
    formData.append('location', location);
    // hashtags
    const hashtagsArray = hashtags.split(',').map(tag => tag.trim()).filter(tag => tag); // Filter out any empty strings
    hashtagsArray.forEach(tag => formData.append('hashtags[]', tag)); // Append each hashtag as a separate entry


    try {
      setLoading(true);

      // Include the auth token in the request headers
      const response = await axios.post('/api/posts/addpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'auth-token': localStorage.getItem('token'), // Ensure the token is being fetched from localStorage or the proper source
        },
      });

      dispatch(addPostSuccess(response.data)); // Dispatch success action
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error, "error in sending");
      dispatch(addPostFailure(error.response.data)); // Dispatch failure action
    } finally {
      setLoading(false);
    }
  };


  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button onClick={handleClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group image-upload">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <img src={URL.createObjectURL(image)} alt="Selected preview" className="image-preview" />}
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
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="hashtags">Hashtags</label>
            <input
              type="text"
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="Add hashtags"
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>

  );
};

export default PostModal;
