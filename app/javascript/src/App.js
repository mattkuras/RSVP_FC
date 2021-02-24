import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Register from './components/Homepage/Register'
import Landing from './components/Homepage/Landing/Landing'
import AdminLogin from './components/Admin/AdminLogin'
import AdminDashboard from './components/Admin/AdminDashboard'
import MemberDashboard from './components/Member/MemberDashboard'
import MemberLogin from './components/Member/MemberLogin'


function App() {
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      Axios.get('/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(resp => {
        setAdmin(resp.data)
        setLoggedIn(true)
      })
    }
  }, [])

  const handleLogin = (user) => {
    console.log(user)
    setLoggedIn(true)
    setUser(user)
  }
  const handleLogout = () => {
    localStorage.clear()
    setUser({})
    setLoggedIn(false)
  }
  return (
    <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Landing} />
      <Route path='/admindashboard'
        render={props => (
          <AdminDashboard {...props} handleLogout={handleLogout} />
        )}>
        {loggedIn ? null : <Redirect to="/adminlogin"/>}
          
      </Route>
      <Route exact path='/adminlogin'
        render={props => (
          <AdminLogin {...props} handleLogin={handleLogin} />
        )}>
        {loggedIn ? <Redirect to="/admindashboard" /> : null}
      </Route>  
      <Route path='/memberdashboard'
        render={props => (
          <MemberDashboard {...props} handleLogout={handleLogout} />
        )}>
        {loggedIn ? null : <Redirect to="/memberlogin"/>}
          
      </Route>
      <Route exact path='/memberlogin'
        render={props => (
          <MemberLogin {...props} handleLogin={handleLogin} />
        )}>
        {loggedIn ? <Redirect to="/memberdashboard" /> : null}
      </Route> 
    </Router>
  );
}

export default App;
