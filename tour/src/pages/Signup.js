import React from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import Ourmain from '../hoc/Ourmain';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverhelper';

import { useState } from 'react';


function Signup() {
  
const [userName, setUsername] = useState("");
const [fullName, setFullname] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");
 



const Signup1 = async () => {


  const data = { userName, fullName, email, password, confirmPassword, phone, address };
  console.log(data);
  const response = await makeUnauthenticatedPOSTRequest(
    "/auth/signup",
    data
  );
  if(response && !response.error){
    console.log(response);
    alert("Signup successful");
  }
  else {
    alert("Signup failed");
  }

}


const Submit = () => {

  return (
    <button type="submit" className="signup-button" onClick={ (e) => { 
      e.preventDefault();
      Signup1();
    } } >Signup</button>
  );
}

  return (
    <>
      <div
        className="page-container"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-photo/composition-small-airplanes-bus-passport-map_23-2148169874.jpg?ga=GA1.1.1599877780.1738726996&semt=ais_hybrid')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
        }}
      >
        <div className="signup-container">
          <h2>Signup</h2>
          <form className="signup-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" value={userName} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>
              <input type="text" id="fullname" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullname(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea id="address" placeholder="Enter your address" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
            </div>     
            <Submit />    
          </form>
          <p className="login-redirect">
            Already have an account? <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Ourmain(Signup);