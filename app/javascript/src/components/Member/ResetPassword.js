import React, { useState } from "react";
import {  useParams} from 'react-router-dom'
import "./MemberLogin.css";
import axios from "axios";
import { GiSoccerBall } from 'react-icons/gi'
import { BsArrowLeft } from 'react-icons/bs'
import { motion } from 'framer-motion'

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayMessage, setDisplayMessage] = useState('')

  let { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    let member = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    axios.patch(`/members/${id}`, { member })
      .then(resp => {
        console.log(resp)
        if (resp.data.success) {
            setDisplayMessage('Your password has been updated! Click the arrow above to login.')
        }
        else {
          console.log(resp.data.failure)
          setDisplayMessage(resp.data.failure)
        }

      })
    setPassword('')
    setEmail('')
    setConfirmPassword('')
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


  return (
    <div className="login-page-container">
      <h1>Reset Password</h1>
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
        <div className="input-contain">
          <label for="confirm-password">Confirm Password: </label>
          <input
            className="member-input"
            type="password"
            placeholder="Confirm Password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <span className='failure-message'>{displayMessage}</span>
        <input className='button' type='submit' />
      </form>
    </div>
  );
};

export default ResetPassword;
