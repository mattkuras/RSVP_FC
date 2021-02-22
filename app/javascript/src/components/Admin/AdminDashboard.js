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

  const token = localStorage.getItem("token")

  const fetchGames = () => {
    Axios.get('/games', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      setGames(resp.data)
    })
  }
  const fetchRequests = () => {
    Axios.get('/requests', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(resp => {
      setRequests(resp.data)
    } )
  }
  const fetchMembers = () => {
    Axios.get('/members', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => {
      setMembers(resp.data)
    } )
  }


  let { path, url } = useRouteMatch();

  return (
    <>
      <nav className="dashboard-navbar">
        <Link className="nav-h1" to='/'><h1>RsvpFC</h1></Link>
        <h2 className='logout' onClick={props.handleLogout}>Logout</h2>
      </nav>
      <div className="links">
        <h3 className="link-item"><Link className="link-item" to={`${url}/games`}>Current Matches</Link></h3>
        <h3 className="link-item"><Link className="link-item" to={`${url}`}>Home</Link></h3>
        <h3 className="link-item"><Link className="link-item" to={`${url}/requests`}>Member Requests</Link></h3>
      </div>

      <Switch>
        <Route exact path={path}><Home members={members} delete={setMembers}/></Route>
        <Route path={`${path}/games`}><Games games={games} delete={setGames}/></Route>
        <Route path={`${path}/requests`}><Requests requests={requests} delete={setRequests}/></Route>
      </Switch>
    </>
  );
}

export default AdminDashboard;