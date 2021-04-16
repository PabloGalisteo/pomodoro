import moment from 'moment'
import React from 'react'

function Break(props) {
  const {
    breakLength,
    decrementBreakLengthByOneMinute,
    incrementBreakLenghtbyOneMinute
  } = props
  const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()

  return (
    <div className="break-wrapper">
      <p className="break-label">Break</p>
      <p id="break-length">{breakLengthInMinutes}</p>
      <button id="break-increment" onClick={incrementBreakLenghtbyOneMinute}>
        +
      </button>
      <button id="break-decrement" onClick={decrementBreakLengthByOneMinute}>
        -
      </button>
    </div>
  )
}

export default Break
