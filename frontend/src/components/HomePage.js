/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import TimerChart from './TimerChart'
import NewClass from './NewClass'
import Schedule from './Schedule'

const HomePage = () => {
  const [isLoggedin, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState('')
  const [ccName, setccName] = useState('')
  const [ccStartHour, setccStartHour] = useState('')
  const [ccStartMinute, setccStartMinute] = useState('')
  const [ccEndHour, setccEndHour] = useState('')
  const [ccendMinute, setccEndMinute] = useState('')
  const [isAddingClass, setIsAddingClass] = useState(false)
  const [scheduleIsPublic, setScheduleIsPublic] = useState(false)
  const defaultSchedule = [
    { name: '', hasClass: false }, { name: 'Sun', hasClass: false }, { name: 'Mon', hasClass: false }, { name: 'Tue', hasClass: false }, { name: 'Wed', hasClass: false }, { name: 'Thur', hasClass: false }, { name: 'Fri', hasClass: false }, { name: 'Sat', hasClass: false },
    { name: '8am', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '9am', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '10am', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '11am', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '12pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '1pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '2pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '3pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '4pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '5pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '6pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '7pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '8pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '9pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
    { name: '10pm', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false }, { name: '', hasClass: false },
  ]
  const [schedule, setSchedule] = useState(defaultSchedule)

  const copyToClipboard = stringToCopy => {
    navigator.clipboard.writeText(stringToCopy)
  }
  const clearClasses = async () => {
    try {
      await axios.post('/schedule/clearClasses')
    } catch (e) {
      alert('Could not clear classes')
    }
  }

  const navigate = useNavigate()

  useEffect(() => {
    const getIsPublic = async () => {
      const { data: { loggedIn } } = await axios.get('/account/isLoggedIn')
      if (loggedIn) {
        try {
          const { data: { name } } = await axios.get('account/username')
          setUsername(name)
          const { data } = await axios.get('/schedule/isPublic', { params: { username: name } })
          const { publicSchedule } = data
          setScheduleIsPublic(publicSchedule)
        } catch (e) {
          alert('Could not get public')
        }
      }
    }
    getIsPublic()
  }, [])

  const logout = async () => {
    try {
      await axios.post('/account/logout')
      setIsLoggedIn(false)
    } catch (e) {
      alert('Failed to log out')
    }
  }

  const toggleVisibility = async () => {
    try {
      await axios.post('/schedule/setIsPublic', { newBool: !scheduleIsPublic })
      setScheduleIsPublic(!scheduleIsPublic)
    } catch (e) {
      alert('Failed to change visibility')
    }
  }

  const getClasses = async () => {
    const { data: { loggedIn } } = await axios.get('/account/isLoggedIn')
    setIsLoggedIn(loggedIn)
    if (loggedIn) {
      try {
        const { data: { name } } = await axios.get('account/username')
        const { data } = await axios.get('/schedule/getClasses', { params: { username: name } })
        let found = false
        const oldSchedule = [...schedule]
        setSchedule(defaultSchedule)
        data.forEach(element => {
          const {
            className, dayOfWeek, startHour, startMinute, endHour, endMinute,
          } = element
          const dayOfWeekOffset = dayOfWeek + 1
          let nameSet = false
          for (let i = startHour; i < Math.max(startHour + 1, endHour + (endMinute >= 30 ? 1 : 0)); i++) {
            if (i >= 8 && i <= 22) {
              if (!nameSet) {
                let strToAddTo = ''
                if (oldSchedule[(i - 7) * 8 + dayOfWeekOffset].name !== '') {
                  strToAddTo = `${oldSchedule[(i - 7) * 8 + dayOfWeekOffset].name}, `
                }
                oldSchedule[(i - 7) * 8 + dayOfWeekOffset] = { name: strToAddTo + className, hasClass: true }
                nameSet = true
              } else {
                oldSchedule[(i - 7) * 8 + dayOfWeekOffset].hasClass = true
              }
            }
          }
          const now = new Date()
          const startDate = new Date()
          startDate.setHours(startHour, startMinute, 0)
          const endDate = new Date()
          endDate.setHours(endHour, endMinute, 10)
          if (now.getDay() === dayOfWeek && now >= startDate && now <= endDate) {
            found = true
            setccName(className)
            setccStartHour(startHour)
            setccStartMinute(startMinute)
            setccEndHour(endHour)
            setccEndMinute(endMinute)
          }
        })
        setSchedule(oldSchedule)
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
              <div id="card">
                <Schedule schedule={schedule} />
              </div>
              <button type="button" className="btn purple-btn" style={{ margin: '0px 20px' }} onClick={() => setIsAddingClass(true)}>Add Class +</button>
              <div id="home" style={{ verticalAlign: 'center' }}>
                <button type="button" className="btn purple-btn" style={{ margin: '0px 20px' }} onClick={() => clearClasses()}>Clear Schedule</button>
                <div id="card-no-width">
                  <div className="form-check form-switch" style={{ fontSize: '20px' }}>
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={scheduleIsPublic} onChange={() => toggleVisibility()} />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Make Schedule Public?</label>
                  </div>
                  {scheduleIsPublic
                    ? (
                      <button type="button" className="btn purple-btn" style={{ margin: '0px 20px' }} onClick={() => copyToClipboard(`${window.location.href}viewSchedule?name=${username}`)}>Copy Share Link</button>
                    ) : <></>}
                </div>
              </div>
            </div>
          ) : <></>}
      </>
      {isAddingClass ? <NewClass isAddingClass={isAddingClass} setIsAddingClass={setIsAddingClass} /> : <div />}
    </>
  )
}

export default HomePage
