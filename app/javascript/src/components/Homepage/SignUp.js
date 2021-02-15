import React, { useState } from 'react';
import Axios from 'axios'

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [reference, setReference] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        let request = {
            email: email,
            first_name: firstName,
            last_name: lastName,
            reference: reference
        }
        Axios.post('/requests', { request }, { withCredentials: true })
            .then(response => {
                console.log(response)
            })
            .catch(error => console.log('api errors:', error))
        setReference('')
        setEmail('')
        setFirstName('')
        setLastName('')
    };

    return (
        <div className='signup-container'>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="input-container dub">
                    <input className="input split" type="text" placeholder="First Name" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input className="input split" type="text" placeholder="Last Name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="input-container">
                    <input className="input" type="text" placeholder="Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input-container">
                    <input className="input" type="text" placeholder="Reference" id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />
                </div>
                <input type="submit" className='submit' />
            </form>
        </div>
    );
}

export default SignUp;