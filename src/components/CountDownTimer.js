import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import "./CountdownTimer.css";

function CountDownTimer({ birthday, onTimeUp }) {
  const calculateTimeRemaining = (birthday) => {
    const now = new Date();
    const targetDate = new Date(birthday);
    const timeDiff = targetDate - now;
    const seconds = Math.floor(timeDiff / 1000);

    return seconds;
  };
  const [time, setTime] = useState(calculateTimeRemaining(birthday));

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = calculateTimeRemaining(birthday);
      setTime(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(timer);
        onTimeUp(); // Call the callback function when time reaches 0
      }
    }, 1000);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birthday, onTimeUp]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="countdown-container">
      <Box className="centered-content">
        <Typography variant="h1" component="p" fontWeight={'500'} fontFamily={'sans-serif'} className="contdown-text">
          Countdown
        </Typography>
        <Typography variant="h1" component="p" className="timer-text">
          {formatTime(time)}
        </Typography>
      </Box>
    </div>
  );
}

export default CountDownTimer;
