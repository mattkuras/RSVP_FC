import React from "react"
import "./Homepage.css"
import {Link} from "react-router-dom"
import SignUp from './SignUp'

const Homepage = () => {
  return (
    <div className="container">
      <SignUp/>
    </div>
  );
}

export default Homepage;