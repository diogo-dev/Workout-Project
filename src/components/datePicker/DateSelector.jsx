import React from 'react'
import './DateSelector.css'
import { format, parse } from 'date-fns'
import { useCalendar } from '../../hooks/useCalendar.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const DateSelector = () => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const handleDateChange = (newValue) => {
    const formattedNewDate = format(newValue, 'dd/MM/yyyy');
    if (newValue && formattedNewDate !== selectedDate) {
      setSelectedDate(formattedNewDate);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DatePicker
          label="Select a date"
          value={parse(selectedDate, 'dd/MM/yyyy', new Date())}
          onChange={handleDateChange}
          format='dd/MM/yyyy'
        />
      </div>
    </LocalizationProvider>
  )
}

export default DateSelector