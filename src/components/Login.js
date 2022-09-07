import React, { Component } from 'react'
import '../index.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
  
export default function Login (){ 
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const contactSubmit =  (e) => {
      e.preventDefault();
      
        fetch(`https://localhost:7059/user/signIn?`+ new URLSearchParams({mail: mail,password:password}).toString())
            .then(response=>{
              if (!response.ok) {
                  return response.text().then(text => { throw new Error(text) })
              }  else{
                  return response.json()
              }
              })
            .then(data => {
              if(data.role=="admin")
              {
                navigate("/admin-page");
              }else if(data.role=="user"){
                navigate("/search");
              }
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
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value = {mail}
            onChange = {(e) => setMail(e.target.value)}
            placeholder="Enter email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required/>
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
        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
               Remember me
            </label>
          </div>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Don't have an account <a href="/sign-up">sign up?</a>
        </p>
      </form>
      
      </div>
      </div>
      </div>
    );
  
  }