import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const TimerChart = ({ currentClass }) => {
  const {
    name, dayOfWeek, startHour, startMinute, endHour, endMinute,
  } = currentClass
  const todayAt11 = new Date()
  todayAt11.setHours(startHour, startMinute, 0)
  const todayAt1159 = new Date()
  todayAt1159.setHours(endHour, endMinute, 0)
  const now = new Date()
  // each tick should represent 1/10 second

  const [red, setRed] = useState(Math.round((((now - todayAt11) % 86400000) % 3600000) / 100))
  const [blue, setBlue] = useState(Math.round((((todayAt1159 - now) % 86400000) % 3600000) / 100))
  const offset = red + blue > 6000 ? 10 : 1

  const setRedBlue = () => {
    console.log(red)
    console.log(blue)
    setRed(red + offset)
    setBlue(Math.max((blue - offset), 0))
  }

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setRedBlue()
    }, 100 * offset)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearTimeout(intervalID)
  }, [red, blue])
  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [red, blue],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div id="card">
      <h1 style={{ textAlign: 'center' }}>{name}</h1>
      <Doughnut data={data} options={{ events: [] }} />
    </div>
  )
}

export default TimerChart
