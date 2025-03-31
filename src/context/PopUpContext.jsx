import { createContext, useState } from "react";

export const PopUpContext = createContext();

export const PopUpProvider = ({ children }) => {
  const [muscle, setMuscle] = useState("biceps");
  const [difficulty, setDifficulty] = useState("beginner");

  return (
    <PopUpContext.Provider value={{muscle, setMuscle, difficulty, setDifficulty}}>
      {children}
    </PopUpContext.Provider>
  );
}