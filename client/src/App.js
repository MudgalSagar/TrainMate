import React from 'react'
import LogOn from './auth/LogOn'
import Registerr from './auth/Registerr'
import {Routes,Route} from "react-router-dom"
import Dashboard from './pages/Dashboard'
import WorkoutHistory from './pages/WorkoutHistory'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogOn />} />
        <Route path = "/register" element = {<Registerr/>} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path = "/history" element = {<WorkoutHistory/>} />
      </Routes>
    </div>
  )
}

export default App
