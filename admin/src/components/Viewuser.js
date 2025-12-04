import axios from "axios";
import React, { useEffect, useState } from "react";
import './user.css'; 

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/tblregister")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container" style={{ marginTop: '100px' }}>
         
      <h2 className="text-center mb-4 text-dark"><i className="fa-solid fa-user-plus fa-1x"></i>&nbsp;&nbsp;All Users</h2>
      
      {users.length > 0 ? (
        <div className="table-responsive shadow rounded">
          <table className="table table-bordered table-hover table-sm text-center">
            <thead className="custom-header">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>DOB</th>
               
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.fname}</td>
                  <td>{user.uname}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.gender}</td>
                  <td>{user.dob}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-info text-center">
          No user records found.
        </div>
      )}
    </div>
  );
};

export default UserTable;
