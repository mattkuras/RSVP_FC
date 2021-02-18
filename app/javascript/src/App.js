import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Register from './components/Homepage/Register'
import Landing from './components/Landing/Landing'
import AdminLogin from './components/Admin/AdminLogin'
import AdminDashboard from './components/Admin/AdminDashboard'


function App() {
  const [admin, setAdmin] = useState({})
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
        console.log(resp.data)
      })
    }
  }, [])

  const handleLogin = (admin) => {
    console.log(admin)
    setLoggedIn(true)
    setAdmin(admin)
  }
  const handleLogout = () => {
    localStorage.clear()
    setAdmin({})
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
        {loggedIn ? null : <Redirect to="/admin"/>}
          
      </Route>
      <Route exact path='/admin'
        render={props => (
          <AdminLogin {...props} handleLogin={handleLogin} />
        )}>
        {loggedIn ? <Redirect to="/admindashboard" /> : null}
      </Route> 
    </Router>
  );
}

export default App;
