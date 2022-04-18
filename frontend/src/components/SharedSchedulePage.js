/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import Schedule from './Schedule'

const SharedSchedulePage = ({ username }) => {
  const [isPublic, setIsPublic] = useState(false)
  const [schedule, setSchedule] = useState([
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
  ])

  const getClasses = async () => {
    try {
      const { data } = await axios.get('/schedule/getClasses', { params: { username } })
      const oldSchedule = [...schedule]
      data.forEach(element => {
        const {
          className, dayOfWeek, startHour, startMinute, endHour, endMinute,
        } = element
        const dayOfWeekOffset = dayOfWeek + 1
        let nameSet = false
        for (let i = startHour; i < Math.max(startHour + 1, endHour + (endMinute >= 30 ? 1 : 0)); i++) {
          if (i >= 8 && i <= 22) {
            if (!nameSet) {
              oldSchedule[(i - 7) * 8 + dayOfWeekOffset] = { name: className, hasClass: true }
              nameSet = true
            } else {
              oldSchedule[(i - 7) * 8 + dayOfWeekOffset].hasClass = true
            }
          }
        }
      })
      setSchedule(oldSchedule)
    } catch (e) {
      alert('Could not get account')
    }
  }

  useEffect(() => {
    const getIsPublic = async () => {
      try {
        const { data } = await axios.get('/schedule/isPublic', { params: { username } })
        const { publicSchedule } = data
        setIsPublic(publicSchedule)
      } catch (e) {
        alert('User does not exist')
      }
    }
    getIsPublic()
  }, [])

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <>
      {!isPublic ? (
        <>
          <Header isLoggedIn={false} />
          <div id="card" style={{ textAlign: 'center' }}>
            <h2>
              {username}
              &apos;s schedule is not public.
            </h2>
          </div>
        </>
      ) : (
        <>
          <Header isLoggedIn={false} />
          <div id="card">
            <h1>{`${username}'s Schedule:`}</h1>
            <Schedule schedule={schedule} />
          </div>
        </>
      )}
    </>
  )
}

export default SharedSchedulePage
