import { useContext, useEffect } from 'react';

// context
import { SocketContext } from 'context/socket';
import { useAuth } from 'context/user';

export const useSocket = () => {
  const context = useContext(SocketContext);

  return context;
};

export const useSocketEvent = (
  eventName: string,
  callback: (...args: any) => void
) => {
  const { socket } = useSocket();
  const { me } = useAuth();

  useEffect(() => {
    if (me && socket) {
      socket.onmessage = (event) => {
        const eventData = JSON.parse(event.data);
        if (eventData.type === eventName) {
          callback(eventData.data);
        }
      };
    }
  }, [callback, eventName, socket, me]);
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
