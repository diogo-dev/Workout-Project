import React from 'react'
import { useState } from 'react'
import './ExerciseForm.css'

const ExerciseForm = ({exercise, setExercise, onAddExercise}) => {

  /* Exercise is an object with the following fields:
  exercise = {name, category, sets, reps, status, restTime, dificulty, notes} */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (exercise.name.trim() === "") return;
    onAddExercise(exercise);
    setExercise({
      name: "",
      category: "Full Body",
      sets: 0,
      reps: 0,
      status: "todo",
      restTime: 0,
      difficulty: "Easy",
      notes: "",
    });
    
  }

  const handleNumberChange = (e, field) => {
    const value = e.target.value;

    // Allows only positive numbers (RegExp)
    if (/^\d*(\.\d+)?$/.test(value)) {
      setExercise((prev) => ({ ...prev, [field]: value ? Number(value) : "" }));
    }
  };

  const blockInvalidKeys = (e) => {
    if (["e", "E", "+", "-", " "].includes(e.key) && e.key !== ".") {
      e.preventDefault();
    }
  };

  return (
    <div className='exercise-form-container'>
      <form onSubmit={handleSubmit}>
        <h1>Exercise Form</h1>

        <div className='form-input-box'>
          <label>
            <span>Exercise Name:</span>
            <input
              type="text"
              name='name'
              value={exercise.name}
              onChange={(e) => setExercise({ ...exercise, name: e.target.value })}
              required
            />
          </label>
          <label>
            <span>Category:</span>
            <select
              name="category"
              value={exercise.category}
              onChange={(e) => setExercise({ ...exercise, category: e.target.value })}
            >
              <option value="Full Body">Full Body</option>
              <option value="Chest">Chest</option>
              <option value="Arms">Arms</option>
              <option value="Legs">Legs</option>
              <option value="Back">Back</option>
              <option value="Cardio">Cardio</option>
            </select>
          </label>
        </div>

        <div className='form-input-box'>
          <label>
            <span>Sets:</span>
            <input
              type="text"
              name='sets'
              value={exercise.sets}
              onChange={(e) => handleNumberChange(e, "sets")}
              onKeyDown={blockInvalidKeys}
              required
            />
          </label>
          <label>
            <span>Reps:</span>
            <input
              type="text"
              name='reps'
              value={exercise.reps}
              onChange={(e) => handleNumberChange(e, "reps")}
              onKeyDown={blockInvalidKeys}
              required
            />
          </label>
        </div>

        <div className='form-input-box'>
          <label>
            <span>Difficulty:</span>
            <select
              name="difficulty"
              value={exercise.difficulty}
              onChange={(e) => setExercise({ ...exercise, difficulty: e.target.value })}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>
          <label>
            <span>Rest Time (min):</span>
            <input
              type="text"
              name='restTime'
              value={exercise.restTime}
              onChange={(e) => handleNumberChange(e, "restTime")}
              onKeyDown={blockInvalidKeys}
            />
          </label>
        </div>

        <div className='form-textarea-box'>
          <label>
            <span>Exercise notes:</span>
            <textarea
              name="notes"
              value={exercise.notes}
              onChange={(e) => setExercise({...exercise, notes: e.target.value})}
            ></textarea>
          </label>
        </div>

        <button type='submit' className='exercise-form-button'>Add Exercise</button>

      </form>
    </div>
  )
}

export default ExerciseForm