import React, { useState, useEffect } from 'react';
import "./AdminDashboard.css"
import Home from './Links/Home/Home'
import Games from './Links/Games/Games'
import Requests from './Links/Requests/Requests'
import Axios from 'axios'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([])
  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    Axios.get('/dashboard/data')
    .then(resp => {
      setGames(resp.data[0])
      setRequests(resp.data[1])
      setMembers(resp.data[2])
      debugger
    } )
  }

  let { path, url } = useRouteMatch();

  return (
    <>
      <nav className="dashboard-navbar">
        <h1>RsvpFC</h1>
        <h2>Logout</h2>
      </nav>
      <div className="links">
        <h3 className="link-item"><Link to={`${url}/games`}>Current Matches</Link></h3>
        <h3 className="link-item"><Link to={`${url}`}>Home</Link></h3>
        <h3 className="link-item"><Link to={`${url}/requests`}>Member Requests</Link></h3>
      </div>

      <Switch>
        <Route exact path={path}><Home members={members}/></Route>
        <Route path={`${path}/games`}><Games games={games}/></Route>
        <Route path={`${path}/requests`}><Requests requests={requests}/></Route>
      </Switch>
    </>
  );
}

export default AdminDashboard;