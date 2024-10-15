import React, { useState, useEffect } from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/story-sec.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { openStoryModal } from '../state/store/storymodal';
import { openStoryRetrieveModal } from '../state/store/storyRetrieveModal';

const Story = () => {
  const { pluspost, pro } = useSelector(selectIcons);
  const [story, setStory] = useState([]);
  const [currentStoryImage, setCurrentStoryImage] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem('token');
        const responseCurrentUser = await axios.get('/api/auth/getuser', {
          headers: { 'auth-token': token }
        });
        const currentUser = responseCurrentUser.data;
        setUser(currentUser);

        const response = await axios.get('/api/story/fetchallstories');
        const allStories = response.data;

        const validStories = allStories.filter(async (story) => {
          const storyCreationTime = new Date(story.createdAt);
          const currentTime = new Date();
          const timeDifference = currentTime - storyCreationTime;

          if (timeDifference > 24 * 60 * 60 * 1000) {
            await deleteStory(story._id);
            return false;
          }
          return true;
        });

        const currentUserStories = validStories.filter(story => story.user._id === currentUser._id);
        if (currentUserStories.length > 0) {
          setCurrentStoryImage(currentUserStories[0].fileUrl);
        }

        const otherUsersStories = validStories.filter(story => story.user._id !== currentUser._id);
        const uniqueUsers = getUniqueUsers(otherUsersStories);
        setStory(uniqueUsers);

      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  const deleteStory = async (storyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/story/deletestoryauto/${storyId}`, {
        headers: { 'auth-token': token }
      });
      console.log(`Story ${storyId} deleted`);
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const getUniqueUsers = (stories) => {
    const usersMap = new Map();
    stories.forEach(story => {
      if (story.user && !usersMap.has(story.user._id)) {
        usersMap.set(story.user._id, story.user);
      }
    });
    return Array.from(usersMap.values());
  };

  const handleStorymodal = () => {
    dispatch(openStoryModal());
  };

  // Pass the clicked user's data to the modal
  const handleStoryRetrievemodal = (userData) => {
    dispatch(openStoryRetrieveModal(userData)); // Dispatch user data as payload
  };

  return (
    <div className="stories d-flex">
      <div className="story-card">
        <div className="back-linear-not" onClick={handleStorymodal}>
          {currentStoryImage ? (
            /\.(jpg|jpeg|png|gif)$/i.test(currentStoryImage) ? (
              <img
                src={currentStoryImage || pro}
                alt=""
                style={currentStoryImage ? { border: '2px solid red' } : {}}
              />
            ) : /\.(mp4|webm|ogg)$/i.test(currentStoryImage) ? (
              <video
                src={currentStoryImage}
                controls
                alt="Current User Story Video"
                style={currentStoryImage ? { border: '2px solid red' } : {}}
              />
            ) : (
              <img
                src={pro} // Fallback to default profile picture if no media matches
                alt="Default Profile"
              />
            )
          ) : (
            <img
              src={pro} // Fallback to default profile picture if no media
              alt="Default Profile"
            />
          )}
          <div className="plus-icon-story">
            <img src={pluspost} alt="Plus Icon" />
          </div>
        </div>
        <div className="name">
          <p>{user ? (user.name.length > 7 ? user.name.slice(0, 7) + '...' : user.name) : "Loading..."}</p>
        </div>
      </div>
      {story && story.length > 0 && story.map(user => (
        <div key={user._id} className="story-card">
          <div className="back-linear" onClick={() => handleStoryRetrievemodal(user)}>
            {user
              ? (user.profilePictureUrl?.endsWith('.mp4') || user.profilePictureUrl?.endsWith('.avi') || user.profilePictureUrl?.endsWith('.mov')
                ? <video src={user.profilePictureUrl} controls className="story-video" alt={user.name} />
                : <img src={user.profilePictureUrl || pro} alt={user.name} className="story-image" />
              )
              : (currentStoryImage?.endsWith('.mp4') || currentStoryImage?.endsWith('.avi') || currentStoryImage?.endsWith('.mov')
                ? <video src={currentStoryImage} controls className="story-video" alt="Current Story" />
                : <img src={currentStoryImage || pro} alt="Current Story" className="story-image" />
              )
            }
          </div>
          <div className="name">
            <p>{user.name.length > 7 ? user.name.slice(0, 7) + '...' : user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Story;
