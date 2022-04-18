import React from 'react'

const ClassOnSchedule = ({ nameOfClass, hasClass }) => (
  <>
    {hasClass ? <div className="class-on-grid">{nameOfClass}</div> : <div className="grid-item">{nameOfClass}</div>}
  </>
)

export default ClassOnSchedule
