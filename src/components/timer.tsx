'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Timer: React.FC = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-gray-800 text-white rounded-lg my-2">
      <Clock />
      <span className="text-xl">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;
