import { useRef } from 'react';

export const useSound = () => {
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('/notification.mp3') : undefined
  );

  return {
    play: () => {
      musicPlayers.current?.play();
    },
  };
};
