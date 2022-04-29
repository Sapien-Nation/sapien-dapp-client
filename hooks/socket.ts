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
      console.log(`subscribing to eventName: ${eventName}`);
      console.log({ me });
      console.log({ socket });
      socket.onmessage = (event) => {
        console.log(`raw event`);
        console.log(event);
        const eventData = JSON.parse(event.data);
        console.log('event data parsed');
        console.log(eventData);
        console.log(`eventData: ${eventData.type} and eventName: ${eventName}`);
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
