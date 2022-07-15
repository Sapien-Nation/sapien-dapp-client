import { useRef } from 'react';

export const useSound = () => {
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('/notification.wav') : undefined
  );

  return {
    play: () => {
      musicPlayers.current?.play();
    },
  };
};
