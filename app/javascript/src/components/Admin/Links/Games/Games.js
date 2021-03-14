import React, { useState } from "react"
import {
  Switch,
  Route,
  useHistory,
  Link,
  useRouteMatch
} from "react-router-dom";
import "./AdminGames.css"
import "./flickity.css"
import Game from './Game'
import Axios from 'axios'
import Flickity from 'react-flickity-component'


const Games = (props) => {
  const games = props.games
  const [currentSlide, setCurrentSlide] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [idToDelete, setId] = useState(0)
  const token = localStorage.getItem("token")
  let history = useHistory();


  const deleteGame = (e) => {
    Axios.delete(`/games/${idToDelete}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.success) {
          history.push(`${url}`);
          let gs = games.filter(g => g.id != idToDelete)
          props.setGames(gs)
          console.log('deleted!')
        }
        else {
          console.log('game didnt delete')
        }
        cancel()
      })
  }


  const confirm = (e) => {
    setConfirmDelete(true)
    setId(e.target.id)
  }
  const cancel = () => {
    setConfirmDelete(false)
  }



  const DeleteMessage = () => {
    return <div className='delete-message'>
      <h2>Are you sure you want to delete this game? All attending will be notified.</h2>
      <div className='options-container'>
        <h3 onClick={deleteGame} className='confirm-delete'>Delete</h3>
        <h3 className='cancel' onClick={cancel}>Cancel</h3>
      </div>
    </div>
  }

  let message;
  if (confirmDelete == true) {
    message = <DeleteMessage />
  }

  const flickityOptions = {
    initialIndex: currentSlide
  }
  const GamesList = () => {
    return <div className='games'><Flickity reloadOnUpdate={true} options={flickityOptions} >
      {games.map((game) => {
        return (
          <div className='game' id={game.id} key={game.id}>
            <div className='button-container'>
              <h3 className='edit'><Link to={`${url}/${game.id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>Edit</Link></h3>
              <h3 className='delete' id={game.id} onClick={confirm}>Delete</h3>
            </div>
            <h2 className='datetime'>Time: {game.formatted_time}</h2>
            <h2 className='location'>Location: {game.location}</h2>
            <h2 className='capacity'>Availability: {game.remaining_capacity} spots remaining</h2>
            <h2>Members Attending:</h2>
            <div className='members-attending'>
              {game.members.map((m) => (
                <h3 className='attending-member'>{m.full_name}</h3>
              ))}
            </div>
          </div>
        )
      })}
    </Flickity></div>
  }
  let { path, url } = useRouteMatch();


  return (
    <div className="games-container">
      {message}
      <Switch>
        <Route exact path={path}>
          <GamesList />
        </Route>
        <Route path={`${path}/:gameId`}>
          <Game games={games} setGames={props.setGames} fetchGames={props.fetchGames} deleteGame={deleteGame} />
        </Route>
      </Switch>

    </div>
  );
}

export default Games;