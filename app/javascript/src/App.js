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

  useEffect(() => {
  }, [])

  // const loginStatus = async () => {
  //   await Axios.get('/logged_in',
  //     { withCredentials: true })
  //     .then(response => {
  //       setAdmin(response.data.admin)
  //       response.data.logged_in ? setIsLoggedIn(true) : setIsLoggedIn(false)
  //     })
  //     .catch(error => console.log('api errors:', error))
  // }

  const handleLogin = (admin) => {
    console.log(admin)
    setAdmin(admin)
  }
  return (
    <Router>
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Landing} />
      <Route path='/admindashboard'
        render={props => (
          <AdminDashboard {...props} />
        )}>
      </Route>
      <Route exact path='/admin'
        render={props => (
          <AdminLogin {...props} handleLogin={handleLogin} />
        )}>
        {/* {isLoggedIn ? <Redirect to="/admindashboard" /> : null} */}
      </Route> 
    </Router>
  );
}

export default App;
