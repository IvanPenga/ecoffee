import { useEffect, useState } from "react";
import Login from "./Login";
import Home from './Home';
import socketIOClient from 'socket.io-client';
import styles from './index.module.scss';

const host = process.env.REACT_APP_SIGNALING_SERVER;

const App = () => {

  const [socket, setSocket] = useState();
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname'));
  const [avatarHash, setAvatarHash] = useState(() => localStorage.getItem('avatar'));

  const handleOnLogin = (nickname, selectedHash) => {
    if (nickname) {
      localStorage.setItem('nickname', nickname);
      setNickname(nickname);
    }
    console.log('LOGIN', nickname, selectedHash);
    if (selectedHash) {
      localStorage.setItem('avatar', selectedHash);
      setAvatarHash(selectedHash);
    }
  };

  useEffect(() => {
    if (nickname && avatarHash) {
      setSocket(socketIOClient(host, {
        withCredentials: true,
        extraHeaders: { 
          'ecoffee-nickname': nickname,
          'ecoffee-avatar': avatarHash
        }
      }));
    }
  }, [nickname, avatarHash]);

  return (
    <div className={styles.app}>
      { nickname ? <Home avatar={avatarHash} nickname={nickname} socket={socket}  /> : <Login onLogin={handleOnLogin} /> }
    </div>
  );
}

export default App;
