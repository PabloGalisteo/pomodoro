import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({
  handleStart,
  timeLeft,
  timerLabel,
  startStopButtonLabel
}) => {
  const formattedTimeLeft = moment
    .duration(timeLeft, 's')
    .format('mm:ss', { trim: false })
  return (
    <div className="time-wrapper">
      <p id="timer-label">{timerLabel}</p>
      <p id="time-left">{formattedTimeLeft}</p>
      <button className="start-button" onClick={handleStart}>
        {startStopButtonLabel}
      </button>
    </div>
  )
}

export default TimeLeft
