import React, { useState, useEffect } from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/story-sec.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { openStoryModal } from '../state/store/storymodal';

const Story = () => {
  const { pluspost, pro } = useSelector(selectIcons);
  const [story, setStory] = useState([]);
  const [currentStoryImage, setCurrentStoryImage] = useState(null); // Store current user's first story image
  const [user, setUser] = useState(null); // Store current user
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch the current user's details using the token
        const responseCurrentUser = await axios.get('/api/auth/getuser', {
          headers: { 'auth-token': token }
        });
        const currentUser = responseCurrentUser.data;
        setUser(currentUser); // Set the current user

        // Fetch all stories
        const response = await axios.get('/api/story/fetchallstories'); // Adjust the API URL if needed
        const allStories = response.data;

        // Filter stories and delete expired ones for both current and other users
        const validStories = allStories.filter(async (story) => {
          const storyCreationTime = new Date(story.createdAt);
          const currentTime = new Date();
          const timeDifference = currentTime - storyCreationTime;

          // 1 minute = 1 * 60 * 1000 milliseconds
          if (timeDifference >24 * 60 * 60 * 1000) {
            // Delete story if expired
            await deleteStory(story._id);
            return false; // Exclude expired stories from the valid stories array
          }
          return true; // Include non-expired stories
        });

        // Separate current user's stories from others
        const currentUserStories = validStories.filter(story => story.user._id === currentUser._id);
        if (currentUserStories.length > 0) {
          setCurrentStoryImage(currentUserStories[0].fileUrl); // Set current user's first story
        }

        // Filter out current user's stories and get unique users for other users' stories
        const otherUsersStories = validStories.filter(story => story.user._id !== currentUser._id);
        const uniqueUsers = getUniqueUsers(otherUsersStories); // Get unique users
        setStory(uniqueUsers); // Set the unique users' stories

      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    fetchStories();
  }, []);

  // Function to delete an expired story
  const deleteStory = async (storyId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/story/deletestory/${storyId}`, {
        headers: { 'auth-token': token }
      });
      console.log(`Story ${storyId} deleted`);
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  // Extract unique users from the stories
  const getUniqueUsers = (stories) => {
    const usersMap = new Map();
    stories.forEach(story => {
      if (story.user && !usersMap.has(story.user._id)) {
        usersMap.set(story.user._id, story.user); // Add unique users
      }
    });
    return Array.from(usersMap.values());
  };

  const handleStorymodal = () => {
    dispatch(openStoryModal());
  };

  return (
    <>
      <div className="stories d-flex">
        {/* Add your story card */}
        <div className="story-card">
          <div className="back-linear-not" onClick={handleStorymodal}>
            {/* Display the current user's first story image or a placeholder */}
            <img 
              src={currentStoryImage || pro} 
              style={currentStoryImage ? {border: '2px solid red'} : {}} 
              alt="Current User Story" 
            />
            <div className="plus-icon-story">
              <img src={pluspost} alt="Plus Icon" />
            </div>
          </div>
          <div className="name">
            <p>{user ? (user.name.length > 7 ? user.name.slice(0, 7) + '...' : user.name) : "Loading..."}</p>
          </div>
        </div>
        {/* Display other users' stories */}
        {story && story.length > 0 && story.map(user => (
          <div key={user._id} className="story-card">
            <div className="back-linear">
              {/* Assuming user has a profile picture or use a placeholder */}
              <img src={user.profilePictureUrl || pro} alt={user.name} />
            </div>
            <div className="name">
              <p>{user.name.length > 7 ? user.name.slice(0, 7) + '...' : user.name}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Story;
