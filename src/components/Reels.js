import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { selectIcons } from '../state/store/iconSlice';
import { toggleLike, selectLiked, selectLikes } from '../state/store/likeSlice';
import { toggleFavourite, selectFavourite } from '../state/store/favouriteSlice';
import '../styles/responsive.css';
import '../styles/stylesheet.css';
import '../styles/reels.css';

const Reels = () => {
  const { audio, heart, heart_red, favouritPost, favouritpostwhite, dotbtn, sharereel, commentreel, playbtn, pro } = useSelector(selectIcons);
  const [reels, setReels] = useState([]);  
  const [playingReels, setPlayingReels] = useState({});
  const [likedReels, setLikedReels] = useState({});
  const [favouritedReels, setFavouritedReels] = useState({});
  const videoRefs = useRef({});

  const dispatch = useDispatch();

  const fetchReels = async () => {
    try {
      const response = await axios.get('/api/reel/fetchallreels');
      setReels(response.data);
    } catch (error) {
      console.log('Error fetching reels:', error);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  // Handle play/pause for each video
  const handlePlayPause = (reelId) => {
    const videoElement = videoRefs.current[reelId];
    if (videoElement) {
      if (playingReels[reelId]) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setPlayingReels(prevState => ({
        ...prevState,
        [reelId]: !prevState[reelId],
      }));
    }
  };

  // Check if file is a video
  const isVideoFile = (fileUrl) => {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => fileUrl.endsWith(ext));
  };

  // Handle Like
  const handleLike = (reelId) => {
    setLikedReels(prevState => ({
      ...prevState,
      [reelId]: !prevState[reelId],
    }));
    dispatch(toggleLike(reelId));
  };

  // Handle Favourite
  const handleFavourite = (reelId) => {
    setFavouritedReels(prevState => ({
      ...prevState,
      [reelId]: !prevState[reelId],
    }));
    dispatch(toggleFavourite(reelId));
  };

  return (
    <div id="content-main-1">
      <div id="reels" className="all-reels d-flex flex-column">
        {reels.filter(reel => isVideoFile(reel.fileUrl)).map(reel => (
          <div className="reels-content-sec" key={reel._id}>
            {/* Reels Card */}
            <div className="reels-card">
              <video
                src={reel.fileUrl}
                ref={(el) => (videoRefs.current[reel._id] = el)} // Assign ref for each video
                alt="Reel Video"
              />
              {/* Custom Play Button */}
              {!playingReels[reel._id] && (
                <div className="play-btn">
                  <div className="play-main">
                    <img
                      src={playbtn}
                      alt="Play"
                      onClick={() => handlePlayPause(reel._id)}
                    />
                  </div>
                </div>
              )}
              {/* Profile Reels Main */}
              <div className="content-reel d-flex flex-column">
                {/* Profile Details */}
                <div className="profile-detail-reel d-flex flex-row">
                  <div className="pro-detail">
                    <div className="profile-name">
                      <img src={reel.profile?.profileImage || pro} alt="Profile" />
                      <span className="pro-name-reel">{reel.profile?.username || 'Unknown User'}</span>
                    </div>
                    <div className="follow-btn">
                      <span>Follow</span>
                    </div>
                  </div>
                </div>
                {/* Hashtags */}
                <div className="hashtag d-flex flex-row">
                  <div><span>#viral</span></div>
                  <div><span>#reels</span></div>
                  <div><span>more...</span></div>
                </div>
                {/* Song Details */}
                <div className="song-detail">
                  <div className="audio-image">
                    <img src={audio} alt="Audio" />
                  </div>
                  <div className="detail-song-reel">
                    <span>Tum se piyar hum kertey hain hum</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Action Buttons for Reels */}
            <div className="actions-btns-main">
              <div className="action-btns">
                <div className="like-sec">
                  <img
                    onClick={() => handleLike(reel._id)}
                    src={likedReels[reel._id] ? heart_red : heart}
                    alt="Like"
                  />
                  <div className="counter">
                    <span>{likedReels[reel._id] ? 1 : 0} {likedReels[reel._id] ? 'Like' : 'Likes'}</span>
                  </div>
                </div>
                <div><img src={commentreel} alt="Comment" /></div>
                <div><img src={sharereel} alt="Share" /></div>
                <div>
                  <img
                    onClick={() => handleFavourite(reel._id)}
                    src={favouritedReels[reel._id] ? favouritPost : favouritpostwhite}
                    alt="Favorite"
                  />
                </div>
                <div><img src={dotbtn} alt="Options" /></div>
                <div><img className="song-img-det" src={pro} alt="Profile" /></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reels;
