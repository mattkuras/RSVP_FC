import React, { useState, useEffect } from 'react';
import "./AdminDashboard.css"
import Home from './Links/Home/Home'
import Matches from './Links/Matches/Matches'
import Requests from './Links/Requests/Requests'
import Axios from 'axios'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

const AdminDashboard = () => {
  useEffect(() => {

  }, [])

  const fetchData = () => {
    
  }

  let { path, url } = useRouteMatch();

  return (
    <>
      <nav className="dashboard-navbar">
        <h1>RsvpFC</h1>
        <h2>Logout</h2>
      </nav>

      <div className="links">
        <h3 className="link-item"><Link to={`${url}/matches`}>Current Matches</Link></h3>
        <h3 className="link-item"><Link to={`${url}`}>Home</Link></h3>
        <h3 className="link-item"><Link to={`${url}/requests`}>Member Requests</Link></h3>
      </div>
  

      <Switch>
        <Route exact path={path} component={Home}/>
        <Route path={`${path}/matches`}component={Matches}/>
        <Route path={`${path}/requests`} component={Requests}/>
      </Switch>
    </>
  );
}

export default AdminDashboard;