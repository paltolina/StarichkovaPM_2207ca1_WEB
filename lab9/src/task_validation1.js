import React, { useState } from 'react';

const RegistrationForm = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!login) {
      newErrors.login = 'Логин обязателен.';
    } else if (login.length < 6 || login.length > 20) {
      newErrors.login = 'Логин должен содержать от 6 до 20 символов.';
    } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
      newErrors.login = 'Логин может содержать только латинские буквы и цифры.';
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Повтор пароля обязателен.';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Пароли не совпадают.';
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
        <label>Логин:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        {errors.login && <p>{errors.login}</p>}
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label>Повтор пароля:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegistrationForm;
