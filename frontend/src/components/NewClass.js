import axios from 'axios'
import React, { useState } from 'react'

const NewClass = ({ isAddingClass, setIsAddingClass }) => {
  const [className, setClassName] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState(1)
  const [startHour, setStartHour] = useState(0)
  const [startMinute, setStartMinute] = useState(0)
  const [endHour, setEndHour] = useState(0)
  const [endMinute, setEndMinute] = useState(0)

  const setStartTimes = startTime => {
    setStartHour(parseInt(startTime.substring(0, 2), 10))
    setStartMinute(parseInt(startTime.substring(3, 5), 10))
  }

  const setEndTimes = endTime => {
    setEndHour(parseInt(endTime.substring(0, 2), 10))
    setEndMinute(parseInt(endTime.substring(3, 5), 10))
  }

  const postQuestion = async () => {
    try {
      await axios.post('/schedule/addClass', {
        classToAdd: {
          className,
          dayOfWeek,
          startHour,
          startMinute,
          endHour,
          endMinute,
        },
      })
      setIsAddingClass(false)
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Failed to post question')
    }
  }

  return (
    <>
      <div className="modal-container">
        <div className="my-modal">
          <h2>Add Class: </h2>
          <input className="grey-border" placeholder="Class Name:" onChange={e => setClassName(e.target.value)} />
          <form onChange={e => setDayOfWeek(e.target.value)}>
            <select className="grey-border">
              <option value={1}>Monday</option>
              <option value={2}>Tuesday</option>
              <option value={3}>Wednesday</option>
              <option value={4}>Thursday</option>
              <option value={5}>Friday</option>
              <option value={6}>Saturday</option>
              <option value={0}>Sunday</option>
            </select>
          </form>
          <div>
            <p>
              Start Time:
            </p>
            <input type="time" className="grey-border" onChange={e => setStartTimes(e.target.value)} />
          </div>
          <div>
            <p>
              End Time:
            </p>
            <input type="time" className="grey-border" onChange={e => setEndTimes(e.target.value)} />
          </div>
          <button type="button" className="btn btn-primary" style={{ marginRight: 10, marginTop: 10 }} onClick={() => postQuestion()} disabled={className === ''}>Save</button>
          <button type="button" className="btn btn-danger" style={{ marginRight: 10, marginTop: 10 }} onClick={() => setIsAddingClass(!isAddingClass)}>Cancel</button>
        </div>
      </div>
    </>
  )
}
export default NewClass
