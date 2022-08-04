import { createContext, useContext, useEffect, useState } from 'react';

// helpers
import { initSocket } from 'utils/socket';

// context
import { useAuth } from 'context/user';
import { nanoid } from 'nanoid';

interface Context {
  socket: any;
  socketMessages: Array<any>;
  handleReadMessage: (id: string) => void;
}

export const SocketContext = createContext<Context | null>({
  socket: null,
  socketMessages: [],
  handleReadMessage: () => {},
});

interface Props {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState(null);
  const [socketMessages, setSocketMessages] = useState([]);

  const { me } = useAuth();

  useEffect(() => {
    if (me) {
      setSocket(initSocket());
    }
  }, [me]);

  const handleReadMessage = (id) => {
    setSocketMessages(socketMessages.filter((noti) => noti.id !== id));
  };

  useEffect(() => {
    if (socket && me) {
      socket.onopen = () => {
        socket.send(JSON.stringify({ type: 'ping', data: {} }));
      };

      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);

        // TODO reading from socketMessages state is to much, instead this should "emit" and childrens can just listen to them
        // time? we have 30mins to fix this, so this hacky solution works
        setSocketMessages((stateSocketMessages) => [
          ...stateSocketMessages,
          {
            id: nanoid(),
            type: eventData.type,
            data: eventData.data,
          },
        ]);
      };
    }
  }, [socket, me, socketMessages]);

  return (
    <SocketContext.Provider
      value={{ socket, socketMessages, handleReadMessage }}
    >
      {children}
    </SocketContext.Provider>
  );
};

function useSocket() {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useMe must be used within a SocketProvider');
  }
  return context;
}

export { SocketProvider, useSocket };
