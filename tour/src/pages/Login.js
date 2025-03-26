import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Ourmain from '../hoc/Ourmain.jsx';
import { useState } from 'react';
import { makeUnauthenticatedPOSTRequest } from '../utils/serverhelper.js';
import { useCookies } from 'react-cookie';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [ cookie, setCookie ] = useCookies(["token"]);
  const navigate = useNavigate();

  const Login1 = async () => {
      
      const data = { email, password };
      const response = await makeUnauthenticatedPOSTRequest(
        "/auth/login",
        data
      );
      if(response && !response.error){
        console.log(response);
        const token = response.token;
        const date = new Date();
        date.setDate(date.getDate() + 30);
        setCookie("token", token, {  path: '/', expires: date });
        alert("Login successful");
        navigate("/account");
      }
      else {
        alert("Login failed");
      }

  };


  const Submit = () => {

    return (
      <button type="submit" className="Login-button" onClick={ (e) => { 
        e.preventDefault();
        Login1();
      } } >Login</button>
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
        <div className="login-container">
          <h2>Login</h2>
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" value={ email } setValue={ setEmail } onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" value={ password } setValue={ setPassword } onChange={(e) => setPassword(e.target.value)} required />
            </div>
           <Submit />
          </form>
          <p className="signup-redirect">
            Don't have an account? <Link to="/auth/signup" className="signup-link">Signup</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Ourmain(Login);