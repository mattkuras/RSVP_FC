import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route, Link, useHistory } from 'react-router-dom'
import './Game.css'
import Axios from 'axios'

const Game = (props) => {
    const [datetime, setDatetime] = useState('')
    const [location, setLocation] = useState('')
    const [capacity, setCapacity] = useState('')
    const token = localStorage.getItem("token")
    let history = useHistory();
    useEffect(() => {
        setDatetime(game.formatted_time)
        setLocation(game.location)
        setCapacity(game.remaining_capacity)
    })

    let { gameId } = useParams()
    let game = props.games.find(g => g.id == gameId)


    const MembersList = () => {
        return <div className='members-attending'>
            <h2>Members Attending:</h2>
            {game.members.map((m) =>
                <p key={m.id}>{m.full_name}</p>
            )}
        </div>
    }


    const DisplayGame = () => {
        return <div className='show-game'>
            <Link to={`${url}/edit`}>edit game</Link>
            <a onClick={props.deleteGame} id={gameId}>delete game</a>
            <h1>time: {datetime}</h1>
            <h1>location: {location}</h1>
            <h1>capcity remaining: {capacity}</h1>
            <MembersList />
        </div>
    }

    const EditGame = () => {
        return <div className='edit-game'>
            <input value={datetime} type='text' onChange={(e) => setDatetime(e.target.value)} />
            <input value={location} type='text' onChange={(e) => setLocation(e.target.value)} />
            <input value={capacity} type='text' onChange={(e) => setCapacity(e.target.value)} />
            <button type='submit' onClick={handleSubmit} />
        </div>
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        let game = {
            datetime: datetime,
            location: location,
            capacity: capacity
        }
        Axios.patch(`/games/${gameId}`, game, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                if (resp.data.success) {
                    console.log(resp.data)
                    history.push(`${url}`);

                }
                else {
                    console.log(resp.data)
                }
            })
    };

    let { path, url } = useRouteMatch();

    return (
        <div className='game-container'>
            <Switch>
                <Route exact path={`${path}`}>
                    <DisplayGame />
                </Route>
                <Route>
                    <EditGame path={`${path}/edit`} />
                </Route>
            </Switch>
        </div>)

}

export default Game
