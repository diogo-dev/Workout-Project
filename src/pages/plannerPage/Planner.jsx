import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Planner.css'

import Calendar from '../../components/calendar/Calendar'
import WorkoutCardList from '../../components/workoutCardList/WorkoutCardList'

/* importing my own hook made for the calendar context */
import { useCalendar } from '../../hooks/useCalendar.jsx'

//import the database
import { addWorkout, getWorkoutByDate, getExercisesByWorkoutDate } from "../../db/Indexed"


const Planner = () => {
  const navigate = useNavigate();
  const { selectedDate } = useCalendar();
  const [loading, setLoading] = useState(false);
  const [workout, setWorkout] = useState(null);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  
  useEffect(() => {
    
    const fetchWorkout = async () => {
      if (!selectedDate) return;
      const existingWorkout = await getWorkoutByDate(selectedDate);
      const existingWorkoutExercises = await getExercisesByWorkoutDate(selectedDate);
      setWorkout(existingWorkout);
      setWorkoutExercises(existingWorkoutExercises);
    };
  
    fetchWorkout();
  }, [selectedDate]);

  const handleCreateWorkout = async () => {
    setLoading(true);

    try {
      if (!workout) {
        // Creating new workout if it does't already exists
        const newWorkout = {
          date: selectedDate,
          exercises: []
        };
        await addWorkout(newWorkout);
        console.log("New workout create at this date:", selectedDate);
      } else {
        console.log("Workout already existed to this date:", selectedDate);
        console.log(workout);
      }

      navigate("/planner/create-workout"); // redirect after verification 
    } catch (error) {
      console.error("Error creating workout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='planner-conteiner'>
      <h1 className='planner-title'>Workout of the day!</h1>
      <Calendar onCreateWorkout={handleCreateWorkout} loadingWorkout={loading} />
      <WorkoutCardList exercises={workoutExercises} showDeleteIconButton={false} />
    </div>
  )
}

export default Planner