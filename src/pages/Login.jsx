import styles from './index.module.scss';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import image from '../images/coffee-main.jpeg';

const Login = ({ onLogin }) => {

  const [nickname, setNickname] = useState('');
  const [disabled, setDisabled] = useState(true);

  const isValidName = (name) => {
    return name && name.length >= 1;
  }

  const handleOnChange = (e) => {
    const name = e.target.value;
    setDisabled(!isValidName(name));
    setNickname(name);
  };

  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') handleOnLogin();
  }

  const handleOnLogin = () => {
    if (isValidName(nickname) && onLogin) {
      onLogin(nickname);
    }
  };

  return (
    <div className={styles.login}>
      <img src={image} />
      <div className={styles.login__overlay} />
      <div className={styles.login__wrapper}>
        <div className={styles.login__title}>
          <h1>Hello</h1>
          <p>{nickname && `${nickname}, `}ready for some coffee?</p>
        </div>
        <div className={styles.login__login}>
          <input placeholder="Nickname" onChange={handleOnChange} type="text" maxLength={16} />
          <button onClick={handleOnLogin}>Ready</button>
        </div>
      </div>
    </div>
  );
}

export default Login;