import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
  const [count, setCount] = useState(10);

  useEffect(() => {
    if (count > 0) {
      const timerId = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      return () => clearInterval(timerId); // Очистка интервала при размонтировании компонента
    }
  }, [count]);

  return (
    <div>
      <h1>{count}</h1>
    </div>
  );
};

export default CountdownTimer;
