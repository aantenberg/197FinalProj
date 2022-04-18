import React, { useState } from 'react'
import {
  Routes, Route, useLocation,
} from 'react-router-dom'
import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import SharedSchedulePage from './components/SharedSchedulePage'

const App = () => {
  const useQuery = () => {
    const { search } = useLocation()
    return React.useMemo(() => new URLSearchParams(search), [search])
  }

  const query = useQuery()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/viewSchedule" element={<SharedSchedulePage username={query.get('name')} />} />
    </Routes>
  )
}
export default App
