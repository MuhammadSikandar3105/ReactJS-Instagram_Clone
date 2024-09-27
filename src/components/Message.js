import React from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/message.css';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';

const Message = () => {
    // svgs
    const { newmessage, videocall, pro, micmessage, heart, emoji, addphoto, audiocall, conversationinfo, } = useSelector(selectIcons);
    return (
        <>
            <div id="content-main-1">
                <section className="main-sec">
                    <div className="main-message-div">
                        {/* top fixed nav */}
                        <div className="user-detail-fixed">
                            {/* top fixed div */}
                            <div className="fixed-nav-1-detail">
                                <div><span className="user-name-fixed">mr.malik2186</span></div>
                                <div className="newmessage-icon">
                                    <img src={newmessage} alt="" />
                                </div>
                            </div>
                            {/* top fixed div second */}
                            <div className="chat-detail-fixed d-flex flex-row">
                                {/* profile fixed */}
                                <div className="first-user d-flex flex-row">
                                    <div className="first-user-image">
                                        <img src={pro} alt="" />
                                    </div>
                                    <div className="first-user-name d-flex">
                                        <div className="first-user-name-name">Ali Chishti</div>
                                        <div className="first-user-name-active">Active 32m ago</div>
                                    </div>
                                </div>
                                {/* control button on head */}
                                <div className="fixed-top-icon">
                                    <div><img src={audiocall} alt="" /></div>
                                    <div><img src={videocall} alt="" /></div>
                                    <div><img src={conversationinfo} alt="" /></div>
                                </div>
                            </div>
                        </div>
                        {/* second nav */}
                        <div className="main-message">
                            {/* first div */}
                            <div className="profile-message-contact-detail">
                                {/* first sidebar */}
                                <div className="contact-detail-image d-flex">
                                    <img src={pro} alt="" />
                                    <div className="con-det-img-tag">Your note</div>
                                </div>
                                <div className="contact-detail-second d-flex flex-row">
                                    <div className="con-det-mess">Messages</div>
                                    <div className="con-det-req">request</div>
                                </div>
                                {/* User cards */}
                                <div className="first-user d-flex flex-row">
                                    <div className="first-user-image">
                                        <img src={pro} alt="" />
                                    </div>
                                    <div className="first-user-name d-flex">
                                        <div className="first-user-name-name">SK Malik</div>
                                        <div className="first-user-name-active">Active 32m ago</div>
                                    </div>
                                </div>
                                <div className="first-user d-flex flex-row">
                                    <div className="first-user-image">
                                        <img src={pro} alt="" />
                                    </div>
                                    <div className="first-user-name d-flex">
                                        <div className="first-user-name-name">Shoaib Malik</div>
                                        <div className="first-user-name-active">Active 32m ago</div>
                                    </div>
                                </div>
                            </div>
                            {/* second div main */}
                            <div className="chat-detail">
                                <div className="all-chat-user-deatail">
                                    <div className="chat-user d-flex flex-coloumn">
                                        <div className="image-chat-det">
                                            <img src={pro} alt="" />
                                        </div>
                                        <div><span className="chat-det-name">Ali Chishti</span></div>
                                        <div><span className="chat-det-user-name">alihussnain.5680 Instagram</span></div>
                                        <div className="chat-det-view-btn"><span className="chat-det-view-btn">View profile</span></div>
                                    </div>
                                    {/* main chat in text */}
                                    <div className="chating d-flex flex-coloumn">
                                        <div className="right-chat"><span>
                                            <ul></ul>
                                        </span></div>
                                        <div className="left-chat"><span>
                                            <ul></ul>
                                        </span></div>
                                    </div>
                                </div>
                                {/* last chat input */}
                                <div className="chat-input d-flex flex-row">
                                    <div className="first-two-svgs">
                                        <div><span className="imoji-input"><img src={emoji} alt="" /></span></div>
                                        <div><span className="main-input-text"><input type="text" placeholder="Message..." /></span></div>
                                    </div>
                                    <div className="input-last-svgs">
                                        <div><span className="mic-svg"><img src={micmessage} alt="" /></span></div>
                                        <div><span className="photos-input"><img src={addphoto} alt="" /></span></div>
                                        <div><span className="like-svg"><img src={heart} alt="" /></span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default Message
