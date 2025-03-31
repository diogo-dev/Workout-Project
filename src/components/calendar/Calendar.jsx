import React from 'react'
import './Calendar.css'
import { format, parse } from 'date-fns';
/* Importing the calendar from the mui-x dependency */
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

/* importing my own hook made for the calendar context */
import { useCalendar } from '../../hooks/useCalendar.jsx';

const Calendar = ({ onCreateWorkout, loadingWorkout }) => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const handleDateChange = (newValue) => {
    const formattedNewDate = format(newValue, 'dd/MM/yyyy');
    if (newValue && formattedNewDate !== selectedDate) {
      setSelectedDate(formattedNewDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className='calendar-outer-conteiner'>
        <StaticDatePicker
          orientation="portrait"
          openTo='day'
          value={parse(selectedDate, 'dd/MM/yyyy', new Date())}
          onChange={handleDateChange}
        />
        <button
          className='create-a-workout-button'
          onClick={onCreateWorkout}
          disabled={loadingWorkout}
        >
          {loadingWorkout ? "Loading..." : "Create Workout"}
        </button>
      </div>
    </LocalizationProvider>
  )
}

export default Calendar