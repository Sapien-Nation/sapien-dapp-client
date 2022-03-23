// components
import { Dialog, LottiePlayer } from 'components/common';

interface Props {
  onClose: () => void;
}

const WorkInProgress = ({ onClose }: Props) => (
  <Dialog onClose={onClose} title="Sapien Construction Zone" actions={null}>
    <div className="flex flex-col items-center">
      <LottiePlayer
        lottie="https://assets10.lottiefiles.com/packages/lf20_a9thB9.json"
        height="150px"
      />

      <p className="text-base text-gray-700 mt-4">
        This feature is under development!
      </p>
    </div>
  </Dialog>
);

export default WorkInProgress;
