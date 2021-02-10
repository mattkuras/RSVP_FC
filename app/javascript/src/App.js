import React, { useState, useEffect } from "react"
import './App.css';
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom"
import Axios from 'axios'
import Homepage from './components/Homepage/Homepage'


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [admin, setAdmin] = useState({})

  useEffect(() => {
    loginStatus()
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
      <Route exact path="/" component={Homepage} />
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