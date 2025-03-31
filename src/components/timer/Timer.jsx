// I used this broCode video as a reference: https://www.youtube.com/watch?v=jPo0mIcNZfM 
import React from 'react'
import './Timer.css'
import { useState, useEffect, useRef } from 'react'

const Timer = () => {

  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    }

  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {

    /* let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); */
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className='timer-stopwatch'>
      <div className="display-timer">{formatTime()}</div>
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={start} className='timer-start-button'>Start</button>
        ) : (
            <button onClick={stop} className='timer-stop-button'>Stop</button>
        )}
        <button onClick={reset} className='timer-reset-button'>Reset</button>
      </div>
    </div>
  )
}

export default Timer