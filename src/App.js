import React, { useEffect, useState } from "react";
import "./App.css";
import CountDownTimer from "./components/CountDownTimer";
import BirthdayWish from "./components/BirthdayWish";
import userData from "./customize.json";

function App() {
  const birthday = userData.birthday;
  const [isTimeUp, setIsTimeUp] = useState(false);

  const handleTimeUp = () => {
    setIsTimeUp(true);
  };

  useEffect(() =>{
    const now = new Date();
    const targetDate = new Date(birthday);
    const timeDiff = targetDate - now;
    const seconds = Math.floor(timeDiff / 1000);
    if(seconds <= 0){
      handleTimeUp();
    }
  },[])

  return (
    <div className="gradient-background">
      {isTimeUp ? (
        <BirthdayWish/>
      ) : (
        <CountDownTimer birthday={birthday} onTimeUp={handleTimeUp} />
      )}
    </div>
  );
}

export default App;
