import React, { useState } from 'react';
import Axios from 'axios'
import "./SignUp.css"

const SignUp = () => {

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [reference, setReference] = useState('')
    const [password, setPassword] = useState('')

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
            })
            .catch(error => console.log('api errors:', error))
        setReference('')
        setEmail('')
        setFirstName('')
        setLastName('')
        setPassword('')
    };

    return (
        // <div className='signup-container'>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="register-input-container">
                     <label for="first-name">First Name: </label>
                     <input name="first-name" className="input" type="text" placeholder="First Name" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="register-input-container">
                    <label for="last-name">Last Name: </label>
                    <input name="last-name" className="input" type="text" placeholder="Last Name" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="register-input-container">
                    <label for="email">Email Address: </label>
                    <input name="email" className="input" type="text" placeholder="Enter Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="register-input-container">
                    <label for="password">Password: </label>
                    <input name="password" className="input" type="password" placeholder="Enter Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="register-input-container">
                   <label for="reference">Reference Email: </label>
                   <input name="reference" className="input" type="text" placeholder="Reference" id="reference" value={reference} onChange={(e) => setReference(e.target.value)} />  
                </div>
 
                <input type="submit" className='submit' />
            </form>
        // </div>
    );
}

export default SignUp;