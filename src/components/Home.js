import React from 'react'
import Story from './Story'
import Suggested from './Suggested'
import Posts from './Posts'
import Foryou from './Foryou';
const Home = () => {
  return (
    <>
      <div className="content-main-1" id="content-main-1">
        <section className="main-sec">
          <div className=" d-flex justify-content-center">
            <div className="container post-sec d-flex justify-content-center">
              < Story />
              <Suggested />
              <Posts />
            </div>
          </div>
          <Foryou/>
        </section>
      </div>


    </>
  )
}

export default Home
