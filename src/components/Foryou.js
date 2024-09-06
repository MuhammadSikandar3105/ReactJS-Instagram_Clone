import React from 'react';
import { useSelector } from 'react-redux';
import { selectIcons } from '../state/store/iconSlice';

const Foryou = () => {
  const { pro } = useSelector(selectIcons);

  return (
    <>
      <div className=" sugested-foryou-main ">
        <div className=" sugested-foryou-sec ">
          <div className="container main-foryou d-flex-justify-contet-center">
            <div className="your-profile">
              <div className="profile-foryou">
                <div className="image-foryou"><img className="image-foryou" src={pro}
                  alt="" />
                </div>
                <div className="name-foryou">
                  <span className="names">abdullah786</span>
                  <span className="names">Mr.Malku</span>
                </div>
                <div className="switch-btn"><span className="switch-btn">
                  <span className="switch-btn">Switch</span>
                </span></div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column">
            <div className="suges-heading d-flex flex-row">
              <div className="heading-1">
                <p>Suggested for you</p>
              </div>
              <div className="see-all">
                <p>See All</p>
              </div>
            </div>
            <div className="suges-card-foryou">
              <div className="s-card-1 d-flex">
                <div className="card-foryou">
                  <div className="profile-foryou">
                    <div className="image-foryou"><img className="image-foryou" src={pro} alt="" />
                    </div>
                    <div className="name-foryou">
                      <span className="names">abdullah786</span>
                      <span className="names sug-fo-you-sp">Suggested for you</span>
                    </div>
                    <div className="switch-btn"><span className="switch-btn">
                      <span className="switch-btn">Follow</span>
                    </span></div>
                  </div>
                </div>
              </div>
              <div className="s-card-2 d-flex">
                <div className="card-foryou">
                  <div className="profile-foryou">
                    <div className="image-foryou"><img className="image-foryou"
                      src={pro} alt="" />
                    </div>
                    <div className="name-foryou">
                      <span className="names">abdullah786</span>
                      <span className="names sug-fo-you-sp">Suggested for you</span>
                    </div>
                    <div className="switch-btn"><span className="switch-btn">
                      <span className="switch-btn">Follow</span>
                    </span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sugg-foryou-footer d-flex flex-column pt-5">
            <div className="policies d-flex flex-coloumn">
              <div className="spans">
                <span>
                  <ul className="d-flex flex-row li-gap">
                    <li>About</li>
                    <li>Help</li>
                    <li>Press</li>
                    <li>API</li>
                    <li>Jobs</li>
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Locations</li>
                  </ul>
                </span>
                <span>
                  <ul className="d-flex flex-row li-gap">
                    <li>Locations</li>
                    <li>Language</li>
                    <li>Meta Varified</li>
                  </ul>
                </span>
              </div>
            </div>
            <div className="copy-right">
              <p>&copy; 2024 INSTAGRAM FROM ASP</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Foryou
