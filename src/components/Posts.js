import React from 'react';
import '../styles/post.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { toggleLike, selectLiked, selectLikes } from '../state/store/likeSlice';
import { toggleFavourite, selectFavourite } from '../state/store/favouriteSlice';

const Posts = () => {
    // svgs
    const {pro,share,heart_red,favouritPost,heart,favouritpostwhite,comment,dotbtn } = useSelector(selectIcons);
    // active section
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
      {/* <!-- post sec start --> */}
      <div className="justify-content-center">
        <div className="card mb-5">
          <div className="top">
            <div className="userdetail">
              <div className="profile-image2 ms-2">
                <img src={pro} alt="" className="cover"  />
              </div>
              <h3>Muhammad Sikandar<br /><span>Rahim Yar Khan</span></h3>
            </div>
            <div>
              <img src={dotbtn} className="dot" alt="" />
            </div>
          </div>
          <div className="image-bx">
            <img src={pro} className="cover" alt="" />
          </div>
          <div className="actionsBtns">
            <div className="left d-flex felx-row ">
              <img className="like-button mx-2" alt='' onClick={handleLike} src={liked ? heart_red : heart} />
              <img className='mx-2' src={comment} alt="" />
              <img className='mx-2' src={share} alt="" />
            </div>
            <div className="right">
              <img className="favourit" onClick={handleFavourite} src={favourit ? favouritpostwhite : favouritPost} alt="" />
            </div>
          </div>
          <h4 className="likes mx-1">{likes} {likes <= 1 ? 'Like' : 'Likes'} </h4>
          <h4 className="message mx-1"><b>Muhammad Sikandar</b>Thanks for your love and suports
            <span>#hotel</span><span>#pic</span><span>#clone</span>
          </h4>
          <h4 className="comments font-size-h4 mx-1">View all 299 comments</h4>
          <div className="addcomments">
            <div className="userImg mx-1">
              <img src={pro} alt=""
                 className="cover" />
            </div>
            <input type="text" className="text mx-1" placeholder="Add a comment..." />
          </div>
          <h5 className="postTime mx-1">4 hours ago</h5>
        </div>
      </div>
    </>
  )
}

export default Posts
