import React from 'react'
import axios from 'axios'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      setIsLoggedIn(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to log out')
    }
  }
  return (
    <div id="header">
      <h1>Almost! App</h1>
      {isLoggedIn ? <button type="button" className="btn purple-btn" onClick={() => logout()}>Logout</button> : <></> }
    </div>
  )
}

export default Header
