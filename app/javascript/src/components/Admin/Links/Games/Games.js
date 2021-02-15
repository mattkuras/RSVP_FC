import React from "react"
import "./Games.css"

const Games = (props) => {
  const games = props.games

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