import ReconnectingWebSocket from 'reconnecting-websocket';

export const initSocket = () => {
  const options = {
    connectionTimeout: 5000,
    maxRetries: 10,
  };
  const tokens = JSON.parse(localStorage.getItem('tokens'));
  const socket = new ReconnectingWebSocket(
    'wss://notif-sandbox.sapien.network/api/v3/notification/socket',
    // process.env.NEXT_PUBLIC_SOCKET_URL,
    tokens?.token,
    options
  );
  return socket;
};
