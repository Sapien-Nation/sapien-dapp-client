import { createContext, useEffect, useState } from 'react';

// helpers
import { initSocket } from 'utils/socket';

interface Context {
  socket: any;
}

export const SocketContext = createContext<Context | null>(null);

interface Props {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(initSocket());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'ping', data: {} }));
      };

      socket.onclose = () => {};
      socket.onerror = () => {};

      return () => socket.close();
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
