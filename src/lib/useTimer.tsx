import React from "react";

function useTimer(tickrate = 1000) {
  const [timerStartTime, setTimerStartTime] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [timerId, setTimerId] = React.useState(0);

  const startTimer = () => {
    const now = Date.now();
    setTimer(now);
    setTimerStartTime(now);

    const timerFn = setInterval(() => setTimer(Date.now()), tickrate);
    setTimerId(timerFn);
  };

  const stopTimer = (t: number) => () => {
    clearInterval(t);
  };

  const currentTime = timer - timerStartTime;

  const timeInSeconds = Math.floor(currentTime / 1000);
  const seconds = timeInSeconds % 60;
  const minutes = Math.floor(timeInSeconds / 60);

  return {
    time: timeInSeconds,
    timeString: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    startTimer,
    stopTimer: stopTimer(timerId),
  };
}

export default useTimer;
