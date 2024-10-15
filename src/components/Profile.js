import React, { useEffect, useState } from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/h.css';
import { useSelector, useDispatch } from 'react-redux';
import { openProfilePicModal } from '../state/store/profilepicSlice';
import { selectIcons } from '../state/store/iconSlice';
import axios from 'axios';

const Profile = () => {
  // State to store posts
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({}); // Ensure this starts as an object
  // const [postDelete, setPostDelete] = useState('');

  const dispatch = useDispatch();
  // svgs
  const { pro } = useSelector(selectIcons);

  // Fetch posts and user data when component mounts
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from local storage

        // Fetch user posts
        const response1 = await axios.get('/api/posts/fetchalluserposts', {
          headers: {
            'auth-token': token // Include token in headers
          }
        });
        setPosts(response1.data);

        // Fetch user details
        const response2 = await axios.get('/api/auth/getuser', {
          headers: {
            'auth-token': token  // Include token in headers
          }
        });
        setUser(response2.data);

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchUserPosts();
  }, []);
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.delete(`/api/posts/deletepost/${postId}`, {
        headers: {
          'auth-token': token // Include the authentication token in the request headers
        }
      });

      // Optionally, update the UI by removing the deleted post from the list
      setPosts(posts.filter(post => post._id !== postId));

      console.log("Post deleted successfully", response.data);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleProfilePicModal = () => {
    dispatch(openProfilePicModal());
  };

  return (
    <>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image" >
              <img src={user.profilePictureUrl || pro} alt="" onClick={handleProfilePicModal} />
              <span className="visually-hidden"></span>
              <i className="fas fa-comment" aria-hidden="true" style={{
                position: 'absolute', 
                opacity: 0, 
                transition: 'opacity 0.3s ease'
              }} ></i>
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">{user.name || 'Username'}</h1>

              <button className="btn profile-edit-btn">Following</button>
              <button className="btn profile-edit-btn">Edit Profile</button>

              <button className="btn profile-settings-btn" aria-label="profile settings">
                <i className="fas fa-cog" aria-hidden="true" ></i>
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">{posts.length}</span> posts
                </li>
                <li>
                  <span className="profile-stat-count"></span> followers
                </li>
                <li>
                  <span className="profile-stat-count">206</span> following
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">{user.name || 'Username'}</span> Hello I am {user.name || 'Username'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="gallery">
            {posts.map((post) => (
              <div className="gallery-item" tabIndex="0" key={post._id}>
                <img
                  src={`http://localhost:5000${post.imageUrl}`} // Use the correct URL
                  className="gallery-image"
                  alt="User Post"
                />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Delete</span>
                      {/* Trash icon for delete */}
                      <i onClick={() => handleDelete(post._id)} className="fas fa-trash" aria-hidden="true"></i>
                    </li>
                    <li className="gallery-item-likes">
                      <span className="visually-hidden">Likes:</span>
                      <i className="fas fa-heart" aria-hidden="true"></i> {post.likes || 0}
                    </li>
                    <li className="gallery-item-comments">
                      <span className="visually-hidden">Comments:</span>
                      <i className="fas fa-comment" aria-hidden="true"></i> {post.comments?.length || 0}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
