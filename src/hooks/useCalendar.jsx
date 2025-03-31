import { CalendarContext } from "../context/CalendarContext";
import { useContext } from "react";

export const useCalendar = () => {
  return useContext(CalendarContext);
};