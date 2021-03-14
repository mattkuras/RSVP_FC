import React, { useEffect, useState } from "react"
import { GiSoccerBall } from 'react-icons/gi'
import { Link } from "react-router-dom"
import "./Landing.css"
import Axios from 'axios'
import { motion } from 'framer-motion'
import Signup from '../SignUp'

const Landing = () => {
    const [memberEmail, setMemberEmail] = useState("")
    const [game, setGame] = useState({})
    const [signupPage, toggleSignUpPage] = useState(false)
    const [displayMessage, setDisplayMessage] = useState('')

    useEffect(() => {
        fetchGame()
    }, [])

    const fetchGame = () => {
        Axios.get('/games/current')
            .then(resp => {
                if (resp.statusText == 'OK') {
                    setGame(resp.data)
                } else {
                    console.log('there was an error getting your game. check log below')
                    console.log(resp)
                }
            })
    }

    const handleChange = (e) => {
        setMemberEmail(e.target.value)
    }

    const checkRsvpStatus = () => {
        let game_id = game.id
        let email = memberEmail
        let rsvp = { email, game_id }
        Axios.post('/rsvps/status', { rsvp })
            .then(resp => {
                if (resp.data.id) {
                    setDisplayMessage('Your spot has been reserved!')
                    setMemberEmail('')
                } else {
                    setDisplayMessage(resp.data)
                }
            }
            )
    }

    const Login = () => {
        return <div className="container">
            <h1 className="login"><Link to='/login'>Login</Link></h1>
            <span className="sign-up-link" onClick={() => { toggleSignUpPage(true) }}><p>Not yet a member?</p></span>
            <motion.h1 className='ball' animate={{ y: ['20%', '-20%',] }} transition={bounceTransition}><GiSoccerBall /></motion.h1>
        </div>
    }
    const bounceTransition = {
        y: {
            duration: 0.4,
            yoyo: Infinity,
            ease: 'easeOut'
        }}
    return (
        <div className="body">
            {signupPage ? <Signup toggle={toggleSignUpPage} /> : <Login/>}
            {/* <div className="container">
                <h1 className="login"><Link to='/login'>Login</Link></h1>
                <span className="sign-up-link" onClick={() => { toggleSignUpPage(true) }}><p>Not yet a member?</p></span>
                <motion.h1 className='ball' animate={{ y: ['20%', '-20%',] }} transition={bounceTransition}><GiSoccerBall /></motion.h1>
            </div> */}
            <div className='next-game-container'>
                <h1 className="next-game">Next Game</h1>
                <h3 className="next-game-time">{game.formatted_time}</h3>
                <div className="input-con">
                    <label className="email-label" for="email-registration">Check RSVP Status via Email </label>
                    <input className="email-field" onChange={handleChange} type="text" name="email-registration" placeholder="Enter Email Here..." />
                </div>
                <span className='display-message'>{displayMessage}</span>
                <input onClick={checkRsvpStatus} className="button" type="submit" value="Submit" />
            </div>



        </div>
    )
}

export default Landing