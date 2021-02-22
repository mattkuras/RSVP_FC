import React from "react"
import "./Requests.css"
import { VscThumbsdown, VscThumbsup } from 'react-icons/vsc'
import Axios from 'axios'

const Requests = (props) => {
  const requests = props.requests
  const token = localStorage.getItem("token")
  
  const accept = (e) => {
    let member = {email: e.target.id}
    Axios.post('/members', member, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => {
      if (resp.data.id) {
        let reqs = props.requests.filter(r => r.email != member.email)
        props.delete(reqs)
        console.log('created!')
      }
      else {
        console.log('it didnt create')
      }
    })
  }
  const deny = (e) => {
    let request = {id: e.target.id}
    Axios.delete(`/requests/${request.id}`, request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.deleted) {
          let reqs = props.requests.filter(r => r.id != request.id)
          props.delete(reqs)
          console.log('deleted!')
        }
        else {
          console.log('it didnt didnt delete')
        }
      })
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
        <h3 className='thumbs' id={req.id} onClick={deny}><VscThumbsdown /></h3>

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