/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TimerChart from './TimerChart'
import NewClass from './NewClass'

const HomePage = () => {
  const [isLoggedin, setIsLoggedIn] = useState(true)
  const [ccName, setccName] = useState('')
  const [ccStartHour, setccStartHour] = useState('')
  const [ccStartMinute, setccStartMinute] = useState('')
  const [ccEndHour, setccEndHour] = useState('')
  const [ccendMinute, setccEndMinute] = useState('')
  const [isAddingClass, setIsAddingClass] = useState(false)
  // const [classes, setClasses] = useState([])
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await axios.post('/account/logout')
      setIsLoggedIn(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to log out')
    }
  }

  const getClasses = async () => {
    const { data: { loggedIn } } = await axios.get('/account/isLoggedIn')
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      try {
        const { data } = await axios.get('/schedule/getClasses')
        let found = false
        for (let i = 0; i < data.length; i++) {
          const {
            className, dayOfWeek, startHour, startMinute, endHour, endMinute,
          } = data[i]
          const now = new Date()
          const startDate = new Date()
          startDate.setHours(startHour, startMinute, 0)
          const endDate = new Date()
          endDate.setHours(endHour, endMinute, 10)
          if (now.getDay() === dayOfWeek && now >= startDate && now <= endDate) {
            console.log('found')
            found = true
            setccName(className)
            setccStartHour(startHour)
            setccStartMinute(startMinute)
            setccEndHour(endHour)
            setccEndMinute(endMinute)
          }
        }
        if (!found) {
          setccName('')
          setccStartHour('')
          setccStartMinute('')
          setccEndHour('')
          setccEndMinute('')
        }
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('Could not get account')
      }
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    getClasses()
  }, [])

  useEffect(() => {
    const intervalID = setInterval(() => {
      getClasses()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <>
      <div id="header">
        <h1>Almost! App</h1>
        {isLoggedin ? <button type="button" className="btn purple-btn" onClick={() => logout()}>Logout</button> : <></> }
      </div>
      <>
        {isLoggedin
          ? (
            <div id="home">
              {ccName === '' ? (
                <div id="card" className="center-vertically">
                  <h2>No events right now! Enjoy the break!</h2>
                </div>
              ) : <TimerChart className={ccName} startHour={ccStartHour} startMinute={ccStartMinute} endHour={ccEndHour} endMinute={ccendMinute} />}
              <div id="card" className="center-vertically">abc</div>
              <button type="button" className="btn purple-btn" style={{ margin: '0px 20px' }} onClick={() => setIsAddingClass(true)}>Add Class +</button>
            </div>
          ) : <></>}
      </>
      {isAddingClass ? <NewClass isAddingClass={isAddingClass} setIsAddingClass={setIsAddingClass} /> : <div />}
    </>
  )
}

export default HomePage
