import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeStoryRetrieveModal,
  selectIsStoryRetrieveModalOpen,
  selectCurrentUser, // Import selector for current user
} from '../state/store/storyRetrieveModal';
import { selectIcons } from '../state/store/iconSlice';
import '../styles/story-card-sec.css'; // Adjust with appropriate styles

const StoryRetrieveModal = () => {
  const { pro } = useSelector(selectIcons);
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(true); //play/pause state
  const videoRef = useRef(null);

  const isStoryRetrieveModalOpen = useSelector(selectIsStoryRetrieveModalOpen);
  const currentUser = useSelector(selectCurrentUser); // Get the current user from Redux state
  const [userStories, setUserStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  // Close modal
  const handleClose = () => {
    dispatch(closeStoryRetrieveModal());
    setCurrentStoryIndex(0); // Reset story index when closing
    setIsPlaying(false);
  };

  // Fetch user stories
  const fetchUserStories = async () => {
    if (currentUser && currentUser._id) {
      try {
        setLoading(true); // Show loading while fetching
        const response = await axios.get(`/api/story/fetchstoriesmodal/${currentUser._id}`);
        setUserStories(response.data);
        setLoading(false); // Turn off loading after fetch
      } catch (error) {
        console.error('Error fetching user stories:', error);
        setLoading(false);
      }
    }
  };


  // Navigate to the next story
  const handleNextStory = () => {
    if (currentStoryIndex < userStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  // Navigate to the previous story
  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  // play pause the story 
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };

  // Open modal and fetch stories on first render
  useEffect(() => {
    if (isStoryRetrieveModalOpen) {
      fetchUserStories();
    }
  }, [isStoryRetrieveModalOpen]);

  // Auto advance stories after 5 seconds like Instagram
  useEffect(() => {
    if (isStoryRetrieveModalOpen && userStories.length > 0) {
      setIsPlaying(false);
      const timer = setTimeout(() => {
        handleNextStory();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentStoryIndex, isStoryRetrieveModalOpen]);

  if (!isStoryRetrieveModalOpen || !currentUser) return null; // Don't render modal if it's not open or user not available

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div className="story-header">
            <img
              src={currentUser.profilePictureUrl || pro}
              alt={`${currentUser.name}'s profile`}
              className="story-profile-pic"
            />
            <span>{currentUser.name}</span>
          </div>
          <button onClick={handleClose} className="close-btn">
            &times;
          </button>
        </div>

        <div className="modal-body">
          {loading ? (
            <p>Loading stories...</p>
          ) : userStories.length > 0 ? (
            <>
              <div className="story-display">
                {userStories[currentStoryIndex].fileUrl ? (
                  userStories[currentStoryIndex].fileUrl.endsWith('.jpg') ||
                    userStories[currentStoryIndex].fileUrl.endsWith('.jpeg') ||
                    userStories[currentStoryIndex].fileUrl.endsWith('.png') ? (
                    <img
                      src={userStories[currentStoryIndex].fileUrl}
                      alt="User story"
                      className="story-image"
                    />
                  ) : userStories[currentStoryIndex].fileUrl.endsWith('.MP4') ||
                      userStories[currentStoryIndex].fileUrl.endsWith('.mp4') ||
                    userStories[currentStoryIndex].fileUrl.endsWith('.mov') ? (
                      <div className="story-video-container">
                      <video
                        src={userStories[currentStoryIndex].fileUrl}
                        className="story-video"
                        ref={videoRef}
                        onClick={handlePlayPause} // Add play/pause functionality when clicking the video
                      />
                      {!isPlaying && (
                        <button className="play-pause-btn" onClick={handlePlayPause}>
                          &#9658; {/* Play icon */}
                        </button>
                      )}
                    </div>
                  ) : (
                    <p>Unsupported media type</p>
                  )
                ) : (
                  <p>No story available.</p>
                )}

                <p>{userStories[currentStoryIndex].caption}</p>
              </div>

              {/* Story navigation */}
              <div className="story-navigation">
                <button
                  className="previous"
                  onClick={handlePreviousStory}
                  disabled={currentStoryIndex === 0}
                >
                  Previous
                </button>
                <button
                  className="next"
                  onClick={handleNextStory}
                  disabled={currentStoryIndex === userStories.length - 1}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p>No stories available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryRetrieveModal;
