import React from 'react'
import './PopUpTwo.css'
import { MdOutlineCancel } from "react-icons/md"
import { useNinjaAPI } from '../../hooks/useNinjaAPI.jsx'
import { usePopUp } from '../../hooks/usePopUp.jsx'

const PopUpTwo = ({ prevStep, closePopUp, exercise, setExercise }) => {

  const { muscle, difficulty } = usePopUp();
  const baseUrl = 'https://api.api-ninjas.com/v1/exercises';
  const { data: wsObject, loading, error, getAPIResponse: getWorkoutSuggestion } = useNinjaAPI(`${baseUrl}?muscle=${muscle}&difficulty=${difficulty}`);

  const capitalizeFirstLetter = (str) => {
    return str?.charAt(0).toUpperCase() + str?.slice(1) || "";
  };

  // remember to create an adapter design pattern to improve this piece of code
  const getCategory = (muscle) => {
    if (["lats", "lower_back", "middle_back", "neck", "traps"].includes(muscle)) return "Back";
    if (["biceps", "triceps", "forearms"].includes(muscle)) return "Arms";
    if (muscle === "chest") return "Chest";
    if (muscle === "abdominals") return "Full Body";
    return "Legs";
  };

  const getDifficulty = (difficulty) => {
    return difficulty === "beginner" ? "Easy" : difficulty === "intermidiate" ? "Medium" : "Hard";
  };

  const handleApply = () => {
    setExercise((prevExercise) => ({
      ...prevExercise,
      name: wsObject.name,
      category: getCategory(wsObject.muscle),
      sets: 4,
      reps: 10,
      duration: 10,
      restTime: 1,
      difficulty: getDifficulty(wsObject.difficulty),
      notes: wsObject.instructions
    }));

    closePopUp();
  };
  
  return (
    <div className="popup-two-suggestion-outer-conteiner">
      {loading && <p>Loading...</p>}
      {!loading && wsObject && (
        <div className="popup-two-suggestion-inner-conteiner">
          <p className='popup-two-name'>{wsObject.name}</p>
          <button className='popup-two-cancel-button' onClick={closePopUp}><MdOutlineCancel /></button>
          <div className='popup-two-line'>
            <p><span>Type: </span>{capitalizeFirstLetter(wsObject.type)}</p>
            <p><span>Muscle: </span>{capitalizeFirstLetter(wsObject.muscle)}</p>
          </div>
          <div className='popup-two-line'>
            <p><span>Equipment: </span>{capitalizeFirstLetter(wsObject.equipment)}</p>
            <p><span>Difficulty: </span>{capitalizeFirstLetter(wsObject.difficulty)}</p>
          </div>
          <div className="popup-two-line">
            <p className='popup-two-instruction'><span>Instructions: </span>{wsObject.instructions}</p>
          </div>
          <div className='popup-two-bottom-buttons'>
            <button onClick={prevStep}>Back</button>
            <div>
              <button onClick={handleApply}>Apply</button>
              <button onClick={getWorkoutSuggestion}>Change</button>
            </div>
          </div>
        </div>
      )}
      {!loading && !wsObject && (
        <div className="popup-two-suggestion-inner-conteiner">
          <p className='popup-two-suggestion-not-found'>No exercises found!</p>
          <button className='popup-two-cancel-button' onClick={closePopUp}><MdOutlineCancel /></button>
          <div className='popup-two-bottom-buttons'>
            <button onClick={prevStep}>Back</button>
          </div>
        </div>
      )}
      {error && (
        <div className="popup-two-suggestion-inner-conteiner">
          {console.log("Error message: ", error)}
          <p className='popup-two-suggestion-not-found'>An Error has occured!</p>
          <button className='popup-two-cancel-button' onClick={closePopUp}><MdOutlineCancel /></button>
          <div className='popup-two-bottom-buttons'>
            <button onClick={prevStep}>Back</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopUpTwo