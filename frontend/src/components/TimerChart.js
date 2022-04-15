import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import Confetti from 'react-confetti'

ChartJS.register(ArcElement, Tooltip, Legend)

const TimerChart = ({
  className, startHour, startMinute, endHour, endMinute,
}) => {
  const startTime = new Date()
  startTime.setHours(startHour, startMinute, 0)
  const endTime = new Date()
  endTime.setHours(endHour, endMinute, 0)
  const now = new Date()
  // each tick should represent 1/10 second

  const [timeElapsed, setTimeElapsed] = useState((now - startTime) / 100)
  const [timeRemaining, setTimeRemaining] = useState(Math.max((endTime - now) / 100, 0))
  const [confetti, setConfetti] = useState(false)
  const offset = timeElapsed + timeRemaining > 6000 ? 10 : 1

  const setRedBlue = () => {
    setTimeElapsed(timeElapsed + offset)
    setTimeRemaining(Math.max((timeRemaining - offset), 0))
    if (timeRemaining === 0) {
      setConfetti(true)
    }
  }

  useEffect(() => {
    const intervalID = setTimeout(() => {
      setRedBlue()
    }, 100 * offset)
    // return a clean-up function so that the repetition can be stopped
    // when the component is unmounted
    return () => clearTimeout(intervalID)
  }, [timeElapsed, timeRemaining])
  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [timeElapsed, timeRemaining],
        backgroundColor: [
          'rgba(255, 2, 103, 0.7)',
          'rgb(255,117,151, 0.7)',
        ],
        borderColor: [
          'rgb(255, 2, 103)',
          'rgb(255,117,151)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div id="card">
      {confetti
        ? (
          <Confetti
            numberOfPieces={1000}
            tweenDuration={10000}
            gravity={0.3}
            colors={['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']}
            recycle={false}
          />
        ) : <></>}
      <h1 style={{ textAlign: 'center' }}>{className}</h1>
      <Doughnut data={data} options={{ events: [] }} />
    </div>
  )
}

export default TimerChart
