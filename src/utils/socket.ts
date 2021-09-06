import ReconnectingWebSocket from 'reconnecting-websocket';
import { socketURL } from 'api';

export const initSocket = () => {
  const options = {
    connectionTimeout: 5000,
    maxRetries: 10,
  };
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  const socket = new ReconnectingWebSocket(socketURL, tokens?.token, options);
  return socket;
};
