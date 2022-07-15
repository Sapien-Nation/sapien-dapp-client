import { useRef } from 'react';

export const useSound = () => {
  const musicPlayers = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== 'undefined' ? new Audio('/notification.mp3') : undefined
  );

  const timeoutRef = useRef(null);

  return {
    play: () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        musicPlayers.current?.play();
      }, 500);
    },
  };
};
