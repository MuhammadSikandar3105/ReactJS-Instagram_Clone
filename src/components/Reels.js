import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { toggleLike, selectLiked, selectLikes } from '../state/store/likeSlice';
import { toggleFavourite, selectFavourite } from '../state/store/favouriteSlice';
import '../styles/responsive.css';
import '../styles/stylesheet.css';
import '../styles/reels.css';


const Reels = () => {
  // SVGs
  const { audio, heart, heart_red, favouritPost, favouritpostwhite, dotbtn, sharereel, commentreel, playbtn, pro } = useSelector(selectIcons);

  const dispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const liked = useSelector(selectLiked);
  const favourit = useSelector(selectFavourite);

  const handleLike = () => {
    dispatch(toggleLike());
  };

  const handleFavourite = () => {
    dispatch(toggleFavourite());
  };

  return (
    <>
      <div id="content-main-1">
        <div id="reels" className="all-reels d-flex flex-coloumn">
          {/* first card */}
          <div className=" main-reels-sec">
            <div className=" reels-content-sec">
              {/* <!-- reels card --> */}
              <div className="reels-card">
                <img src={pro} alt="" />
                {/* <!-- play btn --> */}
                <div className="play-btn">
                  <div className="play-main">
                    <img src={playbtn} alt="" />
                  </div>
                </div>
                {/* <!-- profile reels main --> */}
                <div className="content-reel d-flex flex-coloumn">
                  {/* <!-- main firdt div --> */}
                  <div className="profile-detail-reel d-flex flex-row">
                    <div className="pro-detail">
                      <div className="profile-name">
                        <img src={pro} alt="" />
                        <span className="pro-name-reel">__Abdullah__Khan</span>
                      </div>
                      <div className="follow-btn"><span>Follow</span></div>
                    </div>
                  </div>
                  {/* <!-- second div --> */}
                  <div className="hashtag d-flex flex-row">
                    <div><span>#viral</span></div>
                    <div><span>#reels</span></div>
                    <div><span>more...</span></div>
                  </div>
                  {/* <!-- third div --> */}
                  <div className="song-detail">
                    <div className="audio-image"><img src={audio} alt="" /></div>
                    <div className="detail-song-reel"><span>Tum se piyar hum kertey hain hum</span></div>
                  </div>
                </div>
              </div>
              {/* <!-- action btns for reels --> */}
              <div className="actions-btns-main">
                <div className="action-btns">
                  <div className="like-sec">
                    <img onClick={handleLike} src={liked ? heart_red : heart} alt="" />
                    <div className="counter"><span>{likes} {likes <= 1 ? 'Like' : 'Likes'}</span></div>
                  </div>
                  <div><img src={commentreel} alt="" /></div>
                  <div><img src={sharereel} alt="" /></div>
                  <div><img  onClick={handleFavourite} src={favourit ? favouritpostwhite : favouritPost} alt="" /></div>
                  <div><img src={dotbtn} alt="" /></div>
                  <div><img className="song-img-det" src={pro} alt="" /></div>
                </div>
              </div>
            </div>
          </div>
          {/* second card */}
          <div className=" main-reels-sec">
            <div className=" reels-content-sec">
              {/* <!-- reels card --> */}
              <div className="reels-card">
                <img src={pro} alt="" />
                {/* <!-- play btn --> */}
                <div className="play-btn">
                  <div className="play-main">
                    <img src={playbtn} alt="" />
                  </div>
                </div>
                {/* <!-- profile reels main --> */}
                <div className="content-reel d-flex flex-coloumn">
                  {/* <!-- main firdt div --> */}
                  <div className="profile-detail-reel d-flex flex-row">
                    <div className="pro-detail">
                      <div className="profile-name">
                        <img src={pro} alt="" />
                        <span className="pro-name-reel">__Abdullah__Khan</span>
                      </div>
                      <div className="follow-btn"><span>Follow</span></div>
                    </div>
                  </div>
                  {/* <!-- second div --> */}
                  <div className="hashtag d-flex flex-row">
                    <div><span>#viral</span></div>
                    <div><span>#reels</span></div>
                    <div><span>more...</span></div>
                  </div>
                  {/* <!-- third div --> */}
                  <div className="song-detail">
                    <div className="audio-image"><img src={audio} alt="" /></div>
                    <div className="detail-song-reel"><span>Tum se piyar hum kertey hain hum</span></div>
                  </div>
                </div>
              </div>
              {/* <!-- action btns for reels --> */}
              <div className="actions-btns-main">
                <div className="action-btns">
                  <div className="like-sec">
                    <img onClick={handleLike} src={liked ? heart_red : heart} alt="" />
                    <div className="counter"><span>{likes} {likes <= 1 ? 'Like' : 'Likes'}</span></div>
                  </div>
                  <div><img src={commentreel} alt="" /></div>
                  <div><img src={sharereel} alt="" /></div>
                  <div><img  onClick={handleFavourite} src={favourit ? favouritpostwhite : favouritPost} alt="" /></div>
                  <div><img src={dotbtn} alt="" /></div>
                  <div><img className="song-img-det" src={pro} alt="" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Reels
