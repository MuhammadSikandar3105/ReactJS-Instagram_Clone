import React from 'react';
import '../styles/post.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';
import { setActiveSection, selectActiveSection } from '../state/store/navbarSlice';

const Posts = () => {
    // svgs
    const {logo,Home,newmessage,HomeActive,playbtn,treadsvisit,reels,threradrepost,videocall,useracount,threadmobnotification,notification,pro,treadshome,toggledropdown,threadscomment,reelsActive,sharereel,pluspost,threadspostshare,threadsicon,share,searchindex,searchActive2,profile,pintohome,plussign,notificationActive,moretreads,instalogo,messageactive,moreindex,micmessage,messageActive2,following,heartthreads,messages,heartreel,heart_red,favouritPost,heart,favouritpostwhite,search,searchActive,Explor,exploreactive,dropdown,favourit,emoji,More,threads,activenotification,addphoto,audio,audiocall,comment,commentreel,conversationinfo,create,createthreads,cross,crossoffinput,dotbtn,dragphotos } = useSelector(selectIcons);
    // active section
    const dispatch = useDispatch();
    const activeSection = useSelector(selectActiveSection);
  
    const handleSectionChange = (section) => {
      dispatch(setActiveSection(section));
    };
  return (
    <>
      {/* <!-- post sec start --> */}
      <div className="justify-content-center">
        <div className="card mb-5">
          <div className="top">
            <div className="userdetail">
              <div className="profile-image">
                <img src={pro} alt="" className="cover" srcset="" />
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
            <div className="left">
              <img className="like-button" onClick={() => handleSectionChange('like')} src={activeSection === 'like' ? heart_red : heart} />
              <img src={comment} alt="" />
              <img src={share} alt="" />
            </div>
            <div className="right">
              <img className="favourit" onClick={() => handleSectionChange('favourite')} src={activeSection === 'favourite' ? favouritpostwhite : favouritPost} alt="" />
            </div>
          </div>
          <h4 className="likes">3,456 likes</h4>
          <h4 className="message"><b>Muhammad Sikandar</b>Thanks for your love and suports
            <span>#hotel</span><span>#pic</span><span>#clone</span>
          </h4>
          <h4 className="comments font-size-h4">View all 299 comments</h4>
          <div className="addcomments">
            <div className="userImg">
              <img src={pro} alt=""
                srcset="" className="cover" />
            </div>
            <input type="text" className="text" placeholder="Add a comment..." />
          </div>
          <h5 className="postTime">4 hours ago</h5>
        </div>
      </div>
    </>
  )
}

export default Posts
