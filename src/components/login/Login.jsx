import styles from './index.module.scss';
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

const Login = ({ onLogin }) => {

  const [nickname, setNickname] = useState();

  const handleOnChange = (e) => {
    setNickname(e.target.value);
  };

  const handleOnLogin = () => {
    onLogin && onLogin(nickname);
  };

  return (
    <div className={styles.login}>
      <TextField onChange={handleOnChange} variant="standard" label="Enter your nickname" />
      <Button onClick={handleOnLogin} variant="contained" color="primary">Enter</Button>
    </div>
  );
}

export default Login;