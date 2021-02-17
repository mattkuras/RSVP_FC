import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";

const AdminLogin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let admin = {
      username: username,
      password: password,
    };
    axios.post("/login", { admin })
    .then(resp => {
      // console.log(resp.data.jwt, resp.data.admin)
      localStorage.setItem("token", resp.data.jwt)
      props.handleLogin(resp.data.admin)
    })
    setPassword('')
    setUsername('')
      }
      // let config = {
      //   headers: {
      //     header1: value,
      //   }
      // }
      
      // let data = {
      //   'HTTP_CONTENT_LANGUAGE': self.language
      // }
      
      // axios.post(URL, data, config).then(...)

  const redirect = () => {
    props.history.push("/admindashboard");
  };

  return (
    <div className="login-page-container">
      <h1>Admin Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label for="username">Username: </label>
          <input
            className="input"
            type="text"
            placeholder="Enter Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default AdminLogin;
