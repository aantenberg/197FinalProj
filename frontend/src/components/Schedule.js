import React, { useState } from 'react'
import ClassOnSchedule from './ClassOnSchedule'

const Schedule = ({ schedule }) => {
  let index = 0
  return (
    <div className="custom-grid-container">
      {schedule.map(element => (<ClassOnSchedule key={index++} nameOfClass={element.name} hasClass={element.hasClass} />
      ))}
    </div>
  )
}

export default Schedule
