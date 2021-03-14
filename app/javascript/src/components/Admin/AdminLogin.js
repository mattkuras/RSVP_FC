import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { GiSoccerBall } from 'react-icons/gi'
import { BsArrowLeft } from 'react-icons/bs'
import { motion } from 'framer-motion'

const AdminLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      username: username,
      password: password,
    };
    axios.post("/login", { user })
    .then(resp => {
      if (resp.data.success) {
        localStorage.setItem("token", resp.data.jwt)
        props.handleLogin(resp.data.user)
        redirect()
      }
      else {
        console.log(resp.data.failure)
      }
     
    })
    setPassword('')
    setUsername('')
      }

  const redirect = () => {
    props.history.push("/admindashboard");
  };
  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: 'easeOut'
    }
  }

  return (
    <div className="login-page-container">
      <h1>Admin Login</h1>
      <div className='ball-arrow'>
        <div className='arrow'><BsArrowLeft onClick={() => props.history.push("/")} /></div>
        <motion.div className='ball'
          animate={{ y: ['20%', '-20%',] }}
          transition={bounceTransition}
          onClick={() => props.history.push("/")}>
          <GiSoccerBall />
        </motion.div>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-contain">
          <label for="username">Username: </label>
          <input
            className="member-input"
            type="text"
            placeholder="Enter Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-contain">
          <label for="password">Password: </label>
          <input
            className="member-input"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className='submit-btn' type="submit" />
      </form>
    </div>
  );
};

export default AdminLogin;
