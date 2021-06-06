import { useCallback, useEffect, useState } from "react";

const useSocketMessages = (socket) => {

  const [messages, setMessages] = useState([]);
  
  const sendMessage = useCallback((message) => {
    if (message) {
      socket?.emit('message', message);
      setMessages((prev) => [...prev, { 
        message, 
        nickname: 'You', 
        sender: true,
        timestamp: Date.now()
      }]);
    }
  }, [socket]);

  useEffect(() => {
    const onMessage = (message) => setMessages((prev) => [...prev, message]); ;
    socket?.on('message', onMessage);

    return () => {
      socket?.off('message', onMessage);
    }
  }, [socket]);

  return { messages, sendMessage };
}

export default useSocketMessages;