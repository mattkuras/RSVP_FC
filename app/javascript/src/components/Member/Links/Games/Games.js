import React from "react"
import { useHistory } from 'react-router-dom'
import "./Games.css"
import Axios from 'axios'

const Games = (props) => {
  const games = props.games
  const token = localStorage.getItem("token")

  const makeReservation = (e) => {
    let game_id = e.target.parentNode.id
    let member_id = props.member.id
    let rsvp = { game_id, member_id }
    Axios.post('/rsvps', rsvp, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.success) {
          console.log(resp.data)
          props.fetchGames()
        }
        else {
          console.log(resp.data)
        }
      })
  }

  const cancelReservation = (e) => {
    let game_id = e.target.parentNode.id
    let member_id = props.member.id
    let rsvp = { game_id, member_id }
    Axios.post('/cancelrsvp', rsvp, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.success) {
          console.log(resp.data)
          props.fetchGames()
        }
        else {
          console.log(resp.data)
        }
      })
  }

  let history = useHistory();
  const redirect = () => {
    history.push("/dashboard/games");
  };

  const GamesList = () => {
    return games.map((game) => {
      let rsvpStatus;
      if (game.members.find((m) => m.email == props.member.email)) {
        rsvpStatus = true
      }
      else {
        rsvpStatus = false
      }
      return (
        <div className='game' id={game.id} key={game.id}>
          <h2 className='datetime'>{game.formatted_time}</h2>
          <h2 className='location'>{game.location}</h2>
          <h2 className='capacity'>{game.remaining_capacity}</h2>
          <h2 className='rsvp-status'>Rsvp Status: {rsvpStatus ? 'Good to go!' : 'You are not scheduled for this game.'}</h2>
          {rsvpStatus ? <p onClick={cancelReservation}> cancel reservation</p> : <p onClick={makeReservation} >rsvp now</p>}
        </div>
      )
    })
  }
  return (
    <div className="games-container">
      <GamesList />
    </div>
  );
}

export default Games;