import React, {useState} from "react"
import { useHistory } from 'react-router-dom'
import "./Games.css"
import './flickity.css'
import Axios from 'axios'
import Flickity from 'react-flickity-component'

const Games = (props) => {
  const games = props.games
  const token = localStorage.getItem("token")
  const [currentSlide, setCurrentSlide] = useState(0)

  const makeReservation = (e) => {
    setCurrentSlide(e.target.id)
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
    setCurrentSlide(e.target.id)
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

  const flickityOptions = {
    initialIndex: currentSlide
}

  const GamesList = () => {
    return <div classname='games'><Flickity reloadOnUpdate={true} options={flickityOptions} >
      {games.map((game, index) => {
        console.log(game.members)
        let rsvpStatus;
        if (game.members.find((m) => m.email == props.member.email)) {
          rsvpStatus = true
        }
        else {
          rsvpStatus = false
        }
        return (
          <div className='game' id={game.id} key={game.id}>
            <h2 className='datetime'>Time: {game.formatted_time}</h2>
            <h2 className='location'>Location: {game.location}</h2>
            <h2 className='capacity'>Availability: {game.remaining_capacity} spots remaining</h2>
            <h2 className='rsvp-status'>Rsvp Status: {rsvpStatus ? 'Ready to Play' : 'RSVP Required'}</h2>
            {rsvpStatus ? <p id={index} onClick={cancelReservation}> Cancel RSVP</p> : <p id={index} onClick={makeReservation} >RSVP Now</p>}
            <h2>Members Attending:</h2>
            <h3>{game.members.map((m) => m.full_name)}</h3>
          </div>
        )
      })}
    </Flickity></div> 
  }


  return (
    <div className="games-container">
      <GamesList />
    </div>
  );
}

export default Games;