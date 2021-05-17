import styles from './index.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import Message from './Message';

const Chat = ({ socket }) => {

  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();

  const handleOnKeyDown = useCallback(({ key }) => {
    if (key === 'Enter') { 
      socket?.emit('message', message);
      setMessages((prev) => [...prev, { message, nickname: 'You', sender: true }]);
      inputRef.current.value = '';
    };
  }, [message, socket]);

  const handleOnChange = useCallback(({ target }) => {
    setMessage(target.value);
  }, []);

  useEffect(() => {
    const onMessage = (message) => setMessages((prev) => [...prev, message]); 
    socket?.on('message', onMessage);

    return () => {
      socket?.off('message', onMessage);
    }
  }, [socket]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        { messages.map((message) => <Message {...message} />) }
      </div>
      <div className={styles.messageInput}>
        <TextField inputRef={inputRef} onChange={handleOnChange} onKeyDown={handleOnKeyDown} variant="outlined" size="small" />
      </div>
    </div>
  );
}

export default Chat;