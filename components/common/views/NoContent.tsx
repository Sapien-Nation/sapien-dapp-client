import { tw } from 'twind';

// components
import { LottiePlayer } from 'components/common';

interface Props {
  action?: React.ReactElement | null;
}

const NoContent = ({ action = null }: Props) => (
  <div className={tw`flex relative flex-col justify-center items-center`}>
    <LottiePlayer
      width="160px"
      height="160px"
      lottie="https://assets7.lottiefiles.com/packages/lf20_ycbVE1.json"
    />
    {action}
  </div>
);

export default NoContent;
