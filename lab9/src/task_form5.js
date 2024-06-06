import React, { useState } from 'react';

const NumberList = () => {
  const [number, setNumber] = useState('');
  const [numbers, setNumbers] = useState([1, 13, 6, 52, 4, 14]);
  const [filter, setFilter] = useState('Все');

  const addNumber = () => {
    if (!isNaN(number) && number.trim() !== '') {
      setNumbers([...numbers, parseInt(number)]);
      setNumber('');
    }
  };

  const filteredNumbers = numbers.filter((num) => {
    if (filter === 'Все') return true;
    if (filter === 'Четные') return num % 2 === 0;
    if (filter === 'Нечетные') return num % 2 !== 0;
    return true;
  });

  return (
    <div>
      <input 
        type="text" 
        value={number} 
        onChange={(e) => setNumber(e.target.value)} 
      />
      <button onClick={addNumber}>+</button>
      <div>
        <button onClick={() => setFilter('Все')}>Все</button>
        <button onClick={() => setFilter('Четные')}>Четные</button>
        <button onClick={() => setFilter('Нечетные')}>Нечетные</button>
      </div>
      <div>
        {filteredNumbers.join(', ')}
      </div>
    </div>
  );
};

export default NumberList;
