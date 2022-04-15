import 'regenerator-runtime/runtime'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const login = async () => {
    try {
      await axios.post('/account/login', { username, password })
      navigate('/')
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to log in')
    }
  }

  return (
    <div id="card">
      <h1>Log In</h1>
      <input className="grey-border" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" className="grey-border" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button type="button" className="btn purple-btn fullwidth" onClick={() => login()}>Log In</button>
      <br />
      <br />
      <p className="link">Don&apos;t have an account?&nbsp;</p>
      <Link className="link" to="/signup">Sign up!</Link>
    </div>
  )
}

export default LoginPage
