import React from 'react'
import {Link} from 'react-router-dom'
import './Banner.css'

const Banner = () => {
  return (
    <div className="banner_section">
        <img src="https://i.postimg.cc/mZ68Y7JZ/nurse-mask-gown.jpg" alt="image" />
        <div className="content">
            <h2>Ease Process, Save Time</h2>
            <p>Feeling under the weather today? no need to fret. with HMS, <br /> you can easily connect with healthcare professionals and schedule appointments online.</p>
            <Link to={'/registration'}><button className="appointment">Make Appointment</button></Link>
        </div>
    </div>
  )
}

export default Banner