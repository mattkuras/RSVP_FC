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

const AdminDashboard = (props) => {
  const [requests, setRequests] = useState([])
  const [games, setGames] = useState([])
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetchGames()
    fetchRequests()
    fetchMembers()
  }, [])

  const fetchGames = () => {
    Axios.get('/games')
    .then(resp => {
      setGames(resp.data)
    } )
  }
  const fetchRequests = () => {
    Axios.get('/requests')
    .then(resp => {
      setRequests(resp.data)
    } )
  }
  const fetchMembers = () => {
    Axios.get('/members')
    .then(resp => {
      setMembers(resp.data)
    } )
  }


  let { path, url } = useRouteMatch();

  return (
    <>
      <nav className="dashboard-navbar">
        <Link to='/'><h1>RsvpFC</h1></Link>
        <h2 className='logout' onClick={props.handleLogout}>Logout</h2>
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