import moment from 'moment'
import React from 'react'

function Session(props) {
  const {
    sessionLength,
    decrementSessionLengthByOneMinute,
    incrementSessionLenghtbyOneMinute
  } = props

  const sessionLengthInMinutes = moment.duration(sessionLength, 's').minutes()

  return (
    <div className="session-wrapper">
      <p className="session-label">Session</p>
      <p id="session-length">{sessionLengthInMinutes}</p>
      <div className="plus-minus-buttons-session">
        <button
          id="session-increment"
          onClick={incrementSessionLenghtbyOneMinute}
        >
          +
        </button>
        <button
          id="session-decrement"
          onClick={decrementSessionLengthByOneMinute}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Session
