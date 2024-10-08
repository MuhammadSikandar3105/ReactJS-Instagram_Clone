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
  const [video, setVideo] = useState(null); // Added video state
  const [audio, setAudio] = useState(null);
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(closeModal());
  };

   // handles for media change 
  const handleMediaChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      const fileType = file.type.split('/')[0];
      if (fileType === 'image') {
        setImage(file);
        setVideo(null);
        setAudio(null);
      } else if (fileType === 'video') {
        setVideo(file);
        setImage(null);
        setAudio(null);
      } else if (fileType === 'audio') {
        setAudio(file);
        setImage(null);
        setVideo(null);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);
    if (audio) formData.append('audio', audio);
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
      const newPost = response.data;

      if (newPost) {
        dispatch(addPostSuccess(newPost)); // Dispatch success action
      } else {
        throw new Error('New post data is not defined');
      }
      window.location.reload();
      handleClose(); // Close the modal
    } catch (error) {
      console.error(error, "error in sending");
      const errorMessage = error.response ? error.response.data : 'An unexpected error occurred';
      dispatch(addPostFailure(errorMessage)); // Dispatch failure action
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
          <div className="form-group media-upload">
            <input
              type="file"
              id="media"
              accept="image/*, video/*, audio/*"
              onChange={handleMediaChange}
              multiple // Allows multiple file selection
            />
            {image && <img src={URL.createObjectURL(image)} alt="Selected preview" className="image-preview" />}
            {video && <video src={URL.createObjectURL(video)} controls className="video-preview" />}
            {audio && <audio src={URL.createObjectURL(audio)} controls className="audio-preview" />}
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
