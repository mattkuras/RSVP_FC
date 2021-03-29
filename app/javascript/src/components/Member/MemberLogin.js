import React, { useState } from "react";
import "./MemberLogin.css";
import axios from "axios";
import { GiSoccerBall } from 'react-icons/gi'
import { BsArrowLeft } from 'react-icons/bs'
import { motion } from 'framer-motion'

const MemberLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState('')
  const [forgotPassword, setForgotPassword] = useState(false)
  const [memberEmail, setMemberEmail] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    axios.post("/login", { user })
      .then(resp => {
        console.log(resp)
        if (resp.data.success) {
          localStorage.setItem("token", resp.data.jwt)
          props.handleLogin(resp.data.user)
          redirect()
        }
        else {
          console.log(resp.data.failure)
          setDisplayMessage(resp.data.failure)
        }

      })
    setPassword('')
    setEmail('')
  }

  const resetPassword = (event) => {
    event.preventDefault();
    let user = {
      email: memberEmail,
    };
    axios.post("/forgot/password", { user })
      .then(resp => {
        console.log(resp)
        setMemberEmail('')
        setDisplayMessage('An email has been sent with a link to reset your password')
      })
  }

  const redirect = () => {
    props.history.push("/dashboard");
  };

  const bounceTransition = {
    y: {
      duration: 0.4,
      yoyo: Infinity,
      ease: 'easeOut'
    }
  }

  const ForgotPassword = () => {
    if (forgotPassword) {
      return (
        <div className="forgot-contain">
          <label id='reset' for="email">Enter your email and we'll send you a link a to reset your password. </label>
          <input
            className="member-input"
            type="text"
            placeholder="Enter Email"
            id="email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <button className='forgot-button'  onClick={resetPassword}>Send Link</button> 
        </div>
      )
    } else {
      return (<span onClick={() => setForgotPassword(true)} className='forgot-password'>Forgot Password?</span>)
    }
  }

  return (
    <div className="login-page-container">
      <h1>Member Login</h1>
      <div className='ball-arrow'>
        <div className='arrow'><BsArrowLeft onClick={() => props.history.push("/")} /></div>
        <motion.div className='ball'
          animate={{ y: ['20%', '-20%',] }}
          transition={bounceTransition}
          onClick={() => props.history.push("/")}>
          <GiSoccerBall />
        </motion.div>
      </div>
      <form className="member-login-form" onSubmit={handleSubmit}>
        <div className="input-contain">
          <label for="email">Email: </label>
          <input
            className="member-input"
            type="text"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <span className='failure-message'>{displayMessage}</span>
        <input className='button' type='submit' />
        <ForgotPassword />
      </form>
    </div>
  );
};

export default MemberLogin;
