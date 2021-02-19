import React from "react"
import "./Requests.css"
import { VscThumbsdown, VscThumbsup } from 'react-icons/vsc'
import Axios from 'axios'

const Requests = (props) => {
  const requests = props.requests

  const accept = (e) => {
    let member = {email: e.target.id}
    Axios.post('/members', member)
    .then( resp => console.log(resp))
  }
  const deny = (e) => {
    let request = {email: e.target.id}
    console.log(request)
    Axios.delete('/requests', request)
      .then(resp => console.log(resp))
  }
  const RequestsLists = () => {
    return requests.map((req) => (
      <div className="member" key={req.id}>
        <h3>{req.email}</h3>
        <h3>{req.full_name}</h3>
        <h3>{req.reference}</h3>
        {/* <span ></span>
          <span><VscThumbsdown /></span> */}
        <h3 className='thumbs' id={req.email} onClick={accept}> <VscThumbsup /></h3>
        <h3 className='thumbs' id={req.email} onClick={deny}><VscThumbsdown /></h3>

      </div>
    ))
  }
  return (
    <div className="requests-container">
      <RequestsLists />
    </div>
  );
}

export default Requests;