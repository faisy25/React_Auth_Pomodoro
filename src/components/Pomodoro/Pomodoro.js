import { useState, useEffect, useRef } from "react";
import classes from "./Pomodoro.module.css";

const Pomodoro = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    let interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }

      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        } else {
          let minutes = displayMessage ? 24 : 4;
          let seconds = 59;

          setMinutes(minutes);
          setSeconds(seconds);
          setDisplayMessage(!displayMessage);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, displayMessage, minutes]);

  const stopHandler = () => {
    setIsPaused(true);
    isPausedRef.current = true;
  };

  const startHandler = () => {
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const resetHandler = () => {
    setMinutes(24);
    setSeconds(59);
    setIsPaused(false);
    isPausedRef.current = false;
  };

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <section>
      <h1 className={classes.pomodoro}>Pomodoro Timer</h1>
      <div>
        <div>{displayMessage && <div>Break time for 5 minutes</div>}</div>
        <div className={classes.timer}>
          {timerMinutes}:{timerSeconds}
        </div>
        <div className={classes.button}>
          <button onClick={startHandler}>Start</button>
          <button onClick={stopHandler}>Stop</button>
          <button onClick={resetHandler}>Reset</button>
        </div>
      </div>
    </section>
  );
};

export default Pomodoro;
