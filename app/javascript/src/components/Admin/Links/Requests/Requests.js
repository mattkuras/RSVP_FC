import React from "react"
import "./Requests.css"

const Requests = (props) => {
  const requests = props.requests

  const RequestsLists = () => {
    return requests.map((req) => (
      <div className="member" key={req.id}>
          <h3>{req.email}</h3>
          <h3>{req.full_name}</h3>
          <h3>{req.reference}</h3>
        </div>
    ))
  }
  return (
    <div className="requests-container">
      <RequestsLists/>
    </div>
  );
}

export default Requests;