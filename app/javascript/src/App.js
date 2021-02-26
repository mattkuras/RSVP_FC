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
  const [admin, setAdmin] = useState()
  const [member, setMember] = useState()
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
          if (resp.data.username) {
            setAdmin(resp.data)
            setLoggedIn(true)
          }
          else {
            setMember(resp.data)
            setLoggedIn(true)
          }
        })
    }
  }, [])

  const handleLogin = (user) => {
    if (user.username) {
      setAdmin(user)
      setLoggedIn(true)
    }
    else {
      setMember(user)
      setLoggedIn(true)
    }
  }
  const handleLogout = () => {
    localStorage.clear()
    setAdmin({})
    setMember({})
    setLoggedIn(false)
  }
  return (
    <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Landing} />
      <Route path='/admindashboard'
        render={props => (
          <AdminDashboard {...props} admin={admin} handleLogout={handleLogout} />
        )}>
        {loggedIn && admin ? null : <Redirect to="/adminlogin" />}

      </Route>
      <Route exact path='/adminlogin'
        render={props => (
          <AdminLogin {...props} handleLogin={handleLogin} />
        )}>
        {loggedIn && admin ? <Redirect to="/admindashboard" /> : null}
      </Route>
      <Route path='/dashboard'
        render={props => (
          <MemberDashboard {...props} member={member} handleLogout={handleLogout} />
        )}>
        {loggedIn && member ? null : <Redirect to="/login" />}

      </Route>
      <Route exact path='/login'
        render={props => (
          <MemberLogin {...props} handleLogin={handleLogin} />
        )}>
        {loggedIn && member ? <Redirect to="/dashboard" /> : null}
      </Route>
    </Router>
  );
}

export default App;
