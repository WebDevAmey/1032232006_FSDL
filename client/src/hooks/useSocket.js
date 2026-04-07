import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let singleton = null;

export function useSocket() {
  const [socket, setSocket] = useState(singleton);

  useEffect(() => {
    if (!singleton) {
      singleton = io('http://127.0.0.1:5001', {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
      });
    }
    setSocket(singleton);
  }, []);

  return socket;
}

export default useSocket;
