import React, {useState} from 'react'
import './PopUpOne.css'
import { MdOutlineCancel } from "react-icons/md"
import { usePopUp } from '../../hooks/usePopUp'

const PopUpOne = ({ nextStep, closePopUp }) => {
  const { muscle, setMuscle, difficulty, setDifficulty } = usePopUp();

  return (
    <div className='popup-one-outer-conteiner'>
      <p className='popup-one-title'>Select the parameters:</p>
      <button className='popup-two-cancel-button' onClick={closePopUp}><MdOutlineCancel /></button>
      <div className='popup-one-inner-conteiner'>
        <div className='popup-one-line'>
          <p>Muscle to exercise:</p>
          <select
            name="muscle"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          >
            <option value="abdominals">Abdominals</option>
            <option value="abductors">Abductors</option>
            <option value="adductors">Adductors</option>
            <option value="biceps">Biceps</option>
            <option value="calves">Calves</option>
            <option value="chest">Chest</option>
            <option value="forearms">Forearms</option>
            <option value="glutes">Glutes</option>
            <option value="hamstrings">Hamstrings</option>
            <option value="lats">Lats</option>
            <option value="lower_back">Lower Back</option>
            <option value="middle_back">Middle Back</option>
            <option value="neck">Neck</option>
            <option value="quadriceps">Quadriceps</option>
            <option value="traps">Traps</option>
            <option value="triceps">Triceps</option>
          </select>
        </div>
        <div className='popup-one-line'>
          <p>Difficulty:</p>
          <select
            name="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="beginner">Easy</option>
            <option value="intermediate">Medium</option>
            <option value="expert">Hard</option>
          </select>
        </div>
      </div>
      <button className='popup-one-next-button' onClick={nextStep}>Next</button>
    </div>
  )
}

export default PopUpOne