import React, { useState, useEffect } from 'react';

const Revert = ({ s="привет!" }) => {
  const [str, setStr] = useState(s || '');

  useEffect(() => {
    const timerId = setInterval(() => {
      setStr(prevStr => {
        if (prevStr.length > 1) {
          return prevStr[prevStr.length - 1] + prevStr.slice(0, -1);
        }
        return prevStr;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>{str}</h1>
    </div>
  );
};

export default Revert;
