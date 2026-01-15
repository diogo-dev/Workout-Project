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
          slotProps={{
            actionBar: {
              actions: []
            },
            toolbar: {
              hidden: true
            }
          }}
          sx={{
            border: '8px solid var(--primary-color)',
            borderRadius: '15px',
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
            padding: '0px 30px',
            '& .MuiPickersLayout-toolbar': {
              borderBottom: '8px solid var(--primary-color)',
            },
            '& .MuiTypography-root, & .MuiPickersCalendarHeader-label, & .MuiPickersYear-yearButton, & .MuiDayCalendar-weekDayLabel, & .MuiPickersDay-root': {
              fontFamily: 'Exo 2 !important',
            },
            '& .MuiPickersDay-root.Mui-selected': {
              backgroundColor: '#f4bf43 !important',
            },
            '& .MuiPickersToolbar-content': {
              justifyContent: 'center !important',
            }
          }}
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