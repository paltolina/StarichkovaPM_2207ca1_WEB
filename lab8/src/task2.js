import React, { useState, useEffect } from 'react';

const InfiniteTimer = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleStart}>▶</button>
    </div>
  );
};

export default InfiniteTimer;
