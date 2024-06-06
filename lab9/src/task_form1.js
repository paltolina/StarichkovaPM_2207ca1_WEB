import React, { useState } from 'react';

const CitySelector = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Выберите город</option>
        <option value="Рио-де-Жанейро">Рио-де-Жанейро</option>
        <option value="Москва">Москва</option>
        <option value="Нью-Йорк">Нью-Йорк</option>
        <option value="Лондон">Лондон</option>
      </select>
      {selectedCity && selectedCity !== "Рио-де-Жанейро" && (
        <p>Нет, это не Рио-де-Жанейро!</p>
      )}
    </div>
  );
};

export default CitySelector;
