import styles from './index.module.scss';
import React, { useState } from 'react';
import image from '../../images/coffee-main.jpeg';
import AvatarModal from '../../components/login/AvatarModal';
import {hashes} from '../../avatars';
import Robohash from '../../components/robohash/Robohash';

const Login = ({ onLogin }) => {

  const [nickname, setNickname] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHash, setSelectedHash] = useState(() => sessionStorage.getItem('avatar') || hashes[0]);

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
      onLogin(nickname, selectedHash);
    }
  };

  const handleOnAvatarClick = () => {
    setModalOpen(true);
  }

  const handleOnAvatarClose = (hash) => {
    setModalOpen(false);
    setSelectedHash(hash);
  }

  return (
    <div className={styles.login}>
      <AvatarModal visible={modalOpen} onClose={handleOnAvatarClose} selectedHash={selectedHash} />
      <img src={image} />
      <div className={styles.login__overlay} />
      <div className={styles.login__wrapper}>
        <div className={styles.login__title}>
          <div>
            <h1>Hello</h1>
            <p>{nickname && `${nickname}, `}ready for some coffee?</p>
          </div>
          <button onClick={handleOnAvatarClick} className={styles.login__login__avatar}>
            <Robohash hash={selectedHash} />
          </button>
        </div>
        <div className={styles.login__login}>
          <div>
            <input 
              spellCheck={false} 
              onKeyDown={handleKeyDown} 
              placeholder="Nickname" 
              onChange={handleOnChange} 
              type="text" maxLength={14} 
            />
          </div>
          <button type="submit" disabled={disabled} onClick={handleOnLogin}>Ready</button>
        </div>
      </div>
    </div>
  );
}

export default Login;