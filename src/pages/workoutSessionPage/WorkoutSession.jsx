import React, {useState, useEffect} from 'react'
import './WorkoutSession.css'
import Timer from '../../components/timer/Timer.jsx'
import DragAndDrop from '../../components/dragAndDrop/DragAndDrop.jsx'
import DateSelector from '../../components/datePicker/DateSelector.jsx'
import { useCalendar } from '../../hooks/useCalendar.jsx'
import { getWorkoutByDate, getExercisesByWorkoutDate } from '../../db/Indexed.jsx'



const WorkoutSession = () => {

  const { selectedDate } = useCalendar();
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

  return (
    <>
      <div className='session-page-date-selector'>
        <DateSelector />
      </div>
      <div className="session-page-inner-conteiner">
        <div className='session-page-timer-conteiner'>
          <div>
            <p className='session-page-timer-text'>Workout Duration:</p>
            <Timer />
          </div>
          <div>
            <p className='session-page-timer-text'>Rest Time:</p>
            <Timer />
          </div>
        </div>
        <div className='session-page-drag-drop-conteiner'>
          <div>
            <p className='session-page-drag-drop-text'>To do</p>
            <DragAndDrop
              workout={workout}
              exercises={workoutExercises}
              setExercises={setWorkoutExercises}
              text="Nothing to do!"
              column="todo"
            />
          </div>
          <div>
            <p className='session-page-drag-drop-text'>Done</p>
            <DragAndDrop
              workout={workout}
              exercises={workoutExercises}
              setExercises={setWorkoutExercises}
              text="Nothing done yet!"
              column="done"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkoutSession