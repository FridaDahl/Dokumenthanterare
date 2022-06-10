import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import './LogIn.css'
import { response } from "express";

async function loginUser(credentials:any) {
  //   return fetch('http://localhost:3000/users', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(credentials)
  //   })
  //     .then(data => data)
  //  };
  return axios.post("http://localhost:3000/users", credentials)
  .then(response =>{
    return response.data[0].id
    
  })
}

export const LogIn = ({setToken}:any) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
  
    async function handleSubmit(event: any) {
      event.preventDefault();
      const token = await loginUser({username: user, pw:password});
      setToken(token)
    }
  
    return (
      <div className="login-wrapper">
        <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUser(e.target.value)}/>
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
      </div> 
    );
  }

  LogIn.propTypes = {
    setToken: PropTypes.func.isRequired}