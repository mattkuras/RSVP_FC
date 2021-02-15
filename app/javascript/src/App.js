import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Register from './components/Homepage/Register'
import Landing from './components/Landing/Landing'
import AdminLogin from './components/Admin/AdminLogin'
import AdminDashboard from './components/Admin/AdminDashboard'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    // loginStatus()
  }, [])

  const loginStatus = async () => {
    await Axios.get('/logged_in',
      { withCredentials: true })
      .then(response => {
        setAdmin(response.data.admin)
        response.data.logged_in ? setIsLoggedIn(true) : setIsLoggedIn(false)
      })
      .catch(error => console.log('api errors:', error))
  }

  const handleLogin = (data) => {
    setAdmin(data.admin)
    setIsLoggedIn(true)
  }
  const handleLogout = () => {
    setIsLoggedIn(false)
    console.log('clicked')
  }

  return (
    <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Landing} />
      <Route exact path="/admin" component={AdminLogin} />
      <Route path="/admindashboard" component={AdminDashboard} />
      {/* <Route exact path='/admindashboard'
        render={props => (
          <AdminDashboard {...props} handleLogin={handleLogin} handleLogout={handleLogout} loggedInStatus={isLoggedIn} />
        )}>
        {isLoggedIn ? null : <Redirect to="/admin" />}
      </Route>
      <Route exact path='/admin'
        render={props => (
          <Admin {...props} handleLogin={handleLogin} loggedInStatus={isLoggedIn} />
        )}>
        {isLoggedIn ? <Redirect to="/admindashboard" /> : null}
      </Route> */}
    </Router>
  );
}

export default App;
