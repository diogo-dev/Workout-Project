import { useState } from "react"
import './TwoStepForm.css'
import PopUpOne from '../../components/PopUpOne/PopUpOne'
import PopUpTwo from '../../components/popUpTwo/PopUpTwo'

const TwoStepForm = ({ onClose, exercise, setExercise }) => {
  const [step, setStep] = useState(1); // Track the current step

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="two-step-form-container">
      {/* Progress Bar */}
      <progress
        value={step}
        max="2"
        className="two-step-form-progress-bar"
      ></progress>

      {/* Step 1 */}
      {step === 1 && (
        <PopUpOne nextStep={nextStep} closePopUp={onClose} />
      )}

      {/* Step 2 */}
      {step === 2 && (
        <PopUpTwo prevStep={prevStep} closePopUp={onClose} exercise={exercise} setExercise={setExercise} />
      )}
    </div>
  );
};

export default TwoStepForm;