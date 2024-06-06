import React, { useState, useEffect } from 'react';

const BirthdayTimer = () => {
  const [birthDate, setBirthDate] = useState('');
  const [secondsLived, setSecondsLived] = useState(0);

  useEffect(() => {
    if (birthDate) {
      const intervalId = setInterval(() => {
        const birthTime = new Date(birthDate).getTime();
        const currentTime = new Date().getTime();
        setSecondsLived(Math.floor((currentTime - birthTime) / 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [birthDate]);

  return (
    <div>
      <input 
        type="date" 
        value={birthDate} 
        onChange={(e) => setBirthDate(e.target.value)} 
      />
      {birthDate && (
        <p>Вы прожили: {secondsLived.toLocaleString()} секунд.</p>
      )}
    </div>
  );
};

export default BirthdayTimer;
