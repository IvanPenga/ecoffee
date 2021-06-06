import { useEffect, useState } from "react";

const useSocketUsers = (socket) => {

  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const enter = (user) => setUsers((prev) => [...prev, user])
    const left = (user) => setUsers((prev) => {
      const index = prev.findIndex(s => s.id === user.id);
      if (index > -1) { prev.splice(index, 1); }
      return [...prev];
    });
    const welcome = (users) => setUsers(users);

    socket?.on('user-enter', enter);
    socket?.on('user-left', left);  
    socket?.on('welcome', welcome);

    return () => {
      socket?.off('user-enter', enter);
      socket?.off('user-left', left);
      socket?.off('welcome', welcome);
    }
  }, [socket]);

  return users;
}

export default useSocketUsers;