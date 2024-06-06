import React, { useState } from 'react';

const BaseConverter = () => {
  const [input, setInput] = useState('');
  const [base, setBase] = useState(10);
  const [result, setResult] = useState('');

  const handleConvert = () => {
    const number = parseInt(input, base);
    setResult(number.toString());
  };

  return (
    <div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <select value={base} onChange={(e) => setBase(Number(e.target.value))}>
        <option value={2}>2</option>
        <option value={8}>8</option>
        <option value={10}>10</option>
        <option value={16}>16</option>
      </select>
      <button onClick={handleConvert}>Convert</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default BaseConverter;
