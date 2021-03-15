import React, { useState } from 'react';
import Axios from 'axios'
import {AiOutlineClose} from 'react-icons/ai'
import "./SignUp.css"

const SignUp = (props) => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [reference, setReference] = useState('')
    const [password, setPassword] = useState('')
    const [messageSent, setMessageSent] = useState(false)
    const [message, setMessage] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        let request = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            reference: reference
        }
        Axios.post('/requests', { request })
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    setMessageSent(true)
                    setMessage(response.data.success)
                }
                else {
                    setMessageSent(true)
                    setMessage(response.data)
                }
            })
        setReference('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
    };
    const renderOk = () => {
        return (
            <div className='message-sent'>
                <p>{message}</p>
            </div>
        )
    }

    return (
        // <div className='signup-container'>
        <form className="signup-form" onSubmit={handleSubmit}>
            <span className='close'><AiOutlineClose onClick={() => props.toggle(false)}/></span>
            <h2>Fill out this form to send a request to join the club. The reference email must be an existing member of the club</h2>
            <div className="input-container dub">
                <input className="input split" type="text" placeholder="First Name" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input className="input split" type="text" placeholder="Last Name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type="text" placeholder="Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type="password" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-container">
                <input className="input" type='text' placeholder="Reference Email" id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
            </div>
            <div className='sub-btn'>
                <input type="submit" value='Send Request' className='signup-button' />
                {messageSent ? renderOk() : null}
            </div>
        </form>
        // </div>
    );
}

export default SignUp;