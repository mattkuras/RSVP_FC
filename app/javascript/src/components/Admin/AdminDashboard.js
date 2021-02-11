import React from 'react';
import "./AdminDashboard.css"

const AdminDashboard = () => {
    return (
        <>
          <nav className="dashboard-navbar">
            <h1>RsvpFC</h1>
            <h2>Logout</h2>
          </nav>

          <div className="links">
            <h3 className="link-item">Home</h3>
            <h3 className="link-item">Current Matches</h3>
            <h3 className="link-item">Member Requests</h3>
          </div>

          <div className="create-game">
              <h2>Enter new game here:</h2>
              <div className="game-input-container">
                  <input className="game-info" type="text" placeholder="Enter Date Here"/>
                  <input className="game-info" type="text" placeholder="Enter Time Here"/>
                  <input className="create-btn" type="submit" value="Create"/>
              </div>
          </div>

          <div className="member-list">

          <div className="member">
                <h3>Member Email</h3>
                <h3>Member Name</h3>
                <h3>Referrer Email</h3>
                <h3>Times Missed</h3>
                <h3>Edit Times Missed</h3>
              </div>

              <div className="member">
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3>+ -</h3>
              </div>

              <div className="member">
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3>+ -</h3>
              </div>

              <div className="member">
                <h3>JesseMcMahon@gmail.com</h3>
                <h3>Jesse McMahon</h3>
                <h3>MattKuras@gmail.com</h3>
                <h3>2</h3>
                <h3>+ -</h3>
              </div>
          </div>
        </>
      );
}
 
export default AdminDashboard;