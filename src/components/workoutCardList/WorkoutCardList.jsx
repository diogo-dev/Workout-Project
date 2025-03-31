import React, {useEffect, useState, useRef} from 'react'
import './WorkoutCardList.css'
import WorkoutCard from '../workoutCard/WorkoutCard'
import { updateWorkout } from '../../db/Indexed'

const WorkoutCardList = ({ containerRef, workout, exercises, setExercises, onDeleteExercise, showDeleteIconButton }) => {

  const [draggedItemIndex, setDraggedItemIndex] = useState(null);
  // The boolean value of showDeleteIconButton is the same to set the draggable property
  const isDraggable = showDeleteIconButton;

  const handleDragStart = (index) => {
    if (!isDraggable) return;
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e) => {
    if (!isDraggable) return;
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    if (!isDraggable) return;
    e.currentTarget.classList.remove("drag-over");
  };

  const handleOnDragEnter = (e) => {
    if (!isDraggable) return;
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    if (!isDraggable) return;
    e.currentTarget.classList.remove("drag-over");
    if (draggedItemIndex === null) return;

    const updatedExercises = [...exercises];
    const draggedItem = updatedExercises.splice(draggedItemIndex, 1)[0]; // remove dragging item
    updatedExercises.splice(index, 0, draggedItem); // insert dragging item into new position

    setExercises(updatedExercises); 
    const updaredIdList = updatedExercises.map(exercise => exercise.id);
    const updatedWorkout = { ...workout, exercises: updaredIdList };
    updateWorkout(updatedWorkout);
    setDraggedItemIndex(null);
  };

  return (
    <div ref={containerRef} className='workout-card-list-conteiner'>
      {exercises.length > 0 ? (
        exercises.map((exercise, index) => (
          <WorkoutCard
            key={exercise.id}
            exercise={exercise}
            onDelete={() => onDeleteExercise(exercise.id)}
            iconButton={showDeleteIconButton}
            /* Drag and Drop attributes */
            draggable={isDraggable}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDragEnter={handleOnDragEnter}
            onDrop={(e) => handleDrop(e, index)}
            onDragLeave={handleDragLeave}
          />
        ))
      ) : (
        <p className='no-exercises-for-workout-text'>No Exercises Here!</p>
      )}
    </div>
  )
}

export default WorkoutCardList