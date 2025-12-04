import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Createw() {
  const [values, setValues] = useState({plan_name:'', data:'', amount:'', validity:'', description:''});
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/tblwifi', values)
      .then(()=> navigate('/homew'))
      .catch(err=>console.error(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1
        style={{
          fontSize: "35px",
          fontWeight: "800",
          textAlign: "center",
          marginBottom: "25px",
          letterSpacing: "1.5px",
          background: "linear-gradient(135deg, #1a237e, #3949ab, #5c6bc0)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          paddingBottom: "12px",
          position: "relative",
          animation: "fadeInDown 0.8s ease"
        }}>
        Add Wifi Plan
      </h1>
        <form onSubmit={handleSubmit}>
          {['wifiid','plan_name','data','amount','validity','description'].map(field=>(
            <div className="mb-2" key={field}>
              <label>{field.charAt(0).toUpperCase()+field.slice(1)}:</label>
              <input 
                type={field==='amount'?'number':'text'}
                className="form-control"
                placeholder={`Enter ${field}`}
                value={values[field]}
                onChange={e=>setValues({...values,[field]:e.target.value})}
              />
            </div>
          ))}
          <button className="btn btn-success">Submit</button>
          <Link to="/homew" className="btn btn-primary ms-3">Back</Link>
        </form>
      </div>
    </div>
  );
}

export default Createw;
