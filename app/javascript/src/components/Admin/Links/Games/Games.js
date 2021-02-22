import React from "react"
import "./Games.css"
import Axios from 'axios'

const Games = (props) => {
  const games = props.games
  const token = localStorage.getItem("token")

  const deleteGame = () => {
    let id = e.target.id
    Axios.delete(`/games/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => {
      if (resp.data.success) {
        let gs = games.filter(g => g.id != id)
        props.delete(gs)
        console.log('deleted!')
      }
      else {
        console.log('game didnt delete')
      }
    })
  }

  const GamesList = () => {
    return games.map((game) => (
      <div className='game' key={game.id}>
        <h2 className='datetime'>{game.formatted_time}</h2>
        <h2 className='location'>{game.location}</h2>
        <h2 className='capacity'>{game.remaining_capacity}</h2>
      </div>
    ))
  }
  return (
    <div className="games-container">
      <GamesList/>
    </div>
  );
}

export default Games;