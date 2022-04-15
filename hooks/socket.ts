import { useContext, useEffect } from 'react';

// context
import { SocketContext } from 'context/socket';

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const useSocketEvent = (
  eventName: string,
  callback: (...args: any) => void
) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === eventName) {
        callback(eventData);
      }
    };
  }, [callback, eventName, socket]);
};

export const useSocketEmit = (
  event: string | { type: string; data: any },
  callback: (...args: any) => void
) => {
  const { socket } = useSocket();

  useEffect(() => {
    socket.send(event);
  }, [callback, event, socket]);
};
