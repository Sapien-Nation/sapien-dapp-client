import { useContext, useEffect } from 'react';

// context
import { SocketContext } from 'context/socket';
import { useAuth } from 'context/user';

export const useSocket = () => {
  const context = useContext(SocketContext);

  return context;
};

export const useSocketEvent = (
  eventNamesToListen = [],
  callback: (...args: any) => void
) => {
  const { socket } = useSocket();
  const { me } = useAuth();

  useEffect(() => {
    if (me && socket) {
      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);

        const eventType = eventData.type;
        if (eventNamesToListen.includes(eventType)) {
          callback(eventType, eventData.data);
        }
      };
    }
  }, [callback, socket, me, eventNamesToListen]);
};

export const useSocketEmit = (
  event: string | { type: string; data: any },
  callback: (...args: any) => void
) => {
  const { socket } = useSocket();
  const { me } = useAuth();
  useEffect(() => {
    if (me && socket) {
      socket.send(event);
    }
  }, [callback, event, socket, me]);
};
