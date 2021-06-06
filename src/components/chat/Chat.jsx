import styles from './index.module.scss';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Message from './Message';
import useSocketMessages from '../../hooks/useSocketMessages';

const Chat = ({ socket }) => {

  const [message, setMessage] = useState();
  const { messages, sendMessage } = useSocketMessages(socket);

  const inputRef = useRef();
  const messagesRef = useRef();

  const send = useCallback(() => {
    if (message) {
      sendMessage(message);
      inputRef.current.value = '';
      setMessage('');
      inputRef.current?.focus();
    }
  }, [message, sendMessage]);

  useEffect(() => {
    messagesRef.current?.scrollIntoView();
  }, [messages]);

  const handleOnKeyDown = useCallback(({ key }) => {
    if (key === 'Enter') { send(); };
  }, [send]);

  const handleOnChange = useCallback(({ target }) => {
    setMessage(target.value);
  }, []);

  const chatMessages = useMemo(() => 
    messages.map((message) => 
      <Message key={`${message.message}${message.nickname}${message.timestamp}`} {...message} />)
  , [messages]);

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        { chatMessages }
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