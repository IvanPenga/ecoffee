import styles from './index.module.scss';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Message from './Message';

const Chat = ({ socket }) => {

  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  const inputRef = useRef();
  const messagesRef = useRef();

  const sendMessage = useCallback(() => {
    if (message) {
      socket?.emit('message', message);
      setMessages((prev) => [...prev, { message, nickname: 'You', sender: true }]);
      inputRef.current.value = '';
      setMessage('');
      inputRef.current?.focus();
    }
  }, [message]);

  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages]);

  const handleOnKeyDown = useCallback(({ key }) => {
    if (key === 'Enter') { sendMessage(); };
  }, [sendMessage]);

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
        <div ref={messagesRef} />
      </div>
      <div className={styles.messageInput}>
        <input ref={inputRef} onChange={handleOnChange} onKeyDown={handleOnKeyDown} />
        <button onClick={sendMessage}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
        </button>
      </div>
    </div>
  );
}

export default Chat;