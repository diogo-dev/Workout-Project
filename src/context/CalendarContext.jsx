import { createContext, useState } from "react";
import { format } from 'date-fns';

export const CalendarContext = createContext();

export const CalendarContextProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'dd/MM/yyyy'));

  return (
    <CalendarContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </CalendarContext.Provider>
  );
}; 

