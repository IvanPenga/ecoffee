import { useEffect, useState } from "react";
import Login from "../components/login/Login";
import Home from './Home';
import socketIOClient from 'socket.io-client';

const host = process.env.REACT_APP_SIGNALING_SERVER;

const App = () => {

  const [socket, setSocket] = useState();
  const [nickname, setNickname] = useState(() => localStorage.getItem('nickname'));

  const handleOnLogin = (nickname) => {
    localStorage.setItem('nickname', nickname);
    setNickname(nickname);
  };

  console.log(process.env);

  useEffect(() => {
    setSocket(socketIOClient(host, {
      withCredentials: true,
      extraHeaders: { 'ecoffee-nickname': nickname }
    }));
  }, [nickname]);

  return (
    <div className="App">
      { process.env.REACT_APP_SIGNALING_SERVER }
      { nickname ? <Home nickname={nickname} socket={socket} /> : <Login onLogin={handleOnLogin} /> }
    </div>
  );
}

export default App;
