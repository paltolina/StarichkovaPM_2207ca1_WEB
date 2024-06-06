import React, { useState } from 'react';

const ProfileEditForm = () => {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName) {
      newErrors.firstName = 'Имя обязательно.';
    }
    if (!middleName) {
      newErrors.middleName = 'Отчество обязательно.';
    }
    if (!lastName) {
      newErrors.lastName = 'Фамилия обязательна.';
    }
    if (birthDate && !/^\d{2}\.\d{2}\.\d{4}$/.test(birthDate)) {
      newErrors.birthDate = 'Дата рождения должна быть в формате ДД.ММ.ГГГГ.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Отправка формы
      console.log('Форма отправлена');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <label>Отчество:</label>
        <input
          type="text"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        {errors.middleName && <p>{errors.middleName}</p>}
      </div>
      <div>
        <label>Фамилия:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <label>Дата рождения (опционально):</label>
        <input
          type="text"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {errors.birthDate && <p>{errors.birthDate}</p>}
      </div>
      <div>
        <label>Адрес (опционально):</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default ProfileEditForm;
