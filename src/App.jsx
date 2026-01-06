import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//components
import NavBar from './components/navBar/NavBar'
import ExerciseForm from './components/exerciseForm/ExerciseForm'
import WorkoutCard from './components/workoutCard/WorkoutCard'
import WorkoutCardList from './components/workoutCardList/WorkoutCardList'
import Timer from './components/timer/Timer'
import Calendar from './components/calendar/Calendar'
import PopUpTwo from './components/popUpTwo/PopUpTwo'

//pages
import Home from './pages/homePage/Home'
import Planner from './pages/plannerPage/Planner'
import CreateWorkout from './pages/createWorkoutPage/CreateWorkout'
import WorkoutSession from './pages/workoutSessionPage/WorkoutSession'
import History from './pages/historyPage/History'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/planner' element={<Planner />} />
          <Route path='/planner/create-workout' element={<CreateWorkout />} />
          <Route path='/session' element={<WorkoutSession />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
