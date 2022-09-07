import React, { Component } from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp(){
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
   const contactSubmit =  (e) => {
    e.preventDefault();
    
      fetch(`https://localhost:7059/user/signUp`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            mail: mail,
            password: password,
        })
          }).then(response=>{
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) })
            }  else{
                return response.json()
            }
            })
          .then(data => {
              console.log('Success: user is saved');
              navigate("/search");
          }).catch(error=>{
              console.warn('ERROR' + error);
              alert(error);
          });
    } 
    return (
      
      <div className="container">
      <div className="auth-wrapper">
      <div className="auth-inner">
      <form onSubmit={ contactSubmit}>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            value = {name}
            onChange = {(e) => setName(e.target.value)}
            placeholder="First name"
            minLength="3" maxLength="14" pattern="[a-zA-Z]+"
            required
          />
        </div>
        <div className="mb-3">
          <label>Last name</label>
          <input type="text" 
          className="form-control" 
          value = {surname}
          onChange = {(e) => setSurname(e.target.value)}
          placeholder="Last name" 
          minLength="3" 
          maxLength="14" 
          pattern="[a-zA-Z-]+"
          required
          />
        </div>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value = {mail}
            onChange = {(e) => setMail(e.target.value)}
            placeholder="Enter email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            pattern="[a-zA-Z0-9]+"
            required
          />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      
      </div>
      </div>
      </div>
    )
  
}