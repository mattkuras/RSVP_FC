import React, { useState, useEffect } from 'react';
import "./MemberDashboard.css"
import Games from './Links/Games/Games'
import Axios from 'axios'
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

const MemberDashboard = (props) => {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGames()
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
        <Route path={`${path}/games`}><Games games={games} delete={setGames}/></Route>
      </Switch>
    </>
  );
}

export default MemberDashboard;