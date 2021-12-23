import { tw } from 'twind';

// components
import { LottiePlayer } from 'components/common';

const WorkInProgress = () => (
  <div className={tw`flex flex-col items-center`}>
    <LottiePlayer
      lottie="https://assets10.lottiefiles.com/packages/lf20_a9thB9.json"
      height="150px"
    />

    <p className={tw`text-base text-gray-700 mt-4`}>
      This feature is under development!
    </p>
  </div>
);

export default WorkInProgress;
