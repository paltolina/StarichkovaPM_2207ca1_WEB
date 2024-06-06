import React, { useState } from 'react';

const Calculator = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    let res;
    switch (operation) {
      case '+':
        res = Number(num1) + Number(num2);
        break;
      case '-':
        res = Number(num1) - Number(num2);
        break;
      case '*':
        res = Number(num1) * Number(num2);
        break;
      case '/':
        res = Number(num1) / Number(num2);
        break;
      default:
        res = 0;
    }
    setResult(res);
  };

  return (
    <div>
      <input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} />
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && (
        <p>{num1} {operation} {num2} = {result}</p>
      )}
    </div>
  );
};

export default Calculator;
