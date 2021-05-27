import { useEffect, useState } from "react";
import Login from "./Login";
import Home from './Home';
import socketIOClient from 'socket.io-client';
import styles from './index.module.scss';

const host = process.env.REACT_APP_SIGNALING_SERVER;

const App = () => {

  const [socket, setSocket] = useState();
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname'));

  const handleOnLogin = (nickname) => {
    if (nickname) {
      localStorage.setItem('nickname', nickname);
      setNickname(nickname);
    }
  };

  useEffect(() => {
    setSocket(socketIOClient(host, {
      withCredentials: true,
      extraHeaders: { 'ecoffee-nickname': nickname }
    }));
  }, [nickname]);

  return (
    <div className={styles.app}>
      { nickname ? <Home nickname={nickname} socket={socket} /> : <Login onLogin={handleOnLogin} /> }
    </div>
  );
}

export default App;
