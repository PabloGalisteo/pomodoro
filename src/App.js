import './App.css'
import { useState, useEffect, useRef } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import TimeLeft from './components/TimeLeft'

function App() {
  const audioElement = useRef(null)
  const [currentSessionType, setCurrentSessionType] = useState('Session') // 'Session' or 'Break'
  const [intervalId, setIntervalId] = useState(null)
  const [sessionLength, setSessionLength] = useState(1500)
  //Break component lifting up
  const [breakLength, setBreakLength] = useState(300)
  const [timeLeft, setTimeLeft] = useState(sessionLength)

  // change timeleft whenever sessionLength changes
  useEffect(() => {
    setTimeLeft(sessionLength)
  }, [sessionLength])

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength)
    }
  }

  const incrementBreakLenghtbyOneMinute = () => {
    const newBreakLength = breakLength + 60
    if (newBreakLength <= 60 * 60) setBreakLength(newBreakLength)
  }

  //Session component lifting up

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60
    if (newSessionLength > 0) {
      setSessionLength(newSessionLength)
    }
  }

  const incrementSessionLenghtbyOneMinute = () => {
    const newSessionLength = sessionLength + 60
    if (newSessionLength <= 60 * 60) {
      setSessionLength(sessionLength + 60)
    }
  }

  const isStarted = intervalId !== null
  const handleStart = () => {
    if (isStarted) {
      // if we are in started mode:
      // we want to stop the timer
      // clearInterval
      clearInterval(intervalId)
      setIntervalId(null)
    } else {
      // if we are in stopped mode:
      // decrement timeLeft by one every second (1000 ms)
      // to do this we'll use setInterval
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => {
          const newTimeLeft = prevTimeLeft - 1
          if (newTimeLeft >= 0) {
            return newTimeLeft
          }
          // time left is less than zero
          audioElement.current.play()
          // if session:
          if (currentSessionType === 'Session') {
            // switch to break
            setCurrentSessionType('Break')
            // setTimeLeft to breakLength
            return breakLength
          }
          // if break:
          else if (currentSessionType === 'Break') {
            // switch to session
            setCurrentSessionType('Session')
            // setTimeLeft to sessionLength
            return sessionLength
          }
        })
      }, 100) // TODO: turn back into 1000
      setIntervalId(newIntervalId)
    }
  }

  const handleResetButtonClick = () => {
    // reset audio
    audioElement.current.load()
    // clear the timeout interval
    clearInterval(intervalId)
    // set the intervalId null
    setIntervalId(null)
    // reset the session length to 25 minutes
    setCurrentSessionType('Session')
    // reset the session lenth to 25 minutes
    setSessionLength(1500)
    // reset the break length to 5 minutes
    setBreakLength(300)
    // reset the timer to 25 minutes (initial sesion length)
    setTimeLeft(1500)
  }

  return (
    <div className="App">
      <Break
        breakLength={breakLength}
        decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
        incrementBreakLenghtbyOneMinute={incrementBreakLenghtbyOneMinute}
      />
      <TimeLeft
        timerLabel={currentSessionType}
        handleStart={handleStart}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
      />
      <Session
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
        incrementSessionLenghtbyOneMinute={incrementSessionLenghtbyOneMinute}
      />
      <button id="reset" onClick={handleResetButtonClick}>
        Reset
      </button>
      <audio id="beep" ref={audioElement}></audio>
    </div>
  )
}

export default App
