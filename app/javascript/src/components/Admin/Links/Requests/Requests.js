import React, {useState} from "react"
import "./Requests.css"
import { VscThumbsdown, VscThumbsup } from 'react-icons/vsc'
import Axios from 'axios'

const Requests = (props) => {
  const [confirmationMessage, setConfirmationMessage] = useState(false)
  const [requestId, setRequestId] = useState()
  const requests = props.requests
  const token = localStorage.getItem("token")
  
  const accept = (e) => {
    let member = {email: e.target.id}
    console.log(e.target)
    console.log(member)
    Axios.post('/members', member, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(resp => {
      if (resp.data.id) {
        let reqs = props.requests.filter(r => r.email != member.email)
        props.setRequests(reqs)
        props.setMembers(members => [...members, resp.data]  )
        console.log('created!')
      }
      else {
        console.log('it didnt create')
      }
    })
  }
  const deny = () => {
    let request = {id: requestId}
    Axios.delete(`/requests/${request.id}`, request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.deleted) {
          let reqs = props.requests.filter(r => r.id != request.id)
          props.setRequests(reqs)
          console.log('deleted!')
        }
        else {
          console.log('it didnt didnt delete')
        }
        setConfirmationMessage(false)
      })
  }

  const waitlist = () => {
    let request = {id: requestId}
    Axios.post(`/requests/waitlist`, request, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => {
        if (resp.data.success) {
          let reqs = props.requests.filter(r => r.id != request.id)
          props.setRequests(reqs)
          console.log('waitlisted!')
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
        <h3 className='thumbs' id={req.id} onClick={handleDeny}><VscThumbsdown /></h3>

      </div>
    ))
  }

  const DenyConfirmation = () => {
    return <div className='confirmation-message'>
      <div>Do you want to waitlist or delete this request?</div>
      <div className='option' onClick={waitlist}>Waitlist</div>
      <div className='option' onClick={deny}>Delete</div>
      <div className='option'onClick={handleDeny}>Cancel</div>
    </div>
  }

  const handleDeny= (e) => {
    setConfirmationMessage(!confirmationMessage)
    setRequestId(e.target.id)
  }

  let confirmation;
  if (confirmationMessage == true){
     confirmation = <DenyConfirmation/>
  }

  return (
    <div className="requests-container">
      <RequestsLists />
      {confirmation}
    </div>
  );
}

export default Requests;