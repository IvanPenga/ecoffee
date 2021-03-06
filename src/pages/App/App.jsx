import { useEffect, useState } from "react";
import Login from '../Login/Login';
import Home from '../Home';
import socketIOClient from 'socket.io-client';
import styles from './index.module.scss';

const host = process.env.REACT_APP_SIGNALING_SERVER;

const App = () => {

  const [socket, setSocket] = useState();
  const [nickname, setNickname] = useState(() => sessionStorage.getItem('nickname'));
  const [avatarHash, setAvatarHash] = useState(() => sessionStorage.getItem('avatar'));

  const handleOnLogin = (nickname, selectedHash) => {
    if (nickname) {
      sessionStorage.setItem('nickname', nickname);
      setNickname(nickname);
    }
    console.log('LOGIN', nickname, selectedHash);
    if (selectedHash) {
      sessionStorage.setItem('avatar', selectedHash);
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
