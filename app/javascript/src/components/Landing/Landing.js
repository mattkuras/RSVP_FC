import React, { useState } from "react"
import {Link} from "react-router-dom"
import "./Landing.css"

const Landing = () => {
    const [userEmail, setUserEmail] = useState("")

    const handleChange = (e) => {
       setUserEmail(e.target.value)
    }

    const registerUser = () => {
        console.log(userEmail)
    }
    return (
        <div className="body">
            <div className="container">
                <h1 className="game-header">This Weeks Game:</h1>
                <h3 className="game-time">February 15th, 9:00pm</h3>
                <div className="input-container">
                    <label htmlFor="email-registration">Register via Email: </label>
                    <input className="email-input" onChange={handleChange} type="text" name="email-registration" placeholder="Enter Email Here..." />
                </div>
                <input onClick={registerUser} className="button" type="submit" value="Register"/>
                <Link className="sign-up-link" to="/signup"><p>Have you not been accepted as a member?</p></Link>
            </div>
        </div>
    )
}

export default Landing