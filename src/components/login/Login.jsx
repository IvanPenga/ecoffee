import styles from './index.module.scss';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const Login = ({ onLogin }) => {

  const [nickname, setNickname] = useState();
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
      <TextField 
        onKeyDown={handleKeyDown}
        onChange={handleOnChange} 
        variant="outlined" 
        size="small" 
        label="Nickname" 
      />
      <Button disabled={disabled} onClick={handleOnLogin} variant="contained" color="primary">Enter</Button>
    </div>
  );
}

export default Login;