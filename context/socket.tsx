import { createContext, useEffect, useState } from 'react';

// helpers
import { initSocket } from 'utils/socket';

// context
import { useAuth } from 'context/user';

interface Context {
  socket: any;
}

export const SocketContext = createContext<Context | null>(null);

interface Props {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(null);
  const { me } = useAuth();

  useEffect(() => {
    if (me) {
      setSocket(initSocket());
    }
  }, [me]);

  useEffect(() => {
    if (socket && me) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'ping', data: {} }));
      };

      socket.onclose = () => {};
      socket.onerror = () => {};

      return () => socket.close();
    }
  }, [socket, me]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
