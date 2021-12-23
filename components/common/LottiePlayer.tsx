import { useEffect, useRef } from 'react';

interface Props {
  lottie: string;
  width?: string;
  height?: string;
}

const LottiePlayer = ({ lottie, width = '300px', height = '300px' }: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    import('@lottiefiles/lottie-player');
  });

  return (
    <lottie-player
      id="firstLottie"
      ref={ref}
      autoplay
      loop
      mode="normal"
      src={lottie}
      style={{ width, height }}
    />
  );
};

export default LottiePlayer;
