import Lottie from 'react-lottie-player';

import lottieJson from 'lottie/passport.json';

interface Props {
  margin?: string;
  width?: string;
  height?: string;
}

const LottiePlayer = ({
  margin = '0 auto',
  width = '1000px',
  height = '1000px',
}: Props) => {
  return (
    <Lottie animationData={lottieJson} play style={{ margin, width, height }} />
  );
};

export default LottiePlayer;
