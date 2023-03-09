import React from 'react'
import './register.css'

const Register = () => {
  return (
  <div className="register-container">
    <form>
    <h1>Welcome to Chat App</h1>
    <div className="register-content">
      <div className="register-field">
        <label>Name:</label>
        <input type="text" id="name" placeholder="Enter your name" />
      </div>
      <div className="register-field">
        <label>Phone/Email:</label>
        <input type="text" id="phoneOrEmail" placeholder="Enter your phone or email" />
      </div>
      <div className="register-field">
        <label>Password:</label>
        <input type="password" id="password" placeholder="Enter your password" />
      </div>
      <button type="submit">Register</button>
      <div className="already-have-account">
        Already have an account?
      </div>
    </div>
    </form>
  </div>

  )
}

export default Register