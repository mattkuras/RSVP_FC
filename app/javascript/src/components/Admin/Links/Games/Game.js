import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Switch, Route, Link, useHistory } from 'react-router-dom'
import './Game.css'
import Axios from 'axios'

const Game = (props) => {
    const [state, setState] = useState({
        datetime: '',
        location: '',
        capacity: ''
    })
  
    const token = localStorage.getItem("token")
    let history = useHistory();

    useEffect(() => {
        setState(prevState => ({
            datetime: game.formatted_time,
            location: game.location,
            capacity: game.capacity
        }))
    }, [])

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


    const handleChange = (e) => {
        const { name, value } = e.target
        setState(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let game = {
            datetime: state.datetime,
            location: state.location,
            capacity: state.capacity
        }
        Axios.patch(`/games/${gameId}`, game, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resp => {
                if (resp.data.success) {
                    console.log(resp.data)
                    props.fetchGames()
                    history.push(`/admindashboard/games`);
                }
                else {
                    console.log(resp.data)
                }
            })
    };

    let { path, url } = useRouteMatch();

    return (
        <div className='game-container'>
            <div className='edit-game'>
                <div className="game-edit-container">
                    <h2>Edit Game Details Here:</h2>
                    <input className="game-info" name='datetime' type="text" placeholder="Enter Date Here" onChange={handleChange} value={state.datetime} />
                    <input className="game-info" name='location' type="text" placeholder="Enter Location Here" onChange={handleChange} value={state.location} />
                    <input className="game-info" name='capacity' type="text" placeholder="Enter Capacity" onChange={handleChange} value={state.capacity} />
                    <input className="save-btn" type="submit" value="Save" onClick={handleSubmit} />
                </div>
            </div>
        </div>)

}

export default Game
