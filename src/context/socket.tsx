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
        console.log('Socket connection established!');
        socket.send(JSON.stringify({ type: 'ping', data: {} }));
      };

      // TODO Sentry ERROR
      socket.onclose = () => {
        console.log('Socket connection closed!');
      };

      socket.onerror = (event) => {
        console.error('WebSocket error observed:', event);
      };

      return () => {
        socket.close();
      };
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
