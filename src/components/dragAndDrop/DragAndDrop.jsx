import React, {useState} from 'react'
import './DragAndDrop.css'
import WorkoutCard from '../../components/workoutCard/WorkoutCard.jsx'
import { updateExercise, updateWorkout } from '../../db/Indexed.jsx'

const DragAndDrop = ({ workout, exercises, setExercises, text, column }) => {

  const handleDragStart = (e, card, index) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("prevColumn", card.column);
    e.dataTransfer.setData("draggedItemIndex", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("drag-over");
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove("drag-over");
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");

    const cardId = e.dataTransfer.getData("cardId");
    const prevColumn = e.dataTransfer.getData("prevColumn");

    if (!cardId || prevColumn === column) return;

    const updatedExercises = exercises.map((exercise) => 
      exercise.id === cardId ? { ...exercise, status: column } : exercise
    );

    setExercises(updatedExercises);
    await updateExercise(cardId, column);
  };

  const handleDropColumn = (e, index) => {
    e.preventDefault();
    e.currentTarget.classList.remove("drag-over");

    const draggedItemIndex = e.dataTransfer.getData("draggedItemIndex");
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const filteredExercises = exercises.filter((ex) => ex.status === column);

    const draggedItem = filteredExercises.splice(draggedItemIndex, 1)[0];

    filteredExercises.splice(index, 0, draggedItem);

    // filteredExercises.shift() removes the first item of the list and assigns it to the new updatedExercises list
    const updatedExercises = exercises.map((ex) =>
      ex.status === column ? filteredExercises.shift() : ex
    );

    setExercises(updatedExercises);
    const updaredIdList = updatedExercises.map(exercise => exercise.id);
    const updatedWorkout = { ...workout, exercises: updaredIdList };
    updateWorkout(updatedWorkout);
  };

  return (
    
    <div
      className='drag-and-drop-outer-conteiner'
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    >
      {exercises.length > 0 ? (
        exercises
        .filter((exercise) => exercise.status === column)
        .map((exercise, index) => (
          <WorkoutCard
            key={exercise.id}
            exercise={exercise}
            iconButton={false}
            /* Drag and Drop properties */
            draggable
            onDragStart={(e) => handleDragStart(e, { id: exercise.id, column }, index)}
            onDrop={(e) => handleDropColumn(e, index)}
          />
        ))
      ) : (
        <p className='drag-and-drop-workout-text'>{text}</p>
      )}
    </div>
    
  )
}

export default DragAndDrop