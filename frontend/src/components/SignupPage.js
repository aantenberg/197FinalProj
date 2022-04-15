import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignupPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signup = async () => {
    try {
      await axios.post('/account/signup', { username, password })
      navigate('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to sign up')
    }
  }

  return (
    <div id="card">
      <h1>Sign Up</h1>
      <input className="grey-border" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" className="grey-border" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="button" className="btn purple-btn fullwidth" onClick={() => signup()}>Sign Up</button>
      <br />
      <br />
      <p className="link">Already have an account? Click&nbsp;</p>
      <Link className="link" to="/login">here</Link>
      <p className="link">&nbsp;to login</p>
    </div>
  )
}

export default SignupPage
