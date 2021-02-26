import React, { useState } from "react";
import "./MemberLogin.css";
import axios from "axios";

const MemberLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      }
     
    })
    setPassword('')
    setEmail('')
      }

  const redirect = () => {
    props.history.push("/dashboard");
  };

  return (
    <div className="login-page-container">
      <h1>Member Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="email">Email: </label>
          <input
            className="input"
            type="text"
            placeholder="Enter Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label for="password">Password: </label>
          <input
            className="input"
            type="password"
            placeholder="Enter Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default MemberLogin;
