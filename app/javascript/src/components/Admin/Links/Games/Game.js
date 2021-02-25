import React from 'react';
import {useParams} from 'react-router-dom'

const Game = (props) => {

    let {gameId} = useParams()
    let game = props.games.find(g => g.id == gameId)

  
    const MembersList = () => {
        return <div className='members-attending'>
            <h2>Members Attending:</h2>
            {game.members.map((m) => 
               <p key={m.id}>{m.full_name}</p>
            )}
        </div>
    }
    return (
        <div className='show-game-container'>
            <h1>time: {game.formatted_time}</h1>
            <h1>location: {game.location}</h1>
            <h1>capcity remaining: {game.remaining_capacity}</h1>
            <MembersList/>
        </div>
    );
}
 
export default Game
