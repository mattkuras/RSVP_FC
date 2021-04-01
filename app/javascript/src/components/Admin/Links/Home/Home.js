import React, { useState } from "react"
import "./Home.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import Axios from 'axios'

const Home = (props) => {
  const [location, setLocation] = useState("")
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [capacity, setCapacity] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [idToDelete, setId] = useState(0)

  const token = localStorage.getItem("token")

  const deleteMember = (e) => {
    console.log(idToDelete)
    Axios.delete(`/members/${idToDelete}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.success) {
          let mems = props.members.filter(m => m.id != idToDelete)
          props.setMembers(mems)
          console.log('deleted!')
          setConfirmDelete(false)
        }
        else {
          console.log('it didnt delete')
        }
      })
  }

  const ListMembers = () => {
    return <div className="member-list">
      <div className="member header">
        <h3>Delete</h3>
        <h3>Member Email</h3>
        <h3>Member Name</h3>
        <h3 className="referrer-info">Referrer Email</h3>
      </div>
      {props.members.map((m) => (
        <div className="member" key={m.id}>
          <FaRegTrashAlt className="trash-icon edit-icons" id={m.id} onClick={confirm} />
          <h3>{m.email}</h3>
          <h3>{m.full_name}</h3>
          <h3 className="referrer-info">{m.reference}</h3>
        </div>
      ))}
    </div>
  }
  const handleSubmit = () => {
    let datetime = `${date} ${time}`
    // date and time togethe should be a string in this format "nov 30 2021 10:00pm"
    let game = { datetime, location, capacity }
    Axios.post('/games', { game }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        console.log(resp)
        if (resp.data.id) {
          setDisplayMessage('your game has been created')
          props.setGames(games => [...games, resp.data])
        } else {
          setDisplayMessage(`${resp.data}`)
        }
      })
    setLocation('')
    setDate('')
    setTime('')
    setCapacity('')
  }

  const confirm = (e) => {
    if (e.target.id) {
      setId(e.target.id)
      console.log(idToDelete)
      setConfirmDelete(true)
    }
  }
  const cancel = () => {
    setConfirmDelete(false)
  }


  const DeleteMessage = () => {
    return <div className='delete-message'>
      <h2>Are you sure you want to delete member?</h2>
      <div className='options-container'>
        <h3 onClick={deleteMember} className='confirm-delete'>Delete</h3>
        <h3 className='cancel' onClick={cancel}>Cancel</h3>
      </div>
    </div>
  }

  let message;
  if (confirmDelete == true) {
    message = <DeleteMessage />
  }

  return (
    <div className="home-container">
      <div className="create-game-container">
        <div className="game-input-container">
          <h2>Enter new game here:</h2>
          <input className="game-info" type="text" placeholder="Enter Date Here" onChange={(e) => setDate(e.target.value)} value={date} />
          <input className="game-info" type="text" placeholder="Enter Time Here" onChange={(e) => setTime(e.target.value)} value={time} />
          <input className="game-info" type="text" placeholder="Enter Location Here" onChange={(e) => setLocation(e.target.value)} value={location} />
          <input className="game-info" type="text" placeholder="Enter Capacity" onChange={(e) => setCapacity(e.target.value)} value={capacity} />
          <input className="create-btn" type="submit" value="Create" onClick={handleSubmit} />
          <span className='display-message'>{displayMessage}</span>
        </div>
      </div>

      {message}
      <ListMembers />
    </div>
  );
}

export default Home;