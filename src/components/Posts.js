import React, { useEffect, useState } from 'react';
import '../styles/post.css';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectIcons } from '../state/store/iconSlice';
import { toggleLike, selectLiked, selectLikes } from '../state/store/likeSlice';
import { toggleFavourite, selectFavourite } from '../state/store/favouriteSlice';
import PostModal from './PostModal'; // Import the modal for adding posts

const Posts = () => {
  // State to hold posts data
  const [posts, setPosts] = useState([]);
  const { pro, share, heart_red, favouritPost, heart, favouritpostwhite, comment, dotbtn } = useSelector(selectIcons);
  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const liked = useSelector(selectLiked);
  const favourit = useSelector(selectFavourite);

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts/fetchallposts'); // Replace with your API endpoint
      setPosts(response.data); // Set the fetched posts data
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Call fetchPosts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle like toggle
  const handleLike = () => {
    dispatch(toggleLike());
  };

  // Handle favourite toggle
  const handleFavourite = () => {
    dispatch(toggleFavourite());
  };

  // Function to add a new post
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]); // Add the new post at the top of the posts list
  };

  return (
    <>
      {/* AddPostModal triggers the form to add a new post */}
      <PostModal addNewPost={addNewPost} />

      {/* Iterate over the posts */}
      {posts.map((post) => (
        <div key={post._id} className="justify-content-center">
          <div className="card mb-5">
            <div className="top">
              <div className="userdetail">
                <div className="profile-image2 ms-2">
                  <img src={post.userProfileImage || pro} alt="" className="cover" />
                </div>
                <h3>{post.username}<br /><span>{post.location}</span></h3>
              </div>
              <div>
                <img src={dotbtn} className="dot" alt="" />
              </div>
            </div>
            <div className="image-bx">
              {/* For Images */}
              {post.imageUrl && (
                <img
                  src={`http://localhost:5000${post.imageUrl}`}
                  className="cover"
                  alt="Post"
                />
              )}

              {/* For Videos */}
              {post.videoUrl && (
                <video
                  src={`http://localhost:5000${post.videoUrl}`}
                  controls
                  className="cover"
                  alt="Post Video"
                />
              )}

              {/* For Audio */}
              {post.audioUrl && (
                <audio
                  src={`http://localhost:5000${post.audioUrl}`}
                  controls
                  className="cover"
                  alt="Post Audio"
                />
              )}
            </div>
            <div className="actionsBtns">
              <div className="left d-flex flex-row">
                <img className="like-button mx-2" alt="" onClick={handleLike} src={liked ? heart_red : heart} />
                <img className="mx-2" src={comment} alt="" />
                <img className="mx-2" src={share} alt="" />
              </div>
              <div className="right">
                <img className="favourit" onClick={handleFavourite} src={favourit ? favouritpostwhite : favouritPost} alt="" />
              </div>
            </div>
            <h4 className="likes mx-1">{post.likes} {post.likes <= 1 ? 'Like' : 'Likes'}</h4>
            <h4 className="message mx-1"><b>{post.username}</b> {post.caption}
              {post.hashtags.map((tag, index) => (
                <span key={index}>#{tag}</span>
              ))}
            </h4>
            <h4 className="comments font-size-h4 mx-1">View all {post.comments.length} comments</h4>
            <div className="addcomments">
              <div className="userImg mx-1">
                <img src={post.userProfileImage || pro} alt="" className="cover" />
              </div>
              <input type="text" className="text mx-1" placeholder="Add a comment..." />
            </div>
            <h5 className="postTime mx-1">{new Date(post.createdAt).toLocaleTimeString()}</h5>
          </div>
        </div>
      ))}
    </>
  );
};

export default Posts;
