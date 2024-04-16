import React, { useState } from "react";
import "./Stepper.css";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const goToStep = (step) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    goToStep(currentStep + 1);
  };

  const previousStep = () => {
    goToStep(currentStep - 1);
  };

  return (
    <div className="stepper">
      {/* Display the current step's content */}
      <div className="step-content">{steps[currentStep]}</div>

      {/* Navigation buttons */}
      <div className="step-navigation">
        {/* Show "Previous" button if not on the first step */}
        {currentStep > 0 && (
          <button className="button step-button" onClick={previousStep}>
            Previous
          </button>
        )}

        {/* Show "Next" button if not on the last step */}
        {currentStep < steps.length - 1 && (
          <button className="button step-button" onClick={nextStep}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Stepper;
