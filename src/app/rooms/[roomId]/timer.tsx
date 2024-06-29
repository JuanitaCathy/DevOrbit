"use client";

import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg my-2">
        <div className="text-xl">time elapsed:</div>
          <Clock />
          <span className="text-xl">{formatTime(time)}</span>
          
    </div>
  );
};

export default Timer;
