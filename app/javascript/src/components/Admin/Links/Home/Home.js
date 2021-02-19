import React, { useState } from "react"
import "./Home.css"
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai"
import { FaRegTrashAlt } from "react-icons/fa"
import Axios from 'axios'

const Home = (props) => {
  const [location, setLocation] = useState("")
  const [date, setDate] = useState([])
  const [time, setTime] = useState([])
  const [capacity, setCapacity] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')

  const deleteMember = (e) => {
    let id = e.target.id
    Axios.delete(`/members/${id}`)
    .then(resp => {
      if (resp.data.success) {
        let mems = props.members.filter(m => m.id != id)
        props.delete(mems)
        console.log('deleted!')
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
        <h3>Referrer Email</h3>
        <h3>Times Missed</h3>
        <h3>Edit Times Missed</h3>
      </div>
      {props.members.map((m) => (
        <div className="member" key={m.id}>
          <FaRegTrashAlt className="trash-icon" id={m.id} onClick={deleteMember} />
          <h3>{m.email}</h3>
          <h3>{m.full_name}</h3>
          <h3>{m.reference}</h3>
          <h3>2</h3>
          <h3><AiOutlinePlusCircle className="icon" /> <AiOutlineMinusCircle className="icon" /></h3>
        </div>
      ))}
    </div>
  }

  const handleSubmit = () => {
    let datetime = `${date} ${time}`
    // date and time togethe should be a string in this format "nov 30 2021 10:00pm"
    let game = { datetime, location, capacity }
    Axios.post('/games', { game })
      .then(resp => {
        if (resp.statusText == 'OK') {
          setDisplayMessage('your game has been created')
        } else {
          setDisplayMessage(`${resp.data}`)
        }
      })
    setLocation('')
    setDate('')
    setTime('')
    setCapacity('')
  }

  return (
    <div className="home-container">
      <div className="create-game">
        <h2>Enter new game here:</h2>
        <div className="game-input-container">
          <input className="game-info" type="text" placeholder="Enter Date Here" onChange={(e) => setDate(e.target.value)} />
          <input className="game-info" type="text" placeholder="Enter Time Here" onChange={(e) => setTime(e.target.value)} />
          <input className="game-info" type="text" placeholder="Enter Location Here" onChange={(e) => setLocation(e.target.value)} />
          <input className="game-info" type="text" placeholder="Enter Capacity" onChange={(e) => setCapacity(e.target.value)} />
          <input className="create-btn" type="submit" value="Create" onClick={handleSubmit} />
        </div>
      </div>
      <span className='display-message'>{displayMessage}</span>
      <ListMembers />
    </div>
  );
}

export default Home;