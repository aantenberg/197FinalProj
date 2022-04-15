import axios from 'axios'
import React, { useState } from 'react'

const NewClass = ({ isAddingClass, setIsAddingClass }) => {
  const [className, setClassName] = useState('')
  const [dayOfWeek, setDayOfWeek] = useState(0)
  const [startHour, setStartHour] = useState(0)
  const [startMinute, setStartMinute] = useState(0)
  const [endHour, setEndHour] = useState(3)
  const [endMinute, setEndMinute] = useState(0)

  const postQuestion = async () => {
    try {
      // TODO: This is not the correct parameter!
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
          <h2>New Question: </h2>
          <textarea className="fullwidth write-area" onChange={e => setClassName(e.target.value)} />
          <button type="button" className="btn btn-primary" style={{ marginRight: 10, marginTop: 10 }} onClick={() => postQuestion()}>Save</button>
          <button type="button" className="btn btn-danger" style={{ marginRight: 10, marginTop: 10 }} onClick={() => setIsAddingClass(!isAddingClass)}>Cancel</button>
        </div>
      </div>
    </>
  )
}
export default NewClass
