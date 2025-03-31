import React, { useEffect, useState, useRef } from 'react'
import './CreateWorkout.css'
import { MdOutlineWavingHand } from "react-icons/md"
import { MdArrowBackIos } from "react-icons/md"
import { useNavigate } from 'react-router-dom'
import WorkoutCardList from '../../components/workoutCardList/WorkoutCardList'
import ExerciseForm from '../../components/exerciseForm/ExerciseForm'
import TwoStepForm from '../../components/twoStepForm/TwoStepForm.jsx'

/* importing my own hook made for the calendar context */
import { useCalendar } from '../../hooks/useCalendar.jsx'

import { getWorkoutByDate, addExerciseToWorkout, getExercisesByWorkoutDate, deleteExerciseFromWorkout } from '../../db/Indexed.jsx'


const CreateWorkout = () => {
  const navigate = useNavigate();
  const { selectedDate } = useCalendar();
  const [workout, setWorkout] = useState(null);
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const containerRef = useRef(null);
  const [exercise, setExercise] = useState({
      name: "",
      category: "Full Body",
      sets: 0,
      reps: 0,
      status: "todo",
      restTime: 0,
      difficulty: "Easy",
      notes: ""
    });

  useEffect(() => {
    const fetchWorkout = async () => {
      if (!selectedDate) return;
      const existingWorkout = await getWorkoutByDate(selectedDate);
      const existingWorkoutExercises = await getExercisesByWorkoutDate(selectedDate);
      setWorkout(existingWorkout);
      setWorkoutExercises(existingWorkoutExercises);
    };

    fetchWorkout();
  }, []); 

  const handleAddExercise = async (newExercise) => {
    if (!workout) return;

    try {
      await addExerciseToWorkout(selectedDate, newExercise);
      const existingWorkoutExercises = await getExercisesByWorkoutDate(selectedDate);
      setWorkoutExercises(existingWorkoutExercises);

      // scroll to the bottom of the container after adding a new exercise
      // using setTimeout to ensure the new added exercise has been rendered already
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, 100);

      console.log("Added Exercise:", newExercise.name);
    } catch (error) {
      console.error("Error adding exercise:", error);
    }
  };

  const handleOnDeleteExercise = async (exerciseId) => {
    if (!workout) return;

    try {
      await deleteExerciseFromWorkout(selectedDate, exerciseId);
      const existingWorkoutExercises = await getExercisesByWorkoutDate(selectedDate);
      setWorkoutExercises(existingWorkoutExercises);
      console.log("Deleted Exercise:", exerciseId); 
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  const handleOnClick = () => {
    const blur = document.getElementById('blur');
    blur.classList.toggle('active');
    setShowPopUp(!showPopUp);
  };

  return (
    <div>
      {showPopUp && <TwoStepForm onClose={handleOnClick} exercise={exercise} setExercise={setExercise} />}
      <div className='create-workout-page-conteiner' id='blur'>
        <h1 className='create-workout-title'>{selectedDate}</h1>
        <ExerciseForm onAddExercise={handleAddExercise} exercise={exercise} setExercise={setExercise} />
        <WorkoutCardList
          containerRef={containerRef}
          workout={workout}
          exercises={workoutExercises}
          setExercises={setWorkoutExercises}
          onDeleteExercise={handleOnDeleteExercise}
          showDeleteIconButton={true}
        />
        <button
          text-content="Want a workout suggestion?"
          className="workout-suggestion-button"
        >
          <MdOutlineWavingHand className='workout-suggestion-icon' onClick={handleOnClick} />
        </button>
        <MdArrowBackIos className='return-to-planner-page-icon' onClick={() => navigate("/planner")}/>
      </div>
    </div>
  )
}

export default CreateWorkout