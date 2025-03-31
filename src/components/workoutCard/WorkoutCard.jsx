import React from 'react'
import './WorkoutCard.css'
import { RiDeleteBinLine } from "react-icons/ri"
import { MdNotes } from "react-icons/md"
import { motion } from 'framer-motion'


const WorkoutCard = ({ exercise, onDelete, iconButton, ...dragProps }) => {

  return (
    <motion.div
      layout
      layoutId={exercise.id}
      className='workout-card-conteiner'
      {...dragProps}
    >
      <h2>{exercise.name} </h2>
      <p className='exercise-difficulty'>({exercise.difficulty})</p>
      <p className='exercise-sets-reps'>
        <strong>{exercise.sets}</strong> sets x <strong>{exercise.reps}</strong> reps
      </p>
      {exercise.notes && <p className='exercise-notes'><MdNotes className='note-icon'/>: {exercise.notes}</p>}
      {iconButton && <button className='workout-card-button' onClick={() => onDelete(exercise.id)}><RiDeleteBinLine /></button>}
    </motion.div>
  )
}

export default WorkoutCard