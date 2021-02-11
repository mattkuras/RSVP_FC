import React from "react"
import "./Landing.css"

const Landing = () => {
    return (
        <div className="body">
            <div className="container">
                <h1>This Weeks Game:</h1>
                <h3>February 15th, 9:00pm</h3>
                <div className="input-container">
                    <label htmlFor="email-registration">Register via Email: </label>
                    <input type="text" name="email-registration" placeholder="Enter Email Here..." />
                </div>
                <input className="button" type="submit" value="Register"/>
            </div>
        </div>
    )
}

export default Landing