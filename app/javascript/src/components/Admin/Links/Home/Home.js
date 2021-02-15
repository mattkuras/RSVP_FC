import React from "react"
import "./Home.css"
import {AiOutlinePlusCircle, AiOutlineMinusCircle} from "react-icons/ai"
import {FaRegTrashAlt} from "react-icons/fa"

const Home = () => {
  return (
    <div className="home-container">
                  <div className="create-game">
              <h2>Enter new game here:</h2>
              <div className="game-input-container">
                  <input className="game-info" type="text" placeholder="Enter Date Here"/>
                  <input className="game-info" type="text" placeholder="Enter Time Here"/>
                  <input className="create-btn" type="submit" value="Create"/>
              </div>
          </div>

          <div className="member-list">

          <div className="member header">
            <h3>Delete</h3>
                <h3>Member Email</h3>
                <h3>Member Name</h3>
                <h3>Referrer Email</h3>
                <h3>Times Missed</h3>
                <h3>Edit Times Missed</h3>
              </div>

              <div className="member">
                <FaRegTrashAlt className="trash-icon"/>
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3><AiOutlinePlusCircle className="icon"/> <AiOutlineMinusCircle className="icon"/></h3>
              </div>

              <div className="member">
                <FaRegTrashAlt className="trash-icon" />
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3><AiOutlinePlusCircle className="icon"/> <AiOutlineMinusCircle className="icon"/></h3>
              </div>

              <div className="member">
              <FaRegTrashAlt className="trash-icon"/>
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3><AiOutlinePlusCircle className="icon"/> <AiOutlineMinusCircle className="icon"/></h3>
              </div>
          </div>
    </div>
  );
}

export default Home;