import React from 'react';
import '../styles/stylesheet.css';
import '../styles/responsive.css';
import '../styles/h.css';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';

const Profile = () => {
  // svgs
  const { pro } = useSelector(selectIcons);
  return (
    <>
      <header>
        <div className="container">
          <div className="profile">
            <div className="profile-image">
              <img src={pro} alt="" />
            </div>

            <div className="profile-user-settings">
              <h1 className="profile-user-name">Mr. Sikandar_</h1>

              <button className="btn profile-edit-btn">Following</button>
              <button className="btn profile-edit-btn">Edit Profile</button>

              <button className="btn profile-settings-btn" aria-label="profile settings">
                <i className="fas fa-cog" aria-hidden="true"></i>
              </button>
            </div>

            <div className="profile-stats">
              <ul>
                <li>
                  <span className="profile-stat-count">164</span> posts
                </li>
                <li>
                  <span className="profile-stat-count">188</span> followers
                </li>
                <li>
                  <span className="profile-stat-count">206</span> following
                </li>
              </ul>
            </div>

            <div className="profile-bio">
              <p>
                <span className="profile-real-name">Muhammad Sikandar</span> Hello I am Muhammad Sikandar
              </p>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="gallery">
            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 56
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 2
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 89
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 5
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 42
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-type">
                <span className="visually-hidden">Video</span>
                <i className="fas fa-video" aria-hidden="true"></i>
              </div>
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 38
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 0
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 47
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 1
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 94
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 3
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-type">
                <span className="visually-hidden">Gallery</span>
                <i className="fas fa-clone" aria-hidden="true"></i>
              </div>
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 52
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 4
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 66
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 2
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 45
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 0
                  </li>
                </ul>
              </div>
            </div>

            <div className="gallery-item" tabIndex="0">
              <img
                src={pro}
                className="gallery-image"
                alt=""
              />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <i className="fas fa-heart" aria-hidden="true"></i> 34
                  </li>
                  <li className="gallery-item-comments">
                    <span className="visually-hidden">Comments:</span>
                    <i className="fas fa-comment" aria-hidden="true"></i> 1
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default Profile
