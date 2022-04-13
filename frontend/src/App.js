import React from 'react'
import TimerChart from './components/TimerChart'

const App = () => {
  const currentClass = {
    name: 'CIS120', dayOfWeek: 0, startHour: 11, startMinute: 0, endHour: 12, endMinute: 0,
  }
  return (
    <>
      <TimerChart currentClass={currentClass} />
    </>
  )
}
export default App
