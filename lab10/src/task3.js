import React, { useState, useEffect } from 'react';

const PrimeNumbers = () => {
  const [primes, setPrimes] = useState([]);
  const [count, setCount] = useState(2);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (isPrime(count)) {
        setPrimes(prevPrimes => [...prevPrimes, count]);
      }
      setCount(prevCount => prevCount + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [count]);

  const isPrime = (num) => {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return num > 1;
  };

  return (
    <div>
      <h1>Простые числа: {primes.join(', ')}</h1>
    </div>
  );
};

export default PrimeNumbers;
